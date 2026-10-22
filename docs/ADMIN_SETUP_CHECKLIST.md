# Shopify Admin setup checklist

Catalogue update (2026-10-21): the 122 collections, Catalogue menu and Categories page are now created remotely; see CATALOGUE_GUIDE.md for verified status and remaining steps. Other unchecked items below still require configuration. Labels can vary slightly by Shopify Admin release or installed app. The connected account type is new customer accounts; guest checkout is currently allowed. Confirm the plan in Settings > Plan (last reported Basic).

## Foundation and catalogue

- [ ] Settings > Store details: retain EverydayyPlus, confirm business identity, Dubai address, AED. Settings > Markets: UAE/Dubai operating scope; Settings > Languages: English. Market selection alone does not enforce Dubai neighbourhoods.
- [ ] Settings > Locations: use the single Dubai warehouse, activate online fulfilment and verify inventory tracking on every sellable variant. No WMS integration is assumed.
- [x] Products > Collections: created the 122 handles in COLLECTIONS_TO_CREATE.md. Assign real products using the documented category tags. Baby Food entries remain separate pending confirmation of shared handling; no duplicate SKUs were created.
- [x] Content > Menus: Catalogue (catalogue) created following CATALOGUE_MENU.json, max 3 levels. Link nodes to collections, not custom product lists. Choose that menu in Theme settings > Storefront and delivery. Create separate support/legal footer menus without repeating catalogue navigation.
- [ ] Settings > Custom data: create the definitions in METAFIELDS.md before entering values. Apps > Search & Discovery > Filters: enable vendor, price, availability, promotion boolean, and category-specific fields/options. Recommendations: configure related/complementary choices from real products.
- [ ] Content > Pages: create Wishlist (wishlist, page.wishlist), Compare (compare, page.compare), Categories (categories, page.categories), Buy again (buy-again, page.buy-again), Track order (track-order, page.track-order). Template files do not create page records.

## Accounts and checkout

- [ ] Settings > Customer accounts: retain new customer accounts, show sign-in links and configure hosted branding/account menu. Addresses, order details and digital order records live in the hosted account interface. Install the required account extension/app for custom wishlist, reorder, status timeline and authorized proof-of-delivery display.
- [ ] Settings > Checkout: keep the option requiring sign-in before checkout OFF. Verify an ordinary guest checkout and an account checkout.
- [ ] Settings > Policies: publish merchant-approved Terms, Privacy, Refund and Shipping policies; replace all FINAL WORDING REQUIRED placeholders. Set the theme Terms version to the published version.
- [ ] Install/configure a compatible public checkout validation app on Basic for Dubai-zone/reservation/terms enforcement; a custom Function requires Plus. There is no universal native required T&C checkbox setting. The theme cart checkbox can be bypassed by direct/accelerated checkout and is insufficient by itself.

## Exact delivery rates

Settings > Shipping and delivery > Shipping profiles > General profile (and every custom profile) > Manage rates:

1. Confirm the Dubai warehouse fulfils all applicable products.
2. Configure the actual supported destination using the approved local-delivery/zone/validation app mechanism. A country zone for United Arab Emirates alone permits more than Dubai.
3. Add flat rate **Next-day delivery**, price **5.99 AED**, add conditions based on order price: minimum **0**, maximum **48.99**.
4. Add flat rate **Next-day delivery**, price **3.99 AED**, order price minimum **49**, maximum **98.99**.
5. Add flat rate **Next-day delivery**, price **0 AED**, order price minimum **99**, no upper maximum.
6. Remove unintended overlapping/general/international rates and unintended small-order fees. A country/province rate alone does not validate individual neighbourhoods; install the zone enforcement described above.
7. Match theme thresholds 49/99 and fees 5.99/3.99. Test 48.99, 49.00, 98.99, 99.00; discounts, tax inclusivity, excluded products and mixed profiles can alter checkout rate matching or combine shipping fees. Match the cart display's discounted subtotal basis to the actual Admin configuration before launch.
8. Configure confirmed cut-off, holidays, supported areas and capacity in the scheduling app/backend. Connect slots_endpoint and enable mandatory booking only when server enforcement is installed and tested. Never enable preview mocks on a live store.

## Payments, VAT, receipts

- [ ] Settings > Payments > Manual payment methods > Cash on Delivery: enter additional details and payment instructions; Activate. Confirm no unwanted surcharge. Enable theme COD reassurance only after this is operational.
- [ ] Settings > Payments: choose an actually listed UAE-supported card/wallet gateway appropriate to this legal entity. Shortlist the providers shown in the store's Admin; do not assume Shopify Payments or any particular processor is approved. Verify settlement currency, wallets, fees, 3DS and refunds with the provider.
- [ ] Settings > Payments > Add payment methods: evaluate **Tabby** and **Tamara**, subject to UAE merchant/category/provider approval. Complete provider integration in Shopify/app settings; never paste provider API keys into a theme setting. BNPL message is OFF until approved. Bank/card offers must come from approved provider/discount configuration, not a fake theme discount.
- [ ] Settings > Taxes and duties > United Arab Emirates: confirm VAT registration, collection, product taxability and whether displayed prices include tax with the merchant/accountant. No VAT amount is fabricated by the theme; checkout calculates tax.
- [ ] Settings > Notifications > Customer notifications > Order confirmation: review digital receipt content in Edit code and send a test. Include shop/order identity, order date, item/variant/quantity, discounts, subtotal, delivery charge, VAT/tax lines from Shopify, totals/currency, payment status, billing details as legally necessary, delivery date/slot from order attributes and a secure order-status/account link. Do not include proof photos, OTPs, tokens or private backend links in notification templates.
- [ ] Install a tax-invoice app or configure an appropriate Order Printer/invoice workflow if legal invoice numbering/TRN/PDF requirements are not met by the order confirmation. Obtain VAT/invoice approval; no paper invoice is assumed.

## Notifications, support and retention

- [ ] Settings > Notifications: configure sender domain, order/fulfilment/delivery messages and test. Map backend status changes to the approved channels; do not send duplicate native and app notifications for the same event.
- [ ] Select an approved SMS/WhatsApp provider/app, templates and opt-in model. Configure credentials only server-side. Final event triggers, language and timing remain TBD. Restock alerts need their own channel-specific consent.
- [ ] Marketing > Automations: inspect Abandoned checkout automation (and installed marketing app equivalents), set consent/eligibility/delay/channel and incentives only after merchant decisions. Test unsubscribe and suppression after conversion.
- [ ] Configure the helpdesk/Shopify Inbox route, human support phone, verified tracking endpoint, account wishlist/reorder integration and ai_endpoint. AI is not connected without a backend. Store secrets in the app environment, not theme files.
- [ ] Settings > Customer privacy: configure consent banner/regions and published Privacy Policy; use one banner implementation, not conflicting Shopify and theme banners. Verify accept/reject/manage with Customer Privacy API and installed apps. No tracking is added by this theme build.

## Sources checked 2026-10-20

- [Shipping rates setup](https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/setting-up-shipping-rates)
- [Manual payment methods](https://help.shopify.com/en/manual/payments/manual-payments)
- [Provider availability](https://help.shopify.com/en/manual/payments/third-party-providers/payment-gateway-availability)
- [Tabby integration](https://tabby.ai/en-AE/help-business/selling-with-tabby/integrating-with-tabby)
- [Tamara Shopify integration](https://docs.tamara.co/docs/shopify)
- [Functions availability](https://shopify.dev/docs/apps/build/functions)

## Preview and release

CLI was unavailable at build time. After installing Shopify CLI, use PowerShell from D:\shopify-store-editor:

```powershell
shopify auth login
shopify theme check
shopify theme dev --store 3djevx-mu.myshopify.com
```

Run the dev command in a dedicated PowerShell window and keep it open. Open http://127.0.0.1:9292 (or the address the CLI prints). Do not use --theme or --environment codex-edits for the temporary dev preview. It must not overwrite the live theme. Authentication may also be prompted by theme dev itself.

Only AFTER a new explicit approval following preview review:

```powershell
shopify theme push --unpublished --store 3djevx-mu.myshopify.com
```

That creates a NEW unpublished theme. Do not publish automatically. This full build has not been uploaded or published; previous deployment approval does not apply to these new changes.

See PAYMENT_CANDIDATES.md for the verified integration shortlist (Telr, PayTabs, Checkout.com; Tabby/Tamara for BNPL). Availability and UAE merchant approval must be confirmed in this store.

Catalogue page record: Categories (categories, page.categories) has been created. Verify the remaining page records separately. The catalogue menu is selected in the unpublished review copy only.
