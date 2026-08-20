'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ADMIN_ROUTES } from '@/features/admin/constants'
import { PROFILE_SECTION_IDS, type ProfileSection } from '@/features/admin/ui/AdminProfilePanel'

function isProfileSection(value: string | null): value is ProfileSection {
  return Boolean(value && PROFILE_SECTION_IDS.includes(value as ProfileSection))
}

export function useProfileSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get('section')
  const profileSection: ProfileSection = isProfileSection(sectionParam) ? sectionParam : 'identity'

  const onChangeProfileSection = useCallback(
    (section: ProfileSection) => {
      router.replace(`${ADMIN_ROUTES.profile}?section=${section}`, { scroll: false })
    },
    [router],
  )

  return { profileSection, onChangeProfileSection }
}
