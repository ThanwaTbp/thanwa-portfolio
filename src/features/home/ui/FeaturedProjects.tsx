import { FolderX } from 'lucide-react'
import Link from 'next/link'

import type { IProject } from '@/types/portfolio'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SpotlightCard } from '@/components/common/SpotlightCard'
import { TechIcon } from '@/components/common/TechIcon'
import { COPY } from '@/constants/copy'

export interface IFeaturedProjectsProps {
  projects: IProject[]
}

const MAX_VISIBLE_TECH = 3

function getProjectInitials(title: string): string {
  const words = title.trim().split(/\s+/)
  const initials = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase())

  return initials.join('') || '?'
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
          icon={FolderX}
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
          {projects.map((project) => {
            const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TECH)
            const remainingTechCount = project.techStack.length - visibleTech.length

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className='block transition-transform duration-300 hover:-translate-y-1'
              >
                <SpotlightCard>
                  <Card className='h-full overflow-hidden border-border/75 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-surface)_96%,transparent),color-mix(in_oklab,var(--color-surface-muted)_90%,transparent))]'>
                    <div className='relative flex aspect-16/10 items-end overflow-hidden bg-gradient-to-br from-accent/22 via-accent-2/14 to-surface-muted p-6'>
                      <span className='text-4xl font-semibold tracking-[-0.08em] text-accent/72'>
                        {getProjectInitials(project.title)}
                      </span>
                      <div className='absolute inset-x-6 bottom-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-foreground/55'>
                        <span>{COPY.projects.categories[project.category]}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                    <CardContent className='flex flex-col gap-3 p-6'>
                      <h3 className='text-lg font-semibold tracking-tight text-foreground'>
                        {project.title}
                      </h3>
                      <p className='line-clamp-2 text-sm text-muted-foreground'>
                        {project.summary}
                      </p>
                      <div className='flex flex-wrap gap-2 pt-1'>
                        {visibleTech.map((tech) => (
                          <Badge
                            key={tech}
                            size='sm'
                            variant='outline'
                            className='gap-1.5 border-border/80 bg-surface/72'
                          >
                            <TechIcon name={tech} className='size-3.5' />
                            {tech}
                          </Badge>
                        ))}
                        {remainingTechCount > 0 && (
                          <Badge size='sm' variant='muted'>
                            +{remainingTechCount}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </Link>
            )
          })}
        </RevealOnScroll>
      )}
    </section>
  )
}
