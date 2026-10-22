# Current live storefront vs Blinkit — 2026-10-21

Shopify API confirms codex-catalogue-navigation (189518545009) is MAIN. The earlier live sample theme is unpublished. User requires all future edits in this one theme, with no further duplicates. This assessment made no storefront file changes.

Inspected the confirmed current theme's homepage, predictive search, full search and cart in the browser. Previous phase verified its category sidebar at desktop/mobile widths. Blinkit's interactive site was blocked by the browser; its public homepage and category HTML were available through web browsing. Its interactive search/checkout behaviour remains unverified.

Reference: https://blinkit.com/cn/dairy-breakfast-more/bread-pav/cid/14/953

## Findings and recommendations

1. Homepage density: substantial space goes to hero/promo copy and gaps. Shorten those blocks to prioritise category discovery and product shelves.
2. Category browsing: sidebar exists, but its full department tree and nested links require scanning. Prioritise immediate sibling subcategories within the selected department, with a compact department switcher and parent/back link.
3. Cards: Blinkit's public category output separates product name, pack quantity, price, discount and Add/options. Current supplier titles still mix size and marketing details into the name. Populate concise custom.card_title and actual custom.pack_size. Retain full titles on product pages. Keep Compare secondary.
4. Mobile space: header/search/category strip take substantial vertical space; sidebar and filters further delay product visibility. Retain top bar styling, shrink header after scrolling and collapse filters into one control.
5. Search correctness: predictive search for pampers displayed no products found, while See all results showed nine matching cards on the first page. Prioritise fixing this inconsistency. Cause not established during review.
6. Basket visibility: current header has cart icon/count. Add a subtotal/item-count basket action and a mobile basket summary when nonempty.
7. Cart: Add became a quantity stepper; drawer displayed subtotal, delivery estimate and estimated total. Supplier names remain unwieldy. Use concise presentation titles and separate variant/pack details. Keep checkout the strongest action.
8. Delivery: area choice is a preference/pre-check, not verified address eligibility or reserved delivery capacity. Make next-day date/cut-off information concise and contextual, with authoritative validation/reservation through documented Admin/backend configuration.
9. Identity: forest/cream palette and top bar already work. Improve hierarchy and density without copying Blinkit's colours or delivery-speed claims.

Priority: search consistency; mobile screen space; contextual sidebar; concise card presentation; basket feedback; delivery readiness.

Basket was initially empty. Added one temporary item, reviewed it and removed it; empty state restored. No order placed. Checkout/payment, account services and performance were not tested in this assessment.
