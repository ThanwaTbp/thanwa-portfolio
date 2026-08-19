import type { Metadata } from 'next'

import AdminDashboard from '@/features/admin/ui/AdminDashboard'
import { COPY } from '@/constants/copy'

export const metadata: Metadata = {
  title: COPY.admin.title,
  description: COPY.admin.description,
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminDashboard />
}
