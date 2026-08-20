import type { Metadata } from 'next'

import { COPY } from '@/constants/copy'
import { AdminProjectsScreen } from '@/features/admin/ui/AdminPages'

export const metadata: Metadata = {
  title: COPY.admin.tabs.projects,
}

export default function AdminProjectsPage() {
  return <AdminProjectsScreen />
}
