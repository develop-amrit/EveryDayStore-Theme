(() => {
  'use strict';
  const listing=url=>/^\/collections\/[^/]+\/?$/.test(new URL(url,location.origin).pathname),same=url=>{try{return new URL(url,location.origin).origin===location.origin;}catch{return false;}},read=key=>{try{return JSON.parse(sessionStorage.getItem(key));}catch{return null;}},save=(key,value)=>{try{sessionStorage.setItem(key,JSON.stringify(value));}catch{}};
  const key='ep:listingEntry';let entry;
  if(listing(location.href)){
    const previous=read(key),ref=same(document.referrer)&&document.referrer?new URL(document.referrer):null,known=history.state?.epListingEntry;
    entry=known||(ref&&!listing(ref.href)?{url:ref.href,scrollY:previous?.url===ref.href?previous.scrollY:0}:ref&&listing(ref.href)&&previous?previous:{url:location.origin+'/',scrollY:0});
    const from=!!(history.state?.epFromSite||(ref&&previous?.url===entry.url&&previous.fromSite&&history.length>1));
    entry.fromSite=from;save(key,entry);history.replaceState({...history.state,epListingEntry:entry,epFromSite:from},'',location.href);
  }
  addEventListener('pageshow',event=>{if(listing(location.href)||!(event.persisted||performance.getEntriesByType('navigation')[0]?.type==='back_forward'))return;const exit=history.state?.epListingExit;if(exit?.url===location.href)requestAnimationFrame(()=>scrollTo({top:exit.scrollY||0,behavior:'instant'}));});
  const isSearch=/\/search\/?$/.test(location.pathname);if(isSearch){const record=read('ep:searchEntry');let ref=null;try{if(document.referrer&&same(document.referrer))ref=new URL(document.referrer);}catch{}let continuation=false;if(ref&&record?.url===ref.href&&!ref.searchParams.has('filter.v.availability')){const canonical=new URL(ref.href);canonical.searchParams.set('filter.v.availability','1');canonical.searchParams.delete('page');continuation=canonical.href===location.href;}const from=history.state?.epSearchFromSite??(continuation?record.from:!!ref&&history.length>1);history.replaceState({...history.state,epSearchFromSite:from},'',location.href);save('ep:searchEntry',{url:location.href,from});}
  window.EPHistory={back(){if(listing(location.href)){const state=history.state;if(state?.epFromSite&&history.length>1)history.back();else location.replace(state?.epListingEntry?.url||entry?.url||'/');}else if(isSearch&&history.state?.epSearchFromSite===false)location.replace('/');else if(document.referrer&&same(document.referrer)&&history.length>1)history.back();else location.replace('/');}};
  document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.target==='_blank'||!same(a.href)||!listing(a.href))return;
    if(listing(location.href)){if(a.matches('[data-ep-collection-link],[data-ep-clear],[data-ep-stock-toggle]'))return;event.preventDefault();location.replace(a.href);}
    else {const from={url:location.href,scrollY,fromSite:true};save(key,from);history.replaceState({...history.state,epListingExit:from},'',location.href);}
  },true);
})();
