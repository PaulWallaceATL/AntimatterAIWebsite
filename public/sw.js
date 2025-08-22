/* Lightweight SW for stale-while-revalidate of static assets */
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

const CACHE_NAME = 'amw-static-v1'

function isCachable(request) {
  const url = new URL(request.url)
  return (
    request.method === 'GET' &&
    (
      url.pathname.startsWith('/_next/static/') ||
      url.pathname.match(/\.(?:js|css|woff2?|png|jpg|jpeg|gif|svg|webp|avif)$/)
    )
  )
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (!isCachable(request)) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request)
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            cache.put(request, response.clone())
          }
          return response
        })
        .catch(() => cached)
      return cached || fetchPromise
    })
  )
})


