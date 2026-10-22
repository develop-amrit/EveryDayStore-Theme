# Product import — 21 October 2026

Completed for 3djevx-mu.myshopify.com. The Products worksheet contains **85 unique ASINs, not 89**. All 85 are imported: **67 ACTIVE and published to Online Store, 18 DRAFT**. Twelve existing drafts were updated; 73 products were created. No duplicate imported ASINs were found.

## Sources and pricing

- Product titles, descriptions, pack information and specifications: product-list/category_samples.xlsx.
- Prices, listed discount prices, SKU/barcode and warehouse stock: product-list/Inventory Data-5.xlsx. Discount price becomes the selling price; regular price becomes compare-at price only when a real lower discount exists. All prices are AED.
- All 85 matched the inventory workbook. For five duplicate MF/FBC offers, the single seller-managed MF offer was selected; the two fulfilment channels were not added together.
- Inventory is tracked with overselling disabled at the existing active location **Gole Market**. Its name/address were not changed.
- 497 gallery images are READY on Shopify CDN. 479 correspond to local ASIN image files. Three missing folders (B0FHW2GLMK, B0FMYL2WLB, B0DDC5SK52) use their 18 workbook image URLs. When local image transfer stopped working, remaining local files were matched to the identical workbook image URL by the scraper's numbered-file mapping and uploaded from that URL.
- Source workbooks and local image files are unchanged. Amazon seller/delivery details, ratings and review counts were not imported. Product specifications remain source data and should be checked by the merchant.

## Categories

Products feed the existing automated catalogue collections and navigation via catalogue tags. There are 28 populated second-level categories, with third-level tags on 39 products where the source identity was clear. Category labels/architecture are retained.

| Department | Imported | Published |
| --- | ---: | ---: |
| Grocery | 17 | 14 |
| Baby Products | 13 | 6 |
| Gifting | 3 | 3 |
| Bath & Body | 24 | 20 |
| Home | 15 | 13 |
| Pet | 3 | 3 |
| Office Supplies | 10 | 8 |

Source classification corrections: three children's shampoos moved to Hair Care; talcum powder moved from Baby Toys to Baby Bath, Skincare & Grooming; Red Label tea moved to Beverages; Post-it notes moved to Desk Essentials. Baby Food cross-listing was not changed without the merchant's confirmation.

## Drafts needing identity confirmation

These nine retain the inventory price/stock but are not available for sale. Confirm the actual pack and replace mismatched source content/images before activation.

| ASIN | Inventory SKU | Reason |
| --- | --- | --- |
| B07PKTSGS4 | MF-9604 | Inventory 170ml; ASIN 175ml |
| B0F61WZYWJ | MF-5662 | Inventory 400g; ASIN 2 x 500g |
| B01COTTTYM | MF-8901207900839 | Inventory Regular and Imli combo; ASIN Regular only |
| B09X19QQG6 | MF-1946491 | Inventory 500ml; ASIN 200ml |
| B08M4159K6 | GR-EOPO-5NER | Inventory EDT; ASIN EDP |
| B07MM6B6M5 | FlexVeetCream100g*2 | Inventory 2 x 100g; ASIN single 200g |
| B0BR2NSN3J | MF-HIT400MLX2 | Inventory citrus multi-insect spray; ASIN red cockroach/crawling spray |
| B073ZBTFN4 | MA-9TIW-80BH | Inventory 14-digit calculator; ASIN model requires confirmation |
| B07ZTWDZD2 | MF-1642377 | Inventory Wall-Safe tape; ASIN mixed three-dispenser bundle |

## Drafts with no stock

These nine are not marked as recently sold out, because there is no purchase history establishing that condition. Set warehouse stock and activate/publish them in Admin when ready.

- B00EVIS0CW — Huggies Natural Care Unscented Baby Wipes- 168 Count (B00EVIS0CW)
- B07DP24NSR — Pampers New Diapers Pants with Aloe Vera (B07DP24NSR)
- B083JDBXHV — Pampers Aqua Pure Baby Wipes Made with 99% Pure Water (B09841TPC1)
- B0FHW2GLMK — Huggies Signature Hug Pack Diaper Backpack (B0D8CVL2GJ)
- B0FMYL2WLB — Huggies Signature Hug Weekender Tote Diaper Bag (B0D8CPR47V)
- B0DDC5SK52 — HUGGIES womens HGAW COZY HUGG PACK Diaper Backpack (pack of 1) (B0D8CRMJHN)
- B0FX418XT8 — Arencia Vitamin C Booster Shot Serum with Glutathione (MF-8809562192770)
- B07T3FDN3Q — Johnson's Toddler Kids Shampoo Shiny Drops Argan Oil 500ml (MF-1635307)
- B07PCFLHV5 — Vanish Liquid Fabric Stain Remover 1.8L for White clothes (MF-1041863)

## Theme and homepage

The same store-wide catalogue is available to both themes. Only the existing unpublished **codex-edits2 (189518545009)** received templates/index.json: seven distinct department product rows, updated general-store hero/promo copy, and removal of old sample-only footer links. Existing section styling is retained. The seven department collections now default to newest first to put newly imported products before older sample stock.

The live **codex-edits (189489545329)** theme was not edited or published. Its homepage template update is queued in THEME_SYNC_STATE.json along with the earlier UX batch. A theme role switch does not trigger automatic background sync. Older catalogue/test products outside this 85-item import remain unchanged.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009

## Verification

Shopify API read-back checked every imported SKU, barcode, selling/compare price, stock, tracked inventory, expected status, Online Store publication, category tags and exact gallery count; all 497 media are READY. No imported ASIN is duplicated. Structural checks pass for theme JSON, section schemas, translations, references and JS syntax. Full official Theme Check remains unavailable: Shopify CLI is missing in this shell, and the bundled validator lacks @shopify/theme-check-common.

Browser checks: populated category with sidebar; seven homepage product rows; imported product details/photo/discount; Add and Remove via AJAX. Basket returned to its original two items, AED 482.00. No checkout/order/payment was submitted. Existing shipping, payment, policy and backend limitations in ORDERING_POLISH.md still apply.

## Merchant guide

Manage products in Shopify Admin > Products. Add images, SKU/barcode, AED price/compare price and inventory at the fulfilment location. Use the appropriate catalogue:<collection-handle> tag (see CATALOGUE_MENU.json/collection rules); the automated collection then includes the product. Set Active and publish to Online Store when ready. Homepage shelves select collections in Online Store > Themes > Customize. Draft/archive/unpublish a product to remove it from sale; deleting is optional. Review all draft reasons and Admin product links in PRODUCT_IMPORT_REVIEW.csv.
