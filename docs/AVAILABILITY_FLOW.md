# Availability lifecycle and back-in-stock

## Define, enter, read

1. Settings > Custom data > Products > Add definition: custom.show_when_sold_out, True or false, storefront-readable. Also create custom.sold_out_at (date/time) and custom.is_on_sale (boolean). Definitions come before values; see METAFIELDS.md.
2. A merchant or trusted app sets show_when_sold_out=true only after a real customer order exhausts the product. Do not set it for catalogue-only items. Keep inventory management in Shopify.
3. Liquid reads product.metafields.custom.show_when_sold_out.value. Available/purchasable products render; unavailable retained products render Out of stock and the consent-based notify form; other unavailable products do not render in shared cards, grids, predictive search or recommendation sections.

## Proposed Shopify Flow recipe (configure and test; not installed)

- Trigger **Order created**, not an anonymous inventory-change event. Exclude test orders, cancelled orders, and non-customer/sample orders. Include real COD orders even though not yet paid.
- For each distinct line-item product: re-fetch all variants after inventory settles. Confirm no variant is purchasable (respect inventory policy/continue-selling; zero on-hand is not enough).
- If exhausted due to this order: Update product metafield show_when_sold_out=true and sold_out_at=order timestamp. Preserve previous publication/status metadata in the backend before making later lifecycle changes.
- Separate **Product variant inventory quantity changed** workflow: if the product has a purchasable variant again, clear show_when_sold_out and sold_out_at. Do not automatically activate products that were intentionally Draft/Archived.
- Scheduled lifecycle workflow: after the merchant-approved retention period (not yet decided), re-fetch still-unavailable retained products, clear show_when_sold_out, and set status **Draft** or remove Online Store publication using a supported Flow action/app. Recheck inventory immediately before changing status. Manual review is preferable until the retention window is approved.
- On real restock, a restock service sends opted-in alerts once per subscription/product event, with deduplication and unsubscribe handling. Inventory change alone does not prove a real order caused a sell-out; do not mislabel imports, warehouse corrections, refunds, or test inventory changes.
- Flow UI/action fields and multi-variant availability aggregation must be tested in this store. If the required aggregation/action is unavailable, implement that step in a scoped backend app; do not silently approximate with one variant. Do not rely on plan-restricted HTTP/Run Code actions without checking eligibility.

## Authoritative hiding

Liquid filtering is presentational. It cannot make /products/handle inaccessible, remove an item from Shopify's native search index, change collection counts/pagination, or stop a direct cart API request. Draft/unpublish/Archive through Admin/Flow is the authoritative hiding mechanism. Leave retained recent sell-outs Active and published, and hide catalogue-only inactive products in Admin. Pages can have fewer visible cards until catalogue publication is cleaned up.

## Restock integration contract

Configure restock_endpoint as a supported restock app endpoint or your secured same-origin app proxy. No endpoint => disabled form and a clear not-connected message. POST JSON: {product_id, variant_id, product_handle, email, email_consent:true, phone:null|string, phone_consent:boolean}. Never send a phone without explicit phone consent. Backend validates identity fields/product state, rate-limits spam, normalizes phone numbers, stores consent timestamp/version/channel, returns {ok:true} only after durable subscription storage, and sends email/SMS/WhatsApp outside the theme. Error responses: 400 invalid payload, 409 unavailable integration/state, 429 rate-limited, 5xx retryable. Do not reveal whether an address is already subscribed. Provide unsubscribe/erasure.

Options to evaluate: a maintained App Store restock app with a supported storefront integration, or this custom webhook/app-proxy contract. Shopify Shop buyer notifications are not a general storefront subscriber API. A first-party Shopify Back in Stock app has not been verified; do not install an app on the strength of that name alone. No app or notification service was installed or tested here.

