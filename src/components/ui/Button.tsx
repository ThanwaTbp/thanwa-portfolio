import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-foreground shadow-sm hover:-translate-y-0.5 active:translate-y-0',
        secondary:
          'bg-surface-muted text-foreground border border-border hover:-translate-y-0.5 active:translate-y-0',
        ghost: 'text-foreground hover:bg-surface-muted active:translate-y-0',
        outline:
          'border border-border-strong text-foreground hover:-translate-y-0.5 hover:bg-surface-muted active:translate-y-0',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface IButtonBaseProps extends VariantProps<typeof buttonVariants> {
  className?: string
  children?: ReactNode
}

interface IButtonAsButtonProps
  extends IButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'color'> {
  href?: undefined
}

interface IButtonAsLinkProps
  extends
    IButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'color' | 'href'> {
  href: string
}

export type IButtonProps = IButtonAsButtonProps | IButtonAsLinkProps

// ปุ่มกลางของระบบ — ถ้าส่ง href มาจะ render เป็น next/link ให้อัตโนมัติ (SPA navigation)
// ถ้าต้องการ external link ให้ผู้เรียกครอบด้วย <a target="_blank"> เองแทน
export function Button({ className, variant, size, href, children, ...props }: IButtonProps) {
  const classNames = cn(buttonVariants({ variant, size }), className)

  if (href) {
    return (
      <Link
        href={href}
        className={classNames}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={classNames} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
