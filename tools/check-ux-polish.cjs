const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const events={},requests=[],timers=new Map();let timerId=0;
const labels=JSON.parse(fs.readFileSync('locales/en.default.json','utf8').replace(/^[^{]*/,''));
const classes={add(){},remove(){},toggle(){}};
const suggestions={hidden:true,classList:classes,dataset:{},textContent:'',replaceChildren(...nodes){this.nodes=nodes;}};
const input={value:'pampers',matches:s=>s==='[data-search]',setAttribute(){}};
const dialog={open:false,setAttribute(){},removeAttribute(){}};
const config={root:'/',predictive:'/search/suggest',cart:{item_count:0,total_price:0,currency:'AED',items:[]}};
const basketCount={dataset:{one:'item',other:'items'}},basketTotal={},basketSummary={};
const query=s=>({'#qc-cart':dialog,'#qc-variants':dialog,'#qc-suggestions':suggestions,'#qc-search':input,'[data-qc-status]':{textContent:''}}[s]||null);
const all=s=>({'[data-basket-count]':[basketCount],'[data-basket-total]':[basketTotal],'[data-basket-summary]':[basketSummary]}[s]||[]);
const document={body:{classList:classes},activeElement:null,hidden:false,querySelector:query,querySelectorAll:all,getElementById(id){return{textContent:JSON.stringify(id==='qc-config'?config:labels.qc)};},addEventListener(name,fn){(events[name]??=[]).push(fn);}};
const context={document,window:{addEventListener(){}},matchMedia:()=>({matches:true,addEventListener(){}}),URLSearchParams,Intl,AbortController,WeakSet,WeakMap,CustomEvent:class{},setInterval(){},clearInterval(){},setTimeout(fn){const id=++timerId;timers.set(id,fn);return id;},clearTimeout(id){timers.delete(id);},requestAnimationFrame:fn=>fn(),fetch:async url=>{requests.push(url);return{ok:true,text:async()=>requests.length===1?'empty':'available'};},DOMParser:class{parseFromString(html){return{querySelector:()=>({dataset:{resultCount:html==='empty'?'0':'2'},childNodes:html==='empty'?[]:['matching-product-one','matching-product-two']})};}}};
vm.runInNewContext(fs.readFileSync('assets/qc-home.js','utf8'),context);
assert.equal(basketCount.textContent,'0 items');assert.equal(basketSummary.hidden,true);assert.match(basketTotal.textContent,/AED/);
async function run(){
  for(const handler of events.input)handler({target:input});
  await [...timers.values()].at(-1)();
  assert.equal(new URLSearchParams(requests[0].split('?')[1]).get('resources[options][unavailable_products]'),'last');
  assert.equal(new URLSearchParams(requests[0].split('?')[1]).get('resources[limit]'),'10');
  assert.match(requests[1],/^\/search\?/);assert.equal(suggestions.nodes.length,2);
  input.value='p';for(const handler of events.input)handler({target:input});assert.equal(suggestions.hidden,true);
  console.log('PASS predictive-search fallback, availability ordering, short-query dismissal and empty basket summary initialisation.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
