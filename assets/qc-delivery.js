(() => {
  'use strict';
  const S=window.QCServices;if(!S)return;
  const {config,root,$,$$,t,status,endpoint,api,notify}=S;
  const localPreview=['localhost','127.0.0.1'].includes(location.hostname);
  const mock=config.mock_slots&&(config.design_mode||localPreview);
  let cart=window.QCCart.get(),zones=[];
  try{zones=JSON.parse(config.zones||'[]');if(!Array.isArray(zones))zones=[];}catch{zones=[];}
  const slotsByForm=new WeakMap(),dateRequests=new WeakMap(),initialized=new WeakSet();
  let updating=Promise.resolve();
  const dateInDubai=instant=>{const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(instant));const value=type=>parts.find(p=>p.type===type).value;return `${value('year')}-${value('month')}-${value('day')}`;};
  const tomorrow=()=>dateInDubai(Date.now()+86400000);
  const fingerprint=data=>data.items.map(item=>`${item.variant_id}:${item.quantity}:${item.selling_plan_allocation?.selling_plan.id||''}:${JSON.stringify(Object.fromEntries(Object.entries(item.properties||{}).sort()))}`).sort().join('|');
  function area(){const selected=$('[data-area]')?.value;if(selected)return selected;try{return localStorage.getItem('qc-dubai-area')||'';}catch{return '';}}
  function zoneMessage(){const selected=area();if(!selected)return t('select_area');if(!zones.length)return t('zone_unverified');return zones.some(z=>z?.active===true&&z.city==='Dubai'&&z.country==='AE'&&(z.label===selected||z.id===selected))?t('zone_supported'):t('zone_unsupported');}
  function syncZone(){const value=zoneMessage();$$('[data-zone-status]').forEach(el=>el.textContent=value);}
  function update(payload){
    const next=updating.catch(()=>{}).then(async()=>{const response=await fetch(root+'cart/update.js',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw new Error(t('error'));cart=data;return data;});updating=next;return next;
  }
  function clearReservation(){return {delivery_date:'',delivery_slot:'',delivery_reservation:'',delivery_reservation_expires:'',delivery_proof:'',delivery_cart_fingerprint:'',delivery_mock:''};}
  async function loadSlots(form){
    const input=$('[data-delivery-date]',form),select=$('[data-delivery-slot]',form),info=$('[data-slot-status]',form),date=input.value;
    const seq=(dateRequests.get(form)||0)+1;dateRequests.set(form,seq);
    select.replaceChildren(new Option(t('slot_choose'),''));select.disabled=true;
    if(!mock&&!config.endpoints.slots){info.textContent=t('slot_disconnected');return;}
    if(!date||date<tomorrow()){info.textContent=t('slot_none');return;}
    if(!area()){info.textContent=t('select_area');return;}
    info.textContent=t('loading');
    try{
      let slots;
      if(mock)slots=[{id:'preview-morning',label:'09:00–12:00',date,starts_at:date+'T09:00:00+04:00',remaining:2},{id:'preview-afternoon',label:'13:00–16:00',date,starts_at:date+'T13:00:00+04:00',remaining:0},{id:'preview-evening',label:'17:00–20:00',date,starts_at:date+'T17:00:00+04:00',remaining:1}];
      else{const url=endpoint('slots','slots');url.searchParams.set('date',date);url.searchParams.set('zone',area());const response=await fetch(url,{headers:{Accept:'application/json'},credentials:url.origin===location.origin?'same-origin':'omit'});if(!response.ok)throw new Error(t('error'));slots=(await response.json()).slots;}
      if(dateRequests.get(form)!==seq)return;
      slots=Array.isArray(slots)?slots.filter(slot=>typeof slot.id==='string'&&typeof slot.label==='string'&&slot.date===date&&Number.isSafeInteger(slot.remaining)&&slot.remaining>=0&&Number.isFinite(Date.parse(slot.starts_at))&&Date.parse(slot.starts_at)>Date.now()&&dateInDubai(slot.starts_at)===date):[];
      slotsByForm.set(form,slots);slots.forEach(slot=>{const option=new Option(slot.label+(slot.remaining===0?' · '+t('slot_full'):''),slot.id);option.disabled=slot.remaining===0;select.append(option);});
      select.disabled=!slots.some(s=>s.remaining>0);if(cart.attributes?.delivery_date===date&&slots.some(s=>s.id===cart.attributes.delivery_slot&&s.remaining>0))select.value=cart.attributes.delivery_slot;
      info.textContent=mock?t('slot_mock'):slots.some(s=>s.remaining>0)?t('area_note'):t('slot_none');
    }catch(error){if(dateRequests.get(form)===seq)info.textContent=error.message;}
  }
  function init(){
    syncZone();
    $$('[data-delivery-form]').forEach(form=>{if(initialized.has(form))return;initialized.add(form);const input=$('[data-delivery-date]',form);if(!input)return;input.min=tomorrow();if(!input.value||input.value<input.min)input.value=input.min;if(config.endpoints.slots||mock)loadSlots(form);else input.disabled=true;});
    $$('[data-checkout-form]').forEach(form=>{const button=$('[name=checkout]',form);button.disabled=mock||cart.attributes?.delivery_mock==='true';if(button.disabled)status(form,t('slot_mock'));});
  }
  document.addEventListener('change',event=>{
    const target=event.target;
    if(target.matches('[data-terms]')&&!target.checked){update({attributes:{terms_accepted:'',terms_version:''}}).catch(()=>notify(t('error')));}
    if(target.matches('[data-delivery-date]'))loadSlots(target.closest('form'));
    if(target.matches('[data-area]')){
      syncZone();update({attributes:{...clearReservation(),delivery_zone:target.value}}).then(()=>window.QCCart.refresh()).catch(()=>notify(t('error')));
    }
  });
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-delivery-form]');if(!form)return;event.preventDefault();if(!form.reportValidity())return;form.setAttribute('aria-busy','true');
    try{
      const note=$('[name=note]',form).value;
      if(!mock&&!config.endpoints.slots){await update({note});await window.QCCart.refresh();notify(t('notes_saved'));return;}
      const date=$('[data-delivery-date]',form).value,id=$('[data-delivery-slot]',form).value,slot=(slotsByForm.get(form)||[]).find(s=>s.id===id&&s.remaining>0);
      if(!slot||date<tomorrow())throw new Error(t('slot_expired'));
      const current=await (await fetch(root+'cart.js',{headers:{Accept:'application/json'}})).json();
      let reservation;
      if(mock)reservation={reservation_id:'preview-only',expires_at:date+'T00:00:00+04:00',proof:'',cart_fingerprint:fingerprint(current)};
      else reservation=await api('slots','reservations',{slot_id:id,date,zone:area(),cart_token:current.token,items:current.items.map(i=>({id:i.variant_id,quantity:i.quantity})),idempotency_key:crypto.randomUUID()});
      if(!mock&&(reservation.ok!==true||typeof reservation.reservation_id!=='string'||typeof reservation.proof!=='string'||!reservation.proof||!Number.isFinite(Date.parse(reservation.expires_at))||Date.parse(reservation.expires_at)<=Date.now()||reservation.cart_fingerprint!==fingerprint(current)))throw new Error(t('slot_expired'));
      await update({note,attributes:{delivery_date:date,delivery_slot:id,delivery_zone:area(),delivery_reservation:reservation.reservation_id,delivery_reservation_expires:reservation.expires_at,delivery_proof:reservation.proof,delivery_cart_fingerprint:fingerprint(current),delivery_mock:mock?'true':''}});
      await window.QCCart.refresh();notify(mock?t('slot_mock'):t('slot_saved'));
    }catch(error){status(form,error.message);notify(error.message);}finally{form.removeAttribute('aria-busy');}
  });
  document.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-checkout-form]');if(!form||form.dataset.checkoutReady==='true')return;event.preventDefault();
    if(!$('[data-terms]',form).checked){status(form,t('terms_block'));return;}
    if(mock||cart.attributes?.delivery_mock==='true'){status(form,t('slot_mock'));return;}
    if(config.require_booking&&(!cart.attributes?.delivery_reservation||!cart.attributes?.delivery_proof||!Number.isFinite(Date.parse(cart.attributes.delivery_reservation_expires))||Date.parse(cart.attributes.delivery_reservation_expires)<=Date.now())){status(form,t('booking_required'));return;}
    const button=$('[name=checkout]',form);button.disabled=true;
    try{await update({attributes:{terms_accepted:'yes',terms_version:config.terms_version}});form.dataset.checkoutReady='true';button.disabled=false;form.requestSubmit(button);}catch(error){status(form,error.message);button.disabled=false;}
  });
  document.addEventListener('qc:cart-updated',event=>{
    cart=event.detail.cart;
    if(cart.attributes?.delivery_cart_fingerprint&&cart.attributes.delivery_cart_fingerprint!==fingerprint(cart)){
      update({attributes:clearReservation()}).then(()=>window.QCCart.refresh()).then(()=>notify(t('slot_changed'))).catch(()=>notify(t('error')));
    }
    init();
  });
  document.addEventListener('shopify:section:load',init);
  init();
})();

