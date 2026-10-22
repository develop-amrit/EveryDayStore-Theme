const fs=require('fs');let p='tools/ep-final-qa.cjs',s=fs.readFileSync(p,'utf8');
s=s.replace('result.cart={};try{','const controls=page.locator(\'ep-add-button[data-variant="\'+id+\'"]\').first();result.cart={};try{').replaceAll('candidate.locator(','controls.locator(');
s=s.replace("await page.keyboard.press('Enter');result.faq=", "await page.keyboard.press('Enter');await page.waitForTimeout(200);result.faq=");
fs.writeFileSync(p,s);
