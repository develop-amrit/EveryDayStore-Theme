# SITEWIDE FIX PROMPT — back navigation, product, search, deals and remaining issues (Codex CLI)

> Run in the theme folder: `codex "Read EverydayyPlus_Sitewide_Fix_Prompt.md and execute it end to end."`
> This continues the earlier EverydayyPlus prompts (master, final fix, polish, dirham, categories, categories fix). Reuse their tokens, `ep-card`, `ep-money`, sheets, skeletons and slim header. No images are supplied; layouts are described in words.

## 0. Rules
- Work only on theme ID `189582049393`. Never push to `189489545329`, never create a theme copy, never publish.
- **Do not remove, hide or unlink any real category collection**, including empty ones.
- Don't break what already works: instant sub-category switching, the photo rail, the in-stock chip, the cart pill, the area picker, dirham prices, zero layout shift, no console errors.
- All motion is 120–250ms with `--ep-ease`, and switched off under `prefers-reduced-motion: reduce`.
- Commit as `Site N: <title>`, log in `WORKLOG.md`, add owner tasks to `MERCHANT_TODO.md`.

---

## 1. Back arrow and history on category pages (owner-reported bug)
**Now:** each sidebar tap pushes a new history entry. After visiting Gifting → Flowers → Chocolates → Hampers, the back arrow goes to Chocolates, then Flowers, then Gifting, instead of returning to where the shopper started (e.g. the homepage). The phone's back gesture does the same.

**Wanted:** browsing between categories is one stop in history. Back always returns to the page the shopper was on **before** they opened their first category (homepage, Categories page, search, a product, etc.), or to the **homepage** if they landed on a category page directly.

1. **Same-department switches** (rail items, third-level chips, breadcrumb links inside the department, Sort, Filters, the In-stock chip, "Clear filters") update the page with `history.replaceState` instead of `pushState`. The URL and title still change, so sharing and refreshing work.
2. **Switching to another department** from a listing page (breadcrumb department link, empty-state department links, any listing → listing link) also must not add an entry: use the instant-switch fetch with `replaceState` if possible; otherwise navigate with `location.replace(url)`.
3. **Entry point:** when a listing page is opened from a non-listing page, store `{ url, scrollY }` of that previous page in `sessionStorage` (key `ep:listingEntry`, in try/catch) and in `history.state`. Use same-origin `document.referrer`; if there's no same-origin referrer, use `/`.
4. **Back arrow on listing pages:** if the previous history entry is the stored entry page (track this with `history.state.epFromSite === true`, set when arriving by an in-site link), call `history.back()`. Otherwise go to the stored entry URL, or `/` if there isn't one, with `location.replace`.
5. **Product pages opened from a listing** still push normally. Back from the product returns to the listing in the category, filters and scroll position the shopper last saw (the existing restore logic). Back again returns to the entry page.
6. **Categories page (`/collections`) back arrow:** previous in-site page, else `/`.
7. Remove any `popstate` handling that re-renders categories, since no listing-to-listing entries exist anymore. Keep `pageshow`/bfcache restore for product → listing returns.
8. **Test these paths** and log the results:
   - Home → Gifting → 3 rail taps → back arrow: Home.
   - Home → Gifting → 3 rail taps → phone/browser back: Home.
   - Categories page → Diapers → Baby Food → back: Categories page.
   - Home → Diapers → product → back: Diapers at the same scroll → back: Home.
   - Direct link to `/collections/gifting` → back arrow: Home.
   - Filter and sort changes → back: entry page.

---

## 2. Homepage "Baby care" rail has disappeared
**Now:** the rail renders at 0px. Its collection, Baby Products, has its first 250 products all out of stock, and rails now show in-stock products only.
1. Rails and grids loop through up to 250 products (`paginate collection.products by 250` inside the section) and collect the first N **available** products, skipping `homepage-hide` and `[TEST]` ones.
2. If fewer than 4 are found, add in-stock products from the collection's child collections (from the department menu) until there are N. Only if still under 4, hide the section.
3. Apply the same in-stock rule to the homepage "Care for every day" grid. It currently shows 4 out-of-stock cards.
4. `MERCHANT_TODO.md`: check inventory for Baby Products (the first 250 products are out of stock). Optionally create an automated collection "Baby care – in stock" (condition: Inventory stock is greater than 0, plus product type or tag Baby) and point the rail at it.

## 3. Invisible button text, sitewide
**Now:** the 404 page's "Continue shopping" button is dark-green text on a dark-green button, so it looks like an empty bar. This is the same bug as the filter sheet buttons fixed earlier.
1. Audit every button and link styled as a button across all templates and sections (`.button`, `.btn`, `button[type=submit]`, `.ep-btn`, Dawn `.button--primary`). Filled buttons use white text (or `--ep-brand-ink`), outline buttons use brand-coloured text. Contrast must be at least 4.5:1.
2. Add a QA script step that flags any visible button whose text colour equals its background colour.

## 4. Deals page (`/collections/all?view=ep-deals`)
**Now:**
- the crossed-out MRP overlaps the product name (e.g. "⃃ 55" over "Air Wick");
- the grid is 3 cramped columns at 375px;
- images arrive late;
- the bottom nav is hidden, even though Deals is a bottom-nav destination;
- the page `<title>` is "Products – EverydayyPlus".

1. Use the listing page layout without the rail: slim header, title "Best deals", Sort/Filters/In-stock chips, a **2-column** `ep-card` grid with the compact ADD, price chip and MRP on one line, infinite scroll.
2. Fix the MRP overlap in the card CSS, so the price row and name never overlap on any page (check the homepage grids too).
3. **Show the bottom nav** on the Deals page with **Deals active**. The cart pill sits above it.
4. `<title>`: "Best deals – EverydayyPlus".

## 5. Search results page (`/search`)
**Now:** this is still the old design:
- a large "Search essentials" heading and a second search box under the header;
- the old inline filters with an "Apply filters" button;
- old cards with a Compare checkbox and a yellow "Add +" button;
- the first images blank while they load.

Match the listing page:
1. Slim header with the back arrow, and the search field **open and pre-filled** with the query (predictive search active). No second search box.
2. One line: "{n} results for "{query}"" (14px, muted).
3. Sort / Filters / In-stock chips and bottom sheets (same components as listing pages).
4. 2-column `ep-card` grid, infinite scroll, skeletons then fade-in.
5. **No results:** "No results for "{query}"" plus suggestion chips (popular searches from the Trending searches menu) and a rail of in-stock best sellers.
6. Results that are collections or pages appear as a small row of chips above the products.
7. The bottom nav stays visible, with no item active.

## 6. Product page
**Now:**
- the full homepage header is used;
- the gallery stacks 6 big images, so the product name starts about 1,180px down the page;
- a small "Add" button with a plain quantity box;
- a Compare checkbox;
- the delivery-fee tiers in a boxed list;
- "A few thoughtful alternatives" uses old cards (Compare checkbox, yellow "Add +", one with a missing image);
- "Customer reviews: No published rating is available yet." and "Recently viewed: Your recently viewed products will appear here." show as empty sections;
- the vendor name is tiny;
- the bottom-nav promo bubble showed as an empty white circle.

Rebuild for mobile, using a quick-commerce product page as the reference:
1. **Header:** the slim header (back arrow, logo, area chip, search), with the same back logic as Fix 1 (previous in-site page, else `/`).
2. **Gallery:** a swipeable image carousel (CSS scroll-snap), square, full width on the muted well, with dots underneath and the active dot as a pill. Tapping opens a full-screen zoom viewer (swipe between images, ✕ to close). The first image loads eagerly.
3. **Info block, directly under the gallery:**
   - vendor (12px, muted, uppercase tracking off);
   - product name (18px, 700, max 3 lines);
   - pack size (13px, muted);
   - price row: dirham price chip, struck-through MRP and a "{x}% OFF" badge;
   - "Delivery tomorrow to {area}" with the truck icon, using the area picker value or "Choose your area".
4. **Sticky bottom bar (replaces the bottom nav on product pages):** white, a 64px top shadow and safe-area padding. On the left, the price; on the right, a large ADD button (brand green, white text, 48px tall, 160px wide) that becomes the `− 1 +` stepper. Out of stock: a disabled "Out of stock" button. The cart pill sits above this bar when the cart has items.
5. **Variants:** if a product has variants, show them as pill chips above the bar's position. Selecting one updates the price, images and availability.
6. **Delivery fees:** replace the boxed tier list with one line under the price ("Delivery ⃃ 5.99 · Free over ⃃ 99"), with an "i" button that opens a small sheet showing the tiers.
7. **Details:** "About this product" as an expandable section (first 4 lines plus "Read more"). The specs table keeps its two columns with 13px text.
8. **Similar products:** replace "A few thoughtful alternatives" with an `ep-product-rail` of in-stock products from the same collection (compact cards, no Compare). Keep "Make it a useful little bundle" only if it uses real products, and restyle it with `ep-card`.
9. **Hide empty sections:** don't render "Customer reviews" until reviews exist, or "Recently viewed" until there's at least one other viewed product.
10. Remove the Compare checkbox and the small wishlist row. Put the wishlist heart on the gallery's top-right instead.
11. **Promo bubble:** load its image eagerly with a fixed size, and don't show the bubble until its image has loaded. Hide it on product pages.

## 7. 404 page
1. Fix the invisible "Continue shopping" button (Fix 3).
2. Replace the bulleted department list (currently unstyled, with run-together text like "GroceryCupboard staples…") with the same 3 × 2 category blocks as the homepage panel, plus a search field.

## 8. Header colour strength
**Now:** the header tint is `color-mix(#fefae0 40%, white)`, which is so close to white that it reads as white.
1. Use the full brand cream `#FEFAE0` (or the existing `--ep-accent-soft` defined as full strength) for the header and the homepage top panel on every page, so it's clearly distinct from the white page.
2. Keep the search field white, with a 1px border at `rgba(0,0,0,.06)`.
3. `theme-color` meta equals the header colour.

## 9. Image loading speed
**Now:** images appear 1–2 seconds after their section scrolls into view, and small tiles request large files (e.g. `width=600` for about 100px tiles).
1. Every product and tile image uses `image_url` with a `srcset` (120, 180, 240, 360, 480) and an accurate `sizes` (e.g. `(max-width: 749px) 30vw, 160px` for 3-column tiles; `45vw` for 2-column cards).
2. The first 6 card images on each page load eagerly; the rest lazy-load. Add an IntersectionObserver with `rootMargin: 400px` that switches lazy images to load just before they scroll in.
3. Keep the skeleton and fade-in, with no layout shift.

## 10. Category panel image choices
**Now:** the same product (Galaxy Jewels tin) appears in both the Gifting and Grocery blocks, and the Bath & Body block shows DryNites baby pants.
1. When auto-picking images, never use the same product in two blocks. Pick in-stock products only.
2. Add a "Product for image" picker per block (falls back to auto).
3. `MERCHANT_TODO.md`: the Bath & Body collection includes baby diaper pants (Huggies DryNites, Pampers). Fix its conditions in Admin, so "Care for every day" and the Bath & Body block show real bath and body products.

## 11. Empty cart page
Under "Your basket has room for good things", add a rail of in-stock best sellers (compact cards with ADD), so the shopper can start filling the cart without leaving the page.

## 12. Owner tasks (MERCHANT_TODO.md)
- Shopify-hosted sign-in page: it shows plain "EverydayyPlus" text. Brand it in Admin → Settings → Customer accounts (logo, colours). Theme code can't change this page.
- Inventory: Baby Products (Fix 2).
- Bath & Body collection conditions (Fix 10).
- Set any remaining [TEST] products and collections to Draft.

---

## 13. QA (360 / 375 / 414 and 1280px; report in WORKLOG.md)
| Check | Pass |
|---|---|
| Back navigation | All 6 paths in Fix 1.8 behave as specified; phone back gesture matches the back arrow |
| Homepage | "Baby care" rail visible with in-stock products; no out-of-stock cards on the homepage |
| Buttons | No button anywhere has text the same colour as its background |
| Deals | 2-column grid, no MRP overlap, bottom nav visible with Deals active, correct title |
| Search | Slim header with the query pre-filled; no second search box; listing-style grid and sheets; no-results state |
| Product page | Carousel gallery; name and price visible without scrolling past 1 screen; sticky ADD bar; no Compare; no empty reviews or recently viewed sections; similar-products rail |
| 404 | Visible button; category blocks |
| Header colour | Cream clearly visible on every page and scroll state |
| Images | Load before they scroll into view; correct sizes; no layout shift |
| Panel | No duplicate products across blocks |
| Empty cart | Suggestions rail with working ADD |
| Stability | CLS 0 on all templates; no console errors; theme check 0 errors |

Finish with a summary, the list of files changed, preview links for each template, and the updated `MERCHANT_TODO.md`. **Do not publish.**
