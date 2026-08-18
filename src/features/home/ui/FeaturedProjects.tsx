import { FolderX } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import type { IProject } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SpotlightCard } from '@/components/common/SpotlightCard'

export interface IFeaturedProjectsProps {
  projects: IProject[]
  locale: Locale
}

const MAX_VISIBLE_TECH = 3

// ใช้ตัวอักษรย่อจากชื่อโปรเจกต์ (สูงสุด 2 คำแรก) เป็น fallback แทนรูปปกที่ยังไม่มีไฟล์จริง
function getProjectInitials(title: string): string {
  const words = title.trim().split(/\s+/)
  const initials = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase())

  return initials.join('') || '?'
}

export async function FeaturedProjects({ projects, locale }: IFeaturedProjectsProps) {
  const translate = await getTranslations('home')
  const translateCommon = await getTranslations('common')
  const translateProjects = await getTranslations('projects')

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
        <SectionHeading title={translate('featuredTitle')} description={translate('featuredDescription')} />
        <Link href='/projects' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          {translateCommon('viewAll')}
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderX}
          title={translateProjects('empty.title')}
          description={translateProjects('empty.description')}
          action={
            <Link href='/projects' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              {translateProjects('empty.action')}
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
                  <Card className='h-full overflow-hidden'>
                    <div className='relative flex aspect-16/10 items-center justify-center overflow-hidden bg-gradient-to-br from-accent/25 via-accent-2/15 to-surface-muted'>
                      <span className='text-4xl font-semibold text-accent/70'>
                        {getProjectInitials(project.title)}
                      </span>
                    </div>
                    <CardContent className='flex flex-col gap-3 p-6'>
                      <div className='flex items-center justify-between gap-2'>
                        <h3 className='text-lg font-semibold tracking-tight text-foreground'>{project.title}</h3>
                        <span className='shrink-0 text-sm text-subtle-foreground'>{project.year}</span>
                      </div>
                      <p className='line-clamp-2 text-sm text-muted-foreground'>
                        {getLocalizedText(project.summary, locale)}
                      </p>
                      <div className='flex flex-wrap gap-2 pt-1'>
                        {visibleTech.map((tech) => (
                          <Badge key={tech} size='sm'>
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
