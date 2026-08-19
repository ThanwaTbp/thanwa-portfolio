import type { IProfile } from '@/types/portfolio'

/**
 * ข้อมูลโปรไฟล์หลักของเจ้าของเว็บ — เป็นข้อมูลตัวอย่างที่ให้เจ้าของมาแทนที่ทีหลัง
 * แก้ไขได้ตรงนี้ที่เดียว หน้าเว็บทุกจุดที่แสดงโปรไฟล์จะอัปเดตตามทันที
 */
export const PROFILE: IProfile = {
  name: 'Thanwa Taboonpong',
  headline: 'Frontend Engineer',
  bio: 'I build frontends that feel intentional, fast, and genuinely pleasant to use. My focus sits at the intersection of interface design, interaction detail, and production-ready engineering with React, Next.js, Vue, and motion systems. Some profile content is still being refreshed from my previous CV site and will be updated with final details soon.',
  location: 'Bangkok, Thailand',
  avatar: undefined,
  resumeUrl: undefined,
  available: true,
  socials: [
    {
      platform: 'website',
      label: 'thanwa-cv.vercel.app',
      url: 'https://thanwa-cv.vercel.app/',
    },
    {
      platform: 'github',
      label: 'github.com/thanwadev',
      url: 'https://github.com/thanwadev',
    },
    {
      platform: 'linkedin',
      label: 'linkedin.com/in/thanwadev',
      url: 'https://linkedin.com/in/thanwadev',
    },
    {
      platform: 'email',
      label: 'hello@thanwa.dev',
      url: 'mailto:hello@thanwa.dev',
    },
    {
      platform: 'x',
      label: '@thanwadev',
      url: 'https://x.com/thanwadev',
    },
  ],
  stats: [
    {
      label: 'Years of experience',
      value: 5,
      suffix: '+',
    },
    {
      label: 'Projects shipped',
      value: 30,
      suffix: '+',
    },
    {
      label: 'Technologies used',
      value: 20,
      suffix: '+',
    },
    {
      label: 'Happy clients',
      value: 15,
      suffix: '+',
    },
  ],
}
