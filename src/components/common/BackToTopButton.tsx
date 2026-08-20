'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'

import { COPY } from '@/constants/copy'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { prefersReducedMotion } from '@/lib/animation'
import { cn } from '@/lib/utils'

const RING_SIZE = 56
const RING_STROKE = 2.5
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const SHOW_AFTER_PX = 240

export default function BackToTopButton() {
  const { progress, progressPercent, isNearEnd } = useScrollProgress()
  const [isVisible, setIsVisible] = useState(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const commitVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX)
    }

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(() => {
        commitVisibility()
        frameRef.current = null
      })
    }

    commitVisibility()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const onBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return (
    <button
      type='button'
      onClick={onBackToTop}
      aria-label={COPY.common.backToTop}
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        'fixed right-4 bottom-5 z-50 flex size-14 items-center justify-center rounded-full border border-border bg-surface shadow-[0_18px_40px_-24px_rgba(35,30,80,0.8)] backdrop-blur-md transition-[opacity,transform] duration-300 ease-out sm:right-6 sm:bottom-6',
        'hover:-translate-y-0.5 hover:border-accent/35 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isVisible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-2 scale-90 opacity-0',
        isNearEnd && 'border-accent/35',
      )}
    >
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className='pointer-events-none absolute inset-0 -rotate-90'
        aria-hidden='true'
      >
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill='none'
          stroke='currentColor'
          strokeWidth={RING_STROKE}
          className='text-border/70'
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill='none'
          stroke='currentColor'
          strokeWidth={RING_STROKE}
          strokeLinecap='round'
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
          className='text-accent'
        />
      </svg>

      <span className='relative flex flex-col items-center leading-none'>
        <ArrowUp className='size-3.5 text-foreground' aria-hidden='true' />
        <span
          className={cn(
            'mt-0.5 font-mono text-[10px] font-medium tracking-wide',
            isNearEnd ? 'text-accent' : 'text-muted-foreground',
          )}
        >
          {isNearEnd ? COPY.common.scrollNearEnd : `${progressPercent}%`}
        </span>
      </span>
    </button>
  )
}
