# Storefront requirements matrix

Build date: 2026-10-20. Classification is by authoritative owner: **A Theme**, **B Shopify Admin**, **C App / Function / backend**, **D Future decision**. Theme UX for a B/C feature does not make its enforcement a theme feature. All new work is local and unverified in a Shopify browser preview until stated otherwise in VERIFICATION.md.

## Discovery

- Online Store 2.0, Dawn-derived, with layout/templates/sections/snippets/assets/config/locales. Existing JSON homepage, shared qc product/cart snippets, Dawn galleries/filtering are useful foundations.
- No Git repository. Existing `_backup_original` remains untouched. New build work does not overwrite that backup.
- Live read-only discovery: EverydayyPlus; AED; OPTIONAL purchasing accounts; `NEW_CUSTOMER_ACCOUNTS`; login at checkout is not required. There is no templates/customers directory.
- Existing editable `everyday` wordmark remains, with global uploaded logo taking priority and shop.name as its accessible name.
- Palette: #283618 forest, #606C38 olive, #FEFAE0 cream, #DDA15E sand, #BC6C25 rust, #FFFFFF white; neutral borders/backgrounds derived from these. Configured Assistant Regular is overridden by existing Avenir Next/Avenir/Arial CSS; retain that effective font stack.
- Linked store: 3djevx-mu.myshopify.com. Recorded unpublished copy: codex-edits, 189489545329. Prior turn uploaded the earlier homepage only; this full-build request does NOT authorize further uploads or publication.
- Shopify CLI is unavailable on PATH. Authentication in a browser does not supply a CLI executable. Temporary dev preview and Theme Check cannot run here. Account settings were read through the connected API; no Admin configuration was changed.

## Capability ownership

| Capability | Owner | Deliverable / required configuration / limits |
|---|---|---|
| Guest and account purchasing | B | Settings > Customer accounts: show login links; Settings > Checkout: do not require login before checkout. Currently optional; retain guest checkout. |
| Collection/category navigation | A + B | One menu setting feeds mega-menu, mobile menu, categories page and homepage rail. Content > Menus: create taxonomy from COLLECTIONS_TO_CREATE.md, maximum three levels. Collections and pages must be created in Admin; files alone do not create them. |
| Search/filter/sort: brand, price, stock, newest, popularity | A + B | Native Liquid collection.filters/search.filters and sort_options. Apps > Search & Discovery > Filters: add vendor, price, availability, category metafields/options. Collection best-selling is supported; search sort choices are only Shopify-provided choices. |
| Promotions / discount filter and ranking | B + C | custom.is_on_sale boolean maintained from actual variant compare price, exposed via Search & Discovery. No native global percentage-discount sort exists in Liquid. A search/index app must rank the full catalogue; do not label client sorting of one page as global sorting. |
| Category-specific attributes | A + B | METAFIELDS.md defines merchant-owned fields first, then entering values and reading them. Enable eligible fields in Search & Discovery. |
| Ratings and reviews | A + C + D | Render reviews.rating / reviews.rating_count and app blocks; submission form posts only to configured review backend. Recommend a maintained reviews app such as Judge.me after merchant review. No localStorage reviews. Moderation/verified-purchase rules remain TBD. Do not install the discontinued Shopify Product Reviews app. |
| Guest wishlist | A | Device-local product handles only. Empty/error states and remove controls. |
| Logged-in wishlist | C | Secured app-proxy wishlist endpoint derives customer identity server-side. New customer-account extension recommended for account navigation. Without endpoint, explicitly label device-only saving. Never write customer metafields directly from the browser. |
| Product comparison | A | At most four handles in localStorage; current Shopify cards and metafield comparison attributes loaded from Section Rendering API. |
| Recently viewed | A | Up to twelve product handles in device storage; cards reloaded from Shopify so price/stock is current. No personal data. |
| Related/alternatives/complementary | A + B | Search & Discovery recommendations endpoint; custom.related_products/custom.complementary_products fallback. Apps > Search & Discovery > Recommendations: configure actual products. |
| Frequently bought together | A + B | Complementary/fallback products as opt-in selections; server cart sets current prices. No invented bundle discount; real discounts require Admin/app configuration. |
| Product availability | A + B + C | Hide unavailable cards unless custom.show_when_sold_out=true; see AVAILABILITY_FLOW.md. Flow/backend must maintain state and Draft/unpublish authoritative hidden products, including direct URLs/search indexes. |
| Back-in-stock alerts | A + C | Email form and optional phone/WhatsApp with separate explicit consent. Configured app/backend stores subscriptions and sends alerts. There is no verified first-party Shopify storefront Back in Stock subscription app assumed here; Shop buyer alerts are not an equivalent theme integration. Use a maintained restock app or the documented custom endpoint. |
| Buy again / reorder | A fallback + C | New accounts require an account UI extension/app. Storefront authenticated Liquid history where exposed, plus secured reorder endpoint, can supply current product IDs/handles. Resolve current variants, skip unavailable/deleted lines, report skips, add through AJAX Cart. No historical-price reuse. |
| Delivery slot scheduling and capacity | A UI + C | GET /slots and atomic POST /reservations, signed/resolved booking verified at checkout. Preview-only mock is explicitly labelled and blocks checkout. Theme never counts capacity. See DELIVERY_BACKEND_SPEC.md. |
| Dubai delivery-zone enforcement | A pre-check + B + C | Header/cart preference is not enforcement. Configure supported Dubai delivery rates/service; checkout validation public app on Basic or custom Function on Plus. See DELIVERY_ZONES.md. |
| Delivery instructions | A | Cart note via /cart/update.js; date/slot/zone/reservation via cart attributes. No personal notes in localStorage. |
| Shipping fees | A display + B authority | Settings > Shipping and delivery > General shipping rates > Manage: 0–48.99 => AED 5.99; 49–98.99 => AED 3.99; 99+ => free. No small-order fee. Tax/discount basis must match Admin checkout calculation. |
| Saved addresses | B | New accounts: hosted account profile/address management. Link routes.account_url; do not create nonfunctional Liquid address forms for new accounts. Any bespoke address workflow requires customer-account UI extension/Customer Account API. |
| Order status timeline | A UI + C | New-account extension or authenticated backend displays custom.delivery_status with documented mapping. Public track page requires OTP before status data; no live GPS. |
| Proof of delivery photo | C | Driver/fulfilment app captures private photo; custom.delivery_photo contract. Display only on verified authenticated order context/extension through short-lived authorized delivery. Never on public tracking/chat. |
| Email/SMS/WhatsApp notifications | B + C + D | Settings > Notifications > Customer notifications for native email; verified provider app/backend for SMS/WhatsApp. Final triggers, opt-in text and timing TBD. |
| Abandoned-cart reminders | B + C + D | Marketing > Automations > Abandoned checkout (availability varies by installed marketing app); configure recipients, consent, delay, incentives after decisions. Theme does not send messages. |
| Digital receipt/invoice | B + C | Settings > Notifications > Order confirmation: verify digital receipt content; customer accounts host order details. Tax invoice formatting/numbering may require Order Printer/invoice app. No claim of legal tax-invoice compliance before VAT review. |
| Required terms acceptance | A cart gate + C checkout authority | Required cart checkbox and persisted attribute, but accelerated/direct checkout can bypass theme. No universal Admin checkbox makes arbitrary T&C acceptance mandatory. Configure a public checkout validation app on Basic; Plus custom validation/checkout UI extension when eligible. Settings > Policies supplies the linked terms only. |
| Cookie consent and policies | A + B | Customer Privacy API banner accept/reject/manage; Settings > Customer privacy and Settings > Policies must be configured. Draft policy templates explicitly marked FINAL WORDING REQUIRED; legal wording still required. |
| Cards, wallets, bank/card offers | B + C | Settings > Payments: verify supported UAE providers and merchant eligibility, activate provider/gateway and approved offers; dynamic enabled_payment_types only. Theme never processes payments. |
| Cash on Delivery | B | Settings > Payments > Manual payment methods > Cash on Delivery > instructions > Activate. Confirm availability for Dubai/orders before enabling reassurance setting. |
| BNPL | B + C | Settings > Payments > Add payment methods: check Tabby/Tamara integration availability and obtain merchant approval. Theme messaging off by default; no gateway keys/scripts in Liquid. |
| VAT | B + D | Settings > Taxes and duties > UAE: merchant/accountant to confirm registrations, inclusivity, exemptions and invoice requirements. Theme says VAT calculated at checkout. |
| AI chatbot / ticketing | A UI + C | Configurable ai_endpoint; not-connected state without backend. Grounded support, structured intake, configured handoff/phone; AI_BACKEND_SPEC.md. No fabricated replies. |
| AI shopping assistant | A cards + C | Backend uses current Storefront catalogue/availability, returns handles; theme fetches real cards and native cart actions. No arbitrary generated merchandise/prices. |
| AI order actions | C | Ownership verification and server eligibility checks before tracking/cancellation/return/refund initiation. Idempotency, confirmation and audits required; no Admin credentials in theme. |
| OTP identity verification | A UI + C | Challenge + verify flow, generic responses, expiry/retry/rate limits; order data only after verified ownership. Logged-in backend sessions must be cryptographically verified, never based on customer ID in JSON. |
| Notification triggers, abandoned-cart incentives, GPS | D | Triggers/incentives TBD; live GPS explicitly excluded at launch. |

## Plan constraints and current sources

The connected store was previously reported as Basic; confirm Settings > Plan before selecting apps. Public App Store apps containing Functions are generally available on all plans, subject to individual API limits. Custom apps containing Functions require Shopify Plus. Shipping/information/payment-step Checkout UI extensions require Plus; do not promise a theme can edit checkout. New account pages are hosted outside Liquid; use customer-account extension targets subject to target/API eligibility. A Function is not an unrestricted network client: use app-owned configuration/reservation proof available in input and revalidate via eligible platform mechanisms; network fetch eligibility is separately restricted.

Sources checked 2026-10-20:

- [Shopify Functions availability](https://shopify.dev/docs/apps/build/functions)
- [Cart and checkout validation](https://shopify.dev/docs/apps/build/checkout/cart-checkout-validation)
- [Checkout customization and plan limits](https://help.shopify.com/en/manual/checkout-settings/checkout-customization)
- [Customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts/manage)
- [Storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering)
- [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy)
- [Payment provider availability](https://help.shopify.com/en/manual/payments/third-party-providers/payment-gateway-availability)

## Open decisions

Baby Food versus Baby Food & Formula collection sharing; confirmed launch SKU list; whether account fallback access is sufficient until an account extension is installed; gateway/BNPL approval; VAT configuration; review moderation and verified-purchase policy; notification triggers; abandoned-cart channels/timing/incentives; supported Dubai zones; cut-off time/holidays; final slot capacity; legal policy wording; support representative phone and ticket destination.

Provider shortlist and primary integration references are in PAYMENT_CANDIDATES.md. These are candidates, not approved or enabled gateways.
