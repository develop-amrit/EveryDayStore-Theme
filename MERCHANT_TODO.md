# Merchant setup — EverydayStore

Target store: everydayyplus-8ksmkrmq.myshopify.com. Theme source: develop-amrit/EveryDayStore-Theme on GitHub. Theme code and configuration changes must go through GitHub; main deploys immediately. Do not upload theme files directly or publish another theme.

Checkout follow-up: see D:/ep-reports/owner-todo.md and checkout-report.md. Three new delivery rates exist, but the old Arabic AED 25 method could not be deactivated through the connected API. Deactivate that legacy method in Shipping and delivery without deleting it. Checkout branding API access was denied; everyday-checkout-logo.png is prepared in Content → Files for manual application. Verify Part A payment/contact settings and Notifications sender/order-confirmation settings. Live order tests require inventory ≥5; the current maximum is4. No inventory adjustment was made.

1. **Policies (checkout retry blocked):** the new checkout batch retried shopPolicyUpdate and was refused for missing write_legal_policies. Paste the four prepared files from D:/ep-reports/policies/ into Settings → Policies and save. Existing Privacy Policy is preserved. Missing links remain hidden.
2. **Inventory:** review the new store's stock. The catalogue has few available products, so homepage rails with fewer than four eligible products hide themselves. Check Baby Products and Diapers & Wipes stock and assignments. Optionally create a Baby care in-stock collection and select it through the GitHub configuration workflow. Do not change inventory just to populate the layout.
3. **Deals:** the restored compare-at product is currently out of stock, so the stock-only Deals page can correctly remain empty. Add genuine discounts only when supported by merchant pricing data. The additional draft product asin-b0h467cs2v was deliberately excluded at the owner's request.
4. **Catalogue hygiene:** set any remaining [TEST] products to Draft and test collections to Unpublished. Theme exclusions are a safety net. Keep all real categories, including empty ones, linked in everyday-catalogue.
5. **Bath & Body assignments:** review conditions and catalogue tags; the reference catalogue includes diaper pants and baby products in this department. The approved image fallback consequently uses a Huggies photo. Correct the catalogue or provide an appropriate real product-photo override through GitHub. Do not alter product tags without merchant review.
6. **Collection photos:** all 116 real catalogue collections now have product photos. Review the department-representative fallbacks in D:/ep-reports/collection-images-plan-3.csv and replace them with more specific real photography when available. No real collection image remains blank.
7. **Help menu and content:** create a Help menu with Delivery areas, Order cut-off, FAQs, Returns and Contact. Use existing real page/policy URLs, then assign the menu through the GitHub theme configuration workflow. Do not link to missing /pages/* policy URLs.
8. **Social media:** supply the real social URLs in theme configuration through GitHub. Social icons stay hidden when URLs are blank; WhatsApp can also supply the area-picker contact link.
9. **Currency formatting:** keep HTML and email money formats as AED {{amount}} and Show currency codes off. Visible theme prices use the dirham font; checkout, email and Shopify-hosted account pages keep AED because they do not load theme fonts.
10. **Search filters:** in Apps → Shopify Search & Discovery → Filters, enable Availability, Price and Product vendor/Brand; optionally Product type. The theme uses Shopify's real facet data.
11. **Collection promo banners:** in Settings → Custom data → Collections, define custom.promo_image (File, images only), custom.promo_link (URL), and custom.promo_alt (single-line text). Banners remain hidden without real uploaded artwork. Suggested size: 1200×600, 2:1.
12. **Hosted sign-in branding:** set the logo and colours in Settings → Customer accounts. Storefront theme code cannot brand Shopify-hosted sign-in pages.
13. **Reviews:** install/configure a reviews app writing standard reviews.rating and reviews.rating_count metafields if stars are wanted. No ratings are invented.
14. **Seasonal change:** replace Get festive-ready with the prepared National Day content after mid-November, before 2 December, through the GitHub theme configuration workflow. No automatic publishing is scheduled.
15. **Family-focused merchandising:** review intimate/sexual-wellness products before applying homepage-hide or changing collection order. Homepage exclusions do not remove products from direct URLs or search. No product tags were changed by the restoration.

## Optional product photography to replace auto images

Uploaded images take precedence. Use real product photos or permitted product clusters; use brand logos only with supplier permission. Empty categories remain reachable.

| Placement | Brief | Size |
|---|---|---|
| Hero | Product cluster, transparent PNG | 800×800 |
| Carousel | Lifestyle or product cluster, 4:3 | 1200×900 |
| Seasonal tiles | Single product/small cluster, transparent PNG | 600×600 |
| Campaign header | Real product composition, 16:9 | 1200×675 |
| Shop by Store tiles | Product photo/cluster, transparent PNG | 300×300 |
| Brand tiles | Product photo, 3:4 | 600×800 |
| Festive promo bubble | Product/campaign photo | 200×200 |

Detailed change logs, exports, plans and QA evidence remain in D:\ep-reports, outside this repository.

## Fix Prompt 3 audit

- All 486 products were already ACTIVE and published to Online Store at the audit; 88 had stock. No status or publication writes were necessary. The rejected extra compare-at update remains excluded.
- One catalogue menu apostrophe was repaired; collection handles and links were preserved.
- No further suitable product photos were found under the permitted own/child/matching-parent rules. The 52 outstanding real collection handles are listed in D:/ep-reports/collection-images-skipped-3.json. Provide matching real product photography when available; existing photos were preserved.
- Brand tile product photos may show sold-out products as brand imagery; their vendor pages offer stocked alternatives.
