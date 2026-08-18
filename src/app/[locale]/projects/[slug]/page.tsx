import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { ProjectDetailHero } from '@/features/projects/ui/ProjectDetailHero'
import { ProjectHighlights } from '@/features/projects/ui/ProjectHighlights'
import { ProjectLinks } from '@/features/projects/ui/ProjectLinks'
import { ProjectMetrics } from '@/features/projects/ui/ProjectMetrics'
import { ProjectNavigation } from '@/features/projects/ui/ProjectNavigation'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getAdjacentProjects, getAllProjectSlugs, getProjectBySlug } from '@/services/portfolio-service'
import { getLocalizedText } from '@/utils/localize'

export function generateStaticParams() {
  const slugs = getAllProjectSlugs()

  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale
  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  const summary = getLocalizedText(project.summary, locale)

  return {
    title: project.title,
    description: summary,
    openGraph: {
      title: project.title,
      description: summary,
      type: 'article',
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: PageProps<'/[locale]/projects/[slug]'>) {
  const { locale: localeParam, slug } = await params
  // ตรวจ locale ให้ตรงกับ union type ที่รองรับ — layout ระดับบนกัน locale แปลกปลอมด้วย notFound() ไว้แล้ว
  const locale = hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale
  setRequestLocale(locale)

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const translate = await getTranslations('projectDetail')
  const translateProjects = await getTranslations('projects')
  const { previous, next } = getAdjacentProjects(slug)
  const categoryLabel = translateProjects(`categories.${project.category}`)

  return (
    <>
      <ScrollProgress />

      <div className='mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8'>
        <Link
          href='/projects'
          className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground'
        >
          <ArrowLeft className='size-4' aria-hidden='true' />
          {translate('backToProjects')}
        </Link>
      </div>

      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
        <ProjectDetailHero project={project} categoryLabel={categoryLabel} />
      </div>

      <div className='mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_20rem] lg:px-8'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold tracking-tight text-foreground'>{translate('overview')}</h2>
          <p className='text-base leading-relaxed text-muted-foreground'>
            {getLocalizedText(project.description, locale)}
          </p>
        </div>

        <aside className='flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit'>
          <div className='flex flex-col gap-1.5'>
            <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
              {translate('role')}
            </span>
            <p className='text-sm text-foreground'>{getLocalizedText(project.role, locale)}</p>
          </div>

          <div className='flex flex-col gap-1.5'>
            <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
              {translate('year')}
            </span>
            <p className='text-sm text-foreground'>{project.year}</p>
          </div>

          <Separator />

          <div className='flex flex-col gap-2'>
            <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
              {translate('techStack')}
            </span>
            <div className='flex flex-wrap gap-2'>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant='default' size='sm'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <ProjectLinks links={project.links} locale={locale} heading={translate('links')} />
        </aside>
      </div>

      <div className='mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 sm:px-6 lg:px-8'>
        <ProjectHighlights highlights={project.highlights} locale={locale} heading={translate('highlights')} />
        <ProjectMetrics metrics={project.metrics} locale={locale} heading={translate('metrics')} />
      </div>

      <div className='mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8'>
        <ProjectNavigation
          previous={previous}
          next={next}
          previousLabel={translate('previousProject')}
          nextLabel={translate('nextProject')}
        />
      </div>
    </>
  )
}
