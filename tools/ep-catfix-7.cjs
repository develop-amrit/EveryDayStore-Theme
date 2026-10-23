const b=require('./ep-catfix-common.cjs');
b.css(`@media(max-width:989px){.ep-listing-page.ep-pill-space [data-collection-content],.ep-listing-page.ep-pill-space [data-collection-rail]{padding-block-end:calc(76px + env(safe-area-inset-bottom))!important}}`);
let p='snippets/qc-cart-contents.liquid';b.write(p,b.read(p).replace("{% assign ep_money_amount = fee %}{% render 'ep-money', amount: ep_money_amount %}","{% if fee == 0 %}{{ 'epcf.free' | t }}{% else %}{% render 'ep-money', amount: fee %}{% endif %}"));
b.finish(7,'Reserve pill clearance and label free delivery','Grid and rail both reserve 52px pill +24px + safe area. Zero estimated delivery renders Free, while paid fees still use ep-money.');
