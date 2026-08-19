import type { Metadata } from 'next'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectGrid } from '@/features/projects/ui/ProjectGrid'
import { COPY } from '@/constants/copy'
import { getProjects } from '@/services/portfolio-service'

export const metadata: Metadata = {
  title: COPY.projects.title,
  description: COPY.projects.description,
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <ScrollProgress />
      <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
        <SectionHeading
          as='h1'
          title={COPY.projects.title}
          description={COPY.projects.description}
        />

        <div className='mt-12'>
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </>
  )
}
