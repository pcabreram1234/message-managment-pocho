// public/service-worker.js

const CACHE_NAME = "PMMS" + new Date().getTime().toString();
const urlsToCache = [
  "/",
  "/index.html",
  // Agrega aquí otros recursos que quieras almacenar en caché
];

const urlsToNoTCached = [
  "/api/v1/users/login",
  "/api/v1/users/signup",
  "/api/v1/users/verify",
  "/api/v1/users/check-auth",
];

const cacheDependencyMap = {
  messages: {
    cacheToDelete: [
      "/api/v1/messages/addMessage",
      "/api/v1/messages/editMessage",
      "/api/v1/messages/updateMessageCategories",
      "/api/v1/messages/deleteMessage",
      "/api/v1/messages/deleteMessages",
      "/api/v1/messages/associate_contact",
    ],
    requestToUpdate: "/api/v1/messages",
  },

  contacts: {
    cacheToDelete: [
      "/api/v1/contacts/distinctContacts",
      "/api/v1/contacts/addContact",
      "/api/v1/contacts/editContact",
      "/api/v1/contacts/deleteContact",
      "/api/v1/contacts/deleteContacts",
    ],
    requestToUpdate: "/api/v1/contacts",
  },
};

const requestMethosToNotCached = ["POST", "PATCH", "PUT", "DELETE"];

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
  const url = new URL(event.request.url);

  // 1. Verifica si la solicitud es para una ruta que no debe ser cacheada
  const isNotCacheableRoute = urlsToNoTCached.some((el) =>
    url.pathname.startsWith(el)
  );

  // Verificar si la solicitud no es del tipo GET y no debe ser cacheada
  if (event.request.method !== "GET" || isNotCacheableRoute) return;

  // Extraer la ruta de la API de la URL para comprobar dependencias en el caché
  const apiRoute = url.pathname.split("/")[3];
  const cacheDependency = cacheDependencyMap[apiRoute];

  if (cacheDependency && cacheDependency.cacheToDelete.includes(url.pathname)) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(
          cacheDependency.requestToUpdate
        );
        if (cachedResponse) {
          await cache.delete(cacheDependency.requestToUpdate);
        }
        event.respondWith(fetch(event.request));
        return; // Ejecutar la solicitud después de borrar del caché
      })
    );
  }

  // 2. Maneja las solicitudes que no deben ser cacheadas o que no son de tipo GET
  if (isNotCacheableRoute || event.request.method !== "GET") {
    caches.open(CACHE_NAME);
    event.respondWith(fetch(event.request));
    return;
  }

  // 3. Para rutas cacheables: revisa si el recurso está en caché y si no, busca desde la red
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si no está en caché, busca desde la red y cachea el resultado
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

self.addEventListener("reload", (e) => {
  console.log("Pagina cargada");
});

self.addEventListener("beforeunload", (event) => {
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
