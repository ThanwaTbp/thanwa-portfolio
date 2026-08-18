'use client'

import { FolderOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import type { IProject } from '@/types/portfolio'

import { ProjectCard } from './ProjectCard'

export interface IProjectGridProps {
  projects: IProject[]
}

// grid การ์ดผลงาน
//
// สำคัญ: ครอบด้วย RevealOnScroll เพียงชั้นเดียวแบบ "ไม่ผูก key กับผลลัพธ์การกรอง" เจตนา —
// RevealOnScroll ใช้ useGSAP ที่มี dependency เป็น [delay, y, duration, stagger, reducedMotion] เท่านั้น
// ไม่มี projects/filteredProjects อยู่ใน dependency จึง gsap.set(opacity: 0) แค่ครั้งเดียวตอน mount แรก
// กับการ์ดชุดแรกที่มีอยู่ ณ ตอนนั้น เมื่อผู้ใช้เปลี่ยนตัวกรองภายหลัง React จะ re-render children ปกติ
// (ไม่ unmount/remount RevealOnScroll เพราะไม่มี key เปลี่ยน) การ์ดที่ถูกกรองเข้ามาใหม่จึงไม่เคยถูก
// gsap.set ให้ opacity: 0 เลย จึงแสดงผลที่ opacity ปกติทันที — กันปัญหาการ์ดหายหลังกรองได้ตรงจุด
// โดยไม่ต้องไปแก้ RevealOnScroll (ซึ่งเป็นไฟล์ที่ห้ามแตะ)
export function ProjectGrid({ projects }: IProjectGridProps) {
  const translate = useTranslations('projects')

  if (projects.length === 0) {
    return (
      <EmptyState icon={FolderOpen} title={translate('empty.title')} description={translate('empty.description')} />
    )
  }

  return (
    <RevealOnScroll stagger className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </RevealOnScroll>
  )
}
