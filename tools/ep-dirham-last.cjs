const b=require('./ep-build.cjs');let p='tools/ep-dirham-updates.cjs';b.write(p,b.read(p).replace("await page.locator('[data-basket-total]').first().innerHTML()","await page.locator('#qc-cart .qc-cart-total strong').first().innerHTML()"));
// Existing captures already supply the symbol on every page; avoid redundant captures.
p='snippets/qc-delivery-tiers.liquid';b.write(p,b.read(p).replace(/{% capture lower_money %}{% render 'ep-money', value: lower %}{% endcapture %}[\s\S]*?(?=<ul)/,''));
