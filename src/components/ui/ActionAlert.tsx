'use client'

import { useEffect } from 'react'
import { AlertTriangle, Check, LoaderCircle, X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export type ActionAlertTone = 'danger' | 'success' | 'error'

export interface IActionAlertProps {
  isOpen: boolean
  tone: ActionAlertTone
  title: string
  description?: string
  confirmLabel: string
  cancelLabel?: string
  isLoading?: boolean
  onConfirm: () => void
  onCancel?: () => void
}

const TONE_STYLES: Record<ActionAlertTone, { iconWrap: string; icon: typeof Check }> = {
  danger: {
    iconWrap: 'bg-red-500/12 text-red-500',
    icon: AlertTriangle,
  },
  success: {
    iconWrap: 'bg-emerald-500/12 text-emerald-500',
    icon: Check,
  },
  error: {
    iconWrap: 'bg-red-500/12 text-red-500',
    icon: X,
  },
}

export function ActionAlert({
  isOpen,
  tone,
  title,
  description,
  confirmLabel,
  cancelLabel,
  isLoading = false,
  onConfirm,
  onCancel,
}: IActionAlertProps) {
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) onCancel?.()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, isLoading, onCancel])

  if (!isOpen) return null

  const Icon = TONE_STYLES[tone].icon
  const showCancel = Boolean(cancelLabel && onCancel)

  return (
    <div className='fixed inset-0 z-[120] flex items-center justify-center p-4'>
      <button
        type='button'
        aria-label='Close alert'
        className='absolute inset-0 bg-background/70 backdrop-blur-sm'
        onClick={() => {
          if (!isLoading) onCancel?.()
        }}
      />

      <div
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='action-alert-title'
        className='relative z-10 w-full max-w-sm rounded-2xl border border-border/70 bg-surface p-6 text-center shadow-[0_24px_80px_-36px_rgba(35,30,80,0.55)] animate-[toastIn_420ms_ease-out] will-animate'
      >
        <div
          className={cn(
            'mx-auto mb-4 flex size-14 items-center justify-center rounded-full',
            TONE_STYLES[tone].iconWrap,
          )}
        >
          <Icon className='size-7' strokeWidth={2.25} />
        </div>

        <h2 id='action-alert-title' className='text-lg font-semibold text-foreground'>
          {title}
        </h2>
        {description ? (
          <p className='mt-2 text-sm leading-6 text-muted-foreground'>{description}</p>
        ) : null}

        <div className={cn('mt-6 flex gap-3', showCancel ? '' : 'justify-center')}>
          {showCancel ? (
            <button
              type='button'
              onClick={onCancel}
              disabled={isLoading}
              className={cn(buttonVariants({ variant: 'outline' }), 'flex-1')}
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              showCancel ? 'flex-1' : 'min-w-28',
              tone === 'success'
                ? buttonVariants({ variant: 'primary' })
                : 'rounded-full px-4 py-2.5 text-sm font-medium text-white transition-colors bg-red-500 hover:bg-red-600',
            )}
          >
            {isLoading ? <LoaderCircle className='mx-auto size-4 animate-spin' /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
