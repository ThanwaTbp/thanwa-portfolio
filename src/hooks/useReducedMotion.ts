'use client'

import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// อ่านค่าเริ่มต้นแบบ lazy — ฝั่ง server ไม่มี window จึงคืน false เสมอ (ไม่มีผลต่อ hydration
// เพราะ hook นี้ไม่ได้ถูกใช้กำหนด JSX โดยตรง มีแต่ component ที่ใช้ค่านี้ใน useGSAP หลัง mount เท่านั้น)
function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/**
 * hook อ่านค่า prefers-reduced-motion และ subscribe การเปลี่ยนแปลงแบบ real-time
 * เผื่อผู้ใช้สลับ setting ระหว่างใช้งานเว็บอยู่ (เช่น เปิด/ปิดจาก system settings)
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY)

    const onChangeReducedMotion = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    mediaQueryList.addEventListener('change', onChangeReducedMotion)
    return () => mediaQueryList.removeEventListener('change', onChangeReducedMotion)
  }, [])

  return reducedMotion
}
