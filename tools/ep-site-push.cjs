require('child_process').execFileSync(process.execPath,['tools/ep-site-build.cjs'],{stdio:'inherit'});process.env.EP_PUSH_BASE='c97368c';require('./ep-push.cjs');
