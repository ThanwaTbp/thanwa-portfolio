import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SkillCategoryList } from '@/features/skills/ui/SkillCategoryList'
import { TechStackMarquee } from '@/features/skills/ui/TechStackMarquee'
import { routing } from '@/i18n/routing'
import { getProjectTechStack, getSkillCategories } from '@/services/portfolio-service'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/skills'>): Promise<Metadata> {
  const { locale } = await params
  const translate = await getTranslations({ locale, namespace: 'skills' })

  return {
    title: translate('title'),
    description: translate('description'),
  }
}

export default async function SkillsPage({ params }: PageProps<'/[locale]/skills'>) {
  const { locale: localeParam } = await params
  // ตรวจ locale ให้ตรงกับ union type ที่รองรับ — layout ระดับบนกัน locale แปลกปลอมด้วย notFound() ไว้แล้ว
  const locale = hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale
  setRequestLocale(locale)

  const translate = await getTranslations('skills')
  const skillCategories = getSkillCategories()
  const techStack = getProjectTechStack()

  return (
    <>
      <ScrollProgress />
      <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
        <SectionHeading as='h1' title={translate('title')} description={translate('description')} />

        {techStack.length > 0 && (
          <div className='mt-10'>
            <TechStackMarquee techStack={techStack} />
          </div>
        )}

        <div className='mt-12'>
          <SkillCategoryList skillCategories={skillCategories} locale={locale} />
        </div>
      </section>
    </>
  )
}
