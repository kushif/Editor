// ═══════════════════════════════════════════
//  SERVICE WORKER — Editor! 🐾
//  Estrategia: Cache First para assets propios
//              Network First para Google Fonts
// ═══════════════════════════════════════════

const CACHE_NAME = 'editor-v2';
const CACHE_NAME_FONTS = 'editor-fonts-v2';

// Archivos del app shell (se cachean en la instalación)
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ── INSTALL: pre-cachear el app shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpiar cachés viejas ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_NAME_FONTS)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia según tipo de recurso ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts → Network First, fallback a caché
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME_FONTS).then(cache =>
        fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request))
      )
    );
    return;
  }

  // Recursos propios → Cache First, fallback a red
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Cachear dinámicamente nuevos recursos propios
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache =>
              cache.put(event.request, response.clone())
            );
          }
          return response;
        });
      })
    );
    return;
  }

  // Resto (RAE API, etc.) → Network only, sin caché
  // (los datos de usuario nunca pasan por aquí de todas formas)
});
