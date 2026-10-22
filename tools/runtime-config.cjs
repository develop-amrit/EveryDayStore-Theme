const {read,write,parse}=require('./build-lib.cjs');
const keys=Object.entries(parse('locales/en.default.json').qc).filter(([,value])=>typeof value==='string'&&!value.includes('{{')).map(([key])=>key);
const translatedLabels=keys.map(key=>JSON.stringify(key)+":{{ 'qc."+key+"' | t | json }}").join(',');
const source=read('snippets/qc-storefront-runtime.liquid').split('{% capture qc_config %}')[0];
write('snippets/qc-storefront-runtime.liquid',source+String.raw`
{% capture qc_config %}{"root":{{ routes.root_url | json }},"customer":{% if customer %}true{% else %}false{% endif %},"account_mode":{{ settings.qc_account_mode | default: 'new' | json }},"currency":{{ shop.currency | json }},"zones":{{ settings.qc_zones | default: '[]' | json }},"require_booking":{{ settings.qc_require_booking | default: false | json }},"terms_version":{{ settings.qc_terms_version | default: 'draft' | json }},"mock_slots":{{ settings.qc_mock_slots | default: false | json }},"design_mode":{{ request.design_mode | json }},"endpoints":{"restock":{{ settings.restock_endpoint | json }},"wishlist":{{ settings.wishlist_endpoint | json }},"reviews":{{ settings.reviews_endpoint | json }},"slots":{{ settings.slots_endpoint | json }},"tracking":{{ settings.tracking_endpoint | json }},"reorder":{{ settings.reorder_endpoint | json }},"ai":{{ settings.ai_endpoint | json }}},"labels":{${translatedLabels}}}{% endcapture %}
<script type="application/json" id="qc-storefront-config">{{ qc_config | replace: '<', '\u003c' }}</script>`);

