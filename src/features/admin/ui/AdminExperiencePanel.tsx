'use client'

import { useState } from 'react'
import { LoaderCircle, Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import TechMultiSelect from '@/components/ui/TechMultiSelect'
import { COPY } from '@/constants/copy'
import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { AdminSlideOver } from '@/features/admin/ui/AdminSlideOver'
import { AdminStringListField } from '@/features/admin/ui/AdminStringListField'
import { createEntityId } from '@/features/admin/utils'
import type { EmploymentType, IExperience } from '@/types/portfolio'

interface IExperienceDraft {
  id: string
  company: string
  position: string
  employmentType: EmploymentType
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
  companyUrl: string
  achievements: string[]
  techStack: string[]
}

const emptyDraft: IExperienceDraft = {
  id: '',
  company: '',
  position: '',
  employmentType: 'full-time',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  companyUrl: '',
  achievements: [],
  techStack: [],
}

function toDraft(exp: IExperience): IExperienceDraft {
  return {
    id: exp.id,
    company: exp.company,
    position: exp.position,
    employmentType: exp.employmentType,
    location: exp.location,
    startDate: exp.startDate,
    endDate: exp.endDate ?? '',
    isCurrent: exp.endDate === null,
    description: exp.description,
    companyUrl: exp.companyUrl ?? '',
    achievements: exp.achievements,
    techStack: exp.techStack,
  }
}

function fromDraft(draft: IExperienceDraft): IExperience {
  return {
    id: draft.id || createEntityId('exp'),
    company: draft.company.trim(),
    position: draft.position.trim(),
    employmentType: draft.employmentType,
    location: draft.location.trim(),
    startDate: draft.startDate.trim(),
    endDate: draft.isCurrent ? null : draft.endDate.trim() || null,
    description: draft.description.trim(),
    achievements: draft.achievements.map((a) => a.trim()).filter(Boolean),
    techStack: draft.techStack,
    companyUrl: draft.companyUrl.trim() || undefined,
  }
}

interface IAdminExperiencePanelProps {
  experiences: IExperience[]
  isSaving: boolean
  onSaveExperiences: (experiences: IExperience[]) => Promise<boolean>
}

export function AdminExperiencePanel({
  experiences,
  isSaving,
  onSaveExperiences,
}: IAdminExperiencePanelProps) {
  const [draft, setDraft] = useState<IExperienceDraft>(emptyDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { confirmDelete } = useAdminActionAlert()

  const openNew = () => {
    setEditingId(null)
    setDraft(emptyDraft)
    setShowForm(true)
  }

  const openEdit = (exp: IExperience) => {
    setEditingId(exp.id)
    setDraft(toDraft(exp))
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setDraft(emptyDraft)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = fromDraft(draft)
    const nextList = editingId
      ? experiences.map((e) => (e.id === editingId ? next : e))
      : [...experiences, next]
    const didSave = await onSaveExperiences(nextList)
    if (didSave) {
      closeForm()
    }
  }

  return (
    <div className='space-y-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-foreground'>
            {COPY.admin.experience.listTitle}
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            {experiences.length} entr{experiences.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>
        <button
          type='button'
          onClick={openNew}
          className={buttonVariants({ variant: 'primary', size: 'sm' })}
        >
          <Plus className='size-4' />
          {COPY.admin.experience.addAction}
        </button>
      </header>

      {experiences.length === 0 ? (
        <p className='py-12 text-center text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
      ) : (
        <div className='space-y-3'>
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className='flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-surface/60 px-5 py-4'
            >
              <div className='min-w-0'>
                <h3 className='font-medium text-foreground'>{exp.position}</h3>
                <p className='mt-0.5 truncate text-sm text-muted-foreground'>
                  {exp.company} · {exp.startDate} – {exp.endDate ?? 'Present'}
                </p>
              </div>
              <div className='flex shrink-0 gap-1.5'>
                <button
                  type='button'
                  onClick={() => openEdit(exp)}
                  className='inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-muted'
                >
                  <Pencil className='size-3' />
                </button>
                <button
                  type='button'
                  onClick={() => {
                    void (async () => {
                      const didConfirm = await confirmDelete()
                      if (!didConfirm) return
                      await onSaveExperiences(experiences.filter((e) => e.id !== exp.id))
                    })()
                  }}
                  className='inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400'
                >
                  <Trash2 className='size-3' />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AdminSlideOver open={showForm} onClose={closeForm}>
        <form
          onSubmit={(event) => void onSubmit(event)}
          className='flex h-full flex-col overflow-y-auto'
        >
          <div className='sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/95 px-6 py-4 backdrop-blur-sm'>
            <h2 className='text-base font-semibold text-foreground'>
              {editingId ? COPY.admin.experience.editTitle : COPY.admin.experience.createTitle}
            </h2>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={closeForm}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                {COPY.admin.actions.cancel}
              </button>
              <button
                type='submit'
                disabled={isSaving}
                className={buttonVariants({ variant: 'primary', size: 'sm' })}
              >
                {isSaving ? (
                  <LoaderCircle className='size-4 animate-spin' />
                ) : (
                  <Save className='size-4' />
                )}
                {COPY.admin.actions.save}
              </button>
            </div>
          </div>
          <div className='space-y-5 px-6 py-6'>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.experience.position}
              </span>
              <input
                value={draft.position}
                onChange={(e) => setDraft((d) => ({ ...d, position: e.target.value }))}
                className='admin-input'
                required
              />
            </label>
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.experience.company}
                </span>
                <input
                  value={draft.company}
                  onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.experience.companyUrl}
                </span>
                <input
                  value={draft.companyUrl}
                  onChange={(e) => setDraft((d) => ({ ...d, companyUrl: e.target.value }))}
                  className='admin-input'
                />
              </label>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.experience.employmentType}
                </span>
                <select
                  value={draft.employmentType}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, employmentType: e.target.value as EmploymentType }))
                  }
                  className='admin-select'
                >
                  {Object.entries(COPY.experience.employmentType).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.experience.location}
                </span>
                <input
                  value={draft.location}
                  onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.experience.startDate}
                </span>
                <input
                  value={draft.startDate}
                  onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.experience.endDate}
                </span>
                <input
                  value={draft.endDate}
                  onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))}
                  className='admin-input'
                  disabled={draft.isCurrent}
                />
              </label>
            </div>
            <label className='inline-flex cursor-pointer items-center gap-2.5 text-sm text-foreground'>
              <input
                type='checkbox'
                checked={draft.isCurrent}
                onChange={(e) => setDraft((d) => ({ ...d, isCurrent: e.target.checked }))}
                className='size-4 rounded border-border accent-accent'
              />
              {COPY.admin.experience.currentRole}
            </label>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.experience.description}
              </span>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                className='admin-textarea'
                rows={4}
              />
            </label>
            <AdminStringListField
              label={COPY.admin.experience.achievements}
              values={draft.achievements}
              onChange={(achievements) => setDraft((d) => ({ ...d, achievements }))}
            />
            <TechMultiSelect
              label={COPY.admin.experience.techStack}
              selectedNames={draft.techStack}
              onChangeSelected={(techStack) => setDraft((d) => ({ ...d, techStack }))}
            />
          </div>
        </form>
      </AdminSlideOver>
    </div>
  )
}
