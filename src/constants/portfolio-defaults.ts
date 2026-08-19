import { EDUCATIONS } from '@/constants/educations'
import { EXPERIENCES } from '@/constants/experiences'
import { PROFILE } from '@/constants/profile'
import { PROJECTS } from '@/constants/projects'
import { SKILL_CATEGORIES } from '@/constants/skills'
import type { IPortfolioData } from '@/types/portfolio-data'

export function getDefaultPortfolioData(): IPortfolioData {
  return {
    profile: structuredClone(PROFILE),
    projects: structuredClone(PROJECTS),
    experiences: structuredClone(EXPERIENCES),
    educations: structuredClone(EDUCATIONS),
    skillCategories: structuredClone(SKILL_CATEGORIES),
  }
}
