const fs=require('fs'),cp=require('child_process');
for(const file of ['tools/ep-categories-build.cjs','tools/ep-bundle.cjs','tools/ep-polish-build.cjs','tools/ep-polish-runtime.cjs','tools/check-storefront.cjs','tools/check-ux-polish.cjs','tools/cart-smoke.cjs'])cp.execFileSync(process.execPath,[file],{stdio:'inherit'});
const match=fs.readFileSync('WORKLOG.md','utf8').match(/^WORK_THEME_ID: (\d+)$/m);
if(!match||match[1]!=='189582049393'||match[1]==='189489545329')throw Error('Unexpected or live WORK_THEME_ID');
const list=JSON.parse(cp.execSync('shopify theme list --store 3djevx-mu.myshopify.com --json --no-input',{encoding:'utf8'}));
const target=(Array.isArray(list)?list:list.themes).find(t=>String(t.id)===match[1]);
if(target?.role!=='unpublished')throw Error('Target is not verified unpublished');
console.log('Verified WORK_THEME_ID '+match[1]+' is unpublished; live ID excluded.');
let only='';if(process.env.EP_PUSH_BASE){const git=args=>cp.execFileSync('git',['-c','safe.directory=D:/shopify-store-editor',...args],{encoding:'utf8',stdio:['pipe','pipe','ignore']}).trim().split(/\r?\n/);const files=[...new Set([...git(['diff','--name-only',process.env.EP_PUSH_BASE]),...git(['ls-files','--others','--exclude-standard'])])].filter(p=>/^(assets|config|layout|locales|sections|snippets|templates)\//.test(p)&&fs.existsSync(p));for(const p of files)if(!/^[\w./-]+$/.test(p))throw Error('Unsafe theme path');only=files.map(p=>' --only "'+p+'"').join('');console.log('Deploying '+files.length+' changed theme files only.');}
const command=process.argv[2]==='dev'?'shopify theme dev --store 3djevx-mu.myshopify.com --theme '+match[1]+' --nodelete --no-input --live-reload off --port 9293':'shopify theme push --store 3djevx-mu.myshopify.com --theme '+match[1]+' --nodelete --json --no-input'+only;
cp.execSync(command,{stdio:'inherit'});
