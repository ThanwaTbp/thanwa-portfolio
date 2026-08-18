import { Briefcase } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import type { IExperience } from '@/types/portfolio'
import { formatDateRange } from '@/utils/date'
import { getLocalizedText } from '@/utils/localize'
import { buttonVariants } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'

export interface IExperiencePreviewProps {
  experiences: IExperience[]
  locale: Locale
}

const PREVIEW_COUNT = 3

export async function ExperiencePreview({ experiences, locale }: IExperiencePreviewProps) {
  const translate = await getTranslations('home')
  const translateCommon = await getTranslations('common')
  const translateExperience = await getTranslations('experience')

  const previewExperiences = experiences.slice(0, PREVIEW_COUNT)

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
        <SectionHeading title={translate('latestExperienceTitle')} />
        <Link href='/experience' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          {translateCommon('viewAll')}
        </Link>
      </div>

      {previewExperiences.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={translateExperience('empty.title')}
          description={translateExperience('empty.description')}
          action={
            <Link href='/' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              {translateExperience('empty.action')}
            </Link>
          }
          className='mt-10'
        />
      ) : (
        <RevealOnScroll stagger className='mt-10 flex flex-col'>
          {previewExperiences.map((experience, index) => (
            <div key={experience.id} className='relative flex gap-6 pb-10 last:pb-0'>
              <div className='relative flex w-3 flex-col items-center'>
                <span className='mt-1.5 size-3 shrink-0 rounded-full bg-accent ring-4 ring-background' aria-hidden='true' />
                {index < previewExperiences.length - 1 && (
                  <span className='mt-1 w-px flex-1 bg-border' aria-hidden='true' />
                )}
              </div>
              <div className='flex-1 pb-2'>
                <p className='text-sm font-medium text-accent'>
                  {formatDateRange(experience.startDate, experience.endDate, locale, translateCommon('present'))}
                </p>
                <h3 className='mt-1 text-lg font-semibold text-foreground'>
                  {getLocalizedText(experience.position, locale)}
                </h3>
                <p className='text-sm text-muted-foreground'>{experience.company}</p>
                <p className='mt-2 line-clamp-2 text-sm text-muted-foreground'>
                  {getLocalizedText(experience.description, locale)}
                </p>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      )}
    </section>
  )
}
