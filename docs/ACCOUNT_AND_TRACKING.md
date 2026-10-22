# Account, reorder and delivery status contracts

Confirmed account type: NEW_CUSTOMER_ACCOUNTS. Shopify-hosted account pages cannot be changed by adding Liquid customer templates. Saved addresses and native order history remain in routes.account_url. Do not build password/reset/addresses forms pretending to edit hosted accounts.

## Storefront fallback and extensions

page.buy-again renders customer.orders only when Shopify supplies an authenticated customer object with accessible orders. It never accepts a customer ID/order number from a query string to render orders. Otherwise it links to hosted account sign-in and shows a clear integration message. The real account dashboard/detail additions require a customer-account UI extension/app. Target new-account order index/order detail surfaces supported by the chosen API version; app authentication must verify the signed customer/account session. The extension can call the same secured reorder/status services.

Wishlist contract: GET wishlist_endpoint returns {handles:[...]}; POST {handles:[...]} returns {ok:true}. Backend derives identity from an app-proxy signed logged_in_customer_id or verified account session, authorizes that customer's list, rejects spoofed IDs, caps 100 handles, validates product publication and stores in a private customer metafield or its database. CSRF/origin protections and deletion/export controls are required. Guest lists store product handles only. On login, device handles can be merged into the account only after a successful backend save; no false account-saved state on failure.

Reorder service: GET {reorder_endpoint}/orders returns minimal authenticated order summaries {orders:[{id,label}]}. POST /resolve with {order_id} rechecks ownership and returns {ok:true,items:[{id,handle,quantity,title}],skipped:[{title,reason}]}. Backend reads current variant IDs/stock/publication, never returns historical prices as chargeable amounts. The storefront re-fetches /products/handle.js, matches current variant availability, adds lines sequentially via AJAX Cart, skips deleted/unavailable/insufficient-stock lines and reports skips. Shopify determines current prices/discounts. Backend is not supplied or tested. If the authenticated Liquid fallback exposes the customer's historical variant IDs, the same live recheck is applied without trusting order data for price.

## Tracking state mapping

| custom.delivery_status | Display | Source |
|---|---|---|
| confirmed | Order Confirmed | Real order created (exclude tests); unpaid COD is still confirmed, not falsely paid. |
| processing | Processing | Warehouse accepts/picks order; Admin tag/app action maps this explicitly. |
| packed | Packed | Warehouse packing completion. |
| out_for_delivery | Out for Delivery | Fleet dispatch event; Shopify fulfilment/shipment out-for-delivery if configured. |
| delivered | Delivered | Verified driver/app delivery event or supported shipment delivery event. |

Tags such as delivery:packed can be mapped by Flow/backend to the enum. A Shopify order being fulfilled is NOT automatically proof of delivery. Partial fulfilment, cancellations, refunds and failed attempts must not advance to Delivered. Keep an event history with trusted timestamps and idempotency; show cancellation separately. There is no launch GPS map. Backend/Flow updates private order metafields; theme code does not update orders.

## Public tracking ownership flow

tracking_endpoint is a signed app proxy or HTTPS backend. POST /challenges {order_number,contact,consent:true} => generic {ok:true,challenge_id,expires_in:300}; do not reveal order existence/contact match. Send OTP only to the contact already on the matched order, not an arbitrary destination submitted by the browser. POST /verify {challenge_id,code} => {ok:true,access_token,expires_at}. Token is single-purpose, bound to the order/session and kept only in memory; GET /status with Authorization: Bearer <short-lived-token> returns {status,events:[{status,at}]}. Never return full addresses, payment credentials, customer lists or delivery-photo URLs on this endpoint. UI renders only the allow-listed five states, not arbitrary server HTML. Customer-account sessions can avoid redundant OTP only after cryptographic server verification.

OTP controls: 5-minute expiry, at most 5 attempts/challenge, resend cooldown 60 seconds, 3 sends/15 minutes per order/contact/session and IP risk limit; hashes only at rest, single use, constant-time checks, lockouts/recovery, abuse monitoring. Revalidate ownership/expiry for every request and action. Generic failure messages, audit IDs and minimal redacted logs. Never store contact, order identifiers, OTP, token, history, photos or chat PII in localStorage.

## Proof of delivery

Capture requires a driver/fulfilment app (evaluate an in-house driver web app or an established local-delivery app with authenticated evidence access). Store a private backend object reference in custom.delivery_photo, or a private file reference whose access is separately protected. Shopify permanent CDN file URLs are not access control. A customer-account order-detail extension may request a short-lived signed photo URL after session and order ownership verification. Do not put photo URLs in public tracking, product JSON, public page content or unauthenticated chat. This new-account extension/backend is not implemented by the Liquid theme.

