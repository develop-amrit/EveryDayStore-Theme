// Execute the real cart code with an isolated fake DOM and transport. This checks
// client paths only; it is explicitly not a live Shopify integration/browser test.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const listeners={},calls=[],hosts=[{renders:0},{renders:0}],counts=[{textContent:''},{textContent:''}];
hosts.forEach(host=>host.replaceChildren=()=>host.renders++);
const dialog=()=>({open:false,dataset:{},addEventListener(){},setAttribute(){},removeAttribute(){},showModal(){this.open=true;},close(){this.open=false;},querySelector(){return {focus(){}};},querySelectorAll(){return [];}});
const cartDialog=dialog(),variants=dialog(),status={textContent:''},status2={textContent:''};
const config={root:'/',predictive:'/search/suggest',cart:{item_count:0,items:[],attributes:{}}};
const one={item_count:1,items:[{variant_id:123,quantity:1,properties:{}}],attributes:{}};
const labels={error:'error',updated:'updated',refresh_error:'refresh-error'};
const nodes={'#qc-config':{textContent:JSON.stringify(config)},'#qc-labels':{textContent:JSON.stringify(labels)},'#qc-cart':cartDialog,'#qc-variants':variants,'[data-qc-status]':status,'[data-cart-status]':status2};
const doc={activeElement:{dataset:{}},body:{classList:{add(){},toggle(){}}},querySelector:s=>nodes[s]||null,querySelectorAll:s=>s==='dialog'?[cartDialog,variants]:s==='[data-cart-host]'?hosts:s==='[data-cart-count]'?counts:[],addEventListener:(name,fn)=>(listeners[name]||=[]).push(fn),dispatchEvent(){}};
let mode='success';
const context={document:doc,window:{addEventListener(){}},matchMedia:()=>({matches:true,addEventListener(){}}),setInterval:()=>0,clearInterval(){},setTimeout,clearTimeout,URL,URLSearchParams,CustomEvent:class{constructor(type,opts){this.type=type;this.detail=opts?.detail;}},DOMParser:class{parseFromString(){return {querySelector:()=>({cloneNode:()=>({})})};}},fetch:async(url,opts={})=>{calls.push({url,opts});if(url==='/cart/add.js'){if(mode==='stock-error')return {ok:false,json:async()=>({description:'sold out'})};return {ok:true,json:async()=>({sections:mode==='render-error'?null:{'qc-cart':'<div></div>'}})};}if(url==='/cart.js')return {ok:true,json:async()=>one};return {ok:true,json:async()=>({'qc-cart':mode==='render-error'?null:'<div></div>'})};}};
doc.getElementById=id=>nodes['#'+id]||null;
doc.activeElement.closest=()=>null;doc.activeElement.getAttribute=()=>null;
vm.createContext(context);vm.runInContext(fs.readFileSync('assets/qc-home.js','utf8'),context);
(async()=>{
 const result=await context.window.QCCart.add([{id:123,quantity:1}],{quiet:true});assert.equal(result.ok,true);assert.deepEqual(hosts.map(h=>h.renders),[1,1]);assert.deepEqual(counts.map(n=>n.textContent),[1,1]);
 const request=JSON.parse(calls.find(c=>c.url==='/cart/add.js').opts.body);assert.deepEqual(request.sections,['qc-cart']);assert.equal(request.sections_url,'/');
 // Simulate a server-side capped add: an error response can accompany a changed
 // cart. The UI must reconcile that cart instead of leaving a stale quantity.
 one.item_count=2;one.items[0].quantity=2;
 mode='stock-error';const denied=await context.window.QCCart.add([{id:123,quantity:1}],{quiet:true});assert.equal(denied.ok,false);assert.equal(denied.error,'sold out');assert.equal(context.window.QCCart.get().item_count,2);assert.deepEqual(counts.map(n=>n.textContent),[2,2]);assert.deepEqual(hosts.map(h=>h.renders),[2,2]);
 mode='render-error';const partial=await context.window.QCCart.add([{id:123,quantity:1}],{quiet:true});assert.equal(partial.ok,true);assert.equal(partial.refreshFailed,true);assert.equal(status.textContent,'refresh-error');
 console.log('PASS simulated cart paths: page+drawer refresh, count sync, bundled sections, stock rejection, committed write with render failure.');
})().catch(error=>{console.error(error);process.exitCode=1;});

