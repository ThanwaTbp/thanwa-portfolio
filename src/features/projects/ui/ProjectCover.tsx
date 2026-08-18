import Image from 'next/image'

import { GridPattern } from '@/components/common/GridPattern'
import { cn } from '@/lib/utils'
import type { IProject } from '@/types/portfolio'

export type ProjectCoverAspect = 'card' | 'hero' | 'fill'

export interface IProjectCoverProps {
  project: IProject
  aspectRatio?: ProjectCoverAspect
  sizes?: string
  priority?: boolean
  className?: string
}

// ชุด gradient fallback สำหรับโปรเจกต์ที่ยังไม่มี coverImage จริง (ข้อมูลตัวอย่างทุกอันเป็น undefined)
const COVER_GRADIENTS = [
  'from-accent/60 via-accent-2/40 to-surface-muted',
  'from-accent-2/55 via-accent/35 to-surface',
  'from-accent/45 via-surface-muted to-accent-2/35',
  'from-accent-2/60 via-accent/25 to-surface',
  'from-accent/35 via-accent-2/55 to-surface-muted',
]

const ASPECT_CLASS_BY_VARIANT: Record<ProjectCoverAspect, string> = {
  card: 'aspect-[16/10]',
  hero: 'aspect-[21/9]',
  fill: 'h-full',
}

const DEFAULT_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'

/**
 * hash แบบ deterministic จาก slug เพื่อเลือก gradient คงที่ทุกครั้งที่ render
 * ห้ามใช้ Math.random เด็ดขาด เพราะ server กับ client จะสุ่มได้คนละค่า ทำให้เกิด hydration mismatch
 */
function hashSlugToGradientIndex(slug: string): number {
  let hash = 0

  for (let charIndex = 0; charIndex < slug.length; charIndex += 1) {
    hash = (hash * 31 + slug.charCodeAt(charIndex)) % COVER_GRADIENTS.length
  }

  return Math.abs(hash) % COVER_GRADIENTS.length
}

/** ดึงตัวอักษรย่อจากชื่อโปรเจกต์ (สูงสุด 2 ตัว) ไว้แสดงตรงกลาง fallback cover */
function getProjectInitials(title: string): string {
  const initials = title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

  return initials || '?'
}

// พื้นที่แสดงรูปปกโปรเจกต์ — ถ้ายังไม่มี coverImage จริงจะ fallback เป็น gradient + ตัวอักษรย่อ + ลาย grid จางๆ
// รองรับกรณีมี coverImage จริงในอนาคตด้วย next/image (fill + sizes)
export function ProjectCover({
  project,
  aspectRatio = 'card',
  sizes,
  priority = false,
  className,
}: IProjectCoverProps) {
  const gradientClassName = COVER_GRADIENTS[hashSlugToGradientIndex(project.slug)]

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-surface-muted',
        ASPECT_CLASS_BY_VARIANT[aspectRatio],
        className,
      )}
    >
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes={sizes ?? DEFAULT_SIZES}
          priority={priority}
          className='object-cover'
        />
      ) : (
        <div
          className={cn(
            'relative flex size-full items-center justify-center bg-gradient-to-br',
            gradientClassName,
          )}
          aria-hidden='true'
        >
          <GridPattern className='opacity-40' />
          <span className='relative text-4xl font-semibold tracking-tight text-foreground/70 sm:text-5xl'>
            {getProjectInitials(project.title)}
          </span>
        </div>
      )}
    </div>
  )
}
