import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { TechIcon } from '@/components/common/TechIcon'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { ProjectDetailHero } from '@/features/projects/ui/ProjectDetailHero'
import { ProjectHighlights } from '@/features/projects/ui/ProjectHighlights'
import { ProjectNavigation } from '@/features/projects/ui/ProjectNavigation'
import { COPY } from '@/constants/copy'
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from '@/services/portfolio-service'

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { previous, next } = await getAdjacentProjects(slug)
  const categoryLabel = COPY.projects.categories[project.category]

  return (
    <>
      <ScrollProgress />

      <div className='mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8'>
        <Link
          href='/projects'
          className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground'
        >
          <ArrowLeft className='size-4' aria-hidden='true' />
          {COPY.projectDetail.backToProjects}
        </Link>
      </div>

      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
        <ProjectDetailHero project={project} categoryLabel={categoryLabel} />
      </div>

      <div className='mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_20rem] lg:px-8'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold tracking-tight text-foreground'>
            {COPY.projectDetail.overview}
          </h2>
          <p className='text-base leading-relaxed text-muted-foreground'>{project.description}</p>
        </div>

        <aside className='flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit'>
          <div className='flex flex-col gap-1.5'>
            <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
              {COPY.projectDetail.role}
            </span>
            <p className='text-sm text-foreground'>{project.role}</p>
          </div>

          <div className='flex flex-col gap-1.5'>
            <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
              {COPY.projectDetail.year}
            </span>
            <p className='text-sm text-foreground'>{project.year}</p>
          </div>

          <Separator />

          <div className='flex flex-col gap-2'>
            <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
              {COPY.projectDetail.techStack}
            </span>
            <div className='flex flex-wrap gap-2'>
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant='outline'
                  size='sm'
                  className='gap-1.5 border-border/80 bg-surface/80'
                >
                  <TechIcon name={tech} className='size-3.5' />
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className='mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 sm:px-6 lg:px-8'>
        <ProjectHighlights
          highlights={project.highlights}
          heading={COPY.projectDetail.highlights}
        />
      </div>

      <div className='mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8'>
        <ProjectNavigation
          previous={previous}
          next={next}
          previousLabel={COPY.projectDetail.previousProject}
          nextLabel={COPY.projectDetail.nextProject}
        />
      </div>
    </>
  )
}
