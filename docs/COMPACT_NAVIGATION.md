# Compact navigation — 21 October 2026

Merchant switched themes: codex-edits2 (189518545009) is MAIN; codex-edits (189489545329) is UNPUBLISHED. Development writes targeted codex-edits only. No theme was created or published.

The desktop hover menu now lists direct subcategories in two columns, with no images or third-level lists. Grocery measures approximately 460 x 324 px; Office Supplies is 460 x 218 px. Height is limited to min(340px,50dvh); small viewports can scroll the menu. Position follows the hovered department and is clamped inside the navigation width. Deeper categories remain in the full mobile Categories drawer and contextual collection sidebar.

Removed department chevrons and the Explore products arrow. Icons and labels are centred horizontally and vertically, including equal-height tablet navigation. Hover switching, native keyboard/touch disclosures, Escape and outside-click dismissal are retained.

Synced all thirteen previously queued UX/catalogue files to codex-edits after reading the remote versions. Its homepage matched the recorded pre-import baseline before applying the authorised updated template. Other theme settings were not uploaded. Shopify API read-back matches all thirteen files (JSON compared semantically).

Browser checks: desktop Grocery dimensions and subcategory links; Office Supplies fits at the right edge; tablet labels share a common vertical centre and dropdown stays within the viewport; mobile has no body overflow at 390px and all 63 deeper menu links remain; zero department-arrow elements; Escape closes the dropdown. Clicking Pantry Staples opens its collection with all eight deeper-category sidebar links. No basket contents or checkout were changed.

Local structural/JSON/reference/JS syntax checks pass. Official Theme Check cannot run because the bundled validator lacks @shopify/theme-check-common.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189489545329

Update, 22 October 2026: merchant switched roles again. codex-edits (189489545329) is MAIN and codex-edits2 (189518545009) is UNPUBLISHED. Queried roles immediately before deployment, compared remote differences, and applied snippets/qc-menu.liquid, assets/qc-storefront.css and assets/qc-storefront.js to codex-edits2. API read-back confirms all thirteen batch files are byte-identical across both themes. No files remain pending. Local storefront and UX checks pass. Browser checks above remain the 21 October checks; no new browser interaction test was run during this sync. No themes were created or published; merchant settings and _backup_original were untouched. Role switching does not automatically deploy pending files.
