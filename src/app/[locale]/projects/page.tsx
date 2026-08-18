import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectFilters } from '@/features/projects/ui/ProjectFilters'
import { routing } from '@/i18n/routing'
import { getProjectCategories, getProjects, getProjectTechStack } from '@/services/portfolio-service'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const { locale } = await params
  const translate = await getTranslations({ locale, namespace: 'projects' })

  return {
    title: translate('title'),
    description: translate('description'),
  }
}

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projects'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const translate = await getTranslations('projects')
  const projects = getProjects()
  const categories = getProjectCategories()
  const techStack = getProjectTechStack()

  return (
    <>
      <ScrollProgress />
      <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
        <SectionHeading as='h1' title={translate('title')} description={translate('description')} />

        <div className='mt-12'>
          <ProjectFilters projects={projects} categories={categories} techStack={techStack} />
        </div>
      </section>
    </>
  )
}
