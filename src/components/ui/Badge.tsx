import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium whitespace-nowrap transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-foreground border border-border',
        accent: 'bg-accent-soft text-accent',
        outline: 'border border-border-strong text-foreground',
        muted: 'bg-transparent text-muted-foreground',
      },
      size: {
        sm: 'h-6 px-2.5 text-xs',
        md: 'h-7 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
)

export interface IBadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

// ใช้แสดง tech stack tag เช่น "React", "TypeScript" ในการ์ดโปรเจกต์
export function Badge({ className, variant, size, ...props }: IBadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
