import { ArrowUpRight, Download, Globe, Mail, X } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { ComponentType } from 'react'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import type { IProfile, ISocialLink } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { GridPattern } from '@/components/common/GridPattern'
import { MagneticButton } from '@/components/common/MagneticButton'
import { TextReveal } from '@/components/common/TextReveal'

export interface IHeroSectionProps {
  profile: IProfile
  locale: Locale
}

interface ISocialIconProps {
  className?: string
}

// lucide-react เวอร์ชันนี้ไม่มีไอคอนแบรนด์ GitHub/LinkedIn จึงทำ SVG มาร์คขั้นต่ำไว้ใช้เอง
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
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5} className={className} aria-hidden='true'>
      <circle cx='12' cy='12' r='10.5' />
      <path d='M4 9.2c3.4 1 8.9 1.2 15.6-1.1M2.8 15.2c5.6-2.2 12.4-2.6 17.7.3M9.4 3c2.9 4 5 9.9 5.3 17.6' />
    </svg>
  )
}

// map platform -> icon component เพื่อ render แถว social link ให้กระชับ
const SOCIAL_ICON_MAP: Record<ISocialLink['platform'], ComponentType<ISocialIconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: X,
  dribbble: DribbbleIcon,
  email: Mail,
  website: Globe,
}

// แบ่งข้อความ headline ออกเป็นสองท่อนคร่าวๆ ให้ครึ่งหลังใช้ .text-gradient
// ทำแบบ deterministic (แบ่งกลางประโยคตามจำนวนคำ) เพื่อไม่ผูกกับเนื้อหาภาษาใดภาษาหนึ่งโดยเฉพาะ
function splitHeadlineForHighlight(headline: string): { lead: string, highlight: string } {
  const words = headline.trim().split(/\s+/)
  const highlightStartIndex = Math.ceil(words.length / 2)

  return {
    lead: words.slice(0, highlightStartIndex).join(' '),
    highlight: words.slice(highlightStartIndex).join(' '),
  }
}

export async function HeroSection({ profile, locale }: IHeroSectionProps) {
  const translate = await getTranslations('home')
  const translateCommon = await getTranslations('common')

  const headlineText = getLocalizedText(profile.headline, locale)
  const { lead: headlineLead, highlight: headlineHighlight } = splitHeadlineForHighlight(headlineText)
  const emailSocial = profile.socials.find((social) => social.platform === 'email')

  return (
    <section className='relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden'>
      {/* พื้นหลัง: ตารางจางๆ + แสง accent เบลอ ไม่รับ pointer event */}
      <GridPattern className='opacity-60' />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-24 -right-16 size-96 rounded-full bg-accent-2/20 blur-3xl'
      />

      <div className='relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8'>
        <Badge variant={profile.available ? 'accent' : 'muted'} size='md' className='gap-2'>
          {/* จุดกะพริบใช้ Tailwind animate-pulse (opacity) ซึ่งถูกปิดอัตโนมัติเมื่อผู้ใช้เปิด reduced motion ผ่านกฎ global ใน globals.css */}
          <span
            className={cn(
              'size-2 rounded-full',
              profile.available ? 'animate-pulse bg-emerald-500 dark:bg-emerald-400' : 'bg-subtle-foreground',
            )}
            aria-hidden='true'
          />
          {profile.available ? translateCommon('availableForWork') : translateCommon('notAvailable')}
        </Badge>

        <p className='text-sm font-medium text-muted-foreground sm:text-base'>{translate('heroGreeting')}</p>

        <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
          <TextReveal as='span' text={headlineLead} trigger='mount' className='inline' />{' '}
          {headlineHighlight && (
            <TextReveal
              as='span'
              text={headlineHighlight}
              trigger='mount'
              delay={0.15}
              className='inline text-gradient'
            />
          )}
        </h1>

        <p className='max-w-2xl text-base text-muted-foreground sm:text-lg'>{translate('heroIntro')}</p>

        <div className='mt-2 flex flex-col items-center gap-3 sm:flex-row'>
          <MagneticButton>
            <Link href='/projects' className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              {translate('ctaProjects')}
              <ArrowUpRight className='size-4' aria-hidden='true' />
            </Link>
          </MagneticButton>
          {emailSocial && (
            <MagneticButton>
              <a href={emailSocial.url} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                {translate('ctaContact')}
              </a>
            </MagneticButton>
          )}
        </div>

        <div className='mt-4 flex flex-col items-center gap-4'>
          <div className='flex items-center gap-2'>
            {profile.socials.map((social) => {
              const SocialIcon = SOCIAL_ICON_MAP[social.platform]

              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.platform === 'email' ? undefined : '_blank'}
                  rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className='flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground'
                >
                  <SocialIcon className='size-4' />
                </a>
              )
            })}
          </div>

          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
            >
              <Download className='size-4' aria-hidden='true' />
              {translateCommon('downloadResume')}
            </a>
          )}
        </div>
      </div>

      {/* คำชวนเลื่อนดูต่อ — ลูกศรขยับด้วย Tailwind animate-bounce (transform) ซ่อนบนจอเตี้ยกันชนกับเนื้อหา */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 [@media(max-height:640px)]:hidden sm:flex'
      >
        <span className='text-xs font-medium tracking-wide text-subtle-foreground'>
          {translateCommon('scrollToExplore')}
        </span>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={1.5}
          className='size-4 animate-bounce text-subtle-foreground'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m6 9 6 6 6-6' />
        </svg>
      </div>
    </section>
  )
}
