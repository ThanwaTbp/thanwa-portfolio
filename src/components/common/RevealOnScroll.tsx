'use client'

import { useGSAP } from '@gsap/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap, ScrollTrigger, STAGGER } from '@/lib/animation'

export interface IRevealOnScrollProps {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  /** ถ้า true จะ stagger ลูกโดยตรงของ children แทนที่จะเข้าพร้อมกันทั้งก้อน */
  stagger?: boolean
  className?: string
}

// ครอบ children แล้ว reveal ตอนเข้า viewport ด้วย GSAP + ScrollTrigger (เล่นครั้งเดียว)
export function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  duration = ANIMATION_DURATION.base,
  stagger = false,
  className,
}: IRevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current) return

      const targets = stagger ? Array.from(containerRef.current.children) : containerRef.current

      // ตั้งค่าเริ่มต้นก่อน paint ผ่าน gsap.set กัน FOUC ถ้า JS พัง/โหลดช้า
      gsap.set(targets, {
        opacity: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : y,
        willChange: reducedMotion ? 'auto' : 'transform, opacity',
      })

      if (reducedMotion) return

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: ANIMATION_EASE.out,
            stagger: stagger ? STAGGER.base : 0,
            // ปลด will-change ทิ้งทันทีที่เล่นจบ ไม่ให้ browser ค้าง compositor layer ไว้ทั้งหน้า
            onComplete: () => {
              gsap.set(targets, { willChange: 'auto' })
            },
          })
        },
      })
    },
    { scope: containerRef, dependencies: [delay, y, duration, stagger, reducedMotion] },
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
