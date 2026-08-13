/* ================================================================
   Universo dos Cabides — interações
   Catálogo: js/produtos.js (window.PRODUTOS)
   ================================================================ */

/* ---- CONFIGURE AQUI OS CANAIS DA MARCA ---- */
const CANAIS = {
  whatsapp: '5511952300060',               // WhatsApp oficial da loja
  instagram: 'https://www.instagram.com/universodoscabides10',
  ml: 'https://perfil.mercadolivre.com.br/UNIVERSO_DOS_CABIDES_BRASIL',
  shopee: 'https://shopee.com.br/universodoscabidesbrasil',
};

/* Link de pedido: WhatsApp com mensagem pronta (fallback ML enquanto
   o número não estiver configurado, pra nenhum botão ficar quebrado) */
function buyHref(texto) {
  if (CANAIS.whatsapp) {
    const msg = `Olá! Vi no site e tenho interesse em ${texto}. Pode me ajudar?`;
    return `https://wa.me/${CANAIS.whatsapp}?text=${encodeURIComponent(msg)}`;
  }
  return CANAIS.ml;
}

/* Supabase (chave publishable — feita para uso público no navegador).
   O site só tem permissão de INSERIR pedidos; nunca ler ou alterar. */
const SUPA_URL = 'https://dzupvekojufcrrryjqbn.supabase.co';
const SUPA_KEY = 'sb_publishable_rJy4GSoT3w2iIPyqfx3t0Q_vkGgm8IW';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const precoNum = (s) => parseFloat(s.replace(/\./g, '').replace(',', '.'));
const money = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const CAT_LABEL = {
  cabides: 'Cabide',
  araras: 'Arara',
  bustos: 'Busto',
  manequins: 'Manequim',
  madeira: 'Cabide · Madeira',
  acrilico: 'Cabide · Acrílico',
  plastico: 'Cabide · Plástico',
  'plastico-preto': 'Cabide · Plástico Preto',
  'plastico-prata': 'Cabide · Plástico Prata',
  veludo: 'Cabide · Veludo',
  silhuetas: 'Cabide · Silhueta',
};

/* sub-abas: linhas dentro de Cabides; cores dentro de Plástico */
const SUBS = {
  cabides: [
    ['todos', 'Todos os cabides'],
    ['madeira', 'Madeira'],
    ['acrilico', 'Acrílico'],
    ['plastico', 'Plástico'],
    ['veludo', 'Veludo'],
    ['silhuetas', 'Silhuetas'],
  ],
  plastico: [
    ['todos', 'Todas as cores'],
    ['plastico-preto', 'Preto'],
    ['plastico-prata', 'Prata'],
  ],
};

/* ================================================================
   Vitrine de produtos (renderizada do catálogo)
   ================================================================ */
const PAGE = 12;
const grid = document.getElementById('prodGrid');
const prodEmpty = document.getElementById('prodEmpty');
const loadMoreBtn = document.getElementById('loadMore');
const loadMoreCount = document.getElementById('loadMoreCount');
const filterBar = document.getElementById('filterBar');

/* nichos principais */
const NICHOS = ['todos', 'cabides', 'araras', 'bustos', 'manequins'];

let mainFilter = 'todos';
let subFilter = 'todos';
let sub2Filter = 'todos';
let visibleCount = PAGE;
let searchQuery = '';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/* o catálogo veio com bustos e manequins juntos — separa pelo nome */
window.PRODUTOS.forEach((p) => {
  if (p.cats.includes('manequins') && /busto|pedestal/.test(norm(p.nome))) {
    p.cats = p.cats.map((c) => (c === 'manequins' ? 'bustos' : c));
  }
});

document.getElementById('prodCount').textContent = window.PRODUTOS.length;

function filtered() {
  if (searchQuery) {
    const tokens = searchQuery.split(/\s+/);
    return window.PRODUTOS.filter((p) => {
      const alvo = norm(p.nome + ' ' + p.kit);
      return tokens.every((t) => alvo.includes(t));
    });
  }
  if (mainFilter === 'todos') return window.PRODUTOS;
  const alvo = sub2Filter !== 'todos' ? sub2Filter : (subFilter !== 'todos' ? subFilter : mainFilter);
  return window.PRODUTOS.filter((p) => p.cats.includes(alvo));
}

function cardHTML(p) {
  const enter = reduceMotion ? '' : ' is-entering';
  const hover = (p.fotos || 1) > 1
    ? `<img class="prod-hover" src="assets/products/${p.slug}-2.webp" alt="" loading="lazy">` : '';
  return `<article class="prod-card${enter}" id="p-${p.slug}" data-cat="${p.cats.join(' ')}">
    <div class="prod-photo" data-view="${p.slug}">
      <img src="assets/products/${p.slug}.webp" alt="${esc(p.nome)}" loading="lazy">${hover}
    </div>
    <div class="prod-info">
      <span class="prod-kit">${esc(CAT_LABEL[[...p.cats].reverse().find((c) => CAT_LABEL[c]) || p.cats[0]] || '')}</span>
      <h3 data-view="${p.slug}">${esc(p.nome)}</h3>
      ${p.preco_unit
        ? `<div class="prod-price"><strong>R$ ${p.preco_unit}</strong><span>/ unidade</span></div>
      <button class="prod-add" data-add="${p.slug}">Adicionar à sacola</button>`
        : `<div class="prod-price prod-price-consulte"><strong>Consulte o preço</strong></div>
      <button class="prod-add" data-buy="o produto ${esc(p.nome)} (SKU ${esc(p.sku || '')})">Pedir pelo WhatsApp</button>`}
    </div>
  </article>`;
}

function renderGrid() {
  const list = filtered();
  grid.innerHTML = list.slice(0, visibleCount).map(cardHTML).join('');
  prodEmpty.hidden = list.length > 0;
  const restante = list.length - visibleCount;
  loadMoreBtn.hidden = restante <= 0;
  loadMoreCount.textContent = restante > 0 ? `(+${restante})` : '';
}

loadMoreBtn.addEventListener('click', () => {
  visibleCount += PAGE;
  renderGrid();
});

const filterSubBar = document.getElementById('filterSub');
const filterSub2Bar = document.getElementById('filterSub2');

function chipsHTML(subs, ativo) {
  return subs.map(([val, rotulo]) =>
    `<button class="chip chip-sm${val === ativo ? ' is-active' : ''}" data-sub="${val}">${rotulo}</button>`
  ).join('');
}

function syncChips() {
  filterBar.querySelectorAll('.chip').forEach((c) =>
    c.classList.toggle('is-active', !searchQuery && c.dataset.main === mainFilter)
  );
  const mostraSub = mainFilter === 'cabides' && !searchQuery;
  filterSubBar.hidden = !mostraSub;
  filterSubBar.innerHTML = mostraSub ? chipsHTML(SUBS.cabides, subFilter) : '';
  const mostraSub2 = mostraSub && subFilter === 'plastico';
  filterSub2Bar.hidden = !mostraSub2;
  filterSub2Bar.innerHTML = mostraSub2 ? chipsHTML(SUBS.plastico, sub2Filter) : '';
}

function clearSearch() {
  searchQuery = '';
  searchInput.value = '';
}

function setMain(m) {
  mainFilter = m;
  subFilter = 'todos';
  sub2Filter = 'todos';
  clearSearch();
  visibleCount = PAGE;
  syncChips();
  renderGrid();
}

function setSub(s) {
  mainFilter = 'cabides';
  subFilter = s;
  sub2Filter = 'todos';
  clearSearch();
  visibleCount = PAGE;
  syncChips();
  renderGrid();
}

function setSub2(s) {
  sub2Filter = s;
  clearSearch();
  visibleCount = PAGE;
  syncChips();
  renderGrid();
}

filterBar.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip) setMain(chip.dataset.main);
});

filterSubBar.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip) setSub(chip.dataset.sub);
});

filterSub2Bar.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip) setSub2(chip.dataset.sub);
});

/* ---- Busca no header ---- */
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  searchQuery = norm(searchInput.value.trim());
  visibleCount = PAGE;
  syncChips();
  renderGrid();
});

document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('produtos').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

renderGrid();

/* ================================================================
   Dropdown "Produtos" no menu (12 destaques do catálogo)
   ================================================================ */
const QUOTAS = { cabides: 6, araras: 3, bustos: 1, manequins: 2 };
const destaques = [];
const usados = new Set();
Object.entries(QUOTAS).forEach(([cat, n]) => {
  window.PRODUTOS.filter((p) => p.cats[0] === cat).slice(0, n).forEach((p) => {
    if (!usados.has(p.slug)) { usados.add(p.slug); destaques.push(p); }
  });
});

const dropHTML =
  destaques.map((p) => {
    const nome = p.nome.length > 30 ? p.nome.slice(0, 29).trim() + '…' : p.nome;
    return `<a href="#p-${p.slug}" data-goto role="menuitem">
      <img src="assets/products/${p.slug}.webp" alt="" loading="lazy">
      <span class="dp-name">${esc(nome)}<b>R$ ${p.preco_unit} /un.</b></span>
    </a>`;
  }).join('') +
  `<a href="#produtos" data-filter-jump="todos" role="menuitem" class="dropdown-all">Ver catálogo completo (${window.PRODUTOS.length}) →</a>`;

document.querySelectorAll('.js-drop-products').forEach((el) => { el.innerHTML = dropHTML; });

/* garante que o card do produto escolhido está renderizado, rola e destaca */
function showProduct(slug) {
  abrirProduto(slug);
}

document.querySelectorAll('[data-goto]').forEach((a) => {
  a.addEventListener('click', () => showProduct(a.getAttribute('href').replace('#p-', '')));
});

/* ================================================================
   Carrinho
   ================================================================ */
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartFootEl = document.getElementById('cartFoot');
const cartTotalEl = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');
const cartFeedback = document.getElementById('cartFeedback');

let cart = {};
try { cart = JSON.parse(localStorage.getItem('univ_cart') || '{}'); } catch (e) { cart = {}; }

const prodBySlug = (slug) => window.PRODUTOS.find((p) => p.slug === slug);

function saveCart() {
  localStorage.setItem('univ_cart', JSON.stringify(cart));
}

function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [slug, qtd]) => {
    const p = prodBySlug(slug);
    return p ? sum + precoNum(p.preco_unit) * qtd : sum;
  }, 0);
}

/* ---- Frete e cupom ---- */
let freteSel = null;
let cupom = null;

const CUPONS = {
  PRIMEIRA10: { pct: 10 },
  ROLETA10: { pct: 10, roleta: true },
  ROLETA5: { pct: 5, roleta: true },
  ROLETA10OFF: { valor: 10, roleta: true },
  ROLETA20OFF: { valor: 20, roleta: true },
};

const CUPOM_ROTULO = {
  PRIMEIRA10: '10% OFF · primeira compra',
  ROLETA10: '10% OFF · prêmio da roleta',
  ROLETA5: '5% OFF · prêmio da roleta',
  ROLETA10OFF: 'R$ 10 OFF · prêmio da roleta',
  ROLETA20OFF: 'R$ 20 OFF · prêmio da roleta',
};

function renderCuponsDisponiveis() {
  const box = document.getElementById('cuponsDisponiveis');
  if (!box) return;
  const lista = [{ codigo: 'PRIMEIRA10' }];
  const rc = cupomRoletaValido();
  if (rc) {
    const dt = new Date(rc.expira);
    lista.push({ codigo: rc.codigo, extra: ` · até ${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')}` });
  }
  box.innerHTML = '<span class="cupons-titulo">Cupons disponíveis — toca pra usar:</span>' +
    lista.map((c) => `
      <button type="button" class="cupom-chip${cupom && cupom.codigo === c.codigo ? ' is-on' : ''}" data-cupom="${c.codigo}">
        <b>${c.codigo}</b><span>${CUPOM_ROTULO[c.codigo] || ''}${c.extra || ''}</span>
        ${cupom && cupom.codigo === c.codigo ? '<i>aplicado ✓</i>' : ''}
      </button>`).join('');

  box.querySelectorAll('[data-cupom]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const codigo = btn.dataset.cupom;
      const campo = document.getElementById('cartCupom');
      const aplicar = document.getElementById('cartAplicarCupom');
      if (cupom && cupom.codigo === codigo) {
        cupom = null;                       // toca de novo = remove
        campo.value = '';
        campo.disabled = false;
        aplicar.textContent = 'Aplicar';
        aplicar.disabled = false;
      } else {
        campo.disabled = false;
        aplicar.disabled = false;
        aplicar.textContent = 'Aplicar';
        campo.value = codigo;
        aplicarCupom();
      }
      renderCuponsDisponiveis();
      atualizarTotais();
    })
  );
}

function cupomRoletaValido() {
  try {
    const rc = JSON.parse(localStorage.getItem('univ_roleta') || 'null');
    if (rc && rc.expira > Date.now()) return rc;
  } catch (e) { /* noop */ }
  return null;
}

function aplicarCupom() {
  const campo = document.getElementById('cartCupom');
  const codigo = campo.value.trim().toUpperCase();
  if (!codigo) return;
  const def = CUPONS[codigo];
  const rc = cupomRoletaValido();
  if (def && def.roleta && (!rc || rc.codigo !== codigo)) {
    cupom = null;
    cartFeedback.textContent = 'Esse cupom da roleta expirou (vale 3 dias) — gira de novo semana que vem!';
    cartFeedback.hidden = false;
    atualizarTotais();
    return;
  }
  if (def) {
    cupom = { codigo, ...def };
    campo.value = codigo;
    campo.disabled = true;
    document.getElementById('cartAplicarCupom').textContent = 'Aplicado ✓';
    document.getElementById('cartAplicarCupom').disabled = true;
    cartFeedback.hidden = true;
  } else {
    cupom = null;
    cartFeedback.textContent = 'Esse cupom não existe ou expirou. Confere se digitou certinho?';
    cartFeedback.hidden = false;
  }
  atualizarTotais();
}

function resetFrete() {
  freteSel = null;
  const box = document.getElementById('freteOpcoes');
  if (box) box.innerHTML = '';
  atualizarTotais();
}

function descontoAtual() {
  if (!cupom) return 0;
  const sub = cartSubtotal();
  if (cupom.pct) return sub * cupom.pct / 100;
  return Math.min(cupom.valor || 0, sub);
}

function totalFinalNum() {
  return cartSubtotal() - descontoAtual() + (freteSel ? freteSel.valor : 0);
}

function atualizarTotais() {
  const linhaFrete = document.getElementById('linhaFrete');
  const linhaTotal = document.getElementById('linhaTotal');
  const linhaDesc = document.getElementById('linhaDesconto');
  if (!linhaFrete) return;

  const desc = descontoAtual();
  if (desc > 0) {
    document.getElementById('descLabel').textContent =
      cupom.pct ? `Cupom ${cupom.codigo} (−${cupom.pct}%)` : `Cupom ${cupom.codigo}`;
    document.getElementById('descValor').textContent = '−' + money(desc);
  }
  linhaDesc.hidden = desc <= 0;

  if (freteSel) {
    document.getElementById('freteLabel').textContent = `Frete (${freteSel.nome})`;
    document.getElementById('freteValor').textContent = money(freteSel.valor);
    document.getElementById('cartNote').textContent = 'Frete estimado — se houver diferença, confirmamos antes de enviar.';
  }
  linhaFrete.hidden = !freteSel;

  const mostraTotal = desc > 0 || freteSel;
  if (mostraTotal) document.getElementById('totalFinal').textContent = money(totalFinalNum());
  linhaTotal.hidden = !mostraTotal;
}

async function calcularFrete() {
  const cep = document.getElementById('cartCep').value.replace(/\D/g, '');
  const box = document.getElementById('freteOpcoes');
  if (cep.length !== 8) {
    box.innerHTML = '<p class="frete-erro">Digita o CEP completo (8 números).</p>';
    return;
  }
  const itens = Object.entries(cart)
    .filter(([slug]) => prodBySlug(slug))
    .map(([slug, qtd]) => {
      const p = prodBySlug(slug);
      return { slug, nome: p.nome, preco: p.preco_unit, qtd, cat: p.cats[0] };
    });
  box.innerHTML = '<p class="frete-erro">Calculando...</p>';
  try {
    const r = await fetch(`${BACKEND_SITE}/frete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cep, itens }),
    });
    const d = await r.json();
    if (d.indisponivel) {
      document.getElementById('cartCepBox').hidden = true;
      return;
    }
    if (!d.ok || !d.opcoes?.length) {
      box.innerHTML = '<p class="frete-erro">Não achamos frete pra esse CEP — fecha pelo WhatsApp que a gente cota pra você.</p>';
      return;
    }
    box.innerHTML = d.opcoes.map((o, i) => `
      <label class="frete-op">
        <input type="radio" name="freteOp" value="${i}">
        <span class="frete-op-info"><b>${esc(o.nome)}${o.transportadora ? ' · ' + esc(o.transportadora) : ''}</b><small>até ${o.prazo} dias úteis</small></span>
        <strong>${money(o.valor)}</strong>
      </label>`).join('');
    box.querySelectorAll('input[name="freteOp"]').forEach((inp) =>
      inp.addEventListener('change', () => {
        const o = d.opcoes[parseInt(inp.value, 10)];
        freteSel = { nome: o.nome, valor: o.valor, prazo: o.prazo, cep };
        atualizarTotais();
      })
    );
  } catch (e) {
    box.innerHTML = '<p class="frete-erro">Não deu pra calcular agora — fecha pelo WhatsApp que a gente cota na hora.</p>';
  }
}

function renderCart() {
  const entries = Object.entries(cart).filter(([slug]) => prodBySlug(slug));
  cartItemsEl.innerHTML = entries.map(([slug, qtd]) => {
    const p = prodBySlug(slug);
    return `<div class="cart-item" data-slug="${slug}">
      <img src="assets/products/${slug}.webp" alt="" loading="lazy">
      <div class="cart-item-info">
        <span class="cart-item-nome">${esc(p.nome)}</span>
        <span class="cart-item-preco">${money(precoNum(p.preco_unit))} <small>/unid.</small></span>
        <div class="cart-qty">
          <button data-menos="${slug}" aria-label="Diminuir">−</button>
          <span>${qtd}</span>
          <button data-mais="${slug}" aria-label="Aumentar">+</button>
          <button class="cart-remove" data-remove="${slug}" aria-label="Remover">Remover</button>
        </div>
      </div>
    </div>`;
  }).join('');

  const n = cartCount();
  cartEmptyEl.hidden = n > 0;
  cartFootEl.hidden = n === 0;
  cartTotalEl.textContent = money(cartSubtotal());
  cartBadge.hidden = n === 0;
  cartBadge.textContent = n;
  resetFrete(); /* carrinho mudou => cotação anterior não vale mais */
}

function openCart() {
  renderCart();
  renderCuponsDisponiveis();
  cartFeedback.hidden = true;
  cartBackdrop.hidden = false;
  requestAnimationFrame(() => {
    cartBackdrop.classList.add('is-open');
    cartDrawer.classList.add('is-open');
  });
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartBackdrop.classList.remove('is-open');
  cartDrawer.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => { cartBackdrop.hidden = true; }, 400);
}

function addToCart(slug) {
  cart[slug] = (cart[slug] || 0) + 1;
  saveCart();
  renderCart();
  cartBadge.classList.remove('pop');
  void cartBadge.offsetWidth;
  cartBadge.classList.add('pop');
  openCart();
}

document.getElementById('cartOpen').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartCalcFrete').addEventListener('click', calcularFrete);
document.getElementById('cartAplicarCupom').addEventListener('click', aplicarCupom);
document.getElementById('cartCupom').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); aplicarCupom(); }
});
document.getElementById('cartCep').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); calcularFrete(); }
});
cartBackdrop.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeCart(); fecharProduto(); }
});

/* botões "Adicionar" (cards renderizados dinamicamente → delegação) */
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add]');
  if (btn) { addToCart(btn.dataset.add); return; }
  const ver = e.target.closest('[data-view]');
  if (ver) abrirProduto(ver.dataset.view);
});

/* ================================================================
   Visualização de produto
   ================================================================ */
let pvSlug = null;
let pvQuantidade = 1;
let pvTimer = null;

function pararApresentacao() {
  if (pvTimer) { clearInterval(pvTimer); pvTimer = null; }
  const img = document.getElementById('pvImg');
  if (img) img.classList.remove('pv-anim');
}

function abrirProduto(slug) {
  const p = prodBySlug(slug);
  if (!p) return;
  pvSlug = slug;
  pvQuantidade = 1;
  document.getElementById('pvQtd').textContent = '1';
  const catMaisEspecifica = [...p.cats].reverse().find((c) => CAT_LABEL[c]) || p.cats[0];
  document.getElementById('pvCat').textContent =
    (CAT_LABEL[catMaisEspecifica] || '') + (p.sku ? ' · SKU ' + p.sku : '');
  document.getElementById('pvNome').textContent = p.nome;
  const temPreco = !!p.preco_unit;
  document.getElementById('pvPreco').textContent = temPreco ? 'R$ ' + p.preco_unit : 'Consulte o preço';
  document.getElementById('pvKit').textContent = !temPreco
    ? 'Chama no WhatsApp que passamos o valor na hora'
    : p.unidades > 1
      ? `Vendido por unidade — levando ${p.unidades} ou mais, rende: ${p.kit.toLowerCase()} por R$ ${p.preco}`
      : 'Vendido por unidade';
  document.getElementById('pvAdd').hidden = !temPreco;
  document.getElementById('pvWhats').href = buyHref('o produto ' + p.nome + (p.sku ? ' (SKU ' + p.sku + ')' : ''));

  const sufixos = (p.galeria && p.galeria.length)
    ? p.galeria
    : Array.from({ length: p.fotos || 1 }, (_, i) => (i ? '-' + (i + 1) : ''));
  const srcs = sufixos.map((s) => `assets/products/${slug}${s}.webp`);
  const ROTULO = { '-med': 'Medidas', '-det': 'Detalhe' };
  pararApresentacao();
  const img = document.getElementById('pvImg');
  img.src = srcs[0];
  const thumbs = srcs.map((s, i) => {
    const rot = ROTULO[sufixos[i]];
    return `<button class="pv-thumb${i === 0 ? ' is-on' : ''}" data-src="${s}">` +
      `<img src="${s}" alt="" loading="lazy">${rot ? `<span class="pv-tag">${rot}</span>` : ''}</button>`;
  });
  if (srcs.length > 1) {
    thumbs.push('<button class="pv-thumb pv-thumb-play" id="pvPlay" title="Apresentação">' +
      '<span class="pv-play-ico">&#9654;</span><span class="pv-tag">Ver girando</span></button>');
  }
  document.getElementById('pvThumbs').innerHTML = srcs.length > 1 ? thumbs.join('') : '';
  document.getElementById('pvThumbs').querySelectorAll('.pv-thumb:not(.pv-thumb-play)').forEach((t) =>
    t.addEventListener('click', () => {
      pararApresentacao();
      img.src = t.dataset.src;
      document.querySelectorAll('.pv-thumb').forEach((x) => x.classList.toggle('is-on', x === t));
    })
  );
  const play = document.getElementById('pvPlay');
  if (play) play.addEventListener('click', () => {
    if (pvTimer) { pararApresentacao(); return; }
    document.querySelectorAll('.pv-thumb').forEach((x) => x.classList.toggle('is-on', x === play));
    let i = 0;
    img.classList.add('pv-anim');
    const passo = () => {
      img.classList.remove('pv-anim');
      void img.offsetWidth;
      img.src = srcs[i % srcs.length];
      img.classList.add('pv-anim');
      i++;
    };
    passo();
    pvTimer = setInterval(passo, 1800);
  });

  const wrap = document.getElementById('pvDescWrap');
  if (p.desc) {
    document.getElementById('pvDesc').textContent = p.desc;
    wrap.hidden = false;
  } else {
    wrap.hidden = true;
  }

  const bd = document.getElementById('pvBackdrop');
  bd.hidden = false;
  requestAnimationFrame(() => bd.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
}

function fecharProduto() {
  pararApresentacao();
  const bd = document.getElementById('pvBackdrop');
  if (!bd || bd.hidden) return;
  bd.classList.remove('is-open');
  setTimeout(() => { bd.hidden = true; }, 250);
  document.body.style.overflow = '';
}

document.getElementById('pvFechar').addEventListener('click', fecharProduto);
document.getElementById('pvBackdrop').addEventListener('click', (e) => {
  if (e.target === document.getElementById('pvBackdrop')) fecharProduto();
});
document.getElementById('pvMais').addEventListener('click', () => {
  pvQuantidade++;
  document.getElementById('pvQtd').textContent = pvQuantidade;
});
document.getElementById('pvMenos').addEventListener('click', () => {
  if (pvQuantidade > 1) pvQuantidade--;
  document.getElementById('pvQtd').textContent = pvQuantidade;
});
document.getElementById('pvAdd').addEventListener('click', () => {
  if (!pvSlug) return;
  cart[pvSlug] = (cart[pvSlug] || 0) + pvQuantidade;
  saveCart();
  renderCart();
  fecharProduto();
  openCart();
});

/* +/−/remover dentro do carrinho */
cartItemsEl.addEventListener('click', (e) => {
  const mais = e.target.closest('[data-mais]');
  const menos = e.target.closest('[data-menos]');
  const remove = e.target.closest('[data-remove]');
  if (mais) cart[mais.dataset.mais]++;
  if (menos) {
    const s = menos.dataset.menos;
    cart[s]--;
    if (cart[s] <= 0) delete cart[s];
  }
  if (remove) delete cart[remove.dataset.remove];
  if (mais || menos || remove) { saveCart(); renderCart(); }
});

/* ---- Fechamento do pedido (WhatsApp ou pagamento online) ---- */
const BACKEND_SITE = 'https://ml-reclamacoes-mediacoes.onrender.com/site';

function dadosDoCarrinho() {
  const nome = document.getElementById('cartNome').value.trim();
  const fone = document.getElementById('cartFone').value.replace(/\D/g, '');
  if (!nome || fone.length < 10) {
    cartFeedback.textContent = 'Preencha seu nome e WhatsApp com DDD pra gente confirmar o pedido.';
    cartFeedback.hidden = false;
    return null;
  }
  const itens = Object.entries(cart)
    .filter(([slug]) => prodBySlug(slug))
    .map(([slug, qtd]) => {
      const p = prodBySlug(slug);
      return { slug, nome: p.nome, preco: p.preco_unit, qtd };
    });
  if (!itens.length) return null;
  return { nome, fone, itens, frete: freteSel, cupom, desconto: descontoAtual(), total: money(totalFinalNum()) };
}

/* grava o pedido e devolve o id (null se falhar).
   O id nasce aqui no navegador: a tabela só aceita INSERT do público
   (leitura é bloqueada), então não dá pra pedir o id de volta. */
function novoId() {
  if (window.crypto?.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

async function registrarPedido(d) {
  const id = novoId();
  try {
    const r = await fetch(`${SUPA_URL}/rest/v1/site_pedidos`, {
      method: 'POST',
      headers: {
        apikey: SUPA_KEY,
        Authorization: `Bearer ${SUPA_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ id, nome: d.nome, telefone: d.fone, itens: d.itens, frete: d.frete, cupom: d.cupom ? d.cupom.codigo : null, total: d.total }),
    });
    return r.ok ? id : null;
  } catch (e) {
    return null;
  }
}

function travarBotao(btn, texto) {
  const html = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = texto;
  return () => { btn.disabled = false; btn.innerHTML = html; };
}

/* Opção 1: pagar online (Mercado Pago) */
document.getElementById('cartPayOnline').addEventListener('click', async () => {
  const d = dadosDoCarrinho();
  if (!d) return;
  const soltar = travarBotao(document.getElementById('cartPayOnline'), 'Preparando pagamento...');

  const pedidoId = await registrarPedido(d);
  if (!pedidoId) {
    soltar();
    cartFeedback.textContent = 'Não conseguimos registrar o pedido agora. Tenta pelo WhatsApp aqui embaixo. 🙏';
    cartFeedback.hidden = false;
    return;
  }

  try {
    const r = await fetch(`${BACKEND_SITE}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pedido_id: pedidoId, itens: d.itens, frete: d.frete, cupom: d.cupom ? d.cupom.codigo : null }),
    });
    const resp = await r.json();
    if (resp.ok && resp.init_point) {
      cart = {};
      saveCart();
      window.location.href = resp.init_point; // vai pro Mercado Pago pagar
      return;
    }
    throw new Error(resp.erro || 'checkout indisponível');
  } catch (e) {
    soltar();
    cartFeedback.textContent = 'O pagamento online está indisponível agora — fecha pelo WhatsApp que a gente te manda o Pix. 👇';
    cartFeedback.hidden = false;
  }
});

/* Opção 2: fechar pelo WhatsApp */
document.getElementById('cartCheckout').addEventListener('click', async () => {
  const d = dadosDoCarrinho();
  if (!d) return;
  const soltar = travarBotao(document.getElementById('cartCheckout'), 'Enviando pedido...');

  const pedidoId = await registrarPedido(d);

  const linhas = d.itens.map((i) => `• ${i.qtd}x ${i.nome} — R$ ${i.preco}`).join('\n');
  const freteTxt = d.frete
    ? `\nFrete (${d.frete.nome} · até ${d.frete.prazo} dias úteis): ${money(d.frete.valor)}\nCEP: ${d.frete.cep}`
    : '';
  const msg = `Olá! Fiz um pedido pelo site 🛒\n\n${linhas}${freteTxt}\n\nTotal: ${d.total}\nNome: ${d.nome}\nWhatsApp: ${d.fone}`;

  cart = {};
  saveCart();
  renderCart();
  soltar();

  cartFeedback.textContent = pedidoId
    ? 'Pedido registrado! Já recebemos aqui e vamos te chamar pra confirmar frete e pagamento. ✅'
    : 'Pedido enviado! Finalize a conversa no WhatsApp que abrimos pra você.';
  cartFeedback.hidden = false;

  if (CANAIS.whatsapp) {
    window.open(`https://wa.me/${CANAIS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  }
});

/* Volta do Mercado Pago: mostra o resultado e limpa a URL */
(function retornoPagamento() {
  const st = new URLSearchParams(window.location.search).get('pagamento');
  if (!st) return;
  const MSGS = {
    sucesso: ['✅ Pagamento aprovado!', 'Seu pedido está confirmado. Vamos preparar tudo e te avisar no WhatsApp.'],
    pendente: ['⏳ Pagamento em processamento', 'Assim que o Mercado Pago confirmar, seu pedido entra na fila. Qualquer coisa te chamamos no WhatsApp.'],
    erro: ['😕 O pagamento não foi concluído', 'Nada foi cobrado. Você pode tentar de novo ou fechar o pedido pelo WhatsApp.'],
  };
  const [titulo, texto] = MSGS[st] || MSGS.erro;
  const el = document.createElement('div');
  el.className = 'pay-toast' + (st === 'sucesso' ? ' pay-toast-ok' : '');
  el.innerHTML = `<strong>${titulo}</strong><span>${texto}</span><button aria-label="Fechar">✕</button>`;
  document.body.appendChild(el);
  el.querySelector('button').addEventListener('click', () => el.remove());
  if (st === 'sucesso') { cart = {}; saveCart(); renderCart(); }
  history.replaceState({}, '', window.location.pathname);
})();

/* ---- Botões estáticos de WhatsApp e links de canais ---- */
document.querySelectorAll('[data-buy]').forEach((el) => {
  el.href = buyHref(el.dataset.buy);
  el.target = '_blank';
  el.rel = 'noopener';
});

document.querySelectorAll('[data-link]').forEach((el) => {
  const url = CANAIS[el.dataset.link];
  if (url) {
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener';
  }
});

/* ---- Header: sombra ao rolar ---- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Menu mobile ---- */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  })
);

/* ---- Dropdowns do menu (Categorias e Produtos) ---- */
const navDrops = [...document.querySelectorAll('.nav-drop')];

function closeDrop(drop) {
  drop.classList.remove('is-open');
  drop.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false');
}

navDrops.forEach((drop) => {
  const btn = drop.querySelector('.nav-drop-btn');

  btn.addEventListener('click', () => {
    const open = drop.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    navDrops.forEach((other) => { if (other !== drop) closeDrop(other); });
  });

  drop.querySelectorAll('.dropdown a').forEach((a) =>
    a.addEventListener('click', () => closeDrop(drop))
  );
});

document.addEventListener('click', (e) => {
  navDrops.forEach((drop) => {
    if (!drop.contains(e.target)) closeDrop(drop);
  });
});

/* cards de categoria e itens do menu levam direto pra aba certa */
const SUBS_CABIDES = SUBS.cabides.map(([v]) => v);
document.querySelectorAll('[data-filter-jump]').forEach((cardLink) => {
  cardLink.addEventListener('click', () => {
    const target = cardLink.dataset.filterJump;
    if (NICHOS.includes(target)) setMain(target);
    else if (SUBS_CABIDES.includes(target)) setSub(target);
    else setMain('todos');
  });
});

/* ================================================================
   Carrossel de banners (scroll-snap + autoplay + slide ativo)
   ================================================================ */
const track = document.getElementById('bannerTrack');
const slides = [...track.children];
const dotsWrap = document.getElementById('bannerDots');
let current = 0;
let autoTimer = null;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'banner-dot' + (i === 0 ? ' is-active' : '');
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', 'Ir para o banner ' + (i + 1));
  dot.addEventListener('click', () => { goTo(i); restartAuto(); });
  dotsWrap.appendChild(dot);
});
const dots = [...dotsWrap.children];

function setActive(i) {
  slides.forEach((s, j) => s.classList.toggle('is-active', j === i));
  dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
}
setActive(0);

function goTo(i) {
  current = (i + slides.length) % slides.length;
  track.scrollTo({ left: current * track.clientWidth, behavior: reduceMotion ? 'instant' : 'smooth' });
  setActive(current);
}

let scrollDebounce;
track.addEventListener('scroll', () => {
  clearTimeout(scrollDebounce);
  scrollDebounce = setTimeout(() => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== current) {
      current = i;
      setActive(current);
    }
  }, 80);
}, { passive: true });

document.getElementById('bannerPrev').addEventListener('click', () => { goTo(current - 1); restartAuto(); });
document.getElementById('bannerNext').addEventListener('click', () => { goTo(current + 1); restartAuto(); });

function startAuto() {
  if (reduceMotion) return;
  autoTimer = setInterval(() => {
    if (document.visibilityState === 'hidden') return;
    goTo(current + 1);
  }, 7000);
}
function restartAuto() {
  clearInterval(autoTimer);
  startAuto();
}
track.addEventListener('pointerenter', () => clearInterval(autoTimer));
track.addEventListener('pointerleave', startAuto);
startAuto();

window.addEventListener('resize', () => {
  track.scrollTo({ left: current * track.clientWidth, behavior: 'instant' });
});

/* ================================================================
   Reveal on scroll (com stagger por grupo)
   ================================================================ */
const revealEls = document.querySelectorAll('.reveal');

if (!('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  const groups = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    const index = groups.get(parent);
    el.style.setProperty('--reveal-delay', `${Math.min(index * 60, 300)}ms`);
    groups.set(parent, index + 1);
    io.observe(el);
  });
}

/* ================================================================
   Números animados
   ================================================================ */
const counters = document.querySelectorAll('[data-count]');

if ('IntersectionObserver' in window && !reduceMotion) {
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => cio.observe(el));
}

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); /* ease-out cúbico */
    const value = (target * eased).toFixed(decimals).replace('.', ',');
    el.textContent = prefix + value + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ================================================================
   FAQ: fecha os outros ao abrir um
   ================================================================ */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

/* ---- Ano no rodapé ---- */
document.getElementById('year').textContent = new Date().getFullYear();


/* ================================================================
   Roleta da sorte — semanal, prêmio vale 3 dias
   ================================================================ */
(function roleta() {
  const PREMIOS = [
    { codigo: 'ROLETA10', rotulo: '10% OFF', peso: 25 },
    { codigo: 'ROLETA10OFF', rotulo: 'R$ 10 OFF', peso: 25 },
    { codigo: 'ROLETA5', rotulo: '5% OFF', peso: 35 },
    { codigo: 'ROLETA20OFF', rotulo: 'R$ 20 OFF', peso: 15 },
  ];
  const backdrop = document.getElementById('roletaBackdrop');
  if (!backdrop) return;

  const prox = parseInt(localStorage.getItem('univ_roleta_prox') || '0', 10);
  if (Date.now() < prox) return;

  setTimeout(() => { backdrop.hidden = false; requestAnimationFrame(() => backdrop.classList.add('is-open')); }, 4500);

  function fechar(diasAteVoltar) {
    backdrop.classList.remove('is-open');
    setTimeout(() => { backdrop.hidden = true; }, 300);
    localStorage.setItem('univ_roleta_prox', String(Date.now() + diasAteVoltar * 864e5));
  }

  document.getElementById('roletaFechar').addEventListener('click', () => fechar(1));

  let girou = false;
  document.getElementById('roletaGirar').addEventListener('click', () => {
    if (girou) return;
    girou = true;
    const total = PREMIOS.reduce((a, p) => a + p.peso, 0);
    let sorte = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < PREMIOS.length; i++) { sorte -= PREMIOS[i].peso; if (sorte <= 0) { idx = i; break; } }
    const premio = PREMIOS[idx];

    const disco = document.getElementById('roletaDisco');
    const destino = 6 * 360 + (360 - (idx * 90 + 45));
    disco.style.transition = 'transform 4.2s cubic-bezier(0.12, 0.6, 0.08, 1)';
    disco.style.transform = `rotate(${destino}deg)`;
    document.getElementById('roletaGirar').disabled = true;

    setTimeout(() => {
      const expira = Date.now() + 3 * 864e5;
      localStorage.setItem('univ_roleta', JSON.stringify({ codigo: premio.codigo, expira }));
      localStorage.setItem('univ_roleta_prox', String(Date.now() + 7 * 864e5));
      document.getElementById('roletaParabens').textContent = `Você ganhou ${premio.rotulo}! 🎉`;
      document.getElementById('roletaCodigo').textContent = premio.codigo;
      const dt = new Date(expira);
      document.getElementById('roletaValidade').textContent =
        `Válido até ${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')} — já deixamos aplicado no seu carrinho.`;
      document.getElementById('roletaGirar').hidden = true;
      document.getElementById('roletaPremio').hidden = false;
    }, 4400);
  });

  document.getElementById('roletaUsar').addEventListener('click', () => {
    fechar(7);
    document.getElementById('cartCupom').value = '';
    cupom = null;
    openCart();
  });
})();
