'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { COPY } from '@/constants/copy'
import type { IProject } from '@/types/portfolio'
import { SpotlightCard } from '@/components/common/SpotlightCard'
import { TechIcon } from '@/components/common/TechIcon'

import { ProjectCover } from './ProjectCover'

export interface IProjectCardProps {
  project: IProject
  /** โหลดรูปแบบ priority สำหรับการ์ดใบแรกที่อยู่เหนือ fold */
  priority?: boolean
}

const VISIBLE_TECH_COUNT = 5

export function ProjectCard({ project, priority = false }: IProjectCardProps) {
  const visibleTechStack = project.techStack.slice(0, VISIBLE_TECH_COUNT)
  const remainingTechCount = project.techStack.length - visibleTechStack.length
  const hasSummary = Boolean(project.summary?.trim())

  return (
    <SpotlightCard className='h-full rounded-2xl'>
      <Link
        href={`/projects/${project.slug}`}
        className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/75 bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-[0_28px_60px_-34px_color-mix(in_oklab,var(--color-accent)_70%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        <div className='relative overflow-hidden'>
          <div className='transition-transform duration-[600ms] ease-out-expo group-hover:scale-[1.06]'>
            <ProjectCover project={project} aspectRatio='card' priority={priority} />
          </div>

          {/* ไล่เฉดมืดด้านบนให้ป้ายอ่านออกไม่ว่ารูปปกจะสว่างแค่ไหน */}
          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent'
          />

          {/* ไล่เฉดมืดด้านล่าง โผล่มาพร้อมข้อความตอน hover */}
          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/45 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100'
          />

          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full'
          />

          <div className='absolute inset-x-3 top-3 flex items-center justify-between gap-2'>
            <span className='inline-flex h-6 items-center rounded-full border border-white/20 bg-black/35 px-2.5 text-xs font-medium text-white backdrop-blur-md'>
              {COPY.projects.categories[project.category]}
            </span>
            <span className='inline-flex h-6 items-center rounded-full border border-white/20 bg-black/35 px-2.5 font-mono text-xs text-white/85 backdrop-blur-md'>
              {project.year}
            </span>
          </div>

          <span
            aria-hidden='true'
            className='pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-1.5 text-sm font-medium text-white opacity-0 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100'
          >
            {COPY.projects.viewProject}
            <ArrowUpRight className='size-4' />
          </span>
        </div>

        {/* เส้นคั่นบางๆ ที่สว่างขึ้นตอน hover คั่นระหว่างปกกับเนื้อหา */}
        <span
          aria-hidden='true'
          className='h-px w-full bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-70'
        />

        <div className='flex flex-1 flex-col gap-3 p-5'>
          <div className='flex items-start justify-between gap-3'>
            <h3 className='text-lg leading-snug font-semibold tracking-tight text-balance text-foreground transition-colors duration-300 group-hover:text-accent'>
              {project.title}
            </h3>
            <span
              aria-hidden='true'
              className='mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted text-muted-foreground transition-[background-color,border-color,color] duration-300 ease-out group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-foreground'
            >
              <ArrowUpRight className='size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
          </div>

          {hasSummary && (
            <p className='line-clamp-2 text-sm leading-6 text-muted-foreground'>
              {project.summary}
            </p>
          )}

          <div className='mt-auto flex flex-col gap-3 pt-1'>
            <span aria-hidden='true' className='h-px w-full bg-border/70' />

            <div className='flex flex-wrap items-center gap-1.5'>
              {visibleTechStack.map((tech) => (
                <Badge
                  key={tech}
                  variant='outline'
                  size='sm'
                  className='gap-1.5 border-border/70 bg-surface-muted/60 px-2 text-[0.6875rem] transition-colors duration-200 group-hover:border-border-strong/70'
                >
                  <TechIcon name={tech} className='size-3' />
                  {tech}
                </Badge>
              ))}
              {remainingTechCount > 0 && (
                <span className='inline-flex h-6 items-center px-1 text-[0.6875rem] font-medium text-subtle-foreground'>
                  +{remainingTechCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}
