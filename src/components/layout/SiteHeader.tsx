'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import LocaleSwitcher from '@/components/common/LocaleSwitcher'
import ThemeToggle from '@/components/common/ThemeToggle'

interface INavItem {
  href: string
  label: string
}

export default function SiteHeader() {
  const pathname = usePathname()
  const translate = useTranslations('nav')
  const translateCommon = useTranslations('common')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [previousPathname, setPreviousPathname] = useState(pathname)
  const scrollFrameRef = useRef<number | null>(null)

  // ปิดเมนูมือถือทุกครั้งที่เปลี่ยนหน้า — ปรับ state ระหว่าง render แทนการ setState ใน effect (ref อ่าน/เขียนตอน render ไม่ได้)
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const navItems: INavItem[] = [
    { href: '/', label: translate('home') },
    { href: '/projects', label: translate('projects') },
    { href: '/experience', label: translate('experience') },
    { href: '/education', label: translate('education') },
    { href: '/skills', label: translate('skills') },
  ]

  // ใช้ passive scroll listener + requestAnimationFrame throttle เพื่อไม่ให้กระทบ performance
  useEffect(() => {
    const onScroll = () => {
      if (scrollFrameRef.current !== null) return
      scrollFrameRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 8)
        scrollFrameRef.current = null
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current)
    }
  }, [])

  // ล็อก scroll ของ body ตอนเมนูมือถือเปิดอยู่
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const onToggleMenu = () => setIsMenuOpen((previousState) => !previousState)
  const onCloseMenu = () => setIsMenuOpen(false)

  const isActiveLink = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        isScrolled ? 'glass border-border' : 'border-transparent bg-transparent',
      )}
    >
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link href='/' className='text-base font-semibold tracking-tight text-foreground'>
          {translateCommon('siteName')}
        </Link>

        <nav className='hidden items-center gap-1 md:flex' aria-label={translate('menu')}>
          {navItems.map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={cn(
                'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                isActiveLink(navItem.href)
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {navItem.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <div className='hidden md:flex md:items-center md:gap-2'>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          <button
            type='button'
            onClick={onToggleMenu}
            aria-label={isMenuOpen ? translate('closeMenu') : translate('menu')}
            aria-expanded={isMenuOpen}
            className='flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden'
          >
            {isMenuOpen ? <X className='size-4' /> : <Menu className='size-4' />}
          </button>
        </div>
      </div>

      {/* mobile menu panel — animate ด้วย transform + opacity เท่านั้น */}
      <div
        inert={!isMenuOpen}
        className={cn(
          'fixed inset-0 top-16 z-40 flex flex-col gap-6 bg-background px-6 py-8 transition-all duration-300 ease-out md:hidden',
          isMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-2 opacity-0',
        )}
      >
        <nav className='flex flex-col gap-1' aria-label={translate('menu')}>
          {navItems.map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              onClick={onCloseMenu}
              className={cn(
                'rounded-xl px-4 py-3 text-lg font-medium transition-colors',
                isActiveLink(navItem.href)
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
              )}
            >
              {navItem.label}
            </Link>
          ))}
        </nav>

        <div className='mt-auto flex items-center justify-between gap-3 border-t border-border pt-6'>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
