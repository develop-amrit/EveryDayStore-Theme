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
