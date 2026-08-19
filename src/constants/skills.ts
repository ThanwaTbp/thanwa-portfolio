import type { ISkillCategory } from '@/types/portfolio'

/**
 * รายการทักษะแบ่งตามหมวดหมู่ — เป็นข้อมูลตัวอย่างที่ให้เจ้าของเว็บมาแทนที่ทีหลัง
 */
export const SKILL_CATEGORIES: ISkillCategory[] = [
  {
    id: 'skill-frontend-frameworks',
    title: 'Frontend Frameworks',
    description: 'Frameworks I use daily to build modern, production-grade interfaces.',
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
    title: 'Languages & Styling',
    description: 'Core languages and styling tools behind every interface I build.',
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
    title: 'Animation & Motion',
    description: 'Tools for building smooth, purposeful motion across web and mobile.',
    skills: [
      { name: 'GSAP', level: 'expert', yearsOfExperience: 4 },
      { name: 'Motion (Framer Motion)', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Lottie', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'CSS Animations', level: 'advanced', yearsOfExperience: 5 },
    ],
  },
  {
    id: 'skill-tooling-workflow',
    title: 'Tooling & Workflow',
    description: 'The tooling that keeps development fast, consistent, and collaborative.',
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
    title: 'Backend & Data',
    description: 'Enough backend fluency to design APIs and data models alongside the UI.',
    skills: [
      { name: 'Node.js', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Supabase', level: 'advanced', yearsOfExperience: 2 },
      { name: 'REST / GraphQL APIs', level: 'advanced', yearsOfExperience: 5 },
      { name: 'PostgreSQL', level: 'intermediate', yearsOfExperience: 3 },
    ],
  },
]
