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

In progress. Theme editor, browser, cart and Lighthouse results will be recorded after implementation. Do not treat this draft as ready until checks are complete.

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
