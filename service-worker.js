const CACHE_NAME = "baby-cheatsheet-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/cheatsheet.html",
  "/safety.html",
  "/signals.html",
  "/tips.html",
  "/warning.html",
  "/style.css",
  "/js/script.js",
  "/images/denied.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
