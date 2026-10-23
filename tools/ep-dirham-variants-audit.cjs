const b=require('./ep-build.cjs');let p='tools/ep-dirham-updates.cjs';b.write(p,b.read(p).replace('p.variants.length>1&&p.variants.some(v=>v.available)','p.variants.length>1'));
