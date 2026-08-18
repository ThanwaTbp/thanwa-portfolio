import { Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { ISkillCategory } from '@/types/portfolio'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { MarqueeRow } from '@/components/common/MarqueeRow'
import { SectionHeading } from '@/components/common/SectionHeading'

export interface ISkillsPreviewProps {
  skillCategories: ISkillCategory[]
}

export async function SkillsPreview({ skillCategories }: ISkillsPreviewProps) {
  const translate = await getTranslations('home')
  const translateCommon = await getTranslations('common')
  const translateSkills = await getTranslations('skills')

  // ชื่อ skill เป็น string ล้วนไม่ต้องแปลภาษา — รวมจากทุกหมวดแล้วแบ่งครึ่งไปแสดง 2 แถวสวนทาง
  const allSkills = skillCategories.flatMap((skillCategory) => skillCategory.skills)
  const midpoint = Math.ceil(allSkills.length / 2)
  const firstRowSkills = allSkills.slice(0, midpoint)
  const secondRowSkills = allSkills.slice(midpoint)

  return (
    <section className='py-16 sm:py-20 lg:py-28'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
          <SectionHeading
            title={translate('skillsPreviewTitle')}
            description={translate('skillsPreviewDescription')}
          />
          <Link href='/skills' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            {translateCommon('viewAll')}
          </Link>
        </div>
      </div>

      {allSkills.length === 0 ? (
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <EmptyState
            icon={Sparkles}
            title={translateSkills('empty.title')}
            description={translateSkills('empty.description')}
            action={
              <Link href='/' className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                {translateSkills('empty.action')}
              </Link>
            }
            className='mt-10'
          />
        </div>
      ) : (
        <div className='mt-10 flex flex-col gap-4'>
          <MarqueeRow direction='left' speed={28}>
            {firstRowSkills.map((skill) => (
              <Badge key={skill.name} size='md' variant='outline'>
                {skill.name}
              </Badge>
            ))}
          </MarqueeRow>
          <MarqueeRow direction='right' speed={34}>
            {secondRowSkills.map((skill) => (
              <Badge key={skill.name} size='md'>
                {skill.name}
              </Badge>
            ))}
          </MarqueeRow>
        </div>
      )}
    </section>
  )
}
