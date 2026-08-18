'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { gsap, ScrollTrigger } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IScrollProgressProps {
  className?: string
}

// แถบความคืบหน้าการ scroll บนสุดของหน้า — ผูกกับตำแหน่ง scroll โดยตรงผ่าน scrub (ไม่มี lag)
// จึงไม่ถือเป็น animation อิสระที่ต้องปิดตอน reduced motion เพราะมันสะท้อนตำแหน่ง scroll จริงแบบ 1:1
export function ScrollProgress({ className }: IScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!barRef.current) return

      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left' })

      const scrollTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(barRef.current, { scaleX: self.progress })
        },
      })

      return () => scrollTrigger.kill()
    },
    { scope: barRef },
  )

  return (
    <div
      className={cn(
        'will-animate pointer-events-none fixed top-0 left-0 z-50 h-0.5 w-full',
        className,
      )}
      aria-hidden='true'
    >
      <div ref={barRef} className='h-full w-full bg-gradient-to-r from-accent to-accent-2' />
    </div>
  )
}
