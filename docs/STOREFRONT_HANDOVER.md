# Full storefront handover

## Build status

Phases 1–7 theme work and backend/Admin contracts are present locally. This full build has NOT been uploaded or published. The remote codex-edits copy contains only the earlier homepage upload, not these latest storefront changes. The user must review a new preview before authorizing a new upload.

**No running preview.** Shopify CLI is not installed/on PATH; the global npm package list is empty. A logged-in browser does not install the CLI. The bundled theme validator cannot start because @shopify/theme-check-common is missing. Native Shopify rendering, responsive visual QA, predictive search, real cart requests, account auth, consent and external backend integrations remain unverified. See VERIFICATION.md for exact checks and limits.

## Brand and architecture retained

- Store: **EverydayyPlus**, 3djevx-mu.myshopify.com, AED. Existing editable **everyday** wordmark remains the default; an uploaded global logo takes priority.
- Colors: forest #283618, olive #606C38, cream #FEFAE0, sand #DDA15E, rust #BC6C25, white #FFFFFF. Borders/backgrounds use neutral mixes of these through CSS custom properties.
- Configured font: Assistant Regular for body/headings. Existing effective CSS stack: **Avenir Next, Avenir, Arial, sans-serif**, retained through theme variables.
- Dawn-derived Online Store 2.0 theme. Existing `_backup_original` preserved; no Git repository/branch was available. Existing page routes remain, with legacy sample merchandise replaced by real collection-driven empty views. Compatibility shims preserve gifting/help/occasion routes without the old competing checkout/tracking runtime.
- Confirmed **new customer accounts**, with guest checkout enabled. Hosted address/order screens stay in Shopify; custom account wishlist, reorder and private order status/proof additions need an app/extension. See ACCOUNT_AND_TRACKING.md.

## Files by phase

The full generated inventory is in FILES_CHANGED.md. Main touch points:

| Phase | Files / modules |
|---|---|
| Discovery / classification | REQUIREMENTS_MATRIX.md; COLLECTIONS_TO_CREATE.md; CATALOGUE_MENU.json; ADMIN_SETUP_CHECKLIST.md |
| 1 Foundation / homepage | layout/theme.liquid; config/settings_schema.json; config/settings_data.json; locales/en.default.json; templates/index.json; sections/header-group.json; sections/footer-group.json; qc header/announcement/category/footer sections; snippets/qc-menu.liquid; assets/qc-home.css, qc-home.js, qc-storefront.css, qc-storefront.js |
| 2 Availability | snippets/qc-product-card.liquid, qc-product-list.liquid, card-product.liquid, qc-restock.liquid; sections/qc-predictive.liquid; AVAILABILITY_FLOW.md |
| 3 Catalogue/product/saved lists | sections/qc-catalog.liquid, qc-product.liquid, qc-quick-product.liquid, qc-product-tile.liquid, qc-recommendations.liquid, qc-product-reviews.liquid, qc-recent.liquid, qc-saved.liquid, qc-categories-page.liquid; snippets/qc-option-context.liquid, qc-variant-price.liquid, qc-comparison-tray.liquid; assets/qc-catalog.js; collection/search/product/wishlist/compare/categories JSON templates; METAFIELDS.md |
| 4 Delivery/cart | snippets/qc-cart-contents.liquid, qc-delivery-picker.liquid, qc-delivery-tiers.liquid; sections/qc-cart-page.liquid; templates/cart.json; assets/qc-delivery.js; DELIVERY_BACKEND_SPEC.md; DELIVERY_ZONES.md |
| 5 Account/tracking | sections/qc-buy-again.liquid, qc-tracking.liquid; snippets/qc-order-timeline.liquid; buy-again/track-order templates; assets/qc-account.js; ACCOUNT_AND_TRACKING.md |
| 6 Assistant | snippets/qc-assistant.liquid; assets/qc-assistant.js; AI_BACKEND_SPEC.md |
| 7 Privacy/policies | snippets/qc-privacy.liquid, qc-policy-links.liquid; assets/qc-privacy.js; sections/qc-policy.liquid; four draft policy page templates; PRIVACY_AND_POLICIES.md |
| Verification/support | tools/check-storefront.cjs; tools/cart-smoke.cjs; tools/delivery-smoke.cjs; tools/privacy-smoke.cjs; .shopifyignore excludes backups/docs/tools; VERIFICATION.md |

## How to add or delete products

1. Shopify Admin > Products > Add product: actual title, images, prices/compare prices, variants, inventory and pack/weight. Set Active and publish to Online Store only when it is part of the launch catalogue.
2. Products > Collections: add the product to a manual collection or meet an automated rule. Products are never duplicated just to appear in more than one category.
3. Online Store > Themes > Customize (the development copy): select the collection in a homepage carousel, grid or fresh tab; set count and heading. Choose distinct collections for distinct shelves. New collection products appear up to the configured count/sort order.
4. Enter approved pack/spec/category metafields after creating their definitions. Apps > Search & Discovery: enable filters and configure recommendations.
5. Deleting, drafting, archiving, unpublishing or removing a product from a collection removes it on the next render. In-stock products are purchasable. A genuine recent sell-out remains visible only while custom.show_when_sold_out=true; its Add button is disabled and a consent-based restock form appears. Clear that flag/Draft through the documented lifecycle for catalogue-only unavailable products. Liquid alone does not make direct URLs or Shopify's index inaccessible.
6. Comparison/wishlist/recently viewed store only handles; cards re-fetch current product data. Account wishlist persistence requires the configured secured backend. Native high-variant option values and Section Rendering are used instead of enumerating all variants; combined-listing sibling changes navigate to the real sibling product. Browser verification is still required.

## Preview / restart in PowerShell

Install Shopify CLI if needed. Because PowerShell script execution is disabled in this environment, use npm.cmd for installation rather than changing the machine execution policy:

```powershell
npm.cmd install -g @shopify/cli@latest
Set-Location 'D:\shopify-store-editor'
shopify auth login
shopify theme check
shopify theme dev --store 3djevx-mu.myshopify.com
```

If the installed PowerShell shim is blocked, use **shopify.cmd** in place of shopify. Keep that dedicated terminal open. Expected URL: http://127.0.0.1:9292 ; use the actual CLI URL if different. Open it with:

```powershell
Start-Process 'http://127.0.0.1:9292'
```

For a separate background PowerShell window after authentication:

```powershell
Start-Process powershell -WindowStyle Hidden -ArgumentList '-NoExit','-Command','Set-Location D:\shopify-store-editor; shopify.cmd theme dev --store 3djevx-mu.myshopify.com'
```

Do not pass --theme or --environment codex-edits for this temporary development preview. It must not overwrite the public live theme. No dev server is running here and the expected URL is not a verified preview.

Review in order: / homepage/header; /collections/all and /search?type=product&q=...; an actual product URL; /pages/wishlist, /pages/compare; /cart; /pages/buy-again; /pages/track-order; assistant/cookie controls; draft policy pages. Create page records/assign templates in Admin before testing their routes. Test empty/partial catalogue, retained sell-outs, overlapping collections, single/multiple variants, keyboard/reduced motion, 360/750/1440px widths, guest/account paths and all negative/error states.

## Only after new preview approval

```powershell
shopify theme push --unpublished --store 3djevx-mu.myshopify.com
```

This creates a NEW unpublished theme. Do not publish automatically. It has not been run for this full build.

## Remaining Admin/app/backend work

No checkout enforcement, rate configuration, capacity service, OTP delivery, account extension, review store/moderation, restock sender, AI model/helpdesk, invoice service, gateway or notification provider was installed. Theme buttons/forms cannot replace those services. All endpoint settings default empty; disconnected states are explicit. Slot mocks are only for design mode/localhost and block checkout. The only authority for prices/inventory/cart is Shopify.

Global discount sorting is not a native Shopify Liquid sort and is classified as a search/index-app requirement. No misleading one-page sort was labelled as catalogue-wide ranking. Promotions use a computed sale metafield exposed as a native filter. New customer-account address management is linked to Shopify's hosted UI rather than recreated incorrectly in Liquid.

Confirm: shared versus separate Baby Food collection mapping; launch SKU list; UAE gateway/BNPL approval; VAT configuration; review moderation/verified-purchase rules; notification triggers; abandoned-cart channels/timing/incentives; Dubai zone boundaries; cut-off/holidays; slot capacity/expiry; final legal wording; support phone/helpdesk destination. Account TYPE is confirmed new; which account app/extension to adopt remains open.
