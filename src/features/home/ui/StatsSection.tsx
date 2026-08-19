import type { IProfileStat } from '@/types/portfolio'
import { NumberTicker } from '@/components/common/NumberTicker'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'

export interface IStatsSectionProps {
  stats: IProfileStat[]
}

export function StatsSection({ stats }: IStatsSectionProps) {
  if (stats.length === 0) return null

  return (
    <section className='border-y border-border bg-surface-muted'>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
        <RevealOnScroll stagger className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
          {stats.map((stat) => (
            <div
              key={`${stat.label}-${stat.value}`}
              className='flex flex-col items-center gap-2 text-center'
            >
              <NumberTicker
                value={stat.value}
                suffix={stat.suffix}
                className='text-4xl font-semibold text-foreground lg:text-5xl'
              />
              <span className='text-sm text-muted-foreground'>{stat.label}</span>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
