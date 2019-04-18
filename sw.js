'use strict';

importScripts('./cache-polyfill.js');

(function () {
    self.addEventListener('install', function (e) {
        e.waitUntil(
            caches.open('cardview')
                .then(function (cache) {
                    return cache.addAll([
                        './',
                        './index.html',
                        './cache-polyfill.js',
                        './sw.js',
                        './script.js',
                        './styles.css',
                        './webfont.woff',
                        './webfont.woff2'
                    ]);
                })
        );
    });

    self.addEventListener('fetch', function (event) {
        console.log(event.request.url);
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    });
})();
