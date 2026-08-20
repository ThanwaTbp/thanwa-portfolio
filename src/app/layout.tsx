import type { Metadata } from 'next'
import { Bai_Jamjuree, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import ThemeProvider from '@/components/common/ThemeProvider'
import { AuthProvider } from '@/components/auth/AuthProvider'
import LoginModal from '@/components/auth/LoginModal'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import { COPY } from '@/constants/copy'

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-bai-jamjuree',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// TODO: เปลี่ยนเป็นโดเมนจริงตอน deploy
const siteUrl = 'https://thanwa-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: COPY.common.siteName,
    template: '%s · Thanwa',
  },
  description: COPY.common.tagline,
  openGraph: {
    title: COPY.common.siteName,
    description: COPY.common.tagline,
    url: siteUrl,
    siteName: COPY.common.siteName,
    locale: 'en',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      suppressHydrationWarning
      className={`${baiJamjuree.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className='flex min-h-dvh flex-col font-sans text-foreground'>
        <ThemeProvider>
          <AuthProvider>
            <LoadingIndicator />
            {children}
            <LoginModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
