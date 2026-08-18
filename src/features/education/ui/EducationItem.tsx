import { GraduationCap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Locale } from '@/i18n/routing'
import type { IEducation } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'

export interface IEducationItemProps {
  education: IEducation
  locale: Locale
  /** คำนวณจาก server component แม่แล้วส่งเป็น string ลงมา */
  dateRangeLabel: string
  gradeHeading: string
  activitiesHeading: string
}

// รายการเดียวของ timeline ประวัติการศึกษา — ครอบด้วย Card ต่อรายการให้ต่างจากหน้า experience
export function EducationItem({
  education,
  locale,
  dateRangeLabel,
  gradeHeading,
  activitiesHeading,
}: IEducationItemProps) {
  const hasActivities = Boolean(education.activities && education.activities.length > 0)

  return (
    <div className='relative'>
      <span className='absolute top-6 -left-12 flex size-8 items-center justify-center rounded-full border border-border bg-surface text-accent sm:-left-16'>
        <GraduationCap className='size-4' aria-hidden='true' />
      </span>

      <Card>
        <CardHeader>
          <CardTitle>
            {getLocalizedText(education.degree, locale)} · {getLocalizedText(education.field, locale)}
          </CardTitle>
          <CardDescription>{getLocalizedText(education.institution, locale)}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <span className='text-sm text-muted-foreground'>{dateRangeLabel}</span>

          {education.grade && (
            <p className='text-sm text-foreground'>
              <span className='font-medium text-muted-foreground'>{gradeHeading}: </span>
              {education.grade}
            </p>
          )}

          {education.description && (
            <p className='text-sm text-muted-foreground'>{getLocalizedText(education.description, locale)}</p>
          )}

          {hasActivities && (
            <div className='flex flex-col gap-2'>
              <h4 className='text-sm font-semibold text-foreground'>{activitiesHeading}</h4>
              <ul className='flex flex-col gap-1.5'>
                {education.activities?.map((activity, activityIndex) => (
                  <li key={activityIndex} className='flex gap-2 text-sm text-muted-foreground'>
                    <span className='mt-2 size-1.5 shrink-0 rounded-full bg-accent' aria-hidden='true' />
                    {getLocalizedText(activity, locale)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
