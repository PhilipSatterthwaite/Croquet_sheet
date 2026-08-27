// Offline cache. A croquet lawn is exactly the sort of place with no bars, so
// the whole app is precached on first visit and served from disk after that.
//
// Bump CACHE whenever index.html changes -- the old cache is deleted on
// activate, which is what makes an update actually reach an installed phone.
var CACHE  = 'croquet-v6';
var ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) {
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;

  // Page loads go to the network first so a push to GitHub shows up next time
  // the app is opened with signal; the cache is the fallback, not the source.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        return r;
      }).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }

  e.respondWith(caches.match(e.request).then(function (hit) {
    return hit || fetch(e.request).then(function (r) {
      var copy = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return r;
    });
  }));
});
