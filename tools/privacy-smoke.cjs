// Privacy API behavior with an isolated mock, not a real Shopify consent test.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');const events={},writes=[];
const feedback={textContent:''},banner={hidden:true,setAttribute(){},removeAttribute(){}},dialog={open:false},fields=Object.fromEntries(['analytics','marketing','preferences','sale_of_data'].map(k=>[k,{checked:false}]));
const form={querySelector:s=>fields[s.match(/name=([^\]]+)/)?.[1]]||null,setAttribute(){},removeAttribute(){},addEventListener:(type,fn)=>events['form:'+type]=fn};
let fail=false,version;
const privacy={currentVisitorConsent:()=>({analytics:'',marketing:'',preferences:'',sale_of_data:''}),shouldShowBanner:()=>true,setTrackingConsent:(values,cb)=>{writes.push(values);cb(fail?new Error('unavailable'):undefined);}};
const doc={querySelector:s=>({'[data-cookie-banner]':banner,'#qc-cookie-dialog':dialog,'[data-cookie-form]':form,'[data-cookie-status]':feedback}[s]||null),querySelectorAll:()=>[],addEventListener:(type,fn)=>events[type]=fn,dispatchEvent(){}};
const window={Shopify:{loadFeatures:(features,cb)=>{version=features[0].version;window.Shopify.customerPrivacy=privacy;cb();}},QCDialogs:{close(){dialog.open=false;}}};
window.QCServices={$:(s,el=doc)=>el.querySelector(s),$$:()=>[],t:k=>k,status:(el,text)=>feedback.textContent=text,notify(){}};
const context={window,document:doc,CustomEvent:class{},localStorage:{setItem(){throw new Error('Consent must not use localStorage');}}};vm.createContext(context);vm.runInContext(fs.readFileSync('assets/qc-privacy.js','utf8'),context);
const flush=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{await flush();assert.equal(version,'0.2');assert.equal(banner.hidden,false);await events.click({target:{closest:s=>s==='[data-cookie-reject]'?{}:null}});await flush();assert.equal(writes.length,1);assert.equal(Object.values(writes[0]).every(v=>v===false),true);assert.equal(banner.hidden,true);fail=true;await events.click({target:{closest:s=>s==='[data-cookie-accept]'?{}:null}});await flush();assert.equal(banner.hidden,false);assert.equal(feedback.textContent,'cookie_unavailable');console.log('PASS simulated consent paths: API v0.2, reject all optional categories, success acknowledgement, API failure remains visible, no local consent storage.');})().catch(error=>{console.error(error);process.exitCode=1;});
