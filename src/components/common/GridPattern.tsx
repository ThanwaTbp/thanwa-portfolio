import { useId } from 'react'

import { cn } from '@/lib/utils'

export interface IGridPatternProps {
  width?: number
  height?: number
  className?: string
}

// พื้นหลัง SVG ตารางจางๆ สำหรับ hero section — จางลงที่ขอบด้วย radial mask ไม่กิน pointer event
export function GridPattern({ width = 48, height = 48, className }: IGridPatternProps) {
  const patternId = useId()

  return (
    <svg
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full text-border [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]',
        className,
      )}
    >
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits='userSpaceOnUse'>
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill='none'
            stroke='currentColor'
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${patternId})`} />
    </svg>
  )
}
