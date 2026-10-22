# Catalogue setup and merchant guide

Updated 2026-10-21. Store: 3djevx-mu.myshopify.com.

## What is ready

- 122 automated collections, published to the Online Store sales channel.
- Catalogue menu (handle catalogue): 123 items, including All Products, in your supplied order and a maximum of three levels.
- 39 existing active baby-care products classified: 34 diapers/pants and five changing/bed mats. Only nine were in stock at setup; active does not necessarily mean available. No products, prices or inventory were invented or changed.
- A Categories page and improved department icons, category navigation and honest empty states.
- Existing live theme remains codex-sample-sections (189504290929). Theme edits are on the unpublished codex-catalogue-navigation copy (189518545009). Collections, product tags, menus and the Categories page are store-wide Admin resources.

## Review

- Homepage: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009
- Categories: https://3djevx-mu.myshopify.com/pages/categories?preview_theme_id=189518545009

The Admin API confirmed the collection rules, publication, menu links and uploaded files. Browser access was unavailable, so visual rendering and interaction on this new copy are unverified. Official Theme Check could not run because the CLI is absent and the bundled validator dependency is missing. The local structural checker passed. The review theme has not been published.

## Add a product

1. Shopify Admin > Products > Add product: enter its real title, images, variants, AED prices, inventory and shipping information.
2. Set it Active and make it available to Online Store when ready to sell.
3. Add the category tag from COLLECTIONS_TO_CREATE.md. For example, catalogue:grocery-pantry-staples-rice automatically includes the product in Rice, Pantry Staples and Grocery.
4. In Online Store > Themes > codex-catalogue-navigation > Customize, choose the relevant collection in each product section. Products in that collection appear automatically, subject to stock visibility rules and the section limit. Choose distinct collections for different sections.
5. For existing products use Products > select products > More actions > Add tags, preserving their existing tags.

## Move or remove a product

Remove the old category tag and add the new one to change its placement. Remove all catalogue tags to remove it from these automated collections; an active published product can still appear in All Products or search. To stop selling it everywhere, set it Draft/Archived or remove Online Store availability. Deleting it permanently removes it from all collections. Recently sold-out visibility is controlled by custom.show_when_sold_out; see AVAILABILITY_FLOW.md.

## Navigation and empty departments

Content > Menus > Catalogue contains the whole hierarchy. Edit labels and collection links there. Theme settings > Storefront and delivery selects the catalogue menu. Empty departments are intentionally present and show an empty state until real stock is assigned. Product content always comes from Shopify.

Grocery > Baby Food and Baby Products > Baby Food & Formula remain separate collections as supplied. If the same SKU belongs in both, assign both tags to the same product; do not duplicate the SKU. Confirm whether you want these two menu entries to share one collection instead.

## Development commands

With Shopify CLI installed, run from this folder:

```powershell
shopify theme dev --environment catalogue
```

This environment points to the unpublished review theme. Never use sample-sections for development writes; it is live. CLI preview was not started in this session. Publication requires your review and explicit approval.

## Still required before real orders

Replace sample/test catalogue data with real launch SKUs and images; confirm Dubai shipping rates/zones, payment providers, VAT and final policies. These launch limitations are not resolved by creating categories. See ORDERING_POLISH.md and ADMIN_SETUP_CHECKLIST.md.
