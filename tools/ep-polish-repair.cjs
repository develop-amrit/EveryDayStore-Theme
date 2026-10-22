const {b,edit}=require('./ep-polish.cjs'),cp=require('child_process');
edit('tools/ep-mobile-source.css',s=>s.replace('.ep-header:has(.ep-header .ep-upper{','.ep-header .ep-upper{'));
edit('sections/ep-category-grid.liquid',s=>s.replace("{% if pass == 1 and has_products or pass == 2 and has_products == false %}","{% assign show_tile = false %}{% if pass == 1 %}{% if has_products %}{% assign show_tile = true %}{% endif %}{% else %}{% unless has_products %}{% assign show_tile = true %}{% endunless %}{% endif %}{% if show_tile %}"));
edit('assets/ep-final.js',s=>s.replace("this.dialog.style.height=oldHeight+'px';requestAnimationFrame", "this.dialog.style.height=oldHeight+'px';void this.dialog.offsetHeight;requestAnimationFrame"));
cp.execFileSync(process.execPath,['tools/ep-bundle.cjs']);
