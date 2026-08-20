import type { ReactNode } from 'react'

import { SectionDivider } from '@/components/common/SectionDivider'
import { cn } from '@/lib/utils'

export type SectionTone = 'plain' | 'tinted'

export interface ISectionShellProps {
  id?: string
  /** ลำดับ section เริ่มที่ 1 — ใช้ทำเลขกำกับหน้าหัวข้อ */
  index: number
  label: string
  tone?: SectionTone
  children: ReactNode
  className?: string
  contentClassName?: string
}

function formatSectionIndex(index: number): string {
  return index.toString().padStart(2, '0')
}

/**
 * กรอบมาตรฐานของแต่ละ section บนหน้าเว็บ ทำให้แต่ละส่วนแยกตัวจากกันชัดเจน
 * ประกอบด้วย เส้นคั่นที่ลากตอน scroll · เลขกำกับ + ชื่อ section
 * และสลับพื้นหลังอ่อนๆ ระหว่าง section เพื่อให้เห็นเป็นแถบๆ
 */
export function SectionShell({
  id,
  index,
  label,
  tone = 'plain',
  children,
  className,
  contentClassName,
}: ISectionShellProps) {
  const sectionIndex = formatSectionIndex(index)

  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden',
        tone === 'tinted' && 'bg-surface/25',
        className,
      )}
    >
      <SectionDivider />

      <div
        className={cn(
          'relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28',
          contentClassName,
        )}
      >
        <div className='mb-6 flex items-center gap-3'>
          <span className='font-mono text-xs font-semibold text-accent'>{sectionIndex}</span>
          <span
            aria-hidden='true'
            className='h-px w-10 bg-gradient-to-r from-accent to-transparent'
          />
          <span className='text-xs font-semibold tracking-[0.22em] text-subtle-foreground uppercase'>
            {label}
          </span>
        </div>

        {children}
      </div>
    </section>
  )
}
