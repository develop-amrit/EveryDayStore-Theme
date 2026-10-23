const fs=require('fs'),b=require('./ep-build.cjs'),esbuild=require('./ep-qa/node_modules/esbuild');
let s=b.read('tools/ep-src/ep-browse.js').replace("if(pop)await this.restore();","if(pop){this.switching=false;this.loading=false;await this.restore();}").replace("this.version++;const version=this.version;this.switching=true;","this.version++;this.observer?.disconnect();const version=this.version;this.switching=true;").replace("area.dataset.empty=document.documentElement.dataset.epChooseArea||'Choose area';",'');b.write('tools/ep-src/ep-browse.js',s);
b.write('assets/ep-browse.js',esbuild.transformSync(s,{loader:'js',minify:true,target:'es2020'}).code);
b.write('assets/ep-browse.css',esbuild.transformSync(b.read('tools/ep-browse.css'),{loader:'css',minify:true}).code);
console.log('Collection browser JS '+fs.statSync('assets/ep-browse.js').size+' bytes; CSS '+fs.statSync('assets/ep-browse.css').size+' bytes');
