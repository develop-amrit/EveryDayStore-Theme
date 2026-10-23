/* Shared HTML and plain-text currency formatting. Numbers follow Shopify's numeric sample. */
(() => {
  const config=JSON.parse(document.getElementById('ep-currency-config').textContent);
  const separators=config.sample.replace(/[0-9]/g,''),decimal=separators.slice(-1),group=separators.slice(0,1);
  const number=cents=>{cents=Number(cents);const parts=(Math.abs(cents)/100).toFixed(2).split('.');const whole=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,group===decimal?'':group);return(cents<0?'-':'')+whole+(cents%100?decimal+parts[1]:'');};
  const code=config.code;
  window.epMoneyText=cents=>code+' '+number(cents);
  window.epMoney=cents=>'<span class="ep-money"><span class="ep-dh" aria-hidden="true">&#x20C3;</span>&#x202F;<span class="visually-hidden">'+code+' </span>'+number(cents)+'</span>';
  window.theme=window.theme||{};
  window.theme.formatMoney=window.epMoneyText;
  // Rich text can contain merchant-entered amounts. Change only HTML text nodes;
  // attributes, metadata, scripts and native form values are never rewritten.
  const pattern=new RegExp('\\b'+code+'\\s+(-?\\d[\\d,]*(?:\\.\\d{1,2})?)','g');
  function copy(scope){
    const nodes=[];
    if(scope.nodeType===Node.TEXT_NODE)nodes.push(scope);
    else {const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())nodes.push(n);}
    for(const n of nodes){if(!n.parentElement||n.parentElement.closest('script,style,noscript,textarea,select,option,title,svg,.ep-money,.ep-dh,.visually-hidden,[aria-hidden="true"]'))continue;
      const matches=[...n.textContent.matchAll(pattern)];if(!matches.length)continue;const fragment=document.createDocumentFragment();let start=0;
      for(const match of matches){fragment.append(n.textContent.slice(start,match.index));const span=document.createElement('span');span.className='ep-money';const symbol=document.createElement('span');symbol.className='ep-dh';symbol.setAttribute('aria-hidden','true');symbol.textContent='\u20c3';const label=document.createElement('span');label.className='visually-hidden';label.textContent=code+' ';span.append(symbol,'\u202f',label,match[1].replace(/\.00$/,''));fragment.append(span);start=match.index+match[0].length;}
      fragment.append(n.textContent.slice(start));n.replaceWith(fragment);
    }
  }
  copy(document.body);
  new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1||n.nodeType===3)copy(n);}))).observe(document.body,{childList:true,subtree:true});
})();
