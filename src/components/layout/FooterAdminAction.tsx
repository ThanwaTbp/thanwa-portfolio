'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { COPY } from '@/constants/copy'

export default function FooterAdminAction() {
  const { isAuthenticated, openLogin } = useAuth()

  if (isAuthenticated) return null

  return (
    <button
      type='button'
      onClick={openLogin}
      className='text-xs text-subtle-foreground transition-colors hover:text-foreground'
    >
      {COPY.footer.adminAccess}
    </button>
  )
}
