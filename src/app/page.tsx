import type { Metadata } from 'next'

import { ScrollProgress } from '@/components/common/ScrollProgress'
import { AboutSection } from '@/features/home/ui/AboutSection'
import { ExperiencePreview } from '@/features/home/ui/ExperiencePreview'
import { FeaturedProjects } from '@/features/home/ui/FeaturedProjects'
import { HeroSection } from '@/features/home/ui/HeroSection'
import { SkillsPreview } from '@/features/home/ui/SkillsPreview'
import { StatsSection } from '@/features/home/ui/StatsSection'
import { COPY } from '@/constants/copy'
import {
  getExperiences,
  getFeaturedProjects,
  getProfile,
  getSkillCategories,
} from '@/services/portfolio-service'

const FEATURED_PROJECTS_LIMIT = 3

export const metadata: Metadata = {
  title: COPY.common.siteName,
  description: COPY.common.tagline,
}

export default async function HomePage() {
  const profile = await getProfile()
  const featuredProjects = await getFeaturedProjects(FEATURED_PROJECTS_LIMIT)
  const experiences = await getExperiences()
  const skillCategories = await getSkillCategories()

  return (
    <>
      <ScrollProgress />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <StatsSection stats={profile.stats} />
      <FeaturedProjects projects={featuredProjects} />
      <ExperiencePreview experiences={experiences} />
      <SkillsPreview skillCategories={skillCategories} />
    </>
  )
}
