import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { buttonVariants } from '@/components/ui/Button'
import { GridPattern } from '@/components/common/GridPattern'

// หน้า 404 ระดับ locale — ขึ้นเมื่อเรียก notFound() ภายใต้ /[locale]/** (เช่น slug ที่ไม่มีอยู่จริง)
export default async function NotFound() {
  const translateNotFound = await getTranslations('notFound')

  return (
    <section className='relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden'>
      <GridPattern className='opacity-60' />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-1/2 left-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl'
      />

      <div className='relative z-10 mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8'>
        <p className='text-gradient text-7xl font-bold tracking-tight sm:text-8xl'>404</p>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
          {translateNotFound('title')}
        </h1>
        <p className='text-base text-muted-foreground'>{translateNotFound('description')}</p>
        <Link href='/' className={buttonVariants({ variant: 'primary', size: 'lg' })}>
          {translateNotFound('backHome')}
        </Link>
      </div>
    </section>
  )
}
