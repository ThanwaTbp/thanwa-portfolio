import { getTechItemByName } from '@/constants/tech-stack'
import { cn } from '@/lib/utils'

export interface ITechIconProps {
  name: string
  className?: string
}

export function TechIcon({ name, className }: ITechIconProps) {
  const techItem = getTechItemByName(name)
  const Icon = techItem?.icon

  if (!Icon) {
    return (
      <span
        aria-hidden='true'
        className={cn(
          'inline-flex size-2.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2',
          className,
        )}
      />
    )
  }

  return (
    <Icon aria-hidden='true' className={cn('size-4 shrink-0', techItem.colorClass, className)} />
  )
}
