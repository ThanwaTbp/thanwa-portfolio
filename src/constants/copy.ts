import type { ProjectCategory, SkillLevel } from '@/types/portfolio'
import type { TechCategory } from '@/types/tech-stack'

export const COPY = {
  common: {
    siteName: 'Thanwa',
    tagline: 'Frontend developer crafting clean, thoughtful interfaces',
    viewAll: 'View all',
    readMore: 'Read more',
    loading: 'Loading...',
    present: 'Present',
    downloadResume: 'Download resume',
    getInTouch: 'Get in touch',
    login: 'Login',
    availableForWork: 'Available for work',
    notAvailable: 'Not available right now',
    scrollToExplore: 'Scroll to explore',
  },
  nav: {
    home: 'Home',
    about: 'About',
    work: 'Work',
    projects: 'Projects',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    login: 'Login',
    logout: 'Log out',
    admin: 'Admin',
    menu: 'Menu',
    closeMenu: 'Close menu',
    toggleTheme: 'Toggle theme',
    lightMode: 'Switch to light mode',
    darkMode: 'Switch to dark mode',
  },
  home: {
    heroGreeting: 'Portfolio · 2026',
    heroIntro:
      'I translate product intent into refined, production-ready interfaces with a strong focus on motion, responsiveness, and implementation detail.',
    heroRoles: ['Frontend Engineer', 'UI Engineer', 'Creative Developer', 'Interface Designer'],
    ctaProjects: 'See my work',
    featuredTitle: 'Featured projects',
    featuredDescription: "A selection of work I'm proud to share.",
    aboutTitle: 'About me',
    aboutHeadline: 'Frontend craft with product-minded execution',
    aboutDescription:
      'A quick look at how I approach design implementation, performance, and collaboration.',
    aboutSupport:
      'This portfolio now prioritizes clearer proof of craft, stronger motion, and cleaner storytelling over template-style filler blocks.',
    latestExperienceTitle: 'Recent experience',
    skillsPreviewTitle: 'Skills & tools',
    skillsPreviewDescription:
      'The stacks and systems I reach for when the interface quality really matters.',
  },
  projects: {
    title: 'Projects',
    description: "A collection of products, experiments, and case studies I've worked on.",
    empty: {
      title: 'No projects match your filters',
      description: 'Try adjusting or clearing the filters to see more work.',
    },
    categories: {
      web: 'Web',
      mobile: 'Mobile',
      design: 'Design',
      other: 'Other',
    } satisfies Record<ProjectCategory, string>,
  },
  projectDetail: {
    overview: 'Overview',
    role: 'Role',
    year: 'Year',
    techStack: 'Tech stack',
    highlights: 'Highlights',
    nextProject: 'Next project',
    previousProject: 'Previous project',
    backToProjects: 'Back to projects',
  },
  experience: {
    title: 'Experience',
    description: "Where I've worked and what I've contributed along the way.",
    achievements: 'Achievements',
    techStack: 'Tech stack',
    empty: {
      title: 'No experience listed yet',
      description: 'Check back soon — this section is being updated.',
      action: 'Back to home',
    },
    employmentType: {
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      freelance: 'Freelance',
      contract: 'Contract',
      internship: 'Internship',
    },
  },
  education: {
    title: 'Education',
    description: 'My academic background and continued learning.',
    grade: 'Grade',
    activities: 'Activities',
    empty: {
      title: 'No education listed yet',
      description: 'Check back soon — this section is being updated.',
      action: 'Back to home',
    },
  },
  skills: {
    title: 'Skills',
    description: 'Tools and technologies I use to bring ideas to life.',
    empty: {
      title: 'No skills listed yet',
      description: 'Check back soon — this section is being updated.',
      action: 'Back to home',
    },
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
    } satisfies Record<SkillLevel, string>,
  },
  techStack: {
    placeholder: 'Select technologies',
    search: 'Search tech stack',
    empty: 'No matching technologies',
    categories: {
      language: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile & desktop',
      database: 'Data',
      cloud: 'Cloud',
      tooling: 'Tooling',
      design: 'Design',
      animation: 'Motion',
      testing: 'Testing',
      cms: 'CMS',
      payment: 'Payments',
    } satisfies Record<TechCategory, string>,
  },
  footer: {
    allRightsReserved: 'All rights reserved.',
    quickLinks: 'Quick links',
    connect: 'Connect',
    statusLabel: 'Available for thoughtful frontend work',
    adminAccess: 'Admin access',
    contact: 'Contact',
  },
  auth: {
    title: 'Admin sign in',
    description: 'Sign in with the owner account to add, edit, or remove portfolio content.',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submit: 'Sign in',
    submitting: 'Signing in...',
    helper: 'No public sign-up. Only the configured owner account can access the admin panel.',
    invalidCredentials: 'Invalid email or password.',
    networkError: 'Unable to sign in right now. Please try again.',
    setupTitle: 'Admin credentials not configured',
    setupDescription:
      'Set ADMIN_EMAIL, ADMIN_PASSWORD, and AUTH_SECRET in your environment before signing in.',
  },
  admin: {
    title: 'Portfolio admin',
    description: 'Manage portfolio content after signing in.',
    eyebrow: 'Owner workspace',
    logout: 'Log out',
    gateTitle: 'Admin access required',
    gateDescription: 'Sign in with the owner account to manage portfolio content.',
    gateAction: 'Open sign in',
    tabs: {
      projects: 'Projects',
      profile: 'Profile',
    },
    actions: {
      edit: 'Edit',
      save: 'Save changes',
      cancel: 'Cancel',
    },
    projects: {
      listTitle: 'All projects',
      createTitle: 'Add project',
      editTitle: 'Edit project',
      slug: 'Slug',
      title: 'Title',
      year: 'Year',
      summary: 'Summary',
      techStack: 'Tech stack',
      featured: 'Featured project',
      addAction: 'Add project',
    },
    profile: {
      title: 'Profile copy',
      name: 'Name',
      headline: 'Headline',
      bio: 'Bio',
    },
  },
  error: {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    retry: 'Try again',
    backHome: 'Back to home',
  },
  notFound: {
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has been moved.",
    backHome: 'Back to home',
  },
} as const

export function formatSignedInAs(email: string) {
  return `Signed in as ${email}`
}

export function formatPersistenceMode(mode: string) {
  return `Storage: ${mode}`
}

export function formatSelectedCount(count: number) {
  return count === 1 ? '1 selected' : `${count} selected`
}

export function formatYearsOfExperience(years: number) {
  return years === 1 ? '1 year of experience' : `${years} years of experience`
}
