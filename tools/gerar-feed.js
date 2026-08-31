/* Gera feed.xml (Google Merchant Center) a partir do catálogo.
   Só entra produto com preço e página própria; preço do feed = preço unitário,
   que é o que a página de produto exibe (senão o Google reprova por divergência). */
const fs = require('fs');
const path = require('path');

const SITE = 'https://universodoscabides.com.br';
const RAIZ = path.join(__dirname, '..');

const window = {};
eval(fs.readFileSync(path.join(RAIZ, 'js/produtos.js'), 'utf8'));
let PRODUTOS = window.PRODUTOS;
try {
  eval(fs.readFileSync(path.join(RAIZ, 'js/produtos-araras.js'), 'utf8'));
  PRODUTOS = PRODUTOS.concat((window.PRODUTOS_ARARAS || []).filter((p) => (p.preco || '').trim()));
} catch (e) { /* sem araras */ }

const esc = (s) => String(s || '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const itens = [];
for (const p of PRODUTOS) {
  const preco = (p.preco_unit || p.preco || '').trim();
  if (!preco) continue;
  const foto = path.join(RAIZ, 'assets/products', `${p.slug}.webp`);
  if (!fs.existsSync(foto)) continue;
  const pagina = path.join(RAIZ, 'p', `${p.slug}.html`);
  if (!fs.existsSync(pagina)) continue;

  const valor = preco.replace(/\./g, '').replace(',', '.');
  const titulo = p.kit ? `${p.nome} ${p.kit}` : p.nome;
  const descricao = (p.desc || titulo).split('\n')[0].slice(0, 4990);
  const extras = (p.galeria || []).filter((s) => s)
    .map((s) => `  <g:additional_image_link>${SITE}/assets/products/${p.slug}${s}.webp</g:additional_image_link>`)
    .join('\n');

  itens.push(`<item>
  <g:id>${esc(p.slug)}</g:id>
  <g:title>${esc(titulo)}</g:title>
  <g:description>${esc(descricao)}</g:description>
  <g:link>${SITE}/p/${p.slug}.html</g:link>
  <g:image_link>${SITE}/assets/products/${p.slug}.webp</g:image_link>
${extras ? extras + '\n' : ''}  <g:price>${valor} BRL</g:price>
  <g:availability>in stock</g:availability>
  <g:condition>new</g:condition>
  <g:brand>Universo dos Cabides</g:brand>
  <g:identifier_exists>no</g:identifier_exists>
  <g:mpn>${esc(p.sku || p.slug)}</g:mpn>
${(p.cats || []).includes('araras') ? `  <g:shipping><g:country>BR</g:country><g:price>149.90 BRL</g:price></g:shipping>\n` : ''}</item>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Universo dos Cabides</title>
<link>${SITE}</link>
<description>Cabides, araras e expositores para lojistas — direto de fábrica.</description>
${itens.join('\n')}
</channel>
</rss>
`;

fs.writeFileSync(path.join(RAIZ, 'feed.xml'), xml, 'utf8');
console.log(`feed.xml gerado com ${itens.length} produtos`);
