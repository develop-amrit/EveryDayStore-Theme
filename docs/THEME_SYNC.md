# Two-theme sync workflow

## Latest status after the merchant's theme switch — 22 October 2026

codex-edits (189489545329) is now MAIN; codex-edits2 (189518545009) is UNPUBLISHED. After checking roles and comparing remote files, the three pending compact-navigation files were applied to codex-edits2. API read-back confirms all thirteen batch files are byte-identical between the two themes. No files remain pending. No themes were created or published, and theme settings were not uploaded. Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009. Older batch notes below describe the roles at their respective handoffs.

Authorised by the merchant on 2026-10-21. Targets are codex-edits (189489545329) and codex-edits2 (189518545009). The second was formerly named codex-catalogue-navigation. No new themes are needed.

Before each write, query the target role and read relevant remote files. Preserve merchant settings and newer remote changes. Apply each authorised code batch to the unpublished target and verify it. Record the same batch as pending for the live target because the connector blocks live writes. When the merchant switches themes, query roles again and apply the pending files to the now-unpublished target. Never publish automatically.

Role switches do not automatically trigger a background deployment. Sync happens during active assistant work. Do not report both themes as identical until both targets have received and passed verification for the same batch. THEME_SYNC_STATE.json records local file hashes and per-target status.

## Current batch

The ten UX files described in UX_UPDATES_PENDING.md are now applied to codex-edits2 (unpublished). codex-edits is live and remains pending. This sync covers the changed files; it does not establish that every other file or theme-editor setting is identical between the themes.

Verification:

- All ten files read back through Shopify Admin API; Shopify may reformat locales, so locale verification compares parsed values.
- Predictive search for pampers now returns five matching product suggestions in the draft preview.
- Basket item count and AED subtotal update after Add/Remove. Mobile basket bar visible; header compacts after scrolling.
- Contextual sidebar displays nearby subcategories. Mobile filters start collapsed.
- Test addition removed; pre-existing basket restored to one item, AED 195.00.
- Local structural and predictive-fallback tests pass. Official Theme Check remains unavailable due to the missing bundled dependency.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009

## Catalogue import, 21 October 2026

Latest navigation refresh: the combined manifest now contains thirteen files, including snippets/qc-menu.liquid and assets/qc-storefront.js. All Products is removed from the theme navigation; desktop menus open on hover; the navigation has department icons and a cream background. All three navigation files were read back and browser checked on codex-edits2. The live target is still pending. See NAVIGATION_REFRESH.md.

All 85 workbook products and 497 gallery images are imported store-wide using Inventory Data-5 prices, listed discounts and stock. 67 products are published; nine zero-stock and nine identity-review products are drafts. See PRODUCT_IMPORT_REPORT.md and PRODUCT_IMPORT_REVIEW.csv.

The homepage template now has distinct product shelves for all seven departments. templates/index.json is the eleventh file in the combined sync manifest: applied and read back on codex-edits2, pending on live codex-edits. Shopify removes empty footer block arrays on save; the parsed template otherwise matches. The earlier UX checks remain historical; the import cart test restored the current basket to its original two items, AED 482.00.
