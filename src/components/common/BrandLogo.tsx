import { COPY } from '@/constants/copy'
import { cn } from '@/lib/utils'

interface IBrandLogoProps {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
  showWordmark?: boolean
  /** ใช้แยก id ของ gradient/clipPath ไม่ให้ชนกันเมื่อวางโลโก้หลายจุดในหน้าเดียว */
  idPrefix?: string
}

const SQUIRCLE_PATH =
  'M20 0.05C22.61 0.05 25.28 0.02 28.08 0.5C30.87 0.98 33.76 2.09 35.83 4.17C37.91 6.24 39.02 9.13 39.5 11.92C39.98 14.72 39.95 17.39 39.95 20C39.95 22.61 39.98 25.28 39.5 28.08C39.02 30.87 37.91 33.76 35.83 35.83C33.76 37.91 30.87 39.02 28.08 39.5C25.28 39.98 22.61 39.95 20 39.95C17.39 39.95 14.72 39.98 11.92 39.5C9.13 39.02 6.24 37.91 4.17 35.83C2.09 33.76 0.98 30.87 0.5 28.08C0.02 25.28 0.05 22.61 0.05 20C0.05 17.39 0.02 14.72 0.5 11.92C0.98 9.13 2.09 6.24 4.17 4.17C6.24 2.09 9.13 0.98 11.92 0.5C14.72 0.02 17.39 0.05 20 0.05Z'

export default function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
  idPrefix = 'brand-logo',
}: IBrandLogoProps) {
  const gradientId = `${idPrefix}-gradient`
  const clipId = `${idPrefix}-clip`

  return (
    <span className={cn('group/logo inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'relative inline-flex size-9 shrink-0 items-center justify-center',
          markClassName,
        )}
      >
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 scale-90 rounded-[35%] bg-accent/35 opacity-0 blur-md transition-[opacity,transform] duration-500 ease-out-expo group-hover/logo:scale-110 group-hover/logo:opacity-100'
        />

        <svg
          viewBox='0 0 40 40'
          role={showWordmark ? undefined : 'img'}
          aria-hidden={showWordmark ? true : undefined}
          aria-label={showWordmark ? undefined : COPY.common.siteName}
          className='relative size-full transition-transform duration-500 ease-out-expo group-hover/logo:-rotate-6 group-hover/logo:scale-105'
        >
          <defs>
            <linearGradient id={gradientId} x1='0' y1='0' x2='40' y2='40' gradientUnits='userSpaceOnUse'>
              <stop offset='0' className='[stop-color:var(--color-accent)]' />
              <stop offset='1' className='[stop-color:var(--color-accent-2)]' />
            </linearGradient>
            <clipPath id={clipId}>
              <path d={SQUIRCLE_PATH} />
            </clipPath>
          </defs>

          <path d={SQUIRCLE_PATH} fill={`url(#${gradientId})`} />

          <g clipPath={`url(#${clipId})`}>
            <path
              d='M-14 -10H40V15L-14 40Z'
              className='fill-white/16 transition-transform duration-700 ease-out-expo group-hover/logo:translate-x-[54px]'
            />
          </g>

          <g className='fill-background'>
            <rect x='9' y='10' width='22' height='5' rx='2.5' />
            <rect x='17.5' y='10' width='5' height='20' rx='2.5' />
            <circle
              cx='27.6'
              cy='26.9'
              r='2.6'
              className='origin-center opacity-70 transition-transform duration-500 ease-out-expo group-hover/logo:scale-125'
            />
          </g>
        </svg>
      </span>

      {showWordmark ? (
        <span
          className={cn(
            'font-display text-base font-semibold tracking-tight text-foreground',
            wordmarkClassName,
          )}
        >
          {COPY.common.siteName}
          <span className='text-accent'>.</span>
        </span>
      ) : null}
    </span>
  )
}
