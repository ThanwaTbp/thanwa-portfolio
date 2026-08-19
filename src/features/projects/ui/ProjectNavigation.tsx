import { ArrowLeft, ArrowRight } from 'lucide-react'

import Link from 'next/link'
import type { IProject } from '@/types/portfolio'

export interface IProjectNavigationProps {
  previous?: IProject
  next?: IProject
  previousLabel: string
  nextLabel: string
}

// การ์ดลิงก์ไปผลงานก่อนหน้า/ถัดไป — ถ้าไม่มีทั้งคู่เลยไม่ต้อง render section นี้เลย
export function ProjectNavigation({
  previous,
  next,
  previousLabel,
  nextLabel,
}: IProjectNavigationProps) {
  if (!previous && !next) return null

  return (
    <div className='grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2'>
      {previous && (
        <Link
          href={`/projects/${previous.slug}`}
          className='group flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-border-strong'
        >
          <span className='inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
            <ArrowLeft
              className='size-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1'
              aria-hidden='true'
            />
            {previousLabel}
          </span>
          <span className='text-lg font-semibold text-foreground'>{previous.title}</span>
        </Link>
      )}

      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className='group flex flex-col items-end gap-2 rounded-xl border border-border bg-surface p-5 text-right transition-colors duration-200 hover:border-border-strong sm:col-start-2'
        >
          <span className='inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-subtle-foreground uppercase'>
            {nextLabel}
            <ArrowRight
              className='size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1'
              aria-hidden='true'
            />
          </span>
          <span className='text-lg font-semibold text-foreground'>{next.title}</span>
        </Link>
      )}
    </div>
  )
}
