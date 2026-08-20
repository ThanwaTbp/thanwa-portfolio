'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_EASE, gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface ISectionDividerProps {
  className?: string
}

// เส้นคั่นหัว section ที่ค่อยๆ ลากจากซ้ายไปขวาตอนเลื่อนมาถึง เล่นครั้งเดียว
export function SectionDivider({ className }: ISectionDividerProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const line = lineRef.current
      if (!line) return

      if (reducedMotion) {
        gsap.set(line, { scaleX: 1, willChange: 'auto' })
        return
      }

      gsap.set(line, { scaleX: 0, transformOrigin: 'left center', willChange: 'transform' })

      const tween = gsap.to(line, {
        scaleX: 1,
        duration: 1.2,
        ease: ANIMATION_EASE.out,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
          once: true,
        },
        onComplete: () => {
          gsap.set(line, { willChange: 'auto' })
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  )

  return (
    <span
      ref={containerRef}
      aria-hidden='true'
      className={cn('pointer-events-none absolute inset-x-0 top-0 block h-px', className)}
    >
      <span
        ref={lineRef}
        className='block h-full w-full bg-[linear-gradient(90deg,transparent,var(--color-border-strong)_15%,var(--color-accent)_50%,var(--color-border-strong)_85%,transparent)]'
      />
    </span>
  )
}
