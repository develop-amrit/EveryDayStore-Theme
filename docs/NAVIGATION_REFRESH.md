# Navigation refresh — 21 October 2026

Applied to the existing unpublished codex-edits2 (189518545009). Live codex-edits (189489545329) remains queued under the two-theme workflow. No themes were created or published.

- Removed the redundant All Products entry from the header strip and nested Categories navigation. Explore products still browses the full catalogue. The merchant's source menu is preserved.
- Added desktop pointer-hover dropdowns, switching between departments, a short exit grace period, outside-click dismissal and Escape support. Native details keep keyboard/touch navigation available. Theme editor section reloads initialise the same behaviour.
- Replaced outlined tiles with a cream navigation strip, consistent department icons, organic icon backgrounds derived from the existing palette, clearer labels and an olive active underline. Mega-menu headings and category columns are more distinct. Fonts, logo, search, product sections and ordering behaviour are unchanged.
- Mobile keeps a horizontally scrolling department rail and a tap-operated Categories drawer; no hover dependency. Reduced-motion disables the new transformations/transitions.

Files: snippets/qc-menu.liquid, assets/qc-storefront.css, assets/qc-storefront.js.

Verified in browser: seven departments with no All Products entry; Grocery opens without a click; pointer movement into its submenu keeps it open; Baby Products replaces the open department; Escape dismisses it; mobile Categories opens its drawer and has no All Products entry; no body overflow at a 390px viewport. Shopify preview controls were temporarily hidden to avoid covering the mobile tabs. Basket contents were not changed.

Shopify API read-back matches all three uploaded files. Structural/JSON/reference/JS syntax checks pass. Full official Theme Check is unavailable because the bundled validator lacks @shopify/theme-check-common; no claim of a full Theme Check pass is made.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009
