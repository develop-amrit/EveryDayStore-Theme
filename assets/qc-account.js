(() => {
  'use strict';const S=window.QCServices;if(!S)return;
  const {config,root,$,$$,t,status,api}=S;
  const steps=['confirmed','processing','packed','out_for_delivery','delivered'];
  let challenge=null,token=null;
  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-reorder]');if(!button)return;
    if(!config.customer)return;
    const panel=button.closest('.qc-panel');button.disabled=true;status(panel,t('loading'));
    let items=[],skipped=[],added=0;
    try{
      const source=$$('[data-order-items]').find(n=>n.dataset.orderItems===button.dataset.orderId);
      if(source)items=JSON.parse(source.textContent);
      else{const response=await api('reorder','resolve',{order_id:button.dataset.orderId});items=Array.isArray(response.items)?response.items:[];skipped=(response.skipped||[]).map(i=>String(i.title||''));}
      for(const item of items.slice(0,100)){
        if(typeof item.handle!=='string'||!/^[a-z0-9][a-z0-9-]{0,200}$/.test(item.handle)||!Number.isSafeInteger(Number(item.quantity))||Number(item.quantity)<1){skipped.push(String(item.title||t('product_placeholder')));continue;}
        try{
          const response=await fetch(root+'products/'+encodeURIComponent(item.handle)+'.js',{headers:{Accept:'application/json'}});if(!response.ok)throw new Error();const product=await response.json();const variant=product.variants.find(v=>String(v.id)===String(item.id)&&v.available);
          if(!variant)throw new Error();const result=await window.QCCart.add([{id:variant.id,quantity:Number(item.quantity)}],{quiet:true});if(!result?.ok)throw new Error();added+=Number(item.quantity);
        }catch{skipped.push(String(item.title||item.handle));}
      }
      status(panel,t('reorder_done').replace('%count%',String(added)).replace('%skipped%',skipped.length?skipped.join(', '):t('none_skipped')));
      if(added)window.QCCart.open(button);
    }catch{status(panel,t('reorder_error'));}finally{button.disabled=false;}
  });
  async function backendOrders(){
    const host=$('[data-backend-orders]');if(!host||!config.customer||!config.endpoints.reorder)return;
    try{const response=await api('reorder','orders');for(const order of (response.orders||[]).slice(0,20)){if(typeof order.id!=='string')continue;const panel=document.createElement('article');panel.className='qc-panel';const h=document.createElement('h2');h.textContent=String(order.label||t('reorder'));const button=document.createElement('button');button.type='button';button.className='qc-button';button.dataset.reorder='';button.dataset.orderId=order.id;button.textContent=t('reorder');const feedback=document.createElement('p');feedback.setAttribute('role','status');panel.append(h,button,feedback);host.append(panel);}}catch{host.textContent=t('account_integration');}
  }
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-tracking-start]');if(!form)return;event.preventDefault();if(!form.reportValidity())return;
    form.setAttribute('aria-busy','true');const fields=new FormData(form);
    try{const response=await api('tracking','challenges',{order_number:fields.get('order_number'),contact:fields.get('contact'),consent:fields.has('consent')});if(response.ok!==true||typeof response.challenge_id!=='string')throw new Error();challenge=response.challenge_id;token=null;form.reset();status(form,t('verification_sent'));$('[data-tracking-verify]').hidden=false;$('[name=code]',$('[data-tracking-verify]')).focus();$('[data-tracking-result]').replaceChildren();}catch{status(form,t('tracking_error'));}finally{form.removeAttribute('aria-busy');}
  });
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-tracking-verify]');if(!form)return;event.preventDefault();if(!form.reportValidity()||!challenge)return;form.setAttribute('aria-busy','true');
    try{const response=await api('tracking','verify',{challenge_id:challenge,code:new FormData(form).get('code')});if(response.ok!==true||typeof response.access_token!=='string'||!Number.isFinite(Date.parse(response.expires_at))||Date.parse(response.expires_at)<=Date.now())throw new Error();token=response.access_token;challenge=null;form.reset();
      const result=await api('tracking','status',undefined,{headers:{Authorization:'Bearer '+token}});const current=steps.indexOf(result.status),host=$('[data-tracking-result]');host.replaceChildren();
      if(current<0){host.textContent=t('tracking_unknown');return;}
      const list=document.createElement('ol');list.className='qc-timeline';list.setAttribute('aria-label',t('delivery_tracking'));
      steps.forEach((step,index)=>{const li=document.createElement('li');li.textContent=t(step==='confirmed'?'order_confirmed':step);if(index<=current)li.className='qc-complete';if(index===current)li.setAttribute('aria-current','step');list.append(li);});host.append(list);form.hidden=true;
      // Only the status enum is consumed. Public tracking never renders photos,
      // addresses, raw order objects or arbitrary HTML supplied by a backend.
    }catch{token=null;status(form,t('tracking_error'));}finally{form.removeAttribute('aria-busy');}
  });
  window.addEventListener('pagehide',()=>{token=null;challenge=null;});
  backendOrders();
})();
