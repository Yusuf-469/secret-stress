#!/bin/bash
cd '/my projects/project'
rm -rf node_modules/.next
find node_modules -name '*.turbo' -exec rm -rf {} +
find node_modules -name '.turbo' -exec rm -rf {} +
find node_modules -name 'next-minimal-server.js.nft.json' -exec rm {} +
echo 'cleared all caches'
npm run build 2>&1 | Select-String -Pattern 'getDatabase|Error|Export'
echo 'done'