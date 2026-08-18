import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { IExperience } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'

export interface IExperienceItemProps {
  experience: IExperience
  locale: Locale
  /** true เมื่อยังทำงานอยู่ปัจจุบัน (endDate === null) — ใช้เปลี่ยนสี marker + เปิดวงแหวนกะพริบ */
  isCurrent: boolean
  /** คำนวณจาก server component แม่แล้วส่งเป็น string ลงมา กันคำนวณเวลาซ้ำในแต่ละฝั่ง */
  dateRangeLabel: string
  durationLabel: string
  employmentTypeLabel: string
  achievementsHeading: string
  techStackHeading: string
}

// รายการเดียวของ timeline ประสบการณ์ทำงาน — เป็น server component ล้วนๆ ไม่มี interactivity
export function ExperienceItem({
  experience,
  locale,
  isCurrent,
  dateRangeLabel,
  durationLabel,
  employmentTypeLabel,
  achievementsHeading,
  techStackHeading,
}: IExperienceItemProps) {
  const hasAchievements = experience.achievements.length > 0
  const hasTechStack = experience.techStack.length > 0

  return (
    <div className='relative'>
      <span
        className={cn(
          'absolute top-1.5 -left-10 flex size-4 items-center justify-center rounded-full ring-4 ring-background sm:-left-14',
          isCurrent ? 'bg-accent' : 'bg-border-strong',
        )}
      >
        {isCurrent && (
          <span
            className='absolute inline-flex size-4 rounded-full bg-accent opacity-75 motion-safe:animate-ping'
            aria-hidden='true'
          />
        )}
      </span>

      <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
          <h3 className='text-lg font-semibold text-foreground'>
            {getLocalizedText(experience.position, locale)}
          </h3>
          <Badge variant='accent'>{employmentTypeLabel}</Badge>
        </div>

        <div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground'>
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 rounded-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-accent'
            >
              {experience.company}
              <ArrowUpRight className='size-3.5' aria-hidden='true' />
            </a>
          ) : (
            <span className='font-medium text-foreground'>{experience.company}</span>
          )}

          <span className='inline-flex items-center gap-1'>
            <Calendar className='size-4' aria-hidden='true' />
            {dateRangeLabel} ({durationLabel})
          </span>

          <span className='inline-flex items-center gap-1'>
            <MapPin className='size-4' aria-hidden='true' />
            {getLocalizedText(experience.location, locale)}
          </span>
        </div>

        <p className='text-sm text-muted-foreground'>{getLocalizedText(experience.description, locale)}</p>

        {hasAchievements && (
          <div className='flex flex-col gap-2'>
            <h4 className='text-sm font-semibold text-foreground'>{achievementsHeading}</h4>
            <ul className='flex flex-col gap-1.5'>
              {experience.achievements.map((achievement, achievementIndex) => (
                <li key={achievementIndex} className='flex gap-2 text-sm text-muted-foreground'>
                  <span className='mt-2 size-1.5 shrink-0 rounded-full bg-accent' aria-hidden='true' />
                  {getLocalizedText(achievement, locale)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasTechStack && (
          <div className='flex flex-col gap-2'>
            <h4 className='text-sm font-semibold text-foreground'>{techStackHeading}</h4>
            <div className='flex flex-wrap gap-2'>
              {experience.techStack.map((tech) => (
                <Badge key={tech} variant='outline' size='sm'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
