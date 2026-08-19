'use client'

import { useState } from 'react'
import { LoaderCircle, LockKeyhole, ShieldAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import Modal from '@/components/ui/Modal'
import { buttonVariants } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import { cn } from '@/lib/utils'

export default function LoginModal() {
  const router = useRouter()
  const { isLoginOpen, closeLogin, refreshSession, authConfigured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const payload = (await response.json()) as { error?: string }

      if (!response.ok) {
        setErrorMessage(payload.error ?? COPY.auth.invalidCredentials)
        return
      }

      setEmail('')
      setPassword('')
      await refreshSession()
      closeLogin()
      router.push('/admin')
    } catch {
      setErrorMessage(COPY.auth.networkError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={closeLogin}
      title={COPY.auth.title}
      description={COPY.auth.description}
    >
      {!authConfigured ? (
        <div className='rounded-2xl border border-amber-500/25 bg-amber-500/8 p-4'>
          <div className='flex items-start gap-3'>
            <ShieldAlert className='mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400' />
            <div className='space-y-1'>
              <p className='text-sm font-medium text-foreground'>{COPY.auth.setupTitle}</p>
              <p className='text-sm leading-6 text-muted-foreground'>
                {COPY.auth.setupDescription}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form className='space-y-4' onSubmit={onSubmit}>
          <label className='block space-y-2'>
            <span className='text-sm font-medium text-foreground'>{COPY.auth.emailLabel}</span>
            <input
              type='email'
              autoComplete='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder='admin@example.com'
              className='h-11 w-full rounded-2xl border border-border/80 bg-background/80 px-4 text-sm text-foreground outline-none transition-colors focus:border-accent'
              required
            />
          </label>

          <label className='block space-y-2'>
            <span className='text-sm font-medium text-foreground'>{COPY.auth.passwordLabel}</span>
            <input
              type='password'
              autoComplete='current-password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder='••••••••'
              className='h-11 w-full rounded-2xl border border-border/80 bg-background/80 px-4 text-sm text-foreground outline-none transition-colors focus:border-accent'
              required
            />
          </label>

          {errorMessage ? (
            <p className='rounded-2xl border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive'>
              {errorMessage}
            </p>
          ) : null}

          <button
            type='submit'
            disabled={isSubmitting}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full')}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className='size-4 animate-spin' aria-hidden='true' />
                {COPY.auth.submitting}
              </>
            ) : (
              <>
                <LockKeyhole className='size-4' aria-hidden='true' />
                {COPY.auth.submit}
              </>
            )}
          </button>

          <p className='text-center text-xs leading-5 text-subtle-foreground'>{COPY.auth.helper}</p>
        </form>
      )}
    </Modal>
  )
}
