'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const NEAR_END_THRESHOLD = 0.95

function readScrollProgress() {
  const scrollTop = Math.max(
    window.scrollY,
    document.documentElement.scrollTop,
    document.body.scrollTop,
  )

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
  )

  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  const maxScroll = scrollHeight - viewportHeight

  if (maxScroll <= 1) return 1

  return Math.min(1, Math.max(0, scrollTop / maxScroll))
}

export function useScrollProgress() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const frameRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const commitProgress = () => {
      setProgress((currentProgress) => {
        const nextProgress = readScrollProgress()
        return currentProgress === nextProgress ? currentProgress : nextProgress
      })
    }

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return

      frameRef.current = requestAnimationFrame(() => {
        commitProgress()
        frameRef.current = null
      })
    }

    commitProgress()

    window.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true })
    document.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    window.addEventListener('load', scheduleUpdate)
    window.addEventListener('pageshow', scheduleUpdate)
    window.visualViewport?.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.visualViewport?.addEventListener('resize', scheduleUpdate, { passive: true })

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => scheduleUpdate()) : null

    resizeObserver?.observe(document.documentElement)
    resizeObserver?.observe(document.body)

    const timeouts = [0, 100, 300, 700].map((delay) => window.setTimeout(scheduleUpdate, delay))

    return () => {
      window.removeEventListener('scroll', scheduleUpdate, true)
      document.removeEventListener('scroll', scheduleUpdate, true)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('load', scheduleUpdate)
      window.removeEventListener('pageshow', scheduleUpdate)
      window.visualViewport?.removeEventListener('scroll', scheduleUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleUpdate)
      resizeObserver?.disconnect()
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [pathname])

  const progressPercent = Math.round(progress * 100)

  return {
    progress,
    progressPercent,
    isNearEnd: progress >= NEAR_END_THRESHOLD,
  }
}
