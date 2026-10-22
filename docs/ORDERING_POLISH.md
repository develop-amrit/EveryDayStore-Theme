# Ordering and visual polish — 2026-10-20

Review theme: **codex-sample-sections**, ID **189504290929**, unpublished.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189504290929

## Implemented

- Smaller header, category navigation and hero; mobile hero artwork removed so products appear sooner. Existing brand colours and fonts retained.
- Nine distinct Shopify products in three collection-driven sections. The single-product pants selection is presented as a feature panel. Redundant category/empty brand/testimonial sections removed from this sample homepage.
- More readable card titles and prices; the source product title remains available on the title link. Only the display prefix `[TEST]` is removed, and the hero explicitly labels this a sample catalogue. Admin product titles and descriptions remain unchanged.
- Neutral diaper illustrations for products missing photos, explicitly labelled as awaiting photography. No fabricated product photographs or brands.
- Full-width Add/quantity controls, 44px touch targets, busy-state protection and cart reconciliation following a rejected stock adjustment. Carousel arrows only appear when there is overflow.
- Cart includes an estimated total, delivery area selector, editable instructions and a sticky checkout action. Terms wording and VAT wording no longer repeat. Unchecking terms clears the previous test acknowledgement.
- Disconnected slot controls, chatbot and review-submission form hidden from customer view; those integrations remain available for configuration. Empty recommendation sections hidden.
- Useful footer category links, separate policy links, shorter mobile tab labels and corrected Home active state.
- Enabled the existing COD information setting after observing COD in checkout. No payment gateway or shipping-rate configuration changed.

## Real browser checks

- Predictive search for Sanita returned the actual product and navigated to its detail page.
- Homepage Add -> quantity 1 -> quantity 2 updated the card and cart. Subtotal was AED 410.66 including the original AED 230 item and two AED 90.33 test items. Remove returned the original AED 230 basket.
- Product-page Add placed the same sample item in the drawer at a total AED 320.33. Remove again restored the original basket.
- Delivery instructions were saved, survived the Section Rendering refresh, and were restored to the original note.
- Checkout without terms was blocked. With terms checked, Shopify guest checkout loaded with AED 230 and Cash on Delivery displayed. No customer/contact/payment data was entered. No order was placed. Test consent was cleared after returning.
- Desktop and 390px mobile views inspected. No horizontal document overflow at the checked mobile size. Nine distinct homepage products confirmed. Normal desktop sizing restored after responsive review.

## Local checks

Structural checker: JSON, section schemas, changed/shared Liquid block balance, references and JS syntax pass. Cart, invalid-reservation and privacy simulations pass. The cart simulation now includes a rejected add accompanied by a changed server cart, confirming the UI reconciles to the server quantity.

Official Theme Check is unavailable in this agent shell. The bundled Liquid validator cannot start because its `@shopify/theme-check-common` dependency is missing. These are not official Theme Check results.

## Before real orders

1. The sample product descriptions explicitly say they are ordering-test fixtures and are not for real purchase or fulfilment. Replace/approve the launch catalogue, stock, descriptions, prices and photography in Shopify Admin.
2. `/pages/terms-conditions` returned **404** in a real browser. Final approved Terms, Refund and Shipping content must be supplied/published and policy links verified. Do not treat the cart checkbox as a substitute for a valid policy or checkout-level validation.
3. Checkout showed United Arab Emirates and an emirate selector with all seven emirates. Dubai-only shipping enforcement and exact AED 5.99 / 3.99 / free rates need verification with real supported/unsupported addresses. No address was entered in this review.
4. COD was visible. Cards, wallets, BNPL, VAT, paid receipts and actual fulfilment/notifications were not tested. A completed order is deliberately outside this test.
5. Capacity-enforced slots, account-backed saved lists, restock messaging and AI/reviews need their documented backend/app connections. The theme does not pretend those services are connected.

## Theme files changed

New: `snippets/qc-area-picker.liquid`, `snippets/qc-product-placeholder.liquid`.

Modified: `assets/qc-home.js`, `assets/qc-delivery.js`, `assets/qc-storefront.css`, `config/settings_data.json`, `locales/en.default.json`, `sections/qc-header.liquid`, `sections/qc-footer.liquid`, `sections/qc-products.liquid`, `sections/qc-product.liquid`, `sections/qc-product-reviews.liquid`, `snippets/qc-product-card.liquid`, `snippets/qc-cart-contents.liquid`, `snippets/qc-delivery-picker.liquid`, `snippets/qc-assistant.liquid`, `templates/index.json`.

Local source snapshots are in `tools/ordering-before.json` and `tools/ordering-product-before.json`; `_backup_original` remains untouched. Documentation/tools are excluded from theme uploads. Changes were uploaded to the unpublished review theme only.

## Publication — 2026-10-20

Following the user's explicit instruction to publish live, codex-sample-sections (189504290929) was published through Shopify Admin. The Admin displayed “Theme published” and listed this theme as current; codex-edits moved into Draft themes. The public homepage was checked after exiting preview mode and displayed the updated hero and sample product sections. Earlier “unpublished” references in this document describe the review stage. All launch limitations above remain applicable.
