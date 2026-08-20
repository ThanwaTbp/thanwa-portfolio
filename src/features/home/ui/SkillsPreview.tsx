import { Sparkles } from 'lucide-react'
import Link from 'next/link'

import type { ISkillCategory } from '@/types/portfolio'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { emptyStateIcon } from '@/components/common/emptyStateIcon'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SectionShell } from '@/components/common/SectionShell'
import { TechIcon } from '@/components/common/TechIcon'
import { COPY } from '@/constants/copy'

export interface ISkillsPreviewProps {
  skillCategories: ISkillCategory[]
}

export function SkillsPreview({ skillCategories }: ISkillsPreviewProps) {
  const featuredCategories = skillCategories
    .filter((skillCategory) => skillCategory.skills.length > 0)
    .slice(0, 3)

  return (
    <SectionShell id='skills' index={4} label={COPY.nav.skills} tone='tinted'>
      <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
        <SectionHeading
          title={COPY.home.skillsPreviewTitle}
          description={COPY.home.skillsPreviewDescription}
        />
        <Link href='/skills' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          {COPY.common.viewAll}
        </Link>
      </div>

      {featuredCategories.length === 0 ? (
        <EmptyState
          icon={emptyStateIcon(Sparkles)}
          title={COPY.skills.empty.title}
          description={COPY.skills.empty.description}
          action={
            <Link href='/' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              {COPY.skills.empty.action}
            </Link>
          }
          className='mt-10'
        />
      ) : (
        <div className='mt-10'>
          <RevealOnScroll stagger className='grid gap-4 lg:grid-cols-3'>
            {featuredCategories.map((skillCategory) => (
              <article
                key={skillCategory.id}
                className='rounded-3xl border border-border/75 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-surface)_96%,transparent),color-mix(in_oklab,var(--color-surface-muted)_90%,transparent))] p-6'
              >
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>
                  {skillCategory.title}
                </p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {skillCategory.skills.slice(0, 4).map((skill) => (
                    <Badge
                      key={skill.name}
                      size='md'
                      variant='outline'
                      className='gap-1.5 border-border/80 bg-surface/80'
                    >
                      <TechIcon name={skill.name} className='size-3.5' />
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </RevealOnScroll>
        </div>
      )}
    </SectionShell>
  )
}
