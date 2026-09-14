/* Página de produto: galeria, quantidade e sacola (mesmo carrinho do site — univ_cart) */
(function () {
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* medição própria — mesma tabela do main.js (site_visitas, INSERT-only) */
  try {
    var sess = sessionStorage.getItem('univ_sess');
    if (!sess) {
      sess = Math.random().toString(36).slice(2, 10);
      sessionStorage.setItem('univ_sess', sess);
    }
    fetch('https://dzupvekojufcrrryjqbn.supabase.co/rest/v1/site_visitas', {
      method: 'POST',
      headers: { apikey: 'sb_publishable_rJy4GSoT3w2iIPyqfx3t0Q_vkGgm8IW',
        Authorization: 'Bearer sb_publishable_rJy4GSoT3w2iIPyqfx3t0Q_vkGgm8IW',
        'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: location.pathname,
        ref: (document.referrer || '').slice(0, 180),
        utm: new URLSearchParams(location.search).get('utm_source') || '',
        sessao: sess }),
      keepalive: true,
    }).catch(function () {});
  } catch (e) { /* medição nunca quebra a página */ }

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
