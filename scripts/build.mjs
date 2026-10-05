import {build} from 'esbuild';
await build({entryPoints:['src/client.js'],outfile:'public/app.js',bundle:true,minify:true,platform:'browser',format:'iife',target:['es2022']});
console.log('Browser app built');
