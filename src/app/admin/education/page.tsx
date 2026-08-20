import type { Metadata } from 'next'

import { COPY } from '@/constants/copy'
import { AdminEducationScreen } from '@/features/admin/ui/AdminPages'

export const metadata: Metadata = {
  title: COPY.admin.tabs.education,
}

export default function AdminEducationPage() {
  return <AdminEducationScreen />
}
