import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import BackToTopButton from '@/components/common/BackToTopButton'
import { PageTransition } from '@/components/common/PageTransition'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className='flex-1'>
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      <BackToTopButton />
    </>
  )
}
