import type { ISkillCategory } from '@/types/portfolio'

/**
 * รายการทักษะแบ่งตามหมวดหมู่ — เป็นข้อมูลตัวอย่างที่ให้เจ้าของเว็บมาแทนที่ทีหลัง
 */
export const SKILL_CATEGORIES: ISkillCategory[] = [
  {
    id: 'skill-frontend-frameworks',
    title: {
      en: 'Frontend Frameworks',
      th: 'เฟรมเวิร์กฝั่ง Frontend',
    },
    description: {
      en: 'Frameworks I use daily to build modern, production-grade interfaces.',
      th: 'เฟรมเวิร์กที่ใช้งานเป็นประจำในการสร้างหน้าเว็บระดับ production',
    },
    skills: [
      { name: 'React', level: 'expert', yearsOfExperience: 5 },
      { name: 'Next.js', level: 'expert', yearsOfExperience: 4 },
      { name: 'Vue.js', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Nuxt', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Svelte', level: 'intermediate', yearsOfExperience: 1 },
    ],
  },
  {
    id: 'skill-languages-styling',
    title: {
      en: 'Languages & Styling',
      th: 'ภาษาและการจัดสไตล์',
    },
    description: {
      en: 'Core languages and styling tools behind every interface I build.',
      th: 'ภาษาหลักและเครื่องมือจัดสไตล์ที่อยู่เบื้องหลังทุกหน้าเว็บที่สร้าง',
    },
    skills: [
      { name: 'TypeScript', level: 'expert', yearsOfExperience: 5 },
      { name: 'JavaScript (ES2023)', level: 'expert', yearsOfExperience: 6 },
      { name: 'Tailwind CSS', level: 'expert', yearsOfExperience: 4 },
      { name: 'CSS3 / Sass', level: 'advanced', yearsOfExperience: 6 },
      { name: 'HTML5', level: 'expert', yearsOfExperience: 6 },
    ],
  },
  {
    id: 'skill-animation-motion',
    title: {
      en: 'Animation & Motion',
      th: 'แอนิเมชันและการเคลื่อนไหว',
    },
    description: {
      en: 'Tools for building smooth, purposeful motion across web and mobile.',
      th: 'เครื่องมือสำหรับสร้างแอนิเมชันที่ลื่นไหลและมีจุดประสงค์ชัดเจนทั้งบนเว็บและมือถือ',
    },
    skills: [
      { name: 'GSAP', level: 'expert', yearsOfExperience: 4 },
      { name: 'Motion (Framer Motion)', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Lottie', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'CSS Animations', level: 'advanced', yearsOfExperience: 5 },
    ],
  },
  {
    id: 'skill-tooling-workflow',
    title: {
      en: 'Tooling & Workflow',
      th: 'เครื่องมือและกระบวนการทำงาน',
    },
    description: {
      en: 'The tooling that keeps development fast, consistent, and collaborative.',
      th: 'เครื่องมือที่ช่วยให้การพัฒนางานรวดเร็ว สม่ำเสมอ และทำงานร่วมกับทีมได้ดี',
    },
    skills: [
      { name: 'Git', level: 'expert', yearsOfExperience: 6 },
      { name: 'Vite', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Webpack', level: 'intermediate', yearsOfExperience: 4 },
      { name: 'ESLint / Prettier', level: 'expert', yearsOfExperience: 5 },
      { name: 'Figma', level: 'advanced', yearsOfExperience: 5 },
      { name: 'Storybook', level: 'advanced', yearsOfExperience: 3 },
    ],
  },
  {
    id: 'skill-backend-data',
    title: {
      en: 'Backend & Data',
      th: 'Backend และการจัดการข้อมูล',
    },
    description: {
      en: 'Enough backend fluency to design APIs and data models alongside the UI.',
      th: 'ความรู้ฝั่ง backend ที่มากพอสำหรับออกแบบ API และโครงสร้างข้อมูลควบคู่กับ UI',
    },
    skills: [
      { name: 'Node.js', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Supabase', level: 'advanced', yearsOfExperience: 2 },
      { name: 'REST / GraphQL APIs', level: 'advanced', yearsOfExperience: 5 },
      { name: 'PostgreSQL', level: 'intermediate', yearsOfExperience: 3 },
    ],
  },
]
