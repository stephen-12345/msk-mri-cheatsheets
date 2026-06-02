/* MSK MRI Dictation Cheat Sheets - offline service worker.
   Strategy:
     - HTML / page navigations -> NETWORK-FIRST (always show the latest when online,
       fall back to the cached copy only when offline). This is what makes updates
       appear without reinstalling the app.
     - Other assets (CSS, JS, icons, PDFs, MD) -> CACHE-FIRST with runtime caching,
       so the app still works offline.
   Bump CACHE on each meaningful change to purge the old cache. */
const CACHE = 'msk-mri-v10';

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'assets/cheatsheet.css',
  'trainer/index.html',
  'trainer/trainer.js',
  'trainer/questions.js',
  'trainer/firebase-config.js',
  'trainer/sync.js',
  'templates/index.html',
  'templates/engine.js',
  'templates/ankle.html',
  'templates/knee.html',
  'templates/elbow.html',
  'templates/hip.html',
  'templates/shoulder.html',
  'templates/wrist.html',
  'templates/knee-cartilage.html',
  'ankle/ankle-mri-cheatsheet.html',
  'knee/knee-mri-cheatsheet.html',
  'elbow/elbow-mri-cheatsheet.html',
  'hip/hip-mri-cheatsheet.html',
  'shoulder/shoulder-mri-cheatsheet.html',
  'wrist/wrist-mri-cheatsheet.html',
  'foot/foot-mri-cheatsheet.html',
  'finger/finger-mri-cheatsheet.html',
  'tumors/tumors-mri-cheatsheet.html',
  'ankle/ankle-mri-cases.html',
  'knee/knee-mri-cases.html',
  'elbow/elbow-mri-cases.html',
  'hip/hip-mri-cases.html',
  'shoulder/shoulder-mri-cases.html',
  'wrist/wrist-mri-cases.html',
  'foot/foot-mri-cases.html',
  'finger/finger-mri-cases.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // add individually so one missing file doesn't abort the whole install
    await Promise.all(SHELL.map((u) => cache.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isPage = req.mode === 'navigate' || (sameOrigin && url.pathname.endsWith('.html'));

  if (isPage) {
    // NETWORK-FIRST: fresh page when online, cached page when offline
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res && res.ok && sameOrigin) {
          const cache = await caches.open(CACHE);
          cache.put(req, res.clone());
        }
        return res;
      } catch (err) {
        const cached = await caches.match(req);
        if (cached) return cached;
        const home = await caches.match('index.html');
        if (home) return home;
        throw err;
      }
    })());
    return;
  }

  // CACHE-FIRST for static assets, with runtime caching for offline
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    if (res && res.ok && sameOrigin) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  })());
});
