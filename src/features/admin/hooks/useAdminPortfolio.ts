'use client'

import { useCallback, useEffect, useState } from 'react'

import type { IPortfolioData } from '@/types/portfolio-data'

interface IUseAdminPortfolioResult {
  data: IPortfolioData | null
  isLoading: boolean
  isSaving: boolean
  errorMessage: string | null
  refresh: () => Promise<void>
  save: (nextData: IPortfolioData) => Promise<boolean>
}

export function useAdminPortfolio(isEnabled: boolean): IUseAdminPortfolioResult {
  const [data, setData] = useState<IPortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(isEnabled)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!isEnabled) return

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/portfolio', { cache: 'no-store' })

      if (!response.ok) {
        throw new Error('Failed to load portfolio data')
      }

      const payload = (await response.json()) as IPortfolioData
      setData(payload)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load portfolio data'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled) return

    let isActive = true

    fetch('/api/portfolio', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to load portfolio data')
        return (await response.json()) as IPortfolioData
      })
      .then((payload) => {
        if (!isActive) return
        setData(payload)
      })
      .catch((error) => {
        if (!isActive) return
        const message = error instanceof Error ? error.message : 'Failed to load portfolio data'
        setErrorMessage(message)
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [isEnabled])

  const save = useCallback(async (nextData: IPortfolioData) => {
    setIsSaving(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData),
      })

      const payload = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to save portfolio data')
      }

      setData(nextData)
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save portfolio data'
      setErrorMessage(message)
      return false
    } finally {
      setIsSaving(false)
    }
  }, [])

  return {
    data: isEnabled ? data : null,
    isLoading: isEnabled ? isLoading : false,
    isSaving,
    errorMessage,
    refresh,
    save,
  }
}
