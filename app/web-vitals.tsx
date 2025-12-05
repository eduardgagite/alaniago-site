'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { useEffect, useCallback } from 'react'

// Web Vitals thresholds based on Google's recommendations
const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint
}

type MetricName = keyof typeof WEB_VITALS_THRESHOLDS

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[name as MetricName]
  if (!thresholds) return 'good'
  
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.needsImprovement) return 'needs-improvement'
  return 'poor'
}

function formatValue(name: string, value: number): string {
  if (name === 'CLS') return value.toFixed(3)
  return `${Math.round(value)}ms`
}

export function WebVitals() {
  // Track performance observer for additional metrics
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    // Observe Long Tasks (tasks > 50ms that block main thread)
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Web Vitals] Long Task detected:', {
              duration: `${Math.round(entry.duration)}ms`,
              startTime: `${Math.round(entry.startTime)}ms`,
            })
          }
        }
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
      
      return () => longTaskObserver.disconnect()
    } catch (e) {
      // Long task observer not supported
    }
  }, [])

  // Observe Layout Shifts for detailed CLS debugging
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
          // Only log unexpected shifts (not from user input)
          if (!layoutShift.hadRecentInput && layoutShift.value > 0.01) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('[Web Vitals] Layout Shift:', {
                value: layoutShift.value.toFixed(4),
                hadRecentInput: layoutShift.hadRecentInput,
              })
            }
          }
        }
      })
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
      
      return () => layoutShiftObserver.disconnect()
    } catch (e) {
      // Layout shift observer not supported
    }
  }, [])

  const sendToAnalytics = useCallback((metric: {
    name: string
    value: number
    rating?: string
    delta: number
    id: string
  }) => {
    // Send to Google Analytics 4 if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag
      gtag?.('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_rating: metric.rating,
        non_interaction: true,
      })
    }

    // Send to custom analytics endpoint (uncomment when endpoint is available)
    // try {
    //   const body = JSON.stringify({
    //     ...metric,
    //     url: window.location.href,
    //     timestamp: Date.now(),
    //   })
    //   // Use `sendBeacon` for reliability on page unload
    //   if (navigator.sendBeacon) {
    //     navigator.sendBeacon('/api/vitals', body)
    //   } else {
    //     fetch('/api/vitals', { body, method: 'POST', keepalive: true })
    //   }
    // } catch (e) {
    //   console.error('[Web Vitals] Failed to send metrics:', e)
    // }
  }, [])

  useReportWebVitals((metric) => {
    const rating = getRating(metric.name, metric.value)
    const formattedValue = formatValue(metric.name, metric.value)

    // Enhanced logging in development with color coding
    if (process.env.NODE_ENV === 'development') {
      const colors = {
        good: 'color: #0cce6b; font-weight: bold',
        'needs-improvement': 'color: #ffa400; font-weight: bold',
        poor: 'color: #ff4e42; font-weight: bold',
      }
      
      console.log(
        `%c[Web Vitals] ${metric.name}: ${formattedValue} (${rating})`,
        colors[rating],
        {
          value: metric.value,
          rating: metric.rating || rating,
          delta: metric.delta,
          id: metric.id,
        }
      )
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      sendToAnalytics({
        ...metric,
        rating,
      })
    }
  })

  return null
}
