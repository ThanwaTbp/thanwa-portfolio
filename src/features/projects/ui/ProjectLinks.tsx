import { ArrowUpRight } from 'lucide-react'

import type { Locale } from '@/i18n/routing'
import type { IProjectLink } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'

export interface IProjectLinksProps {
  links?: IProjectLink[]
  locale: Locale
  heading: string
}

// ลิงก์ที่เกี่ยวข้องกับโปรเจกต์ (optional) — ถ้าไม่มี links เลยไม่ต้อง render เลย
export function ProjectLinks({ links, locale, heading }: IProjectLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>{heading}</span>
      <div className='flex flex-col gap-2'>
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-border-strong hover:text-accent'
          >
            {getLocalizedText(link.label, locale)}
            <ArrowUpRight
              className='size-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
              aria-hidden='true'
            />
          </a>
        ))}
      </div>
    </div>
  )
}
