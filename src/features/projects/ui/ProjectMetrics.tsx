import { Card } from '@/components/ui/Card'
import type { Locale } from '@/i18n/routing'
import type { IProjectMetric } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'

export interface IProjectMetricsProps {
  metrics?: IProjectMetric[]
  locale: Locale
  heading: string
}

// ผลลัพธ์ที่วัดได้ของโปรเจกต์ (optional) — ถ้าไม่มี metrics เลยไม่ต้อง render section นี้เลย
export function ProjectMetrics({ metrics, locale, heading }: IProjectMetricsProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <section className='flex flex-col gap-6'>
      <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{heading}</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {metrics.map((metric, metricIndex) => (
          <Card key={`${metricIndex}-${metric.value}`} className='flex flex-col gap-2 p-6'>
            <span className='text-3xl font-semibold tracking-tight text-accent'>{metric.value}</span>
            <span className='text-sm text-muted-foreground'>{getLocalizedText(metric.label, locale)}</span>
          </Card>
        ))}
      </div>
    </section>
  )
}
