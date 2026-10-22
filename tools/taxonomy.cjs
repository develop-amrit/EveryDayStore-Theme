const {write,save}=require('./build-lib.cjs');
const trees=[
 ['All Products',[]],
 ['Grocery',[
  ['Pantry Staples',['Rice','Pasta','Noodles','Flour','Pulses, Beans & Lentils','Oils & Ghee','Sugar & Sweeteners','Salt, Spices & Seasonings']],
  ['Breakfast & Spreads',['Cereals','Breakfast Foods','Jams','Honey','Spreads']],
  ['Snacks & Confectionery',['Chips & Snacks','Biscuits & Crackers','Chocolates & Confectionery','Nuts, Seeds & Dried Fruits']],
  ['Canned, Packaged & Ready Foods',['Canned & Jarred Foods','Instant & Ready-to-Eat','Sauces, Condiments & Dressings']],
  ['Beverages',['Water','Juices','Soft Drinks','Energy & Sports Drinks','Tea & Coffee','Other Beverages']],
  ['Healthy & Specialty Foods',['Organic','Health-Focused','International & Specialty']],
  ['Dairy & Eggs',[]],['Fresh Produce',[]],['Frozen Foods',[]],['Baby Food',[]]]],
 ['Baby Products',[
  ['Diapers & Wipes',[]],['Feeding & Nursing',['Bottles & Accessories','Breastfeeding & Nursing','Pacifiers & Teethers']],['Baby Food & Formula',[]],['Bath, Skincare & Grooming',[]],['Health & Safety',[]],['Nursery & Bedding',[]],['Baby Gear & Travel',[]],['Baby Toys',[]],['Maternity & Postpartum',[]]]],
 ['Gifting',[
  ['Flowers & Bouquets',[]],['Chocolates & Treats',['Chocolates','Cakes','Confectionery']],['Hampers & Gift Sets',[]],['Soft Toys & Gifts',[]],['Fragrances & Candles',[]],['Gift Cards & Personalized Gifts',[]],['Balloons & Decorations',[]]]],
 ['Bath & Body',[
  ['Bath & Body Care',['Bath & Shower','Body Care','Hand & Foot Care']],['Skincare & Face Care',[]],['Hair Care',[]],['Makeup & Cosmetics',[]],['Fragrances & Deodorants',[]],['Personal Hygiene',['Oral Care','Feminine Hygiene','Everyday Hygiene']],['Men’s Grooming & Shaving',['Shaving & Hair Removal']],['Sexual Wellness',[]]]],
 ['Home',[
  ['Cleaning & Laundry',['Household Cleaning','Laundry','Dishwashing']],['Cleaning Tools & Pest Control',[]],['Paper & Household Essentials',[]],['Storage & Organization',['Plasticware']],['Kitchen & Cookware',['Cookware','Kitchen Essentials','Tools & Utensils']],['Food Storage & Wraps',['Containers','Foil','Cling Film']],['Disposables',['Disposable Tableware']],['Bathroom Essentials',[]],['Home Fragrance',['Air Fresheners']]]],
 ['Pet', [['Dogs',[]],['Cats',[]],['Other Pets',['Birds','Fish','Small Animals']]]],
 ['Office Supplies',[
  ['Paper & Notebooks',[]],['Writing & Stationery',[]],['Filing & Organization',['Files & Folders','Labels & Tags']],['Desk Essentials',['Desk Supplies','Staplers & Punches','Adhesives & Tapes']],['Mailing & Packaging',['Envelopes & Mailing']],['Presentation Supplies',[]]]]
];
const slug=s=>s.toLowerCase().replace(/[’']/g,'').replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const rows=[];
function node(label,children,path=[]){const parts=[...path,label],handle=label==='All Products'?'all':parts.map(slug).join('-');rows.push({label,path:parts.join(' > '),handle,level:parts.length});return {title:label,collection_handle:handle,url:'/collections/'+handle,...(children?.length?{children:children.map(child=>Array.isArray(child)?node(child[0],child[1],parts):node(child,[],parts))}:{})};}
const menu={handle:'catalogue',title:'Catalogue',items:trees.map(([label,children])=>node(label,children)),notes:['Create collections before menu links. No products are created by this manifest.','Baby Food mapping is provisional until the merchant confirms sharing with Baby Food & Formula.']};
save('docs/CATALOGUE_MENU.json',menu);
write('docs/COLLECTIONS_TO_CREATE.md',`# Collections and three-level catalogue menu\n\nCreate through Products > Collections > Create collection. Use the proposed handle in Search engine listing > Edit website SEO > URL handle. Choose manual or sensible automated rules from actual catalogue attributes, activate Online Store publication only for launch-ready collections/products, and upload collection images. Parent collections aggregate existing product references; never create duplicate SKUs just for menu placement. /collections/all is Shopify's built-in all-products route.\n\nNo collections or menus were created remotely. docs/CATALOGUE_MENU.json is the complete local setup manifest. Every node below maps to a Shopify collection; at most three menu levels. Content > Menus > Add menu > Catalogue (handle catalogue): add parent links, drag children under parents, then third-level links under those. Select Catalogue under Theme settings > Storefront and delivery > Catalogue menu. This one setting feeds header, drawer, category rail and Categories page.\n\n**Decision required:** Grocery > Baby Food and Baby Products > Baby Food & Formula currently have provisional separate handles. Confirm whether both should point to ONE collection. Do not duplicate products or assign the same SKU as a new product record. Do not activate either provisional mapping until confirmed.\n\n| Ready | Menu path | Collection handle |\n|---|---|---|\n`+rows.map(r=>`| [ ] | ${r.path} | ${r.handle} |`).join('\n'));
