# UX improvements prepared — not deployed

Target only: codex-catalogue-navigation, theme 189518545009, currently MAIN. No new themes created. Shopify's connector safety policy rejected themeFilesUpsert because the target is published. The live storefront was not changed by this batch. Do not treat earlier local previews as previews of these pending changes.

## Prepared changes

- Predictive search requests available results first, with a normal Shopify search-section fallback if the predictive set has no storefront-visible products. Existing availability rules remain.
- Contextual collection sidebar shows nearby subcategories, a parent link and a collapsed department switcher; existing categories and menu sources remain intact.
- Collection filters collapse on mobile while staying open on desktop.
- Existing mobile header compacts after scrolling, preserving the initial layout and search access. The category sidebar measures the changing header height.
- Existing product titles use two lines; real pack metadata retains a separate line. No catalogue titles, prices, inventory or product records were rewritten.
- Header basket subtotal and a mobile basket bar show only when there are items. Both refresh from the AJAX cart state and open the existing drawer.
- Drawer uses the optional merchant card title and pack-size metafields, retaining full product-title fallback, and displays a next-day promise. No unverified delivery slot or cut-off is claimed.
- Hero spacing is slightly tighter; palette, logos, sections, assets and template assignments remain.

## Files to apply to the existing theme

1. locales/en.default.json (six new translation keys; preserve any later merchant translations).
2. assets/qc-storefront.css.
3. assets/qc-category-sidebar.css.
4. sections/qc-predictive.liquid.
5. snippets/qc-collection-sidebar.liquid.
6. sections/qc-catalog.liquid.
7. snippets/qc-cart-contents.liquid.
8. sections/qc-header.liquid.
9. assets/qc-category-sidebar.js.
10. assets/qc-home.js (apply last).

The patch archive contains only these paths, not a complete theme. Apply to Online Store > Themes > codex-catalogue-navigation > Edit code. Do not upload the archive as another theme. No publish operation or theme duplication is needed because this is already the live theme.

Original local file contents before this batch are in tools/ux-polish-before.json. _backup_original was not edited. Existing remote files were read before editing; all selected source files matched local copies except locale formatting, and existing locale content was checked separately.

## Verification

- node tools/check-storefront.cjs: PASS 92 JSON files, 88 schemas, 55 shared/changed Liquid structures, references and JS syntax.
- node tools/check-ux-polish.cjs: PASS predictive availability ordering, empty-predictive fallback to full search, short-query dismissal and basket summary initialisation using a simulated browser environment.
- Official Theme Check unavailable: missing @shopify/theme-check-common dependency; Shopify CLI absent from the agent shell.
- Browser rendering and real Shopify search/cart interactions for this batch remain UNVERIFIED because deployment was blocked. After application, test predictive search for an in-stock title, mobile compact header/filter toggle, second/third-level sidebar links, Add/+/-/Remove, basket totals and empty-cart hiding. Restore test cart contents afterwards.

This is additive UI work only. Shipping enforcement, capacity reservations, final policies, gateway approvals and VAT settings remain separate Admin/backend tasks.

## Deployment update (2026-10-21)
This batch has now been applied to codex-edits2 (189518545009), the renamed former catalogue theme, while unpublished. codex-edits (189489545329) is live and remains pending. See THEME_SYNC.md and THEME_SYNC_STATE.json for the current two-theme workflow and verification.
