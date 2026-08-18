import { EDUCATIONS } from '@/constants/educations'
import { EXPERIENCES } from '@/constants/experiences'
import { PROFILE } from '@/constants/profile'
import { PROJECTS } from '@/constants/projects'
import { SKILL_CATEGORIES } from '@/constants/skills'
import type {
  IEducation,
  IExperience,
  IProfile,
  IProject,
  ISkillCategory,
  ProjectCategory,
} from '@/types/portfolio'

/**
 * portfolio-service.ts
 *
 * แหล่งข้อมูลกลางที่หน้าเว็บเรียกใช้แทนการอ่าน constants ตรงๆ
 * ทุกฟังก์ชันตอนนี้เป็น sync (อ่านจาก constants ในเครื่อง) แต่ตั้งชื่อ/รูปแบบ input-output
 * ให้เปลี่ยนไปเป็น async (ต่อ API หรือ CMS) ในอนาคตได้โดยไม่ต้องแก้โค้ดฝั่ง UI ที่เรียกใช้
 */

export interface IGetProjectsOptions {
  category?: ProjectCategory
  tech?: string
  featuredOnly?: boolean
  limit?: number
}

/** คืนข้อมูลโปรไฟล์เจ้าของเว็บ */
export function getProfile(): IProfile {
  return PROFILE
}

/** เรียงโปรเจกต์ตามปีมาก -> น้อยเสมอ (ใช้ array ใหม่ ไม่แก้ต้นทาง) */
function sortProjectsByYearDescending(projects: IProject[]): IProject[] {
  return [...projects].sort((firstProject, secondProject) => secondProject.year - firstProject.year)
}

/**
 * คืนรายการโปรเจกต์ เรียงตามปีล่าสุดก่อนเสมอ กรองได้ตาม category / tech / featuredOnly / limit
 */
export function getProjects(options?: IGetProjectsOptions): IProject[] {
  let projects = sortProjectsByYearDescending(PROJECTS)

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

/** คืนเฉพาะโปรเจกต์เด่น (featured: true) เรียงตามปีล่าสุดก่อน */
export function getFeaturedProjects(limit?: number): IProject[] {
  return getProjects({ featuredOnly: true, limit })
}

/** หาโปรเจกต์จาก slug — คืน undefined ถ้าไม่พบ */
export function getProjectBySlug(slug: string): IProject | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

export interface IAdjacentProjects {
  previous?: IProject
  next?: IProject
}

/**
 * หาโปรเจกต์ก่อนหน้า/ถัดไป สำหรับปุ่มเปลี่ยนหน้าในหน้ารายละเอียดโปรเจกต์
 * อ้างอิงลำดับตามที่เรียงแล้ว (ปีล่าสุดก่อน) และวนลูปกลับไปต้น/ท้ายรายการเมื่อสุดขอบ
 */
export function getAdjacentProjects(slug: string): IAdjacentProjects {
  const sortedProjects = sortProjectsByYearDescending(PROJECTS)
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

/** คืนเฉพาะ category ที่มีโปรเจกต์จริงอยู่ เรียงตามลำดับมาตรฐานของ category */
export function getProjectCategories(): ProjectCategory[] {
  const categoryOrder: ProjectCategory[] = ['web', 'mobile', 'design', 'other']
  const categoriesInUse = new Set(PROJECTS.map((project) => project.category))

  return categoryOrder.filter((category) => categoriesInUse.has(category))
}

/** รวม tech stack ของทุกโปรเจกต์แบบไม่ซ้ำ เรียงตามจำนวนที่ใช้งานมาก -> น้อย */
export function getProjectTechStack(): string[] {
  const techUsageCount = new Map<string, number>()

  PROJECTS.forEach((project) => {
    project.techStack.forEach((tech) => {
      techUsageCount.set(tech, (techUsageCount.get(tech) ?? 0) + 1)
    })
  })

  return [...techUsageCount.entries()]
    .sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])
    .map(([tech]) => tech)
}

/** คืนประวัติการทำงาน เรียงจากวันที่เริ่มงานล่าสุดไปเก่าสุด */
export function getExperiences(): IExperience[] {
  return [...EXPERIENCES].sort((firstExperience, secondExperience) =>
    secondExperience.startDate.localeCompare(firstExperience.startDate),
  )
}

/** คืนประวัติการศึกษา เรียงจากวันที่เริ่มเรียนล่าสุดไปเก่าสุด */
export function getEducations(): IEducation[] {
  return [...EDUCATIONS].sort((firstEducation, secondEducation) =>
    secondEducation.startDate.localeCompare(firstEducation.startDate),
  )
}

/** คืนรายการหมวดทักษะทั้งหมด */
export function getSkillCategories(): ISkillCategory[] {
  return [...SKILL_CATEGORIES]
}

/** คืนรายการ slug ของโปรเจกต์ทั้งหมด สำหรับใช้กับ generateStaticParams */
export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug)
}
