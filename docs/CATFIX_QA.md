# Category fixes — 23 October 2026

Target: unpublished everyday-homepage-review, 189582049393. Live and other themes were not written; no theme created or published. Baseline: 1249321. CatFix 1–13 committed individually; integration and final QA are in CatFix 14.

## QA

- PASS: Default stock, window scrolling and test guard
- PASS: Slim search focuses, predicts, and closes cleanly
- PASS: Stock toggle stays in department; out-of-stock presentation
- PASS: Viewport infinite scroll preserves all-stock mode
- PASS: Sort applies immediately, white filter button, 16px inputs
- PASS: Instant sibling navigation keeps rail node and back/forward
- PASS: Fresh visit ignores stored scroll
- PASS: Optimistic add, debounce, badge/pill, remove
- PASS: Shopify error rolls optimistic state back with toast
- PASS: Layout 360 /collections
- PASS: Layout 360 /collections/baby-products-diapers-and-wipes
- PASS: Layout 360 /
- PASS: Layout 375 /collections
- PASS: Layout 375 /collections/baby-products-diapers-and-wipes
- PASS: Layout 375 /
- PASS: Layout 414 /collections
- PASS: Layout 414 /collections/baby-products-diapers-and-wipes
- PASS: Layout 414 /
- PASS: Layout 1280 /collections
- PASS: Layout 1280 /collections/baby-products-diapers-and-wipes
- PASS: Layout 1280 /
- PASS: Empty department child: no facets, real in-stock suggestions
- PASS: Third-level parent image or 24px icon and active rail
- PASS: Area picker remains usable with title focus and persisted selection
- PASS: Other templates: cream header, white search and policy URLs
- PASS: Reduced motion disables header/sheet animation
- PASS: webkit slim search focus and cream header
- PASS: firefox slim search focus and cream header
- PASS: Actual product and history restoration of loaded pages
- PASS: Baby Store is not marked Soon
- PASS: Final layout 360 /
- PASS: Final layout 360 /collections
- PASS: Final layout 360 /collections/baby-products-diapers-and-wipes
- PASS: Final layout 375 /
- PASS: Final layout 375 /collections
- PASS: Final layout 375 /collections/baby-products-diapers-and-wipes
- PASS: Final layout 414 /
- PASS: Final layout 414 /collections
- PASS: Final layout 414 /collections/baby-products-diapers-and-wipes
- PASS: Final layout 1280 /
- PASS: Final layout 1280 /collections
- PASS: Final layout 1280 /collections/baby-products-diapers-and-wipes

Final viewport checks: 360, 375, 414, 1280px, homepage + /collections + Diapers & Wipes. No horizontal overflow, console errors or [TEST] card titles. All twelve final measurements reported CLS 0. These are lab observations, not a guarantee for every device/session. Headless Chromium covers the full interactions; WebKit and Firefox additionally passed slim-search focus and cream colour. Actual iPhone/Android hardware and signed-in hosted account pages were not available.

Stock QA: native filtered count 27 includes nine [TEST] records; default label/cards show 18 real products. Native pagination still requests 24 records. Hiding internal records may leave fewer visible cards per load. Large all-stock counts retain Shopify native counts; unpublishing test records is the permanent correction. The off state uses ep_stock=all and retains it through native pagination/filter/sort.

Cart QA used an isolated browser cart, delayed real add/change requests, a simulated Shopify 422 inventory response, and cleanup. Immediate stepper/pill/badges, one change after fast taps, rollback/toast, removal and 76px safe clearance passed. No checkout or order was submitted.

Empty Gifting/Hampers showed no sort/filter row and six in-stock, non-test parent suggestions. Rice retained Pantry Staples active with an actual photo. Fresh reload ignored stored state; returning from a real product restored two loaded pages and scroll. Area selection preserved qc-dubai-area plus cart delivery_zone. Native Availability/Price facets are configured; Brand/Product type require merchant setup.

First-paint QA found the generic image-skeleton class made hero artwork relative after initialization; it is now explicitly absolute. Refreshed all EP critical states in chunks below the inline asset size limit, including hidden/dynamically inserted content, so stylesheet arrival does not shift the page.

## Validation

Official Shopify CLI Theme Check: 0 errors, 15 warnings. Structural checks passed: 93 JSON files, 103 schemas, Liquid references, translations, JS syntax; cart smoke checks passed. Bundled skill validator was attempted for the whole changed-file list, but cannot run because the plugin lacks @shopify/theme-check-common; official CLI is the completed validation.

Warning disposition: retained orphan snippets are intentionally kept for reversibility (including ep-directory-extra after removal of More collections); the other warnings are inherited Dawn/QC code outside this category task. No new runtime error was found. No suppression was added. Individual warnings:

- snippets/commerce-runtime.liquid: OrphanedSnippet — This snippet is not referenced by any other files
- snippets/commerce-source-card.liquid: OrphanedSnippet — This snippet is not referenced by any other files
- snippets/ep-directory-extra.liquid: OrphanedSnippet — This snippet is not referenced by any other files
- snippets/ep-tile.liquid: OrphanedSnippet — This snippet is not referenced by any other files
- snippets/quick-order-product-row.liquid: OrphanedSnippet — This snippet is not referenced by any other files
- sections/main-list-collections.liquid: VariableName — The variable 'moduloResult' uses wrong naming format
- sections/main-article.liquid: VariableName — The variable 'anchorId' uses wrong naming format
- sections/qc-product.liquid: UnusedAssign — The variable 'current_variant' is assigned but not used
- sections/main-search.liquid: UnusedAssign — The variable 'product_settings' is assigned but not used
- snippets/facets.liquid: LiquidComplexity — Liquid complexity is 136, which exceeds the maximum of 120. The decision at line 865 pushed it over the limit. Consider simplifying conditional logic, or moving self-contained decision logic into snippets with the render tag.
- sections/main-product.liquid: UnusedAssign — The variable 'seo_media' is assigned but not used
- sections/main-product.liquid: UndefinedObject — Unknown object 'continue' used.
- snippets/qc-logo.liquid: UndefinedObject — Unknown object 'wordmark' used.
- layout/password.liquid: UndefinedObject — Unknown object 'scheme_classes' used.
- layout/theme.liquid: UndefinedObject — Unknown object 'scheme_classes' used.

## Deployment

WORKLOG.md and CLI roles checked before every deployment. Only theme 189582049393 was targeted while unpublished. Changed-file-only pushes preserve remote templates/group settings outside this batch. At the start, settings_data.json had merchant edits: its complete remote settings were merged before adding the two safety-net settings. Final Admin API readback verifies all changed file checksums except settings_data.json, whose generated formatting differs but whose parsed JSON is identical.

## Files changed

- assets/ep-browse.js
- assets/ep-catfix.css
- assets/ep-collection.js
- assets/ep-critical-0.css
- assets/ep-critical-1.css
- assets/ep-critical-2.css
- assets/ep-critical-3.css
- assets/ep-critical-4.css
- assets/ep-critical-5.css
- assets/ep-critical-6.css
- assets/ep-critical-7.css
- assets/ep-mobile.css
- assets/ep-mobile.js
- config/settings_data.json
- config/settings_schema.json
- layout/password.liquid
- layout/theme.liquid
- locales/bg.json
- locales/cs.json
- locales/cs.schema.json
- locales/da.json
- locales/da.schema.json
- locales/de.json
- locales/de.schema.json
- locales/el.json
- locales/en.default.json
- locales/en.default.schema.json
- locales/es.json
- locales/es.schema.json
- locales/fi.json
- locales/fi.schema.json
- locales/fr.json
- locales/fr.schema.json
- locales/hr.json
- locales/hu.json
- locales/id.json
- locales/it.json
- locales/it.schema.json
- locales/ja.json
- locales/ja.schema.json
- locales/ko.json
- locales/ko.schema.json
- locales/lt.json
- locales/nb.json
- locales/nb.schema.json
- locales/nl.json
- locales/nl.schema.json
- locales/pl.json
- locales/pl.schema.json
- locales/pt-BR.json
- locales/pt-BR.schema.json
- locales/pt-PT.json
- locales/pt-PT.schema.json
- locales/ro.json
- locales/ru.json
- locales/sk.json
- locales/sl.json
- locales/sv.json
- locales/sv.schema.json
- locales/th.json
- locales/th.schema.json
- locales/tr.json
- locales/tr.schema.json
- locales/vi.json
- locales/zh-CN.json
- locales/zh-CN.schema.json
- locales/zh-TW.json
- locales/zh-TW.schema.json
- sections/ep-categories-page.liquid
- sections/ep-collection.liquid
- sections/ep-deals.liquid
- sections/ep-product-grid.liquid
- sections/ep-product-rail.liquid
- sections/ep-search-links.liquid
- sections/predictive-search.liquid
- sections/qc-catalog.liquid
- sections/qc-footer.liquid
- sections/qc-predictive.liquid
- snippets/ep-add-button.liquid
- snippets/ep-auto-image.liquid
- snippets/ep-card.liquid
- snippets/ep-category-menu-tile.liquid
- snippets/ep-collection-filters.liquid
- snippets/ep-collection-rail-item.liquid
- snippets/ep-content-visible.liquid
- snippets/ep-critical-css.liquid
- snippets/ep-from-price.liquid
- snippets/ep-pack-size.liquid
- snippets/ep-product-cluster.liquid
- snippets/ep-visible-product-count.liquid
- snippets/qc-cart-contents.liquid
- snippets/qc-menu.liquid
- templates/gift_card.liquid

Readable JS/CSS, build/guard/QA/report scripts and screenshots are retained under tools/ and qa/. MERCHANT_TODO.md has policy, test-content, inventory, image, menu and filter setup.

## Lighthouse preview observation

{"scores":{"performance":74,"accessibility":100,"best-practices":79,"seo":92},"lcp_ms":3493.621,"cls":0}

The earlier master/polish Performance ≥80 and LCP <2.5s gates remain unmet in this run (74, 3.49s). The LCP element was the existing cookie-consent paragraph, revealed after the Shopify privacy API finished; TBT was 570ms. Consent and tracking behaviour were preserved. This is recorded as an outstanding inherited performance limitation, not a passing result.
