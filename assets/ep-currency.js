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
})();
