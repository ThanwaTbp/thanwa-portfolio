'use client'

import { type ReactNode } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LoaderCircle,
  LogOut,
  Sparkles,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import { buttonVariants } from '@/components/ui/Button'
import { COPY, formatPersistenceMode } from '@/constants/copy'
import { ADMIN_ROUTES, getAdminTabFromPathname, type AdminTab } from '@/features/admin/constants'
import { AdminActionAlertProvider } from '@/features/admin/hooks/useAdminActionAlert'
import { AdminWorkspaceProvider, useAdminWorkspace } from '@/features/admin/hooks/useAdminWorkspace'
import { cn } from '@/lib/utils'

const ADMIN_NAV_ITEMS: { id: AdminTab; icon: typeof FolderKanban }[] = [
  { id: 'projects', icon: FolderKanban },
  { id: 'profile', icon: User },
  { id: 'experience', icon: Briefcase },
  { id: 'education', icon: GraduationCap },
  { id: 'skills', icon: Sparkles },
]

function AdminLoadingState() {
  return (
    <div className='flex min-h-dvh items-center justify-center'>
      <LoaderCircle className='size-6 animate-spin text-muted-foreground' />
    </div>
  )
}

interface IAdminShellProps {
  children: ReactNode
}

function AdminWorkspaceError() {
  const { errorMessage } = useAdminWorkspace()

  if (!errorMessage) return null

  return (
    <div className='mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300'>
      {errorMessage}
    </div>
  )
}

export default function AdminShell({ children }: IAdminShellProps) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    openLogin,
    logout,
    email,
    persistenceMode,
  } = useAuth()
  const pathname = usePathname()
  const activeTab = getAdminTabFromPathname(pathname)

  if (isAuthLoading) {
    return <AdminLoadingState />
  }

  if (!isAuthenticated) {
    return (
      <section className='flex min-h-dvh items-center justify-center px-4'>
        <div className='w-full max-w-sm text-center'>
          <div className='mx-auto mb-6 flex size-16 items-center justify-center rounded-xl bg-accent/10'>
            <BookOpen className='size-7 text-accent' />
          </div>
          <h1 className='text-xl font-semibold text-foreground'>{COPY.admin.gateTitle}</h1>
          <p className='mt-2 text-sm text-muted-foreground'>{COPY.admin.gateDescription}</p>
          <button
            type='button'
            onClick={openLogin}
            className={cn(buttonVariants({ variant: 'primary' }), 'mt-6 w-full')}
          >
            {COPY.admin.gateAction}
          </button>
        </div>
      </section>
    )
  }

  return (
    <AdminActionAlertProvider>
      <AdminWorkspaceProvider isEnabled fallback={<AdminLoadingState />}>
        <div className='flex min-h-dvh max-w-[90rem] flex-col lg:h-dvh lg:flex-row lg:overflow-hidden'>
          <aside className='shrink-0 border-b border-border/40 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:flex-col lg:overflow-hidden lg:border-r lg:border-b-0 lg:border-border/40'>
            <div className='hidden px-6 pt-8 pb-6 lg:block'>
              <div className='flex items-center gap-2.5'>
                <div className='flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground'>
                  <BookOpen className='size-4' />
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold text-foreground'>Portfolio</p>
                  <p className='truncate text-xs text-muted-foreground'>{email ?? 'admin'}</p>
                </div>
              </div>
              <div className='mt-3 flex items-center gap-1.5'>
                <span className='inline-block size-1.5 rounded-full bg-emerald-500' />
                <span className='text-[0.7rem] text-muted-foreground'>
                  {formatPersistenceMode(persistenceMode)}
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between px-4 py-3 lg:hidden'>
              <div className='flex items-center gap-2'>
                <div className='flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground'>
                  <BookOpen className='size-3.5' />
                </div>
                <span className='text-sm font-semibold text-foreground'>Portfolio</span>
              </div>
              <div className='flex items-center gap-2'>
                <Link
                  href='/'
                  className='rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground'
                >
                  <ArrowLeft className='size-3.5' />
                </Link>
                <button
                  type='button'
                  onClick={() => void logout()}
                  className='rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground'
                >
                  <LogOut className='size-3.5' />
                </button>
              </div>
            </div>

            <nav className='flex gap-0.5 overflow-x-auto px-3 pb-3 lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:px-3 lg:pb-0'>
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <Link
                    key={item.id}
                    href={ADMIN_ROUTES[item.id]}
                    className={cn(
                      'group relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent/12 text-accent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
                        : 'text-muted-foreground hover:bg-surface-muted/80 hover:text-foreground',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'size-[1.125rem] transition-colors',
                        isActive
                          ? 'text-accent'
                          : 'text-subtle-foreground group-hover:text-foreground',
                      )}
                    />
                    {COPY.admin.tabs[item.id]}
                    {isActive ? (
                      <span className='absolute top-1/2 left-0 hidden h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent lg:block' />
                    ) : null}
                  </Link>
                )
              })}
            </nav>

            <div className='hidden border-t border-border/40 px-3 py-4 lg:block'>
              <Link
                href='/'
                className='flex items-center gap-2.5 rounded-xl px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-surface-muted/80 hover:text-foreground'
              >
                <ArrowLeft className='size-4' />
                Back to site
              </Link>
              <button
                type='button'
                onClick={() => void logout()}
                className='mt-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400'
              >
                <LogOut className='size-4' />
                {COPY.admin.logout}
              </button>
            </div>
          </aside>

          <main className='flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10'>
            <AdminWorkspaceError />
            {children}
          </main>
        </div>
      </AdminWorkspaceProvider>
    </AdminActionAlertProvider>
  )
}
