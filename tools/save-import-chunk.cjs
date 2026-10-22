const fs=require('fs');
const statePath='docs/PRODUCT_IMPORT_STATE.json';
const state=JSON.parse(fs.readFileSync(statePath,'utf8'));
const batch=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
Object.assign(state.images,batch.images);Object.assign(state.products,batch.products);
state.errors.push(...(batch.errors||[]));
state.errors.forEach(e=>{if((e.stage==='image'&&state.images[e.key])||(e.stage==='product'&&state.products[e.asin])||(e.stage==='publication'&&state.products[e.asin]?.stage==='published'))e.resolved=true;});
fs.writeFileSync(statePath,JSON.stringify(state,null,2));
console.log(JSON.stringify({images:Object.keys(state.images).length,products:Object.keys(state.products).length,published:Object.values(state.products).filter(p=>p.stage==='published').length,unresolved:state.errors.filter(e=>!e.resolved).length}));
