# New-store catalogue visibility — 2026-10-24

Target: `everydayyplus-8ksmkrmq.myshopify.com`. Live theme
`EveryDayStore-Theme/main` (`191136825619`) is connected to GitHub `main`.
Changes are prepared on `fix/new-store-catalogue`; updating `main` changes the
live storefront and requires the owner's override of the saved unpublished-only
deployment instruction. No theme creation, role switch or publication is needed.

## Cause

The new store has only the `frontpage` collection. The migrated homepage selected
department handles such as `baby-products` and `grocery`, which do not exist here.
The built-in `all` handle was also listed among hidden collections.

At diagnosis, 178 products were active and published, all with zero inventory;
308 products were drafts. Homepage rails discarded unavailable products and hid
the section below four cards. Collection/search entry, AJAX navigation and sort
requests additionally forced `filter.v.availability=1`. Changing handles alone
would therefore still leave the catalogue empty.

## Change

- Bind all 53 homepage collection selections to Shopify's dynamic `all` handle
  (44 previously selected other handles), and route old collection links to it.
- Set the cart's collection fallback to `all` and remove `all` from hidden handles.
- Add **Show sold out products in the catalogue**, enabled for this store and
  disabled by default for existing installations. It allows homepage cards and
  category imagery to use unavailable products, and removes the automatic
  in-stock-only default from collection/search browsing.
- Respect explicit stock filters. Keep sold-out purchase buttons disabled,
  purchase recommendations in stock only, and deal eligibility based on actual
  compare-at prices. No product status, stock quantity or price is changed.

## Validation

Shopify Theme Check: **0 errors, 15 existing warnings**. JavaScript syntax and
`git diff --check` pass. The bundled skill theme validator could not run because
its `@shopify/theme-check-common` dependency is missing; official Theme Check was
used and the limitation is recorded here.

Eleven local integration checks rendered the actual Liquid card/image snippets
against real imported product records. They reproduced the previous zero-card
result and verified four visible zero-stock products with disabled Sold out
buttons, legacy in-stock behavior, genuine discounts, image clusters, all handle
bindings, initial URL policy and the real collection controller's sort/filter
policy. Shopify-only documentation/pagination wrappers were removed for this
four-product LiquidJS fixture; this is not a claim of a deployed browser test.

The underlying import is complete: **486 products, 3,801 gallery references**.
ASIN/SKU, prices, gallery IDs/order, image readiness and titles were read back.
The merchant's 178 activations were preserved; remaining products stay drafts.
All 4,508 matched local image outputs passed integrity checks.
