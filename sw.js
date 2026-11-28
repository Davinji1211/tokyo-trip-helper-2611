// 自動產生，勿手改（scripts/gen-sw.mjs）
const VERSION = 'a95212d5ae38';
const CACHE = 'tokyo-helper-' + VERSION;
const FILES = ["./","./apple-touch-icon.png","./assets/index-C48l4-Kn.js","./assets/index-C9dJuO-X.css","./icon-192.png","./icon-512.png","./img/p02-wide.webp","./img/p02.webp","./img/p03.webp","./img/p04.webp","./img/p05.webp","./img/p06.webp","./img/p07.webp","./img/p08-wide.webp","./img/p08.webp","./img/p09.webp","./img/p10.webp","./img/p11.webp","./img/p12.webp","./img/p13.webp","./img/p14.webp","./img/p15.webp","./img/p17-wide.webp","./img/p17.webp","./img/p18.webp","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('tokyo-helper-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then((r) => r || fetch(req))
    );
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
