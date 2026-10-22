const fs=require('fs');
const rows=JSON.parse(fs.readFileSync('tools/catalogue-import-plan.json','utf8'));
const menu=JSON.parse(fs.readFileSync('docs/CATALOGUE_MENU.json','utf8'));
for(const r of rows){
  if(r.productType==='Filing & Organization'&&/post-it|sticky notes/i.test(r.title)){r.productType='Desk Essentials';r.categoryHandle='office-supplies-desk-essentials';r.tags=r.tags.filter(t=>!t.startsWith('catalogue:'));r.tags.push('catalogue:'+r.categoryHandle);}
  const category=menu.items.flatMap(d=>d.children||[]).find(c=>c.collection_handle===r.categoryHandle);
  if(!category?.children?.length)continue;
  let leaf='';const t=r.title.toLowerCase();
  switch(r.categoryHandle){
    case 'grocery-pantry-staples':leaf=/noodle/.test(t)?'Noodles':/oil|ghee/.test(t)?'Oils & Ghee':/spice|masala|biryani|seasoning/.test(t)?'Salt, Spices & Seasonings':'';break;
    case 'grocery-breakfast-and-spreads':leaf=/honey/.test(t)?'Honey':/butter|spread/.test(t)?'Spreads':'';break;
    case 'grocery-snacks-and-confectionery':leaf=/biscuit|cracker/.test(t)?'Biscuits & Crackers':/chocolate|bounty/.test(t)?'Chocolates & Confectionery':'';break;
    case 'grocery-canned-packaged-and-ready-foods':leaf=/tomato paste/.test(t)?'Canned & Jarred Foods':/mayonnaise|sauce|dressing/.test(t)?'Sauces, Condiments & Dressings':'';break;
    case 'grocery-beverages':leaf=/coffee|nescafe|tea/.test(t)?'Tea & Coffee':'';break;
    case 'gifting-chocolates-and-treats':leaf=/chocolate|ferrero|lindt/.test(t)?'Chocolates':'';break;
    case 'bath-and-body-bath-and-body-care':leaf=/wash|soap|cleansing gel/.test(t)?'Bath & Shower':'Body Care';break;
    case 'bath-and-body-personal-hygiene':leaf=/toothpaste|toothbrus/.test(t)?'Oral Care':'';break;
    case 'bath-and-body-mens-grooming-and-shaving':leaf='Shaving & Hair Removal';break;
    case 'home-cleaning-and-laundry':leaf=/laundry|persil|fabric|vanish/.test(t)?'Laundry':'Household Cleaning';break;
    case 'home-food-storage-and-wraps':leaf=/foil/.test(t)?'Foil':/cling/.test(t)?'Cling Film':/bag/.test(t)?'Containers':'';break;
    case 'home-home-fragrance':leaf='Air Fresheners';break;
    case 'office-supplies-desk-essentials':leaf=/tape/.test(t)?'Adhesives & Tapes':'Desk Supplies';break;
  }
  const selected=category.children.find(c=>c.title===leaf);if(selected&&!r.tags.includes('catalogue:'+selected.collection_handle))r.tags.push('catalogue:'+selected.collection_handle);
}
fs.writeFileSync('tools/catalogue-import-plan.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify({leafTagged:rows.filter(r=>r.tags.filter(t=>t.startsWith('catalogue:')).length>1).length,categories:[...new Set(rows.map(r=>r.categoryHandle))].length}));
