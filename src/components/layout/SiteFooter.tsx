import type { ComponentType } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import Link from 'next/link'

import FooterAdminAction from '@/components/layout/FooterAdminAction'
import { COPY } from '@/constants/copy'
import { getProfile } from '@/services/portfolio-service'

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

export default async function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const profile = await getProfile()

  const navLinks = [
    { href: '/projects', label: COPY.nav.projects },
    { href: '/experience', label: COPY.nav.experience },
    { href: '/skills', label: COPY.nav.skills },
  ]

  const socialLinks: Record<string, ComponentType<ISocialIconProps>> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    email: Mail,
  }

  const visibleSocials = profile.socials.filter((socialLink) => socialLinks[socialLink.platform])
  const emailSocial = visibleSocials.find((socialLink) => socialLink.platform === 'email')

  return (
    <footer className='relative mt-auto shrink-0 border-t border-border/70 bg-surface-muted'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-accent),var(--color-accent-2),transparent)]'
      />

      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
          <div className='max-w-md space-y-4'>
            <Link
              href='/'
              className='inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-foreground'
            >
              <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-sm text-accent'>
                T
              </span>
              {COPY.common.siteName}
            </Link>
            <p className='text-sm leading-7 text-muted-foreground'>{COPY.common.tagline}</p>
            {profile.available ? (
              <p className='inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3 py-1.5 text-xs font-medium text-accent'>
                <span className='size-1.5 rounded-full bg-accent' aria-hidden='true' />
                {COPY.footer.statusLabel}
              </p>
            ) : null}
          </div>

          <div className='grid gap-10 sm:grid-cols-2 sm:gap-16 lg:gap-20'>
            <div className='min-w-[9rem]'>
              <p className='text-xs font-semibold tracking-[0.18em] text-subtle-foreground uppercase'>
                {COPY.footer.quickLinks}
              </p>
              <nav className='mt-4 flex flex-col gap-2.5'>
                {navLinks.map((navLink) => (
                  <Link
                    key={navLink.href}
                    href={navLink.href}
                    className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                  >
                    {navLink.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className='min-w-[9rem]'>
              <p className='text-xs font-semibold tracking-[0.18em] text-subtle-foreground uppercase'>
                {COPY.footer.connect}
              </p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {visibleSocials.map((socialLink) => {
                  const SocialIcon = socialLinks[socialLink.platform]

                  return (
                    <a
                      key={socialLink.label}
                      href={socialLink.url}
                      target={socialLink.platform === 'email' ? undefined : '_blank'}
                      rel={socialLink.platform === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={socialLink.label}
                      className='inline-flex size-10 items-center justify-center rounded-full border border-border/75 bg-surface text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground'
                    >
                      <SocialIcon className='size-4' />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 text-xs text-subtle-foreground sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {currentYear} {COPY.common.siteName} · {COPY.footer.allRightsReserved}
          </p>
          <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
            <FooterAdminAction />
            {emailSocial ? (
              <a
                href={emailSocial.url}
                className='inline-flex items-center gap-1 transition-colors hover:text-foreground'
              >
                {COPY.footer.contact}
                <ArrowUpRight className='size-3.5' aria-hidden='true' />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
