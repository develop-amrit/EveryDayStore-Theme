const fs=require('fs'),b=require('./ep-build.cjs');
const dirs=['sections','snippets','templates','layout'];const files=dirs.flatMap(d=>fs.readdirSync(d,{recursive:true}).filter(x=>x.endsWith('.liquid')).map(x=>d+'/'+x.replaceAll('\\','/')));
// Only expressions which already format money are migrated; numeric form values stay numeric.
const money=/\|\s*money(?:_with_currency|_without_currency|_without_trailing_zeros)?\b/;
const expression=s=>s.split(money)[0].trim();
const render=(expr,text=false)=>`{% assign ep_money_amount = ${expr} %}{% render '${text?'ep-money-text':'ep-money'}', amount: ep_money_amount %}`;
for(const file of files){if(/ep-money/.test(file)||file==='snippets/meta-tags.liquid')continue;let s=b.read(file),original=s;
// Captured values in price descriptions may include markup, but explicitly stripped/escaped values stay plain.
s=s.replace(/{%-?\s*assign\s+(\w+)\s*=\s*([^%]+?)\s*-?%}/g,(all,name,expr)=>{if(!money.test(expr))return all;return `{% capture ${name} %}${render(expression(expr),/strip_html|escape|json/.test(expr))}{% endcapture %}`;});
s=s.replace(/{%-?\s*liquid\b([\s\S]*?)%}/g,(all,body)=>'{% liquid'+body.replace(/(^|\n)([ \t]*)assign (\w+) = ([^\n]*\|\s*money[^\n]*(?:\n[ \t]+\|[^\n]*)*)/g,(_,start,indent,name,expr)=>`${start}${indent}assign ep_money_amount = ${expression(expr)}\n${indent}capture ${name}\n${indent}  render '${/strip_html|escape|json/.test(expr)?'ep-money-text':'ep-money'}', amount: ep_money_amount\n${indent}endcapture`)+'%}');
// Explicit output tags, with plain text inside attributes, script payloads and options.
s=s.replace(/{{-?([\s\S]*?)-?}}/g,(all,expr,offset)=>{if(!money.test(expr))return all;const before=s.slice(0,offset),inTag=before.lastIndexOf('<')>before.lastIndexOf('>'),script=before.lastIndexOf('<script')>before.lastIndexOf('</script'),option=before.lastIndexOf('<option')>before.lastIndexOf('</option');return render(expression(expr),inTag||script||option);});
if(s!==original)b.write(file,s);}
// Explicit call sites which pass HTML to a plain-text data attribute need their own captured value.
let p='snippets/quick-order-list-row.liquid',s=b.read(p);s=s.replace(/data-text="{{ (price|price_break_price) }}"/g,(_,name)=>`data-text="{{ ${name} | strip_html | escape }}"`);b.write(p,s);
// Unit prices retain Shopify's measurement denominator, with the shared visible price.
p='snippets/unit-price.liquid';s=b.read(p).replace('{{ price | unit_price_with_measurement: measurement }}',`{% render 'ep-money', amount: price %}<span aria-hidden="true">/</span>{% if measurement.reference_value != 1 %}{{ measurement.reference_value }}{% endif %}{{ measurement.reference_unit }}`);b.write(p,s);
// Scope was expanded to every theme-rendered page, so remove the homepage-only price fallback.
p='snippets/ep-price.liquid';s=b.read(p).replace(/{% if request.page_type == 'index' %}({% render 'ep-money', value: [^%]+%}){% else %}[\s\S]*?{% endif %}/g,'$1');b.write(p,s);
p='snippets/price-facet.liquid';s=b.read(p).replaceAll('{{ cart.currency.symbol }}','<span class="ep-dh" aria-hidden="true">&#x20C3;</span><span class="visually-hidden">AED</span>');b.write(p,s);
// Gift cards have their own HTML document, outside layout/theme.liquid.
p='templates/gift_card.liquid';s=b.read(p).replace('</head>',`{{ 'ep-dirham.css' | asset_url | stylesheet_tag }}</head>`);b.write(p,s);
// JSON data is intentionally ISO text. Render before serializing, never serialize HTML.
p='sections/qc-product-tile.liquid';s=b.read(p).replace(/{{ product.price \| money_without_currency[\s\S]*?\| json }}/,`{% capture price_text %}{% render 'ep-money-text', amount: product.price %}{% endcapture %}{{ price_text | strip | json }}`);b.write(p,s);
p='snippets/qc-delivery-tiers.liquid';s=b.read(p).replace("{% if request.page_type == 'index' %}",'').replace('{% endif %}<ul','<ul');b.write(p,s);
// Font file is also bundled into the global stylesheet; source stays readable and rebuildable.
p='tools/ep-bundle.cjs';s=b.read(p).replace("'tools/ep-mobile-source.css'","'tools/ep-mobile-source.css','assets/ep-dirham.css'");b.write(p,s);
b.log('## Dirham 1: Shared font and Liquid money rendering\n\nAdded exact owner-supplied U+20C3 WOFF and SVG, visible ep-money, numeric ep-money-number, and plain ep-money-text helpers. Migrated QC and retained Dawn visible money outputs, price captures, cart discounts/totals, delivery tiers/progress, unit prices and gift card balance. Numeric price-range form values remain numeric; JSON and data attributes stay plain ISO text. Gift card document loads the small standalone currency stylesheet. No legacy customer templates exist in this theme; hosted account behavior will be checked during QA.');
