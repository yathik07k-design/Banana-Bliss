const CACHE_NAME = "banana-bliss-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./payment.html",
  "./review.html",
  "./orders.html",
  "./success.html",
  "./style.css",
  "./script.js",
  "./language.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});