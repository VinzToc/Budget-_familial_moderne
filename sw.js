// La version vient de index.html (APP_VERSION) via sw.js?v=...
const V='budget-familial-'+(new URL(self.location).searchParams.get('v')||'0'),F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
if(q.mode==='navigate'){e.respondWith(fetch(q,{cache:'no-store'}).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(q,c));return n}).catch(()=>caches.match(q).then(r=>r||caches.match('index.html'))));return}
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(q,c));return n})))});
