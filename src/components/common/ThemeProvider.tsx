'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface IThemeProvider {
  children: ReactNode
}

// ครอบทั้งแอปด้วย next-themes เพื่อสลับ light/dark ผ่านคลาส .dark บน html
export default function ThemeProvider({ children }: IThemeProvider) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
