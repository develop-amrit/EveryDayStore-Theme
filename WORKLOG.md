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

## Final Fix 2: Order Baby Products, Gifting and Grocery first

Reordered header tabs, moved the existing Gifts section as a compact product rail immediately after Baby care, then Grocery. Every other section retains its relative order; no duplicate Gifts grid remains. Category groups have the same department order.

## Final Fix 3: Replace delivery dropdown with searchable area sheet

Native modal dialog, keyboard focus wrap, backdrop/Esc, body lock, 16px search, radio-style rows, no-match contact link only when WhatsApp exists, saved toast. Areas are editable in header textarea. Cart attribute wins on load, then try/catch localStorage qc-dubai-area; saves POST cart/update.js delivery_zone and invalidates existing booking exactly like the prior integration. Header/shared area picker is the intentional cross-page change.

## Final Fix 4: Rotate concise single-line announcements

Four editable messages, optional links, real configured threshold formatted through ep-money, fixed 32px bar and 44px dismiss hit area. Four-second rotation pauses on hover/focus/touch, hidden tabs and reduced motion; session dismissal preserved. Old fee-tier message no longer appears in the announcement.

## Final Fix 5: Polish full-bar search focus and priced predictive results

Homepage now uses the existing Dawn predictive-search custom element and stock endpoint/component, with real Liquid-formatted prices, compare-at amounts, muted 40px images and skeleton rows. Other pages retain their QC search. Added clear/submit 44px controls; full bar focus-within ring. Placeholder text changes atomically without opacity-zero frames. Client basket total uses the theme money-format helper with the active-currency format generated by Liquid; no hardcoded currency label.

## Final Fix 6: Use real policy links and configurable Help footer

Homepage policy row comes only from nonempty shop.policies. Added footer Help menu setting, no column until selected. Captured social markup suppresses empty container entirely. Back to top is a button with reduced-motion-aware scroll and focus on the logo. Other page policy output is preserved. Merchant policy/menu/social tasks documented.

## Final Fix 7: Keep the full catalogue visible in category grids

Removed image and maximum-tile filtering. Every group child and leaf link now renders regardless of product count; parent department remains linked by its heading. Neutral SVG placeholder for missing images, collection image wins when present, checkbox controls empty-collection Coming soon labels. Existing override block now works by URL without requiring a heading. Added shop-by-category anchor. Header/drawer Admin links unchanged.

## Final Fix 8: Link Categories to the homepage category grid

Categories uses a section destination setting default /#shop-by-category. On home, preserves keyboard focus on the grid heading and scrolls with reduced-motion handling. On other pages the normal link leads to the homepage anchor. Home, Deals and Cart are unchanged.

## Final Fix 9: Populate homepage campaigns with real catalogue data

Enabled five carousel slides, festive six-tile grid, Baby Basket campaign, eight store tiles, one stocked-brand row and Deals bubble using uploaded-first auto images from actual products. Empty collections remain linked with placeholders/Coming soon and no price tag. Campaign From amounts are computed from real product.price_min values; Liquid collections do not expose collection.price_min, so use the minimum of their actual products (all configured campaign collections have fewer than 50 products). Hero and copy updated. Existing carousel images, if configured, preserved on slides 2/5; prior code had product fallbacks rather than uploaded photos. Exact requested handles found in catalogue audit; no fallback handle invented.

Brand audit: all 106 active public products read. Aptamil, Johnson's Baby, Lindt, Brooke Bond, Air Wick, Whiskas and Pilot confirmed; each tile additionally checks shop.vendors at render. Ferrero Rocher is absent (vendor is Ferrero), so skipped as instructed. Caption/vendor product selected from actual catalogue, Ad off. Added collection and image pickers throughout auto-image placements. National Day copy is a disabled section included in order. Merchant image briefs and menu/policy/social tasks rewritten.

Composition reconciles two instructions: first three rails remain Baby/Gifts/Grocery; later image-heavy modules are separated with existing product grids/rails. Existing seasonal/campaign wrappers stay white; tints are confined to cards, avoiding consecutive full-bleed panels.

## Final Fix 10: Homepage stylesheet and composition cleanup

Homepage loads base.css and the existing consolidated ep-mobile.css once via explicit stylesheet links. Removed unused stock cart-items/predictive styles and unused font preloads from homepage only; non-home layout paths retain prior assets. commerce/qc-home/qc-storefront styles including the active custom QC cart drawer are bundled into ep-mobile.css and ready before opening. Disabled Dawn drawer assets remain unloaded. No old section files deleted. All 20 index sections are in order, including the disabled National Day section; no orphan Gifts/steps/brand-row section. Corrected whole-money decimal trimming to remove only a terminal decimal suffix, preserving thousands separators. Theme Check and browser results will be recorded under Fix 11.

## Final Fix 11: Homepage QA and handoff

Final deployment remains only theme 189582049393, verified UNPUBLISHED before every push and by final API read-back. No creation, publication or writes to either codex-edits theme. 80 changed files match remote byte-for-byte and settings_data.json matches semantically (81 total). Only templates/index.json changed among page templates; existing collection/product/cart/other templates are untouched. Every numbered implementation fix 1–10 has its own Fix N commit, with integration findings and this QA committed as Fix 11.

### Homepage checklist results

| Component | Result |
|---|---|
| Currency | PASS: rails/grids/Deals/predictive rows and real campaign tags use AED; no Dhs, duplicate currency code or .00 whole amounts. From values AED 60 / AED 117 / AED 43.17 independently match actual collection variant minima. Currency codes setting off; four store-format Admin fields remain the first merchant task. |
| Announcement | PASS: 32px, one line at 360px, four-second rotation, touch pause, session dismissal. No animation/rotation under reduced motion in implementation. |
| Area picker | PASS: modal sheet, 16px filter, one Marina match, no-match copy, body lock, keyboard, Esc and backdrop close. Saves qc-dubai-area + cart delivery_zone and updates trigger. Separate reload test confirms cart Downtown beats stale local Dubai Marina. Test area restored. |
| Search | PASS: full-bar brand focus ring, no inner outline, three skeleton rows, four priced Pampers suggestions, no blank opacity animation in rotating placeholder. Uses Dawn predictive-search component. |
| Tabs/rails | PASS: All/Baby/Gifting/Grocery first, All active; hero/Baby/Gifts/Grocery first in index; native rails scroll. |
| Cart/wishlist | PASS: add → quantity 1 → minus removes, header/nav badges 1/1, drawer works, test cart restored. Heart toggles at 44×44px with zero discount overlap. |
| Carousel | PASS: five slides, scroll/swipe and dots, autoplay, touch pause, reduced-motion stop. |
| Content | PASS: 6 seasonal tiles, 3 Baby Basket offers, 8 store tiles, 7 verified vendor tiles with Ad off and auto images, Deals bubble with accessible name. Empty collection keeps placeholder/Coming soon; no invented price. National Day instance disabled. |
| Categories | PASS: all 123 catalogue destinations present. 115 child/leaf tiles plus department heading links; original All Products link retained in homepage menu/drawer. Actual empty tile labels total 67 in the rendered child/leaf grid. |
| FAQ | PASS: Enter opens/closes, actual caret rotates 180°. |
| Footer | PASS: existing Privacy policy URL returns 200; absent policies hidden; Help absent until menu selected; social container absent with no URLs. Back-to-top button focuses logo and reaches scroll 0 (within 1px). |
| Bottom nav | PASS: Categories scrolls to grid and focuses heading; Deals route preserved, Cart opens drawer. 64px nav, 64px body padding at 375px; safe-area handling retained. |
| Responsive/rhythm | PASS: 360,375,414,768,1280 have no page overflow and no delivery/icon overlap. One category tab strip; image modules interleaved with rails/grids and outer panels mostly white. Hero uses 18px at <=390px to keep merchant’s exact copy within three lines, 19px above that mobile width and 28px tablet/desktop. No heading text clipped. |
| Console/styles | PASS: zero page errors and no unused stylesheet preload warnings. Only base.css and consolidated ep-mobile.css stylesheet links; no homepage preload links. Custom drawer CSS is in the already-loaded bundle. |
| Theme Check | PASS: 0 errors, 13 retained pre-existing warnings. |

Warnings retained: three unreferenced Dawn/legacy snippets kept per file-preservation rule; old variable naming/unused assigns in non-home article/list/search/product files; existing facets complexity; existing qc-logo parameter inference and scheme_classes warnings. No new homepage warnings. Locale keys and editor labels propagated with English fallback to existing locale files; merchant translation review remains optional. New ep-mobile.js + ep-final.js total 14734 bytes before minification, below 15KB.

During QA integration, fixed Shopify’s unsupported /# URL schema default (the real section setting holds the anchor), missing locale fallbacks, currency/number whitespace and header initializer timing. Two test failures were automation issues: an outside click hit the linked hero and navigated away, and an Add-button selector changed after stepper morph; corrected the test to use a non-link blur and stable variant selector. Smooth scroll/cart assertions now wait for the actual resulting state.

The bundled Shopify skill validator still cannot load @shopify/theme-check-common; official CLI Theme Check is the successful fallback. Interactive theme-editor add/reorder/all-settings QA is not rerun because the computer-use runtime was unavailable in the earlier session; no claim of a fresh editor pass. Lighthouse was not part of this final homepage-only checklist; earlier 60 performance / 3.96s LCP release gates remain open, not re-certified by these fixes.

Screenshots: qa/final-home-375.png, qa/final-home-1280.png, qa/final-area-375.png, qa/final-search-375.png, qa/final-seasonal-375.png and qa/final-carousel-375.png. MERCHANT_TODO.md contains currency formatting first, menu order/Help/policies/social, Pantry Staples image, seasonal switch and sized image briefs. No required campaign artwork blocks the configured auto-image page. Ready for owner review in Admin → Online Store → Themes → everyday-homepage-review. Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189582049393 . Do not publish automatically.

## Polish 1: Finish and collapse category groups

Second-level tiles only, populated collections first preserving menu order within both groups; child/leaf menu links untouched and still available through full catalogue navigation. Explicit collection image → first product with an image → designed tint/parent icon/Soon pill. No Shopify placeholder SVG in category tiles. First 8 visible below desktop/16 at desktop with accessible expand/collapse; no-JS shows all second-level tiles.

## Polish 2: Refine festive tile proportions

Seasonal tiles retain all six links, use the designed empty state via shared auto image fallback, larger square image areas and compact two-line titles. Six desktop columns capped at about 220px. Strip arrow has a 44px hit area and shared press feedback.

## Polish 3: Use Baby Products for hero auto artwork

Selected the owner-offered static Baby Products option instead of a rotating image. Merchant-uploaded art still wins, no invented imagery and no autoplay needed.

## Polish 4: Promote Festive in the raised nav bubble

Bubble uses Chocolates & Treats, Festive label and #festive anchor; Deals remains once as a tab. Positioned above the inline-end edge with reserved bar space; label hidden below 380px but accessible name retained. IntersectionObserver switches Home/Categories active state when category grid enters/leaves the viewport.

## Polish 5: Keep Baby Basket images and prices compact

Auto images use the real first product-with-image fallback (shared implementation in Polish 6/9); designed parent-icon empty state replaces outlines. Price labels stay on a single 12px line; offer titles reduce first. Image wells join the shared loading skeleton.

## Polish 6: Add shared image skeleton and fade-in

Shared tiny image initializer checks complete, handles load/error, and watches AJAX-inserted images. Loading wells shimmer then loaded images fade in 200ms; aspect ratios remain fixed. No-JS images have no hiding classes and display immediately. Empty auto images render the designed Soon state, never an outline placeholder. Shimmer duration follows the explicit 1.2s requirement; movement/fades are disabled for reduced motion.

## Polish 7: Polish press, cart and reveal feedback

Added card/tile press states, stepper expansion and directional quantity changes, single count pops, saved-heart pop, sticky shadow fade, once-only section reveals excluding first two sections. Back-to-top now moves focus after smooth scroll reaches the top. Motion styles use ep-ease and requested durations (explicit press exception 120ms); all animations/transitions disabled under reduced motion.

## Polish 8: Open area sheet without the phone keyboard

Title receives initial focus; input focuses on tap. Selection tick displays for 250ms after successful save before closing. Search-filter height transitions for 200ms, rounded brand focus ring, and reverse slide/fade on close, with Esc/backdrop and focus trap preserved. Reduced motion skips timed movement. Storage/cart-attribute save flow unchanged.

## Polish 9: Add merchant-controlled homepage product exclusions

Every rail/grid/auto-image section gets Exclude products tagged (default homepage-hide). Homepage product loops scan up to 50 real candidates to fill requested count after exclusions; collections/search remain unchanged. Uploaded images remain explicit merchant overrides. No product tags or catalogue data were mutated. Merchant tagging task recorded.

## Polish 10: Prioritize missing checkout policies

Moved exact policy creation instruction to the top of MERCHANT_TODO.md; no empty or invented policy links added.

## Polish 11: Replace header tabs with the category panel

Removed horizontal tab markup, authored CSS and header tab blocks on every page. Search-only pinning retains ResizeObserver measurement of the upper rows. Homepage uses one continuous butter-cream surface behind header/search and the new first section, rounded at its bottom; pinned header changes to white. New merchant-editable ep-category-panel has full-width Baby Products tile with three real product images, then six category blocks with two-image clusters, uploaded overrides and exclusion tags. Desktop places Baby at the left third and a 3×2 grid at right. Hero follows unchanged except the owner-requested Baby image source. Shared section headings gain dashed rules.

The shortened category grid adds Browse full catalogue, opening the existing complete menu drawer so all 123 configured destinations remain directly reachable from home without third-level tiles. No menu entries or collection links removed. Merchant menu cleanup is documented, not performed.

## Polish 12 — integration and performance work in progress

Full browser QA passes at 360/375/414/768/1280: category section 2,119px on mobile, second-level tiles only, accessible expansion and all 123 catalogue destinations still present in Browse full catalogue. No header tabs anywhere in markup. New panel has three baby images and six two-product clusters, matching the requested desktop split. Area title focus, saved tick, rounded focus/height/close motion, cart/heart/badge feedback and reduced motion pass.

During integration, repaired a malformed selector from removing tab CSS, a stray snippet brace that occupied grid cells, Liquid boolean grouping that skipped empty tiles, and an asynchronous-method rename in the minifier. Added CSS syntax validation before deployments. Compiled assets come from tools/ep-src; do not hand-edit the generated ep-mobile/ep-final/ep-polish JS. Builds use esbuild/Terser without adding a browser framework.

Performance work includes minified consolidated CSS/JS, viewport-limited shimmer, near-viewport image source activation with no-JS fallbacks, a valid brand favicon, inline critical CSS (all chunks <15KB), nonblocking full stylesheets and homepage-only bundles of the existing core/commerce scripts preserving order. Other templates retain original script tags. Initial exact-preview Lighthouse was 56; later runs remain variable and below the 80 gate, including a measured 14.7s platform/preview first-byte outlier. Final repeated measurements follow after the deployment settles.

## Polish 12: Final QA and unpublished delivery

All twelve numbered polish commits complete. Only target 189582049393 was pushed, after WORKLOG ID and current unpublished role verification. API read-back confirms all 87 changed/new theme files byte-identical to local code; target remains UNPUBLISHED. No product/collection/cart/other page template changed. Shared header tab removal and area polish are the explicitly authorized cross-page changes. No catalogue data, publication status or menus were mutated.

### Final browser QA

PASS at 360 / 375 / 414 / 768 / 1280px: no horizontal page overflow or page errors; category grid is 2,119px collapsed on mobile, 2,009px tablet, 1,621px desktop. Populated second-level tiles appear first; no outline placeholders. Expand/collapse 210→320→210px, aria-expanded and inert states pass. All 123 configured catalogue destinations remain reachable through Browse full catalogue; third-level links stay in the original drawer/menu. No menu links removed. Legacy/test collections outside that configured navigation were not added to the homepage.

Panel: three Baby Products images, six category blocks with two images each, desktop left-third baby layout, continuous cream surface, white pinned search and no tab markup. Seasonal: all six tiles retained, six desktop columns, no outline placeholders. Bubble: Festive only, label hidden below 380px, Deals once; category/home active observer passes. Hero uses Baby Products.

Cart: add→1→2→1→remove, quantity direction, count pop and synchronized header/nav counts pass; cart restored. Heart toggles and saved pop pass, restored. Area title initial focus, 16px search, filtering, visible selection tick before close, cart attribute/localStorage save and restoration pass. Search remains Dawn predictive search. Sticky search top is 6px, with white background and 150ms shadow transition. Reduced motion reports zero animations/transitions on tested components and no hidden reveal content. Back-to-top reaches scroll 0 and focuses logo. First two sections never reveal-animate.

Product exclusion has zero violations, but the catalogue currently contains zero public products tagged homepage-hide. Merchant must tag intimate products or reorder the relevant collection; code does not infer or change product tags. Baby Basket has two real images and one designed fallback: the Diapers & Wipes collection has 34 published products without images and three draft products with images. Draft imagery is not exposed. All three computed real From prices remain on one line. Missing policies/Help/socials remain correctly hidden until configured.

### Validation and performance

Official Shopify Theme Check: **0 errors, 14 warnings**. Existing warnings remain for retained orphaned legacy snippets, non-home naming/unused variables/facets complexity, and existing qc-logo/scheme_classes inference. One new warning is ep-tile.liquid becoming unused after the custom category tile replacement; file deliberately retained under the owner's no-deletion rule. Bundled skill full-theme validator was attempted on the complete changed-file set but cannot load @shopify/theme-check-common; official CLI and local structural/schema/reference/JS/cart checks are the successful fallback. Fresh interactive Add section/reorder/all-setting editor QA has not been performed; owner editor review remains a limitation.

Final mobile Lighthouse runs: **80 / 81 / 85 performance, median 81**; accessibility 100, best practices 79, SEO 92. LCP 2.04s / 2.13s / 1.86s, CLS 0.0029 / 0.0211 / 0.0211. Method: fresh Chromium each run, verify selected theme ID, retain only the essential selected-preview cookie, clear HTTP cache and local/session storage, time storefront navigation with pb=0 toolbar suppression. This isolates storefront performance from preview-entry overhead. Earlier exact-preview and earlier-build scores were variable and lower (including a 14.7s first-byte outlier); do not interpret this as a permanent production guarantee. Reports: qa/polish-selected-lighthouse-1.json through -3.json and qa/polish-selected-summary.json.

Performance work: consolidated/minified existing homepage runtime in order, viewport-limited shimmer, near-viewport source activation with noscript fallback, critical CSS in chunks below Shopify's 15KB inline limit, nonblocking full styles and critical modal/drawer styles available before opening. Readable new scripts live in tools/ep-src and build into three assets using tools/ep-polish-build.cjs; tools/ep-polish-runtime.cjs rebuilds the existing-runtime bundles. CSS source is tools/ep-mobile-source.css. No browser framework added. **Remaining inherited budget limitation:** three new custom JS assets total 15595 bytes minified, 595 bytes above the strict decimal 15KB budget. Existing Dawn/QC runtime bundles are separately measured and are not claimed to fit that new-code budget.

Screenshots: qa/polish-top-375.png, qa/polish-after-375.png, qa/polish-after-1280.png. Updated MERCHANT_TODO.md prioritizes policies, then currency/menu/social tasks, tagging, missing published-product images and optional sized artwork. The image-backed page works without campaign uploads; merchant-supplied art can improve the product cut-outs. Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189582049393 . Ready for owner visual review in Admin → Online Store → Themes → everyday-homepage-review. Never published.


Supplementary final browser checks: Escape and backdrop both retain the 200ms closing state before closing; Tab from title reaches close control. Native Dawn search clear resets the query, predictive results show AED and compare-at prices, announcement dismissal persists through reload. Product and collection pages each have exactly one header/footer and zero tabs. JavaScript-disabled homepage exposes all 52 second-level tiles, 131 image sources and the native area select fallback. Supplementary errors: zero. See qa/polish-supplement.json.

## Dirham 1: Shared font and Liquid money rendering

Added exact owner-supplied U+20C3 WOFF and SVG, visible ep-money, numeric ep-money-number, and plain ep-money-text helpers. Migrated QC and retained Dawn visible money outputs, price captures, cart discounts/totals, delivery tiers/progress, unit prices and gift card balance. Numeric price-range form values remain numeric; JSON and data attributes stay plain ISO text. Gift card document loads the small standalone currency stylesheet. No legacy customer templates exist in this theme; hosted account behavior will be checked during QA.

## Dirham 2: JavaScript and attribute safety

Added early shared epMoney/epMoneyText helpers using the Shopify numeric format sample; QC basket totals and compare prices use HTML, plain metadata uses ISO text. Dawn quantity pricing now consumes the server-rendered visible span while its data-text stays plain. Restored numeric range-input values and bounds (ISO prefixes would break filtering). Added EP Dirham first in theme font variables. Checkout currency business validation remains the ISO AED comparison, as required.

## Dirham 3: Merchant copy and storefront coverage

Visible escaped EP/QC text settings now pass through ep-money-copy, replacing AED only when followed by a number; URLs, alt/title/ARIA/input/data fields remain untouched. Currency configuration/helper loads on all theme pages before the cart runtime. Numeric price filter inputs retain numeric values and visible labels use the symbol; these are intentionally not prefixed with AED because Dawn range validation requires numbers. Metadata, structured_data, Shopify checkout and notification/email formats remain ISO/plain. Added checkout/email guidance to MERCHANT_TODO.

QA integration: baseline discrepancy was BOM/line-ending normalization only in qc-category-label, with no merchant content change. Restored its BOM. Updated the UX harness to execute the real early currency helper before QC initialization. Added a text-node-only fallback for merchant rich text (FAQ/help/page descriptions), preserving all HTML attributes and metadata; primary price components still render the Liquid snippet.

Dirham QA correction: Shopify escapes interpolation parameters for translation keys without the _html suffix. Added localized _html aliases for money-bearing free-delivery/tier, facet, quantity-price and price-range messages, retaining existing wording and original plain-text keys. This prevents HTML appearing as text and the resulting cart width expansion.



## Dirham 4: Final verification and delivery (23 October 2026)

Target 189582049393 remains UNPUBLISHED. All 94 deployable changed/new files match Shopify API read-back exactly. No live theme, checkout, emails, catalogue records or store currency settings were modified; no theme copy or publication. Deployment guard reread WORKLOG and queried the current unpublished role before every successful push.

Theme Check: **0 errors, 14 retained warnings**. Same legacy orphaned snippets, non-home unused/name/complexity and pre-existing object inference warnings documented in the prior batch; no new currency warning. Bundled skill validator was attempted on the complete changed-file set but cannot load @shopify/theme-check-common. Official Shopify CLI plus schema/reference/JS checks and the updated cart/UX harness passed.

Browser checks: homepage, Baby Products, populated All collection, Deals view, product, search, cart, cart drawer and 404 show no visible AED/Dhs prices or escaped HTML. No markup or symbol leaked into tested ARIA/title/alt/placeholder/value/data attributes. Product Open Graph currency remains AED; structured_data rendering and meta-tags source remain unchanged. Predictive suggestions show symbol prices. Add and cart quantity section refresh show symbols and original test quantities were restored. Original price-filter numeric values/bounds intentionally remain numeric to preserve filtering. Shared unit and retained Dawn quick-add/cart/notification/quantity pricing code uses ep-money.

All six engine checks passed: desktop/mobile Chromium, Firefox and WebKit, no page errors or horizontal overflow. Font loaded in each engine, and body/digits retain Avenir with EP Dirham first. These are browser-engine/mobile-emulation checks, not physical iPhone/Android or macOS Safari runs. Symbol alignment visually inspected at 12/14/16/24px; final font-size .95em, vertical-align -.02em, font-weight 400, narrow non-breaking space, digits tabular. Compare-at strike crosses both glyph and number; colour inherits. Accessible HTML hides the glyph and exposes AED before the digits; no claim of a physical screen-reader session. A transient cart screenshot taken during its existing 250ms opening animation initially looked offset/translucent; after waiting 350ms the dialog is opaque at left 0/right 390 with no internal overflow. No unrelated cart layout change was made.

Merchant text settings use Liquid ep-money-copy. Rich HTML text uses a text-node-only progressive enhancement which skips metadata, scripts, native options, inputs, ARIA-hidden content and attributes. A test rich-text paragraph converted its visible AED 99 but preserved title="AED 99". The native no-JS primary product/cart prices still use server snippets; arbitrary rich-text conversions require JS. HTML-enabled translation aliases preserve wording across locales and prevent escaped spans in free-delivery messages, ranges and From tags.

Limits: /account redirects to Shopify-hosted authentication with no theme header, confirming account/order pages cannot load these assets. Existing hosted auth sprite/origin warnings and the intentional 404 network error were recorded separately; theme page errors are zero. All 608 public products checked across three product JSON pages currently have one variant, so a real multi-variant switch/quick-options scenario cannot be demonstrated without merchant data; relevant server snippets and update paths are migrated and syntax checked. Gift-card template balance and document font were updated, title stays plain AED, but /gift_cards/preview returns 404; no real issued gift card/authenticated order was available for runtime QA. No fake variant, order, gift card or price was created. Physical-device and real gift-card/account review remain manual. The requested gift-card/checkout/email limits are in MERCHANT_TODO.md. Lighthouse was not rerun for this currency-only request; previous performance results are historical.

Artifacts: qa/dirham-browser.json, qa/dirham-engines.json, qa/dirham-updates.json, qa/dirham-theme-check.json, qa/dirham-remote-readback.json and currency screenshots. Currency code and face are in assets/ep-currency.js and assets/ep-dirham.css; the face is also bundled in ep-mobile.css and inlined in homepage critical CSS. ep-dirham.svg uses the exact supplied path. No new framework/dependency in storefront code. Full deployable manifest: docs/DIRHAM_CHANGED_FILES.md.

### Files changed in this request

- MERCHANT_TODO.md
- WORKLOG.md
- assets/ep-currency.js
- assets/ep-dirham.css
- assets/ep-dirham.svg
- assets/ep-final.js
- assets/ep-home-commerce.js
- assets/ep-mobile.css
- assets/price-per-item.js
- assets/qc-catalog.js
- assets/qc-home.js
- docs/DIRHAM_CHANGED_FILES.md
- layout/theme.liquid
- locales/bg.json
- locales/cs.json
- locales/da.json
- locales/de.json
- locales/el.json
- locales/en.default.json
- locales/es.json
- locales/fi.json
- locales/fr.json
- locales/hr.json
- locales/hu.json
- locales/id.json
- locales/it.json
- locales/ja.json
- locales/ko.json
- locales/lt.json
- locales/nb.json
- locales/nl.json
- locales/pl.json
- locales/pt-BR.json
- locales/pt-PT.json
- locales/ro.json
- locales/ru.json
- locales/sk.json
- locales/sl.json
- locales/sv.json
- locales/th.json
- locales/tr.json
- locales/vi.json
- locales/zh-CN.json
- locales/zh-TW.json
- qa/dirham-alignment.png
- qa/dirham-audit.txt
- qa/dirham-browser.json
- qa/dirham-cart-390.png
- qa/dirham-chromium-desktop.png
- qa/dirham-chromium-mobile.png
- qa/dirham-engines.json
- qa/dirham-firefox-desktop.png
- qa/dirham-firefox-mobile.png
- qa/dirham-home-390.png
- qa/dirham-product-390.png
- qa/dirham-remaining-money.txt
- qa/dirham-remote-readback.json
- qa/dirham-theme-check.json
- qa/dirham-updates.json
- qa/dirham-webkit-desktop.png
- qa/dirham-webkit-mobile.png
- sections/cart-live-region-text.liquid
- sections/ep-banner-carousel.liquid
- sections/ep-bottom-nav.liquid
- sections/ep-brand-tiles.liquid
- sections/ep-campaign.liquid
- sections/ep-category-grid.liquid
- sections/ep-category-panel.liquid
- sections/ep-deals.liquid
- sections/ep-promo-banner.liquid
- sections/ep-search-links.liquid
- sections/ep-store-grid.liquid
- sections/ep-themed-grid.liquid
- sections/featured-product.liquid
- sections/main-cart-footer.liquid
- sections/main-cart-items.liquid
- sections/main-product.liquid
- sections/qc-announcement.liquid
- sections/qc-brands.liquid
- sections/qc-categories.liquid
- sections/qc-essentials.liquid
- sections/qc-faq.liquid
- sections/qc-footer.liquid
- sections/qc-fresh.liquid
- sections/qc-hero.liquid
- sections/qc-product-tile.liquid
- sections/qc-products.liquid
- sections/qc-promos.liquid
- sections/qc-recommendations.liquid
- sections/qc-reviews.liquid
- sections/qc-steps.liquid
- sections/qc-trust.liquid
- snippets/cart-drawer.liquid
- snippets/commerce-runtime.liquid
- snippets/ep-critical-css.liquid
- snippets/ep-from-price.liquid
- snippets/ep-money-copy.liquid
- snippets/ep-money-number.liquid
- snippets/ep-money-text.liquid
- snippets/ep-money.liquid
- snippets/ep-price.liquid
- snippets/facets.liquid
- snippets/price-facet.liquid
- snippets/price.liquid
- snippets/product-variant-picker.liquid
- snippets/qc-cart-contents.liquid
- snippets/qc-category-label.liquid
- snippets/qc-delivery-tiers.liquid
- snippets/qc-product-card.liquid
- snippets/qc-variant-price.liquid
- snippets/quick-order-list-row.liquid
- snippets/quick-order-list.liquid
- snippets/unit-price.liquid
- templates/gift_card.liquid
- tools/check-ux-polish.cjs
- tools/ep-bundle.cjs
- tools/ep-dirham-cart-layout.cjs
- tools/ep-dirham-copy.cjs
- tools/ep-dirham-engines.cjs
- tools/ep-dirham-final-qa.cjs
- tools/ep-dirham-finish-tools.cjs
- tools/ep-dirham-last.cjs
- tools/ep-dirham-liquid.cjs
- tools/ep-dirham-qa.cjs
- tools/ep-dirham-report.cjs
- tools/ep-dirham-runtime.cjs
- tools/ep-dirham-translations.cjs
- tools/ep-dirham-updates.cjs
- tools/ep-dirham-variants-audit.cjs
- tools/ep-src/ep-final.js

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189582049393 . Owner review: Admin → Online Store → Themes → everyday-homepage-review. Never published.


Additional manifest entry after report generation: docs/EP_HOMEPAGE_STATE.json. All work remains on theme 189582049393; final read-back is 94/94, no mismatches.
