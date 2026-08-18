import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Locale } from '@/i18n/routing'
import type { ISkillCategory, SkillLevel } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'

import { SkillLevelMeter } from './SkillLevelMeter'

export interface ISkillCategoryCardProps {
  category: ISkillCategory
  locale: Locale
  levelLabels: Record<SkillLevel, string>
  /** สร้างข้อความ ICU plural ของจำนวนปีประสบการณ์ (รับมาจาก server component แม่เพื่อไม่ต้องเรียก getTranslations ซ้ำ) */
  formatYearsOfExperience: (years: number) => string
}

// การ์ดหนึ่งหมวดทักษะ — แสดงหัวข้อ/คำอธิบายหมวด แล้ววน SkillLevelMeter ของแต่ละ skill
export function SkillCategoryCard({
  category,
  locale,
  levelLabels,
  formatYearsOfExperience,
}: ISkillCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getLocalizedText(category.title, locale)}</CardTitle>
        <CardDescription>{getLocalizedText(category.description, locale)}</CardDescription>
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
