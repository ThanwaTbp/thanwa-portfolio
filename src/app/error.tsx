'use client'

import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

import { buttonVariants } from '@/components/ui/Button'
import { GridPattern } from '@/components/common/GridPattern'
import { COPY } from '@/constants/copy'

export interface IErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: IErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className='relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden'>
      <GridPattern className='opacity-60' />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-1/2 left-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl'
      />

      <div className='relative z-10 mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8'>
        <div className='flex size-16 items-center justify-center rounded-full bg-surface-muted ring-8 ring-surface-muted/40'>
          <TriangleAlert className='size-7 text-accent' aria-hidden='true' />
        </div>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
          {COPY.error.title}
        </h1>
        <p className='text-base text-muted-foreground'>{COPY.error.description}</p>
        <div className='flex flex-col items-center gap-3 sm:flex-row'>
          <button
            type='button'
            onClick={reset}
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            {COPY.error.retry}
          </button>
          <Link href='/' className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            {COPY.error.backHome}
          </Link>
        </div>
      </div>
    </section>
  )
}
