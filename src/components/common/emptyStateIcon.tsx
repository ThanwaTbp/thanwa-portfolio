import type { LucideIcon } from 'lucide-react'

export function emptyStateIcon(Icon: LucideIcon) {
  return <Icon className='size-7 text-muted-foreground' aria-hidden='true' />
}
