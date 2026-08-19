import { GraduationCap } from 'lucide-react'

import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import type { IEducation } from '@/types/portfolio'
import { formatDateRange } from '@/utils/date'

import { EducationItem } from './EducationItem'

export interface IEducationTimelineProps {
  educations: IEducation[]
}

export function EducationTimeline({ educations }: IEducationTimelineProps) {
  if (educations.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        title={COPY.education.empty.title}
        description={COPY.education.empty.description}
        action={<Button href='/'>{COPY.education.empty.action}</Button>}
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
          dateRangeLabel={formatDateRange(
            education.startDate,
            education.endDate,
            COPY.common.present,
          )}
          gradeHeading={COPY.education.grade}
          activitiesHeading={COPY.education.activities}
        />
      ))}
    </RevealOnScroll>
  )
}
