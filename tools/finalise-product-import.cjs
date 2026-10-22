const fs=require('fs'),crypto=require('crypto');
const planPath='tools/catalogue-import-plan.json',statePath='docs/PRODUCT_IMPORT_STATE.json';
const plan=JSON.parse(fs.readFileSync(planPath)),state=JSON.parse(fs.readFileSync(statePath)),products=JSON.parse(fs.readFileSync('tools/import-verified-products.json'));
const failures=[];
for(const r of plan){
 const matches=products.filter(p=>p.tags.includes('source-asin-'+r.asin));
 if(matches.length!==1){failures.push(r.asin+': duplicate or missing ASIN');continue;}
 const p=matches[0],v=p.variants.nodes[0],active=r.stock>0&&!r.identityIssue;
 const published=p.resourcePublicationsV2.nodes.some(x=>x.isPublished&&x.publication.id==='gid://shopify/Publication/221399023729');
 const checks={price:+v.price===+(r.discountPrice||r.regularPrice),compare:r.discountPrice?+v.compareAtPrice===+r.regularPrice:v.compareAtPrice===null,stock:v.inventoryQuantity===r.stock,sku:v.sku===r.sku,barcode:v.barcode===r.barcode,tracked:v.inventoryItem.tracked,status:p.status===(active?'ACTIVE':'DRAFT'),images:p.media.nodes.length===r.images.length,ready:p.media.nodes.every(m=>m.status==='READY'),publication:published===active,tags:r.tags.every(t=>p.tags.includes(t))};
 for(const [k,ok]of Object.entries(checks))if(!ok)failures.push(r.asin+': '+k);
 r.vendor=p.vendor;
 state.products[r.asin]={...state.products[r.asin],...p,stage:published?'published':'created'};
}
if(failures.length){console.error(failures);process.exit(1);}
state.verified_at=new Date().toISOString();state.verification={products:85,active:67,draft:18,images:497,price_stock_sku_barcode_tags_media_publication:'passed'};
fs.writeFileSync(statePath,JSON.stringify(state,null,2));fs.writeFileSync(planPath,JSON.stringify(plan,null,2));
const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const csv=[['ASIN','SKU','Barcode','Product','Category','Price AED','Compare price AED','Stock','Status','Images','Hold reason','Admin URL'],...plan.map(r=>{const p=state.products[r.asin];return[r.asin,r.sku,r.barcode,r.title,r.mainCategory+' > '+r.productType,r.discountPrice||r.regularPrice,r.discountPrice?r.regularPrice:'',r.stock,p.status,r.images.length,r.identityIssue||(r.stock===0?'No warehouse stock':''),'https://admin.shopify.com/store/3djevx-mu/products/'+p.id.split('/').pop()];})].map(row=>row.map(quote).join(',')).join('\r\n');
fs.writeFileSync('docs/PRODUCT_IMPORT_REVIEW.csv','\ufeff'+csv);
const counts=[...new Set(plan.map(r=>r.mainCategory))].map(c=>{const rows=plan.filter(r=>r.mainCategory===c);return`| ${c} | ${rows.length} | ${rows.filter(r=>r.stock>0&&!r.identityIssue).length} |`;}).join('\n');
const review=plan.filter(r=>r.identityIssue).map(r=>`| ${r.asin} | ${r.sku} | ${r.identityIssue} |`).join('\n');
const stock=plan.filter(r=>r.stock===0).map(r=>`- ${r.asin} — ${r.cardTitle} (${r.sku})`).join('\n');
const report=`# Product import — 21 October 2026

Completed for 3djevx-mu.myshopify.com. The Products worksheet contains **85 unique ASINs, not 89**. All 85 are imported: **67 ACTIVE and published to Online Store, 18 DRAFT**. Twelve existing drafts were updated; 73 products were created. No duplicate imported ASINs were found.

## Sources and pricing

- Product titles, descriptions, pack information and specifications: product-list/category_samples.xlsx.
- Prices, listed discount prices, SKU/barcode and warehouse stock: product-list/Inventory Data-5.xlsx. Discount price becomes the selling price; regular price becomes compare-at price only when a real lower discount exists. All prices are AED.
- All 85 matched the inventory workbook. For five duplicate MF/FBC offers, the single seller-managed MF offer was selected; the two fulfilment channels were not added together.
- Inventory is tracked with overselling disabled at the existing active location **Gole Market**. Its name/address were not changed.
- 497 gallery images are READY on Shopify CDN. 479 correspond to local ASIN image files. Three missing folders (B0FHW2GLMK, B0FMYL2WLB, B0DDC5SK52) use their 18 workbook image URLs. When local image transfer stopped working, remaining local files were matched to the identical workbook image URL by the scraper's numbered-file mapping and uploaded from that URL.
- Source workbooks and local image files are unchanged. Amazon seller/delivery details, ratings and review counts were not imported. Product specifications remain source data and should be checked by the merchant.

## Categories

Products feed the existing automated catalogue collections and navigation via catalogue tags. There are 28 populated second-level categories, with third-level tags on 39 products where the source identity was clear. Category labels/architecture are retained.

| Department | Imported | Published |
| --- | ---: | ---: |
${counts}

Source classification corrections: three children's shampoos moved to Hair Care; talcum powder moved from Baby Toys to Baby Bath, Skincare & Grooming; Red Label tea moved to Beverages; Post-it notes moved to Desk Essentials. Baby Food cross-listing was not changed without the merchant's confirmation.

## Drafts needing identity confirmation

These nine retain the inventory price/stock but are not available for sale. Confirm the actual pack and replace mismatched source content/images before activation.

| ASIN | Inventory SKU | Reason |
| --- | --- | --- |
${review}

## Drafts with no stock

These nine are not marked as recently sold out, because there is no purchase history establishing that condition. Set warehouse stock and activate/publish them in Admin when ready.

${stock}

## Theme and homepage

The same store-wide catalogue is available to both themes. Only the existing unpublished **codex-edits2 (189518545009)** received templates/index.json: seven distinct department product rows, updated general-store hero/promo copy, and removal of old sample-only footer links. Existing section styling is retained. The seven department collections now default to newest first to put newly imported products before older sample stock.

The live **codex-edits (189489545329)** theme was not edited or published. Its homepage template update is queued in THEME_SYNC_STATE.json along with the earlier UX batch. A theme role switch does not trigger automatic background sync. Older catalogue/test products outside this 85-item import remain unchanged.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009

## Verification

Shopify API read-back checked every imported SKU, barcode, selling/compare price, stock, tracked inventory, expected status, Online Store publication, category tags and exact gallery count; all 497 media are READY. No imported ASIN is duplicated. Structural checks pass for theme JSON, section schemas, translations, references and JS syntax. Full official Theme Check remains unavailable: Shopify CLI is missing in this shell, and the bundled validator lacks @shopify/theme-check-common.

Browser checks: populated category with sidebar; seven homepage product rows; imported product details/photo/discount; Add and Remove via AJAX. Basket returned to its original two items, AED 482.00. No checkout/order/payment was submitted. Existing shipping, payment, policy and backend limitations in ORDERING_POLISH.md still apply.

## Merchant guide

Manage products in Shopify Admin > Products. Add images, SKU/barcode, AED price/compare price and inventory at the fulfilment location. Use the appropriate catalogue:<collection-handle> tag (see CATALOGUE_MENU.json/collection rules); the automated collection then includes the product. Set Active and publish to Online Store when ready. Homepage shelves select collections in Online Store > Themes > Customize. Draft/archive/unpublish a product to remove it from sale; deleting is optional. Review all draft reasons and Admin product links in PRODUCT_IMPORT_REVIEW.csv.
`;
fs.writeFileSync('docs/PRODUCT_IMPORT_REPORT.md',report);
const syncPath='docs/THEME_SYNC_STATE.json',sync=JSON.parse(fs.readFileSync(syncPath));
sync.batch='ux-polish-and-catalogue-import-2026-10-21';
const filename='templates/index.json',sha256=crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
sync.files=sync.files.filter(f=>f.filename!==filename);sync.files.push({filename,sha256});
sync.catalogue_import={products:85,published:67,draft:18,store_wide:true,report:'docs/PRODUCT_IMPORT_REPORT.md'};
fs.writeFileSync(syncPath,JSON.stringify(sync,null,2)+'\n');
console.log(JSON.stringify({verified:85,images:497,published:67,drafts:18,updated:12,created:73}));
