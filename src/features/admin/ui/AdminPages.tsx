'use client'

import { useAdminWorkspace } from '@/features/admin/hooks/useAdminWorkspace'
import { useProfileSection } from '@/features/admin/hooks/useAdminNavigation'
import { AdminEducationPanel } from '@/features/admin/ui/AdminEducationPanel'
import { AdminExperiencePanel } from '@/features/admin/ui/AdminExperiencePanel'
import { AdminProfilePanel } from '@/features/admin/ui/AdminProfilePanel'
import { AdminProjectPanel } from '@/features/admin/ui/AdminProjectPanel'
import { AdminSkillPanel } from '@/features/admin/ui/AdminSkillPanel'

export function AdminProjectsScreen() {
  const { data, isSaving, onSaveProjects } = useAdminWorkspace()

  return (
    <AdminProjectPanel
      projects={data.projects}
      isSaving={isSaving}
      onSaveProjects={onSaveProjects}
    />
  )
}

export function AdminProfileScreen() {
  const { data, isSaving, onSaveProfile } = useAdminWorkspace()
  const { profileSection, onChangeProfileSection } = useProfileSection()

  return (
    <AdminProfilePanel
      key={JSON.stringify(data.profile)}
      profile={data.profile}
      isSaving={isSaving}
      section={profileSection}
      onSectionChange={onChangeProfileSection}
      onSaveProfile={onSaveProfile}
    />
  )
}

export function AdminExperienceScreen() {
  const { data, isSaving, onSaveExperiences } = useAdminWorkspace()

  return (
    <AdminExperiencePanel
      experiences={data.experiences}
      isSaving={isSaving}
      onSaveExperiences={onSaveExperiences}
    />
  )
}

export function AdminEducationScreen() {
  const { data, isSaving, onSaveEducations } = useAdminWorkspace()

  return (
    <AdminEducationPanel
      educations={data.educations}
      isSaving={isSaving}
      onSaveEducations={onSaveEducations}
    />
  )
}

export function AdminSkillsScreen() {
  const { data, isSaving, onSaveSkillCategories } = useAdminWorkspace()

  return (
    <AdminSkillPanel
      skillCategories={data.skillCategories}
      isSaving={isSaving}
      onSaveSkillCategories={onSaveSkillCategories}
    />
  )
}
