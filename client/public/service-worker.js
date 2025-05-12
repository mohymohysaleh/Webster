const CACHE_NAME = 'liked-songs-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Listen for client to cache 3 likes
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_LIKED_SONGS') {
    const audioUrls = event.data.songs;
    caches.open(CACHE_NAME).then(cache => {
      audioUrls.forEach(url => {
        cache.add(url).catch(() => {});
      });
    });
  }
});

// fetch requests for music
self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.match(/\.(mp3|wav|ogg)$/)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(response =>
          response || fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        )
      )
    );
  }
}); 