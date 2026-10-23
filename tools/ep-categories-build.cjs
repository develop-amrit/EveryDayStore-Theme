const fs=require('fs'),b=require('./ep-build.cjs'),esbuild=require('./ep-qa/node_modules/esbuild');
let s=b.read('tools/ep-src/ep-browse.js').replace("if(pop)await this.restore();","if(pop){this.switching=false;this.loading=false;await this.restore();}").replace("this.version++;const version=this.version;this.switching=true;","this.version++;this.observer?.disconnect();const version=this.version;this.switching=true;").replace("area.dataset.empty=document.documentElement.dataset.epChooseArea||'Choose area';",'');b.write('tools/ep-src/ep-browse.js',s);
const shared=s.slice(0,s.indexOf('  const cache=new Map();')),split=s.indexOf('  class EPCartPill');
const sheetStart=s.indexOf('  const sheetState='),classStart=s.indexOf('  class EPCollection'),sheets=s.slice(sheetStart,classStart);
b.write('assets/ep-browse.js',esbuild.transformSync(shared+sheets+'window.EPSheets={open:openSheet,close:closeSheet};'+s.slice(split),{loader:'js',minify:true,target:'es2020',treeShaking:true}).code);
b.write('assets/ep-collection.js',esbuild.transformSync(shared+'const closeSheet=(...args)=>window.EPSheets.close(...args);'+s.slice(s.indexOf('  const cache=new Map();'),sheetStart)+s.slice(classStart,split)+'})();',{loader:'js',minify:true,target:'es2020',treeShaking:true}).code);
b.write('assets/ep-browse.css',esbuild.transformSync(b.read('tools/ep-browse.css'),{loader:'css',minify:true}).code);
console.log('Shared browse JS '+fs.statSync('assets/ep-browse.js').size+' bytes; collection-only JS '+fs.statSync('assets/ep-collection.js').size+' bytes; CSS '+fs.statSync('assets/ep-browse.css').size+' bytes');

b.write('assets/ep-catfix.css',esbuild.transformSync(b.read('tools/ep-catfix.css'),{loader:'css',minify:true}).code);
