(() => {
  'use strict';const S=window.QCServices;if(!S)return;
  const {config,$,$$,t,status,api,endpoint}=S,dialog=$('#qc-chat');if(!dialog)return;
  let conversation=null,verification=null,verificationExpiry=0,challenge=null,evidence=[],busy=false;
  const form=$('[data-chat-form]',dialog),log=$('[data-chat-messages]',dialog),actionsHost=$('[data-chat-actions]',dialog);
  const allowed=new Set(['tracking','cancellation','return','refund_initiation','issue_report']);
  function verified(){if(Date.now()>=verificationExpiry){verification=null;return false;}return Boolean(verification);}
  function message(text,kind){const item=document.createElement('li');item.className='qc-chat-message qc-chat-'+kind;item.textContent=String(text||'').slice(0,8000);log.append(item);item.scrollIntoView({block:'nearest',behavior:'instant'});return item;}
  async function renderResponse(data){
    if(data.requires_verification || (data.sensitive&&!verified())){message(t('ai_verify_required'),'assistant');$('[data-chat-verification]',dialog).open=true;return;}
    if(typeof data.reply==='string')message(data.reply,'assistant');
    if(typeof data.conversation_id==='string')conversation=data.conversation_id;
    const handles=Array.isArray(data.product_handles)?data.product_handles.slice(0,6):[];
    if(handles.length){const list=document.createElement('li');list.className='qc-chat-products qc-products qc-rail';list.tabIndex=0;log.append(list);for(const handle of handles){const tile=await S.productTile?.(handle);const card=tile?.querySelector('.qc-card');if(card)list.append(card);}document.dispatchEvent(new CustomEvent('qc:content',{detail:{scope:list}}));}
    actionsHost.replaceChildren();
    for(const action of (Array.isArray(data.actions)?data.actions:[]).slice(0,5)){
      if(!allowed.has(action.type)||typeof action.id!=='string')continue;
      const panel=document.createElement('form');panel.className='qc-form qc-panel';panel.method='post';
      const summary=document.createElement('p');summary.textContent=String(action.summary||action.label||'').slice(0,1000);
      const label=document.createElement('label');label.className='qc-check';const check=document.createElement('input');check.type='checkbox';check.required=true;label.append(check,document.createTextNode(t('ai_confirm_note')));
      const button=document.createElement('button');button.className='qc-button';button.textContent=String(action.label||t('ai_confirm')).slice(0,120);
      const feedback=document.createElement('p');feedback.setAttribute('role','status');panel.append(summary,label,button,feedback);
      panel.addEventListener('submit',async event=>{event.preventDefault();if(!panel.reportValidity())return;if(!verified()){status(panel,t('ai_verify_required'));$('[data-chat-verification]',dialog).open=true;return;}button.disabled=true;try{const result=await api('ai','actions',{conversation_id:conversation,action_id:action.id,confirm:true,verification_token:verification});if(result.ok!==true)throw new Error(t('error'));await renderResponse(result);}catch(error){status(panel,error.message);}finally{button.disabled=false;}});
      actionsHost.append(panel);
    }
  }
  document.addEventListener('click',event=>{
    const opener=event.target.closest('[data-chat-open]');if(opener){window.QCDialogs.open(dialog,opener);return;}
    const quick=event.target.closest('[data-chat-quick]');if(quick){$('[name=message]',form).value=quick.textContent.trim();$('[name=message]',form).focus();}
  });
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!form.reportValidity()||busy||!config.endpoints.ai)return;
    const input=$('[name=message]',form),text=input.value.trim();if(!text)return;busy=true;form.setAttribute('aria-busy','true');message(text,'customer');input.value='';
    try{const response=await api('ai','chat',{conversation_id:conversation,message:text,consent:true,evidence_ids:evidence,verification_token:verified()?verification:null});if(response.ok!==true)throw new Error(t('error'));await renderResponse(response);status(form,'');}catch(error){status(form,error.message);}finally{busy=false;form.removeAttribute('aria-busy');}
  });
  $('[data-chat-evidence]',dialog).addEventListener('submit',async event=>{
    event.preventDefault();const upload=event.currentTarget;if(!$('[name=consent]',form).checked){status(upload,t('ai_consent'));return;}
    const file=$('[name=file]',upload).files[0];if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){status(upload,t('ai_evidence_invalid'));return;}
    const url=endpoint('ai','evidence');if(!url){status(upload,t('not_connected'));return;}upload.setAttribute('aria-busy','true');
    try{const body=new FormData();body.append('file',file);body.append('conversation_id',conversation||'');body.append('consent','true');const response=await fetch(url,{method:'POST',body,credentials:url.origin===location.origin?'same-origin':'omit',headers:{Accept:'application/json'}}),result=await response.json();if(!response.ok||result.ok!==true||typeof result.evidence_id!=='string')throw new Error(t('error'));evidence.push(result.evidence_id);evidence=evidence.slice(-5);upload.reset();status(upload,t('ai_evidence_ok'));}catch(error){status(upload,error.message);}finally{upload.removeAttribute('aria-busy');}
  });
  $('[data-chat-challenge]',dialog).addEventListener('submit',async event=>{
    event.preventDefault();const challengeForm=event.currentTarget;if(!challengeForm.reportValidity())return;if(!$('[name=consent]',form).checked){status(challengeForm,t('ai_consent'));return;}
    challengeForm.setAttribute('aria-busy','true');const fields=new FormData(challengeForm);
    try{const result=await api('ai','verification/challenges',{order_number:fields.get('order_number'),contact:fields.get('contact'),consent:true,conversation_id:conversation});if(result.ok!==true||typeof result.challenge_id!=='string')throw new Error(t('tracking_error'));challenge=result.challenge_id;challengeForm.reset();status(challengeForm,t('verification_sent'));$('[data-chat-verify]',dialog).hidden=false;$('[name=code]',$('[data-chat-verify]',dialog)).focus();}catch{status(challengeForm,t('tracking_error'));}finally{challengeForm.removeAttribute('aria-busy');}
  });
  $('[data-chat-verify]',dialog).addEventListener('submit',async event=>{
    event.preventDefault();const verificationForm=event.currentTarget;if(!verificationForm.reportValidity()||!challenge)return;verificationForm.setAttribute('aria-busy','true');
    try{const result=await api('ai','verification/verify',{challenge_id:challenge,code:new FormData(verificationForm).get('code'),conversation_id:conversation});const expiry=Date.parse(result.expires_at);if(result.ok!==true||typeof result.verification_token!=='string'||!Number.isFinite(expiry)||expiry<=Date.now())throw new Error();verification=result.verification_token;verificationExpiry=expiry;challenge=null;verificationForm.reset();status(verificationForm,t('ai_verified'));}catch{verification=null;status(verificationForm,t('tracking_error'));}finally{verificationForm.removeAttribute('aria-busy');}
  });
  window.addEventListener('pagehide',()=>{conversation=null;verification=null;challenge=null;evidence=[];log.replaceChildren();});
})();
