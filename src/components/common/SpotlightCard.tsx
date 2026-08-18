'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export interface ISpotlightCardProps {
  children: ReactNode
  className?: string
}

// การ์ดที่มีแสงตามเมาส์ — เขียนตำแหน่งลง CSS custom property ผ่าน ref (ไม่ใช่ inline style ใน JSX)
// throttle ด้วย requestAnimationFrame และปิดบนอุปกรณ์ touch/reduced motion
export function SpotlightCard({ children, className }: ISpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRequestRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer || reducedMotion) return

    const onPointerMoveCard = (event: PointerEvent) => {
      // กันยิง rAF ซ้อนกันหลายครั้งต่อเฟรมเดียว
      if (frameRequestRef.current !== null) return

      frameRequestRef.current = requestAnimationFrame(() => {
        const bounds = container.getBoundingClientRect()
        container.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
        container.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
        frameRequestRef.current = null
      })
    }

    container.addEventListener('pointermove', onPointerMoveCard, { passive: true })

    return () => {
      container.removeEventListener('pointermove', onPointerMoveCard)
      if (frameRequestRef.current !== null) cancelAnimationFrame(frameRequestRef.current)
    }
  }, [reducedMotion])

  return (
    <div ref={containerRef} className={cn('group relative overflow-hidden rounded-xl', className)}>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklab,var(--color-accent)_15%,transparent),transparent_70%)]'
      />
      {children}
    </div>
  )
}
