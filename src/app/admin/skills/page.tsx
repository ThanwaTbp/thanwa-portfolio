import type { Metadata } from 'next'

import { COPY } from '@/constants/copy'
import { AdminSkillsScreen } from '@/features/admin/ui/AdminPages'

export const metadata: Metadata = {
  title: COPY.admin.tabs.skills,
}

export default function AdminSkillsPage() {
  return <AdminSkillsScreen />
}
