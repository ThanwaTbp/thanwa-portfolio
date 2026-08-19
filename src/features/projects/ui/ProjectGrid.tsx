'use client'

import { FolderOpen } from 'lucide-react'

import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { COPY } from '@/constants/copy'
import type { IProject } from '@/types/portfolio'

import { ProjectCard } from './ProjectCard'

export interface IProjectGridProps {
  projects: IProject[]
}

export function ProjectGrid({ projects }: IProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title={COPY.projects.empty.title}
        description={COPY.projects.empty.description}
      />
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
