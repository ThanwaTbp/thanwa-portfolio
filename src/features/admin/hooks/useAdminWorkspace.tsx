'use client'

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'

import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { useAdminPortfolio } from '@/features/admin/hooks/useAdminPortfolio'
import type { IEducation, IExperience, IProfile, IProject, ISkillCategory } from '@/types/portfolio'
import type { IPortfolioData } from '@/types/portfolio-data'

interface IAdminWorkspaceContext {
  data: IPortfolioData
  isSaving: boolean
  errorMessage: string | null
  onSaveProjects: (projects: IProject[]) => Promise<boolean>
  onSaveProfile: (profile: IProfile) => Promise<boolean>
  onSaveExperiences: (experiences: IExperience[]) => Promise<boolean>
  onSaveEducations: (educations: IEducation[]) => Promise<boolean>
  onSaveSkillCategories: (skillCategories: ISkillCategory[]) => Promise<boolean>
}

const AdminWorkspaceContext = createContext<IAdminWorkspaceContext | null>(null)

interface IAdminWorkspaceProviderProps {
  isEnabled: boolean
  fallback: ReactNode
  children: ReactNode
}

export function AdminWorkspaceProvider({
  isEnabled,
  fallback,
  children,
}: IAdminWorkspaceProviderProps) {
  const { data, isSaving, errorMessage, refresh, save } = useAdminPortfolio(isEnabled)
  const { success, error } = useAdminActionAlert()

  const saveAndNotify = useCallback(
    async (nextData: IPortfolioData) => {
      const didSave = await save(nextData)
      if (didSave) {
        await success()
        return true
      }
      await error()
      return false
    },
    [error, save, success],
  )

  const value = useMemo(() => {
    if (!data) return null

    return {
      data,
      isSaving,
      errorMessage,
      onSaveProjects: (projects: IProject[]) => saveAndNotify({ ...data, projects }),
      onSaveProfile: (profile: IProfile) => saveAndNotify({ ...data, profile }),
      onSaveExperiences: (experiences: IExperience[]) => saveAndNotify({ ...data, experiences }),
      onSaveEducations: (educations: IEducation[]) => saveAndNotify({ ...data, educations }),
      onSaveSkillCategories: (skillCategories: ISkillCategory[]) =>
        saveAndNotify({ ...data, skillCategories }),
    }
  }, [data, errorMessage, isSaving, saveAndNotify])

  if (!value && errorMessage) {
    return (
      <div className='flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center'>
        <p role='alert' className='max-w-md text-sm text-red-600 dark:text-red-400'>
          {errorMessage}
        </p>
        <button
          type='button'
          onClick={() => void refresh()}
          className='rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-muted'
        >
          Try again
        </button>
      </div>
    )
  }

  if (!value) return fallback

  return <AdminWorkspaceContext.Provider value={value}>{children}</AdminWorkspaceContext.Provider>
}

export function useAdminWorkspace() {
  const context = useContext(AdminWorkspaceContext)

  if (!context) {
    throw new Error('useAdminWorkspace must be used within AdminWorkspaceProvider')
  }

  return context
}
