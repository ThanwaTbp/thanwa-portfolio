import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export interface ISeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

// เส้นคั่นเนื้อหา — ถ้า decorative (ค่าเริ่มต้น) จะซ่อนจาก screen reader เพราะไม่มีความหมายเชิงเนื้อหา
export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ISeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}
