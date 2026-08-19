import type { Metadata } from 'next'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SkillCategoryList } from '@/features/skills/ui/SkillCategoryList'
import { TechStackMarquee } from '@/features/skills/ui/TechStackMarquee'
import { COPY } from '@/constants/copy'
import { getProjectTechStack, getSkillCategories } from '@/services/portfolio-service'

export const metadata: Metadata = {
  title: COPY.skills.title,
  description: COPY.skills.description,
}

export default async function SkillsPage() {
  const skillCategories = await getSkillCategories()
  const techStack = await getProjectTechStack()

  return (
    <>
      <ScrollProgress />
      <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
        <SectionHeading as='h1' title={COPY.skills.title} description={COPY.skills.description} />

        {techStack.length > 0 && (
          <div className='mt-10'>
            <TechStackMarquee techStack={techStack} />
          </div>
        )}

        <div className='mt-12'>
          <SkillCategoryList skillCategories={skillCategories} />
        </div>
      </section>
    </>
  )
}
