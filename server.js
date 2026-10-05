import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir,readFile,writeFile,readdir,rename} from 'node:fs/promises';
import {createHash,timingSafeEqual,randomUUID} from 'node:crypto';
import app from './app-server.js';
const root=path.dirname(fileURLToPath(import.meta.url));
const data=path.resolve(root,process.env.DATA_DIR||'data');
const password=process.env.UPLOAD_PASSWORD||'';
await mkdir(data,{recursive:true});
const filePath=key=>{if(!/^presentations\/[a-f0-9]{64}$/.test(key))throw new Error('Invalid key');return path.join(data,key.slice(14)+'.json')};
async function get(key){try{return JSON.parse(await readFile(filePath(key),'utf8'))}catch(e){if(e.code==='ENOENT')return null;throw e}}
const FILES={async head(key){return get(key)},async get(key){return get(key)},async put(key,body,options){const temp=filePath(key)+'.'+randomUUID()+'.tmp';await writeFile(temp,JSON.stringify({body,customMetadata:options.customMetadata,uploaded:new Date().toISOString()}),{flag:'wx'});await rename(temp,filePath(key));},async list(){const names=(await readdir(data)).filter(n=>/^[a-f0-9]{64}\.json$/.test(n));const objects=await Promise.all(names.map(async n=>{const item=JSON.parse(await readFile(path.join(data,n),'utf8'));return{key:'presentations/'+n.slice(0,-5),customMetadata:item.customMetadata,uploaded:new Date(item.uploaded)}}));return{objects,truncated:false}}};
const reply=(res,status,error)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify({error}));};
const digest=s=>createHash('sha256').update(s).digest();
const assets={'/styles.css':['styles.css','text/css; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8']};
const server=http.createServer(async(req,res)=>{try{const host=String(req.headers.host||'localhost');const url=new URL(req.url,'http://'+host);
if(url.pathname==='/api/config'&&req.method==='GET'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(JSON.stringify({requiresPassword:!!password}))}
if(assets[url.pathname]&&req.method==='GET'){const [name,type]=assets[url.pathname];res.writeHead(200,{'Content-Type':type,'X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});return res.end(await readFile(path.join(root,'public',name)))}
if(req.method==='POST'){
const allowedHost=String(req.headers['x-forwarded-host']||host).split(',')[0].trim();let origin;try{origin=new URL(req.headers.origin)}catch{return reply(res,403,'Cerere nepermisă.')}if(origin.host!==allowedHost)return reply(res,403,'Cerere nepermisă.');
if(password&&!timingSafeEqual(digest(String(req.headers['x-upload-password']||'')),digest(password)))return reply(res,401,'Introdu parola pentru încărcare.');
}
let payload;if(req.method==='POST'){const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>21*1024*1024)return reply(res,413,'Fișierul depășește 20 MB.');chunks.push(chunk)}payload=Buffer.concat(chunks)}
const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(value!==undefined)headers.set(name,Array.isArray(value)?value.join(','):value);
// Reverse proxies can terminate HTTPS. Retain the validated browser origin for CSRF checks.
const requestUrl=req.method==='POST'?new URL(req.url,req.headers.origin).toString():url.toString();
const response=await app.fetch(new Request(requestUrl,{method:req.method,headers,...(payload?{body:payload}: {})}),{FILES});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
}catch(e){console.error(e.message);if(!res.headersSent)reply(res,500,'Nu am putut finaliza operațiunea. Încearcă din nou.');else res.end()}});
server.listen(Number(process.env.PORT||3000),process.env.HOST||'0.0.0.0',()=>console.log('Avvero Grow-Up: http://localhost:'+server.address().port));
