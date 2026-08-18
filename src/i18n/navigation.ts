import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// สร้าง navigation helper ที่รู้จัก locale prefix ของโปรเจกต์ (แทนการใช้ next/link, next/navigation ตรงๆ)
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
