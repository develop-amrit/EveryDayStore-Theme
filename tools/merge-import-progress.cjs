const fs=require('fs');
const p='docs/PRODUCT_IMPORT_STATE.json',state=JSON.parse(fs.readFileSync(p,'utf8')),batch=JSON.parse(fs.readFileSync('tools/import-current-batch.json','utf8'));
Object.assign(state.images,batch.images);Object.assign(state.products,batch.products);
state.errors.forEach(e=>{if((e.stage==='image'&&state.images[e.key])||(e.stage==='product'&&state.products[e.asin])||(e.stage==='publication'&&state.products[e.asin]?.stage==='published'))e.resolved=true;});
for(const error of batch.errors||[])state.errors.push(error);
fs.writeFileSync(p,JSON.stringify(state,null,2));
console.log(JSON.stringify({images:Object.keys(state.images).length,products:Object.keys(state.products).length,published:Object.values(state.products).filter(p=>p.stage==='published').length,unresolved:state.errors.filter(e=>!e.resolved).length}));
