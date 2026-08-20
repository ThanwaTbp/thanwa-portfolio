import type { SkillLevel } from '@/types/portfolio'
import { Badge } from '@/components/ui/Badge'
import { TechIcon } from '@/components/common/TechIcon'

export interface ISkillLevelMeterProps {
  name: string
  level: SkillLevel
  levelLabel: string
  yearsLabel?: string
}

const SKILL_LEVEL_TONE: Record<SkillLevel, string> = {
  beginner: 'bg-surface-muted text-muted-foreground border-border',
  intermediate: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
  advanced: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20',
  expert: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
}

// แถวเดียวของ skill หนึ่งตัวในการ์ดหมวดทักษะ — แสดงชื่อ + ระดับ + ปีใช้งาน โดยไม่ใช้ progress bar
export function SkillLevelMeter({ name, level, levelLabel, yearsLabel }: ISkillLevelMeterProps) {
  return (
    <div className='flex items-start justify-between gap-3 rounded-2xl border border-border/75 bg-surface/80 px-4 py-3 transition-transform duration-300 ease-out hover:-translate-y-0.5'>
      <div className='flex min-w-0 items-start gap-3'>
        <span className='mt-0.5 inline-flex size-9 items-center justify-center rounded-xl bg-surface-muted'>
          <TechIcon name={name} className='size-4' />
        </span>
        <div className='min-w-0'>
          <p className='text-sm font-medium text-foreground'>{name}</p>
          {yearsLabel && <p className='mt-1 text-xs text-muted-foreground'>{yearsLabel}</p>}
        </div>
      </div>
      <Badge size='sm' variant='outline' className={SKILL_LEVEL_TONE[level]}>
        {levelLabel}
      </Badge>
    </div>
  )
}
