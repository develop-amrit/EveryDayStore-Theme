(() => {
  'use strict';
  const services=window.QCServices;if(!services)return;
  const {config,root,$,$$,t,status,api,notify}=services;
  const valid=handle=>typeof handle==='string'&&/^[a-z0-9][a-z0-9-]{0,200}$/.test(handle);
  const readList=(key)=>{try{const value=JSON.parse(localStorage.getItem('qc:'+key)||'[]');return Array.isArray(value)?[...new Set(value.filter(valid))].slice(0,key==='compare'?4:100):[];}catch{return [];}};
  const writeList=(key,values)=>{try{localStorage.setItem('qc:'+key,JSON.stringify(values));}catch{notify(t('save_error'));}};
  let wishlist=readList('wishlist'),compare=readList('compare'),wishlistBusy=false,wishlistSynced=false;
  const cache=new Map(),loaded=new WeakSet();
  async function productTile(handle){
    if(!valid(handle))return null;
    if(!cache.has(handle))cache.set(handle,(async()=>{
      const response=await fetch(root+'products/'+encodeURIComponent(handle)+'?section_id=qc-product-tile',{headers:{Accept:'text/html'}});
      if(!response.ok)return null;
      const doc=new DOMParser().parseFromString(await response.text(),'text/html'),tile=$('[data-product-tile]',doc);
      return tile||null;
    })().catch(()=>null));
    const result=await cache.get(handle);return result?.cloneNode(true)||null;
  }
  function sync(){
    $$('[data-wishlist]').forEach(button=>{const on=wishlist.includes(button.dataset.wishlist);button.setAttribute('aria-pressed',String(on));if(!button.querySelector('svg'))button.textContent=on?'♥':'♡';});
    $$('[data-compare]').forEach(input=>input.checked=compare.includes(input.dataset.compare));
    const tray=$('[data-compare-tray]');if(tray){tray.hidden=!compare.length;$('[data-compare-count]',tray).textContent=`${compare.length} / 4`;}
  }
  async function saveWishlist(next){
    if(wishlistBusy)return;wishlistBusy=true;
    try{
      if(config.customer&&config.endpoints.wishlist){const result=await api('wishlist','',{handles:next});if(result.ok!==true)throw new Error(t('save_error'));}
      else writeList('wishlist',next);
      wishlistSynced=Boolean(config.customer&&config.endpoints.wishlist);
      wishlist=next;notify(config.customer&&config.endpoints.wishlist?t('saved_account'):t('saved_device'));sync();await savedPages();
    }catch(error){notify(error.message);}finally{wishlistBusy=false;}
  }
  function text(value){if(value==null||value==='')return t('no_value');if(Array.isArray(value))return value.map(text).join(', ');if(typeof value==='object')return Object.entries(value).map(([key,v])=>`${key}: ${text(v)}`).join(' · ');return String(value);}
  function compareTable(tiles){
    const table=document.createElement('table');table.className='qc-comparison-table';
    const caption=document.createElement('caption');caption.textContent=t('compare_title');table.append(caption);
    const products=tiles.map(tile=>{try{return JSON.parse($('[data-product-meta]',tile).textContent);}catch{return null;}}).filter(Boolean);
    const head=document.createElement('thead'),row=document.createElement('tr'),blank=document.createElement('th');blank.scope='col';blank.textContent=t('specs');row.append(blank);
    products.forEach(p=>{const th=document.createElement('th');th.scope='col';const a=document.createElement('a');a.href=root+'products/'+encodeURIComponent(p.handle);a.textContent=p.title;const remove=document.createElement('button');remove.type='button';remove.dataset.compareRemove=p.handle;remove.textContent=t('compare_remove');th.append(a,remove);row.append(th);});head.append(row);table.append(head);
    const body=document.createElement('tbody');['price','pack','specs','features','attributes'].forEach(key=>{const tr=document.createElement('tr'),th=document.createElement('th');th.scope='row';th.textContent=t(key);tr.append(th);products.forEach(p=>{const td=document.createElement('td');if(key==='price'&&Number.isFinite(p.priceCents))td.innerHTML=window.epMoney(p.priceCents);else td.textContent=text(p[key]);tr.append(td);});body.append(tr);});table.append(body);return table;
  }
  let renderGeneration=0;
  async function savedPages(){
    const generation=++renderGeneration;
    for(const page of $$('[data-saved-page]')){
      const kind=page.dataset.savedPage,handles=kind==='compare'?compare:wishlist,host=$('[data-saved-products]',page);host.setAttribute('aria-busy','true');
      const tiles=(await Promise.all(handles.map(productTile))).filter(Boolean);if(generation!==renderGeneration)return;
      host.replaceChildren();if(!tiles.length){const p=document.createElement('p');p.className='qc-empty';p.textContent=t(kind==='compare'?'compare_empty':'wishlist_empty');host.append(p);}
      else if(kind==='compare'){host.classList.remove('qc-grid');host.classList.add('qc-comparison-scroll');host.tabIndex=0;host.append(compareTable(tiles));}
      else tiles.forEach(tile=>{const card=$('.qc-card',tile);if(card)host.append(card);});
      const notice=$('[data-saved-notice]',page);if(kind==='wishlist')notice.textContent=config.customer&&config.endpoints.wishlist?(wishlistSynced?t('saved_account'):t('wishlist_sync_failed')):t('saved_device');
      if(tiles.length<handles.length)notice.textContent+=' '+t('saved_unavailable');
      host.removeAttribute('aria-busy');document.dispatchEvent(new CustomEvent('qc:content',{detail:{scope:host}}));
    }
    sync();
  }
  document.addEventListener('click',event=>{
    const wish=event.target.closest('[data-wishlist]');if(wish){const handle=wish.dataset.wishlist;if(valid(handle))saveWishlist(wishlist.includes(handle)?wishlist.filter(h=>h!==handle):[...wishlist,handle].slice(-100));}
    const remove=event.target.closest('[data-compare-remove]');if(remove){compare=compare.filter(h=>h!==remove.dataset.compareRemove);writeList('compare',compare);sync();savedPages();}
  });
  document.addEventListener('change',event=>{
    const input=event.target;if(!input.matches('[data-compare]'))return;
    const handle=input.dataset.compare;if(!valid(handle))return;
    if(input.checked&&!compare.includes(handle)){if(compare.length===4){input.checked=false;notify(t('compare_limit'));return;}compare.push(handle);}else compare=compare.filter(h=>h!==handle);
    writeList('compare',compare);sync();savedPages();
  });
  const optionRequests=new WeakMap();
  document.addEventListener('change',async event=>{
    const select=event.target.closest('[data-option-select]');if(!select)return;
    const form=select.closest('form'),context=form.closest('[data-option-context]'),position=select.dataset.optionPosition;
    const quantity=$('[name=quantity]',form).value,selected=select.selectedOptions[0];
    const url=new URL(selected.dataset.productUrl||form.dataset.productUrl,location.origin);
    if(url.origin!==location.origin)return;
    const values=$$('[data-option-select]',form).map(n=>n.value).join(',');url.searchParams.set('option_values',values);
    // A combined-listing sibling needs its own title/gallery/recommendations.
    if(url.pathname!==new URL(form.dataset.productUrl,location.origin).pathname){location.assign(url);return;}
    url.searchParams.set('section_id',form.dataset.sectionId);
    optionRequests.get(context)?.abort();const controller=new AbortController();optionRequests.set(context,controller);context.setAttribute('aria-busy','true');
    try{
      const response=await fetch(url,{signal:controller.signal,headers:{Accept:'text/html'}});if(!response.ok)throw new Error(t('error'));
      const doc=new DOMParser().parseFromString(await response.text(),'text/html'),replacement=$('[data-option-context]',doc);if(!replacement)throw new Error(t('error'));
      context.replaceWith(replacement);$('[name=quantity]',replacement).value=quantity;
      const focus=$$('[data-option-select]',replacement).find(n=>n.dataset.optionPosition===position);focus?.focus();
      const main=replacement.closest('[data-main-product]'),image=$('template[data-variant-hero]',replacement),gallery=$('.qc-gallery',main);
      if(image&&gallery){const first=$('img',gallery);if(first)first.replaceWith(image.content.cloneNode(true));}
      if(!main.closest('#qc-variants')){const variant=$('[name=id]',replacement).value;url.searchParams.delete('section_id');url.searchParams.delete('option_values');if(variant)url.searchParams.set('variant',variant);history.replaceState(null,'',url);}
    }catch(error){if(error.name!=='AbortError')status(form,t('error'));}finally{context.removeAttribute('aria-busy');}
  });
  let quickRequest;
  document.addEventListener('qc:quick-options',async event=>{
    const host=$('[data-variant-host]'),url=new URL(event.detail.url,location.origin);if(url.origin!==location.origin)return;
    quickRequest?.abort();quickRequest=new AbortController();url.searchParams.set('section_id','qc-quick-product');
    try{const response=await fetch(url,{signal:quickRequest.signal,headers:{Accept:'text/html'}});if(!response.ok)throw new Error(t('error'));const doc=new DOMParser().parseFromString(await response.text(),'text/html'),content=$('[data-quick-product-content]',doc);if(!content)throw new Error(t('error'));host.replaceChildren(content);$('select,button,a',host)?.focus();}catch(error){if(error.name!=='AbortError'){const p=document.createElement('p');p.textContent=t('error');host.prepend(p);}}
  });
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-main-product-form]');if(!form)return;event.preventDefault();if(!form.reportValidity())return;
    const fields=new FormData(form),id=Number(fields.get('id')),quantity=Number(fields.get('quantity'));if(!Number.isSafeInteger(id)||!Number.isSafeInteger(quantity)||quantity<1)return;
    const handle=form.closest('[data-main-product]')?.dataset.mainProduct;
    if(handle)$$('.qc-card').filter(card=>card.dataset.productHandle===handle).forEach(card=>card.dataset.activeVariant=String(id));
    form.setAttribute('aria-busy','true');try{const result=await window.QCCart.add([{id,quantity}],{show:true,trigger:$('[data-main-add]',form)});status(form,result?.ok?t('updated'):result?.error||t('error'));}finally{form.removeAttribute('aria-busy');}
  });
  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-bundle-add]');if(!button)return;const section=button.closest('[data-recommendations]');
    const items=$$('[data-bundle-id]:checked',section).map(n=>({id:Number(n.dataset.bundleId),quantity:1}));if(!items.length){status(section,t('select_items'));return;}
    button.disabled=true;try{const result=await window.QCCart.add(items,{show:true,trigger:button});status(section,result?.ok?t('updated'):t('error'));}finally{button.disabled=false;}
  });
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-review-form]');if(!form)return;event.preventDefault();if(!form.reportValidity())return;
    const fields=new FormData(form);form.setAttribute('aria-busy','true');
    try{const result=await api('reviews','',{product_handle:form.dataset.productHandle,name:fields.get('name'),email:fields.get('email'),title:fields.get('title'),body:fields.get('body'),rating:Number(fields.get('rating')),consent:fields.has('consent')});if(result.ok!==true)throw new Error(t('error'));form.reset();status(form,t('submitted'));}catch(error){status(form,error.message);}finally{form.removeAttribute('aria-busy');}
  });
  async function init(scope=document){
    sync();
    for(const section of $$('[data-recommendations]',scope)){
      if(loaded.has(section))continue;loaded.add(section);
      try{const url=new URL(section.dataset.url,location.origin);if(url.origin!==location.origin)continue;const response=await fetch(url,{headers:{Accept:'text/html'}});if(!response.ok)continue;const doc=new DOMParser().parseFromString(await response.text(),'text/html'),replacement=$('[data-recommendations]',doc);if(replacement){section.replaceChildren(...replacement.childNodes);document.dispatchEvent(new CustomEvent('qc:content',{detail:{scope:section}}));}}catch{/* Keep the server-rendered metafield fallback. */}
    }
    for(const section of $$('[data-recent-section]',scope)){
      if(!recentAllowed()||loaded.has(section))continue;loaded.add(section);const host=$('[data-recent-products]',section),current=$('[data-main-product]')?.dataset.mainProduct;
      const handles=readList('recent').filter(h=>h!==current).slice(0,8),tiles=(await Promise.all(handles.map(productTile))).filter(Boolean);
      if(tiles.length){host.replaceChildren();tiles.forEach(tile=>{const card=$('.qc-card',tile);if(card)host.append(card);});document.dispatchEvent(new CustomEvent('qc:content',{detail:{scope:host}}));}
    }
  }
  const current=$('[data-main-product]')?.dataset.mainProduct;
  function recentAllowed(){const privacy=window.Shopify?.customerPrivacy;return privacy?.currentVisitorConsent?.().preferences==='yes'&&privacy.preferencesProcessingAllowed?.()===true;}
  function updateRecent(){if(recentAllowed()&&valid(current))writeList('recent',[current,...readList('recent').filter(h=>h!==current)].slice(0,12));}
  function refreshRecent(){updateRecent();$$('[data-recent-section]').forEach(section=>loaded.delete(section));init();}
  document.addEventListener('qc:privacy-ready',refreshRecent);
  document.addEventListener('visitorConsentCollected',event=>{if(event.detail?.preferencesAllowed===false){try{localStorage.removeItem('qc:recent');}catch{}$$('[data-recent-products]').forEach(host=>{const p=document.createElement('p');p.className='qc-empty';p.textContent=t('recent_empty');host.replaceChildren(p);});}else refreshRecent();});
  updateRecent();
  async function initializeWishlist(){
    if(config.customer&&config.endpoints.wishlist){try{const response=await api('wishlist');if(!Array.isArray(response.handles))throw new Error(t('save_error'));const server=response.handles.filter(valid);const merged=[...new Set([...server,...wishlist])].slice(0,100);if(merged.length!==server.length){const result=await api('wishlist','',{handles:merged});if(result.ok!==true)throw new Error(t('save_error'));}wishlist=merged;wishlistSynced=true;try{localStorage.removeItem('qc:wishlist');}catch{}}catch{notify(t('save_error'));}}
    sync();savedPages();
  }
  document.addEventListener('qc:content',event=>{sync();init(event.detail?.scope||document);});
  document.addEventListener('shopify:section:load',event=>init(event.target));
  window.addEventListener('storage',event=>{if(event.key==='qc:compare'){compare=readList('compare');sync();savedPages();}if(event.key==='qc:wishlist'&&!(config.customer&&config.endpoints.wishlist)){wishlist=readList('wishlist');sync();savedPages();}});
  services.productTile=productTile;services.syncLists=sync;
  init();initializeWishlist();
})();

