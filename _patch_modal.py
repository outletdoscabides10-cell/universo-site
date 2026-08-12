# -*- coding: utf-8 -*-
# Patch: modal de produto + cards minimalistas (rodar da raiz do site e apagar depois)
import io, sys

html = open('index.html', encoding='utf-8').read()
modal = '''
  <!-- ============ VISUALIZACAO DE PRODUTO ============ -->
  <div class="pv-backdrop" id="pvBackdrop" hidden>
    <div class="pv" role="dialog" aria-label="Detalhes do produto">
      <button class="pv-fechar" id="pvFechar" aria-label="Fechar">✕</button>
      <div class="pv-galeria">
        <div class="pv-palco"><img id="pvImg" alt=""></div>
        <div class="pv-thumbs" id="pvThumbs"></div>
      </div>
      <div class="pv-info">
        <span class="pv-cat" id="pvCat"></span>
        <h2 id="pvNome"></h2>
        <div class="pv-preco"><strong id="pvPreco"></strong><span>/ unidade</span></div>
        <p class="pv-kit" id="pvKit"></p>
        <div class="pv-acoes">
          <div class="pv-qtd">
            <button id="pvMenos" aria-label="Diminuir">−</button>
            <span id="pvQtd">1</span>
            <button id="pvMais" aria-label="Aumentar">+</button>
          </div>
          <button class="pv-add" id="pvAdd">Adicionar à sacola</button>
        </div>
        <a class="pv-whats" id="pvWhats" target="_blank" rel="noopener">Prefere fechar pelo WhatsApp? Fala com a gente →</a>
        <div class="pv-desc" id="pvDescWrap">
          <h4>Descrição</h4>
          <p id="pvDesc"></p>
        </div>
      </div>
    </div>
  </div>

  <!-- ============ CARRINHO ============ -->'''
html = html.replace('  <!-- ============ CARRINHO ============ -->', modal, 1)
open('index.html', 'w', encoding='utf-8').write(html)
print('modal html ok')

src = open('js/main.js', encoding='utf-8').read()

card_antigo = '''function cardHTML(p) {
  const kit = p.kit ? p.kit : CAT_LABEL[p.cats[0]] || '';
  const enter = reduceMotion ? '' : ' is-entering';
  return `<article class="prod-card${enter}" id="p-${p.slug}" data-cat="${p.cats.join(' ')}">
    <div class="prod-photo"><img src="assets/products/${p.slug}.webp" alt="${esc(p.nome)}" loading="lazy"></div>
    <div class="prod-info">
      <span class="prod-kit">${esc(kit)}</span>
      <h3>${esc(p.nome)}</h3>
      <div class="prod-buy">
        <div class="prod-price"><span>por unidade</span><strong>R$ ${p.preco_unit}</strong></div>
        <button class="btn btn-wa btn-sm" data-add="${p.slug}">+ Adicionar</button>
      </div>
    </div>
  </article>`;
}'''

card_novo = '''function cardHTML(p) {
  const enter = reduceMotion ? '' : ' is-entering';
  const hover = (p.fotos || 1) > 1
    ? `<img class="prod-hover" src="assets/products/${p.slug}-2.webp" alt="" loading="lazy">` : '';
  return `<article class="prod-card${enter}" id="p-${p.slug}" data-cat="${p.cats.join(' ')}">
    <div class="prod-photo" data-view="${p.slug}">
      <img src="assets/products/${p.slug}.webp" alt="${esc(p.nome)}" loading="lazy">${hover}
    </div>
    <div class="prod-info">
      <span class="prod-kit">${esc(CAT_LABEL[p.cats[0]] || '')}</span>
      <h3 data-view="${p.slug}">${esc(p.nome)}</h3>
      <div class="prod-price"><strong>R$ ${p.preco_unit}</strong><span>/ unidade</span></div>
      <button class="prod-add" data-add="${p.slug}">Adicionar à sacola</button>
    </div>
  </article>`;
}'''

assert card_antigo in src, 'card antigo nao encontrado'
src = src.replace(card_antigo, card_novo)

click_antigo = '''grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add]');
  if (btn) addToCart(btn.dataset.add);
});'''

click_novo = '''grid.addEventListener('click', (e) => {
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

function abrirProduto(slug) {
  const p = prodBySlug(slug);
  if (!p) return;
  pvSlug = slug;
  pvQuantidade = 1;
  document.getElementById('pvQtd').textContent = '1';
  document.getElementById('pvCat').textContent = CAT_LABEL[p.cats[0]] || '';
  document.getElementById('pvNome').textContent = p.nome;
  document.getElementById('pvPreco').textContent = 'R$ ' + p.preco_unit;
  document.getElementById('pvKit').textContent = p.unidades > 1
    ? `Vendido por unidade — rende bem: ${p.kit.toLowerCase()} sai por R$ ${p.preco}`
    : 'Vendido por unidade';
  document.getElementById('pvWhats').href = buyHref('o produto ' + p.nome);

  const n = p.fotos || 1;
  const srcs = Array.from({ length: n }, (_, i) => `assets/products/${slug}${i ? '-' + (i + 1) : ''}.webp`);
  document.getElementById('pvImg').src = srcs[0];
  document.getElementById('pvThumbs').innerHTML = n > 1
    ? srcs.map((s, i) => `<button class="pv-thumb${i === 0 ? ' is-on' : ''}" data-src="${s}"><img src="${s}" alt=""></button>`).join('')
    : '';
  document.getElementById('pvThumbs').querySelectorAll('.pv-thumb').forEach((t) =>
    t.addEventListener('click', () => {
      document.getElementById('pvImg').src = t.dataset.src;
      document.querySelectorAll('.pv-thumb').forEach((x) => x.classList.toggle('is-on', x === t));
    })
  );

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
});'''

assert click_antigo in src, 'bloco de clique nao encontrado'
src = src.replace(click_antigo, click_novo)

esc_antigo = '''document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});'''
esc_novo = '''document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeCart(); fecharProduto(); }
});'''
assert esc_antigo in src
src = src.replace(esc_antigo, esc_novo)

show_antigo = '''function showProduct(slug) {
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
  void card.offsetWidth; /* reinicia a animação */
  card.classList.add('is-flash');
}'''
show_novo = '''function showProduct(slug) {
  abrirProduto(slug);
}'''
assert show_antigo in src
src = src.replace(show_antigo, show_novo)

open('js/main.js', 'w', encoding='utf-8').write(src)
print('modal js ok')
