import { GraduationCap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import type { IEducation } from '@/types/portfolio'
import { formatDateRange } from '@/utils/date'

import { EducationItem } from './EducationItem'

export interface IEducationTimelineProps {
  educations: IEducation[]
  locale: Locale
}

// timeline ประวัติการศึกษา — server component ทั้งหมด โครงคล้ายหน้า experience แต่ marker เป็นไอคอน
export async function EducationTimeline({ educations, locale }: IEducationTimelineProps) {
  const translateEducation = await getTranslations('education')
  const translateCommon = await getTranslations('common')

  if (educations.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        title={translateEducation('empty.title')}
        description={translateEducation('empty.description')}
        action={<Button href='/'>{translateEducation('empty.action')}</Button>}
      />
    )
  }

  return (
    <RevealOnScroll
      stagger
      className='relative flex flex-col gap-8 border-l border-border pl-8 sm:pl-12'
    >
      {educations.map((education) => (
        <EducationItem
          key={education.id}
          education={education}
          locale={locale}
          dateRangeLabel={formatDateRange(
            education.startDate,
            education.endDate,
            locale,
            translateCommon('present'),
          )}
          gradeHeading={translateEducation('grade')}
          activitiesHeading={translateEducation('activities')}
        />
      ))}
    </RevealOnScroll>
  )
}
