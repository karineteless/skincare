// Nécessaire: funciona offline depois da primeira abertura.
// Não precisa mexer aqui para atualizar: o app sempre busca a versão nova quando há internet.
const CACHE = 'necessaire-v3';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'dados-iniciais.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonte = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonte) return;
  if (fonte) {
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(req)) || fetch(req).then(r => { c.put(req, r.clone()); return r; })));
    return;
  }
  // rede primeiro, sem cache HTTP (pega a versão nova do GitHub na hora); cache só se estiver offline
  e.respondWith(fetch(req.url, {cache: 'no-cache', credentials: 'same-origin'}).then(r => {
    const copia = r.clone(); caches.open(CACHE).then(c => c.put(req, copia)); return r;
  }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
});
