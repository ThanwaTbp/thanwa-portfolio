'use client'

import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { TextReveal } from '@/components/common/TextReveal'
import { cn } from '@/lib/utils'

export interface ISectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

// หัวข้อ section มาตรฐานของเว็บ — eyebrow เป็นตัวเล็ก uppercase สี accent นำหน้าด้วยจุด
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: HeadingTag = 'h2',
  className,
}: ISectionHeadingProps) {
  return (
    <RevealOnScroll
      y={12}
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className='inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-accent uppercase'>
          <span className='size-1.5 rounded-full bg-accent' aria-hidden='true' />
          {eyebrow}
        </span>
      )}
      <TextReveal
        text={title}
        as={HeadingTag}
        className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'
      />
      {description && (
        <p
          className={cn(
            'max-w-2xl text-base text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </RevealOnScroll>
  )
}
