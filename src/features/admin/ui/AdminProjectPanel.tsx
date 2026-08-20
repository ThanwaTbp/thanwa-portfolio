'use client'

import { useState } from 'react'
import { LoaderCircle, Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import TechMultiSelect from '@/components/ui/TechMultiSelect'
import { COPY } from '@/constants/copy'
import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { AdminImageField } from '@/features/admin/ui/AdminImageField'
import { AdminSlideOver } from '@/features/admin/ui/AdminSlideOver'
import { AdminStringListField } from '@/features/admin/ui/AdminStringListField'
import type { IProject, IProjectLink, ProjectCategory } from '@/types/portfolio'

interface IProjectDraft {
  slug: string
  title: string
  year: string
  role: string
  category: ProjectCategory
  summary: string
  description: string
  techStack: string[]
  featured: boolean
  highlights: string[]
  coverImage?: string
  gallery: string[]
  demoUrl: string
  repoUrl: string
}

const emptyProjectDraft: IProjectDraft = {
  slug: '',
  title: '',
  year: String(new Date().getFullYear()),
  role: 'Frontend Developer',
  category: 'web',
  summary: '',
  description: '',
  techStack: [],
  featured: false,
  highlights: [],
  gallery: [],
  demoUrl: '',
  repoUrl: '',
}

function projectToDraft(project: IProject): IProjectDraft {
  return {
    slug: project.slug,
    title: project.title,
    year: String(project.year),
    role: project.role,
    category: project.category,
    summary: project.summary,
    description: project.description,
    techStack: project.techStack,
    featured: project.featured,
    highlights: project.highlights,
    coverImage: project.coverImage,
    gallery: project.gallery ?? [],
    demoUrl: project.links?.find((link) => link.type === 'live')?.url ?? '',
    repoUrl: project.links?.find((link) => link.type === 'repo')?.url ?? '',
  }
}

function draftToProject(draft: IProjectDraft, existing?: IProject): IProject {
  const nextLinks: IProjectLink[] = [
    ...(existing?.links?.filter((link) => link.type === 'case-study') ?? []),
  ]

  if (draft.demoUrl.trim()) {
    nextLinks.unshift({
      label: COPY.projectDetail.viewDemo,
      url: draft.demoUrl.trim(),
      type: 'live',
    })
  }
  if (draft.repoUrl.trim()) {
    nextLinks.push({ label: 'Source code', url: draft.repoUrl.trim(), type: 'repo' })
  }

  return {
    slug: draft.slug.trim(),
    title: draft.title.trim(),
    year: Number(draft.year),
    featured: draft.featured,
    category: draft.category,
    role: draft.role.trim() || 'Frontend Developer',
    summary: draft.summary.trim(),
    description: draft.description.trim() || draft.summary.trim(),
    techStack: draft.techStack,
    highlights: draft.highlights.map((h) => h.trim()).filter(Boolean),
    coverImage: draft.coverImage,
    gallery: draft.gallery.filter(Boolean),
    metrics: existing?.metrics,
    links: nextLinks.length > 0 ? nextLinks : undefined,
  }
}

interface IAdminProjectPanelProps {
  projects: IProject[]
  isSaving: boolean
  onSaveProjects: (projects: IProject[]) => Promise<boolean>
}

export function AdminProjectPanel({ projects, isSaving, onSaveProjects }: IAdminProjectPanelProps) {
  const [projectDraft, setProjectDraft] = useState<IProjectDraft>(emptyProjectDraft)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { confirmDelete } = useAdminActionAlert()

  const openNewForm = () => {
    setEditingSlug(null)
    setProjectDraft(emptyProjectDraft)
    setShowForm(true)
  }

  const openEditForm = (project: IProject) => {
    setEditingSlug(project.slug)
    setProjectDraft(projectToDraft(project))
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingSlug(null)
    setProjectDraft(emptyProjectDraft)
  }

  const onSubmitProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const existingProject = editingSlug ? projects.find((p) => p.slug === editingSlug) : undefined
    const nextProject = draftToProject(projectDraft, existingProject)

    if (!editingSlug && projects.some((p) => p.slug === nextProject.slug)) return

    const nextProjects = editingSlug
      ? projects.map((p) => (p.slug === editingSlug ? nextProject : p))
      : [...projects, nextProject]

    const didSave = await onSaveProjects(nextProjects)
    if (didSave) {
      closeForm()
    }
  }

  return (
    <div className='space-y-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-foreground'>{COPY.admin.projects.listTitle}</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          type='button'
          onClick={openNewForm}
          className={buttonVariants({ variant: 'primary', size: 'sm' })}
        >
          <Plus className='size-4' />
          {COPY.admin.projects.addAction}
        </button>
      </header>

      {/* Project list */}
      {projects.length === 0 ? (
        <p className='py-12 text-center text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
      ) : (
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          {projects.map((project) => (
            <article
              key={project.slug}
              className='group relative overflow-hidden rounded-xl border border-border/60 bg-surface/60 p-4 transition-colors hover:border-border'
            >
              {project.coverImage ? (
                <div className='mb-3 aspect-video overflow-hidden rounded-lg bg-surface-muted'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.coverImage} alt='' className='size-full object-cover' />
                </div>
              ) : null}
              <h3 className='font-medium text-foreground'>{project.title}</h3>
              <p className='mt-0.5 text-xs text-muted-foreground'>
                {project.category} · {project.year}
                {project.featured ? ' · ⭐ Featured' : ''}
              </p>
              <div className='mt-3 flex gap-1.5'>
                <button
                  type='button'
                  onClick={() => openEditForm(project)}
                  className='inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-muted'
                >
                  <Pencil className='size-3' />
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => {
                    void (async () => {
                      const didConfirm = await confirmDelete()
                      if (!didConfirm) return
                      await onSaveProjects(projects.filter((p) => p.slug !== project.slug))
                    })()
                  }}
                  className='inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400'
                >
                  <Trash2 className='size-3' />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Form overlay */}
      <AdminSlideOver open={showForm} onClose={closeForm}>
        <form
          onSubmit={(event) => void onSubmitProject(event)}
          className='flex h-full flex-col overflow-y-auto'
        >
          <div className='sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/95 px-6 py-4 backdrop-blur-sm'>
            <h2 className='text-base font-semibold text-foreground'>
              {editingSlug ? COPY.admin.projects.editTitle : COPY.admin.projects.createTitle}
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
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.slug}
                </span>
                <input
                  value={projectDraft.slug}
                  onChange={(e) => setProjectDraft((d) => ({ ...d, slug: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.title}
                </span>
                <input
                  value={projectDraft.title}
                  onChange={(e) => setProjectDraft((d) => ({ ...d, title: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
            </div>
            <div className='grid gap-4 sm:grid-cols-3'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.year}
                </span>
                <input
                  value={projectDraft.year}
                  onChange={(e) => setProjectDraft((d) => ({ ...d, year: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.role}
                </span>
                <input
                  value={projectDraft.role}
                  onChange={(e) => setProjectDraft((d) => ({ ...d, role: e.target.value }))}
                  className='admin-input'
                  required
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.category}
                </span>
                <select
                  value={projectDraft.category}
                  onChange={(e) =>
                    setProjectDraft((d) => ({
                      ...d,
                      category: e.target.value as ProjectCategory,
                    }))
                  }
                  className='admin-select'
                >
                  {Object.entries(COPY.projects.categories).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.projects.summary}
              </span>
              <textarea
                value={projectDraft.summary}
                onChange={(e) => setProjectDraft((d) => ({ ...d, summary: e.target.value }))}
                className='admin-textarea'
                rows={3}
              />
            </label>
            <label className='block space-y-1.5'>
              <span className='text-xs font-medium text-muted-foreground'>
                {COPY.admin.projects.description}
              </span>
              <textarea
                value={projectDraft.description}
                onChange={(e) => setProjectDraft((d) => ({ ...d, description: e.target.value }))}
                className='admin-textarea'
                rows={5}
              />
            </label>
            <TechMultiSelect
              label={COPY.admin.projects.techStack}
              selectedNames={projectDraft.techStack}
              onChangeSelected={(techStack) => setProjectDraft((d) => ({ ...d, techStack }))}
            />
            <AdminStringListField
              label={COPY.admin.projects.highlights}
              values={projectDraft.highlights}
              onChange={(highlights) => setProjectDraft((d) => ({ ...d, highlights }))}
            />
            <AdminImageField
              label={COPY.admin.projects.coverImage}
              value={projectDraft.coverImage}
              onChange={(coverImage) => setProjectDraft((d) => ({ ...d, coverImage }))}
            />
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.gallery}
                </p>
                <button
                  type='button'
                  onClick={() => setProjectDraft((d) => ({ ...d, gallery: [...d.gallery, ''] }))}
                  className='inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline'
                >
                  <Plus className='size-3.5' />
                  Add image
                </button>
              </div>
              {projectDraft.gallery.map((url, i) => (
                <AdminImageField
                  key={`gallery-${i}`}
                  label={`Image ${i + 1}`}
                  value={url}
                  onChange={(nextUrl) =>
                    setProjectDraft((d) => ({
                      ...d,
                      gallery: nextUrl
                        ? d.gallery.map((g, idx) => (idx === i ? nextUrl : g))
                        : d.gallery.filter((_, idx) => idx !== i),
                    }))
                  }
                />
              ))}
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.demoUrl}
                </span>
                <input
                  value={projectDraft.demoUrl}
                  onChange={(e) => setProjectDraft((d) => ({ ...d, demoUrl: e.target.value }))}
                  className='admin-input'
                />
              </label>
              <label className='space-y-1.5'>
                <span className='text-xs font-medium text-muted-foreground'>
                  {COPY.admin.projects.repoUrl}
                </span>
                <input
                  value={projectDraft.repoUrl}
                  onChange={(e) => setProjectDraft((d) => ({ ...d, repoUrl: e.target.value }))}
                  className='admin-input'
                />
              </label>
            </div>
            <label className='inline-flex cursor-pointer items-center gap-2.5 text-sm text-foreground'>
              <input
                type='checkbox'
                checked={projectDraft.featured}
                onChange={(e) => setProjectDraft((d) => ({ ...d, featured: e.target.checked }))}
                className='size-4 rounded border-border accent-accent'
              />
              {COPY.admin.projects.featured}
            </label>
          </div>
        </form>
      </AdminSlideOver>
    </div>
  )
}
