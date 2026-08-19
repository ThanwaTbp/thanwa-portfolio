'use client'

import Link from 'next/link'

import { useAuth } from '@/components/auth/AuthProvider'
import { buttonVariants } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import { cn } from '@/lib/utils'

export default function AuthNavActions({ className }: { className?: string }) {
  const { isAuthenticated, isLoading, openLogin, logout } = useAuth()

  if (isLoading) {
    return (
      <span
        className={cn('inline-flex h-9 min-w-[4.5rem] items-center justify-center', className)}
      />
    )
  }

  if (isAuthenticated) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Link href='/admin' className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          {COPY.nav.admin}
        </Link>
        <button
          type='button'
          onClick={() => void logout()}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          {COPY.nav.logout}
        </button>
      </div>
    )
  }

  return (
    <button
      type='button'
      onClick={openLogin}
      className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), className)}
    >
      {COPY.nav.login}
    </button>
  )
}
