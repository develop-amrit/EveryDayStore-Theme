/* Shopify-only AJAX; DOM events are delegated so theme-editor reloads also work. */
(() => {
  'use strict';
  const configElement = document.getElementById('qc-config');
  if (!configElement) return;
  const config = JSON.parse(configElement.textContent);
  const labels = JSON.parse(document.getElementById('qc-labels').textContent);
  const root = config.root;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let cart = config.cart, busy = false, opener, refreshSequence = 0;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const cartDialog = $('#qc-cart'), variantDialog = $('#qc-variants');
  const stockText=JSON.parse(document.querySelector('#ep-labels')?.textContent||'{}').stock_limit;
  let toastTimer;
  const clearFeedback=()=>{clearTimeout(toastTimer);const el=document.querySelector('.ep-cart-toast');if(el){el.hidden=true;el.textContent='';}const status=document.querySelector('[data-cart-status]');if(status)status.textContent='';};
  const showFeedback=(message,max)=>{clearFeedback();const limit=message.match(/(?:only|maximum(?: of)?|limit(?: of)?)[^0-9]{0,24}([0-9]+)/i);if(limit)max=Number(limit[1]);let el=document.querySelector('.ep-cart-toast');if(!el){el=document.createElement('p');el.className='ep-cart-toast';el.setAttribute('role','alert');}const host=document.querySelector('dialog[open]')||document.body;if(el.parentElement!==host)host.append(el);el.textContent=Number.isFinite(max)&&stockText&&/stock|availab|inventory|only [0-9]/i.test(message)?stockText.replace('__COUNT__',max):message;el.hidden=false;toastTimer=setTimeout(clearFeedback,3000);};
  window.EPCartFeedback={clear:clearFeedback,show:showFeedback};
  function announce(message) { $('[data-qc-status]').textContent = message; }
  function open(dialog, trigger) {
    if (!dialog || dialog.open) return;
    opener = trigger?.closest('.qc-card')?.querySelector('h3 a') || trigger || document.activeElement;
    dialog.showModal();
    ($('button, a, input', dialog) || dialog).focus();
  }
  function close(dialog) { dialog.close(); opener?.focus(); }
  // Native modal dialogs make the rest of the document inert. Explicit wrapping
  // also handles browsers with inconsistent Tab cycling inside modal dialogs.
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(dialog); } });
    dialog.addEventListener('cancel', () => { opener?.focus(); });
    dialog.addEventListener('close', () => { opener?.focus(); });
    dialog.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const nodes = $$('a[href],button:not(:disabled),input,select,[tabindex="0"]',dialog).filter(n => n.getClientRects().length);
      const first=nodes[0],last=nodes.at(-1);
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first?.focus();}
    });
  });
  async function request(path, options={}) {
    const response = await fetch(root + path, { ...options, headers: {'Accept':'application/json',...(options.body ? {'Content-Type':'application/json'} : {}),...options.headers} });
    const data = await response.json();
    if (!response.ok) throw new Error(typeof data.description==='string'?data.description:labels.error);
    return data;
  }
  function button(text,attrs={}) {
    const node=document.createElement('button');node.type='button';node.textContent=text;
    Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));return node;
  }
  function syncCards() {
    const focused = document.activeElement, focusedCard = focused?.closest('.qc-card');
    const focusLabel = focused?.getAttribute('aria-label');
    $$('[data-cart-count]').forEach(n=>{n.textContent=cart.item_count;const link=n.closest?.('[data-ep-cart-label]');if(link)link.setAttribute('aria-label',link.dataset.epCartLabel+' '+cart.item_count);});
    $$('[data-basket-count]').forEach(n=>{n.textContent=cart.item_count+' '+(cart.item_count===1?n.dataset.one:n.dataset.other);});
    $$('[data-basket-total]').forEach(n=>{n.innerHTML=window.epMoney(cart.total_price);});
    $$('[data-basket-summary]').forEach(n=>n.hidden=cart.item_count===0);
    document.body.classList.toggle('qc-has-basket',cart.item_count>0);
    $$('.qc-card').forEach(card=>{
      const controls=$('[data-card-controls]',card), variantId=Number(card.dataset.activeVariant || card.dataset.variantId);
      if(!controls.dataset.original) controls.dataset.original=controls.innerHTML;
      const variantTemplate=$('[data-variants]',card);
      const item=cart.items.find(i=>i.variant_id===variantId && !Object.keys(i.properties||{}).length && !i.selling_plan_allocation);
      if(!item){controls.innerHTML=controls.dataset.original;return;}
      const stepper=document.createElement('div');stepper.className='qc-stepper';
      const amount=document.createElement('span');amount.textContent=item.quantity;
      stepper.append(button('−',{'data-line-key':item.key,'data-quantity':item.quantity-1,'aria-label':labels.decrease}),amount,button('+',{'data-line-key':item.key,'data-quantity':item.quantity+1,'aria-label':labels.increase}));
      controls.replaceChildren(stepper);
      if(variantTemplate)controls.append(button(labels.choose,{'data-add':'','data-choose':'','class':'qc-change-option'}));
    });
    if(focusedCard && !focused.isConnected){const next=$$('button',focusedCard).find(n=>n.getAttribute('aria-label')===focusLabel);(next||$('h3 a',focusedCard)).focus();}
  }
  async function refresh(sections) {
    const sequence = ++refreshSequence;
    const previouslyFocused=document.activeElement;
    const key=previouslyFocused?.dataset.lineKey;
    const nextCart=await request('cart.js');
    let html=sections?.['qc-cart'];
    if(!html){const response=await fetch(location.pathname+'?sections=qc-cart',{headers:{Accept:'application/json'}});if(!response.ok)throw new Error(labels.error);html=(await response.json())['qc-cart'];}
    if(!html)throw new Error(labels.error);
    const parsed=new DOMParser().parseFromString(html,'text/html');
    const rendered=$('[data-cart-render]',parsed);
    if(!rendered)throw new Error(labels.error);
    if(sequence!==refreshSequence)return;
    cart=nextCart;
    $$('[data-cart-host]').forEach(host=>host.replaceChildren(rendered.cloneNode(true)));
    document.dispatchEvent(new CustomEvent('qc:cart-updated',{detail:{cart,cartView:parsed.querySelector('[data-ep-cart-page-render]')}}));
    if(typeof publish==='function'&&typeof PUB_SUB_EVENTS!=='undefined')publish(PUB_SUB_EVENTS.cartUpdate,{source:'qc-cart',cartData:cart});
    syncCards();
    if(key && cartDialog.open){const replacement=$$('[data-line-key]',cartDialog).find(n=>n.dataset.lineKey===key);(replacement||$('[data-dialog-close]',cartDialog)).focus();}
  }
  async function mutate(path,payload,{show=false,trigger,quiet=false}={}) {
    clearFeedback();
    if(busy)return {ok:false,error:labels.error};
    busy=true;const locked=$$('[data-add]:not(:disabled),[data-line-key]:not(:disabled)');locked.forEach(n=>n.disabled=true);let committed=false;const card=trigger?.closest('.qc-card');
    card?.setAttribute('aria-busy','true');cartDialog.setAttribute('aria-busy','true');
    try {
      const data=await request(path,{method:'POST',body:JSON.stringify({...payload,sections:['qc-cart'],sections_url:location.pathname})});
      committed=true;
      await refresh(data.sections);
      if(variantDialog.open)close(variantDialog);
      if(show)open(cartDialog,opener?.isConnected?opener:trigger);
      announce(labels.updated);$('[data-cart-status]').textContent='';
      $$('[data-cart-open]').forEach(n=>{n.classList.remove('qc-bounce');void n.offsetWidth;n.classList.add('qc-bounce');});
    return {ok:true};
    } catch(error) {
      // Shopify can adjust an over-stock add before returning an error. Reconcile
      // the real cart so a retry cannot silently add a second quantity.
      if(!committed){try{await refresh();}catch{/* Keep the original error visible. */}}
      if(committed){
        try{cart=await request('cart.js');syncCards();}catch{/* The write succeeded; do not encourage a second add. */}
        const message=labels.refresh_error||labels.error;showFeedback(message);
        if(!quiet&&!cartDialog.open)open(cartDialog,trigger);
        return {ok:true,refreshFailed:true};
      }
      if(quiet)return {ok:false,error:error.message||labels.error};
      showFeedback(error.message||labels.error,trigger?.hasAttribute('data-max')?Number(trigger.dataset.max):undefined);
      return {ok:false,error:error.message||labels.error};
    } finally{locked.forEach(n=>{if(n.isConnected)n.disabled=n.hasAttribute('data-max')&&Number(n.dataset.quantity)>Number(n.dataset.max);});busy=false;card?.removeAttribute('aria-busy');cartDialog.removeAttribute('aria-busy');}
  }
  document.addEventListener('click',e=>{
    const target=e.target.closest('button,a');if(!target)return;
    if(target.matches('[data-cart-open]')){e.preventDefault();open(cartDialog,target);refresh().catch(()=>showFeedback(labels.error));}
    else if(target.matches('[data-dialog-close]'))close(target.closest('dialog'));
    else if(target.matches('[data-add]')){
      const card=target.closest('.qc-card');
      if(target.hasAttribute('data-choose')){$('[data-variant-host]').replaceChildren($('[data-variants]',card).content.cloneNode(true));variantDialog.dataset.productId=card.dataset.productId;open(variantDialog,target);document.dispatchEvent(new CustomEvent('qc:quick-options',{detail:{url:card.querySelector('[data-quick-product-url]')?.dataset.quickProductUrl||card.querySelector('h3 a').href}}));}
      else mutate('cart/add.js',{items:[{id:Number(card.dataset.variantId),quantity:1}]},{trigger:target});
    } else if(target.matches('[data-variant-add]')) {
      $$('.qc-card').filter(c=>c.dataset.productId===variantDialog.dataset.productId).forEach(c=>c.dataset.activeVariant=target.dataset.variantAdd);
      mutate('cart/add.js',{items:[{id:Number(target.dataset.variantAdd),quantity:1}]},{show:true,trigger:target});
    }
    else if(target.matches('[data-line-key]'))mutate('cart/change.js',{id:target.dataset.lineKey,quantity:Number(target.dataset.quantity)},{trigger:target});
    else if(target.matches('[data-dismiss]')){target.closest('[data-announcement]').hidden=true;}
    else if(target.matches('[data-search-focus]')){e.preventDefault();$('#qc-search')?.focus();window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}
    else if(target.matches('[data-top]')){e.preventDefault();window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}
    else if(target.matches('[data-rail-prev],[data-rail-next]')){const rail=$('.qc-rail',target.closest('.qc-section'));rail?.scrollBy({left:(target.hasAttribute('data-rail-next')?1:-1)*rail.clientWidth*.8,behavior:reduced.matches?'instant':'smooth'});}
  });
  // Predictive Search API is rendered with safe text nodes and local product links.
  let searchTimer, searchController, searchSequence=0;
  document.addEventListener('input',e=>{
    if(!e.target.matches('[data-search]'))return;
    const input=e.target,results=$('#qc-suggestions');clearTimeout(searchTimer);searchController?.abort();const seq=++searchSequence;
    const q=input.value.trim();if(q.length<2){results.hidden=true;input.setAttribute('aria-expanded','false');return;}
    results.hidden=false;results.classList.add('qc-search-loading');results.textContent=labels.search_loading;input.setAttribute('aria-expanded','true');
    searchTimer=setTimeout(async()=>{
      searchController=new AbortController();
      try{
        const params=new URLSearchParams({q,'resources[type]':'product','resources[limit]':'10','resources[options][unavailable_products]':'last',section_id:'qc-predictive'});
        const response=await fetch(config.predictive+'?'+params,{signal:searchController.signal,headers:{Accept:'text/html'}});
        if(!response.ok)throw new Error(labels.error);
        let html=await response.text();if(seq!==searchSequence)return;
        let parsed=new DOMParser().parseFromString(html,'text/html'),content=parsed.querySelector('[data-predictive-results]');
        if(content?.dataset.resultCount==='0'){
          const fallback=await fetch(root+'search?'+new URLSearchParams({q,type:'product',section_id:'qc-predictive'}),{signal:searchController.signal,headers:{Accept:'text/html'}});
          if(!fallback.ok)throw new Error(labels.error);
          html=await fallback.text();if(seq!==searchSequence)return;
          parsed=new DOMParser().parseFromString(html,'text/html');content=parsed.querySelector('[data-predictive-results]');
        }
        if(!content)throw new Error(labels.error);results.replaceChildren(...content.childNodes);results.querySelectorAll('a').forEach(a=>{a.setAttribute('role','option');a.setAttribute('aria-selected','false');});
      }catch(error){if(error.name!=='AbortError' && seq===searchSequence)results.textContent=labels.error;}
      finally{if(seq===searchSequence)results.classList.remove('qc-search-loading');}
    },250);
  });
  document.addEventListener('keydown',e=>{
    if(e.target.matches('[data-search]') && e.key==='ArrowDown'){e.preventDefault();$('#qc-suggestions a')?.focus();}
    if(e.key==='Escape'){if($('#qc-suggestions'))$('#qc-suggestions').hidden=true;$('#qc-search')?.setAttribute('aria-expanded','false');}
    if(e.target.closest('#qc-suggestions') && ['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const links=$$('#qc-suggestions a');const i=links.indexOf(document.activeElement);links[(i+(e.key==='ArrowDown'?1:-1)+links.length)%links.length]?.focus();}
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.qc-search') && $('#qc-suggestions')){$('#qc-suggestions').hidden=true;$('#qc-search')?.setAttribute('aria-expanded','false');}});
  document.addEventListener('change',e=>{if(e.target.matches('[data-area]')){$$('[data-area]').forEach(select=>select.value=e.target.value);try{localStorage.setItem('qc-dubai-area',e.target.value);}catch{} }});
  const initialized = new WeakSet();
  const observers = new WeakMap();
  function init(scope=document) {
    $$('[data-area]',scope).forEach(select=>{try{const value=localStorage.getItem('qc-dubai-area');if([...select.options].some(o=>o.value===value))select.value=value;}catch{}});
    $$('[data-tabs]',scope).forEach(tabs=>{
      if(initialized.has(tabs))return;initialized.add(tabs);
      function activate(tab){$$('[role=tab]',tabs).forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',selected);t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});}
      tabs.addEventListener('click',e=>{const tab=e.target.closest('[role=tab]');if(tab)activate(tab);});
      tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const all=$$('[role=tab]',tabs);let index=all.indexOf(document.activeElement);if(index<0)return;e.preventDefault();index=e.key==='Home'?0:e.key==='End'?all.length-1:(index+(e.key==='ArrowRight'?1:-1)+all.length)%all.length;activate(all[index]);all[index].focus();});
    });
    $$('[data-slideshow]',scope).forEach(slideshow=>{
      if(initialized.has(slideshow))return;initialized.add(slideshow);
      const slides=$$('[data-slide]',slideshow);let active=0,paused=false,timer;
      function show(next){active=(next+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==active);}
      function start(){clearInterval(timer);if(slides.length>1&&!reduced.matches&&!paused)timer=setInterval(()=>{if(slideshow.isConnected&&!document.hidden&&!slideshow.matches(':hover,:focus-within'))show(active+1);},6000);}
      slideshow.addEventListener('click',e=>{if(e.target.closest('[data-slide-prev]'))show(active-1);if(e.target.closest('[data-slide-next]'))show(active+1);const pause=e.target.closest('[data-slide-pause]');if(pause){paused=!paused;pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?labels.play:labels.pause);start();}});
      reduced.addEventListener('change',start);start();
    });
    $$('[data-announcement]',scope).forEach(bar=>{if(initialized.has(bar))return;initialized.add(bar);const messages=$$('[data-message]',bar);let i=0;const timer=setInterval(()=>{if(!bar.isConnected){clearInterval(timer);return;}if(!messages.length||reduced.matches||document.hidden||bar.matches(':hover,:focus-within'))return;i=(i+1)%messages.length;messages.forEach((m,j)=>m.hidden=j!==i);},6500);});
    if(!reduced.matches && 'IntersectionObserver' in window){document.body.classList.add('qc-motion');$$('.qc-products>.qc-card,.qc-steps>article,.qc-trust>div',scope).forEach((el,i)=>{el.classList.add('qc-reveal');el.style.transitionDelay=`${i%6*40}ms`;});const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('qc-visible');io.unobserve(entry.target);}}),{threshold:.05});$$('.qc-reveal',scope).forEach(el=>io.observe(el));observers.set(scope,io);}
    syncCards();deduplicate();updateRails();
  }
  // Keep a product in the first shelf/tab that contains it. A later overlapping
  // collection gets an honest empty state instead of a second copy of the card.
  function deduplicate(){const seen=new Set();$$('[data-product-section]').forEach(panel=>{const cards=$$('[data-product-id]',panel);cards.forEach(card=>{card.hidden=seen.has(card.dataset.productId);seen.add(card.dataset.productId);});let empty=$('[data-duplicate-empty]',panel);if(!empty&&cards.length){empty=document.createElement('p');empty.className='qc-empty';empty.dataset.duplicateEmpty='';empty.textContent=labels.overlap;panel.append(empty);}if(empty)empty.hidden=cards.some(c=>!c.hidden);});}
  function updateRails(){$$('.qc-section').forEach(section=>{const rail=$('.qc-rail',section),controls=$('.qc-rail-controls',section);if(rail&&controls)controls.hidden=rail.scrollWidth<=rail.clientWidth+2;});}window.addEventListener('resize',updateRails,{passive:true});
  let scrollQueued=false;
  window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{const header=$('.qc-header:not(.ep-header)');header?.classList.toggle('qc-scrolled',scrollY>12);if(scrollY>220)header?.classList.add('qc-compact');else if(scrollY<40)header?.classList.remove('qc-compact');scrollQueued=false;});}},{passive:true});
  const countdownTimer=setInterval(()=>{
    $$('[data-countdown]').forEach(node=>{const end=Date.parse(node.dataset.countdown);if(!Number.isFinite(end)){node.hidden=true;return;}let remaining=Math.max(0,Math.floor((end-Date.now())/1000));const span=$('span',node);if(!remaining){span.textContent=labels.ended;return;}const d=Math.floor(remaining/86400),h=Math.floor(remaining%86400/3600),m=Math.floor(remaining%3600/60),s=remaining%60;span.textContent=`${d}${labels.days} ${h}${labels.hours} ${m}${labels.time_minutes} ${s}${labels.seconds}`;});
  },1000);
  window.QCDialogs={open,close};
  window.QCCart={isBusy:()=>busy,update:(payload,options={})=>mutate('cart/update.js',payload,options),change:(id,quantity,options={})=>mutate('cart/change.js',{id,quantity},options),get:()=>cart,add:(items,options={})=>mutate('cart/add.js',{items},options),refresh,open:trigger=>open(cartDialog,trigger)};
  document.addEventListener('qc:content',e=>init(e.detail?.scope||document));
  document.addEventListener('shopify:section:load',e=>init(e.target));
  document.addEventListener('shopify:section:unload',e=>observers.get(e.target)?.disconnect());
  document.addEventListener('shopify:block:select',e=>{const slide=e.target.closest('[data-slide]');if(slide)$$('[data-slide]',slide.closest('[data-slideshow]')).forEach(s=>s.hidden=s!==slide);});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh().catch(()=>{});});
  init();
})();





