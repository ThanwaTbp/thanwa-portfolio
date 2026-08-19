'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/common/ThemeToggle'
import AuthNavActions from '@/components/auth/AuthNavActions'
import { COPY } from '@/constants/copy'

interface INavItem {
  target: string
  label: string
}

export default function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollFrameRef = useRef<number | null>(null)

  const navItems: INavItem[] = [
    { target: 'about', label: COPY.nav.about },
    { target: 'work', label: COPY.nav.work },
    { target: 'experience', label: COPY.nav.experience },
    { target: 'skills', label: COPY.nav.skills },
  ]

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

  const onScrollToSection = (target: string) => {
    const targetElement = document.getElementById(target)
    if (!targetElement) return
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onNavigateSection = (target: string) => {
    if (pathname === '/') {
      onScrollToSection(target)
      return
    }

    sessionStorage.setItem('pending-section-target', target)
    router.push('/')
  }

  useEffect(() => {
    if (pathname !== '/') return

    const pendingTarget = sessionStorage.getItem('pending-section-target')

    if (!pendingTarget) return

    sessionStorage.removeItem('pending-section-target')
    requestAnimationFrame(() => {
      onScrollToSection(pendingTarget)
    })
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        isScrolled
          ? 'glass border-border shadow-[0_20px_50px_-35px_rgba(35,30,80,0.55)]'
          : 'border-border/80 bg-background/88 shadow-[0_8px_30px_-24px_rgba(35,30,80,0.38)]',
      )}
    >
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='inline-flex items-center gap-3 text-base font-semibold tracking-tight text-foreground'
        >
          <span className='inline-flex size-8 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-sm text-accent'>
            T
          </span>
          <span>{COPY.common.siteName}</span>
        </Link>

        <nav className='hidden items-center gap-1 md:flex' aria-label={COPY.nav.menu}>
          {navItems.map((navItem) => (
            <button
              key={navItem.target}
              type='button'
              onClick={() => onNavigateSection(navItem.target)}
              className='rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground'
            >
              {navItem.label}
            </button>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <div className='hidden md:flex md:items-center md:gap-2'>
            <AuthNavActions />
            <ThemeToggle />
          </div>

          <button
            type='button'
            onClick={onToggleMenu}
            aria-label={isMenuOpen ? COPY.nav.closeMenu : COPY.nav.menu}
            aria-expanded={isMenuOpen}
            className='flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden'
          >
            {isMenuOpen ? <X className='size-4' /> : <Menu className='size-4' />}
          </button>
        </div>
      </div>

      <div
        inert={!isMenuOpen}
        className={cn(
          'fixed inset-0 top-16 z-40 flex flex-col gap-6 border-t border-border/80 bg-background/95 px-6 py-8 backdrop-blur-xl transition-all duration-300 ease-out md:hidden',
          isMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-2 opacity-0',
        )}
      >
        <nav className='flex flex-col gap-1' aria-label={COPY.nav.menu}>
          {navItems.map((navItem) => (
            <button
              key={navItem.target}
              type='button'
              onClick={() => {
                onCloseMenu()
                onNavigateSection(navItem.target)
              }}
              className='rounded-xl px-4 py-3 text-left text-lg font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground'
            >
              {navItem.label}
            </button>
          ))}
        </nav>

        <AuthNavActions className='w-full justify-center' />

        <div className='mt-auto flex items-center justify-end gap-3 border-t border-border pt-6'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
