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
