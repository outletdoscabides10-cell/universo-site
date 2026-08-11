/* ================================================================
   Universo dos Cabides — interações
   Catálogo: js/produtos.js (window.PRODUTOS)
   ================================================================ */

/* ---- CONFIGURE AQUI OS CANAIS DA MARCA ---- */
const CANAIS = {
  whatsapp: '5511952300060',               // WhatsApp oficial da loja
  instagram: 'https://www.instagram.com',  // TODO: link do perfil, ex: https://instagram.com/universodoscabides
  ml: 'https://www.mercadolivre.com.br',   // TODO: link da loja no Mercado Livre (só aparece no rodapé)
  shopee: 'https://shopee.com.br',         // TODO: link da loja na Shopee (só aparece no rodapé)
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
  veludo: 'Cabide · Veludo',
  madeira: 'Cabide · Madeira',
  plastico: 'Cabide · Plástico & Acrílico',
  silhuetas: 'Cabide · Silhueta',
  metal: 'Cabide · Metal & Emborrachado',
  infantil: 'Cabide · Infantil',
  araras: 'Arara',
  bustos: 'Busto',
  manequins: 'Manequim',
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

/* nichos principais e materiais de cabide (sub-abas) */
const NICHOS = ['todos', 'cabides', 'araras', 'bustos', 'manequins'];
const CABIDE_CATS = ['veludo', 'madeira', 'plastico', 'silhuetas', 'metal', 'infantil'];

let mainFilter = 'todos';
let subFilter = 'todos';
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
  if (mainFilter === 'cabides') {
    return window.PRODUTOS.filter((p) =>
      p.cats.some((c) => CABIDE_CATS.includes(c)) &&
      (subFilter === 'todos' || p.cats.includes(subFilter))
    );
  }
  return window.PRODUTOS.filter((p) => p.cats.includes(mainFilter));
}

function cardHTML(p) {
  const kit = p.kit ? p.kit : CAT_LABEL[p.cats[0]] || '';
  const enter = reduceMotion ? '' : ' is-entering';
  return `<article class="prod-card${enter}" id="p-${p.slug}" data-cat="${p.cats.join(' ')}">
    <div class="prod-photo"><img src="assets/products/${p.slug}.webp" alt="${esc(p.nome)}" loading="lazy"></div>
    <div class="prod-info">
      <span class="prod-kit">${esc(kit)}</span>
      <h3>${esc(p.nome)}</h3>
      <div class="prod-buy">
        <div class="prod-price"><span>a partir de</span><strong>R$ ${p.preco}</strong></div>
        <button class="btn btn-wa btn-sm" data-add="${p.slug}">+ Adicionar</button>
      </div>
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

function syncChips() {
  filterBar.querySelectorAll('.chip').forEach((c) =>
    c.classList.toggle('is-active', !searchQuery && c.dataset.main === mainFilter)
  );
  filterSubBar.querySelectorAll('.chip').forEach((c) =>
    c.classList.toggle('is-active', !searchQuery && c.dataset.sub === subFilter)
  );
  filterSubBar.hidden = mainFilter !== 'cabides' || !!searchQuery;
}

function clearSearch() {
  searchQuery = '';
  searchInput.value = '';
}

function setMain(m) {
  mainFilter = m;
  subFilter = 'todos';
  clearSearch();
  visibleCount = PAGE;
  syncChips();
  renderGrid();
}

function setSub(s) {
  mainFilter = 'cabides';
  subFilter = s;
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
const QUOTAS = { veludo: 2, madeira: 2, plastico: 1, silhuetas: 1, metal: 1, infantil: 1, araras: 2, bustos: 1, manequins: 1 };
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
      <span class="dp-name">${esc(nome)}<b>R$ ${p.preco}</b></span>
    </a>`;
  }).join('') +
  `<a href="#produtos" data-filter-jump="todos" role="menuitem" class="dropdown-all">Ver catálogo completo (${window.PRODUTOS.length}) →</a>`;

document.querySelectorAll('.js-drop-products').forEach((el) => { el.innerHTML = dropHTML; });

/* garante que o card do produto escolhido está renderizado, rola e destaca */
function showProduct(slug) {
  clearSearch();
  mainFilter = 'todos';
  subFilter = 'todos';
  syncChips();
  const idx = window.PRODUTOS.findIndex((p) => p.slug === slug);
  if (idx >= visibleCount) visibleCount = Math.ceil((idx + 1) / PAGE) * PAGE;
  renderGrid();
  const card = document.getElementById('p-' + slug);
  if (!card) return;
  card.classList.remove('is-flash');
  void card.offsetWidth;
  card.classList.add('is-flash');
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
    return p ? sum + precoNum(p.preco) * qtd : sum;
  }, 0);
}

function renderCart() {
  const entries = Object.entries(cart).filter(([slug]) => prodBySlug(slug));
  cartItemsEl.innerHTML = entries.map(([slug, qtd]) => {
    const p = prodBySlug(slug);
    return `<div class="cart-item" data-slug="${slug}">
      <img src="assets/products/${slug}.webp" alt="" loading="lazy">
      <div class="cart-item-info">
        <span class="cart-item-nome">${esc(p.nome)}</span>
        <span class="cart-item-preco">${money(precoNum(p.preco))}</span>
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
}

function openCart() {
  renderCart();
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
cartBackdrop.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});

/* botões "Adicionar" (cards renderizados dinamicamente → delegação) */
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add]');
  if (btn) addToCart(btn.dataset.add);
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
      return { slug, nome: p.nome, preco: p.preco, qtd };
    });
  if (!itens.length) return null;
  return { nome, fone, itens, total: money(cartSubtotal()) };
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
      body: JSON.stringify({ id, nome: d.nome, telefone: d.fone, itens: d.itens, total: d.total }),
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
      body: JSON.stringify({ pedido_id: pedidoId, itens: d.itens }),
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
  const msg = `Olá! Fiz um pedido pelo site 🛒\n\n${linhas}\n\nSubtotal: ${d.total}\nNome: ${d.nome}\nWhatsApp: ${d.fone}`;

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

/* cards de categoria e itens do menu levam direto pro filtro certo:
   nichos ativam a aba principal; materiais ativam Cabides + sub-aba */
document.querySelectorAll('[data-filter-jump]').forEach((cardLink) => {
  cardLink.addEventListener('click', () => {
    const target = cardLink.dataset.filterJump;
    if (NICHOS.includes(target)) setMain(target);
    else setSub(target);
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
