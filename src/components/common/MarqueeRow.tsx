'use client'

import { useGSAP } from '@gsap/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IMarqueeRowProps {
  children: ReactNode
  /** จำนวนวินาทีต่อรอบการวน — ยิ่งน้อยยิ่งเลื่อนเร็ว */
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

// แถบเลื่อนวนไม่รู้จบสำหรับโชว์ tech stack — duplicate children 2 ชุดแล้วเลื่อนด้วย transform ต่อเนื่อง
// ผ่าน GSAP timeline (repeat:-1) แทน CSS keyframes เพราะ globals.css ถูกล็อกไว้แก้ไม่ได้
export function MarqueeRow({
  children,
  speed = 24,
  direction = 'left',
  pauseOnHover = true,
  className,
}: IMarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container || reducedMotion) return

      // เปอร์เซ็นต์ของ x/y ใน gsap คำนวณจากขนาดของ element เอง — track กว้างเป็น 2 เท่าของเนื้อหา 1 ชุด
      // เลื่อน -50% จึงเท่ากับเลื่อนพอดี 1 ชุดแล้ววนซ้ำแบบไร้รอยต่อ
      const fromX = direction === 'left' ? '0%' : '-50%'
      const toX = direction === 'left' ? '-50%' : '0%'

      const tween = gsap.fromTo(
        track,
        { x: fromX },
        { x: toX, duration: speed, ease: 'none', repeat: -1 },
      )

      if (!pauseOnHover) {
        return () => tween.kill()
      }

      const onPointerEnterContainer = () => tween.pause()
      const onPointerLeaveContainer = () => tween.play()

      container.addEventListener('pointerenter', onPointerEnterContainer, { passive: true })
      container.addEventListener('pointerleave', onPointerLeaveContainer, { passive: true })

      return () => {
        container.removeEventListener('pointerenter', onPointerEnterContainer)
        container.removeEventListener('pointerleave', onPointerLeaveContainer)
        tween.kill()
      }
    },
    { scope: containerRef, dependencies: [speed, direction, pauseOnHover, reducedMotion] },
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'no-scrollbar relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      <div ref={trackRef} className='will-animate flex w-max items-center'>
        {/* ระยะห่างระหว่างชุดต้องอยู่ใน pe-8 ของแต่ละชุด ไม่ใช่ gap ของ track
            เพราะ gap ของ track จะทำให้ความกว้าง 2 ชุดไม่เท่ากับ 2 เท่าพอดี แล้ว -50% จะกระตุกตอนวน */}
        <div className='flex shrink-0 items-center gap-8 pe-8'>{children}</div>
        <div className='flex shrink-0 items-center gap-8 pe-8' aria-hidden='true'>
          {children}
        </div>
      </div>
    </div>
  )
}
