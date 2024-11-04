// public/service-worker.js

const CACHE_NAME = "PMMS" + new Date().getTime().toString();
const urlsToCache = [
  "/",
  "./index.html",
  // Agrega aquí otros recursos que quieras almacenar en caché
];

// Instalar el Service Worker y almacenar los recursos en caché
self.addEventListener("install", (event) => {
  // caches.delete(CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache abierta");
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar solicitudes y responder con recursos en caché si están disponibles
self.addEventListener("fetch", (event) => {
  // console.log(event);
  const url = new URL(event.request.url);
  // console.log(url);
  // Filtra las peticiones que deseas almacenar en caché, por ejemplo, si el URL contiene una parte específica
  if (event.request.method === "GET") {
    if (
      url.pathname.startsWith("/api/v1/") &&
      url.pathname !== "/api/v1/users/login"
    ) {
      event.respondWith(
        caches
          .match(event.request || url.pathname.toString())
          .then(async (cachedResponse) => {
            if (cachedResponse) {
              // Si la respuesta ya está en caché, devuélvela directamente
              return cachedResponse;
            }

            // Si no está en caché, haz la solicitud y almacena el resultado en la caché
            const networkResponse = await fetch(event.request);
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone()); // Clona y guarda la respuesta en caché
            return networkResponse;
          })
      );
    }
  }
  if (
    url.pathname === "/api/v1/users/login" ||
    event.request.method !== "GET"
  ) {
    console.log("Login detectado o pagina recargándose, limpiando caché...");
    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName === CACHE_NAME || cacheName.startsWith("PMMS")) {
              return caches.delete(cacheName);
            }
          })
        )
      )
    );
  }
});

self.addEventListener("reload", (e) => {
  console.log("Pagina cargada");
});

self.addEventListener("load", (event) => {
  console.log("cargado nuevamente el service worker");
});

// Actualizar el Service Worker limpiando el caché anterior
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
