'use client'

import { useState } from 'react'
import { LoaderCircle, Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { AdminSlideOver } from '@/features/admin/ui/AdminSlideOver'
import { createEntityId } from '@/features/admin/utils'
import type { ISkill, ISkillCategory, SkillLevel } from '@/types/portfolio'

const SKILL_LEVELS: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'expert']

interface IDraft {
  id: string
  title: string
  description: string
  skills: ISkill[]
}

const emptyDraft: IDraft = { id: '', title: '', description: '', skills: [] }

function fromDraft(draft: IDraft): ISkillCategory {
  return {
    id: draft.id || createEntityId('skill'),
    title: draft.title.trim(),
    description: draft.description.trim(),
    skills: draft.skills
      .map((s) => ({ name: s.name.trim(), level: s.level, yearsOfExperience: s.yearsOfExperience }))
      .filter((s) => s.name),
  }
}

interface IAdminSkillPanelProps {
  skillCategories: ISkillCategory[]
  isSaving: boolean
  onSaveSkillCategories: (categories: ISkillCategory[]) => Promise<boolean>
}

export function AdminSkillPanel({
  skillCategories,
  isSaving,
  onSaveSkillCategories,
}: IAdminSkillPanelProps) {
  const [draft, setDraft] = useState<IDraft>(emptyDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { confirmDelete } = useAdminActionAlert()

  const openNew = () => {
    setEditingId(null)
    setDraft(emptyDraft)
    setShowForm(true)
  }
  const openEdit = (cat: ISkillCategory) => {
    setEditingId(cat.id)
    setDraft(cat)
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
      ? skillCategories.map((c) => (c.id === editingId ? next : c))
      : [...skillCategories, next]
    const didSave = await onSaveSkillCategories(nextList)
    if (didSave) {
      closeForm()
    }
  }

  return (
    <div className='space-y-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-foreground'>{COPY.admin.skills.listTitle}</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            {skillCategories.length} categor{skillCategories.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>
        <button
          type='button'
          onClick={openNew}
          className={buttonVariants({ variant: 'primary', size: 'sm' })}
        >
          <Plus className='size-4' />
          {COPY.admin.skills.addAction}
        </button>
      </header>

      {skillCategories.length === 0 ? (
        <p className='py-12 text-center text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
      ) : (
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          {skillCategories.map((cat) => (
            <article key={cat.id} className='rounded-xl border border-border/60 bg-surface/60 p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <h3 className='font-medium text-foreground'>{cat.title}</h3>
                  <p className='mt-0.5 text-xs text-muted-foreground'>{cat.skills.length} skills</p>
                </div>
                <div className='flex gap-1'>
                  <button
                    type='button'
                    onClick={() => openEdit(cat)}
                    className='inline-flex items-center rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-surface-muted'
                  >
                    <Pencil className='size-3' />
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      void (async () => {
                        const didConfirm = await confirmDelete()
                        if (!didConfirm) return
                        await onSaveSkillCategories(skillCategories.filter((c) => c.id !== cat.id))
                      })()
                    }}
                    className='inline-flex items-center rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400'
                  >
                    <Trash2 className='size-3' />
                  </button>
                </div>
              </div>
              {cat.skills.length > 0 ? (
                <div className='mt-3 flex flex-wrap gap-1.5'>
                  {cat.skills.slice(0, 6).map((s) => (
                    <span
                      key={s.name}
                      className='rounded-md bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground'
                    >
                      {s.name}
                    </span>
                  ))}
                  {cat.skills.length > 6 ? (
                    <span className='rounded-md bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground'>
                      +{cat.skills.length - 6}
                    </span>
                  ) : null}
                </div>
              ) : null}
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
              {editingId ? COPY.admin.skills.editTitle : COPY.admin.skills.createTitle}
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
                {COPY.admin.skills.title}
              </span>
              <input
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                className='admin-input'
                required
              />
            </label>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.skills.description}
              </span>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                className='admin-textarea'
                rows={3}
              />
            </label>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-medium text-muted-foreground'>Skills in this category</p>
                <button
                  type='button'
                  onClick={() =>
                    setDraft((d) => ({
                      ...d,
                      skills: [...d.skills, { name: '', level: 'intermediate' }],
                    }))
                  }
                  className='inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline'
                >
                  <Plus className='size-3.5' />
                  Add skill
                </button>
              </div>
              {draft.skills.map((skill, i) => (
                <div
                  key={`skill-${i}`}
                  className='flex items-center gap-2 rounded-xl border border-border/60 bg-surface/50 px-3 py-2'
                >
                  <input
                    value={skill.name}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        skills: d.skills.map((s, idx) =>
                          idx === i ? { ...s, name: e.target.value } : s,
                        ),
                      }))
                    }
                    placeholder='Name'
                    className='min-w-0 flex-1 border-0 bg-transparent py-0 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-0'
                  />
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        skills: d.skills.map((s, idx) =>
                          idx === i ? { ...s, level: e.target.value as SkillLevel } : s,
                        ),
                      }))
                    }
                    className='w-28 shrink-0 border-0 bg-transparent py-0 text-xs font-medium text-foreground focus:ring-0'
                  >
                    {SKILL_LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {COPY.skills.levels[l]}
                      </option>
                    ))}
                  </select>
                  <input
                    type='number'
                    min={0}
                    value={skill.yearsOfExperience ?? ''}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        skills: d.skills.map((s, idx) =>
                          idx === i
                            ? {
                                ...s,
                                yearsOfExperience: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              }
                            : s,
                        ),
                      }))
                    }
                    placeholder='Yrs'
                    className='w-14 shrink-0 border-0 bg-transparent py-0 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-0'
                  />
                  <button
                    type='button'
                    onClick={() =>
                      setDraft((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }))
                    }
                    className='shrink-0 text-muted-foreground hover:text-red-500'
                  >
                    <Trash2 className='size-3.5' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
      </AdminSlideOver>
    </div>
  )
}
