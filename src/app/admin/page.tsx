import { redirect } from 'next/navigation'

import { DEFAULT_ADMIN_ROUTE } from '@/features/admin/constants'

export default function AdminIndexPage() {
  redirect(DEFAULT_ADMIN_ROUTE)
}
