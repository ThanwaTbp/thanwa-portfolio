'use client'

import { useState } from 'react'
import { LoaderCircle, Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { AdminSlideOver } from '@/features/admin/ui/AdminSlideOver'
import { AdminStringListField } from '@/features/admin/ui/AdminStringListField'
import { createEntityId } from '@/features/admin/utils'
import type { IEducation } from '@/types/portfolio'

interface IDraft {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  isCurrent: boolean
  grade: string
  description: string
  activities: string[]
}

const emptyDraft: IDraft = {
  id: '',
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  grade: '',
  description: '',
  activities: [],
}

function toDraft(edu: IEducation): IDraft {
  return {
    id: edu.id,
    institution: edu.institution,
    degree: edu.degree,
    field: edu.field,
    startDate: edu.startDate,
    endDate: edu.endDate ?? '',
    isCurrent: edu.endDate === null,
    grade: edu.grade ?? '',
    description: edu.description ?? '',
    activities: edu.activities ?? [],
  }
}

function fromDraft(draft: IDraft): IEducation {
  return {
    id: draft.id || createEntityId('edu'),
    institution: draft.institution.trim(),
    degree: draft.degree.trim(),
    field: draft.field.trim(),
    startDate: draft.startDate.trim(),
    endDate: draft.isCurrent ? null : draft.endDate.trim() || null,
    grade: draft.grade.trim() || undefined,
    description: draft.description.trim() || undefined,
    activities: draft.activities.map((a) => a.trim()).filter(Boolean),
  }
}

interface IAdminEducationPanelProps {
  educations: IEducation[]
  isSaving: boolean
  onSaveEducations: (educations: IEducation[]) => Promise<boolean>
}

export function AdminEducationPanel({
  educations,
  isSaving,
  onSaveEducations,
}: IAdminEducationPanelProps) {
  const [draft, setDraft] = useState<IDraft>(emptyDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { confirmDelete } = useAdminActionAlert()

  const openNew = () => {
    setEditingId(null)
    setDraft(emptyDraft)
    setShowForm(true)
  }
  const openEdit = (edu: IEducation) => {
    setEditingId(edu.id)
    setDraft(toDraft(edu))
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
      ? educations.map((e) => (e.id === editingId ? next : e))
      : [...educations, next]
    const didSave = await onSaveEducations(nextList)
    if (didSave) {
      closeForm()
    }
  }

  return (
    <div className='space-y-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-foreground'>
            {COPY.admin.education.listTitle}
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            {educations.length} entr{educations.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>
        <button
          type='button'
          onClick={openNew}
          className={buttonVariants({ variant: 'primary', size: 'sm' })}
        >
          <Plus className='size-4' />
          {COPY.admin.education.addAction}
        </button>
      </header>

      {educations.length === 0 ? (
        <p className='py-12 text-center text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
      ) : (
        <div className='space-y-3'>
          {educations.map((edu) => (
            <article
              key={edu.id}
              className='flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-surface/60 px-5 py-4'
            >
              <div className='min-w-0'>
                <h3 className='font-medium text-foreground'>{edu.institution}</h3>
                <p className='mt-0.5 truncate text-sm text-muted-foreground'>
                  {edu.degree} · {edu.field}
                </p>
              </div>
              <div className='flex shrink-0 gap-1.5'>
                <button
                  type='button'
                  onClick={() => openEdit(edu)}
                  className='inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-surface-muted'
                >
                  <Pencil className='size-3' />
                </button>
                <button
                  type='button'
                  onClick={() => {
                    void (async () => {
                      const didConfirm = await confirmDelete()
                      if (!didConfirm) return
                      await onSaveEducations(educations.filter((e) => e.id !== edu.id))
                    })()
                  }}
                  className='inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400'
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
              {editingId ? COPY.admin.education.editTitle : COPY.admin.education.createTitle}
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
                {COPY.admin.education.institution}
              </span>
              <input
                value={draft.institution}
                onChange={(e) => setDraft((d) => ({ ...d, institution: e.target.value }))}
                className='admin-input'
                required
              />
            </label>
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.education.degree}
                </span>
                <input
                  value={draft.degree}
                  onChange={(e) => setDraft((d) => ({ ...d, degree: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.education.field}
                </span>
                <input
                  value={draft.field}
                  onChange={(e) => setDraft((d) => ({ ...d, field: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.education.startDate}
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
                  {COPY.admin.education.endDate}
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
              {COPY.admin.education.inProgress}
            </label>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.education.grade}
              </span>
              <input
                value={draft.grade}
                onChange={(e) => setDraft((d) => ({ ...d, grade: e.target.value }))}
                className='admin-input'
              />
            </label>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.education.description}
              </span>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                className='admin-textarea'
                rows={4}
              />
            </label>
            <AdminStringListField
              label={COPY.admin.education.activities}
              values={draft.activities}
              onChange={(activities) => setDraft((d) => ({ ...d, activities }))}
            />
          </div>
        </form>
      </AdminSlideOver>
    </div>
  )
}
