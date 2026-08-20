import { Briefcase } from 'lucide-react'

import { EmptyState } from '@/components/common/EmptyState'
import { emptyStateIcon } from '@/components/common/emptyStateIcon'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import type { EmploymentType, IExperience } from '@/types/portfolio'
import { calculateDurationInMonths, formatDateRange, formatDuration } from '@/utils/date'

import { ExperienceItem } from './ExperienceItem'

export interface IExperienceTimelineProps {
  experiences: IExperience[]
}

export function ExperienceTimeline({ experiences }: IExperienceTimelineProps) {
  if (experiences.length === 0) {
    return (
      <EmptyState
        icon={emptyStateIcon(Briefcase)}
        title={COPY.experience.empty.title}
        description={COPY.experience.empty.description}
        action={<Button href='/'>{COPY.experience.empty.action}</Button>}
      />
    )
  }

  const employmentTypeLabelByType: Record<EmploymentType, string> = COPY.experience.employmentType
  const referenceDate = new Date()

  return (
    <RevealOnScroll
      stagger
      className='relative flex flex-col gap-10 border-l border-border pl-8 sm:pl-12'
    >
      {experiences.map((experience) => {
        const isCurrent = experience.endDate === null
        const durationInMonths = calculateDurationInMonths(
          experience.startDate,
          experience.endDate,
          referenceDate,
        )

        return (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isCurrent={isCurrent}
            dateRangeLabel={formatDateRange(
              experience.startDate,
              experience.endDate,
              COPY.common.present,
            )}
            durationLabel={formatDuration(durationInMonths)}
            employmentTypeLabel={employmentTypeLabelByType[experience.employmentType]}
            achievementsHeading={COPY.experience.achievements}
            techStackHeading={COPY.experience.techStack}
          />
        )
      })}
    </RevealOnScroll>
  )
}
