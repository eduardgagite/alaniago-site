'use client'

import { useEffect, useCallback } from 'react'

export function ServiceWorkerRegistration() {
  const registerSW = useCallback(async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('[SW] Service Worker not supported')
      return
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })

      console.log('[SW] Service Worker registered:', registration.scope)

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (!newWorker) return

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            console.log('[SW] New version available')
            
            // Optional: Show update notification to user
            if (confirm('Доступна новая версия сайта. Обновить?')) {
              newWorker.postMessage('skipWaiting')
              window.location.reload()
            }
          }
        })
      })

      // Handle controller change (after skipWaiting)
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return
        refreshing = true
        window.location.reload()
      })

    } catch (error) {
      console.error('[SW] Registration failed:', error)
    }
  }, [])

  useEffect(() => {
    // Register service worker after page load
    if (document.readyState === 'complete') {
      registerSW()
    } else {
      window.addEventListener('load', registerSW)
      return () => window.removeEventListener('load', registerSW)
    }
  }, [registerSW])

  return null
}

// Hook to interact with service worker
export function useServiceWorker() {
  const clearCache = useCallback(async () => {
    if (!('serviceWorker' in navigator)) return false

    const registration = await navigator.serviceWorker.ready
    
    return new Promise<boolean>((resolve) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.cleared)
      }
      registration.active?.postMessage('clearCache', [messageChannel.port2])
    })
  }, [])

  const update = useCallback(async () => {
    if (!('serviceWorker' in navigator)) return false

    const registration = await navigator.serviceWorker.ready
    await registration.update()
    return true
  }, [])

  return { clearCache, update }
}
