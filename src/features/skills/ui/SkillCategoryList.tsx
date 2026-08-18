import { Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { EmptyState } from '@/components/common/EmptyState'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import type { ISkillCategory, SkillLevel } from '@/types/portfolio'

import { SkillCategoryCard } from './SkillCategoryCard'

export interface ISkillCategoryListProps {
  skillCategories: ISkillCategory[]
  locale: Locale
}

// รายการหมวดทักษะทั้งหมด — server component จัดเป็น grid 1 คอลัมน์มือถือ / 2 คอลัมน์ lg
export async function SkillCategoryList({ skillCategories, locale }: ISkillCategoryListProps) {
  const translateSkills = await getTranslations('skills')

  // ข้ามหมวดที่ไม่มี skill เลย กันการ์ดเปล่า
  const categoriesWithSkills = skillCategories.filter((category) => category.skills.length > 0)

  if (categoriesWithSkills.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title={translateSkills('empty.title')}
        description={translateSkills('empty.description')}
        action={<Button href='/'>{translateSkills('empty.action')}</Button>}
      />
    )
  }

  const levelLabels: Record<SkillLevel, string> = {
    beginner: translateSkills('levels.beginner'),
    intermediate: translateSkills('levels.intermediate'),
    advanced: translateSkills('levels.advanced'),
    expert: translateSkills('levels.expert'),
  }

  const formatYearsOfExperience = (years: number) => translateSkills('yearsOfExperience', { years })

  return (
    <RevealOnScroll stagger className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      {categoriesWithSkills.map((category) => (
        <SkillCategoryCard
          key={category.id}
          category={category}
          locale={locale}
          levelLabels={levelLabels}
          formatYearsOfExperience={formatYearsOfExperience}
        />
      ))}
    </RevealOnScroll>
  )
}
