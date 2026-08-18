import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// register plugin แค่ครั้งเดียวและต้องกัน SSR เพราะ gsap ต้องพึ่ง window/document
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.6,
  })

  // ลด work ตอน resize บนมือถือ (address bar ย่อ/ขยายไม่ควร trigger recalculate)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger }

/** ระยะเวลา animation มาตรฐานที่ใช้ร่วมกันทั้งเว็บ (หน่วยวินาที) */
export const ANIMATION_DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const

/** เส้นโค้ง easing มาตรฐาน */
export const ANIMATION_EASE = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  soft: 'power2.out',
} as const

/** ระยะหน่วง stagger มาตรฐานสำหรับ list/grid */
export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const

/**
 * ตรวจว่าผู้ใช้เปิด prefers-reduced-motion ไว้หรือไม่ (SSR-safe)
 * ใช้เช็คครั้งเดียวตอน mount ได้ ถ้าต้องการ subscribe การเปลี่ยนแปลงให้ใช้ useReducedMotion แทน
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
