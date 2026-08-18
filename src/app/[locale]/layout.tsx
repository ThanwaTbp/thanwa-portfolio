import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Bai_Jamjuree } from 'next/font/google'
import { routing } from '@/i18n/routing'
import ThemeProvider from '@/components/common/ThemeProvider'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin', 'thai'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-bai-jamjuree',
  display: 'swap',
})

// TODO: เปลี่ยนเป็นโดเมนจริงตอน deploy
const siteUrl = 'https://thanwa-portfolio.vercel.app'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const translate = await getTranslations({ locale, namespace: 'common' })

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: translate('siteName'),
      template: '%s · Thanwa',
    },
    description: translate('tagline'),
    openGraph: {
      title: translate('siteName'),
      description: translate('tagline'),
      url: `${siteUrl}/${locale}`,
      siteName: translate('siteName'),
      locale,
      type: 'website',
    },
    alternates: {
      languages: {
        en: `${siteUrl}/en`,
        th: `${siteUrl}/th`,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  // guard กัน locale ที่ไม่รองรับหลุดเข้ามาถึง layout — ให้ตอบ 404 ทันที
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // เปิด static rendering ให้กับ route นี้และ route ลูกทั้งหมด
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${baiJamjuree.variable} h-full antialiased`}
    >
      <body className='flex min-h-dvh flex-col bg-background font-sans text-foreground'>
        <NextIntlClientProvider>
          <ThemeProvider>
            <SiteHeader />
            <main className='flex-1'>{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
