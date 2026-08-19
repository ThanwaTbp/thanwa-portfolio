import type { IExperience } from '@/types/portfolio'

/**
 * ประวัติการทำงาน — เรียงจากล่าสุดไปเก่าสุด (รายการแรกคือปัจจุบัน)
 * เป็นข้อมูลตัวอย่างที่ให้เจ้าของเว็บมาแทนที่ทีหลัง
 */
export const EXPERIENCES: IExperience[] = [
  {
    id: 'exp-shift-studio',
    company: 'Shift Studio',
    position: 'Senior Frontend Developer',
    employmentType: 'full-time',
    location: 'Bangkok, Thailand (Hybrid)',
    startDate: '2023-06',
    endDate: null,
    description: 'Leading frontend architecture for client projects ranging from e-commerce platforms to internal tooling, while mentoring a team of 4 junior developers.',
    achievements: [
      'Established a shared component library used across 6 client projects.',
      'Reduced average build time by 35% by migrating to Turbopack.',
      'Introduced code review guidelines that cut production bugs by 25%.',
      'Mentored 4 junior developers, 2 of whom were promoted within a year.',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Supabase'],
    companyUrl: 'https://shiftstudio.example.com',
  },
  {
    id: 'exp-lighthouse-labs',
    company: 'Lighthouse Labs',
    position: 'Frontend Developer',
    employmentType: 'full-time',
    location: 'Bangkok, Thailand',
    startDate: '2021-08',
    endDate: '2023-05',
    description: 'Built and maintained customer-facing web apps for fintech and logistics clients, working closely with designers and backend engineers in an agile team.',
    achievements: [
      'Delivered 8 production releases on schedule across 2 major clients.',
      'Migrated a legacy jQuery app to Vue 3, improving load speed by 60%.',
      'Set up CI/CD pipelines that cut deployment time from 40 to 8 minutes.',
    ],
    techStack: ['Vue.js', 'Nuxt', 'JavaScript', 'SCSS', 'REST API'],
    companyUrl: 'https://lighthouselabs.example.com',
  },
  {
    id: 'exp-freelance',
    company: 'Freelance',
    position: 'Freelance Frontend Developer',
    employmentType: 'freelance',
    location: 'Remote',
    startDate: '2020-03',
    endDate: '2021-07',
    description: 'Worked independently with small businesses and startups to design and build marketing sites, landing pages, and simple web apps.',
    achievements: [
      'Completed 12 client projects with a 100% on-time delivery rate.',
      'Built a landing page template kit resold to 50+ small businesses.',
      'Grew a personal client network entirely through referrals.',
    ],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'WordPress'],
  },
  {
    id: 'exp-pixel-forge',
    company: 'Pixel Forge Agency',
    position: 'Junior Web Developer',
    employmentType: 'internship',
    location: 'Bangkok, Thailand',
    startDate: '2019-06',
    endDate: '2020-02',
    description: 'Supported the agency team in building and maintaining WordPress and static websites for local business clients while learning modern JavaScript tooling.',
    achievements: [
      'Delivered 15+ small business websites within the internship period.',
      'Automated repetitive deployment tasks, saving 3 hours per release.',
      'Learned Git workflows and code review practices from senior developers.',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'WordPress'],
    companyUrl: 'https://pixelforge.example.com',
  },
]
