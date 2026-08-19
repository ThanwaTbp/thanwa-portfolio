import { Briefcase } from 'lucide-react'
import Link from 'next/link'

import type { IExperience } from '@/types/portfolio'
import { formatDateRange } from '@/utils/date'
import { buttonVariants } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'
import { COPY } from '@/constants/copy'

export interface IExperiencePreviewProps {
  experiences: IExperience[]
}

const PREVIEW_COUNT = 3

export function ExperiencePreview({ experiences }: IExperiencePreviewProps) {
  const previewExperiences = experiences.slice(0, PREVIEW_COUNT)

  return (
    <section
      id='experience'
      className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'
    >
      <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
        <SectionHeading title={COPY.home.latestExperienceTitle} />
        <Link href='/experience' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          {COPY.common.viewAll}
        </Link>
      </div>

      {previewExperiences.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={COPY.experience.empty.title}
          description={COPY.experience.empty.description}
          action={
            <Link href='/' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              {COPY.experience.empty.action}
            </Link>
          }
          className='mt-10'
        />
      ) : (
        <RevealOnScroll stagger className='mt-10 flex flex-col'>
          {previewExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className='relative flex gap-6 rounded-[1.5rem] border border-transparent px-4 py-4 transition-colors hover:border-border/80 hover:bg-surface-muted/40 sm:px-5'
            >
              <div className='relative flex w-3 flex-col items-center'>
                <span
                  className='mt-1.5 size-3 shrink-0 rounded-full bg-accent ring-4 ring-background'
                  aria-hidden='true'
                />
                {index < previewExperiences.length - 1 && (
                  <span className='mt-1 w-px flex-1 bg-border' aria-hidden='true' />
                )}
              </div>
              <div className='flex-1 pb-2'>
                <p className='text-sm font-medium text-accent'>
                  {formatDateRange(
                    experience.startDate,
                    experience.endDate,
                    COPY.common.present,
                  )}
                </p>
                <h3 className='mt-1 text-lg font-semibold text-foreground'>
                  {experience.position}
                </h3>
                <p className='text-sm text-muted-foreground'>{experience.company}</p>
                <p className='mt-2 line-clamp-2 text-sm text-muted-foreground'>
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      )}
    </section>
  )
}
