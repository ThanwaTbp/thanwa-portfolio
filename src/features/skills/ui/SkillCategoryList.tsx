import { Sparkles } from 'lucide-react'

import { EmptyState } from '@/components/common/EmptyState'
import { emptyStateIcon } from '@/components/common/emptyStateIcon'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { COPY, formatYearsOfExperience } from '@/constants/copy'
import type { ISkillCategory, SkillLevel } from '@/types/portfolio'

import { SkillCategoryCard } from './SkillCategoryCard'

export interface ISkillCategoryListProps {
  skillCategories: ISkillCategory[]
}

export function SkillCategoryList({ skillCategories }: ISkillCategoryListProps) {
  const categoriesWithSkills = skillCategories.filter((category) => category.skills.length > 0)

  if (categoriesWithSkills.length === 0) {
    return (
      <EmptyState
        icon={emptyStateIcon(Sparkles)}
        title={COPY.skills.empty.title}
        description={COPY.skills.empty.description}
        action={<Button href='/'>{COPY.skills.empty.action}</Button>}
      />
    )
  }

  const levelLabels: Record<SkillLevel, string> = COPY.skills.levels

  return (
    <RevealOnScroll stagger className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      {categoriesWithSkills.map((category) => (
        <SkillCategoryCard
          key={category.id}
          category={category}
          levelLabels={levelLabels}
          formatYearsOfExperience={formatYearsOfExperience}
        />
      ))}
    </RevealOnScroll>
  )
}
