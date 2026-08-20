'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { CheckCircle2, CircleX, Sparkles } from 'lucide-react'

import { ActionAlert, type ActionAlertTone } from '@/components/ui/ActionAlert'
import { COPY } from '@/constants/copy'

interface IConfirmOptions {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

interface INoticeOptions {
  title?: string
  description?: string
  confirmLabel?: string
}

interface IAlertState {
  tone: ActionAlertTone
  title: string
  description?: string
  confirmLabel: string
  cancelLabel?: string
}

type ToastTone = 'success' | 'error'

interface IToastState {
  id: string
  tone: ToastTone
  title: string
  description?: string
}

interface IAdminActionAlertContext {
  confirmDelete: (options?: IConfirmOptions) => Promise<boolean>
  success: (options?: INoticeOptions) => Promise<void>
  error: (options?: INoticeOptions) => Promise<void>
}

const AdminActionAlertContext = createContext<IAdminActionAlertContext | null>(null)

export function AdminActionAlertProvider({ children }: { children: ReactNode }) {
  const [alertState, setAlertState] = useState<IAlertState | null>(null)
  const [toasts, setToasts] = useState<IToastState[]>([])
  const resolverRef = useRef<((didConfirm: boolean) => void) | null>(null)

  const closeAlert = useCallback((didConfirm: boolean) => {
    resolverRef.current?.(didConfirm)
    resolverRef.current = null
    setAlertState(null)
  }, [])

  const openAlert = useCallback((nextState: IAlertState) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current?.(false)
      resolverRef.current = resolve
      setAlertState(nextState)
    })
  }, [])

  const pushToast = useCallback(
    ({ tone, title, description }: Pick<IToastState, 'tone' | 'title' | 'description'>) => {
      const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`

      setToasts((current) => [...current, { id, tone, title, description }])

      window.setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id))
      }, 2000)
    },
    [],
  )

  const confirmDelete = useCallback(
    async (options?: IConfirmOptions) => {
      return openAlert({
        tone: 'danger',
        title: options?.title ?? COPY.admin.confirm.deleteTitle,
        description: options?.description ?? COPY.admin.confirm.deleteDescription,
        confirmLabel: options?.confirmLabel ?? COPY.admin.confirm.deleteConfirm,
        cancelLabel: options?.cancelLabel ?? COPY.admin.confirm.deleteCancel,
      })
    },
    [openAlert],
  )

  const success = useCallback(
    async (options?: INoticeOptions) => {
      pushToast({
        tone: 'success',
        title: options?.title ?? COPY.admin.alert.saveTitle,
        description: options?.description ?? COPY.admin.alert.saveDescription,
      })
    },
    [pushToast],
  )

  const error = useCallback(
    async (options?: INoticeOptions) => {
      pushToast({
        tone: 'error',
        title: options?.title ?? COPY.admin.alert.errorTitle,
        description: options?.description ?? COPY.admin.alert.errorDescription,
      })
    },
    [pushToast],
  )

  const value = useMemo(() => ({ confirmDelete, success, error }), [confirmDelete, success, error])

  return (
    <AdminActionAlertContext.Provider value={value}>
      {children}
      <div className='pointer-events-none fixed right-4 bottom-4 z-[140] flex flex-col-reverse gap-2'>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className='pointer-events-auto w-[20rem] rounded-2xl border border-border/70 bg-surface/90 px-4 py-3 shadow-[0_18px_70px_-35px_rgba(35,30,80,0.65)] animate-[toastIn_420ms_ease-out] will-animate'
            role='status'
            aria-live='polite'
          >
            <div className='flex items-start gap-3'>
              <div
                className={
                  toast.tone === 'success'
                    ? 'flex size-10 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-500'
                    : 'flex size-10 items-center justify-center rounded-xl bg-red-500/12 text-red-500'
                }
              >
                {toast.tone === 'success' ? (
                  <CheckCircle2 className='size-5' />
                ) : (
                  <CircleX className='size-5' />
                )}
                <span className='sr-only'>notification</span>
              </div>

              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='truncate font-semibold text-foreground'>
                    {toast.tone === 'success' ? (
                      <span className='inline-flex items-center gap-2'>
                        {toast.title}
                        <Sparkles className='size-3.5 text-accent' />
                      </span>
                    ) : (
                      toast.title
                    )}
                  </p>
                </div>
                {toast.description ? (
                  <p className='mt-1 text-sm leading-5 text-muted-foreground'>
                    {toast.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {alertState ? (
        <ActionAlert
          isOpen
          tone={alertState.tone}
          title={alertState.title}
          description={alertState.description}
          confirmLabel={alertState.confirmLabel}
          cancelLabel={alertState.cancelLabel}
          onConfirm={() => closeAlert(true)}
          onCancel={() => closeAlert(false)}
        />
      ) : null}
    </AdminActionAlertContext.Provider>
  )
}

export function useAdminActionAlert() {
  const context = useContext(AdminActionAlertContext)

  if (!context) {
    throw new Error('useAdminActionAlert must be used within AdminActionAlertProvider')
  }

  return context
}
