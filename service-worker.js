const CACHE_NAME = "baby-cheatsheet-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/cheatsheet.html",
  "/safety.html",
  "/signals.html",
  "/tips.html",
  "/warning.html",
  "/burping.html",
  "/memory-book.html",
  "/style.css",
  "/js/script.js",
  "/js/lang.js",
  "/js/cloudinary-config.js",
  "/js/memory-book.js",
  "/js/pageflip.js",
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
