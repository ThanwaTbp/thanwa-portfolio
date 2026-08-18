import { useEffect, useLayoutEffect } from 'react'

// ฝั่ง client ใช้ useLayoutEffect เพื่อกัน FOUC ส่วนฝั่ง server (SSR) ต้องใช้ useEffect แทน
// เพราะ useLayoutEffect จะ warning ถ้าเรียกตอน render บน server
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
