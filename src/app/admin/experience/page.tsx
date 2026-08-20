import type { Metadata } from 'next'

import { COPY } from '@/constants/copy'
import { AdminExperienceScreen } from '@/features/admin/ui/AdminPages'

export const metadata: Metadata = {
  title: COPY.admin.tabs.experience,
}

export default function AdminExperiencePage() {
  return <AdminExperienceScreen />
}
