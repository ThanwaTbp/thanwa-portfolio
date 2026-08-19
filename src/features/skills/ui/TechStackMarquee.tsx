import { MarqueeRow } from '@/components/common/MarqueeRow'
import { TechIcon } from '@/components/common/TechIcon'
import { Badge } from '@/components/ui/Badge'

export interface ITechStackMarqueeProps {
  techStack: string[]
}

// แถบ tech stack วนไม่รู้จบ 2 แถวสวนทางกัน — ใช้ marquee เพื่อโชว์ทุกเทคที่เคยใช้ในโปรเจกต์ทั้งหมด
export function TechStackMarquee({ techStack }: ITechStackMarqueeProps) {
  if (techStack.length === 0) return null

  // แบ่งครึ่งรายการให้แถวบน/แถวล่างมีจำนวนใกล้เคียงกัน
  const splitIndex = Math.ceil(techStack.length / 2)
  const firstRowTech = techStack.slice(0, splitIndex)
  const secondRowTech = techStack.slice(splitIndex)

  return (
    <div className='flex flex-col gap-4'>
      <MarqueeRow direction='left'>
        {firstRowTech.map((tech) => (
          <Badge
            key={tech}
            variant='outline'
            size='md'
            className='shrink-0 gap-2 border-border/75 bg-surface/80'
          >
            <TechIcon name={tech} className='size-3.5' />
            {tech}
          </Badge>
        ))}
      </MarqueeRow>

      {secondRowTech.length > 0 && (
        <MarqueeRow direction='right'>
          {secondRowTech.map((tech) => (
            <Badge
              key={tech}
              variant='outline'
              size='md'
              className='shrink-0 gap-2 border-border/75 bg-surface/80'
            >
              <TechIcon name={tech} className='size-3.5' />
              {tech}
            </Badge>
          ))}
        </MarqueeRow>
      )}
    </div>
  )
}
