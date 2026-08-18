'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IBorderBeamProps {
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
}

// เส้นแสงวิ่งรอบขอบการ์ด — ใช้ GSAP timeline วน repeat:-1 ขยับด้วย transform (x/y) ไล่ตามเส้นรอบรูปสี่เหลี่ยม
// เท่านั้น (เลี่ยง CSS keyframes/offset-path เพราะ globals.css ถูกล็อกไว้ และ offset-distance กระทบ paint)
export function BorderBeam({
  duration = 6,
  delay = 0,
  colorFrom = 'var(--color-accent)',
  colorTo = 'var(--color-accent-2)',
  className,
}: IBorderBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const container = containerRef.current
      const beam = beamRef.current
      if (!container || !beam) return

      beam.style.setProperty('--beam-from', colorFrom)
      beam.style.setProperty('--beam-to', colorTo)

      if (reducedMotion) {
        gsap.set(beam, { opacity: 0 })
        return
      }

      const { width, height } = container.getBoundingClientRect()
      const perimeter = 2 * (width + height) || 1

      const timeline = gsap.timeline({ repeat: -1, delay, defaults: { ease: 'none' } })

      timeline
        .set(beam, { x: 0, y: 0, opacity: 1 })
        .to(beam, { x: width, duration: (width / perimeter) * duration })
        .to(beam, { y: height, duration: (height / perimeter) * duration })
        .to(beam, { x: 0, duration: (width / perimeter) * duration })
        .to(beam, { y: 0, duration: (height / perimeter) * duration })

      return () => {
        timeline.kill()
      }
    },
    { scope: containerRef, dependencies: [duration, delay, colorFrom, colorTo, reducedMotion] },
  )

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]',
        className,
      )}
    >
      <div
        ref={beamRef}
        className='will-animate absolute top-0 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[2px] [background:radial-gradient(circle,var(--beam-from),var(--beam-to)_60%,transparent_80%)]'
      />
    </div>
  )
}
