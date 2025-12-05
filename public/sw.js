// Service Worker for Alania GO
// Version: 1.0.0

const CACHE_NAME = 'alania-go-v1'
const RUNTIME_CACHE = 'alania-go-runtime-v1'

// Critical resources to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/images/logo.png',
  '/favicons/favicon.ico',
  '/favicons/favicon-32x32.png',
  '/favicons/apple-touch-icon.png',
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, fallback to network
  cacheFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    } catch (error) {
      return new Response('Offline', { status: 503 })
    }
  },

  // Network first, fallback to cache
  networkFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    } catch (error) {
      const cachedResponse = await cache.match(request)
      if (cachedResponse) {
        return cachedResponse
      }
      return new Response('Offline', { status: 503 })
    }
  },

  // Stale while revalidate
  staleWhileRevalidate: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    }).catch(() => cachedResponse)

    return cachedResponse || fetchPromise
  }
}

// Install event - precache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching critical resources')
        return cache.addAll(PRECACHE_URLS.map(url => {
          return new Request(url, { cache: 'reload' })
        }))
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('[SW] Precache failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE]
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
      })
      .then((cachesToDelete) => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          console.log('[SW] Deleting old cache:', cacheToDelete)
          return caches.delete(cacheToDelete)
        }))
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - route requests to appropriate cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip cross-origin requests except for fonts
  if (url.origin !== location.origin && !url.hostname.includes('fonts.')) {
    return
  }

  // Determine cache strategy based on request type
  let strategy
  let cacheName = RUNTIME_CACHE

  // Static assets (images, fonts, css, js) - cache first
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|css|js)$/)
  ) {
    strategy = CACHE_STRATEGIES.cacheFirst
    cacheName = CACHE_NAME
  }
  // HTML pages - network first
  else if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    strategy = CACHE_STRATEGIES.networkFirst
  }
  // API calls - network first
  else if (url.pathname.startsWith('/api/')) {
    strategy = CACHE_STRATEGIES.networkFirst
  }
  // Everything else - stale while revalidate
  else {
    strategy = CACHE_STRATEGIES.staleWhileRevalidate
  }

  event.respondWith(strategy(request, cacheName))
})

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
  
  if (event.data === 'clearCache') {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      )
    }).then(() => {
      event.ports[0].postMessage({ cleared: true })
    })
  }
})

// Background sync for offline form submissions (if needed in future)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      // Handle background sync
      Promise.resolve()
    )
  }
})

console.log('[SW] Service Worker loaded')
