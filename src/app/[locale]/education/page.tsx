import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EducationTimeline } from '@/features/education/ui/EducationTimeline'
import { routing } from '@/i18n/routing'
import { getEducations } from '@/services/portfolio-service'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/education'>): Promise<Metadata> {
  const { locale } = await params
  const translate = await getTranslations({ locale, namespace: 'education' })

  return {
    title: translate('title'),
    description: translate('description'),
  }
}

export default async function EducationPage({ params }: PageProps<'/[locale]/education'>) {
  const { locale: localeParam } = await params
  // ตรวจ locale ให้ตรงกับ union type ที่รองรับ — layout ระดับบนกัน locale แปลกปลอมด้วย notFound() ไว้แล้ว
  const locale = hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale
  setRequestLocale(locale)

  const translate = await getTranslations('education')
  const educations = getEducations()

  return (
    <>
      <ScrollProgress />
      <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
        <SectionHeading as='h1' title={translate('title')} description={translate('description')} />

        <div className='mt-12'>
          <EducationTimeline educations={educations} locale={locale} />
        </div>
      </section>
    </>
  )
}
