'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'

import { COPY } from '@/constants/copy'
import { cn } from '@/lib/utils'

const subscribeNoop = () => () => {}

interface ISunRay {
  rotation: string
  delay: string
}

// รัศมีดวงอาทิตย์ 8 เส้น หมุนรอบจุดกลางแล้วหน่วงเวลาไล่กันเพื่อให้ตอนหุบเข้าดูมีจังหวะ
const SUN_RAYS: ISunRay[] = [
  { rotation: 'rotate-0', delay: 'delay-0' },
  { rotation: 'rotate-45', delay: 'delay-[30ms]' },
  { rotation: 'rotate-90', delay: 'delay-[60ms]' },
  { rotation: 'rotate-[135deg]', delay: 'delay-[90ms]' },
  { rotation: 'rotate-180', delay: 'delay-[120ms]' },
  { rotation: 'rotate-[225deg]', delay: 'delay-[150ms]' },
  { rotation: 'rotate-[270deg]', delay: 'delay-[180ms]' },
  { rotation: 'rotate-[315deg]', delay: 'delay-[210ms]' },
]

// ดาวจะอยู่ครึ่งซ้ายของราง เพราะโหมดมืดปุ่มเลื่อนไปทางขวาแล้วบังครึ่งขวาไว้
const NIGHT_STARS = [
  { position: 'left-[7px] top-[8px] size-[2.5px]', delay: 'delay-[90ms]', twinkle: 'animate-star-twinkle' },
  { position: 'left-[14px] top-[20px] size-[1.5px]', delay: 'delay-[180ms]', twinkle: 'animate-star-twinkle-slow' },
  { position: 'left-[21px] top-[7px] size-[2px]', delay: 'delay-[140ms]', twinkle: 'animate-star-twinkle-slow' },
  { position: 'left-[25px] top-[18px] size-[2px]', delay: 'delay-[230ms]', twinkle: 'animate-star-twinkle' },
]

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )

  const onToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return <div className='h-8 w-[3.75rem] shrink-0 rounded-full' aria-hidden='true' />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isDark}
      aria-label={isDark ? COPY.nav.lightMode : COPY.nav.darkMode}
      onClick={onToggleTheme}
      className={cn(
        'group relative h-8 w-[3.75rem] shrink-0 rounded-full border transition-[border-color,box-shadow,transform] duration-500 ease-out-expo active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDark
          ? 'border-indigo-300/20 shadow-[0_4px_18px_-8px_rgba(99,102,241,0.7)]'
          : 'border-sky-300/60 shadow-[0_4px_18px_-10px_rgba(56,140,220,0.65)]',
      )}
    >
      <span aria-hidden='true' className='absolute inset-0 overflow-hidden rounded-full'>
        {/* ฉากกลางวัน: ท้องฟ้าไล่สี + ก้อนเมฆลอยออกทางขวาเมื่อสลับเป็นกลางคืน */}
        <span
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-100 to-amber-100 transition-opacity duration-500 ease-out',
            isDark ? 'opacity-0' : 'opacity-100',
          )}
        />
        <span
          className={cn(
            'absolute top-[9px] right-[7px] h-[4px] w-[12px] rounded-full bg-white/90 transition-[transform,opacity] duration-500 ease-out-expo',
            isDark ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100',
          )}
        >
          <span className='absolute -top-[2px] left-[3px] size-[5px] rounded-full bg-white/90' />
        </span>
        <span
          className={cn(
            'absolute top-[19px] right-[5px] h-[3px] w-[9px] rounded-full bg-white/70 transition-[transform,opacity] delay-[60ms] duration-500 ease-out-expo',
            isDark ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100',
          )}
        >
          <span className='absolute -top-[1.5px] left-[2px] size-[4px] rounded-full bg-white/70' />
        </span>

        {/* ฉากกลางคืน: ท้องฟ้าเข้ม + ดาวโผล่ทีละดวงแล้วกะพริบต่อเนื่อง */}
        <span
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-[#1c1d38] via-[#232449] to-[#12132a] transition-opacity duration-500 ease-out',
            isDark ? 'opacity-100' : 'opacity-0',
          )}
        />
        {NIGHT_STARS.map((nightStar) => (
          <span
            key={nightStar.position}
            className={cn(
              'absolute transition-[transform,opacity] duration-500 ease-out-expo',
              nightStar.position,
              nightStar.delay,
              isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
            )}
          >
            <span
              className={cn(
                'block size-full rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.85)]',
                isDark && nightStar.twinkle,
              )}
            />
          </span>
        ))}

        <span
          className={cn(
            'absolute top-0.5 left-0.5 flex size-7 items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.45,0.5,1)] will-animate',
            isDark ? 'translate-x-7' : 'translate-x-0',
          )}
        >
          {/* แสงฟุ้งรอบดวง เปลี่ยนโทนตามโหมด */}
          <span
            className={cn(
              'absolute inset-0 rounded-full blur-[5px] transition-[opacity,transform] duration-500 ease-out',
              isDark
                ? 'scale-90 bg-indigo-200/35 group-hover:scale-100'
                : 'scale-95 bg-amber-300/55 group-hover:scale-110',
            )}
          />

          <span
            className={cn(
              'absolute inset-0 transition-transform duration-[600ms] ease-out-expo',
              isDark ? 'rotate-90' : 'rotate-0',
            )}
          >
            {SUN_RAYS.map((sunRay) => (
              <span
                key={sunRay.rotation}
                className={cn('absolute inset-0 flex justify-center', sunRay.rotation)}
              >
                <span
                  className={cn(
                    'h-[3px] w-[2px] origin-bottom rounded-full bg-amber-400 transition-[transform,opacity] duration-300 ease-out-expo',
                    sunRay.delay,
                    isDark ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
                  )}
                />
              </span>
            ))}
          </span>

          {/* ดวงอาทิตย์ */}
          <span
            className={cn(
              'absolute size-5 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-orange-400 shadow-[0_1px_6px_-1px_rgba(217,119,6,0.6)] transition-[transform,opacity] ease-out-expo',
              isDark
                ? '-rotate-90 scale-50 opacity-0 duration-200'
                : 'rotate-0 scale-100 opacity-100 delay-150 duration-500',
            )}
          />

          {/* พระจันทร์เสี้ยว */}
          <svg
            viewBox='0 0 24 24'
            className={cn(
              'absolute size-5 fill-slate-100 drop-shadow-[0_0_5px_rgba(199,210,254,0.55)] transition-[transform,opacity] ease-out-expo',
              isDark
                ? 'rotate-0 scale-100 opacity-100 delay-150 duration-500'
                : 'rotate-90 scale-50 opacity-0 duration-200',
            )}
          >
            <path d='M21.3 13.6A9.2 9.2 0 1 1 10.4 2.7a7.2 7.2 0 0 0 10.9 10.9Z' />
            <circle cx='8.6' cy='15.6' r='1.5' className='fill-slate-300/70' />
            <circle cx='6.6' cy='10.8' r='1' className='fill-slate-300/55' />
            <circle cx='12.4' cy='18.6' r='0.9' className='fill-slate-300/45' />
          </svg>
        </span>
      </span>

    </button>
  )
}
