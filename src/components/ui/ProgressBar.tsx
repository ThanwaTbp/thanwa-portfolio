'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap, ScrollTrigger } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IProgressBarProps {
  /** ค่าระดับ skill 0-100 */
  value: number
  label?: string
  showValue?: boolean
  duration?: number
  className?: string
}

// แถบแสดงระดับ skill — animate ด้วย scaleX (transform-origin ซ้าย) เพื่อไม่แตะ layout property อย่าง width
export function ProgressBar({
  value,
  label,
  showValue = true,
  duration = ANIMATION_DURATION.slow,
  className,
}: IProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const clampedValue = Math.min(100, Math.max(0, value))

  useGSAP(
    () => {
      if (!fillRef.current) return

      // ตั้งค่าเริ่มต้นก่อน paint กัน FOUC และรองรับ reduced motion ให้แสดงผลปลายทางทันที
      gsap.set(fillRef.current, {
        scaleX: reducedMotion ? clampedValue / 100 : 0,
        transformOrigin: 'left',
        willChange: reducedMotion ? 'auto' : 'transform',
      })

      if (reducedMotion) return

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(fillRef.current, {
            scaleX: clampedValue / 100,
            duration,
            ease: ANIMATION_EASE.out,
            onComplete: () => {
              gsap.set(fillRef.current, { willChange: 'auto' })
            },
          })
        },
      })
    },
    { scope: containerRef, dependencies: [clampedValue, reducedMotion, duration] },
  )

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className='mb-2 flex items-center justify-between text-sm'>
          {label && <span className='font-medium text-foreground'>{label}</span>}
          {showValue && <span className='text-muted-foreground'>{clampedValue}%</span>}
        </div>
      )}
      <div
        className='h-2 w-full overflow-hidden rounded-full bg-surface-muted'
        role='progressbar'
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div ref={fillRef} className='h-full w-full rounded-full bg-accent' />
      </div>
    </div>
  )
}
