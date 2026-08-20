import type { Metadata } from 'next'

import { SectionHeading } from '@/components/common/SectionHeading'
import { EducationTimeline } from '@/features/education/ui/EducationTimeline'
import { COPY } from '@/constants/copy'
import { getEducations } from '@/services/portfolio-service'

export const metadata: Metadata = {
  title: COPY.education.title,
  description: COPY.education.description,
}

export default async function EducationPage() {
  const educations = await getEducations()

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <SectionHeading
        as='h1'
        title={COPY.education.title}
        description={COPY.education.description}
      />

      <div className='mt-12'>
        <EducationTimeline educations={educations} />
      </div>
    </section>
  )
}
