import { CheckCircle2 } from 'lucide-react'

import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import type { Locale } from '@/i18n/routing'
import type { ILocalizedText } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'

export interface IProjectHighlightsProps {
  highlights: ILocalizedText[]
  locale: Locale
  heading: string
}

// จุดเด่นของโปรเจกต์ — ถ้าไม่มี highlight เลยไม่ต้อง render section นี้เลย
export function ProjectHighlights({ highlights, locale, heading }: IProjectHighlightsProps) {
  if (highlights.length === 0) return null

  return (
    <section className='flex flex-col gap-6'>
      <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{heading}</h2>
      <RevealOnScroll stagger className='flex flex-col gap-3'>
        {highlights.map((highlight, highlightIndex) => (
          <div
            key={`${highlightIndex}-${highlight.en}`}
            className='flex items-start gap-3 rounded-lg border border-border bg-surface p-4'
          >
            <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-accent' aria-hidden='true' />
            <p className='text-sm leading-relaxed text-foreground'>{getLocalizedText(highlight, locale)}</p>
          </div>
        ))}
      </RevealOnScroll>
    </section>
  )
}
