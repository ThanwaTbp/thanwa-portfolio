'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap, ScrollTrigger } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface INumberTickerProps {
  value: number
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

// นับเลขขึ้นเมื่อเข้า viewport — เขียนค่าลง textContent ผ่าน ref โดยตรง ไม่ใช้ useState เพื่อไม่ re-render ทุกเฟรม
export function NumberTicker({
  value,
  suffix = '',
  decimals = 0,
  duration = ANIMATION_DURATION.slow,
  className,
}: INumberTickerProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const displayRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const displayElement = displayRef.current
      if (!displayElement) return

      const formatValue = (currentValue: number) => `${currentValue.toFixed(decimals)}${suffix}`

      if (reducedMotion) {
        displayElement.textContent = formatValue(value)
        return
      }

      displayElement.textContent = formatValue(0)

      const counter = { current: 0 }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            current: value,
            duration,
            ease: ANIMATION_EASE.out,
            onUpdate: () => {
              displayElement.textContent = formatValue(counter.current)
            },
          })
        },
      })
    },
    { scope: containerRef, dependencies: [value, suffix, decimals, duration, reducedMotion] },
  )

  return (
    <span ref={containerRef} className={cn('inline-flex', className)}>
      <span ref={displayRef} aria-hidden='true' />
      <span className='sr-only'>{`${value.toFixed(decimals)}${suffix}`}</span>
    </span>
  )
}
