import { Briefcase } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import type { EmploymentType, IExperience } from '@/types/portfolio'
import { calculateDurationInMonths, formatDateRange, formatDuration } from '@/utils/date'

import { ExperienceItem } from './ExperienceItem'

export interface IExperienceTimelineProps {
  experiences: IExperience[]
  locale: Locale
}

// timeline ประวัติการทำงาน — server component ทั้งหมด (ไม่มี interactivity)
// ใช้ border-l ของ container วางเส้นตั้ง แล้วแต่ละ ExperienceItem วาง marker ทับเส้นด้วยตำแหน่ง absolute
export async function ExperienceTimeline({ experiences, locale }: IExperienceTimelineProps) {
  const translateExperience = await getTranslations('experience')
  const translateCommon = await getTranslations('common')

  if (experiences.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title={translateExperience('empty.title')}
        description={translateExperience('empty.description')}
        action={<Button href='/'>{translateExperience('empty.action')}</Button>}
      />
    )
  }

  // แปลชื่อประเภทการจ้างงานไว้ล่วงหน้าครั้งเดียวแบบ exhaustive กัน key หลุด
  const employmentTypeLabelByType: Record<EmploymentType, string> = {
    'full-time': translateExperience('employmentType.fullTime'),
    'part-time': translateExperience('employmentType.partTime'),
    freelance: translateExperience('employmentType.freelance'),
    contract: translateExperience('employmentType.contract'),
    internship: translateExperience('employmentType.internship'),
  }

  // fix เวลาปัจจุบันไว้ครั้งเดียวตอน render ฝั่ง server แล้วส่งผลคำนวณเป็น string ลงไปให้ ExperienceItem
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
            locale={locale}
            isCurrent={isCurrent}
            dateRangeLabel={formatDateRange(
              experience.startDate,
              experience.endDate,
              locale,
              translateCommon('present'),
            )}
            durationLabel={formatDuration(durationInMonths, locale)}
            employmentTypeLabel={employmentTypeLabelByType[experience.employmentType]}
            achievementsHeading={translateExperience('achievements')}
            techStackHeading={translateExperience('techStack')}
          />
        )
      })}
    </RevealOnScroll>
  )
}
