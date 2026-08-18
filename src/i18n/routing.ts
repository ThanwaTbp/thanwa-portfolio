import { defineRouting } from 'next-intl/routing'

/** locale ที่รองรับทั้งเว็บ — ต้องตรงกับชื่อไฟล์ใน messages/ */
export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
