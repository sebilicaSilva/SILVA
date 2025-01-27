const CACHE_NAME = 'silva-parc-v1';
const urlsToCache = ['index.html', 'style.css', 'script.js', 'manifest.json', 'icon.png'];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
