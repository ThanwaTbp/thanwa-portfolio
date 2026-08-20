export type ProjectCategory = 'web' | 'mobile' | 'design' | 'other'

export interface IProjectLink {
  label: string
  url: string
  type: 'live' | 'repo' | 'case-study'
}

export interface IProjectMetric {
  label: string
  value: string
}

export interface IProject {
  slug: string
  title: string
  summary: string
  description: string
  category: ProjectCategory
  role: string
  /** ปีที่ทำโปรเจกต์ ใช้เรียงลำดับและกรอง */
  year: number
  featured: boolean
  coverImage?: string
  gallery?: string[]
  techStack: string[]
  highlights: string[]
  metrics?: IProjectMetric[]
  links?: IProjectLink[]
}

export type EmploymentType = 'full-time' | 'part-time' | 'freelance' | 'contract' | 'internship'

export interface IExperience {
  id: string
  company: string
  position: string
  employmentType: EmploymentType
  location: string
  /** รูปแบบ YYYY-MM */
  startDate: string
  /** null = ยังทำงานอยู่ปัจจุบัน */
  endDate: string | null
  description: string
  achievements: string[]
  techStack: string[]
  companyUrl?: string
}

export interface IEducation {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string | null
  grade?: string
  description?: string
  activities?: string[]
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface ISkill {
  name: string
  level: SkillLevel
  /** จำนวนปีที่ใช้งานจริง ใช้แสดงใน tooltip/รายละเอียด */
  yearsOfExperience?: number
}

export interface ISkillCategory {
  id: string
  title: string
  description: string
  skills: ISkill[]
}

export interface ISocialLink {
  platform: 'github' | 'linkedin' | 'email' | 'x' | 'dribbble' | 'website'
  label: string
  url: string
}

export interface IProfileStat {
  label: string
  value: number
  suffix?: string
}

export interface IProfile {
  name: string
  headline: string
  bio: string
  location: string
  avatar?: string
  resumeUrl?: string
  available: boolean
  socials: ISocialLink[]
  stats: IProfileStat[]
  /**
   * Hero section (หน้าแรก) — ปรับได้จาก admin เพื่อให้ Typewriter/stack แสดงตามที่ต้องการ
   * ทำ optional เพื่อรองรับข้อมูลเดิมที่ยังไม่เคยมีฟิลด์นี้ใน Appwrite
   */
  heroIntro?: string
  heroRoles?: string[]
  heroStack?: string[]
}
