import type { IProject } from '@/types/portfolio'

/**
 * รายการโปรเจกต์ทั้งหมด — เป็นข้อมูลตัวอย่างที่สมจริง ให้เจ้าของเว็บมาแทนที่ทีหลัง
 * coverImage เว้นว่างไว้ทุกอันเพราะยังไม่มีไฟล์รูปจริง (UI จะ fallback เป็น placeholder เอง)
 */
export const PROJECTS: IProject[] = [
  {
    slug: 'nova-commerce-platform',
    title: 'Nova Commerce Platform',
    summary: {
      en: 'A headless e-commerce storefront built for speed and conversion.',
      th: 'หน้าร้านอีคอมเมิร์ซแบบ headless ที่เน้นความเร็วและอัตราการซื้อ',
    },
    description: {
      en: 'Nova is a headless storefront for a mid-size fashion retailer, built on Next.js App Router with a custom checkout flow, real-time inventory, and personalized recommendations. The project involved close collaboration with the design and backend teams to hit sub-second page loads on mobile networks.',
      th: 'Nova เป็นหน้าร้านแบบ headless ให้กับร้านแฟชั่นขนาดกลาง สร้างด้วย Next.js App Router พร้อมระบบชำระเงินที่ออกแบบเอง สต็อกสินค้าแบบเรียลไทม์ และระบบแนะนำสินค้าเฉพาะบุคคล ทำงานร่วมกับทีมดีไซน์และทีมแบ็กเอนด์อย่างใกล้ชิดเพื่อให้โหลดหน้าได้ในเวลาต่ำกว่า 1 วินาทีบนเครือข่ายมือถือ',
    },
    category: 'web',
    role: {
      en: 'Lead Frontend Developer',
      th: 'หัวหน้าทีม Frontend Developer',
    },
    year: 2025,
    featured: true,
    coverImage: undefined,
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
    highlights: [
      {
        en: 'Reduced Largest Contentful Paint from 3.8s to 1.1s through image optimization and streaming SSR.',
        th: 'ลดค่า Largest Contentful Paint จาก 3.8 วินาที เหลือ 1.1 วินาที ด้วยการปรับรูปภาพและ streaming SSR',
      },
      {
        en: 'Built a reusable checkout module now shared across 3 storefronts.',
        th: 'สร้างโมดูลชำระเงินแบบใช้ซ้ำได้ ปัจจุบันถูกนำไปใช้ในหน้าร้านอื่นอีก 3 แห่ง',
      },
      {
        en: 'Implemented real-time inventory sync using Supabase Realtime.',
        th: 'ทำระบบซิงก์สต็อกสินค้าแบบเรียลไทม์ด้วย Supabase Realtime',
      },
      {
        en: 'Set up automated visual regression testing to catch UI bugs before release.',
        th: 'วางระบบทดสอบ visual regression อัตโนมัติเพื่อดักบั๊กหน้าตาก่อนปล่อยจริง',
      },
    ],
    metrics: [
      { label: { en: 'Conversion rate lift', th: 'อัตราการซื้อที่เพิ่มขึ้น' }, value: '+24%' },
      { label: { en: 'Page load time', th: 'เวลาโหลดหน้า' }, value: '1.1s' },
    ],
    links: [
      {
        label: { en: 'Live site', th: 'ดูเว็บไซต์จริง' },
        url: 'https://nova-commerce.example.com',
        type: 'live',
      },
      {
        label: { en: 'Source code', th: 'ซอร์สโค้ด' },
        url: 'https://github.com/thanwadev/nova-commerce',
        type: 'repo',
      },
    ],
  },
  {
    slug: 'fitpulse-mobile-app',
    title: 'FitPulse',
    summary: {
      en: 'A cross-platform fitness tracking app with social challenges.',
      th: 'แอปติดตามการออกกำลังกายข้ามแพลตฟอร์ม พร้อมระบบชวนเพื่อนแข่งกัน',
    },
    description: {
      en: 'FitPulse helps users track workouts, set weekly goals, and compete with friends through challenges. Built with React Native and Expo, it ships to both iOS and Android from a single codebase, with offline-first data sync so athletes can log workouts without a connection.',
      th: 'FitPulse ช่วยให้ผู้ใช้บันทึกการออกกำลังกาย ตั้งเป้าหมายรายสัปดาห์ และแข่งขันกับเพื่อนผ่านระบบชาเลนจ์ สร้างด้วย React Native และ Expo รองรับทั้ง iOS และ Android จากโค้ดชุดเดียว พร้อมระบบซิงก์ข้อมูลแบบ offline-first ให้บันทึกได้แม้ไม่มีสัญญาณ',
    },
    category: 'mobile',
    role: {
      en: 'Mobile Frontend Developer',
      th: 'Mobile Frontend Developer',
    },
    year: 2024,
    featured: true,
    coverImage: undefined,
    techStack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Supabase'],
    highlights: [
      {
        en: 'Designed an offline-first sync layer so logs never get lost without signal.',
        th: 'ออกแบบระบบซิงก์ข้อมูลแบบ offline-first ให้บันทึกไม่หายแม้ไม่มีสัญญาณ',
      },
      {
        en: 'Built a weekly challenge system that grew user retention by 18%.',
        th: 'สร้างระบบชาเลนจ์รายสัปดาห์ที่ช่วยเพิ่มอัตราการใช้งานต่อเนื่อง 18%',
      },
      {
        en: 'Integrated Apple Health and Google Fit for automatic activity import.',
        th: 'เชื่อมต่อ Apple Health และ Google Fit เพื่อดึงข้อมูลกิจกรรมอัตโนมัติ',
      },
    ],
    metrics: [
      { label: { en: 'Weekly retention', th: 'อัตราการกลับมาใช้รายสัปดาห์' }, value: '+18%' },
      { label: { en: 'App store rating', th: 'คะแนนใน App Store' }, value: '4.7/5' },
    ],
    links: [
      {
        label: { en: 'App Store', th: 'App Store' },
        url: 'https://apps.apple.com/app/fitpulse',
        type: 'live',
      },
    ],
  },
  {
    slug: 'aurora-design-system',
    title: 'Aurora Design System',
    summary: {
      en: 'A shared component library and design system for a fintech product suite.',
      th: 'ระบบดีไซน์และคลัง component กลางสำหรับผลิตภัณฑ์ฟินเทคหลายตัว',
    },
    description: {
      en: 'Aurora unifies the UI across four internal fintech products. It pairs Figma component libraries with a React + Storybook implementation, including tokens for color, spacing, and typography that sync automatically between design and code.',
      th: 'Aurora รวมหน้าตา UI ของผลิตภัณฑ์ฟินเทคภายในองค์กร 4 ตัวให้เป็นมาตรฐานเดียวกัน โดยจับคู่คลัง component ใน Figma เข้ากับการ implement ด้วย React และ Storybook รวมถึงระบบ token สี ระยะห่าง และตัวอักษรที่ซิงก์กันระหว่างดีไซน์กับโค้ดโดยอัตโนมัติ',
    },
    category: 'design',
    role: {
      en: 'Design System Engineer',
      th: 'Design System Engineer',
    },
    year: 2023,
    featured: true,
    coverImage: undefined,
    techStack: ['React', 'TypeScript', 'Storybook', 'Figma', 'Tailwind CSS'],
    highlights: [
      {
        en: 'Cut new feature UI build time by 40% across four product teams.',
        th: 'ลดเวลาสร้าง UI ฟีเจอร์ใหม่ลง 40% ในทีมผลิตภัณฑ์ทั้งสี่ทีม',
      },
      {
        en: 'Established design tokens that sync automatically from Figma to code.',
        th: 'วางระบบ design token ที่ซิงก์จาก Figma มาที่โค้ดได้อัตโนมัติ',
      },
      {
        en: 'Wrote accessibility guidelines adopted as the company standard.',
        th: 'เขียนแนวทาง accessibility ที่ถูกนำไปใช้เป็นมาตรฐานขององค์กร',
      },
      {
        en: 'Onboarded and trained 12 engineers on the new component library.',
        th: 'อบรมและ onboard วิศวกร 12 คนให้ใช้คลัง component ใหม่',
      },
    ],
    links: [
      {
        label: { en: 'Case study', th: 'อ่าน Case Study' },
        url: 'https://thanwa.dev/case-studies/aurora',
        type: 'case-study',
      },
    ],
  },
  {
    slug: 'portfolio-motion-lab',
    title: 'Motion Lab',
    summary: {
      en: 'An experimental playground for GSAP-driven scroll and interaction animations.',
      th: 'เว็บทดลองลูกเล่นแอนิเมชันจาก GSAP ที่ผูกกับการเลื่อนและโต้ตอบของผู้ใช้',
    },
    description: {
      en: 'Motion Lab is a personal side project exploring scroll-triggered storytelling, WebGL shaders, and cursor-based interactions. It became a reference site shared within the local frontend community and led to several freelance inquiries.',
      th: 'Motion Lab เป็นโปรเจกต์ส่วนตัวที่ทดลองการเล่าเรื่องผ่านการเลื่อนหน้าจอ WebGL shader และการโต้ตอบตามตำแหน่งเมาส์ กลายเป็นเว็บอ้างอิงที่ถูกแชร์ในกลุ่ม frontend ไทย และนำมาซึ่งงานฟรีแลนซ์หลายชิ้น',
    },
    category: 'other',
    role: {
      en: 'Creative Developer',
      th: 'Creative Developer',
    },
    year: 2022,
    featured: false,
    coverImage: undefined,
    techStack: ['GSAP', 'Three.js', 'Vite', 'TypeScript'],
    highlights: [
      {
        en: 'Built 10+ scroll-triggered animation experiments with GSAP ScrollTrigger.',
        th: 'สร้างการทดลองแอนิเมชันที่ผูกกับการเลื่อนหน้าจอกว่า 10 แบบด้วย GSAP ScrollTrigger',
      },
      {
        en: 'Optimized WebGL scenes to stay above 55fps on mid-range devices.',
        th: 'ปรับแต่งฉาก WebGL ให้รักษาเฟรมเรตกว่า 55fps บนอุปกรณ์ระดับกลาง',
      },
      {
        en: 'Shared as an open-source reference used by 200+ developers.',
        th: 'เผยแพร่เป็นโอเพนซอร์สอ้างอิงที่มีนักพัฒนานำไปใช้กว่า 200 คน',
      },
    ],
    links: [
      {
        label: { en: 'Live demo', th: 'ดูตัวอย่าง' },
        url: 'https://motionlab.thanwa.dev',
        type: 'live',
      },
      {
        label: { en: 'Source code', th: 'ซอร์สโค้ด' },
        url: 'https://github.com/thanwadev/motion-lab',
        type: 'repo',
      },
    ],
  },
  {
    slug: 'cloudnest-dashboard',
    title: 'CloudNest Admin Dashboard',
    summary: {
      en: 'An analytics dashboard for a SaaS cloud storage product.',
      th: 'แดชบอร์ดวิเคราะห์ข้อมูลสำหรับผลิตภัณฑ์ SaaS ด้านคลาวด์สตอเรจ',
    },
    description: {
      en: 'CloudNest needed a dashboard for admins to monitor storage usage, billing, and team activity across thousands of workspaces. Built with Nuxt and Pinia, the dashboard renders large datasets efficiently with virtualization and progressive loading.',
      th: 'CloudNest ต้องการแดชบอร์ดให้แอดมินติดตามการใช้พื้นที่จัดเก็บ ค่าใช้จ่าย และกิจกรรมของทีมงานในหลายพันเวิร์กสเปซ สร้างด้วย Nuxt และ Pinia โดยใช้เทคนิค virtualization และการโหลดข้อมูลแบบค่อยเป็นค่อยไปเพื่อแสดงชุดข้อมูลขนาดใหญ่ได้อย่างมีประสิทธิภาพ',
    },
    category: 'web',
    role: {
      en: 'Frontend Developer',
      th: 'Frontend Developer',
    },
    year: 2023,
    featured: false,
    coverImage: undefined,
    techStack: ['Nuxt', 'Vue.js', 'TypeScript', 'Pinia', 'Tailwind CSS'],
    highlights: [
      {
        en: 'Rendered tables of 50,000+ rows smoothly with virtual scrolling.',
        th: 'แสดงตารางข้อมูลกว่า 50,000 แถวได้ลื่นไหลด้วยเทคนิค virtual scrolling',
      },
      {
        en: 'Rebuilt the billing module, cutting support tickets by 30%.',
        th: 'สร้างโมดูลระบบเรียกเก็บเงินใหม่ ช่วยลดตั๋วซัพพอร์ตลง 30%',
      },
      {
        en: 'Added role-based access control views for enterprise admins.',
        th: 'เพิ่มหน้าจอควบคุมสิทธิ์ตามบทบาทสำหรับแอดมินระดับองค์กร',
      },
    ],
    metrics: [{ label: { en: 'Support tickets', th: 'ตั๋วซัพพอร์ตที่ลดลง' }, value: '-30%' }],
  },
  {
    slug: 'rideshare-companion',
    title: 'RideShare Companion',
    summary: {
      en: 'A driver-facing companion app for a regional ride-hailing service.',
      th: 'แอปสำหรับคนขับของบริการเรียกรถระดับภูมิภาค',
    },
    description: {
      en: 'RideShare Companion gives drivers real-time trip requests, earnings summaries, and navigation shortcuts. This was my first production mobile project, built with React Native, focused on reliability on low-end Android devices common among drivers.',
      th: 'RideShare Companion แสดงคำขอเดินทางแบบเรียลไทม์ สรุปรายได้ และทางลัดนำทางให้คนขับ เป็นโปรเจกต์มือถือที่ขึ้นระบบจริงชิ้นแรกของผม สร้างด้วย React Native โดยเน้นความเสถียรบนมือถือ Android รุ่นล่างที่คนขับส่วนใหญ่ใช้งาน',
    },
    category: 'mobile',
    role: {
      en: 'Frontend Developer',
      th: 'Frontend Developer',
    },
    year: 2021,
    featured: false,
    coverImage: undefined,
    techStack: ['React Native', 'JavaScript', 'Redux', 'Google Maps API'],
    highlights: [
      {
        en: 'Optimized app to run smoothly on devices with 2GB RAM or less.',
        th: 'ปรับแต่งแอปให้ทำงานลื่นบนอุปกรณ์ที่มีแรม 2GB หรือต่ำกว่า',
      },
      {
        en: 'Built a low-bandwidth mode that cut data usage by 45%.',
        th: 'สร้างโหมดประหยัดเน็ตที่ช่วยลดการใช้ดาต้าลง 45%',
      },
      {
        en: 'Integrated real-time navigation with turn-by-turn voice guidance.',
        th: 'เชื่อมต่อระบบนำทางแบบเรียลไทม์พร้อมเสียงบอกทางแบบทีละเลี้ยว',
      },
    ],
  },
]
