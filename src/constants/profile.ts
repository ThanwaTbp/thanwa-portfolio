import type { IProfile } from '@/types/portfolio'

/**
 * ข้อมูลโปรไฟล์หลักของเจ้าของเว็บ — เป็นข้อมูลตัวอย่างที่ให้เจ้าของมาแทนที่ทีหลัง
 * แก้ไขได้ตรงนี้ที่เดียว หน้าเว็บทุกจุดที่แสดงโปรไฟล์จะอัปเดตตามทันที
 */
export const PROFILE: IProfile = {
  name: {
    en: 'Thanwa',
    th: 'ธันวา',
  },
  headline: {
    en: 'Frontend Developer crafting fast, accessible web experiences',
    th: 'Frontend Developer ผู้สร้างเว็บที่เร็ว ใช้งานง่าย และเข้าถึงได้จริง',
  },
  bio: {
    en: 'I build interfaces that feel effortless — from motion-rich marketing sites to data-heavy dashboards. Over the past 5+ years I have partnered with startups and agencies to turn design intent into production-ready code with React, Next.js, and Vue. I care deeply about performance, accessibility, and the small details that make a product feel polished.',
    th: 'ผมสร้างหน้าเว็บที่ใช้งานลื่นไหลตั้งแต่เว็บการตลาดที่มีลูกเล่นแอนิเมชันไปจนถึงแดชบอร์ดข้อมูลซับซ้อน ตลอด 5 กว่าปีที่ผ่านมาได้ร่วมงานกับทั้งสตาร์ทอัพและเอเจนซี่ เพื่อแปลงดีไซน์ให้กลายเป็นโค้ดพร้อมใช้งานจริงด้วย React, Next.js และ Vue ผมให้ความสำคัญกับประสิทธิภาพ การเข้าถึงได้ และรายละเอียดเล็กๆ ที่ทำให้โปรดักต์ดูประณีตขึ้น',
  },
  location: {
    en: 'Bangkok, Thailand',
    th: 'กรุงเทพฯ ประเทศไทย',
  },
  avatar: undefined,
  resumeUrl: 'https://thanwa.dev/resume-thanwa.pdf',
  available: true,
  socials: [
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
      label: {
        en: 'Years of experience',
        th: 'ปีประสบการณ์',
      },
      value: 5,
      suffix: '+',
    },
    {
      label: {
        en: 'Projects shipped',
        th: 'โปรเจกต์ที่ส่งมอบ',
      },
      value: 30,
      suffix: '+',
    },
    {
      label: {
        en: 'Technologies used',
        th: 'เทคโนโลยีที่ใช้งาน',
      },
      value: 20,
      suffix: '+',
    },
    {
      label: {
        en: 'Happy clients',
        th: 'ลูกค้าที่พึงพอใจ',
      },
      value: 15,
      suffix: '+',
    },
  ],
}
