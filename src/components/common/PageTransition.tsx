'use client'

import { useGSAP } from '@gsap/react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IPageTransitionProps {
  children: ReactNode
  className?: string
}

// ครอบเนื้อหาแต่ละหน้า ให้ fade+rise เข้าเมื่อ pathname เปลี่ยน — สั้นๆ 0.35s เท่านั้นกันรู้สึกช้า
export function PageTransition({ children, className }: IPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current) return

      if (reducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12, willChange: 'transform, opacity' },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_DURATION.fast,
          ease: ANIMATION_EASE.out,
          onComplete: () => {
            gsap.set(containerRef.current, { willChange: 'auto' })
          },
        },
      )
    },
    { scope: containerRef, dependencies: [pathname, reducedMotion] },
  )

  return (
    <div ref={containerRef} className={cn('will-animate', className)}>
      {children}
    </div>
  )
}
