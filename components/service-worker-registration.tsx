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
    
    // Check if service worker is active before sending message
    if (!registration.active) {
      console.warn('[SW] No active service worker to clear cache')
      return false
    }
    
    return new Promise<boolean>((resolve) => {
      const messageChannel = new MessageChannel()
      
      // Set timeout to prevent hanging indefinitely
      const timeout = setTimeout(() => {
        messageChannel.port1.close()
        console.warn('[SW] Cache clear timeout')
        resolve(false)
      }, 5000) // 5 second timeout
      
      messageChannel.port1.onmessage = (event) => {
        clearTimeout(timeout)
        messageChannel.port1.close()
        resolve(event.data.cleared ?? false)
      }
      
      messageChannel.port1.onerror = () => {
        clearTimeout(timeout)
        messageChannel.port1.close()
        console.error('[SW] Error clearing cache')
        resolve(false)
      }
      
      registration.active.postMessage('clearCache', [messageChannel.port2])
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
