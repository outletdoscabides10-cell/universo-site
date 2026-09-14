/* ================================================================
   Gera as páginas estáticas de produto (p/<slug>.html) + sitemap.xml
   a partir do catálogo js/produtos.js — rodar depois de mudar o catálogo:
     node tools/gerar-paginas.js
   ================================================================ */
const fs = require('fs');
const path = require('path');

global.window = {};
require(path.join(__dirname, '..', 'js', 'produtos.js'));
require(path.join(__dirname, '..', 'js', 'produtos-araras.js'));
const PRODUTOS = window.PRODUTOS;

const SITE = 'https://universodoscabides.com.br';
// versão nas URLs das fotos: navegador nunca mais serve imagem velha do cache
const VFOTO = 'v' + new Date().toISOString().slice(0, 10).replace(/-/g, '');

/* Avaliações REAIS importadas do Mercado Livre (data/avaliacoes.json,
   gerado pela coleta via API — nota e texto de compradores de verdade). */
let AVAL = {};
try {
  AVAL = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'avaliacoes.json'), 'utf8'));
} catch (e) { /* sem arquivo = páginas saem sem avaliações */ }

const EQ_COR = { PC: ['PR'], BC: ['BR', 'BG', 'BP'], RC: ['RS'], CC: ['CZ'], PS: ['PT'], TF: ['TR'], PF: ['PR'] };
function avalDe(sku) {
  sku = (sku || '').toUpperCase();
  if (AVAL[sku]) return AVAL[sku];
  const pref = sku.slice(0, -2), cod = sku.slice(-2);
  for (const c of (EQ_COR[cod] || [])) if (AVAL[pref + c]) return AVAL[pref + c];
  return null;
}

function estrelas(nota) {
  const cheias = Math.round(nota);
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<svg viewBox="0 0 20 20" class="est${i <= cheias ? ' on' : ''}"><path d="M10 1.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>`;
  }
  return s;
}

/* — mesmos agrupamentos do main.js (cor = variação do mesmo prefixo de SKU) — */
const GRUPOS = {};
PRODUTOS.forEach((p) => {
  const m = /^(\d+)/.exec(p.sku || '');
  p._base = m ? m[1] : (p.sku || p.slug);
  (GRUPOS[p._base] = GRUPOS[p._base] || []).push(p);
});
const grupoDe = (p) => GRUPOS[p._base] || [p];

function corLabel(p) {
  const grupo = grupoDe(p);
  if (grupo.length < 2) return '';
  const palavras = grupo.map((x) => (x.nome || '').split(' '));
  let i = 0;
  while (palavras[0][i] && palavras.every((w) => w[i] === palavras[0][i])) i++;
  const resto = (p.nome || '').split(' ').slice(i).join(' ').trim();
  return resto || (p.sku || '').replace(/^\d+/, '');
}

const CAT_LABEL = {
  cabides: 'Cabides', araras: 'Araras', bustos: 'Bustos', manequins: 'Manequins',
  madeira: 'Cabides de Madeira', acrilico: 'Cabides de Acrílico',
  plastico: 'Cabides de Plástico', veludo: 'Cabides de Veludo', silhuetas: 'Silhuetas',
};

/* ── Páginas de categoria (c/<cat>.html): texto + FAQ pro Google entender
      cada família como uma página própria, não só um filtro da home ── */
const CATEGORIAS = {
  cabides: {
    titulo: 'Cabides para Loja no Atacado',
    h1: 'Cabides para loja, direto de fábrica',
    intro: [
      'Cabide certo muda a cara da arara — e do provador. Aqui você encontra as famílias que vestem lojas de moda no Brasil inteiro: madeira pra peça pesada e vitrine nobre, veludo flocado que não deixa blusa escorregar, acrílico cristal pra moda praia e íntima, plástico preto e prata pro giro do dia a dia e as silhuetas que transformam o produto em expositor.',
      'Vendemos por unidade, sem pedido mínimo, com preço que melhora conforme a quantidade. Quem compra é lojista, mas não precisa de CNPJ: pediu, despachamos em até 24h úteis com nota fiscal.',
    ],
    faq: [
      ['Qual cabide é melhor para loja de roupa?', 'Depende da peça e da imagem da loja: madeira transmite valor e aguenta casacos; veludo segura alça fina e tecido escorregadio; acrílico deixa a cor da peça protagonista (padrão em moda praia e íntima); plástico preto ou prata é o melhor custo-benefício pra volume. Nas páginas de cada família explicamos o uso ideal.'],
      ['Vocês vendem por unidade ou só em kit?', 'Por unidade. O preço mostrado já é unitário, e levando mais a quantidade indicada em cada página o valor cai — os kits sugeridos aparecem na própria página do produto.'],
      ['Como funciona o frete?', 'Calculamos no carrinho pelo seu CEP, com as transportadoras do Melhor Envio (Loggi, Jadlog, J&T e outras). Pedido feito até 14h sai em até 1 dia útil.'],
      ['Emitem nota fiscal? Precisa de CNPJ?', 'Toda venda sai com nota fiscal. CNPJ não é obrigatório — atendemos lojista e também quem está montando o primeiro negócio no CPF.'],
    ],
  },
  silhuetas: {
    titulo: 'Cabide Silhueta — corpo feminino',
    h1: 'Cabide silhueta: o cabide que veste a peça',
    intro: [
      'O cabide silhueta tem o contorno do corpo feminino: o biquíni, o body ou a lingerie ficam armados como se estivessem vestidos, e a cliente enxerga o caimento sem ir ao provador. É o expositor padrão de moda praia, moda íntima e fitness — na arara, na parede ou na vitrine.',
      'O modelo adulto mede 77 cm de altura por 41 cm de largura, em plástico resistente de 9 mm. Tem nas versões acrílico transparente (a mais vendida — mais de 700 avaliações no Mercado Livre), preto e prata, além da linha infantil e das silhuetas de madeira com arame.',
    ],
    faq: [
      ['Para que serve o cabide silhueta?', 'Pra expor conjuntos completos com cara de vitrine: biquíni, body, lingerie e moda fitness ficam armados no formato do corpo, mostrando o caimento real da peça. Loja que troca o cabide comum pela silhueta vende o conjunto, não a peça solta.'],
      ['Qual o tamanho do cabide silhueta adulto?', 'São 77 cm de altura por 41 cm de largura na parte mais ampla, com 9 mm de espessura — dimensão pensada pra conjuntos adultos de praia e íntima. Também temos a versão infantil, proporcional.'],
      ['Quais cores existem?', 'Acrílico transparente (deixa a cor da peça protagonista), preto (fundo que destaca peças claras) e prata (visual de loja moderna). O transparente é o campeão de vendas.'],
      ['O cabide silhueta é resistente?', 'Sim — plástico de 9 mm de espessura, feito pra uso comercial diário. Mais de 700 lojistas avaliaram o modelo transparente no Mercado Livre com nota média 4,9.'],
    ],
  },
  veludo: {
    titulo: 'Cabide de Veludo',
    h1: 'Cabide de veludo: nada escorrega da arara',
    intro: [
      'O revestimento flocado do cabide de veludo segura a peça no lugar: alça fina, seda, cetim e malha não deslizam nem caem — o problema número 1 de quem trabalha com vestido e blusa fluida. E como o corpo do cabide é fino, cabe quase o dobro de peças na mesma arara.',
      'Disponível em preto, bege, cinza e rosé, a partir de R$ 3,99 a unidade. O tom fosco do veludo dá acabamento de closet de luxo por preço de cabide de giro.',
    ],
    faq: [
      ['Qual a vantagem do cabide de veludo?', 'Aderência e espaço: o flocado impede a peça de escorregar (adeus blusa no chão do provador) e o perfil fino libera até 40% de espaço na arara em comparação com cabide de madeira.'],
      ['Cabide de veludo solta tinta ou mancha a roupa?', 'Não — o flocado é fixado ao corpo do cabide e não transfere cor. É o cabide padrão de closets organizados e lojas de vestido justamente por proteger o tecido.'],
      ['Quais cores de cabide de veludo vocês têm?', 'Preto, bege, cinza e rosé — dá pra combinar com a paleta da loja ou do closet. Todos vendidos por unidade.'],
      ['Aguenta peça pesada?', 'Veludo é ideal pra peça leve e média (blusa, vestido, saia, calça no gancho). Pra casaco pesado e alfaiataria estruturada, indicamos a linha de madeira.'],
    ],
  },
  madeira: {
    titulo: 'Cabide de Madeira',
    h1: 'Cabide de madeira: peso de loja boa',
    intro: [
      'Cabide de madeira é o que separa arara de loja de arara de bazar. O peso e o acabamento transmitem valor antes mesmo de a cliente tocar na peça — e a estrutura maciça aguenta casaco, alfaiataria e jeans sem envergar.',
      'A linha cobre marfim, branco, preto e tons de madeira natural, com versões lisas, com barra pra calça, com presilhas e com silicone antideslize nos ombros. Ganchos cromados, dourados e rosé pra combinar com o metal das araras.',
    ],
    faq: [
      ['Por que usar cabide de madeira na loja?', 'Percepção de valor: a mesma peça exposta em cabide de madeira "vale mais" aos olhos da cliente do que em cabide fino de arame. Além disso a estrutura maciça não enverga com casacos e peças estruturadas.'],
      ['Qual a diferença entre as versões com barra, presilha e silicone?', 'Barra serve pra calça e lenço; presilhas seguram saia e biquíni pela cintura; o friso de silicone nos ombros impede alça e decote grande de escorregar. O modelo liso é o coringa pra camisa e vestido.'],
      ['Quais cores combinam com minha loja?', 'Marfim e branco pra loja clara e feminina; preto pra visual premium; madeira natural pra rústico e masculino. O gancho (cromado, dourado ou rosé) pode seguir o metal das suas araras.'],
      ['Vendem por unidade?', 'Sim, todos por unidade, com desconto progressivo por quantidade indicado em cada página.'],
    ],
  },
  acrilico: {
    titulo: 'Cabide de Acrílico Transparente',
    h1: 'Cabide de acrílico: a peça é a protagonista',
    intro: [
      'O cabide transparente some — e a peça aparece. Por isso o acrílico é o padrão das lojas de moda praia, moda íntima e infantil: a cor do biquíni ou do body fica limpa na arara, sem um cabide colorido brigando com o produto.',
      'A linha vai do tradicional fino ao boutique giratório com presilhas, passando pelas silhuetas adultas e infantis. Plástico cristal resistente, feito pra uso comercial diário.',
    ],
    faq: [
      ['Cabide de acrílico é resistente ou quebra fácil?', 'Os nossos são de plástico cristal de uso comercial — feitos pra arara de loja, não pra uso doméstico leve. O silhueta adulto, por exemplo, tem 9 mm de espessura e nota 4,9 em mais de 700 avaliações.'],
      ['Por que loja de moda praia usa cabide transparente?', 'Porque biquíni vende pela cor. O cabide transparente não compete com a estampa — a peça parece flutuar na arara, e a vitrine fica limpa e profissional.'],
      ['Qual a diferença entre o tradicional fino, o médio e o grosso?', 'Espessura e resistência: o fino é pro giro leve (camiseta, biquíni), o médio pro dia a dia geral e o grosso pra peças com mais peso. Todos transparentes, vendidos por unidade.'],
      ['Tem modelo com presilhas?', 'Sim — versões com presilhas pra saia e biquíni, giratórios pra vitrine e o silhueta, que arma o conjunto no formato do corpo.'],
    ],
  },
  plastico: {
    titulo: 'Cabide de Plástico Preto e Prata',
    h1: 'Cabide de plástico: o giro do dia a dia',
    intro: [
      'É o cabide que faz o volume da loja funcionar: leve, resistente e com preço que permite equipar centenas de peças sem pesar no caixa. A linha completa existe em preto — o fundo que faz peça clara saltar na arara — e prata, pro visual de loja moderna e cromada.',
      'Do tradicional ao cavado gaúcho, com versões giratórias, com presilhas, pra saia, lingerie e infantil. Vendido por unidade, com desconto progressivo.',
    ],
    faq: [
      ['Cabide preto ou prata: qual escolher?', 'Preto é o mais versátil — cria contraste com peças claras e uniformiza a arara. Prata combina com araras cromadas e visual contemporâneo. Muitas lojas usam preto no salão e prata na vitrine.'],
      ['Qual modelo pra loja de moda íntima?', 'Os cavados e os de lingerie com encaixes seguram alça fina sem deformar; pra conjuntos completos, o silhueta arma a peça no formato do corpo.'],
      ['O plástico aguenta uso comercial?', 'Sim — são cabides de espessura comercial, feitos pra arara de loja com troca constante de peças. Não confunda com cabide fino descartável de lavanderia.'],
      ['Tem quantidade mínima?', 'Não. Vende por unidade, e o preço cai conforme a quantidade — os kits sugeridos estão em cada página de produto.'],
    ],
  },
  araras: {
    titulo: 'Araras para Loja Profissionais',
    h1: 'Araras de loja: estrutura profissional',
    intro: [
      'Arara de loja não pode balançar. As nossas são de tubo metálico reforçado, com solda limpa e pintura de fábrica — cromado, dourado e rosé — feitas pra aguentar arara cheia de jeans sem envergar e pra durar anos de loja aberta.',
      'A linha cobre araras de desfile, retas simples e duplas, modelos com prateleira e bases quadradas premium. São peças grandes: o frete é calculado no carrinho pelo seu CEP.',
    ],
    faq: [
      ['Qual arara escolher pra minha loja?', 'Reta simples pro salão e liquidação; desfile (mais baixa e elegante) pra coleção em destaque; com prateleira quando você quer expor sapato e acessório junto; dupla pra estoque e provador.'],
      ['As araras aguentam quanto peso?', 'São estruturas de tubo metálico com solda reforçada, dimensionadas pra arara cheia de peças pesadas (jeans, casacos). É produto profissional de loja, não arara doméstica de aço fino.'],
      ['Quais cores de arara existem?', 'Cromado (o clássico das lojas), dourado (visual premium) e rosé (lojas femininas e modernas). Os cabides prata e dourados combinam com o metal correspondente.'],
      ['Como funciona o frete de arara?', 'Por ser volumosa, o valor sai no carrinho pelo seu CEP, nas transportadoras do Melhor Envio. Despachamos em até 1 dia útil após a confirmação.'],
    ],
  },
};

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function fotosDe(p) {
  const sufixos = (p.galeria && p.galeria.length)
    ? p.galeria
    : Array.from({ length: p.fotos || 1 }, (_, i) => (i ? '-' + (i + 1) : ''));
  return sufixos.map((s) => `assets/products/${p.slug}${s}.webp?${VFOTO}`);
}

const SELOS = `
<div class="pp-selos">
  <span><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.4-2.9 8.2-7 9.6C7.9 19.2 5 15.4 5 11V6l7-3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 11.5l2.2 2.2L15.5 9.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Compra segura</span>
  <span><svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M2.5 9.5h19" stroke="currentColor" stroke-width="1.7"/></svg>Pix ou cartão</span>
  <span><svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.7" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="17.5" r="1.7" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>Despacho em 24h</span>
  <span><svg viewBox="0 0 24 24"><path d="M4 9a8 8 0 0114-3M20 15a8 8 0 01-14 3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M18 3v4h-4M6 21v-4h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Troca garantida</span>
</div>`;

function paginaHTML(p) {
  const grupo = grupoDe(p);
  const fotos = fotosDe(p);
  const cat = [...p.cats].reverse().find((c) => CAT_LABEL[c]) || p.cats[0];
  const temPreco = !!p.preco_unit;
  const descCurta = String(p.desc || '').replace(/\s+/g, ' ').slice(0, 155);
  const preco = temPreco ? p.preco_unit.replace(/\./g, '').replace(',', '.') : null;

  const cores = grupo.length > 1 ? `
      <div class="pp-cores">
        <span class="pp-rotulo">Cor</span>
        <div class="pp-cores-chips">
          ${grupo.map((v) => `<a class="pp-cor${v.slug === p.slug ? ' is-on' : ''}" href="${v.slug}.html" title="${esc(corLabel(v))}"><img src="../assets/products/${v.slug}.webp" alt="${esc(corLabel(v))}" loading="lazy"><span>${esc(corLabel(v))}</span></a>`).join('')}
        </div>
      </div>` : '';

  const kitTxt = !temPreco
    ? 'Chama no WhatsApp que passamos o valor na hora.'
    : p.unidades > 1
      ? `Vendido por unidade — levando ${p.unidades} ou mais, rende: ${String(p.kit || '').toLowerCase()} por R$ ${p.preco}.`
      : 'Vendido por unidade.';

  const relacionados = PRODUTOS
    .filter((r) => r.slug !== p.slug && r._base !== p._base && r.cats.some((c) => p.cats.includes(c)))
    .filter((r, i, arr) => arr.findIndex((x) => x._base === r._base) === i)
    .slice(0, 4)
    .map((r) => `
        <a class="pp-rel-card" href="${r.slug}.html">
          <span class="pp-rel-foto"><img src="../assets/products/${r.slug}.webp" alt="${esc(r.nome)}" loading="lazy"></span>
          <span class="pp-rel-nome">${esc(r.nome)}</span>
          <strong>${r.preco_unit ? 'R$ ' + r.preco_unit + ' /un' : 'Consulte'}</strong>
        </a>`).join('');

  const aval = avalDe(p.sku);
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.nome, sku: p.sku || undefined,
    image: fotos.map((f) => `${SITE}/${f}`),
    description: descCurta,
    brand: { '@type': 'Brand', name: 'Universo dos Cabides' },
    ...(temPreco ? { offers: { '@type': 'Offer', priceCurrency: 'BRL', price: preco,
      availability: 'https://schema.org/InStock', url: `${SITE}/p/${p.slug}.html` } } : {}),
    ...(aval && aval.total ? { aggregateRating: { '@type': 'AggregateRating',
      ratingValue: aval.media, reviewCount: aval.total } } : {}),
  };

  const notaTopo = aval && aval.total ? `
        <a class="pp-nota" href="#avaliacoes">
          <span class="pp-estrelas">${estrelas(aval.media)}</span>
          <b>${String(aval.media).replace('.', ',')}</b>
          <span>· ${aval.total} avaliaç${aval.total === 1 ? 'ão' : 'ões'} no Mercado Livre</span>
        </a>` : '';

  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const blocoAval = aval && aval.total ? `
    <section class="pp-aval" id="avaliacoes" aria-label="Avaliações de compradores">
      <h2>Avaliações de quem comprou</h2>
      <div class="pp-aval-resumo">
        <strong>${String(aval.media).replace('.', ',')}</strong>
        <div><span class="pp-estrelas">${estrelas(aval.media)}</span>
        <p>${aval.total} avaliaç${aval.total === 1 ? 'ão' : 'ões'} reais · importadas do Mercado Livre</p></div>
      </div>
      ${aval.avaliacoes && aval.avaliacoes.length ? `<div class="pp-aval-lista">
        ${aval.avaliacoes.map((r) => {
          const dt = r.date ? `${meses[parseInt(r.date.slice(5, 7), 10) - 1]}/${r.date.slice(0, 4)}` : '';
          return `<figure class="pp-aval-item">
          <span class="pp-estrelas">${estrelas(r.rate || 5)}</span>
          <blockquote>${esc(r.content)}</blockquote>
          <figcaption>Comprador verificado · Mercado Livre${dt ? ' · ' + dt : ''}</figcaption>
        </figure>`; }).join('')}
      </div>` : ''}
    </section>` : '';

  const zap = `https://wa.me/5511952300060?text=${encodeURIComponent(`Olá! Vi no site e tenho interesse em o produto ${p.nome}${p.sku ? ' (SKU ' + p.sku + ')' : ''}. Pode me ajudar?`)}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.nome)} | Universo dos Cabides</title>
  <meta name="description" content="${esc(descCurta)}">
  <link rel="canonical" href="${SITE}/p/${p.slug}.html">
  <meta property="og:title" content="${esc(p.nome)}">
  <meta property="og:description" content="${esc(descCurta)}">
  <meta property="og:image" content="${SITE}/${fotos[0]}">
  <meta property="og:type" content="product">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css?v=20260831f">
  <link rel="icon" href="../assets/favicon-64.png" type="image/png">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body class="pp-body">
  <header class="pp-top">
    <div class="container pp-top-inner">
      <a href="../index.html" class="brand"><img src="../assets/logo-site.png" class="brand-logo" alt="Universo dos Cabides"></a>
      <nav class="pp-nav">
        <a href="../index.html#produtos">Catálogo</a>
        <a href="../index.html#atacado">Atacado</a>
        <a href="../index.html#sacola" class="pp-sacola" id="ppSacola">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1.2 11a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 10V7a3 3 0 016 0v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          Sacola <span class="pp-badge" id="ppBadge" hidden>0</span>
        </a>
      </nav>
    </div>
  </header>

  <main class="container pp-main">
    <nav class="pp-crumbs" aria-label="Você está em">
      <a href="../index.html">Início</a><span>/</span>
      <a href="${CATEGORIAS[cat] ? `../c/${cat}.html` : '../index.html#produtos'}">${esc(CAT_LABEL[cat] || cat)}</a><span>/</span>
      <b>${esc(p.nome)}</b>
    </nav>

    <div class="pp-grid">
      <section class="pp-galeria" aria-label="Fotos do produto">
        <div class="pp-palco"><img id="ppImg" src="../${fotos[0]}" alt="${esc(p.nome)}"></div>
        ${fotos.length > 1 ? `<div class="pp-thumbs">${fotos.map((f, i) =>
          `<button class="pp-thumb${i === 0 ? ' is-on' : ''}" data-src="../${f}"><img src="../${f}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
      </section>

      <section class="pp-info">
        <span class="pp-cat">${esc(CAT_LABEL[cat] || cat)}${p.sku ? ' · SKU ' + esc(p.sku) : ''}</span>
        <h1>${esc(p.nome)}</h1>${notaTopo}
        ${cores}
        <div class="pp-preco">${temPreco
          ? `<strong>R$ ${p.preco_unit}</strong><span>/ unidade</span>`
          : '<strong>Consulte o preço</strong>'}</div>
        <p class="pp-kit">${esc(kitTxt)}</p>
        ${temPreco ? `
        <div class="pp-acoes">
          <div class="pp-qtd"><button id="ppMenos" aria-label="Diminuir">−</button><span id="ppQtd">1</span><button id="ppMais" aria-label="Aumentar">+</button></div>
          <button class="pp-add" id="ppAdd" data-slug="${esc(p.slug)}">Adicionar à sacola</button>
        </div>` : ''}
        <a class="pp-whats" href="${zap}" target="_blank" rel="noopener">${temPreco ? 'Prefere fechar pelo WhatsApp? Fala com a gente →' : 'Pedir preço pelo WhatsApp →'}</a>
        ${SELOS}
        <div class="pp-desc">
          <h2>Descrição</h2>
          <p>${esc(p.desc || '')}</p>
        </div>
      </section>
    </div>

    ${blocoAval}

    ${relacionados ? `
    <section class="pp-rel" aria-label="Você também pode gostar">
      <h2>Você também pode gostar</h2>
      <div class="pp-rel-grid">${relacionados}</div>
    </section>` : ''}
  </main>

  <footer class="pp-foot">
    <div class="container pp-foot-inner">
      <span>© <span id="ano"></span> Universo dos Cabides · CNPJ 20.142.079/0005-26</span>
      <span><a href="../privacidade.html">Privacidade</a> · <a href="../termos.html">Termos de uso</a></span>
    </div>
  </footer>

  <div class="pp-toast" id="ppToast" hidden>Adicionado à sacola! <a href="../index.html#sacola">Ver sacola →</a></div>

  <script src="produto.js?v=20260914a"></script>
</body>
</html>`;
}

const dir = path.join(__dirname, '..', 'p');
fs.mkdirSync(dir, { recursive: true });
let n = 0;
for (const p of PRODUTOS) {
  fs.writeFileSync(path.join(dir, `${p.slug}.html`), paginaHTML(p));
  n++;
}

/* ── páginas de categoria ── */
function categoriaHTML(cat, cfg) {
  const prods = PRODUTOS.filter((p) => (p.cats || []).includes(cat));
  const grupos = prods.filter((p, i, arr) => arr.findIndex((x) => x._base === p._base) === i);
  const precos = prods.map((p) => parseFloat((p.preco_unit || '').replace(/\./g, '').replace(',', '.'))).filter((v) => v > 0);
  const aPartir = precos.length ? Math.min(...precos).toFixed(2).replace('.', ',') : null;

  const cards = grupos.map((p) => {
    const nCores = grupoDe(p).filter((v) => (v.cats || []).includes(cat)).length;
    return `
        <a class="pp-rel-card" href="../p/${p.slug}.html">
          <span class="pp-rel-foto"><img src="../assets/products/${p.slug}.webp?${VFOTO}" alt="${esc(p.nome)}" loading="lazy"></span>
          <span class="pp-rel-nome">${esc(p.nome)}${nCores > 1 ? ` <small class="cat-cores">${nCores} cores</small>` : ''}</span>
          <strong>${p.preco_unit ? 'R$ ' + p.preco_unit + ' /un' : 'Consulte'}</strong>
        </a>`;
  }).join('');

  const outras = Object.entries(CATEGORIAS).filter(([c]) => c !== cat)
    .map(([c, o]) => `<a href="${c}.html">${esc(CAT_LABEL[c] || o.titulo)}</a>`).join('\n        ');

  const jsonld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: cfg.faq.map(([q, a]) => ({ '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const descMeta = cfg.intro[0].replace(/\s+/g, ' ').slice(0, 155);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(cfg.titulo)}${aPartir ? ` a partir de R$ ${aPartir}` : ''} | Universo dos Cabides</title>
  <meta name="description" content="${esc(descMeta)}">
  <link rel="canonical" href="${SITE}/c/${cat}.html">
  <meta property="og:title" content="${esc(cfg.titulo)}">
  <meta property="og:description" content="${esc(descMeta)}">
  ${grupos[0] ? `<meta property="og:image" content="${SITE}/assets/products/${grupos[0].slug}.webp">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css?v=20260831g">
  <link rel="icon" href="../assets/favicon-64.png" type="image/png">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body class="pp-body">
  <header class="pp-top">
    <div class="container pp-top-inner">
      <a href="../index.html" class="brand"><img src="../assets/logo-site.png" class="brand-logo" alt="Universo dos Cabides"></a>
      <nav class="pp-nav">
        <a href="../index.html#produtos">Catálogo</a>
        <a href="../index.html#atacado">Atacado</a>
        <a href="../index.html#sacola" class="pp-sacola">Sacola</a>
      </nav>
    </div>
  </header>

  <main class="container pp-main">
    <nav class="pp-crumbs" aria-label="Você está em">
      <a href="../index.html">Início</a><span>/</span>
      <b>${esc(CAT_LABEL[cat] || cfg.titulo)}</b>
    </nav>

    <section class="cat-hero">
      <h1>${esc(cfg.h1)}</h1>
      ${aPartir ? `<p class="cat-apartir">${grupos.length} modelos · a partir de <strong>R$ ${aPartir}</strong> a unidade</p>` : ''}
      ${cfg.intro.map((t) => `<p>${esc(t)}</p>`).join('\n      ')}
    </section>

    <section class="pp-rel" aria-label="Produtos da categoria">
      <h2>Modelos disponíveis</h2>
      <div class="pp-rel-grid cat-grid">${cards}</div>
    </section>

    <section class="cat-faq" aria-label="Perguntas frequentes">
      <h2>Perguntas frequentes</h2>
      ${cfg.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n      ')}
    </section>

    <nav class="cat-outras" aria-label="Outras categorias">
      <h2>Veja também</h2>
      <div class="cat-outras-links">
        ${outras}
      </div>
    </nav>
  </main>

  <footer class="pp-foot">
    <div class="container pp-foot-inner">
      <span>© <span id="ano"></span> Universo dos Cabides · CNPJ 20.142.079/0005-26</span>
      <span><a href="../privacidade.html">Privacidade</a> · <a href="../termos.html">Termos de uso</a></span>
    </div>
  </footer>
  <script>document.getElementById('ano').textContent = new Date().getFullYear();</script>
</body>
</html>`;
}

const dirCat = path.join(__dirname, '..', 'c');
fs.mkdirSync(dirCat, { recursive: true });
let nc = 0;
for (const [cat, cfg] of Object.entries(CATEGORIAS)) {
  fs.writeFileSync(path.join(dirCat, `${cat}.html`), categoriaHTML(cat, cfg));
  nc++;
}

/* sitemap com a home + categorias + todas as páginas de produto */
const hoje = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`]
  .concat(Object.keys(CATEGORIAS).map((c) => `${SITE}/c/${c}.html`))
  .concat(PRODUTOS.map((p) => `${SITE}/p/${p.slug}.html`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc><lastmod>${hoje}</lastmod></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${n} páginas em /p + ${nc} categorias em /c + sitemap.xml (${urls.length} URLs) + robots.txt`);
