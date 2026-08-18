import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export type ISkeletonProps = HTMLAttributes<HTMLDivElement>

// placeholder ระหว่างโหลดข้อมูล ใช้ animate-pulse ของ Tailwind ซึ่ง animate เฉพาะ opacity
// (prefers-reduced-motion ถูกจัดการโดยกฎ global ใน globals.css ให้ animation-duration เหลือ 0.01ms อัตโนมัติ)
export function Skeleton({ className, ...props }: ISkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-muted', className)}
      aria-hidden='true'
      {...props}
    />
  )
}
