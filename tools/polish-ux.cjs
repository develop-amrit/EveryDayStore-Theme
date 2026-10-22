const fs = require('fs');
const read = p => fs.readFileSync(p, 'utf8');
const write = (p, v) => fs.writeFileSync(p, v, 'utf8');
const edit = (p, a, b) => {const s=read(p);if(!s.includes(a))throw Error('Missing edit anchor: '+p);write(p,s.replace(a,b));};
edit('assets/qc-home.js', "'resources[limit]':'5','resources[options][unavailable_products]':'show'", "'resources[limit]':'10','resources[options][unavailable_products]':'last'");
edit('assets/qc-home.js', "const html=await response.text();if(seq!==searchSequence)return;\n        const parsed=new DOMParser().parseFromString(html,'text/html');const content=parsed.querySelector('[data-predictive-results]');", "let html=await response.text();if(seq!==searchSequence)return;\n        let parsed=new DOMParser().parseFromString(html,'text/html'),content=parsed.querySelector('[data-predictive-results]');\n        if(content?.dataset.resultCount==='0'){\n          const fallback=await fetch(root+'search?'+new URLSearchParams({q,type:'product',section_id:'qc-predictive'}),{signal:searchController.signal,headers:{Accept:'text/html'}});\n          if(!fallback.ok)throw new Error(labels.error);\n          html=await fallback.text();if(seq!==searchSequence)return;\n          parsed=new DOMParser().parseFromString(html,'text/html');content=parsed.querySelector('[data-predictive-results]');\n        }");
edit('assets/qc-home.js', "$$('[data-cart-count]').forEach(n=>n.textContent=cart.item_count);", "$$('[data-cart-count]').forEach(n=>n.textContent=cart.item_count);\n    $$('[data-basket-count]').forEach(n=>{n.textContent=cart.item_count+' '+(cart.item_count===1?n.dataset.one:n.dataset.other);});\n    $$('[data-basket-total]').forEach(n=>{n.textContent=new Intl.NumberFormat('en-AE',{style:'currency',currency:cart.currency,currencyDisplay:'code'}).format(cart.total_price/100);});\n    $$('[data-basket-summary]').forEach(n=>n.hidden=cart.item_count===0);\n    document.body.classList.toggle('qc-has-basket',cart.item_count>0);");
edit('assets/qc-home.js', "$('.qc-header')?.classList.toggle('qc-scrolled',scrollY>12);scrollQueued=false;", "const header=$('.qc-header');header?.classList.toggle('qc-scrolled',scrollY>12);if(scrollY>220)header?.classList.add('qc-compact');else if(scrollY<40)header?.classList.remove('qc-compact');scrollQueued=false;");
const predictive=read('sections/qc-predictive.liquid');
write('sections/qc-predictive.liquid',`{% assign shown = 0 %}
{% if predictive_search.performed %}{% assign candidates = predictive_search.resources.products %}{% assign terms = predictive_search.terms %}{% else %}{% assign candidates = search.results %}{% assign terms = search.terms %}{% endif %}
{% capture matches %}
  {% for item in candidates limit: 50 %}
    {% if item.available or item.metafields.custom.show_when_sold_out.value == true %}
      {% assign display_title = item.metafields.custom.card_title.value | default: item.title | remove_first: '[TEST] ' %}
      <a href="{{ item.url }}">{% if item.featured_image %}{{ item.featured_image | image_url: width: 96 | image_tag: loading: 'lazy', widths: '48, 96', sizes: '48px', alt: '' }}{% endif %}<span>{{ display_title | escape }}{% unless item.available %} · {{ 'qc.out' | t }}{% endunless %}</span></a>
      {% assign shown = shown | plus: 1 %}{% if shown >= 5 %}{% break %}{% endif %}
    {% endif %}
  {% endfor %}
{% endcapture %}
<div data-predictive-results data-result-count="{{ shown }}">{{ matches }}{% if shown == 0 %}<p>{{ 'qc.search_empty' | t }}</p>{% endif %}<a href="{{ routes.search_url }}?type=product&amp;q={{ terms | url_encode }}">{{ 'qc.search_all' | t }}</a></div>
`+predictive.slice(predictive.indexOf('{% schema %}')));
edit('sections/qc-header.liquid','<span data-cart-count>{{ cart.item_count }}</span></a></div>', '<span data-cart-count>{{ cart.item_count }}</span><span class="qc-header-basket-copy" data-basket-summary{% if cart.item_count == 0 %} hidden{% endif %}><span data-basket-total>{{ cart.total_price | money_without_currency | prepend: \' \' | prepend: shop.currency }}</span></span></a></div>');
edit('sections/qc-header.liquid','{% schema %}', `<a class="qc-basket-summary" href="{{ routes.cart_url }}" data-cart-open data-basket-summary{% if cart.item_count == 0 %} hidden{% endif %}><span><span data-basket-count data-one="{{ 'qc.item_one' | t }}" data-other="{{ 'qc.item_other' | t }}">{{ cart.item_count }} {% if cart.item_count == 1 %}{{ 'qc.item_one' | t }}{% else %}{{ 'qc.item_other' | t }}{% endif %}</span><strong data-basket-total>{{ cart.total_price | money_without_currency | prepend: ' ' | prepend: shop.currency }}</strong></span><span>{{ 'qc.view_basket' | t }} <span aria-hidden="true">↗</span></span></a>\n{% schema %}`);
edit('sections/qc-catalog.liquid', "{% render 'qc-filters', results: source %}", "{% if show_sidebar %}<details class=\"qc-collection-filters\" open><summary>{{ 'qc.filter_sort' | t }}</summary>{% endif %}{% render 'qc-filters', results: source %}{% if show_sidebar %}</details>{% endif %}");
edit('assets/qc-category-sidebar.js', '  update();', `  const mobile = matchMedia('(max-width:749px)');
  const setFilters = () => document.querySelectorAll('.qc-collection-filters').forEach(panel => panel.open = !mobile.matches);
  setFilters();
  mobile.addEventListener('change', setFilters);
  update();`);
edit('assets/qc-category-sidebar.js', '() => {update();requestAnimationFrame(revealCurrent);}', '() => {update();setFilters();requestAnimationFrame(revealCurrent);}');
edit('snippets/qc-cart-contents.liquid', "{{ item.product.title | remove_first: '[TEST] ' | escape }}", "{{ item.product.metafields.custom.card_title.value | default: item.product.title | remove_first: '[TEST] ' | escape }}");
edit('snippets/qc-cart-contents.liquid', '<strong>{{ item.final_line_price', '{% if item.product.metafields.custom.pack_size.value != blank %}<small>{{ item.product.metafields.custom.pack_size.value | escape }}</small>{% endif %}<strong>{{ item.final_line_price');
edit('snippets/qc-cart-contents.liquid', '<div class="qc-cart-total"><span>', '<p class="qc-basket-delivery">{% render \'qc-icon\', name: \'truck\' %}{{ \'qc.next_day_promise\' | t }}</p><div class="qc-cart-total"><span>');
console.log('UX logic and presentation updated locally.');
