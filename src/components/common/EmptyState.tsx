'use client'

import { useGSAP } from '@gsap/react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IEmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: ReactNode
  className?: string
}

// สถานะว่างสำหรับทุกหน้าที่มีลิสต์ในโปรเจกต์ ออกแบบให้ดูตั้งใจ ไม่ใช่หน้าเสีย
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: IEmptyStateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current) return

      // ตั้งค่าเริ่มต้นด้วย gsap.set ก่อน paint กัน FOUC ถ้า JS โหลดไม่ทัน
      gsap.set(containerRef.current, {
        opacity: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : 16,
      })

      if (reducedMotion) return

      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_DURATION.base,
        ease: ANIMATION_EASE.out,
      })
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'will-animate flex flex-col items-center justify-center gap-4 px-6 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <div className='flex size-16 items-center justify-center rounded-full bg-surface-muted ring-8 ring-surface-muted/40'>
          <Icon className='size-7 text-muted-foreground' aria-hidden='true' />
        </div>
      )}
      <div className='flex flex-col gap-1.5'>
        <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
        <p className='max-w-sm text-sm text-muted-foreground'>{description}</p>
      </div>
      {action && <div className='mt-2'>{action}</div>}
    </div>
  )
}
