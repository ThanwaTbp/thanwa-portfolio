/** ค่าข้อความที่ต้องแสดงได้ทั้ง 2 ภาษา — key ตรงกับ locale ที่รองรับ */
export interface ILocalizedText {
  en: string
  th: string
}

export type ProjectCategory = 'web' | 'mobile' | 'design' | 'other'

export interface IProjectLink {
  label: ILocalizedText
  url: string
  type: 'live' | 'repo' | 'case-study'
}

export interface IProjectMetric {
  label: ILocalizedText
  value: string
}

export interface IProject {
  slug: string
  title: string
  summary: ILocalizedText
  description: ILocalizedText
  category: ProjectCategory
  role: ILocalizedText
  /** ปีที่ทำโปรเจกต์ ใช้เรียงลำดับและกรอง */
  year: number
  featured: boolean
  coverImage?: string
  gallery?: string[]
  techStack: string[]
  highlights: ILocalizedText[]
  metrics?: IProjectMetric[]
  links?: IProjectLink[]
}

export type EmploymentType = 'full-time' | 'part-time' | 'freelance' | 'contract' | 'internship'

export interface IExperience {
  id: string
  company: string
  position: ILocalizedText
  employmentType: EmploymentType
  location: ILocalizedText
  /** รูปแบบ YYYY-MM */
  startDate: string
  /** null = ยังทำงานอยู่ปัจจุบัน */
  endDate: string | null
  description: ILocalizedText
  achievements: ILocalizedText[]
  techStack: string[]
  companyUrl?: string
}

export interface IEducation {
  id: string
  institution: ILocalizedText
  degree: ILocalizedText
  field: ILocalizedText
  startDate: string
  endDate: string | null
  grade?: string
  description?: ILocalizedText
  activities?: ILocalizedText[]
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
  title: ILocalizedText
  description: ILocalizedText
  skills: ISkill[]
}

export interface ISocialLink {
  platform: 'github' | 'linkedin' | 'email' | 'x' | 'dribbble' | 'website'
  label: string
  url: string
}

export interface IProfileStat {
  label: ILocalizedText
  value: number
  suffix?: string
}

export interface IProfile {
  name: ILocalizedText
  headline: ILocalizedText
  bio: ILocalizedText
  location: ILocalizedText
  avatar?: string
  resumeUrl?: string
  available: boolean
  socials: ISocialLink[]
  stats: IProfileStat[]
}
