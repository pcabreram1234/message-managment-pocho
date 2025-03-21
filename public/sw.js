// public/service-worker.js
const API_BASE_URL = self.location.origin.includes(`localhost`)
  ? `http://localhost:3000`
  : window.__ENV__.API_BASE_URL;

const CACHE_NAME = `PMMS_v1`;
const urlsToCache = [
  `/`,
  `/index.html`,
  // Agrega aquí otros recursos que quieras almacenar en caché
];

const urlsToNoTCached = [`${API_BASE_URL}/api/v1/users/verify`, `${API_BASE_URL}/api/v1/users/check-auth`];
const dinamicGETRequests = [
  new RegExp(`${API_BASE_URL}/api/v1/categories/categoriesName/[^/]+$`)
];

const cacheDependencyMap = {
  messages: {
    cacheToDelete: [
      `${API_BASE_URL}/api/v1/messages/addMessage`,
      `${API_BASE_URL}/api/v1/messages/editMessage`,
      `${API_BASE_URL}/api/v1/messages/updateMessageCategories`,
      `${API_BASE_URL}/api/v1/messages/deleteMessage`,
      `${API_BASE_URL}/api/v1/messages/deleteMessages`,
      `${API_BASE_URL}/api/v1/messages/associate_contact`,
    ],
    requestToUpdate: `${API_BASE_URL}/api/v1/messages`,
    foreignCacheToUpdate: `${API_BASE_URL}/api/v1/configuration`,
  },

  contacts: {
    cacheToDelete: [
      `${API_BASE_URL}/api/v1/contacts/distinctContacts`,
      `${API_BASE_URL}/api/v1/contacts/addContact`,
      `${API_BASE_URL}/api/v1/contacts/editContact`,
      `${API_BASE_URL}/api/v1/contacts/deleteContact`,
      `${API_BASE_URL}/api/v1/contacts/deleteContacts`,
    ],
    requestToUpdate: `${API_BASE_URL}/api/v1/contacts`,
    foreignCacheToUpdate: `${API_BASE_URL}/api/v1/messages`,
  },
  categories: {
    cacheToDelete: [
      `${API_BASE_URL}/api/v1/categories/distinctCategories`,
      `${API_BASE_URL}/api/v1/categories/addCategory`,
      `${API_BASE_URL}/api/v1/categories/editCategory`,
      `${API_BASE_URL}/api/v1/categories/deleteCategory`,
      `${API_BASE_URL}/api/v1/categories/deleteCategories`,
    ],
    requestToUpdate: `${API_BASE_URL}/api/v1/categories`,
    foreignCacheToUpdate: `${API_BASE_URL}/api/v1/messages`,
  },
  configuration: {
    cacheToDelete: [
      `${API_BASE_URL}/api/v1/configuration/addMesageConfiguration`,
      `${API_BASE_URL}/api/v1/configuration/addMesagesConfiguration`,
      `${API_BASE_URL}/api/v1/configuration/verifyMessage`,
      `${API_BASE_URL}/api/v1/configuration/verifyMessages`,
    ],
    requestToUpdate: `${API_BASE_URL}/api/v1/configuration`,
    foreignCacheToUpdate: `${API_BASE_URL}/api/v1/configuration `,
  },
  users: {
    cacheToDelete: [
      `${API_BASE_URL}/api/v1/users/login`,
      `${API_BASE_URL}/api/v1/users/logoff`,
      `${API_BASE_URL}/api/v1/users/adduser`,
      `${API_BASE_URL}/api/v1/users/edituser`,
      `${API_BASE_URL}/api/v1/users/deleteuser`,
      `${API_BASE_URL}/api/v1/users/signup`,
    ],
    requestToUpdate: `${API_BASE_URL}/api/v1/users`,
  },
};

// Instalar el Service Worker y almacenar los recursos en caché
self.addEventListener(`install`, (event) => {
  // caches.delete(CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar solicitudes y responder con recursos en caché si están disponibles
self.addEventListener(`fetch`, (event) => {
  const url = new URL(event.request.url);

  // 1. Verifica si la solicitud es para una ruta que no debe ser cacheada

  if (event.request.method === `GET`) {
    const isDinamicGETResquests = dinamicGETRequests.find((el) =>
      el.test(url.pathname)
    );

    if (isDinamicGETResquests) {
      return event.respondWith(
        caches.match(event.request).then(async (cachedResponse) => {
          if (cachedResponse) {
            await caches.delete(cachedResponse);
            console.log(cachedResponse);
            return fetch(event.request);
          }
        })
      );
    }

    const isNotCacheableRoute = urlsToNoTCached.some((el) =>
      url.pathname.startsWith(el)
    );

    // console.log(
    //   `La ruta ` + event.request.url + ` es cacheable: ` + isNotCacheableRoute
    // );

    if (isNotCacheableRoute) {
      return event.respondWith(fetch(event.request));
    } else {
      event.respondWith(
        caches.match(event.request).then(async (cachedResponse) => {
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
    }
  } else {
    // Limpiar cache previa cuando el usuario trata de hacer login o logoff
    if (
      url.pathname === cacheDependencyMap.users.cacheToDelete[0] ||
      url.pathname === cacheDependencyMap.users.cacheToDelete[1]
    ) {
      // console.log(`usuario esta tratando de hacer login`);
      const cacheWhitelist = [CACHE_NAME];
      event.waitUntil(
        caches.open(cacheWhitelist).then((cache) => {
          caches.keys().then(async (cacheName) => {
            return await caches.delete(cacheName);
          });
        })
      );
    } else {
      const apiRoute = url.pathname.split(`/`)[3];
      const cacheDependency = cacheDependencyMap[apiRoute];
      const isNotCacheableDependency = cacheDependency.cacheToDelete.some(
        (el) => el === url.pathname
      );
      if (isNotCacheableDependency) {
        event.waitUntil(
          caches.open(CACHE_NAME).then(async (cache) => {
            cache.keys().then(async (resp) => {
              resp.map(async (cacheToVerify) => {
                const { requestToUpdate, foreignCacheToUpdate } =
                  cacheDependency;
                const cacheUrl = new URL(cacheToVerify.url);
                if (cacheUrl.pathname === requestToUpdate) {
                  await cache.delete(cacheToVerify);
                }

                if (foreignCacheToUpdate) {
                  if (cacheUrl.pathname === foreignCacheToUpdate) {
                    console.log(`Borrar foreing`);
                    await cache.delete(cacheToVerify);
                  }
                }
              });
            });
          })
        );
      }
      return event.respondWith(fetch(event.request));
    }
  }
});

self.addEventListener(`reload`, (e) => {
  console.log(`Pagina cargada`);
});

self.addEventListener(`beforeunload`, (event) => {
  console.log(`cargado nuevamente el service worker`);
});

// Actualizar el Service Worker limpiando el caché anterior
self.addEventListener(`activate`, (event) => {
  event.waitUntil(
    // Obtener todas las caches
    caches.keys().then((cacheNames) => {
      // Filtrar caches que no queremos borrar
      return Promise.all(
        cacheNames.map(async (cacheName) => {
          return caches.open(cacheName).then(async (cache) => {
            // Filtrar las requests dentro de la cache que no son JSON
            const requests = await cache.keys();
            return await Promise.all(
              requests.map(async (request_1) => {
                // Evitar eliminar los recursos JSON
                const response = await cache.match(request_1);
                if (
                  response &&
                  response.headers.get(`Content-Type`) &&
                  response.headers
                    .get(`Content-Type`)
                    .includes(`application/json`)
                ) {
                  // Es JSON, lo dejamos en la cache
                  return;
                } else {
                  // No es JSON, lo eliminamos
                  return cache.delete(request_1);
                }
              })
            );
          });
        })
      );
    })
  );
});

// self.addEventListener(`activate`, (event) => {
//   console.log(`activate`);
//   console.log(event);
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           console.log(cacheName);
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });
