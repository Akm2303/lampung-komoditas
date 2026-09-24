const CACHE = "lch-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/about.html",
  "/commodities.html",
  "/commodity-detail.html",
  "/contact.html",
  "/login.html",
  "/register.html",
  "/css/style.css",
  "/js/app.js",
  "/manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // Jangan cache request Firebase / Google API — biarkan realtime
  if (url.includes("firebase") ||
      url.includes("googleapis.com/identitytoolkit") ||
      url.includes("firestore.googleapis.com") ||
      url.includes("gstatic.com/firebasejs")) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match("/offline.html"))
    )
  );
});