import { FolderX } from 'lucide-react'
import Link from 'next/link'

import type { IProject } from '@/types/portfolio'
import { buttonVariants } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { emptyStateIcon } from '@/components/common/emptyStateIcon'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectCard } from '@/features/projects/ui/ProjectCard'
import { COPY } from '@/constants/copy'

export interface IFeaturedProjectsProps {
  projects: IProject[]
}

export function FeaturedProjects({ projects }: IFeaturedProjectsProps) {
  return (
    <section id='work' className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
        <SectionHeading
          title={COPY.home.featuredTitle}
          description={COPY.home.featuredDescription}
        />
        <Link href='/projects' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          {COPY.common.viewAll}
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={emptyStateIcon(FolderX)}
          title={COPY.projects.empty.title}
          description={COPY.projects.empty.description}
          action={
            <Link href='/projects' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              {COPY.common.viewAll}
            </Link>
          }
          className='mt-10'
        />
      ) : (
        <RevealOnScroll stagger className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </RevealOnScroll>
      )}
    </section>
  )
}
