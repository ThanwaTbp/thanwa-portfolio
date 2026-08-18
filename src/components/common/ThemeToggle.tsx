'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

// ไม่ต้อง subscribe อะไรจริงๆ ใช้แค่แยกผล render ระหว่างฝั่ง server (false) กับ client (true) หลัง hydrate
const subscribeNoop = () => () => {}

// ปุ่มสลับ light/dark — ต้องกัน hydration mismatch เพราะ theme จริงรู้ได้แค่ฝั่ง client เท่านั้น
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )
  const translate = useTranslations('nav')

  const onToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    // placeholder ขนาดเท่ากันเพื่อกัน layout shift ระหว่างรอ mount
    return <div className='size-9 rounded-full' aria-hidden='true' />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type='button'
      onClick={onToggleTheme}
      aria-label={isDark ? translate('lightMode') : translate('darkMode')}
      className='relative flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    >
      <Sun
        className={cn(
          'absolute size-4 transition-all duration-300 ease-out',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
      <Moon
        className={cn(
          'absolute size-4 transition-all duration-300 ease-out',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
        )}
      />
    </button>
  )
}
