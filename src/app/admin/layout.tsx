import type { Metadata } from 'next'

import AdminShell from '@/features/admin/ui/AdminShell'
import { COPY } from '@/constants/copy'

export const metadata: Metadata = {
  title: COPY.admin.title,
  description: COPY.admin.description,
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
