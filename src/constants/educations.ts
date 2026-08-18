import type { IEducation } from '@/types/portfolio'

/**
 * ประวัติการศึกษาและคอร์สเรียน — เรียงจากล่าสุดไปเก่าสุด
 * เป็นข้อมูลตัวอย่างที่ให้เจ้าของเว็บมาแทนที่ทีหลัง
 */
export const EDUCATIONS: IEducation[] = [
  {
    id: 'edu-frontend-masters-advanced',
    institution: {
      en: 'Frontend Masters',
      th: 'Frontend Masters',
    },
    degree: {
      en: 'Certificate',
      th: 'ประกาศนียบัตร',
    },
    field: {
      en: 'Advanced React & Performance Patterns',
      th: 'React ขั้นสูงและเทคนิคการเพิ่มประสิทธิภาพ',
    },
    startDate: '2022-01',
    endDate: '2022-03',
    description: {
      en: 'A focused course on advanced rendering patterns, React Server Components, and web performance profiling.',
      th: 'คอร์สเจาะลึกเรื่องรูปแบบการ render ขั้นสูง React Server Components และการวิเคราะห์ประสิทธิภาพเว็บ',
    },
  },
  {
    id: 'edu-generation-bootcamp',
    institution: {
      en: 'Generation Thailand',
      th: 'Generation Thailand',
    },
    degree: {
      en: 'Bootcamp Certificate',
      th: 'ประกาศนียบัตรบูตแคมป์',
    },
    field: {
      en: 'Full-Stack Web Development',
      th: 'การพัฒนาเว็บแบบฟูลสแตก',
    },
    startDate: '2019-06',
    endDate: '2019-09',
    grade: 'Top 5 of cohort',
    description: {
      en: 'An intensive 12-week bootcamp covering JavaScript fundamentals, React, Node.js, and agile teamwork.',
      th: 'บูตแคมป์เข้มข้น 12 สัปดาห์ ครอบคลุมพื้นฐาน JavaScript, React, Node.js และการทำงานเป็นทีมแบบ agile',
    },
    activities: [
      {
        en: 'Led a team of 4 to build a capstone project presented to industry mentors.',
        th: 'เป็นหัวหน้าทีม 4 คน สร้างโปรเจกต์จบคอร์สนำเสนอต่อพี่เลี้ยงจากอุตสาหกรรม',
      },
    ],
  },
  {
    id: 'edu-kasetsart-university',
    institution: {
      en: 'Kasetsart University',
      th: 'มหาวิทยาลัยเกษตรศาสตร์',
    },
    degree: {
      en: 'Bachelor of Science',
      th: 'ปริญญาตรีวิทยาศาสตรบัณฑิต',
    },
    field: {
      en: 'Computer Science',
      th: 'วิทยาการคอมพิวเตอร์',
    },
    startDate: '2015-06',
    endDate: '2019-05',
    grade: '3.42 / 4.00',
    description: {
      en: 'Focused on software engineering, human-computer interaction, and web technologies.',
      th: 'เน้นด้านวิศวกรรมซอฟต์แวร์ ปฏิสัมพันธ์ระหว่างมนุษย์กับคอมพิวเตอร์ และเทคโนโลยีเว็บ',
    },
    activities: [
      {
        en: 'President of the Computer Science student club for 1 year.',
        th: 'ประธานชมรมนิสิตวิทยาการคอมพิวเตอร์เป็นเวลา 1 ปี',
      },
      {
        en: 'Won 2nd place in a university-wide hackathon.',
        th: 'ได้รางวัลรองชนะเลิศอันดับ 2 ในการแข่งขันแฮกกาธอนระดับมหาวิทยาลัย',
      },
    ],
  },
]
