'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface IThemeProvider {
  children: ReactNode
}

// ครอบทั้งแอปด้วย next-themes เพื่อสลับ light/dark ผ่านคลาส .dark บน html
// ห้ามใส่ disableTransitionOnChange เพราะมันยัด transition:none !important ตอนสลับธีม
// ทำให้อนิเมชันของ ThemeToggle (ดวงอาทิตย์/พระจันทร์) ถูกตัดทิ้งจนกระโดดทันที
export default function ThemeProvider({ children }: IThemeProvider) {
  const scriptProps =
    typeof window === 'undefined' ? undefined : ({ type: 'application/json' } as const)

  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  )
}
