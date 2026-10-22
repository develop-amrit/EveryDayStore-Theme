const fs=require('fs'),zlib=require('zlib');
const buffer=fs.readFileSync(process.argv[2]||'product-list/category_samples.xlsx'),entries=new Map();
let end=buffer.length-22;while(end>=0&&buffer.readUInt32LE(end)!==0x06054b50)end--;
if(end<0)throw Error('Invalid XLSX ZIP');
let offset=buffer.readUInt32LE(end+16);
for(let i=0;i<buffer.readUInt16LE(end+10);i++){
  const method=buffer.readUInt16LE(offset+10),size=buffer.readUInt32LE(offset+20),nameLength=buffer.readUInt16LE(offset+28),extra=buffer.readUInt16LE(offset+30),comment=buffer.readUInt16LE(offset+32),local=buffer.readUInt32LE(offset+42),name=buffer.toString('utf8',offset+46,offset+46+nameLength);
  const start=local+30+buffer.readUInt16LE(local+26)+buffer.readUInt16LE(local+28),bytes=buffer.subarray(start,start+size);
  entries.set(name,()=>{if(method===0)return bytes.toString('utf8');if(method===8)return zlib.inflateRawSync(bytes).toString('utf8');throw Error('Unsupported ZIP compression');});offset+=46+nameLength+extra+comment;
}
const xml=p=>entries.get(p)?.()||'';
const decode=s=>s.replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&');
const attrs=s=>Object.fromEntries([...s.matchAll(/([\w:]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const text=s=>[...s.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map(m=>decode(m[1])).join('');
const shared=[...xml('xl/sharedStrings.xml').matchAll(/<si(?:\s[^>]*)?>([\s\S]*?)<\/si>/g)].map(m=>text(m[1]));
const rels=Object.fromEntries([...xml('xl/_rels/workbook.xml.rels').matchAll(/<Relationship\b([^>]*)\/?\s*>/g)].map(m=>{const a=attrs(m[1]);return[a.Id,a.Target.startsWith('/')?a.Target.slice(1):'xl/'+a.Target];}));
const sheets=[...xml('xl/workbook.xml').matchAll(/<sheet\b([^>]*)\/?\s*>/g)].map(m=>{
  const a=attrs(m[1]),rows=[...xml(rels[a['r:id']]).matchAll(/<row\b([^>]*)>([\s\S]*?)<\/row>/g)].map(r=>{
    const cells={};for(const c of r[2].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)){const ca=attrs(c[1]),v=c[2].match(/<v(?:\s[^>]*)?>([\s\S]*?)<\/v>/)?.[1]||'';cells[ca.r.replace(/\d/g,'')]=ca.t==='s'?shared[+v]:ca.t==='inlineStr'?text(c[2]):decode(v);}
    return{row:+attrs(r[1]).r,cells};
  });return{name:a.name,rows};
});
fs.writeFileSync(process.argv[3]||'tools/category-samples-raw.json',JSON.stringify(sheets,null,2));
for(const s of sheets)console.log(JSON.stringify({sheet:s.name,rowCount:s.rows.length,firstRows:s.rows.slice(0,2)}));
