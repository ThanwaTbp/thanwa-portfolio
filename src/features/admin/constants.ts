import { COPY } from '@/constants/copy'

export type AdminTab = keyof typeof COPY.admin.tabs

export const ADMIN_TAB_IDS = Object.keys(COPY.admin.tabs) as AdminTab[]

export const ADMIN_ROUTES = {
  projects: '/admin/projects',
  profile: '/admin/profile',
  experience: '/admin/experience',
  education: '/admin/education',
  skills: '/admin/skills',
} as const satisfies Record<AdminTab, string>

export const DEFAULT_ADMIN_ROUTE = ADMIN_ROUTES.projects

export function isAdminTab(value: string | undefined): value is AdminTab {
  return Boolean(value && ADMIN_TAB_IDS.includes(value as AdminTab))
}

export function getAdminTabFromPathname(pathname: string): AdminTab {
  const pathSegment = pathname.split('/')[2]
  return isAdminTab(pathSegment) ? pathSegment : 'projects'
}
