'use client'

import { useGSAP } from '@gsap/react'
import { useMemo, useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface ITypewriterTextProps {
  texts: string[]
  className?: string
  holdDuration?: number
}

function getTypeDuration(characterCount: number) {
  return Math.max(0.45, characterCount * 0.055)
}

function getDeleteDuration(characterCount: number) {
  return Math.max(0.6, characterCount * 0.085)
}

export function TypewriterText({ texts, className, holdDuration = 1.6 }: ITypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const caretRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const phrases = useMemo(() => texts.filter((text) => text.trim().length > 0), [texts])

  useGSAP(
    () => {
      const textElement = textRef.current
      const caretElement = caretRef.current
      if (!textElement || !caretElement || phrases.length === 0) return

      if (reducedMotion) {
        textElement.textContent = phrases[0] ?? ''
        gsap.set(caretElement, { opacity: 1 })
        return
      }

      textElement.textContent = ''
      const state = { count: 0 }
      const timeline = gsap.timeline({ repeat: -1 })
      const caretTween = gsap.to(caretElement, {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      phrases.forEach((phrase) => {
        const characters = Array.from(phrase)

        timeline.to(state, {
          count: characters.length,
          duration: getTypeDuration(characters.length),
          ease: 'none',
          onUpdate: () => {
            textElement.textContent = characters.slice(0, Math.round(state.count)).join('')
          },
        })

        timeline.to({}, { duration: holdDuration })

        timeline.to(state, {
          count: 0,
          duration: getDeleteDuration(characters.length),
          ease: 'none',
          onUpdate: () => {
            textElement.textContent = characters.slice(0, Math.round(state.count)).join('')
          },
        })

        timeline.to({}, { duration: 0.22 })
      })

      return () => {
        timeline.kill()
        caretTween.kill()
      }
    },
    { dependencies: [phrases.join('|'), holdDuration, reducedMotion] },
  )

  if (phrases.length === 0) return null

  return (
    <span className='inline whitespace-normal'>
      <span ref={textRef} className={cn('whitespace-normal wrap-break-word', className)} />
      <span
        ref={caretRef}
        aria-hidden='true'
        className='ml-[0.08em] inline-block h-[0.72em] w-[2px] translate-y-[0.08em] bg-accent align-baseline'
      />
    </span>
  )
}
