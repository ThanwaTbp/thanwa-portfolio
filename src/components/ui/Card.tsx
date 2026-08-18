import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export type ICardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: ICardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl transition-colors duration-200 hover:border-border-strong',
        className,
      )}
      {...props}
    />
  )
}

export type ICardHeaderProps = HTMLAttributes<HTMLDivElement>

export function CardHeader({ className, ...props }: ICardHeaderProps) {
  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
}

export type ICardTitleProps = HTMLAttributes<HTMLHeadingElement>

export function CardTitle({ className, ...props }: ICardTitleProps) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-tight tracking-tight', className)}
      {...props}
    />
  )
}

export type ICardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function CardDescription({ className, ...props }: ICardDescriptionProps) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export type ICardContentProps = HTMLAttributes<HTMLDivElement>

export function CardContent({ className, ...props }: ICardContentProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

export type ICardFooterProps = HTMLAttributes<HTMLDivElement>

export function CardFooter({ className, ...props }: ICardFooterProps) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
