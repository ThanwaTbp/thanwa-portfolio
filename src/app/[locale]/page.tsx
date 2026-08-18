import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { AboutSection } from '@/features/home/ui/AboutSection'
import { ContactCallout } from '@/features/home/ui/ContactCallout'
import { ExperiencePreview } from '@/features/home/ui/ExperiencePreview'
import { FeaturedProjects } from '@/features/home/ui/FeaturedProjects'
import { HeroSection } from '@/features/home/ui/HeroSection'
import { SkillsPreview } from '@/features/home/ui/SkillsPreview'
import { StatsSection } from '@/features/home/ui/StatsSection'
import { routing } from '@/i18n/routing'
import { getExperiences, getFeaturedProjects, getProfile, getSkillCategories } from '@/services/portfolio-service'

const FEATURED_PROJECTS_LIMIT = 3

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const translateCommon = await getTranslations({ locale, namespace: 'common' })

  return {
    title: translateCommon('siteName'),
    description: translateCommon('tagline'),
  }
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const profile = getProfile()
  const featuredProjects = getFeaturedProjects(FEATURED_PROJECTS_LIMIT)
  const experiences = getExperiences()
  const skillCategories = getSkillCategories()

  return (
    <>
      <ScrollProgress />
      <HeroSection profile={profile} locale={locale} />
      <AboutSection profile={profile} locale={locale} />
      <StatsSection stats={profile.stats} locale={locale} />
      <FeaturedProjects projects={featuredProjects} locale={locale} />
      <ExperiencePreview experiences={experiences} locale={locale} />
      <SkillsPreview skillCategories={skillCategories} />
      <ContactCallout profile={profile} />
    </>
  )
}
