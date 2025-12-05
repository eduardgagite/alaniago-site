'use client'

import { ReactNode, Suspense, memo } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface LazySectionProps {
  children: ReactNode
  className?: string
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  minHeight?: string
}

// Default skeleton loader with animation
function DefaultSkeleton({ minHeight }: { minHeight: string }) {
  return (
    <div 
      className="animate-pulse bg-gradient-to-b from-alania-dark/50 to-alania-dark"
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-48 bg-white/5 rounded-lg" />
          <div className="h-4 w-96 max-w-full bg-white/5 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/5 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LazySectionComponent({
  children,
  className = '',
  fallback,
  rootMargin = '200px 0px', // Start loading 200px before entering viewport
  threshold = 0,
  minHeight = '400px',
}: LazySectionProps) {
  const { ref, hasIntersected } = useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce: true,
    freezeOnceVisible: true,
  })

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? (
        <Suspense fallback={fallback || <DefaultSkeleton minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        fallback || <DefaultSkeleton minHeight={minHeight} />
      )}
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const LazySection = memo(LazySectionComponent)
