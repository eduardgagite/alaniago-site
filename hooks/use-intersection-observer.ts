'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
  triggerOnce?: boolean
}

interface IntersectionObserverEntry {
  isIntersecting: boolean
  intersectionRatio: number
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}): {
  ref: (node: Element | null) => void
  isIntersecting: boolean
  hasIntersected: boolean
  intersectionRatio: number
} {
  const [entry, setEntry] = useState<IntersectionObserverEntry>({
    isIntersecting: false,
    intersectionRatio: 0,
  })
  const [hasIntersected, setHasIntersected] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<Element | null>(null)

  const frozen = freezeOnceVisible && entry.isIntersecting

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }, [])

  const ref = useCallback(
    (node: Element | null) => {
      // Cleanup previous observer
      cleanup()

      // Store element reference
      elementRef.current = node

      // Don't observe if frozen or no node
      if (frozen || !node) return

      // Check for IntersectionObserver support
      if (typeof IntersectionObserver === 'undefined') {
        // Fallback for older browsers - immediately set as visible
        setEntry({ isIntersecting: true, intersectionRatio: 1 })
        setHasIntersected(true)
        return
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        ([observerEntry]) => {
          setEntry({
            isIntersecting: observerEntry.isIntersecting,
            intersectionRatio: observerEntry.intersectionRatio,
          })

          if (observerEntry.isIntersecting) {
            setHasIntersected(true)

            // If triggerOnce, stop observing after first intersection
            if (triggerOnce && observerRef.current && elementRef.current) {
              observerRef.current.unobserve(elementRef.current)
            }
          }
        },
        { threshold, root, rootMargin }
      )

      observerRef.current.observe(node)
    },
    [threshold, root, rootMargin, frozen, triggerOnce, cleanup]
  )

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    ref,
    isIntersecting: entry.isIntersecting,
    hasIntersected,
    intersectionRatio: entry.intersectionRatio,
  }
}
