const CACHE_NAME = "football-v1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/teams.html",
    "/pages/favorite.html",
    "/css/materialize.min.css",
    "/css/custom.css",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then((response) => {
                if (response) {
                    return response
                }
                let fetchRequest = event.request.clone()
                return fetch(fetchRequest).then((response) => {
                    if (!response || response.status !== 200) {
                        return response
                    }
                    let responseToCache = response.clone()
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache)
                        })
                    return response
                })
            })
    )
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME && cacheName.startsWith('football')) {
                        console.log("serviceWorker: cache" + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});