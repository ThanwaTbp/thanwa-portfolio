'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { COPY } from '@/constants/copy'
import type { IProject } from '@/types/portfolio'

import { ProjectCover } from './ProjectCover'

export interface IProjectCardProps {
  project: IProject
}

const VISIBLE_TECH_COUNT = 3

export function ProjectCard({ project }: IProjectCardProps) {
  const visibleTechStack = project.techStack.slice(0, VISIBLE_TECH_COUNT)
  const remainingTechCount = project.techStack.length - visibleTechStack.length

  return (
    <Link
      href={`/projects/${project.slug}`}
      className='group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
    >
      <div className='relative overflow-hidden'>
        <div className='transition-transform duration-500 ease-out group-hover:scale-105'>
          <ProjectCover project={project} aspectRatio='card' />
        </div>
        <Badge variant='accent' size='sm' className='absolute top-3 left-3'>
          {COPY.projects.categories[project.category]}
        </Badge>
      </div>

      <div className='flex flex-1 flex-col gap-3 p-5'>
        <div className='flex items-start justify-between gap-3'>
          <h3 className='text-lg font-semibold tracking-tight text-foreground'>{project.title}</h3>
          <ArrowUpRight
            className='mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
            aria-hidden='true'
          />
        </div>

        <p className='line-clamp-2 text-sm text-muted-foreground'>{project.summary}</p>

        <div className='mt-auto flex flex-wrap items-center gap-2 pt-2'>
          {visibleTechStack.map((tech) => (
            <Badge key={tech} variant='default' size='sm'>
              {tech}
            </Badge>
          ))}
          {remainingTechCount > 0 && (
            <Badge variant='muted' size='sm'>
              +{remainingTechCount}
            </Badge>
          )}
          <span className='ml-auto text-xs font-medium text-subtle-foreground'>{project.year}</span>
        </div>
      </div>
    </Link>
  )
}
