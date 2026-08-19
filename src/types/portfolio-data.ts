import type { IEducation, IExperience, IProfile, IProject, ISkillCategory } from '@/types/portfolio'

export interface IPortfolioData {
  profile: IProfile
  projects: IProject[]
  experiences: IExperience[]
  educations: IEducation[]
  skillCategories: ISkillCategory[]
}

export type PortfolioEntityKey = keyof IPortfolioData
