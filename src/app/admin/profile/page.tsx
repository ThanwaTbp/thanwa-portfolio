import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

import { COPY } from '@/constants/copy'
import { AdminProfileScreen } from '@/features/admin/ui/AdminPages'

export const metadata: Metadata = {
  title: COPY.admin.tabs.profile,
}

export default function AdminProfilePage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center py-16'>
          <LoaderCircle className='size-6 animate-spin text-muted-foreground' />
        </div>
      }
    >
      <AdminProfileScreen />
    </Suspense>
  )
}
