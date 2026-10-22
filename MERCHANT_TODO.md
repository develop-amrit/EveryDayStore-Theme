# Merchant setup before publishing

Review unpublished theme 189582049393 in Admin → Online Store → Themes. Publish manually only after review.

Outstanding release gates: Lighthouse performance/LCP targets are not met, and interactive Admin editor testing remains unverified because the connected browser runtime failed. See WORKLOG.md before publishing.

- Upload hero product artwork (transparent PNG optional), seasonal six tile images/artwork, Shop by store icons, campaign images and brand ads. Campaign and both brand rows are disabled; image-less seasonal/store sections hide on storefront.
- Configure optional bottom-nav promo bubble image/link/label; upload tab icons if desired (existing outline icons are supplied). Add a Deals navigation item only after selecting a verified offers collection.
- Choose an actual sale/offers collection for Best deals. Recommend an automated collection whose compare-at price exceeds price, with discounts checked against Shopify variant data. No collection was invented.
- Create dedicated category menus and select them per group. Exact links below come from the existing catalogue tree; theme code cannot create menus. The Baby group temporarily uses existing sample-baby-care.

## Grocery menu

- Pantry Staples → /collections/grocery-pantry-staples
- Breakfast & Spreads → /collections/grocery-breakfast-and-spreads
- Snacks & Confectionery → /collections/grocery-snacks-and-confectionery
- Canned, Packaged & Ready Foods → /collections/grocery-canned-packaged-and-ready-foods
- Beverages → /collections/grocery-beverages
- Healthy & Specialty Foods → /collections/grocery-healthy-and-specialty-foods
- Dairy & Eggs → /collections/grocery-dairy-and-eggs
- Fresh Produce → /collections/grocery-fresh-produce
- Frozen Foods → /collections/grocery-frozen-foods
- Baby Food → /collections/grocery-baby-food

## Baby Products menu

- Diapers & Wipes → /collections/baby-products-diapers-and-wipes
- Feeding & Nursing → /collections/baby-products-feeding-and-nursing
- Baby Food & Formula → /collections/baby-products-baby-food-and-formula
- Bath, Skincare & Grooming → /collections/baby-products-bath-skincare-and-grooming
- Health & Safety → /collections/baby-products-health-and-safety
- Nursery & Bedding → /collections/baby-products-nursery-and-bedding
- Baby Gear & Travel → /collections/baby-products-baby-gear-and-travel
- Baby Toys → /collections/baby-products-baby-toys
- Maternity & Postpartum → /collections/baby-products-maternity-and-postpartum

## Gifting menu

- Flowers & Bouquets → /collections/gifting-flowers-and-bouquets
- Chocolates & Treats → /collections/gifting-chocolates-and-treats
- Hampers & Gift Sets → /collections/gifting-hampers-and-gift-sets
- Soft Toys & Gifts → /collections/gifting-soft-toys-and-gifts
- Fragrances & Candles → /collections/gifting-fragrances-and-candles
- Gift Cards & Personalized Gifts → /collections/gifting-gift-cards-and-personalized-gifts
- Balloons & Decorations → /collections/gifting-balloons-and-decorations

## Bath & Body menu

- Bath & Body Care → /collections/bath-and-body-bath-and-body-care
- Skincare & Face Care → /collections/bath-and-body-skincare-and-face-care
- Hair Care → /collections/bath-and-body-hair-care
- Makeup & Cosmetics → /collections/bath-and-body-makeup-and-cosmetics
- Fragrances & Deodorants → /collections/bath-and-body-fragrances-and-deodorants
- Personal Hygiene → /collections/bath-and-body-personal-hygiene
- Men’s Grooming & Shaving → /collections/bath-and-body-mens-grooming-and-shaving
- Sexual Wellness → /collections/bath-and-body-sexual-wellness

## Home menu

- Cleaning & Laundry → /collections/home-cleaning-and-laundry
- Cleaning Tools & Pest Control → /collections/home-cleaning-tools-and-pest-control
- Paper & Household Essentials → /collections/home-paper-and-household-essentials
- Storage & Organization → /collections/home-storage-and-organization
- Kitchen & Cookware → /collections/home-kitchen-and-cookware
- Food Storage & Wraps → /collections/home-food-storage-and-wraps
- Disposables → /collections/home-disposables
- Bathroom Essentials → /collections/home-bathroom-essentials
- Home Fragrance → /collections/home-home-fragrance

## Pet menu

- Dogs → /collections/pet-dogs
- Cats → /collections/pet-cats
- Other Pets → /collections/pet-other-pets

## Office Supplies menu

- Paper & Notebooks → /collections/office-supplies-paper-and-notebooks
- Writing & Stationery → /collections/office-supplies-writing-and-stationery
- Filing & Organization → /collections/office-supplies-filing-and-organization
- Desk Essentials → /collections/office-supplies-desk-essentials
- Mailing & Packaging → /collections/office-supplies-mailing-and-packaging
- Presentation Supplies → /collections/office-supplies-presentation-supplies

## Footer and search links

Create Help menu: Delivery areas → existing shipping page; Order cut-off → approved delivery information; Contact → /pages/contact; FAQs → homepage FAQ anchor; Returns → approved returns policy. Confirm policy URLs before assigning. Current Help temporarily uses main-menu (Home/Catalog/Contact). Shop uses catalogue. Trending uses catalogue; Popular uses editable occasion terms. Add real brand links if wanted.

## Reviews and copy

No standard reviews.rating or reviews.rating_count data found in audited active products. Rated cards hide stars unless both values exist. If stars are wanted, configure a supported review integration that writes standard reviews.* metafields and verify its data.

Original trust/FAQ claims are preserved; owner should approve quality/returns wording and final shipping/payment policies. The custom checkout/delivery backend limitations documented in docs/ORDERING_POLISH.md still apply. No UI change enforces shipping eligibility.

Set social links/WhatsApp in Theme settings; optional cart auto-open defaults off. Configure collection tile image overrides for any categories without a real featured image.

## Help menu — required after correction 4

No Help menu exists (confirmed from current Shopify menus). Create a menu and assign it to the footer Help block: Delivery areas → /pages/shipping-policy; Order cut-off → /pages/shipping-policy (existing delivery information); FAQs → /#ep-home-faq; Returns → /pages/refund-policy; Contact → /pages/contact. The unrelated main-menu is no longer labelled Help. Social URLs are currently blank; icons hide until configured in Theme settings, including new LinkedIn and existing WhatsApp settings.

## Images still needed

- Seasonal grid: upload six tile images and optional artwork/background; image-less tiles stay hidden.
- Campaign: upload offer images and optional partner logo/heading art, then enable the section.
- Brand tiles: upload portrait brand/ad images, links and alt text, then enable either row.
- Promo bubble: add an image, link and optional label in Bottom navigation.
- Shop by Store: upload each store icon/illustration; image-less store blocks remain hidden.
- Collection category tiles: upload collection images or configure image overrides for any child collections without a product-image fallback; these tiles now hide rather than show generic icons.

## Deals resolution

Owner chose the theme-only discounted All products view because no sale/offers collection exists. Deals is now connected and renders real discounted products; creating a separate offers collection is optional, not required for this draft.
