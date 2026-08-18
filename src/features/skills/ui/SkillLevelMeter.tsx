import { ProgressBar } from '@/components/ui/ProgressBar'
import type { SkillLevel } from '@/types/portfolio'

export interface ISkillLevelMeterProps {
  name: string
  level: SkillLevel
  levelLabel: string
  yearsLabel?: string
}

/** แปลงระดับ skill เป็นตัวเลข 0-100 สำหรับ ProgressBar */
const SKILL_LEVEL_PROGRESS_VALUE: Record<SkillLevel, number> = {
  beginner: 35,
  intermediate: 60,
  advanced: 80,
  expert: 95,
}

// แถวเดียวของ skill หนึ่งตัวในการ์ดหมวดทักษะ — แสดงชื่อ + ระดับเป็นข้อความ + แถบระดับ
export function SkillLevelMeter({ name, level, levelLabel, yearsLabel }: ISkillLevelMeterProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5'>
        <span className='text-sm font-medium text-foreground'>{name}</span>
        <span className='text-xs text-muted-foreground'>
          {levelLabel}
          {yearsLabel && ` · ${yearsLabel}`}
        </span>
      </div>
      <ProgressBar value={SKILL_LEVEL_PROGRESS_VALUE[level]} showValue={false} />
    </div>
  )
}
