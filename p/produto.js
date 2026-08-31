/* Página de produto: galeria, quantidade e sacola (mesmo carrinho do site — univ_cart) */
(function () {
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* galeria */
  var palco = document.getElementById('ppImg');
  document.querySelectorAll('.pp-thumb').forEach(function (b) {
    b.addEventListener('click', function () {
      palco.src = b.dataset.src;
      document.querySelectorAll('.pp-thumb').forEach(function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
    });
  });

  /* sacola compartilhada com o site */
  function lerCart() {
    try { return JSON.parse(localStorage.getItem('univ_cart') || '{}'); } catch (e) { return {}; }
  }
  function badge() {
    var total = 0, c = lerCart();
    for (var k in c) total += c[k];
    var el = document.getElementById('ppBadge');
    if (el) { el.textContent = total; el.hidden = total === 0; }
  }
  badge();

  var qtd = 1;
  var qtdEl = document.getElementById('ppQtd');
  var menos = document.getElementById('ppMenos');
  var mais = document.getElementById('ppMais');
  if (menos) menos.addEventListener('click', function () { qtd = Math.max(1, qtd - 1); qtdEl.textContent = qtd; });
  if (mais) mais.addEventListener('click', function () { qtd += 1; qtdEl.textContent = qtd; });

  var add = document.getElementById('ppAdd');
  if (add) add.addEventListener('click', function () {
    var c = lerCart();
    var slug = add.dataset.slug;
    c[slug] = (c[slug] || 0) + qtd;
    localStorage.setItem('univ_cart', JSON.stringify(c));
    badge();
    var t = document.getElementById('ppToast');
    t.hidden = false;
    clearTimeout(add._t);
    add._t = setTimeout(function () { t.hidden = true; }, 4500);
  });
})();
