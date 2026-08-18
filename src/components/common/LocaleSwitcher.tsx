'use client'

import { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

// segmented control เล็กๆ สำหรับสลับภาษาโดยคงเส้นทางปัจจุบันไว้
export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const translate = useTranslations('nav')
  const [isPending, startTransition] = useTransition()

  const onChangeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div
      className='relative flex h-9 items-center rounded-full border border-border bg-surface p-1 text-xs font-medium'
      role='group'
      aria-label={translate('language')}
    >
      <span
        className={cn(
          'absolute inset-y-1 w-8 rounded-full bg-accent-soft transition-transform duration-300 ease-out',
          locale === 'th' ? 'translate-x-8' : 'translate-x-0',
        )}
        aria-hidden='true'
      />
      {routing.locales.map((localeOption) => (
        <button
          key={localeOption}
          type='button'
          disabled={isPending}
          onClick={() => onChangeLocale(localeOption)}
          aria-pressed={locale === localeOption}
          className={cn(
            'relative z-10 w-8 rounded-full py-1 text-center uppercase transition-colors disabled:cursor-wait',
            locale === localeOption ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {localeOption}
        </button>
      ))}
    </div>
  )
}
