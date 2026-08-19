import { ArrowDownRight, Globe, Mail, X } from 'lucide-react'
import Link from 'next/link'
import type { ComponentType } from 'react'

import type { IProfile, ISocialLink } from '@/types/portfolio'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { GridPattern } from '@/components/common/GridPattern'
import { MagneticButton } from '@/components/common/MagneticButton'
import { TechIcon } from '@/components/common/TechIcon'
import { TypewriterText } from '@/components/common/TypewriterText'
import { HeroCodePanel } from '@/features/home/ui/HeroCodePanel'
import { COPY } from '@/constants/copy'

export interface IHeroSectionProps {
  profile: IProfile
}

interface ISocialIconProps {
  className?: string
}

function GithubIcon({ className }: ISocialIconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden='true'>
      <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.08.78 2.17v3.22c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z' />
    </svg>
  )
}

function LinkedinIcon({ className }: ISocialIconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden='true'>
      <path d='M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.4 8.75h5.1V21H3.4V8.75Zm7.9 0h4.9v1.68h.07c.68-1.24 2.35-2.55 4.83-2.55 5.17 0 6.12 3.29 6.12 7.57V21h-5.1v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.19 1.44-2.19 2.96V21h-5.1V8.75Z' />
    </svg>
  )
}

function DribbbleIcon({ className }: ISocialIconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      className={className}
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='10.5' />
      <path d='M4 9.2c3.4 1 8.9 1.2 15.6-1.1M2.8 15.2c5.6-2.2 12.4-2.6 17.7.3M9.4 3c2.9 4 5 9.9 5.3 17.6' />
    </svg>
  )
}

const SOCIAL_ICON_MAP: Record<ISocialLink['platform'], ComponentType<ISocialIconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: X,
  dribbble: DribbbleIcon,
  email: Mail,
  website: Globe,
}

const HERO_STACK = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'] as const

export function HeroSection({ profile }: IHeroSectionProps) {
  const nameText = profile.name
  const roleText = profile.headline
  const locationText = profile.location
  const heroRoles = [...COPY.home.heroRoles]

  return (
    <section
      id='top'
      className='relative isolate overflow-hidden border-b border-border/80 bg-[radial-gradient(circle_at_top,rgba(122,92,255,0.15),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.12),transparent_30%)]'
    >
      <GridPattern className='opacity-40' />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -top-32 left-[15%] size-[28rem] rounded-full bg-accent/20 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-20 bottom-10 size-[24rem] rounded-full bg-accent-2/16 blur-3xl'
      />

      <div className='relative z-10 mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24'>
        <div className='flex flex-col items-start gap-6'>
          <Badge variant={profile.available ? 'accent' : 'muted'} size='md' className='gap-2'>
            <span
              className={cn(
                'size-2 rounded-full',
                profile.available
                  ? 'bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.14)]'
                  : 'bg-subtle-foreground',
              )}
              aria-hidden='true'
            />
            {profile.available ? COPY.common.availableForWork : COPY.common.notAvailable}
          </Badge>

          <div className='space-y-4'>
            <p className='text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground'>
              {COPY.home.heroGreeting}
            </p>

            <h1 className='font-display max-w-xl text-balance text-5xl font-semibold leading-[1.12] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.75rem]'>
              <span className='text-gradient'>{nameText}</span>
            </h1>

            <p className='min-h-[1.75em] text-xl font-medium tracking-tight text-foreground sm:text-2xl'>
              <TypewriterText texts={heroRoles} className='text-gradient' />
            </p>

            <p className='max-w-xl text-base leading-7 text-muted-foreground sm:text-lg'>
              {COPY.home.heroIntro}
            </p>
          </div>

          <MagneticButton>
            <Link href='/projects' className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              {COPY.home.ctaProjects}
              <ArrowDownRight className='size-4' aria-hidden='true' />
            </Link>
          </MagneticButton>

          <div className='flex flex-wrap gap-2 pt-1'>
            {HERO_STACK.map((tech) => (
              <span
                key={tech}
                className='inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/88 px-3 py-1.5 text-sm text-foreground shadow-sm shadow-black/5'
              >
                <TechIcon name={tech} />
                {tech}
              </span>
            ))}
          </div>

          <div className='flex flex-wrap items-center gap-2 pt-1'>
            {profile.socials.map((social) => {
              const SocialIcon = SOCIAL_ICON_MAP[social.platform]

              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.platform === 'email' ? undefined : '_blank'}
                  rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className='inline-flex size-10 items-center justify-center rounded-full border border-border/75 text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground'
                >
                  <SocialIcon className='size-4' />
                </a>
              )
            })}
          </div>
        </div>

        <HeroCodePanel
          name={nameText}
          role={roleText}
          location={locationText}
          stack={[...HERO_STACK]}
          available={profile.available}
        />
      </div>
    </section>
  )
}
