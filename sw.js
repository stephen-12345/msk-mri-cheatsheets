/* MSK MRI Dictation Cheat Sheets - offline service worker.
   Cache-first for the app shell, runtime caching for everything else
   (PDFs/MD get cached the first time you open them while online). */
const CACHE = 'msk-mri-v1';

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'assets/cheatsheet.css',
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
  'tumors/tumors-mri-cheatsheet.html'
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
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      // cache same-origin successful responses for next time (offline)
      if (res && res.ok && new URL(req.url).origin === self.location.origin) {
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    } catch (err) {
      // offline & not cached: fall back to the homepage for navigations
      if (req.mode === 'navigate') {
        const home = await caches.match('index.html');
        if (home) return home;
      }
      throw err;
    }
  })());
});
