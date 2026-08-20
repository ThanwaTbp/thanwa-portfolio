'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { TextReveal } from '@/components/common/TextReveal'
import { Badge } from '@/components/ui/Badge'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/animation'
import type { IProject } from '@/types/portfolio'

import { ProjectCover } from './ProjectCover'

export interface IProjectDetailHeroProps {
  project: IProject
  categoryLabel: string
}

// ระยะ parallax รวมสูงสุด (px) — ต้องไม่เกิน ~60px ตามกฎ animation ของโปรเจกต์
const PARALLAX_DISTANCE = 60

// hero ของหน้ารายละเอียดผลงาน — cover ใหญ่มี parallax เบาๆ ตอน scroll (ขยับด้วย transform เท่านั้น)
export function ProjectDetailHero({ project, categoryLabel }: IProjectDetailHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!parallaxRef.current || reducedMotion) return

      // เฟรมด้านนอก (parent) มีขนาดคงที่ + overflow-hidden ส่วนเลเยอร์นี้สูงกว่าเฟรมอยู่ PARALLAX_DISTANCE
      // แล้วเลื่อนขึ้นลงในกรอบ -30..+30px ตามตำแหน่ง scroll เพื่อไม่ให้เห็นขอบว่างที่ขอบบน/ล่าง
      const parallaxTween = gsap.fromTo(
        parallaxRef.current,
        { y: -PARALLAX_DISTANCE / 2 },
        {
          y: PARALLAX_DISTANCE / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      return () => {
        parallaxTween.scrollTrigger?.kill()
      }
    },
    { scope: parallaxRef, dependencies: [reducedMotion] },
  )

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center gap-3'>
        <Badge variant='accent'>{categoryLabel}</Badge>
        <span className='text-sm font-medium text-muted-foreground'>{project.year}</span>
      </div>

      <TextReveal
        text={project.title}
        as='h1'
        trigger='mount'
        className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl'
      />

      <p className='max-w-2xl text-lg text-muted-foreground'>{project.summary}</p>

      <div className='relative aspect-[21/9] w-full overflow-hidden rounded-2xl'>
        <div ref={parallaxRef} className='absolute inset-x-0 -top-[30px] h-[calc(100%+60px)]'>
          <ProjectCover project={project} aspectRatio='fill' priority sizes='100vw' />
        </div>
      </div>
    </div>
  )
}
