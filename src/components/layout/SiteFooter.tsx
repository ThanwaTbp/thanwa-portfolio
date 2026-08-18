import type { ComponentType } from 'react'
import { Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface IFooterNavItem {
  href: string
  label: string
}

interface ISocialIconProps {
  className?: string
}

// lucide-react เวอร์ชันนี้ไม่มีไอคอนแบรนด์ (GitHub/LinkedIn) จึงทำ SVG มาร์คขั้นต่ำไว้ใช้เอง
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

interface IFooterSocialLink {
  href: string
  label: string
  icon: ComponentType<ISocialIconProps>
}

export default async function SiteFooter() {
  const translate = await getTranslations('nav')
  const translateCommon = await getTranslations('common')
  const translateFooter = await getTranslations('footer')
  const currentYear = new Date().getFullYear()

  const quickLinks: IFooterNavItem[] = [
    { href: '/', label: translate('home') },
    { href: '/projects', label: translate('projects') },
    { href: '/experience', label: translate('experience') },
    { href: '/education', label: translate('education') },
    { href: '/skills', label: translate('skills') },
  ]

  // URL เป็น placeholder ไว้ก่อน — รอข้อมูลจริงจาก IProfile.socials
  const socialLinks: IFooterSocialLink[] = [
    { href: 'https://github.com/', label: 'GitHub', icon: GithubIcon },
    { href: 'https://linkedin.com/', label: 'LinkedIn', icon: LinkedinIcon },
    { href: 'mailto:hello@example.com', label: 'Email', icon: Mail },
  ]

  return (
    <footer className='border-t border-border'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8'>
        <div className='flex flex-col gap-2'>
          <span className='text-base font-semibold tracking-tight text-foreground'>
            {translateCommon('siteName')}
          </span>
          <p className='max-w-xs text-sm text-muted-foreground'>{translateCommon('tagline')}</p>
        </div>

        <div className='flex flex-col gap-3'>
          <span className='text-sm font-medium text-foreground'>
            {translateFooter('quickLinks')}
          </span>
          <nav className='flex flex-col gap-2'>
            {quickLinks.map((quickLink) => (
              <Link
                key={quickLink.href}
                href={quickLink.href}
                className='text-sm text-muted-foreground transition-colors hover:text-foreground'
              >
                {quickLink.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex flex-col gap-3'>
          <span className='text-sm font-medium text-foreground'>{translateFooter('connect')}</span>
          <div className='flex items-center gap-3'>
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.label}
                href={socialLink.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={socialLink.label}
                className='flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground'
              >
                <socialLink.icon className='size-4' />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='border-t border-border px-4 py-6 sm:px-6 lg:px-8'>
        <p className='text-center text-xs text-subtle-foreground'>
          © {currentYear} {translateCommon('siteName')} · {translateFooter('allRightsReserved')}
        </p>
      </div>
    </footer>
  )
}
