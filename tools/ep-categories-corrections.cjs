const b=require('./ep-build.cjs');for(const p of ['layout/theme.liquid','sections/qc-header.liquid'])b.write(p,b.read(p).replaceAll("'list_collections'","'list-collections'"));
