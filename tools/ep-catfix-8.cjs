const b=require('./ep-catfix-common.cjs');let p='tools/ep-src/ep-browse.js',s=b.read(p);
s=s.replace("this.onShow=e=>{if(e.persisted)this.indicator(false);};","this.onShow=e=>{if(e.persisted)this.restore();};");
s=s.replace('this.activate(false);this.watch();this.restore();',"this.activate(true);history.scrollRestoration='manual';this.watch();if(performance.getEntriesByType('navigation')[0]?.type==='back_forward')this.restore();else window.scrollTo({top:0,behavior:'instant'});");
const start=s.indexOf('    key('),end=s.indexOf('    indicator(',start);s=s.slice(0,start)+`    key(url=this.currentUrl){const u=new URL(url,location.origin);return 'ep-catfix:'+u.pathname+u.search;}
    save(){try{sessionStorage.setItem(this.key(),JSON.stringify({pages:this.pages,window:scrollY,rail:this.rail?.scrollTop||0}));}catch{}}
    async restore(){if(this.restoring)return;let state;try{state=JSON.parse(sessionStorage.getItem(this.key())||'null');}catch{}if(!state)return;this.restoring=true;for(let page=this.pages;page<state.pages;page++){if(!this.next()||this.failed)break;await this.more(true);}if(this.rail)this.rail.scrollTop=state.rail||0;window.scrollTo({top:state.window||0,behavior:'instant'});this.restoring=false;this.watch();}
`+s.slice(end);
s=s.replace('async navigate(url,push=true,pop=false){if(url.origin',"async navigate(url,push=true,pop=false){if(!url.searchParams.has('filter.v.availability')&&url.searchParams.get('ep_stock')!=='all')url.searchParams.set('filter.v.availability','1');if(url.origin");
s=s.replace("this.content.scrollTop>0||scrollY>0","scrollY>0").replace("!entries[0].isIntersecting||$('[data-collection-content]')?.scrollTop>0","!entries[0].isIntersecting");b.write(p,s);
b.finish(8,'Restore state only on history traversal','New session namespace and full path/query key avoid stale inner-scroll snapshots. Normal visits start at the document top; browser back_forward, persisted pageshow and popstate restore loaded pages and window offset.');
