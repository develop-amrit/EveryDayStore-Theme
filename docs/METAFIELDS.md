# Merchant-owned metafield definitions

Create definitions first: Settings > Custom data > Products > Add definition; select the exact namespace/key/type below and enable storefront read access only for public product data. Then enter values on each product under Metafields (bulk editor is suitable). Finally the theme reads typed .value. No app-owned TOML or runtime definition mutations are needed for these merchant-owned theme fields. Do not store secrets or customer data in product metafields.

| Owner / namespace.key | Type | Purpose and value entry |
|---|---|---|
| Product custom.show_when_sold_out | boolean | Default false; true only for retained real sell-outs; AVAILABILITY_FLOW.md. |
| Product custom.sold_out_at | date_time | Trusted Flow/backend sets event timestamp; lifecycle/retention automation. |
| Product custom.pack_size | single_line_text_field | Actual pack/weight label; no fabricated defaults. |
| Product custom.is_on_sale | boolean | Trusted app/Flow recomputes from an available variant with compare_at_price > price; promotion filter. |
| Product custom.discount_percent | number_integer | Highest eligible real variant percentage; optional search-index ranking input, not native Liquid sorting. |
| Product custom.specifications | json | Public key/value technical or grocery specs for comparison. |
| Product custom.features | list.single_line_text_field | Public feature list. |
| Product custom.category_attributes | json | Public category comparison map; use separate scalar fields below for native filtering. |
| Product custom.related_products | list.product_reference | Search & Discovery fallback; only actual product references. |
| Product custom.complementary_products | list.product_reference | Complementary/bought-together fallback. |
| Product custom.dietary | list.single_line_text_field | Grocery dietary claims confirmed from actual packaging. |
| Product custom.origin | single_line_text_field | Country of origin, if supplied. |
| Product custom.age_range | single_line_text_field | Baby stage / suitability, manufacturer verified. |
| Product custom.skin_type | list.single_line_text_field | Bath/body suitability. |
| Product custom.pet_type | single_line_text_field | Dog/cat/other. |
| Product custom.material | single_line_text_field | Home/office material. |
| Product reviews.rating | rating | Standard review-app-owned aggregate; use the installed app's definition, do not overwrite it. |
| Product reviews.rating_count | number_integer | Published review count from the review app. |
| Customer custom.wishlist | list.product_reference | Optional secured backend source of truth only; do not expose via public Storefront access. Backend may use its own database instead. |
| Order custom.delivery_status | single_line_text_field | Private order state enum: confirmed, processing, packed, out_for_delivery, delivered. |
| Order custom.delivery_photo | file_reference | Private delivery proof; never publish to Storefront product/public metaobjects. App-controlled authenticated access only. |

For customer/order fields: Settings > Custom data > Customers or Orders > Add definition. Enter through Admin/trusted app; retrieve only in authenticated backend/customer-account extension. Do not assume file_reference provides access control for a permanent CDN URL: keep evidence private in backend object storage and return short-lived signed URLs to the verified order owner; an order metafield can hold an internal reference instead.

Filter setup: Apps > Search & Discovery > Filters > Add filter. Enable Vendor (brand), Price, Availability, custom.is_on_sale and the appropriate scalar/list fields/options. JSON specs are for comparison, not supported native filter sources. Filters use Shopify-generated parameter names; no invented filter.v2 URL or compare_at_price filter is used. Best-selling/newest/price use collection.sort_options; search uses search.sort_options. Global discount sorting requires an indexing/search app; it is not implemented as misleading page-local sorting.

Safe Liquid examples after definitions and values exist: product.metafields.custom.show_when_sold_out.value; product.metafields.custom.pack_size.value; product.metafields.custom.related_products.value. Metafield keys named size/first/last need bracket notation; pack_size avoids that collision.

