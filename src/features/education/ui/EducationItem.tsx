import { GraduationCap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import type { IEducation } from '@/types/portfolio'

export interface IEducationItemProps {
  education: IEducation
  dateRangeLabel: string
  gradeHeading: string
  activitiesHeading: string
}

export function EducationItem({
  education,
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
            {education.degree} · {education.field}
          </CardTitle>
          <CardDescription>{education.institution}</CardDescription>
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
            <p className='text-sm text-muted-foreground'>
              {education.description}
            </p>
          )}

          {hasActivities && (
            <div className='flex flex-col gap-2'>
              <h4 className='text-sm font-semibold text-foreground'>{activitiesHeading}</h4>
              <ul className='flex flex-col gap-1.5'>
                {education.activities?.map((activity, activityIndex) => (
                  <li key={activityIndex} className='flex gap-2 text-sm text-muted-foreground'>
                    <span
                      className='mt-2 size-1.5 shrink-0 rounded-full bg-accent'
                      aria-hidden='true'
                    />
                    {activity}
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
