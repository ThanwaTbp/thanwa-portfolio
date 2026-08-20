'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { COPY } from '@/constants/copy'
import { cn } from '@/lib/utils'

const subscribeNoop = () => () => {}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )

  const onToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return <div className='h-8 w-[3.35rem] shrink-0 rounded-full' aria-hidden='true' />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isDark}
      aria-label={isDark ? COPY.nav.lightMode : COPY.nav.darkMode}
      onClick={onToggleTheme}
      className={cn(
        'group relative inline-flex h-8 w-[3.35rem] shrink-0 rounded-full border p-0.5 transition-[background-color,border-color,box-shadow] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isDark
          ? 'border-border/80 bg-gradient-to-br from-surface-muted via-surface-muted to-accent-soft/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
          : 'border-border/70 bg-gradient-to-br from-amber-50/95 via-accent-soft/45 to-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]',
      )}
    >
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 flex items-center justify-between px-1.5'
      >
        <Sun
          className={cn(
            'size-3 transition-all duration-500 ease-out',
            isDark ? 'scale-75 text-amber-500/35' : 'scale-100 text-amber-500/90',
          )}
        />
        <Moon
          className={cn(
            'size-3 transition-all duration-500 ease-out',
            isDark ? 'scale-100 text-accent/90' : 'scale-75 text-accent/35',
          )}
        />
      </span>

      <span
        aria-hidden='true'
        className={cn(
          'absolute top-0.5 z-10 flex size-7 items-center justify-center rounded-full bg-background shadow-[0_2px_10px_-3px_rgba(35,30,80,0.45)] transition-[left,right] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-animate group-hover:shadow-[0_4px_14px_-4px_rgba(35,30,80,0.5)]',
          isDark ? 'right-0.5 left-auto' : 'left-0.5 right-auto',
        )}
      >
        <Sun
          className={cn(
            'absolute size-3.5 text-amber-500 transition-all duration-500 ease-out',
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
          )}
        />
        <Moon
          className={cn(
            'absolute size-3.5 text-accent transition-all duration-500 ease-out',
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
          )}
        />
      </span>
    </button>
  )
}
