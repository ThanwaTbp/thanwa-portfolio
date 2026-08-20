import type { Metadata } from 'next'

import { AboutSection } from '@/features/home/ui/AboutSection'
import { ExperiencePreview } from '@/features/home/ui/ExperiencePreview'
import { FeaturedProjects } from '@/features/home/ui/FeaturedProjects'
import { HeroSection } from '@/features/home/ui/HeroSection'
import { SkillsPreview } from '@/features/home/ui/SkillsPreview'
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
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <FeaturedProjects projects={featuredProjects} />
      <ExperiencePreview experiences={experiences} />
      <SkillsPreview skillCategories={skillCategories} />
    </>
  )
}
