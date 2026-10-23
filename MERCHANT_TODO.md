# Merchant setup — theme 189582049393

**First: Add Terms of service, Refund policy and Shipping policy in Admin → Settings → Policies.** The cart’s terms checkbox depends on the Terms of service policy. Homepage policy row correctly shows existing policies only.

1. **Currency formatting:** Admin → Settings → Store details → Store defaults → Currency display → Change currency formatting: set all four fields (HTML with currency, HTML without currency, Email with currency, Email without currency) to `AED {{amount}}`. Keep Show currency codes off. The homepage uses the active currency code with Shopify’s numeric money filter until these store formats are corrected.

2. **Menus:** Admin → Content → Menus: move Baby Products and Gifting above Grocery in Shop/catalogue and Trending searches Categories menus. Create Help with Delivery areas, Order cut-off, FAQs (/#ep-home-faq), Returns and Contact (/pages/contact); create/publish delivery and cut-off content or select an existing real policy URL, then assign Footer → Help menu. Do not use missing /pages/* policy URLs.
3. **Policies:** fill missing policies in Admin → Settings → Policies. Homepage displays only policies with content using their /policies/ URLs.
4. **Social media:** add actual social URLs in Theme settings → Social media. The row hides while all are blank; WhatsApp also supplies the area-picker no-match contact link.
5. **Pantry Staples:** replace the incorrect clothing collection image in Admin → Products → Collections, or add a Category grid image override targeting its collection URL. Every configured collection stays linked, including empty collections.
6. **Seasonal change:** Get festive-ready is enabled for Diwali/the current season. Swap to the disabled Celebrate National Day section after mid-November, ahead of 2 December. This is a manual editor change, not an automatic scheduled publish.

## Optional replacement images — auto mode is active now

Uploaded images win over real product auto images. Empty collections keep the designed tinted category icon and Soon pill; no fake artwork or prices are used.

| Placement | Brief | Size |
|---|---|---|
| Hero | Product cluster, transparent PNG | 800×800 |
| Carousel | Lifestyle or product cluster, 4:3 | 1200×900 |
| Seasonal tiles | Single product/small cluster, transparent PNG, 1:1 | 600×600 |
| Campaign header | Product composition, 16:9 | 1200×675 |
| Store tiles | Simple illustrated icon, transparent PNG, 1:1 | 300×300 |
| Brand tiles | Product photo, 3:4; supplier permission needed for logos | 600×800 |
| Promo bubble | Product/campaign image, 1:1 | 200×200 |

Ferrero Rocher was skipped because that exact vendor is absent; the catalogue uses Ferrero. No substitute branded tile was invented. Standard review metafields remain optional for stars.

## Homepage merchandising
Tag intimate and sexual-wellness products `homepage-hide` in Admin, or reorder the Care/Bath & Body collection so these products are not first. Homepage rails, grids and auto-image collections skip the configured tags; collection/search pages keep all products. The theme does not tag catalogue products automatically.

## Category panel and menu cleanup
The new panel uses Baby Products plus Gifting, Grocery, Bath & Body, Home, Pet and Office Supplies. Upload transparent product clusters to replace auto images if desired. The earlier optional All Products menu cleanup is superseded by the Categories rule to retain collection links; no menu deletion was performed. Theme code preserves menu links and does not edit Admin menus.

## Image-less published Diapers & Wipes products
Historical audit (22 October): published Diapers & Wipes products then lacked images. The current 23 October catalogue now supplies real product photos, and the category tile uses that fallback successfully. An uploaded collection/category image remains optional. Draft products are never exposed. No collection is hidden or unlinked.

## Dirham symbol and platform limits
Store HTML formats may stay `AED {{amount}}`; theme-rendered visible prices use the supplied dirham font. Keep email money formats `AED {{amount}}`, since email clients do not load theme fonts. Shopify checkout keeps AED because it does not load theme fonts. Shopify-hosted customer account/order pages likewise cannot load storefront theme assets; verify those separately in the account customization surface. Classic customer templates are not present in this theme. No checkout or email code was changed.

## Categories and collection browser
In Admin → Settings → Custom data → Collections, create definitions first: `custom.promo_image` (File, images only), `custom.promo_link` (URL), `custom.promo_alt` (single-line text). Then select a collection, upload/select its promo image and fill the optional link/alt. The collection browser reads these fields; metafields win over a matching section Promo banner block. Banner is hidden without uploaded artwork, never auto-generated. Optional banner image: 1200×600, 2:1.
In Shopify Search & Discovery, enable storefront Availability, Price and Vendor/Brand filters if not already enabled. The browser uses real `collection.filters`; it cannot create these filters in theme code.
Categories directory groups reuse the catalogue menu with a department source; keep each department’s second-level and third-level menu links configured. Unmapped real collections remain visible under More collections. No collection is hidden because it is empty.

Current Categories QA: Shopify exposes Availability and Price facets. Vendor/Brand is not enabled yet; enable that facet in Search & Discovery to make it appear automatically. Optional promo artwork is not configured, so collection banners correctly remain hidden.
