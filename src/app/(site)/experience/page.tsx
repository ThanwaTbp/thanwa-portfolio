import type { Metadata } from 'next'

import { SectionHeading } from '@/components/common/SectionHeading'
import { ExperienceTimeline } from '@/features/experience/ui/ExperienceTimeline'
import { COPY } from '@/constants/copy'
import { getExperiences } from '@/services/portfolio-service'

export const metadata: Metadata = {
  title: COPY.experience.title,
  description: COPY.experience.description,
}

export default async function ExperiencePage() {
  const experiences = await getExperiences()

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <SectionHeading
        as='h1'
        title={COPY.experience.title}
        description={COPY.experience.description}
      />

      <div className='mt-12'>
        <ExperienceTimeline experiences={experiences} />
      </div>
    </section>
  )
}
