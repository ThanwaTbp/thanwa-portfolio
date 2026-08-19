'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: IModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6'>
      <button
        type='button'
        aria-label='Close dialog backdrop'
        className='absolute inset-0 bg-background/70 backdrop-blur-sm'
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        className={cn(
          'relative z-10 w-full max-w-md translate-y-0 opacity-100 transition-[transform,opacity] duration-300 ease-out',
          className,
        )}
      >
        <div className='overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface shadow-[0_28px_90px_-40px_rgba(35,30,80,0.65)]'>
          <div className='flex items-start justify-between gap-4 border-b border-border/75 px-5 py-5 sm:px-6'>
            <div className='space-y-1'>
              <h2 id='modal-title' className='text-lg font-semibold tracking-tight text-foreground'>
                {title}
              </h2>
              {description ? (
                <p className='text-sm leading-6 text-muted-foreground'>{description}</p>
              ) : null}
            </div>
            <button
              type='button'
              onClick={onClose}
              className='inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground'
            >
              <X className='size-4' aria-hidden='true' />
            </button>
          </div>
          <div className='px-5 py-5 sm:px-6 sm:py-6'>{children}</div>
        </div>
      </div>
    </div>
  )
}
