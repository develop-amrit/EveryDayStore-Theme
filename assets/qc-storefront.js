/* Account services are optional secured backends. No credentials or personal data
 * are stored in the browser. Product-handle lists are the only device storage. */
(() => {
  'use strict';
  const node=document.getElementById('qc-storefront-config');if(!node)return;
  const config=JSON.parse(node.textContent),root=config.root;
  const $=(s,el=document)=>el.querySelector(s),$$=(s,el=document)=>[...el.querySelectorAll(s)];
  const t=key=>config.labels[key]||key;
  const status=(el,message)=>{const target=$('[role=status]',el);if(target)target.textContent=message;};
  function endpoint(name,suffix=''){
    const value=config.endpoints[name];if(!value)return null;
    const url=new URL(value,location.origin);
    if(url.username||url.password)throw new Error(t('error'));
    if(url.origin!==location.origin&&url.protocol!=='https:')throw new Error(t('error'));
    if(suffix)url.pathname=url.pathname.replace(/\/$/,'')+'/'+suffix.replace(/^\//,'');
    return url;
  }
  async function api(name,suffix='',payload,extra={}){
    const url=endpoint(name,suffix);if(!url)throw new Error(t('not_connected'));
    const response=await fetch(url,{method:payload===undefined?'GET':'POST',credentials:url.origin===location.origin?'same-origin':'omit',headers:{Accept:'application/json',...(payload===undefined?{}:{'Content-Type':'application/json'}),...extra.headers},...(payload===undefined?{}:{body:JSON.stringify(payload)})});
    const data=await response.json();if(!response.ok||data.ok===false)throw new Error(t('error'));return data;
  }
  const notify=(text)=>{const n=$('[data-qc-status]');if(n)n.textContent=text;};
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-restock]');if(!form)return;event.preventDefault();
    if(!form.reportValidity())return;
    const fields=new FormData(form),phone=String(fields.get('phone')||'').trim();
    if(phone&&!fields.has('phone_consent')){status(form,t('phone_consent'));return;}
    form.setAttribute('aria-busy','true');
    try{const result=await api('restock','',{product_id:form.dataset.productId,variant_id:form.dataset.variantId,product_handle:form.dataset.productHandle,email:fields.get('email'),email_consent:fields.has('email_consent'),phone:phone||null,phone_consent:fields.has('phone_consent')});if(result.ok!==true)throw new Error(t('error'));form.reset();status(form,t('submitted'));}catch(error){status(form,error.message);}finally{form.removeAttribute('aria-busy');}
  });
  document.addEventListener('click',event=>{const target=event.target.closest('[data-categories-open]');if(target){event.preventDefault();window.QCDialogs?.open($('#qc-categories-modal'),target);}});
  document.addEventListener('toggle',event=>{const details=event.target;if(details.matches?.('.qc-top-categories .qc-category-node')&&details.open)$$('.qc-top-categories .qc-category-node').forEach(other=>{if(other!==details)other.open=false;});},true);
  let navigationEscaping=false;
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){navigationEscaping=true;$$('.qc-top-categories .qc-category-node[open]').forEach(details=>{details.open=false;$('summary',details)?.focus();});navigationEscaping=false;}});
  // Native details remain usable with touch and keyboard; hover enhances desktop only.
  const hoverNavigation=matchMedia('(min-width:750px) and (hover:hover) and (pointer:fine)');
  function positionNavigation(details){
    const nav=details.closest('.qc-top-categories'),menu=$('.qc-category-submenu',details),summary=$('summary',details);
    if(!nav||!menu||!summary)return;
    const bounds=nav.getBoundingClientRect(),anchor=summary.getBoundingClientRect(),width=menu.getBoundingClientRect().width;
    const centre=getComputedStyle(nav).direction==='rtl'?bounds.right-(anchor.left+anchor.width/2):anchor.left+anchor.width/2-bounds.left;
    details.style.setProperty('--qc-menu-x',`${Math.max(0,Math.min(centre-width/2,bounds.width-width))}px`);
  }
  function initNavigation(){
    $$('.qc-top-categories').forEach(nav=>{
      if(nav.dataset.hoverReady)return;
      nav.dataset.hoverReady='true';
      let closeTimer;
      const open=details=>{clearTimeout(closeTimer);$$('.qc-category-node',nav).forEach(other=>{other.open=other===details;});positionNavigation(details);};
      $$('.qc-category-node',nav).forEach(details=>{
        details.addEventListener('pointerenter',event=>{if(hoverNavigation.matches&&event.pointerType!=='touch')open(details);});
        details.addEventListener('pointerleave',()=>{if(hoverNavigation.matches)closeTimer=setTimeout(()=>{if(!details.contains(document.activeElement))details.open=false;},180);});
        details.addEventListener('focusin',()=>{if(!navigationEscaping)open(details);});
        details.addEventListener('toggle',()=>{if(details.open)positionNavigation(details);});
        details.addEventListener('focusout',event=>{if(!details.contains(event.relatedTarget)&&!details.matches(':hover'))details.open=false;});
        // A hovered disclosure must stay open when its summary is clicked.
        $('summary',details)?.addEventListener('click',event=>{if(hoverNavigation.matches&&event.detail>0&&details.open)event.preventDefault();});
      });
      nav.addEventListener('pointerenter',()=>clearTimeout(closeTimer));
    });
  }
  initNavigation();
  window.addEventListener('resize',()=>$$('.qc-top-categories .qc-category-node[open]').forEach(positionNavigation),{passive:true});
  document.addEventListener('shopify:section:load',initNavigation);
  document.addEventListener('click',event=>{if(!event.target.closest('.qc-top-categories'))$$('.qc-top-categories .qc-category-node[open]').forEach(details=>{details.open=false;});});
  document.addEventListener('submit',async event=>{const form=event.target.closest('[data-gift-note]');if(!form)return;event.preventDefault();form.setAttribute('aria-busy','true');try{const response=await fetch(root+'cart/update.js',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({attributes:{gift_message:new FormData(form).get('attributes[gift_message]')}})});if(!response.ok)throw new Error(t('error'));await window.QCCart.refresh();status(form,t('submitted'));}catch(error){status(form,error.message);}finally{form.removeAttribute('aria-busy');}});
  window.QCServices={config,root,$,$$,t,status,endpoint,api,notify};
})();

