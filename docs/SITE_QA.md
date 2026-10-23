# Sitewide fixes — 24 October 2026

Target: **189582049393**, everyday-homepage-review, verified **UNPUBLISHED**. Baseline: c97368c. No live/other theme writes, duplication or publication. Site 1–12 were committed individually; Site 13 contains integration fixes and final QA.

## Final results

- 66 browser checks passed, with no page/console errors recorded.
- All 36 primary viewport measurements returned CLS 0: 360, 375, 414 and 1280px across homepage, Categories, listing, Deals, search, no-results, product, cart and 404. Final 404 image choices also passed four supplemental CLS/overflow checks.
- Official Shopify CLI Theme Check: 0 errors, 15 warnings. Structural checks passed 93 JSON files, 109 section schemas, references, translation keys and JS syntax; existing cart smoke paths also passed.
- Final Admin API checksum readback: 100 changed theme files match local source exactly (allowing CLI newline normalization); target remains unpublished.

## What changed

| Fix | Result |
|---|---|
| 1. History | Category/chip/filter/sort state replaces the listing entry. Original non-listing URL/scroll is kept in ep:listingEntry and history.state. Back/forward from products restores listing pages/scroll. Department changes replace the document when the rail tree changes. No category popstate renderer remains. |
| 2. Homepage stock | Shared 250-product scan plus real department-child fallback; unavailable, homepage-hide and internal records skipped. Baby care renders four available products in current settings. Care and other homepage grids contain no out-of-stock cards. Collection links remain. |
| 3. Buttons | Filled/outline contrast fixed, including 404 and newsletter submit. Runtime QA flags visible buttons with equal foreground/background colours. |
| 4. Deals | Rail-free listing grid, compact ADD, actual compare-at discounts, native sheets and infinite scroll; correct title. Mobile Deals nav/pill present, desktop mobile nav hidden per inherited responsive rules. Native All-product counts are hidden rather than falsely presented as deal counts. |
| 5. Search | One open, pre-filled predictive field in slim header; count, native sheets, two-column mobile cards, infinite loading, collection/page chips and real no-results suggestions. Field remains open after outside taps. Direct-search Back survives stock canonicalization. |
| 6. Product | Square snap gallery/dots, full-screen zoom, readable vendor/name/pack/price, saved-area delivery line, fee sheet, variant option-value rendering, description/specs, gallery heart and sticky 48px ADD/stepper. Similar/complementary use EP cards and hide empty output. Empty reviews/recently viewed are hidden. |
| 7. 404 | Visible Continue shopping plus search and six editable category blocks, sharing sensible Grocery/Bath imagery and uniqueness checks. |
| 8. Cream | Full #FEFAE0 header/panel tint, white search field with subtle border; matching theme-color. Pinned states keep cream. |
| 9. Images | First six rendered cards eager after filtering; remaining native-lazy images warm within 400px. Responsive 120–480 srcsets, placement-specific sizes, fixed wells, skeleton/fade, eager first gallery image and fixed 52px promo. Promo stays hidden until a real image loads and is hidden on product pages. |
| 10. Panel | Unique in-stock auto products across blocks, Product for image override per block. Grocery explicitly uses real available Noor oil; Bath uses real available Dettol soap. Merchant collection conditions still need cleanup. |
| 11. Empty basket | Real in-stock compact ADD rail, with Shopify native best-selling enhancement. No-results uses the same native ranking. Inert templates avoid loading unused hidden-cart images. |
| 12. Owner tasks | Hosted sign-in branding, Baby inventory/optional in-stock collection, Bath & Body conditions and test-record cleanup documented in MERCHANT_TODO.md. |

## Important implementation details

Listing/product price rows explicitly use flex; the legacy two-row grid was the cause of MRP overflow. Geometry QA now measures the actual compare-at bounds as well as the price parent. Compact suggestion rails retain their reserved two-line price treatment. Currency glyphs remain inline inside a fixed em-width slot (including standalone gift-card currency CSS), with explicit compare-at strike-through, so font loading cannot move prices. Digits/format, plain AED attributes and structured data remain unchanged.

The existing area save logic is preserved: qc-dubai-area plus delivery_zone cart attribute. Product area text observes the shared saved area. Existing privacy API/consent behaviour is preserved; recently viewed requires preference consent and another real product, and rechecks consent after asynchronous fetches. The consent/revocation test passed. Header/nav/bar space is declared before observers. The cookie banner starts hidden until Shopify’s real consent decision is known, preventing the returning-visitor flash without changing consent choices.

Real variant option IDs and Section Rendering are used instead of enumerating a capped variant array; a missing combination hides prices rather than showing a fabricated zero. Combined-listing siblings use a document replacement. All 608 active products were audited through paginated Admin reads: none has more than one variant. A live multi-variant switch was therefore not applicable to this catalogue; no dummy product was created. The implementation follows [Shopify’s high-variant product pattern](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products).

Schemas restrict product/search/collection-only components to appropriate templates. Existing rail/grid settings (title prefix, child-handle exclusions, background, rows/columns, card type, padding and links) remain connected; editor-only empty placeholders remain.

## Browser evidence

### site-history.json

- PASS: Home → Gifting → three rail taps → back arrow → Home
- PASS: Home → Gifting → three rail taps → browser back → Home
- PASS: Categories → Diapers → Baby Food → back → Categories
- PASS: Home → Diapers → product → back restores scroll → back → Home
- PASS: Direct listing back arrow goes Home
- PASS: Filter and sort replacements back to entry
- PASS: Different-department links replace listing entry

### site-layout.json

- PASS: 360 /
- PASS: 360 /collections
- PASS: 360 /collections/baby-products-diapers-and-wipes
- PASS: 360 /collections/all?view=ep-deals
- PASS: 360 /search?q=diapers
- PASS: 360 /search?q=zzqxynothing
- PASS: 360 /products/huggies-wonder-dry-pants-double-extra-large-xxl-size-diapers-22-count-b08s48pv23
- PASS: 360 /cart
- PASS: 360 /not-a-real-page
- PASS: 375 /
- PASS: 375 /collections
- PASS: 375 /collections/baby-products-diapers-and-wipes
- PASS: 375 /collections/all?view=ep-deals
- PASS: 375 /search?q=diapers
- PASS: 375 /search?q=zzqxynothing
- PASS: 375 /products/huggies-wonder-dry-pants-double-extra-large-xxl-size-diapers-22-count-b08s48pv23
- PASS: 375 /cart
- PASS: 375 /not-a-real-page
- PASS: 414 /
- PASS: 414 /collections
- PASS: 414 /collections/baby-products-diapers-and-wipes
- PASS: 414 /collections/all?view=ep-deals
- PASS: 414 /search?q=diapers
- PASS: 414 /search?q=zzqxynothing
- PASS: 414 /products/huggies-wonder-dry-pants-double-extra-large-xxl-size-diapers-22-count-b08s48pv23
- PASS: 414 /cart
- PASS: 414 /not-a-real-page
- PASS: 1280 /
- PASS: 1280 /collections
- PASS: 1280 /collections/baby-products-diapers-and-wipes
- PASS: 1280 /collections/all?view=ep-deals
- PASS: 1280 /search?q=diapers
- PASS: 1280 /search?q=zzqxynothing
- PASS: 1280 /products/huggies-wonder-dry-pants-double-extra-large-xxl-size-diapers-22-count-b08s48pv23
- PASS: 1280 /cart
- PASS: 1280 /not-a-real-page

### site-interactions.json

- PASS: Search native sheets, predictive field, stock and preserved query
- PASS: Search no-results has suggestion chips and in-stock cards
- PASS: Deals only real discounts; infinite scroll and sort retain view
- PASS: Product gallery, zoom, fee sheet, description and wishlist
- PASS: Sticky product ADD, cart pill/drawer/Free fee and removal
- PASS: Empty cart rail can add without leaving basket
- PASS: Homepage in-stock sections, genuine deals and unique panel images
- PASS: 404 Continue shopping contrast and six category blocks

### site-extra.json

- PASS: Final 404 panel 360
- PASS: Final 404 panel 375
- PASS: Final 404 panel 414
- PASS: Final 404 panel 1280
- PASS: Recently viewed shows another real product only with preference consent
- PASS: First six rendered search/deal cards have eager, responsive images
- PASS: Reduced motion disables gallery/sheet effects
- PASS: webkit back navigation and product/search smoke
- PASS: firefox back navigation and product/search smoke

### site-last-smoke.json

- PASS: Direct search link back returns Home through stock redirect
- PASS: Home search submission back returns Home
- PASS: Native best-selling availability request /cart
- PASS: Native best-selling availability request /search?q=zzqxynothing
- PASS: Sale price and MRP share one line 375
- PASS: Sale price and MRP share one line 1280

Tests used isolated browser carts and real add/change responses, then cleared test baskets. No checkout/order or newsletter submission was made. Headless Chromium covered the full suite; WebKit and Firefox additionally passed navigation/search smoke checks. Actual iPhone/Android hardware, private gift-card redemption and Shopify-hosted account pages were not exercised. CLS values are laboratory observations for these routes/data, not a universal guarantee.

The older Master/Polish Lighthouse ≥80 and strict homepage JS budget remain separately open as documented in WORKLOG.md; this pass does not claim those inherited performance gates are closed. The prior Lighthouse observation was 74 / LCP 3.49s; it was not re-measured in this Site pass. Existing policy/checkout-backend owner limitations remain in earlier ordering docs.

## Validation and warning disposition

The bundled Shopify skill validator was attempted for the full changed-file list, but its plugin dependency @shopify/theme-check-common is absent. Official CLI Theme Check and real Shopify storefront section rendering completed successfully. No connected Liquid validator is exposed; GraphQL readbacks were schema-checked by the connector.

All 15 warnings are inherited/retained code. Orphan snippets remain intentionally for reversibility; stock Dawn naming/complexity and optional-variable warnings are preserved rather than changing unrelated legacy paths. No warning suppression was added. Exact warnings:

- snippets/commerce-runtime.liquid — OrphanedSnippet: This snippet is not referenced by any other files
- snippets/commerce-source-card.liquid — OrphanedSnippet: This snippet is not referenced by any other files
- snippets/ep-directory-extra.liquid — OrphanedSnippet: This snippet is not referenced by any other files
- snippets/ep-tile.liquid — OrphanedSnippet: This snippet is not referenced by any other files
- snippets/quick-order-product-row.liquid — OrphanedSnippet: This snippet is not referenced by any other files
- sections/main-list-collections.liquid — VariableName: The variable 'moduloResult' uses wrong naming format
- sections/main-article.liquid — VariableName: The variable 'anchorId' uses wrong naming format
- sections/qc-product.liquid — UnusedAssign: The variable 'current_variant' is assigned but not used
- sections/main-search.liquid — UnusedAssign: The variable 'product_settings' is assigned but not used
- snippets/facets.liquid — LiquidComplexity: Liquid complexity is 136, which exceeds the maximum of 120. The decision at line 865 pushed it over the limit. Consider simplifying conditional logic, or moving self-contained decision logic into snippets with the render tag.
- sections/main-product.liquid — UnusedAssign: The variable 'seo_media' is assigned but not used
- sections/main-product.liquid — UndefinedObject: Unknown object 'continue' used.
- snippets/qc-logo.liquid — UndefinedObject: Unknown object 'wordmark' used.
- layout/password.liquid — UndefinedObject: Unknown object 'scheme_classes' used.
- layout/theme.liquid — UndefinedObject: Unknown object 'scheme_classes' used.

## Preview routes

- [Homepage](https://3djevx-mu.myshopify.com/?preview_theme_id=189582049393)
- [Categories](https://3djevx-mu.myshopify.com/collections?preview_theme_id=189582049393)
- [Listing](https://3djevx-mu.myshopify.com/collections/baby-products-diapers-and-wipes?preview_theme_id=189582049393)
- [Deals](https://3djevx-mu.myshopify.com/collections/all?view=ep-deals&preview_theme_id=189582049393)
- [Search](https://3djevx-mu.myshopify.com/search?q=diapers&preview_theme_id=189582049393)
- [No results](https://3djevx-mu.myshopify.com/search?q=zzqxynothing&preview_theme_id=189582049393)
- [Product](https://3djevx-mu.myshopify.com/products/pampers-ultimate-comfort-taped-diapers-size-3-6-10kg-lotion-infused-with-aloe-vera-and-vitamin-e-x1000-leak-locks-technology-for-leakage-protection-248-count-b0dkt9g5mz?preview_theme_id=189582049393)
- [Cart](https://3djevx-mu.myshopify.com/cart?preview_theme_id=189582049393)
- [404](https://3djevx-mu.myshopify.com/not-a-real-page?preview_theme_id=189582049393)

## Source and deployment

Only changed files relative to c97368c are uploaded by tools/ep-site-push.cjs, after reading WORKLOG and checking roles. Unchanged theme settings and header/footer group JSON are not pushed. Product/search/cart/404/Deals template JSON was read remotely before editing; merchant homepage settings were retained while adding image product choices. All new section/snippet files are kept alongside the original files.

Canonical new CSS: tools/ep-site.css. Canonical site behaviour: tools/ep-src/ep-site.js, with shared collection/header behaviour in tools/ep-src/ep-browse.js; builds use tools/ep-site-build.cjs and tools/ep-categories-build.cjs. assets/ep-history.js is the small early inline entry module; assets/ep-currency.js remains the shared money formatter. Individual numbered setup scripts are one-time implementation records, not a command sequence to rerun.

Full file list: [SITE_CHANGED_FILES.md](SITE_CHANGED_FILES.md). Merchant actions: [MERCHANT_TODO.md](../MERCHANT_TODO.md).
