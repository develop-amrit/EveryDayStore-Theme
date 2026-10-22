const fs=require('fs'),cp=require('child_process');
const match=fs.readFileSync('WORKLOG.md','utf8').match(/^WORK_THEME_ID: (\d+)$/m);
if(!match||match[1]!=='189582049393'||match[1]==='189489545329')throw Error('Unexpected or live WORK_THEME_ID');
const list=JSON.parse(cp.execSync('shopify theme list --store 3djevx-mu.myshopify.com --json --no-input',{encoding:'utf8'}));
const target=(Array.isArray(list)?list:list.themes).find(t=>String(t.id)===match[1]);
if(target?.role!=='unpublished')throw Error('Target is not verified unpublished');
console.log('Verified WORK_THEME_ID '+match[1]+' is unpublished; live ID excluded.');
cp.execSync('shopify theme push --store 3djevx-mu.myshopify.com --theme '+match[1]+' --nodelete --json --no-input',{stdio:'inherit'});
