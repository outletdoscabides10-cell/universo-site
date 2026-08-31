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

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function fotosDe(p) {
  const sufixos = (p.galeria && p.galeria.length)
    ? p.galeria
    : Array.from({ length: p.fotos || 1 }, (_, i) => (i ? '-' + (i + 1) : ''));
  return sufixos.map((s) => `assets/products/${p.slug}${s}.webp`);
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

  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.nome, sku: p.sku || undefined,
    image: fotos.map((f) => `${SITE}/${f}`),
    description: descCurta,
    brand: { '@type': 'Brand', name: 'Universo dos Cabides' },
    ...(temPreco ? { offers: { '@type': 'Offer', priceCurrency: 'BRL', price: preco,
      availability: 'https://schema.org/InStock', url: `${SITE}/p/${p.slug}.html` } } : {}),
  };

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
  <link rel="stylesheet" href="../css/style.css?v=20260827b">
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
      <a href="../index.html#produtos">${esc(CAT_LABEL[cat] || cat)}</a><span>/</span>
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
        <h1>${esc(p.nome)}</h1>
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

  <script src="produto.js?v=20260827a"></script>
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

/* sitemap com a home + todas as páginas de produto */
const hoje = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`].concat(PRODUTOS.map((p) => `${SITE}/p/${p.slug}.html`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc><lastmod>${hoje}</lastmod></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${n} páginas geradas em /p + sitemap.xml (${urls.length} URLs) + robots.txt`);
