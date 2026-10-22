// Execute the real checkout gate with an invalid reservation expiry. No backend
// is simulated as successful, and no real cart or checkout request is made.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const listeners={},feedback={textContent:''},checkbox={checked:true},button={disabled:false};let requests=0;
const form={dataset:{},querySelector:s=>s==='[data-terms]'?checkbox:s==='[name=checkout]'?button:s==='[role=status]'?feedback:null,reportValidity:()=>true};
const cart={attributes:{delivery_reservation:'lease',delivery_proof:'proof',delivery_reservation_expires:'not-a-date'},items:[]};
const config={root:'/',mock_slots:false,design_mode:false,require_booking:true,zones:'[]',endpoints:{},labels:{}};
const doc={querySelector:()=>null,querySelectorAll:()=>[],addEventListener:(name,fn)=>(listeners[name]||=[]).push(fn)};
const services={config,root:'/', $:(s,el=doc)=>el.querySelector(s), $$:(s,el=doc)=>el.querySelectorAll(s),t:k=>k,status:(el,text)=>feedback.textContent=text,endpoint(){return null;},api(){throw new Error('unexpected backend request');},notify(){}};
const context={document:doc,window:{QCServices:services,QCCart:{get:()=>cart}},location:{hostname:'shop.myshopify.com'},localStorage:{getItem:()=>''},Intl,Date,Number,Promise,fetch(){requests++;throw new Error('unexpected cart request');}};
vm.createContext(context);vm.runInContext(fs.readFileSync('assets/qc-delivery.js','utf8'),context);
(async()=>{let prevented=false;const event={target:{closest:s=>s==='[data-checkout-form]'?form:null},preventDefault(){prevented=true;}};for(const handler of listeners.submit||[])await handler(event);assert.equal(prevented,true);assert.equal(feedback.textContent,'booking_required');assert.equal(requests,0);console.log('PASS simulated checkout gate: invalid reservation expiry blocks submission without a cart/backend request.');})().catch(error=>{console.error(error);process.exitCode=1;});
