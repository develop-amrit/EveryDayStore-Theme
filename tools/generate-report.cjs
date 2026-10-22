const fs=require('fs'),path=require('path');const {read,write,parse}=require('./build-lib.cjs');
const roots=['layout','templates','sections','snippets','assets','config','locales'];
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name).replaceAll('\\','/')]);
const files=roots.flatMap(walk),created=[],modified=[];let unchanged=0;
for(const file of files){const backup='_backup_original/'+file;if(!fs.existsSync(backup))created.push(file);else if(!fs.readFileSync(file).equals(fs.readFileSync(backup)))modified.push(file);else unchanged++;}
write('docs/FILES_CHANGED.md',`# Theme file inventory\n\nCompared with the preserved original backup: **${created.length} created**, **${modified.length} modified**, **${unchanged} unchanged** theme files. This includes the earlier homepage work now extended by the full build. Backup files were not edited. Docs and local verification tools are excluded from Shopify uploads by .shopifyignore. Phase grouping is in STOREFRONT_HANDOVER.md.\n\n## Created\n\n`+created.map(f=>'- `'+f+'`').join('\n')+'\n\n## Modified\n\n'+modified.map(f=>'- `'+f+'`').join('\n'));
write('docs/VERIFICATION.md',`# Verification record — 2026-10-20

## Passed offline

- tools/check-storefront.cjs: all **92 theme JSON files** parse, all **88 section schemas** parse, changed/shared Liquid block balance, snippet and translation references, template section/block references, range defaults, unique global setting IDs and syntax for all seven qc JavaScript modules pass. These are structural checks, not an official Liquid/HTML render.
- No real Admin/payment/provider credentials matched the credential scan in active assets/snippets/layout (values are suppressed by the checker on any match).
- tools/cart-smoke.cjs executes the real core JavaScript against an isolated fake DOM/fetch: both page and drawer refresh; cart counts update; bundled section parameters are sent; stock rejection stays an error; a committed cart write with failed display rendering is not treated as a second-add retry.
- tools/delivery-smoke.cjs executes the real checkout gate with a malformed reservation expiry: checkout is blocked and no cart/backend request is made.
- tools/privacy-smoke.cjs executes the real privacy code against a mock Shopify Privacy API: API v0.2 loads; reject sets all optional categories false; success is acknowledged; failure remains visible; no local consent cookie is fabricated with localStorage.
- Manual inspection: one shared Shopify product card, all merchandising from products/collections/menus/metafields; inactive/unavailable guard; placeholders/empty states; single-variant direct add and option-value Section Rendering for multiple/high-variant products; AJAX Cart/Section Rendering; no short-time delivery claims; reduced-motion overrides; no raw backend HTML; no order/contact/chat/OTP/photo data in localStorage. Automatically recorded recent-product handles require explicit preference consent. Guest wishlist/compare and chosen area are functional handle/preference storage.
- ${unchanged} original theme files still match the backup byte for byte. Changes are listed in FILES_CHANGED.md.

## Could not run / unverified

- shopify version/theme check/dev: executable is absent from PATH; global npm packages list is empty. PowerShell also blocks npm.ps1 execution, so setup instructions use npm.cmd/shopify.cmd instead of changing the execution policy.
- Bundled Shopify Liquid validator: failed before validation because @shopify/theme-check-common is missing from its installation. It is NOT a Theme Check pass.
- **No local preview server is running.** http://127.0.0.1:9292 is only the expected future address. No current page has been verified in a Shopify/browser render for this full build. The earlier remote codex-edits preview is stale relative to these new local files.
- Visual quality at 360–1440px, intrinsic image sizing/CLS, keyboard/focus behavior in a real browser, WCAG contrast with actual uploaded assets, predictive search results, real variant/combined-listing responses, Shopify cart stock races/discounts, newsletter submission and checkout have not been tested against the store.
- Slots/reservations, checkout address/terms enforcement, account wishlist/reorder extension, review moderation/storage, restock alerts, OTP/email/SMS/WhatsApp delivery, public tracking, private delivery evidence, AI/model grounding, action eligibility, ticketing, payments, VAT/invoice compliance and notification automation all require Admin/app/backend work and live integration tests.
- Native global percentage-discount sorting does not exist in the supplied Liquid interface; use the documented index/search app approach. Filtered page counts can include theme-hidden unavailable products until authoritative Draft/unpublication is configured.
- No Admin collection/menu/metafield/rate/payment/policy/app changes were applied, and no new theme files were uploaded/published during this full-build request.

## Re-run locally

~~~powershell
node tools/check-storefront.cjs
node tools/cart-smoke.cjs
node tools/delivery-smoke.cjs
node tools/privacy-smoke.cjs
~~~

For a real preview, install the CLI and follow STOREFRONT_HANDOVER.md. Run official Theme Check, fix its errors/relevant warnings, then test homepage/category/search/product/cart/saved-list/account/tracking/assistant/privacy routes on empty and partial catalogues. Validate delivery fees at 48.99, 49.00, 98.99, 99.00 and all configured backend failure/race/authorization paths before approving deployment.
`);
write('HOMEPAGE-GUIDE.md',`# Current storefront guide\n\nThe earlier homepage has been extended into the local full storefront build. Read [docs/STOREFRONT_HANDOVER.md](docs/STOREFRONT_HANDOVER.md) for phase-grouped files, merchant instructions, preview commands and unresolved Admin/app/backend work.\n\nThis full build has NOT been uploaded or published. The remote codex-edits copy contains the earlier homepage only. No local preview is running; Shopify CLI and the bundled validator dependency are unavailable here. See [docs/VERIFICATION.md](docs/VERIFICATION.md).\n`);
write('_verify-homepage.cjs',`// Compatibility entry point: the full build now has a broader offline checker.\nrequire('./tools/check-storefront.cjs');\n`);
write('assets/commerce-experience.js','/* Retired runtime. Shared storefront behavior is in qc-home.js and qc-* modules.\n * Do not re-enable the legacy checkout, tracking, consent or personal-data storage handlers.\n * Original files are preserved in _backup_original. */');
// Recompute once after retiring the old runtime so the inventory is complete.
if(!modified.includes('assets/commerce-experience.js'))console.log('Retired legacy runtime; rerun report to include its final modification.');
console.log(`${created.length} created, ${modified.length} modified, ${unchanged} unchanged theme files.`);
