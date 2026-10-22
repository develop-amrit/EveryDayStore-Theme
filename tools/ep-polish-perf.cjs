const fs=require('fs'),b=require('./ep-build.cjs');const p='tools/ep-src/ep-polish.js';let js=b.read(p);
js=js.replace("const images=scope=>", "const imageVisibility=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('ep-image-visible',e.isIntersecting)),{rootMargin:'150px'});\nconst images=scope=>");
js=js.replace("well.classList.add('ep-image-js','ep-loading');", "well.classList.add('ep-image-js','ep-loading');imageVisibility.observe(well);");
b.write(p,js);fs.appendFileSync('tools/ep-mobile-source.css','\n.ep-loading{contain:paint}.ep-loading:after{animation:none!important}@media(prefers-reduced-motion:no-preference){.ep-loading.ep-image-visible:after{animation:ep-shimmer 1.2s var(--ep-ease) infinite!important}}\n');
