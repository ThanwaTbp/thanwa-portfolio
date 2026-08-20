'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

interface IAuthSessionResponse {
  authenticated: boolean
  email: string | null
  authConfigured: boolean
  persistenceMode: 'appwrite' | 'local' | 'defaults'
}

interface IAuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  email: string | null
  authConfigured: boolean
  persistenceMode: IAuthSessionResponse['persistenceMode']
  isLoginOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  refreshSession: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<IAuthContextValue | null>(null)

async function fetchSession(): Promise<IAuthSessionResponse> {
  const response = await fetch('/api/auth/session', { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('Failed to load session')
  }

  return (await response.json()) as IAuthSessionResponse
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<IAuthSessionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const refreshSession = useCallback(async () => {
    try {
      const nextSession = await fetchSession()
      setSession(nextSession)
    } catch {
      setSession({
        authenticated: false,
        email: null,
        authConfigured: false,
        persistenceMode: 'defaults',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const didFetchRef = useRef(false)

  useEffect(() => {
    if (didFetchRef.current) return
    didFetchRef.current = true

    fetchSession()
      .then((nextSession) => {
        setSession(nextSession)
      })
      .catch(() => {
        setSession({
          authenticated: false,
          email: null,
          authConfigured: false,
          persistenceMode: 'defaults',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const openLogin = useCallback(() => setIsLoginOpen(true), [])
  const closeLogin = useCallback(() => setIsLoginOpen(false), [])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    await refreshSession()
  }, [refreshSession])

  const value = useMemo<IAuthContextValue>(
    () => ({
      isAuthenticated: session?.authenticated ?? false,
      isLoading,
      email: session?.email ?? null,
      authConfigured: session?.authConfigured ?? false,
      persistenceMode: session?.persistenceMode ?? 'defaults',
      isLoginOpen,
      openLogin,
      closeLogin,
      refreshSession,
      logout,
    }),
    [session, isLoading, isLoginOpen, openLogin, closeLogin, refreshSession, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
