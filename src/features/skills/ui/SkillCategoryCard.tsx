import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import type { ISkillCategory, SkillLevel } from '@/types/portfolio'

import { SkillLevelMeter } from './SkillLevelMeter'

export interface ISkillCategoryCardProps {
  category: ISkillCategory
  levelLabels: Record<SkillLevel, string>
  formatYearsOfExperience: (years: number) => string
}

export function SkillCategoryCard({
  category,
  levelLabels,
  formatYearsOfExperience,
}: ISkillCategoryCardProps) {
  const highlightedSkills = category.skills
    .slice(0, 2)
    .map((skill) => skill.name)
    .join(' · ')

  return (
    <Card className='overflow-hidden border-border/75 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-surface)_96%,transparent),color-mix(in_oklab,var(--color-surface-muted)_90%,transparent))]'>
      <CardHeader>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-accent'>
          {highlightedSkills}
        </p>
        <CardTitle>{category.title}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        {category.skills.map((skill) => (
          <SkillLevelMeter
            key={skill.name}
            name={skill.name}
            level={skill.level}
            levelLabel={levelLabels[skill.level]}
            yearsLabel={
              skill.yearsOfExperience ? formatYearsOfExperience(skill.yearsOfExperience) : undefined
            }
          />
        ))}
      </CardContent>
    </Card>
  )
}
