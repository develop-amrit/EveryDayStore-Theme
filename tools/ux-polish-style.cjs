const fs=require('fs');
const append=(p,s)=>fs.appendFileSync(p,'\n'+s+'\n');
append('assets/qc-storefront.css', `/* Incremental UX polish: preserve the existing composition and palette. */
.qc-header-basket-copy{display:block;font-size:12px;font-weight:700;white-space:nowrap}
.qc-header-actions>[data-cart-open]{display:flex;align-items:center;gap:6px;width:auto}
.qc-basket-summary{display:none}
.qc-home .qc-basket-delivery{display:flex;align-items:center;gap:8px;padding:12px;margin-block:16px 0;border-radius:10px;background:var(--qc-cream);font-size:12px;font-weight:600}
.qc-home .qc-card h3{min-height:41px;font-size:14px;line-height:1.45}
.qc-home .qc-card h3 a{-webkit-line-clamp:2}
.qc-home .qc-card-size{min-height:16px}
.qc-home .qc-card-meta{margin-block:2px 4px}
.qc-home .qc-hero{margin-block-end:32px}
@media(min-width:750px){.qc-home .qc-hero-copy{padding-block:28px}.qc-home .qc-hero-slide{min-height:260px}.qc-home .qc-hero-art{min-height:250px}}
@media(max-width:749px){.qc-home .qc-header-basket-copy{display:none}.qc-home .qc-card h3{font-size:13px;min-height:38px}.qc-home .qc-header.qc-compact .qc-top-categories,.qc-home .qc-header.qc-compact .qc-location{display:none}.qc-home .qc-header.qc-compact .qc-header-row{padding-block:8px;gap:4px 8px}.qc-home .qc-header.qc-compact .qc-search{grid-row:2}.qc-home .qc-hero{margin-block-end:28px}.qc-home .qc-basket-summary:not([hidden]){position:fixed;inset-inline:12px;inset-block-end:76px;z-index:24;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:52px;border-radius:12px;background:var(--qc-ink);color:var(--qc-cream);padding:8px 16px;text-decoration:none;box-shadow:var(--qc-shadow);font-size:13px;font-weight:700}.qc-basket-summary>span:first-child{display:flex;align-items:center;gap:12px}.qc-basket-summary [data-basket-count]{font-size:11px;font-weight:400}.qc-has-basket .qc-footer{padding-block-end:156px}.qc-home:has(dialog[open]) .qc-basket-summary{display:none}.qc-has-basket .qc-chat-launcher{inset-block-end:140px}}
`);
append('assets/qc-category-sidebar.css', `.qc-sidebar-context{display:flex;align-items:center;gap:10px;padding:12px 8px;text-decoration:none;border-block-end:1px solid var(--qc-line)}
.qc-sidebar-nearby{padding-inline-start:0}
.qc-sidebar-parent{display:flex;align-items:center;gap:6px;min-height:44px;padding:8px;font-size:12px;text-decoration:none;color:var(--qc-muted)}
.qc-collection-sidebar .qc-sidebar-switcher>summary{min-height:48px;font-size:12px;font-weight:600;justify-content:space-between;border-block-start:1px solid var(--qc-line);border-radius:0}
.qc-collection-filters>summary{display:none}
@media(max-width:749px){.qc-sidebar-context{flex-direction:column;gap:6px;padding:10px 4px;text-align:center}.qc-sidebar-parent{font-size:10px;padding-inline:4px;line-height:1.4}.qc-collection-sidebar .qc-sidebar-switcher>summary{font-size:10px;flex-direction:row;gap:3px;padding-inline:3px;text-align:start}.qc-home .qc-collection-filters>summary{display:flex;align-items:center;justify-content:space-between;min-height:44px;padding:10px 12px;border:1px solid var(--qc-line);border-radius:10px;background:var(--qc-soft);font-size:12px;font-weight:600;list-style:none;cursor:pointer}.qc-collection-filters>summary:after{content:'+';font-size:18px}.qc-collection-filters[open]>summary:after{content:'−'}.qc-collection-filters>summary::-webkit-details-marker{display:none}.qc-collection-filters{margin-block-end:14px}}
`);
const p='locales/en.default.json';const raw=fs.readFileSync(p,'utf8');const j=JSON.parse(raw.slice(raw.indexOf('{')));Object.assign(j.qc,{item_one:'item',item_other:'items',view_basket:'View basket',filter_sort:'Filter & sort',change_department:'Change department',next_day_promise:'Order today, delivered next day'});fs.writeFileSync(p,raw.slice(0,raw.indexOf('{'))+JSON.stringify(j,null,2)+'\n');
console.log('Incremental styles and translations saved.');
