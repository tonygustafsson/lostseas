// Lost Seas service worker. The game cannot be played offline, so this only
// speeds up static assets and shows a friendly page when the network is down.
// Never cache /api/* or HTML, game state lives on the server.

const VERSION = "v1"
const STATIC_CACHE = `static-${VERSION}`
const OFFLINE_URL = "/offline.html"
const STATIC_PATHS = [/^\/_next\/static\//, /^\/img\//]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        cache.addAll([OFFLINE_URL, "/android-chrome-192x192.png"])
      )
  )
  // Activation is triggered by the page, so it can prompt before reloading
})

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== "GET" || url.origin !== self.location.origin) return

  // Page navigations: always network, offline page as fallback
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)))
    return
  }

  // Static assets: cache first. Range requests (audio/video) are left alone.
  if (
    !request.headers.has("range") &&
    STATIC_PATHS.some((re) => re.test(url.pathname))
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request)
        if (cached) return cached

        const response = await fetch(request)
        if (response.ok) cache.put(request, response.clone())
        return response
      })
    )
  }
})
