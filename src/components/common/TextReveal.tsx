'use client'

import { useGSAP } from '@gsap/react'
import { Fragment, useMemo, useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap, ScrollTrigger, STAGGER } from '@/lib/animation'

export type TextRevealTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

export interface ITextRevealProps {
  text: string
  as?: TextRevealTag
  delay?: number
  stagger?: number
  className?: string
  /** 'mount' เล่นทันทีตอน component ขึ้นจอ, 'scroll' รอจนกว่าจะเข้า viewport */
  trigger?: 'mount' | 'scroll'
}

// แยกข้อความเป็น "คำ" ด้วยช่องว่าง (รองรับภาษาไทยด้วยเพราะภาษาไทยไม่มีตัวอักษรแบ่งคำชัดเจนแบบภาษาอังกฤษ)
// แล้ว reveal ทีละคำแบบ mask — คำอยู่ใน span overflow-hidden แล้ว translateY ขึ้นจากด้านล่าง
export function TextReveal({
  text,
  as: Tag = 'p',
  delay = 0,
  stagger = STAGGER.base,
  className,
  trigger = 'scroll',
}: ITextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const words = useMemo(() => text.split(' '), [text])

  useGSAP(
    () => {
      if (!containerRef.current) return

      const wordElements = containerRef.current.querySelectorAll('[data-text-reveal-word]')

      gsap.set(wordElements, {
        y: reducedMotion ? 0 : '110%',
        willChange: reducedMotion ? 'auto' : 'transform',
      })

      if (reducedMotion) return

      const playReveal = () => {
        gsap.to(wordElements, {
          y: '0%',
          duration: ANIMATION_DURATION.base,
          delay,
          stagger,
          ease: ANIMATION_EASE.out,
          // ปลด will-change เมื่อเล่นจบ ไม่ให้ทุกหัวข้อในหน้าค้าง compositor layer ไว้
          onComplete: () => {
            gsap.set(wordElements, { willChange: 'auto' })
          },
        })
      }

      if (trigger === 'mount') {
        playReveal()
        return
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: playReveal,
      })
    },
    { scope: containerRef, dependencies: [text, delay, stagger, trigger, reducedMotion] },
  )

  return (
    <Tag ref={containerRef} className={className}>
      <span aria-hidden='true'>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className='inline-block overflow-hidden align-bottom'>
              <span data-text-reveal-word className='inline-block'>
                {word}
              </span>
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </span>
      <span className='sr-only'>{text}</span>
    </Tag>
  )
}
