const CACHE_NAME = "etiquetas-cache-v2";
const urlsToCache = [ "/", "/index.html", "/manifest.json" ];

self.addEventListener("install", event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
});

self.addEventListener("activate", event=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", event=>{
  event.respondWith(caches.match(event.request).then(res=>res||fetch(event.request)));
});
