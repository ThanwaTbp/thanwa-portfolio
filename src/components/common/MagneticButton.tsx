'use client'

import { useGSAP } from '@gsap/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IMagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

// ครอบ children ให้ขยับตามเมาส์แบบแม่เหล็ก — ปิดผลบนอุปกรณ์ touch และเมื่อเปิด reduced motion
export function MagneticButton({ children, strength = 0.35, className }: IMagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      // ไม่มีเมาส์แบบละเอียด (touch device) หรือเปิด reduced motion ก็ไม่ต้องผูก event เลย
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches
      if (!hasFinePointer || reducedMotion) return

      const quickToX = gsap.quickTo(container, 'x', { duration: 0.4, ease: 'power3.out' })
      const quickToY = gsap.quickTo(container, 'y', { duration: 0.4, ease: 'power3.out' })

      const onPointerMoveContainer = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect()
        const offsetX = event.clientX - (bounds.left + bounds.width / 2)
        const offsetY = event.clientY - (bounds.top + bounds.height / 2)

        quickToX(offsetX * strength)
        quickToY(offsetY * strength)
      }

      const onPointerLeaveContainer = () => {
        quickToX(0)
        quickToY(0)
      }

      container.addEventListener('pointermove', onPointerMoveContainer, { passive: true })
      container.addEventListener('pointerleave', onPointerLeaveContainer, { passive: true })

      return () => {
        container.removeEventListener('pointermove', onPointerMoveContainer)
        container.removeEventListener('pointerleave', onPointerLeaveContainer)
      }
    },
    { scope: containerRef, dependencies: [strength, reducedMotion] },
  )

  return (
    <div ref={containerRef} className={cn('will-animate inline-block', className)}>
      {children}
    </div>
  )
}
