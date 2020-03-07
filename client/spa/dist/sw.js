self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('oakframe').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/bundle.js',
                'https://use.fontawesome.com/releases/v5.8.2/css/all.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});