import { ArrowUpRight, Calendar, Check, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { TechIcon } from '@/components/common/TechIcon'
import { cn } from '@/lib/utils'
import type { IExperience } from '@/types/portfolio'

export interface IExperienceItemProps {
  experience: IExperience
  isCurrent: boolean
  dateRangeLabel: string
  durationLabel: string
  employmentTypeLabel: string
  achievementsHeading: string
  techStackHeading: string
}

/** ตัวย่อชื่อบริษัทสูงสุด 2 ตัว ไว้แสดงในกรอบโลโก้แทนรูปจริง */
function getCompanyInitials(company: string): string {
  const initials = company
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

  return initials || '?'
}

export function ExperienceItem({
  experience,
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
    <article
      className={cn(
        'group relative rounded-2xl border bg-surface/70 p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_60px_-38px_color-mix(in_oklab,var(--color-accent)_75%,transparent)] sm:p-6',
        isCurrent
          ? 'border-accent/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-accent-soft)_45%,transparent),transparent_55%)]'
          : 'border-border/70 hover:border-accent/25',
      )}
    >
      <span
        className={cn(
          'absolute top-8 -left-10 flex size-4 items-center justify-center rounded-full ring-4 ring-background sm:-left-14',
          isCurrent
            ? 'bg-accent shadow-[0_0_14px_color-mix(in_oklab,var(--color-accent)_70%,transparent)]'
            : 'border-2 border-border-strong bg-surface',
        )}
      >
        {isCurrent && (
          <span
            className='absolute inline-flex size-4 rounded-full bg-accent opacity-75 motion-safe:animate-ping'
            aria-hidden='true'
          />
        )}
      </span>

      <div className='flex items-start gap-4'>
        <span
          aria-hidden='true'
          className='font-display inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] text-sm font-semibold text-white shadow-[0_8px_22px_-14px_color-mix(in_oklab,var(--color-accent)_90%,transparent)]'
        >
          {getCompanyInitials(experience.company)}
        </span>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5'>
            <h3 className='text-lg leading-tight font-semibold text-foreground'>
              {experience.position}
            </h3>
            <Badge variant='accent'>{employmentTypeLabel}</Badge>
          </div>

          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-1 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            >
              {experience.company}
              <ArrowUpRight className='size-3.5' aria-hidden='true' />
            </a>
          ) : (
            <p className='mt-1 text-sm font-medium text-muted-foreground'>{experience.company}</p>
          )}
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        <span className='inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-muted/60 px-2.5 py-1 text-xs text-muted-foreground'>
          <Calendar className='size-3.5 text-accent' aria-hidden='true' />
          {dateRangeLabel}
          <span className='text-subtle-foreground'>· {durationLabel}</span>
        </span>
        <span className='inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-muted/60 px-2.5 py-1 text-xs text-muted-foreground'>
          <MapPin className='size-3.5 text-accent-2' aria-hidden='true' />
          {experience.location}
        </span>
      </div>

      <p className='mt-4 text-sm leading-6 text-muted-foreground'>{experience.description}</p>

      {hasAchievements && (
        <div className='mt-5'>
          <h4 className='flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-subtle-foreground uppercase'>
            <span
              aria-hidden='true'
              className='h-px w-5 bg-gradient-to-r from-accent to-transparent'
            />
            {achievementsHeading}
          </h4>
          <ul className='mt-3 flex flex-col gap-2'>
            {experience.achievements.map((achievement, achievementIndex) => (
              <li
                key={achievementIndex}
                className='flex gap-2.5 text-sm leading-6 text-muted-foreground'
              >
                <span
                  aria-hidden='true'
                  className='mt-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent'
                >
                  <Check className='size-2.5' />
                </span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasTechStack && (
        <div className='mt-5'>
          <h4 className='flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-subtle-foreground uppercase'>
            <span
              aria-hidden='true'
              className='h-px w-5 bg-gradient-to-r from-accent-2 to-transparent'
            />
            {techStackHeading}
          </h4>
          <div className='mt-3 flex flex-wrap gap-1.5'>
            {experience.techStack.map((tech) => (
              <Badge
                key={tech}
                variant='outline'
                size='sm'
                className='gap-1.5 border-border/70 bg-surface-muted/60 px-2 text-[0.6875rem] transition-colors duration-200 hover:border-border-strong'
              >
                <TechIcon name={tech} className='size-3.5' />
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
