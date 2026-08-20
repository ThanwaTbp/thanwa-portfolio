'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { COPY } from '@/constants/copy'
import { prefersReducedMotion } from '@/lib/animation'

const TRICKLE_INTERVAL_MS = 220
const COMPLETE_HOLD_MS = 180
const HIDE_FADE_MS = 220
const MAX_PENDING_PROGRESS = 0.94

function isInternalPageNavigation(anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute('download')) return false
  if (anchor.target && anchor.target !== '_self') return false

  const nextUrl = new URL(anchor.href, window.location.href)

  if (nextUrl.origin !== window.location.origin) return false
  if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search) {
    return false
  }

  return true
}

function nextTrickleAmount(progress: number) {
  if (progress < 0.2) return 0.1
  if (progress < 0.5) return 0.04
  if (progress < 0.8) return 0.02
  if (progress < MAX_PENDING_PROGRESS) return 0.005
  return 0
}

export default function LoadingIndicator() {
  const pathname = usePathname()
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const isPendingRef = useRef(false)
  const trickleRef = useRef<number | null>(null)
  const hideTimeoutsRef = useRef<number[]>([])

  const controllerRef = useRef({
    start: () => {},
    complete: () => {},
  })

  useEffect(() => {
    const setBarProgress = (progress: number) => {
      progressRef.current = progress
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    const clearTimers = () => {
      if (trickleRef.current !== null) {
        window.clearInterval(trickleRef.current)
        trickleRef.current = null
      }
      hideTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      hideTimeoutsRef.current = []
    }

    const showTrack = () => {
      const track = trackRef.current
      if (!track) return
      track.setAttribute('aria-hidden', 'false')
      track.setAttribute('aria-busy', 'true')
      track.classList.remove('opacity-0')
      track.classList.add('opacity-100')
    }

    const hideTrack = () => {
      const track = trackRef.current
      if (!track) return
      track.setAttribute('aria-hidden', 'true')
      track.setAttribute('aria-busy', 'false')
      track.classList.remove('opacity-100')
      track.classList.add('opacity-0')
    }

    setBarProgress(0)

    controllerRef.current.start = () => {
      if (isPendingRef.current) return

      isPendingRef.current = true
      clearTimers()
      showTrack()
      setBarProgress(prefersReducedMotion() ? 0.65 : 0.12)

      if (prefersReducedMotion()) return

      trickleRef.current = window.setInterval(() => {
        const amount = nextTrickleAmount(progressRef.current)
        if (amount <= 0) return
        setBarProgress(Math.min(MAX_PENDING_PROGRESS, progressRef.current + amount))
      }, TRICKLE_INTERVAL_MS)
    }

    controllerRef.current.complete = () => {
      if (!isPendingRef.current) return

      isPendingRef.current = false
      clearTimers()
      showTrack()
      setBarProgress(1)

      hideTimeoutsRef.current = [
        window.setTimeout(hideTrack, COMPLETE_HOLD_MS),
        window.setTimeout(() => setBarProgress(0), COMPLETE_HOLD_MS + HIDE_FADE_MS),
      ]
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor || !isInternalPageNavigation(anchor)) return

      controllerRef.current.start()
    }

    document.addEventListener('click', onDocumentClick, true)

    return () => {
      document.removeEventListener('click', onDocumentClick, true)
      clearTimers()
    }
  }, [])

  useEffect(() => {
    controllerRef.current.complete()
  }, [pathname])

  return (
    <div
      ref={trackRef}
      role='progressbar'
      aria-label={COPY.common.loading}
      aria-busy='false'
      aria-hidden='true'
      className='pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden opacity-0 transition-opacity duration-200 ease-out'
    >
      <div
        ref={barRef}
        className='h-full w-full origin-left [transform:scaleX(0)] bg-gradient-to-r from-accent via-accent to-accent-2 shadow-[0_0_16px_rgba(122,92,255,0.45)] transition-transform duration-200 ease-out will-change-transform'
      />
    </div>
  )
}
