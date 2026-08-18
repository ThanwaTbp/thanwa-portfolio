import type { IExperience } from '@/types/portfolio'

/**
 * ประวัติการทำงาน — เรียงจากล่าสุดไปเก่าสุด (รายการแรกคือปัจจุบัน)
 * เป็นข้อมูลตัวอย่างที่ให้เจ้าของเว็บมาแทนที่ทีหลัง
 */
export const EXPERIENCES: IExperience[] = [
  {
    id: 'exp-shift-studio',
    company: 'Shift Studio',
    position: {
      en: 'Senior Frontend Developer',
      th: 'Senior Frontend Developer',
    },
    employmentType: 'full-time',
    location: {
      en: 'Bangkok, Thailand (Hybrid)',
      th: 'กรุงเทพฯ ประเทศไทย (ไฮบริด)',
    },
    startDate: '2023-06',
    endDate: null,
    description: {
      en: 'Leading frontend architecture for client projects ranging from e-commerce platforms to internal tooling, while mentoring a team of 4 junior developers.',
      th: 'ดูแลสถาปัตยกรรม Frontend ให้กับโปรเจกต์ลูกค้าตั้งแต่แพลตฟอร์มอีคอมเมิร์ซไปจนถึงเครื่องมือภายในองค์กร พร้อมเป็นพี่เลี้ยงให้ทีมนักพัฒนาระดับจูเนียร์ 4 คน',
    },
    achievements: [
      {
        en: 'Established a shared component library used across 6 client projects.',
        th: 'วางระบบคลัง component กลางที่ถูกนำไปใช้ในโปรเจกต์ลูกค้ากว่า 6 โปรเจกต์',
      },
      {
        en: 'Reduced average build time by 35% by migrating to Turbopack.',
        th: 'ลดเวลา build เฉลี่ยลง 35% ด้วยการย้ายไปใช้ Turbopack',
      },
      {
        en: 'Introduced code review guidelines that cut production bugs by 25%.',
        th: 'วางแนวทาง code review ที่ช่วยลดบั๊กบน production ลง 25%',
      },
      {
        en: 'Mentored 4 junior developers, 2 of whom were promoted within a year.',
        th: 'เป็นพี่เลี้ยงให้นักพัฒนาจูเนียร์ 4 คน โดย 2 คนได้เลื่อนตำแหน่งภายในหนึ่งปี',
      },
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Supabase'],
    companyUrl: 'https://shiftstudio.example.com',
  },
  {
    id: 'exp-lighthouse-labs',
    company: 'Lighthouse Labs',
    position: {
      en: 'Frontend Developer',
      th: 'Frontend Developer',
    },
    employmentType: 'full-time',
    location: {
      en: 'Bangkok, Thailand',
      th: 'กรุงเทพฯ ประเทศไทย',
    },
    startDate: '2021-08',
    endDate: '2023-05',
    description: {
      en: 'Built and maintained customer-facing web apps for fintech and logistics clients, working closely with designers and backend engineers in an agile team.',
      th: 'พัฒนาและดูแลเว็บแอปสำหรับผู้ใช้งานจริงให้ลูกค้าฝั่งฟินเทคและโลจิสติกส์ ทำงานร่วมกับทีมดีไซน์และแบ็กเอนด์แบบ agile',
    },
    achievements: [
      {
        en: 'Delivered 8 production releases on schedule across 2 major clients.',
        th: 'ส่งมอบงานขึ้น production ตรงเวลา 8 ครั้ง ให้ลูกค้าหลัก 2 ราย',
      },
      {
        en: 'Migrated a legacy jQuery app to Vue 3, improving load speed by 60%.',
        th: 'ย้ายแอปเก่าที่ใช้ jQuery มาเป็น Vue 3 ทำให้โหลดเร็วขึ้น 60%',
      },
      {
        en: 'Set up CI/CD pipelines that cut deployment time from 40 to 8 minutes.',
        th: 'วางระบบ CI/CD ที่ลดเวลา deploy จาก 40 นาที เหลือ 8 นาที',
      },
    ],
    techStack: ['Vue.js', 'Nuxt', 'JavaScript', 'SCSS', 'REST API'],
    companyUrl: 'https://lighthouselabs.example.com',
  },
  {
    id: 'exp-freelance',
    company: 'Freelance',
    position: {
      en: 'Freelance Frontend Developer',
      th: 'Freelance Frontend Developer',
    },
    employmentType: 'freelance',
    location: {
      en: 'Remote',
      th: 'ทำงานทางไกล',
    },
    startDate: '2020-03',
    endDate: '2021-07',
    description: {
      en: 'Worked independently with small businesses and startups to design and build marketing sites, landing pages, and simple web apps.',
      th: 'ทำงานอิสระร่วมกับธุรกิจขนาดเล็กและสตาร์ทอัพในการออกแบบและสร้างเว็บการตลาด แลนดิ้งเพจ และเว็บแอปขนาดเล็ก',
    },
    achievements: [
      {
        en: 'Completed 12 client projects with a 100% on-time delivery rate.',
        th: 'ทำโปรเจกต์ลูกค้าสำเร็จ 12 โปรเจกต์ ส่งมอบตรงเวลา 100%',
      },
      {
        en: 'Built a landing page template kit resold to 50+ small businesses.',
        th: 'สร้างชุด template แลนดิ้งเพจที่ขายต่อให้ธุรกิจขนาดเล็กกว่า 50 ราย',
      },
      {
        en: 'Grew a personal client network entirely through referrals.',
        th: 'ขยายเครือข่ายลูกค้าส่วนตัวผ่านการบอกต่อทั้งหมด',
      },
    ],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'WordPress'],
  },
  {
    id: 'exp-pixel-forge',
    company: 'Pixel Forge Agency',
    position: {
      en: 'Junior Web Developer',
      th: 'Junior Web Developer',
    },
    employmentType: 'internship',
    location: {
      en: 'Bangkok, Thailand',
      th: 'กรุงเทพฯ ประเทศไทย',
    },
    startDate: '2019-06',
    endDate: '2020-02',
    description: {
      en: 'Supported the agency team in building and maintaining WordPress and static websites for local business clients while learning modern JavaScript tooling.',
      th: 'สนับสนุนทีมเอเจนซี่ในการสร้างและดูแลเว็บไซต์ WordPress และเว็บสถิตให้ลูกค้าธุรกิจในพื้นที่ พร้อมเรียนรู้เครื่องมือ JavaScript สมัยใหม่ไปด้วย',
    },
    achievements: [
      {
        en: 'Delivered 15+ small business websites within the internship period.',
        th: 'ส่งมอบเว็บไซต์ธุรกิจขนาดเล็กกว่า 15 เว็บ ในช่วงฝึกงาน',
      },
      {
        en: 'Automated repetitive deployment tasks, saving 3 hours per release.',
        th: 'สร้างระบบอัตโนมัติสำหรับงาน deploy ที่ทำซ้ำๆ ช่วยประหยัดเวลา 3 ชั่วโมงต่อการปล่อยงานหนึ่งครั้ง',
      },
      {
        en: 'Learned Git workflows and code review practices from senior developers.',
        th: 'เรียนรู้ workflow การใช้ Git และวิธี code review จากนักพัฒนาระดับซีเนียร์',
      },
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'WordPress'],
    companyUrl: 'https://pixelforge.example.com',
  },
]
