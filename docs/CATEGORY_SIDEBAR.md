# Collection category sidebar

Added on 2026-10-21 to the unpublished codex-catalogue-navigation review theme (189518545009). Live theme remains unchanged.

Every collection page using the standard qc-catalog section now has a persistent category sidebar beside its products. Desktop uses a 240px navigation column; mobile uses a 100px navigation column with products alongside it, growing to two product columns on larger phones/tablets. Sidebar height follows the sticky header through ResizeObserver, with its own scroll area and a highlighted current category.

Navigation comes from the merchant's Catalogue menu. Opening a department lists its subcategories. Selecting a second-level category reveals its third-level children. No products or collection URLs are hardcoded. Menu changes in Shopify Admin automatically update the sidebar. Native filters, sorting, pagination, product availability rules and AJAX Add controls are retained.

Theme editor > Collection template > Catalog: Show category sidebar is on by default. Sidebar menu can override the global Storefront and delivery catalogue menu; leave it blank to use the global menu.

Verified in the browser:

- Desktop Diapers & Wipes: sidebar beside four-column product grid; Baby Products expanded and Diapers & Wipes highlighted.
- Mobile 390px: side-by-side columns, no document horizontal overflow; independent sidebar scrolling.
- Clicked Nursery & Bedding from the sidebar: correct destination heading and active state; selected item scrolls into the sidebar viewport.
- Clicked Grocery > Pantry Staples > Rice: all three menu levels work; Rice highlighted with its siblings shown.
- Rice empty state displayed without breaking navigation.
- Browser viewport restored after checks.

Local structural checker passes. Official Theme Check remains unavailable because Shopify CLI is absent and the bundled validator cannot find @shopify/theme-check-common. Blinkit's interactive site was blocked by the browser; the implementation follows the requested side-by-side category-browsing pattern with the existing brand design.

Files: sections/qc-catalog.liquid, snippets/qc-collection-sidebar.liquid, assets/qc-category-sidebar.css, assets/qc-category-sidebar.js, locales/en.default.json.

Preview: https://3djevx-mu.myshopify.com/collections/baby-products-diapers-and-wipes?preview_theme_id=189518545009
