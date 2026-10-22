(() => {
  'use strict';const S=window.QCServices;if(!S)return;
  const {$,$$,t,status}=S,banner=$('[data-cookie-banner]'),dialog=$('#qc-cookie-dialog'),form=$('[data-cookie-form]');if(!banner||!dialog||!form)return;
  const categories=['analytics','marketing','preferences','sale_of_data'];let loading;
  function privacy(){
    if(window.Shopify?.customerPrivacy)return Promise.resolve(window.Shopify.customerPrivacy);
    if(loading)return loading;
    loading=new Promise((resolve,reject)=>{
      if(!window.Shopify?.loadFeatures){reject(new Error(t('cookie_unavailable')));return;}
      window.Shopify.loadFeatures([{name:'consent-tracking-api',version:'0.2'}],error=>{if(error||!window.Shopify.customerPrivacy){reject(new Error(t('cookie_unavailable')));return;}resolve(window.Shopify.customerPrivacy);});
    }).catch(error=>{loading=null;throw error;});return loading;
  }
  function selections(api){const consent=api.currentVisitorConsent();categories.forEach(key=>{$('[name='+key+']',form).checked=consent[key]==='yes';});}
  async function save(values){
    banner.setAttribute('aria-busy','true');form.setAttribute('aria-busy','true');
    try{const api=await privacy();await new Promise((resolve,reject)=>{api.setTrackingConsent(values,error=>error?reject(new Error(t('cookie_unavailable'))):resolve());});banner.hidden=true;status(form,t('cookie_saved'));if(dialog.open)window.QCDialogs.close(dialog);S.notify(t('cookie_saved'));}
    catch(error){banner.hidden=false;$('[data-cookie-status]').textContent=error.message;status(form,error.message);}finally{banner.removeAttribute('aria-busy');form.removeAttribute('aria-busy');}
  }
  document.addEventListener('click',async event=>{
    const manage=event.target.closest('[data-cookie-manage]');if(manage){window.QCDialogs.open(dialog,manage);try{selections(await privacy());}catch(error){status(form,error.message);}return;}
    if(event.target.closest('[data-cookie-accept]'))save(Object.fromEntries(categories.map(key=>[key,true])));
    if(event.target.closest('[data-cookie-reject]'))save(Object.fromEntries(categories.map(key=>[key,false])));
  });
  form.addEventListener('submit',event=>{event.preventDefault();save(Object.fromEntries(categories.map(key=>[key,$('[name='+key+']',form).checked])));});
  privacy().then(api=>{const consent=api.currentVisitorConsent();banner.hidden=!(api.shouldShowBanner()||categories.every(key=>consent[key]===''));selections(api);document.dispatchEvent(new CustomEvent('qc:privacy-ready'));}).catch(error=>{banner.hidden=false;$('[data-cookie-status]').textContent=error.message;});
})();
