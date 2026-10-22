# Storefront design review — 2026-10-21

Reviewed the published storefront after exiting an old preview cookie, then implemented changes on the unpublished codex-catalogue-navigation theme (189518545009). Live theme files were not changed.

## Findings unrelated to merchandising

- Product names were small, tightly spaced and uniformly bold. Long supplier titles became dense paragraphs with poor scanning hierarchy.
- The separate wishlist/compare strip interrupted the card and added a visual divider without useful hierarchy.
- Prices and crossed-out prices needed consistent reserved space so Add buttons align across a shelf.
- Live category shortcuts repeated a generic bag icon. The catalogue review already supplies distinct department icons; their row still needed spacing and wrapping improvements.
- The desktop category row exposed a heavy horizontal scrollbar and unevenly squeezed some labels.
- The featured mobile product was vulnerable to a narrow rail width overriding its horizontal layout; browser testing confirmed and resolved this conflict.
- Reveal styling hid offscreen content until an observer fired. Content now stays visible while existing motion remains progressively enhanced.

## Changes

- Product titles now use weight 600, 14px desktop / 13px mobile, with improved line spacing and natural wrapping across three lines.
- The full title remains on the product link. custom.card_title remains the optional merchant-managed concise display name; custom.pack_size separates pack details. No automated title rewriting, invented pack data or product-specific theme rules were added.
- Wishlist is a 44px touch target over the image using the shared SVG icon system. Its script preserves the SVG while updating aria-pressed. Compare sits beside pack information as a secondary control.
- Price typography, spacing, card corners and shelf widths are consistent. AED formatting remains unchanged.
- Desktop department links share the available width without a horizontal scrollbar; longer labels wrap into two lines. Mega-menu headings and links have clearer type hierarchy. Mobile retains horizontal category browsing.
- Fixed the featured mobile card to take the full shelf width with a bounded image column and a flexible text column.

## Browser verification

Verified at desktop viewport (approximately 1920px) and mobile 390px:

- Homepage renders with no document-level horizontal overflow on mobile.
- Product title computed font and line spacing match the intended CSS.
- Wishlist toggles on/off and retains the SVG icon; test selection restored.
- Compare updates the tray to 1 / 4; test selection restored.
- Desktop Grocery mega-menu opens with the correct category hierarchy and closes with Escape.
- Featured mobile card width is 301px, text column 199px, with no internal content overflow.
- Desktop category rail client/content width both 1163px, with no overflow.

The AJAX add-to-cart implementation and data attributes are unchanged. Checkout and payment processing were not retested in this visual pass. Local structural checks passed (92 JSON files, 88 section schemas and 54 changed/shared Liquid structures, references and JavaScript syntax). Official Theme Check remains unavailable: CLI absent from the agent shell and bundled validator missing @shopify/theme-check-common.

## Remaining design/content recommendations

- Populate custom.card_title with concise product names and custom.pack_size with the actual size/count. This is optional catalogue presentation data; full supplier titles stay available on product pages.
- Promo headlines still have deliberately narrow editorial line lengths. Once launch copy is agreed, shorten each to a single clear benefit rather than filling the tile with text.
- Consider a smaller mobile sticky header after scrolling if customers find the retained header/navigation stack too tall. The existing top bar and header styling were intentionally preserved in this pass.

Preview: https://3djevx-mu.myshopify.com/?preview_theme_id=189518545009

Files modified: assets/qc-storefront.css, assets/qc-catalog.js, snippets/qc-product-card.liquid, snippets/qc-icon.liquid.
