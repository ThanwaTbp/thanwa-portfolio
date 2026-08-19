import { CheckCircle2 } from 'lucide-react'

import { RevealOnScroll } from '@/components/common/RevealOnScroll'

export interface IProjectHighlightsProps {
  highlights: string[]
  heading: string
}

export function ProjectHighlights({ highlights, heading }: IProjectHighlightsProps) {
  if (highlights.length === 0) return null

  return (
    <section className='flex flex-col gap-6'>
      <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{heading}</h2>
      <RevealOnScroll stagger className='flex flex-col gap-3'>
        {highlights.map((highlight, highlightIndex) => (
          <div
            key={`${highlightIndex}-${highlight}`}
            className='flex items-start gap-3 rounded-lg border border-border bg-surface p-4'
          >
            <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-accent' aria-hidden='true' />
            <p className='text-sm leading-relaxed text-foreground'>{highlight}</p>
          </div>
        ))}
      </RevealOnScroll>
    </section>
  )
}
