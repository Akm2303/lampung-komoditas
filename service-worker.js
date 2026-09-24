const CACHE = "lch-v1";
const ASSETS = ["/", "/index.html", "/css/style.css", "/js/app.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("fetch", e => {
  // Jangan cache API Firebase — biarkan realtime
  if (e.request.url.includes("firebase") || e.request.url.includes("googleapis.com/identitytoolkit")) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match("/offline.html")))
  );
});