import type { IEducation } from '@/types/portfolio'

/**
 * ประวัติการศึกษาและคอร์สเรียน — เรียงจากล่าสุดไปเก่าสุด
 * เป็นข้อมูลตัวอย่างที่ให้เจ้าของเว็บมาแทนที่ทีหลัง
 */
export const EDUCATIONS: IEducation[] = [
  {
    id: 'edu-frontend-masters-advanced',
    institution: 'Frontend Masters',
    degree: 'Certificate',
    field: 'Advanced React & Performance Patterns',
    startDate: '2022-01',
    endDate: '2022-03',
    description: 'A focused course on advanced rendering patterns, React Server Components, and web performance profiling.',
  },
  {
    id: 'edu-generation-bootcamp',
    institution: 'Generation Thailand',
    degree: 'Bootcamp Certificate',
    field: 'Full-Stack Web Development',
    startDate: '2019-06',
    endDate: '2019-09',
    grade: 'Top 5 of cohort',
    description: 'An intensive 12-week bootcamp covering JavaScript fundamentals, React, Node.js, and agile teamwork.',
    activities: [
      'Led a team of 4 to build a capstone project presented to industry mentors.',
    ],
  },
  {
    id: 'edu-kasetsart-university',
    institution: 'Kasetsart University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2015-06',
    endDate: '2019-05',
    grade: '3.42 / 4.00',
    description: 'Focused on software engineering, human-computer interaction, and web technologies.',
    activities: [
      'President of the Computer Science student club for 1 year.',
      'Won 2nd place in a university-wide hackathon.',
    ],
  },
]
