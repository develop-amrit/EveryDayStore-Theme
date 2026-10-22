# EverydayyPlus homepage restructure

WORK_THEME_ID: 189582049393
Store: 3djevx-mu.myshopify.com
Live theme (never write): 189489545329
Working theme: everyday-homepage-review, unpublished.

## Setup — 22 October 2026

Owner's latest request explicitly authorises one new unpublished working theme, superseding the earlier two-theme restriction for this task. All subsequent deployments must read WORK_THEME_ID here, query current roles and reject any MAIN target. No publication or theme share.

Saved the complete local baseline in Git with the Codex agent identity (repository had no configured author). Pulled live into ignored _live_snapshot without overwriting source. Exact byte differences: docs/EP_BASELINE_DIFF.json. Shopify reformats JSON and adds generated comments; semantic comparison is recorded in AUDIT.md. Original files remain in baseline; _backup_original untouched.

Created the working theme using `shopify theme push --store 3djevx-mu.myshopify.com --unpublished --theme everyday-homepage-review --json --no-input`. ID returned: 189582049393. No live upload.

## Decisions

- Preserve the existing custom QC cart dialog, area selector, predictive search, wishlist and privacy integrations. Dawn cart-drawer is intentionally disabled in this theme. New controls must use bundled sections and reconcile the QC runtime, and publish Dawn cart events when available.
- Keep announcement, trust, FAQ, newsletter and wishlist; remove homepage compare and steps from composition only.
- No dedicated category-group menus or verified offers collection found yet. Leave empty configurations hidden and document owner setup.
- Existing typography is Avenir Next/Avenir/Arial from commerce.css, overriding configured Assistant. Preserve effective typography.
- No fabricated review stars, offer prices, delivery fees or campaign images.

## Validation

Implementation and browser verification are recorded below. Official Theme Check passes. Performance/LCP and interactive Admin editor gates remain open; this is a review draft, not a publication-ready sign-off.

## Phase 0 — Audit

Wrote AUDIT.md and captured MCP menu/collection/review findings. Semantic live/local differences: templates/index.json. Preserve local baseline per owner instruction.

## Phase 1 — Global chrome

Moved homepage announcement/header/footer values verbatim into section groups, replacing earlier group instances. Groups now render on every template once. Bottom navigation extraction follows with its configurable section.

## Phase 2 — Tokens

Added ep-mobile.css after existing CSS. Brand variables, shared spacing/type/image wells, responsive rails/grids and reduced-motion controls; effective fonts preserved.

## Phase 3 — Shared cards and cart

Added ep-section-header, ep-see-all-button, ep-price, ep-add-button, ep-card and ep-mobile.js. Real variant prices/discounts, conditional rating/spec metadata, 28px wishlist face with 44px target, no homepage compare. Multi-variant products link to options because no Dawn quick-add modal is active. Shared QC cart adapter keeps one mutation lock and bundled qc-cart rendering; exposes change and publishes Dawn events. New cards listen to both runtimes. Header rotation and carousel use vanilla custom elements with cleanup on editor reload.

## Phase 4 — Everyday mobile header

Added sections/qc-header.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday bottom navigation

Added sections/ep-bottom-nav.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday promo banner

Added sections/ep-promo-banner.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday product rail

Added sections/ep-product-rail.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday product grid

Added sections/ep-product-grid.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday themed grid

Added sections/ep-themed-grid.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday campaign

Added sections/ep-campaign.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday banner carousel

Added sections/ep-banner-carousel.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday category grids

Added sections/ep-category-grid.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday store grid

Added sections/ep-store-grid.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday brand tiles

Added sections/ep-brand-tiles.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 4 — Everyday search links

Added sections/ep-search-links.liquid with editable schema/preset, shared spacing/colour scheme, responsive layout and hidden storefront empty state.

## Phase 5 — Homepage composition

Composed 20 homepage sections; transferred original hero copy and real rail collections. Steps file retained but unused. Seasonal/store tiles hide without merchant images; campaign and brand rows disabled. Offers collection left unassigned (hidden) rather than claiming fabricated deals. Category groups without dedicated menus remain hidden. Sample baby menu reused. Gift/office promotional copy migrated to carousel with actual collection image fallback. Footer Shop uses catalogue; Help uses existing main-menu as a temporary honest fallback.

## Validation corrections

Theme Check initially scanned backup/snapshot/helper copies. Added .theme-check.yml excluding non-theme directories only. Shared JSON/name checker now accepts Shopify translated schema names. Product grid shows configured mobile rows while retaining six-column desktop capacity. Placeholder translation uses a safe interpolation token.

## Locale validation

Theme Check found 9,938 missing translations, mostly pre-existing QC keys in bundled non-English locales. Filled only missing keys with the English default fallback, preserving existing translations. These are explicit English fallbacks, not claimed translations. Added 79 missing branches/keys. Replaced FAQ literal block-ID check with an editable Show current delivery fee tiers checkbox, preserving the current fee display.

## Browser polish corrections

First preview has no page overflow at 360/375/390/414/430/768/1280; sticky search stays 4–6px from top on mobile/tablet and unsticks on desktop. Fixed intrinsic portrait supplier image sizing by absolutely positioning the image link within a square well. Fixed search placeholder selector accidentally matching the hidden type input. Removed the unused Dawn drawer script that raised CartItems undefined on off-home templates. Added combobox semantics and a count-aware header cart name. Cookie banner now paints immediately while Shopify Privacy API resolves consent, preventing a late 7-second LCP paint; API remains the only consent authority. Stepper expands to fit two 44px targets.

## Performance optimisation

First mobile Lighthouse: 54 performance, LCP 7.03s; after image/accessibility fixes: 69 performance, LCP 4.35s, CLS 0, accessibility 100. Remaining large costs include Shopify perf-kit, web pixels and preview redirects. Consolidated existing three custom CSS files plus new design CSS into ep-mobile.css to reduce blocking requests while preserving cascade; original CSS files remain. Editable design source is tools/ep-mobile-source.css. Moved required content_for_header after CSS discovery (still in head, unmodified), and stopped loading unused Dawn cart-drawer styles because the actual drawer is QC. Lowered campaign collection-image resolutions. Search quotes now use typographic quotes to avoid visible HTML entities.

## Final integration refinements

Cart subscriptions now reconcile external Dawn cart events through one shared QC refresh. Bottom padding follows the measured nav height, including optional editor padding and safe area. The unconfigured Deals navigation block is available in the editor but hidden until a real link is selected. Seasonal padding and background controls now affect the whole panel.

## Phase 6 — QA and review handoff

Working theme: 189582049393 remains UNPUBLISHED; codex-edits 189489545329 remains MAIN. No publication or role switch. All 28 changed code assets/Liquid files match API read-back byte for byte. JSON read-back details: qa/readback-verification.json. Initial live layout/header hashes match the untouched snapshot; live index comparison is recorded separately because Shopify normalises generated JSON. No live writes were issued.

Official Shopify Theme Check: 0 errors, 13 warnings. Structural/JSON/schema/reference/JS checks, predictive-search fallback and simulated QC cart regression tests pass. The skill's separate Liquid validator could not load @shopify/theme-check-common; official CLI Theme Check provided validation instead.

Browser QA: 360, 375, 390, 414, 430, 768 and 1280px have no horizontal page overflow or detected main-content overflow. Search pins at 4–6px on mobile/tablet, desktop is unstuck. Shared header/footer appear exactly once on product, collection, search, cart, contact and 404 pages. Account redirects to Shopify-hosted customer authentication, which intentionally has no theme chrome. No authentication or checkout was completed. One homepage H1; no Liquid errors or browser JS exceptions.

Cart: real single-variant Add 1 → increase 2 → decrease 1 → remove; duplicate-card copies both show 1, header/bottom counts both show 2, drawer opens, checkout button exists while an item is present, no default auto-open, starting cart restored empty. Isolated 422 route response verifies visible inventory-error handling with no real inventory mutation. All 106 storefront products currently have one variant, so a real multi-variant browser fixture was unavailable; the safe product-options link branch is implemented and statically checked. Sold-out markup is conditional/disabled but no sold-out homepage fixture was available. No fake product records created.

Wishlist toggle/restoration, category drawer/Escape, cookie rejection via Shopify Privacy API, location save/restore, predictive search (6 links for pampers), rotation/focus pause, carousel autoplay/dots/focus pause, and reduced-motion rotation/carousel stopping pass. Newsletter structure retained; no signup submitted. Screenshots: qa/before-375.png (original baseline), qa/before-375-clean.png (original live theme, consent dismissed), qa/after-375.png, qa/after-375-top.png and qa/after-1280.png. Preview-toolbar overlay is hidden only in QA screenshots, not storefront code.

Final isolated mobile Lighthouse (preview URL with pb=0): Performance 67, Accessibility 100, Best practices 75, SEO 92; LCP 5.96s, CLS 0, TBT 316.5ms. New JS 8365 bytes unminified, below the 15KB minified budget. Raw reports retained in qa/. Performance >=80 and LCP <2.5s are NOT met. Shopify perf-kit/web-pixel/checkout scripts and preview redirects appear among the measured costs; platform scripts were preserved. Do not call the draft publication-ready.

Interactive Admin theme-editor QA could not run: the connected browser runtime exited unexpectedly on both inventory attempts. Schema/presets were accepted by Shopify upload, but adding/reordering blocks and exercising every setting in Admin remain owner review checks. No skill approval rule caused this limitation; it is a tool-runtime failure.

### Warning justification

- snippets\commerce-runtime.liquid — OrphanedSnippet: This snippet is not referenced by any other files Existing optional Dawn/commerce integration retained; no section/snippet deletion requested.
- snippets\commerce-source-card.liquid — OrphanedSnippet: This snippet is not referenced by any other files Existing optional Dawn/commerce integration retained; no section/snippet deletion requested.
- snippets\quick-order-product-row.liquid — OrphanedSnippet: This snippet is not referenced by any other files Existing optional Dawn/commerce integration retained; no section/snippet deletion requested.
- sections\main-list-collections.liquid — VariableName: The variable 'moduloResult' uses wrong naming format Existing Dawn variable naming only; changing unrelated modules would add regression risk.
- sections\main-article.liquid — VariableName: The variable 'anchorId' uses wrong naming format Existing Dawn variable naming only; changing unrelated modules would add regression risk.
- sections\qc-product.liquid — UnusedAssign: The variable 'current_variant' is assigned but not used Existing inactive/optional Dawn or QC assignments; no runtime effect.
- sections\main-search.liquid — UnusedAssign: The variable 'product_settings' is assigned but not used Existing inactive/optional Dawn or QC assignments; no runtime effect.
- snippets\facets.liquid — LiquidComplexity: Liquid complexity is 136, which exceeds the maximum of 120. The decision at line 865 pushed it over the limit. Consider simplifying conditional logic, or moving self-contained decision logic into snippets with the render tag. Existing Dawn facets module; collection filtering preserved.
- sections\main-product.liquid — UnusedAssign: The variable 'seo_media' is assigned but not used Existing inactive/optional Dawn or QC assignments; no runtime effect.
- sections\main-product.liquid — UndefinedObject: Unknown object 'continue' used. Existing Liquid defaults/render parameters (wordmark, scheme_classes) or inactive Dawn product code; unchanged by this restructure.
- snippets\qc-logo.liquid — UndefinedObject: Unknown object 'wordmark' used. Existing Liquid defaults/render parameters (wordmark, scheme_classes) or inactive Dawn product code; unchanged by this restructure.
- layout\password.liquid — UndefinedObject: Unknown object 'scheme_classes' used. Existing Liquid defaults/render parameters (wordmark, scheme_classes) or inactive Dawn product code; unchanged by this restructure.
- layout\theme.liquid — UndefinedObject: Unknown object 'scheme_classes' used. Existing Liquid defaults/render parameters (wordmark, scheme_classes) or inactive Dawn product code; unchanged by this restructure.

### Remaining owner work

See MERCHANT_TODO.md for images, seasonal/store tile artwork, dedicated department menus, Help menu, verified deals collection/link and optional review data. Empty configurations hide; campaign/brand rows are disabled. Publication remains manual after review and outstanding QA/performance gates.


## Final spacing correction

Homepage uses a single 28px flex gap between visible section wrappers; empty wrappers are removed from layout. This replaces doubled child margins. Delivery selector remains a 44px target. Safe Shopify initialisation guard handles scripts before platform global creation. CSS source and generated bundle both retained.

## Final handoff verification

CLI local preview ran with the guarded existing work-theme ID on port 9293, returned HTTP 200 with the new header/cards, and was stopped. No watcher remains intentionally active. Added homepage-review CLI environment alias. Complete catalogue audit: 106 active/public products and 133 collections; no standard reviews data, no dedicated collection image uploads, no multi-variant storefront fixture.

Dawn hides empty divs by default; the header sentinel explicitly overrides that rule. Browser assertions: shadow off at scroll 0 and 80, on at scroll 220; pinned search remains 6px from top. Final 28 code-file hashes all match remote. Working theme remains UNPUBLISHED; live remains MAIN. Final official Theme Check: 0 errors, 13 previously justified warnings. Lighthouse report is the isolated measurement before the final sentinel-only CSS offset/display fix; performance/LCP gates remain unmet.

Build CSS with `node tools/ep-bundle.cjs` after editing tools/ep-mobile-source.css or preserved legacy CSS. Deploy with `node tools/ep-push.cjs`; it runs regression checks, rereads WORK_THEME_ID and verifies the current role. `node tools/ep-push.cjs dev` uses that same guarded theme for local preview. Never use a live target or publish.

Draft is ready for owner design review in Admin → Online Store → Themes → everyday-homepage-review. Release gates remain explicitly open in docs/EP_HOMEPAGE_STATE.json.

## Phase 1 — Global chrome

Moved homepage announcement/header/footer values verbatim into section groups, replacing earlier group instances. Groups now render on every template once. Bottom navigation extraction follows with its configurable section.

## Homepage correction 1

Keep one desktop category tab row and place delivery on a separate line. Hide the old pills when new tab blocks render; header actions retain their own logo row.

## Homepage correction 3

Render all seven department groups from the existing catalogue menu tree. A merchant-editable department collection selects that parent’s child links; collection featured_image and explicit overrides supply imagery. Image-less tiles hide on storefront instead of showing a generic bag icon.

## Homepage correction 5

Reserve a compare-at line on every price block so product names align. Use a light brand-tint sale pill and money_without_trailing_zeros for current and compare-at prices.

## Build helper correction

Importing the shared build helper with a numeric correction argument accidentally ran its old phase-1 CLI branch locally. Restored header/footer group JSON from the just-verified remote snapshot and guarded CLI phases with require.main === module. No deployment occurred during this local-only error.

## Homepage correction 4

Render footer social icons only for configured URLs. Add LinkedIn and WhatsApp icon support; remove the unrelated main-menu from Help and document the exact missing Help menu links in MERCHANT_TODO.md.

## Homepage correction 6

Give department tabs distinct basket, bottle, gift, soap, home, paw and pencil outline icons. Preserve icon-image overrides and editor-selectable choices.

## Homepage correction 7

Replace FAQ text chevrons with the existing theme caret SVG and rotate it on open.

## Homepage correction 8

Put search-link dividers before items using CSS inline borders, with each row’s leading border clipped. Wrapped lines never end with a trailing separator.

## Homepage correction 2

Re-audited all 133 collections: no sale/offers collection exists. Owner explicitly selected the theme-only discounted view of the real All products collection. Deals nav and rail both link to /collections/all?view=ep-deals; rail collection is all with discounted_only enabled. The new collection view paginates real products and shows only available selected variants whose compare-at price exceeds price. No collection/product/store data was created or modified.

## Correction integration review

Kept Deals view through pagination, removed an unused rail assignment, hid unmatched department selections, and moved new social URL settings alongside existing Social media settings. Rewrote MERCHANT_TODO.md to remove resolved menu/Deals tasks and list only current image, Help-menu, social and release requirements.

## Homepage corrections — final QA and read-back

All eight requested code corrections are committed separately and deployed only to WORK_THEME_ID 189582049393. Final remote read-back confirms UNPUBLISHED and matches 14 code files by MD5 plus 7 JSON files semantically. The final WhatsApp icon class preserves the existing outline icon style. No theme was created or published.

Official Shopify CLI Theme Check: 0 errors, 13 previously justified warnings. Structural/UX/cart checks pass. Full browser rerun: widths 360,375,390,414,430,768,1280 have no horizontal page overflow; desktop 990/1280 has one category row and no delivery/icon overlap; seven department groups render 26 real collection-image tiles; card name/price baselines align. Deals rail shows 10 real discounted products and the owner-approved discounted All-products view shows 25 on its first page with view-preserving pagination. Single-variant cart add/increase/decrease/remove, duplicate card quantities, header/nav counts, drawer/checkout, predictive search, location, wishlist, privacy, FAQ and reduced motion pass. Product/collection/search/cart/contact/404 have one global header/footer; account redirects to hosted Shopify authentication. No public multi-variant/sold-out fixture was available, so these branches remain statically checked only.

Isolated Lighthouse: Performance 60, Accessibility 100, Best Practices 75, SEO 92; LCP 3.96s, CLS 0. Performance >=80 and LCP <2.5s remain unmet. New ep-mobile.js is 8365 bytes before minification. Interactive theme-editor Add/reorder/settings QA remains unverified because the computer-use runtime failed to initialize. The skill bundled full-theme validator failed due to missing @shopify/theme-check-common; official CLI Theme Check is the successful fallback.

MERCHANT_TODO.md lists Help menu creation/assignment, social URLs, seasonal/campaign/brand/promo-bubble/Shop-by-Store imagery and optional collection-image overrides. Help menu does not yet exist; all social URLs are blank and icons correctly hide. No fake sale collection or commerce data was created. Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189582049393 . Ready for owner design review in Admin → Online Store → Themes → everyday-homepage-review, with the QA gates above explicitly open.

## Final Fix 1: Use active currency codes on homepage prices

Audited homepage ep/qc prices and JS: no hardcoded AED label introduced. Added ep-money using money_without_currency and localization currency, stripping decimals on the number only. Admin formats are currently Dhs. {{amount}} / Dhs. {{amount}} AED, so with-currency alone cannot fix this. Theme setting currency_code_enabled is off. Existing non-home ep prices retain their output. Client prices come from server Liquid; basket formatter will use the shared theme money helper in Fix 5. Currency formatting is the first merchant task.
