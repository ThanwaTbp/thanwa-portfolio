import type { IProject } from '@/types/portfolio'

/**
 * รายการโปรเจกต์ทั้งหมด — เป็นข้อมูลตัวอย่างที่สมจริง ให้เจ้าของเว็บมาแทนที่ทีหลัง
 * coverImage เว้นว่างไว้ทุกอันเพราะยังไม่มีไฟล์รูปจริง (UI จะ fallback เป็น placeholder เอง)
 */
export const PROJECTS: IProject[] = [
  {
    slug: 'nova-commerce-platform',
    title: 'Nova Commerce Platform',
    summary: 'A headless e-commerce storefront built for speed and conversion.',
    description: 'Nova is a headless storefront for a mid-size fashion retailer, built on Next.js App Router with a custom checkout flow, real-time inventory, and personalized recommendations. The project involved close collaboration with the design and backend teams to hit sub-second page loads on mobile networks.',
    category: 'web',
    role: 'Lead Frontend Developer',
    year: 2025,
    featured: true,
    coverImage: undefined,
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
    highlights: [
      'Reduced Largest Contentful Paint from 3.8s to 1.1s through image optimization and streaming SSR.',
      'Built a reusable checkout module now shared across 3 storefronts.',
      'Implemented real-time inventory sync using Supabase Realtime.',
      'Set up automated visual regression testing to catch UI bugs before release.',
    ],
    metrics: [
      { label: 'Conversion rate lift', value: '+24%' },
      { label: 'Page load time', value: '1.1s' },
    ],
    links: [
      {
        label: 'Live site',
        url: 'https://nova-commerce.example.com',
        type: 'live',
      },
      {
        label: 'Source code',
        url: 'https://github.com/thanwadev/nova-commerce',
        type: 'repo',
      },
    ],
  },
  {
    slug: 'fitpulse-mobile-app',
    title: 'FitPulse',
    summary: 'A cross-platform fitness tracking app with social challenges.',
    description: 'FitPulse helps users track workouts, set weekly goals, and compete with friends through challenges. Built with React Native and Expo, it ships to both iOS and Android from a single codebase, with offline-first data sync so athletes can log workouts without a connection.',
    category: 'mobile',
    role: 'Mobile Frontend Developer',
    year: 2024,
    featured: true,
    coverImage: undefined,
    techStack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Supabase'],
    highlights: [
      'Designed an offline-first sync layer so logs never get lost without signal.',
      'Built a weekly challenge system that grew user retention by 18%.',
      'Integrated Apple Health and Google Fit for automatic activity import.',
    ],
    metrics: [
      { label: 'Weekly retention', value: '+18%' },
      { label: 'App store rating', value: '4.7/5' },
    ],
    links: [
      {
        label: 'App Store',
        url: 'https://apps.apple.com/app/fitpulse',
        type: 'live',
      },
    ],
  },
  {
    slug: 'aurora-design-system',
    title: 'Aurora Design System',
    summary: 'A shared component library and design system for a fintech product suite.',
    description: 'Aurora unifies the UI across four internal fintech products. It pairs Figma component libraries with a React + Storybook implementation, including tokens for color, spacing, and typography that sync automatically between design and code.',
    category: 'design',
    role: 'Design System Engineer',
    year: 2023,
    featured: true,
    coverImage: undefined,
    techStack: ['React', 'TypeScript', 'Storybook', 'Figma', 'Tailwind CSS'],
    highlights: [
      'Cut new feature UI build time by 40% across four product teams.',
      'Established design tokens that sync automatically from Figma to code.',
      'Wrote accessibility guidelines adopted as the company standard.',
      'Onboarded and trained 12 engineers on the new component library.',
    ],
    links: [
      {
        label: 'Case study',
        url: 'https://thanwa.dev/case-studies/aurora',
        type: 'case-study',
      },
    ],
  },
  {
    slug: 'portfolio-motion-lab',
    title: 'Motion Lab',
    summary: 'An experimental playground for GSAP-driven scroll and interaction animations.',
    description: 'Motion Lab is a personal side project exploring scroll-triggered storytelling, WebGL shaders, and cursor-based interactions. It became a reference site shared within the local frontend community and led to several freelance inquiries.',
    category: 'other',
    role: 'Creative Developer',
    year: 2022,
    featured: false,
    coverImage: undefined,
    techStack: ['GSAP', 'Three.js', 'Vite', 'TypeScript'],
    highlights: [
      'Built 10+ scroll-triggered animation experiments with GSAP ScrollTrigger.',
      'Optimized WebGL scenes to stay above 55fps on mid-range devices.',
      'Shared as an open-source reference used by 200+ developers.',
    ],
    links: [
      {
        label: 'Live demo',
        url: 'https://motionlab.thanwa.dev',
        type: 'live',
      },
      {
        label: 'Source code',
        url: 'https://github.com/thanwadev/motion-lab',
        type: 'repo',
      },
    ],
  },
  {
    slug: 'cloudnest-dashboard',
    title: 'CloudNest Admin Dashboard',
    summary: 'An analytics dashboard for a SaaS cloud storage product.',
    description: 'CloudNest needed a dashboard for admins to monitor storage usage, billing, and team activity across thousands of workspaces. Built with Nuxt and Pinia, the dashboard renders large datasets efficiently with virtualization and progressive loading.',
    category: 'web',
    role: 'Frontend Developer',
    year: 2023,
    featured: false,
    coverImage: undefined,
    techStack: ['Nuxt', 'Vue.js', 'TypeScript', 'Pinia', 'Tailwind CSS'],
    highlights: [
      'Rendered tables of 50,000+ rows smoothly with virtual scrolling.',
      'Rebuilt the billing module, cutting support tickets by 30%.',
      'Added role-based access control views for enterprise admins.',
    ],
    metrics: [{ label: 'Support tickets', value: '-30%' }],
  },
  {
    slug: 'rideshare-companion',
    title: 'RideShare Companion',
    summary: 'A driver-facing companion app for a regional ride-hailing service.',
    description: 'RideShare Companion gives drivers real-time trip requests, earnings summaries, and navigation shortcuts. This was my first production mobile project, built with React Native, focused on reliability on low-end Android devices common among drivers.',
    category: 'mobile',
    role: 'Frontend Developer',
    year: 2021,
    featured: false,
    coverImage: undefined,
    techStack: ['React Native', 'JavaScript', 'Redux', 'Google Maps API'],
    highlights: [
      'Optimized app to run smoothly on devices with 2GB RAM or less.',
      'Built a low-bandwidth mode that cut data usage by 45%.',
      'Integrated real-time navigation with turn-by-turn voice guidance.',
    ],
  },
]
