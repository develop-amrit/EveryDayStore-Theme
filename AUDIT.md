# Homepage audit — 22 October 2026

Baseline commit: fdc8b90. All source files retained.

## Homepage sections

### announcement → sections/qc-announcement.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{"b0":{"type":"message","settings":{"text":"Dubai essentials, delivered next day."}},"b1":{"type":"message","settings":{"text":"Free delivery on orders from","threshold":true}},"b2":{"type":"message","settings":{"text":"One useful basket. So many everyday favourites."}},"fees":{"type":"message","settings":{"text":"Delivery fee tiers","fees":true}}}`

### header → sections/qc-header.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{}`

### hero → sections/qc-hero.liquid

Settings: `{"art_text":"The everyday basket","badge":"Selected with care"}`

Blocks, preserved verbatim in baseline: `{"b0":{"type":"slide","settings":{"eyebrow":"YOUR DUBAI EVERYDAY, SORTED","heading":"Everyday essentials. Delivered next day.","text":"Groceries, care and home essentials in one basket, delivered across supported Dubai areas.","label":"Explore products","link":"/collections/all"}}}`

### favourites → sections/qc-products.liquid

Settings: `{"heading":"Grocery essentials","collection":"grocery","limit":8,"text":"Cupboard staples, favourite snacks and everyday drinks."}`

Blocks, preserved verbatim in baseline: `{}`

### import_baby → sections/qc-products.liquid

Settings: `{"heading":"For their everyday care","collection":"baby-products","text":"Wipes, bath-time essentials and growing-up needs.","limit":4}`

Blocks, preserved verbatim in baseline: `{}`

### promos → sections/qc-promos.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{"b0":{"type":"promo","settings":{"eyebrow":"THOUGHTFUL LITTLE GESTURES","heading":"A little something to give.","text":"Chocolate favourites for small celebrations and thoughtful surprises.","label":"Explore gifting","collection":"gifting"}},"b1":{"type":"promo","settings":{"eyebrow":"READY FOR WORK AND SCHOOL","heading":"Make room for good ideas.","text":"Paper, stationery and useful desk essentials in one place.","label":"Browse office supplies","collection":"office-supplies"}}}`

### essentials → sections/qc-essentials.liquid

Settings: `{"heading":"Home essentials, sorted","collection":"home","limit":8,"text":"Cleaning, laundry and household supplies for a well-stocked home."}`

Blocks, preserved verbatim in baseline: `{}`

### fresh → sections/qc-products.liquid

Settings: `{"heading":"Care for every day","collection":"bath-and-body","limit":8,"text":"Bath, hair and personal-care essentials for your daily routine."}`

Blocks, preserved verbatim in baseline: `{}`

### import_gifts → sections/qc-products.liquid

Settings: `{"heading":"Gifts to brighten their day","collection":"gifting","text":"Chocolate boxes and treats for an easy, thoughtful gesture.","limit":6}`

Blocks, preserved verbatim in baseline: `{}`

### import_pet → sections/qc-products.liquid

Settings: `{"heading":"A little care for your pets","collection":"pet","text":"Food and playtime essentials for furry family members.","limit":6}`

Blocks, preserved verbatim in baseline: `{}`

### import_office → sections/qc-products.liquid

Settings: `{"heading":"Desk and school essentials","collection":"office-supplies","text":"Keep your workspace and school bag stocked.","limit":8}`

Blocks, preserved verbatim in baseline: `{}`

### steps → sections/qc-steps.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{"b0":{"type":"step","settings":{"heading":"Order today","text":"Your favourites, a few taps away.","icon":"bag"}},"b1":{"type":"step","settings":{"heading":"We pack with care","text":"Picked thoughtfully. Packed properly.","icon":"leaf"}},"b2":{"type":"step","settings":{"heading":"At your door tomorrow","text":"A next-day delivery to your Dubai address.","icon":"truck"}}}`

### trust → sections/qc-trust.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{"b0":{"type":"item","settings":{"heading":"Next-day delivery","text":"Made for your Dubai routine","icon":"truck"}},"b1":{"type":"item","settings":{"heading":"Quality guaranteed","text":"Carefully selected essentials","icon":"leaf"}},"b2":{"type":"item","settings":{"heading":"Easy returns","text":"Support when you need it","icon":"check"}},"b3":{"type":"item","settings":{"heading":"Secure payments","text":"Checkout with confidence","icon":"check"}}}`

### faq → sections/qc-faq.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{"b0":{"type":"question","settings":{"question":"When will my order arrive?","answer":"<p>Order today for next-day delivery in supported Dubai areas. Your available delivery date is confirmed during checkout.</p>"}},"b1":{"type":"question","settings":{"question":"What is the order cut-off time?","answer":"<p>Check the delivery information shown at checkout for the current cut-off. Orders received after the applicable cut-off move to the next available delivery day.</p>"}},"b2":{"type":"question","settings":{"question":"Which areas of Dubai do you deliver to?","answer":"<p>Choose your area in the header. Final service availability is confirmed using your full delivery address at checkout.</p>"}},"b3":{"type":"question","settings":{"question":"Is Cash on Delivery available?","answer":"<p>Cash on Delivery is available only when it is offered as a payment method at checkout. Otherwise, choose one of the secure online payment methods shown there.</p>"}},"b4":{"type":"question","settings":{"question":"How much does delivery cost?","answer":"<p>Delivery fees depend on your basket total. See the current tiers below; your final fee is confirmed at checkout.</p>"}},"b5":{"type":"question","settings":{"question":"What if something is not right with my order?","answer":"<p>Please contact our support team using the contact page with your order number and details. Our published returns policy explains eligibility and the next steps.</p>"}},"bnpl":{"type":"question","settings":{"question":"Can I pay in instalments?","answer":"<p>Eligible instalment options are offered only if an approved provider is available at checkout. Provider eligibility and terms apply.</p>"}}}`

### footer → sections/qc-footer.liquid

Settings: `{}`

Blocks, preserved verbatim in baseline: `{}`

## Live snapshot reconciliation

Byte differences are listed in docs/EP_BASELINE_DIFF.json. Semantic differences after removing Shopify generated comments and sorting object keys: templates/index.json. Local source preserved; no live pull overwrote it.

## Global chrome and integrations

Header/announcement/footer are duplicated in the homepage template and section-group definitions, with layout/theme.liquid choosing groups only off-home. Move the homepage values to groups and render groups unconditionally. Custom schemas allow groups (no restrictions). The bottom navigation is hardcoded inside qc-header.liquid, active only on Home; extract to a new configurable footer-group section. Other templates do not embed qc-header/qc-footer sections.

Product rails use snippets/qc-product-card.liquid. The existing Add action delegates to assets/qc-home.js and QCCart; multi-variant uses qc-variants dialog and qc-catalog.js. Cart writes request bundled qc-cart section, fetch actual cart.js, replace data-cart-host, update data-cart-count and dispatch qc:cart-updated. Dawn cart-drawer markup is disabled in layout; PUB_SUB_EVENTS exists but current custom cart does not publish it. Preserve the QC dialog, shipping/booking enforcement, checkout and refresh flow; add event bridge and a shared mutation adapter. New cards must not use .qc-card, which the old runtime owns and rewrites. Wishlist uses data-wishlist and qc-catalog.js local/account sync. Location uses qc-area-picker and data-area with qc-delivery.js. Cookie UI is rendered from qc-runtime.

## Design tokens

Scheme 1: {"background":"#FFFFFF","background_gradient":"","text":"#283618","button":"#283618","button_label":"#FEFAE0","secondary_button_label":"#283618","shadow":"#283618"}. Scheme 2 cream: {"background":"#FEFAE0","background_gradient":"","text":"#283618","button":"#283618","button_label":"#FEFAE0","secondary_button_label":"#283618","shadow":"#283618"}. Effective commerce.css tokens: forest #283618, olive #606c38, cream #FEFAE0, sand/dot #DDA15E, rust #BC6C25, paper #FFFFFF. The actual logo dot uses the existing sand token; do not invent a yellow. Configured font Assistant n4 is overridden by commerce.css Avenir Next/Avenir/Arial. Existing buttons 8px radius, cards 16px/28px custom radii. CSS layers: base.css, commerce.css, qc-home.css, qc-storefront.css and contextual component assets. ep-mobile.css will load after these to avoid fighting earlier specificity.

## Menus, images, reviews

See docs/ep-remote-audit.json for MCP results. Available menus: main-menu (Home/Catalog/Contact), footer (Search only), customer-account-main-menu, sample-baby-care, catalogue. Catalogue has Grocery, Baby Products, Gifting, Bath & Body, Home, Pet and Office Supplies with nested child/leaf links. No dedicated seven-department child menus; do not map all groups to the same menu. Existing sample-baby-care can serve Baby until a real child menu is configured. Collections have no dedicated uploaded image in the audited pages; featured_image may use a product fallback. Empty categories must not show fake images on storefront. No reviews.rating or reviews.rating_count found in the audited active products; no review app block in index or groups. Existing custom reviews endpoint is configured separately; it is not proof of standard metafield ratings. Build rated cards with conditional stars only.

## Reuse decision

Reuse logo/icons, live menu tree, area picker, predictive search, wishlist, privacy, custom cart and retained trust/FAQ/footer content. New ep-* snippets/sections share tokens and small vanilla custom elements. No section file deletion. Existing collection handles are transferred only through JSON editor settings.
