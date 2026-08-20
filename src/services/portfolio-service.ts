import type {
  IEducation,
  IExperience,
  IProfile,
  IProject,
  ISkillCategory,
  ProjectCategory,
} from '@/types/portfolio'
import type { IPortfolioData } from '@/types/portfolio-data'
import { loadPortfolioData } from '@/services/portfolio-store-service'
import { sortExperiencesByRecency } from '@/utils/experience'

export interface IGetProjectsOptions {
  category?: ProjectCategory
  tech?: string
  featuredOnly?: boolean
  limit?: number
}

function sortProjectsByYearDescending(projects: IProject[]): IProject[] {
  return [...projects].sort((firstProject, secondProject) => secondProject.year - firstProject.year)
}

async function getData(): Promise<IPortfolioData> {
  return loadPortfolioData()
}

export async function getProfile(): Promise<IProfile> {
  const data = await getData()
  return data.profile
}

export async function getProjects(options?: IGetProjectsOptions): Promise<IProject[]> {
  const data = await getData()
  let projects = sortProjectsByYearDescending(data.projects)

  if (options?.category) {
    projects = projects.filter((project) => project.category === options.category)
  }

  const techFilter = options?.tech
  if (techFilter) {
    projects = projects.filter((project) => project.techStack.includes(techFilter))
  }

  if (options?.featuredOnly) {
    projects = projects.filter((project) => project.featured)
  }

  if (typeof options?.limit === 'number') {
    projects = projects.slice(0, options.limit)
  }

  return projects
}

export async function getFeaturedProjects(limit?: number): Promise<IProject[]> {
  return getProjects({ featuredOnly: true, limit })
}

export async function getProjectBySlug(slug: string): Promise<IProject | undefined> {
  const data = await getData()
  return data.projects.find((project) => project.slug === slug)
}

export interface IAdjacentProjects {
  previous?: IProject
  next?: IProject
}

export async function getAdjacentProjects(slug: string): Promise<IAdjacentProjects> {
  const data = await getData()
  const sortedProjects = sortProjectsByYearDescending(data.projects)
  const currentIndex = sortedProjects.findIndex((project) => project.slug === slug)

  if (currentIndex === -1 || sortedProjects.length <= 1) {
    return {}
  }

  const previousIndex = (currentIndex - 1 + sortedProjects.length) % sortedProjects.length
  const nextIndex = (currentIndex + 1) % sortedProjects.length

  return {
    previous: sortedProjects[previousIndex],
    next: sortedProjects[nextIndex],
  }
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const data = await getData()
  const categoryOrder: ProjectCategory[] = ['web', 'mobile', 'design', 'other']
  const categoriesInUse = new Set(data.projects.map((project) => project.category))

  return categoryOrder.filter((category) => categoriesInUse.has(category))
}

export async function getProjectTechStack(): Promise<string[]> {
  const data = await getData()
  const techUsageCount = new Map<string, number>()

  data.projects.forEach((project) => {
    project.techStack.forEach((tech) => {
      techUsageCount.set(tech, (techUsageCount.get(tech) ?? 0) + 1)
    })
  })

  return [...techUsageCount.entries()]
    .sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])
    .map(([tech]) => tech)
}

export async function getExperiences(): Promise<IExperience[]> {
  const data = await getData()
  return sortExperiencesByRecency(data.experiences)
}

export async function getEducations(): Promise<IEducation[]> {
  const data = await getData()
  return [...data.educations].sort((firstEducation, secondEducation) =>
    secondEducation.startDate.localeCompare(firstEducation.startDate),
  )
}

export async function getSkillCategories(): Promise<ISkillCategory[]> {
  const data = await getData()
  return [...data.skillCategories]
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const data = await getData()
  return data.projects.map((project) => project.slug)
}

export async function getPortfolioSnapshot(): Promise<IPortfolioData> {
  return getData()
}
