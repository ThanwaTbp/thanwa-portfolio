'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const SLIDE_DURATION_MS = 320

interface IAdminSlideOverProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function AdminSlideOver({ open, onClose, children }: IAdminSlideOverProps) {
  const [shouldRender, setShouldRender] = useState(open)
  const [isActive, setIsActive] = useState(open)
  const [prevOpen, setPrevOpen] = useState(open)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setShouldRender(true)
      setIsActive(false)
    } else {
      setIsActive(false)
    }
  }

  useEffect(() => {
    if (!open || !shouldRender) return

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsActive(true))
    })

    return () => cancelAnimationFrame(frame)
  }, [open, shouldRender])

  useEffect(() => {
    if (open || !shouldRender) return

    const timeout = window.setTimeout(() => setShouldRender(false), SLIDE_DURATION_MS)
    return () => window.clearTimeout(timeout)
  }, [open, shouldRender])

  useEffect(() => {
    if (!shouldRender) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [shouldRender])

  if (!shouldRender) return null

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-end'>
      <button
        type='button'
        aria-label='Close'
        className={cn(
          'absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ease-out',
          isActive ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-border/60 bg-background shadow-[-24px_0_80px_-40px_rgba(35,30,80,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-animate',
          isActive ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {children}
      </div>
    </div>
  )
}
