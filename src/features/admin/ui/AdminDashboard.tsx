'use client'

import { useState } from 'react'
import { LoaderCircle, LogOut, Plus, Save, Trash2 } from 'lucide-react'

import { useAuth } from '@/components/auth/AuthProvider'
import { buttonVariants } from '@/components/ui/Button'
import TechMultiSelect from '@/components/ui/TechMultiSelect'
import { useAdminPortfolio } from '@/features/admin/hooks/useAdminPortfolio'
import { COPY, formatPersistenceMode, formatSignedInAs } from '@/constants/copy'
import type { IProject } from '@/types/portfolio'
import type { IPortfolioData } from '@/types/portfolio-data'
import { cn } from '@/lib/utils'

type AdminTab = 'projects' | 'profile'

interface IProjectDraft {
  slug: string
  title: string
  year: string
  summary: string
  techStack: string[]
  featured: boolean
}

const emptyProjectDraft: IProjectDraft = {
  slug: '',
  title: '',
  year: String(new Date().getFullYear()),
  summary: '',
  techStack: [],
  featured: false,
}

function projectToDraft(project: IProject): IProjectDraft {
  return {
    slug: project.slug,
    title: project.title,
    year: String(project.year),
    summary: project.summary,
    techStack: project.techStack,
    featured: project.featured,
  }
}

function draftToProject(draft: IProjectDraft, existing?: IProject): IProject {
  return {
    slug: draft.slug.trim(),
    title: draft.title.trim(),
    year: Number(draft.year),
    featured: draft.featured,
    category: existing?.category ?? 'web',
    role: existing?.role ?? 'Frontend Developer',
    summary: draft.summary.trim(),
    description: existing?.description ?? draft.summary.trim(),
    techStack: draft.techStack,
    highlights: existing?.highlights ?? [],
    coverImage: existing?.coverImage,
    gallery: existing?.gallery,
    metrics: existing?.metrics,
    links: existing?.links,
  }
}

export default function AdminDashboard() {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    openLogin,
    logout,
    email,
    persistenceMode,
  } = useAuth()
  const { data, isLoading, isSaving, errorMessage, save } = useAdminPortfolio(isAuthenticated)
  const [activeTab, setActiveTab] = useState<AdminTab>('projects')
  const [projectDraft, setProjectDraft] = useState<IProjectDraft>(emptyProjectDraft)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [profileDraft, setProfileDraft] = useState({
    name: '',
    headline: '',
    bio: '',
  })

  const onOpenProfileTab = () => {
    if (data) {
      setProfileDraft({
        name: data.profile.name,
        headline: data.profile.headline,
        bio: data.profile.bio,
      })
    }

    setActiveTab('profile')
  }

  if (isAuthLoading) {
    return (
      <div className='mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-4 py-16'>
        <LoaderCircle className='size-6 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <section className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='rounded-[1.75rem] border border-border/75 bg-surface/80 p-8 text-center shadow-[0_20px_80px_-48px_rgba(38,40,66,0.45)]'>
          <h1 className='text-2xl font-semibold tracking-tight text-foreground'>
            {COPY.admin.gateTitle}
          </h1>
          <p className='mt-3 text-sm leading-7 text-muted-foreground'>
            {COPY.admin.gateDescription}
          </p>
          <button
            type='button'
            onClick={openLogin}
            className={cn(buttonVariants({ variant: 'primary' }), 'mt-6')}
          >
            {COPY.admin.gateAction}
          </button>
        </div>
      </section>
    )
  }

  if (isLoading || !data) {
    return (
      <div className='mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-4 py-16'>
        <LoaderCircle className='size-6 animate-spin text-muted-foreground' />
      </div>
    )
  }

  const onSavePortfolio = async (nextData: IPortfolioData) => {
    const didSave = await save(nextData)
    if (didSave) setEditingSlug(null)
  }

  const onDeleteProject = async (slug: string) => {
    const nextData: IPortfolioData = {
      ...data,
      projects: data.projects.filter((project) => project.slug !== slug),
    }
    await onSavePortfolio(nextData)
  }

  const onSubmitProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const existingProject = editingSlug
      ? data.projects.find((project) => project.slug === editingSlug)
      : undefined
    const nextProject = draftToProject(projectDraft, existingProject)

    const projectsWithoutCurrent = data.projects.filter((project) => project.slug !== editingSlug)
    const nextProjects = editingSlug
      ? projectsWithoutCurrent.map((project) =>
          project.slug === editingSlug ? nextProject : project,
        )
      : [...projectsWithoutCurrent, nextProject]

    if (!editingSlug && data.projects.some((project) => project.slug === nextProject.slug)) {
      return
    }

    await onSavePortfolio({
      ...data,
      projects: nextProjects,
    })

    setProjectDraft(emptyProjectDraft)
  }

  const onSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await onSavePortfolio({
      ...data,
      profile: {
        ...data.profile,
        name: profileDraft.name.trim(),
        headline: profileDraft.headline.trim(),
        bio: profileDraft.bio.trim(),
      },
    })
  }

  return (
    <section className='mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex flex-col gap-4 border-b border-border/75 pb-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm font-medium text-accent'>{COPY.admin.eyebrow}</p>
          <h1 className='mt-1 text-3xl font-semibold tracking-tight text-foreground'>
            {COPY.admin.title}
          </h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            {formatSignedInAs(email ?? 'admin')} · {formatPersistenceMode(persistenceMode)}
          </p>
        </div>
        <button
          type='button'
          onClick={() => void logout()}
          className={buttonVariants({ variant: 'outline' })}
        >
          <LogOut className='size-4' />
          {COPY.admin.logout}
        </button>
      </div>

      {errorMessage ? (
        <p className='mt-6 rounded-2xl border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive'>
          {errorMessage}
        </p>
      ) : null}

      <div className='mt-8 flex flex-wrap gap-2'>
        {(['projects', 'profile'] as AdminTab[]).map((tab) => (
          <button
            key={tab}
            type='button'
            onClick={() => (tab === 'profile' ? onOpenProfileTab() : setActiveTab(tab))}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-accent text-accent-foreground shadow-[0_12px_30px_-20px_var(--color-accent)]'
                : 'bg-surface-muted text-muted-foreground hover:text-foreground',
            )}
          >
            {COPY.admin.tabs[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'projects' ? (
        <div className='mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold text-foreground'>
              {COPY.admin.projects.listTitle}
            </h2>
            <div className='space-y-3'>
              {data.projects.map((project) => (
                <article
                  key={project.slug}
                  className='rounded-2xl border border-border/75 bg-surface/70 p-4'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <h3 className='font-medium text-foreground'>{project.title}</h3>
                      <p className='mt-1 text-sm text-muted-foreground'>
                        {project.slug} · {project.year}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => {
                          setEditingSlug(project.slug)
                          setProjectDraft(projectToDraft(project))
                        }}
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                      >
                        {COPY.admin.actions.edit}
                      </button>
                      <button
                        type='button'
                        onClick={() => void onDeleteProject(project.slug)}
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                      >
                        <Trash2 className='size-4' />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmitProject}
            className='relative z-10 rounded-[1.5rem] border border-border/75 bg-surface/80 p-5 shadow-[0_20px_70px_-50px_rgba(38,40,66,0.55)]'
          >
            <div className='mb-4 flex items-center justify-between gap-3'>
              <h2 className='text-lg font-semibold text-foreground'>
                {editingSlug ? COPY.admin.projects.editTitle : COPY.admin.projects.createTitle}
              </h2>
              {editingSlug ? (
                <button
                  type='button'
                  onClick={() => {
                    setEditingSlug(null)
                    setProjectDraft(emptyProjectDraft)
                  }}
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  {COPY.admin.actions.cancel}
                </button>
              ) : null}
            </div>

            <div className='space-y-3'>
              <input
                value={projectDraft.slug}
                onChange={(event) =>
                  setProjectDraft((current) => ({ ...current, slug: event.target.value }))
                }
                placeholder={COPY.admin.projects.slug}
                className='admin-input'
                required
              />
              <input
                value={projectDraft.title}
                onChange={(event) =>
                  setProjectDraft((current) => ({ ...current, title: event.target.value }))
                }
                placeholder={COPY.admin.projects.title}
                className='admin-input'
                required
              />
              <input
                value={projectDraft.year}
                onChange={(event) =>
                  setProjectDraft((current) => ({ ...current, year: event.target.value }))
                }
                placeholder={COPY.admin.projects.year}
                className='admin-input'
                required
              />
              <textarea
                value={projectDraft.summary}
                onChange={(event) =>
                  setProjectDraft((current) => ({ ...current, summary: event.target.value }))
                }
                placeholder={COPY.admin.projects.summary}
                className='admin-textarea'
                rows={3}
              />
              <TechMultiSelect
                label={COPY.admin.projects.techStack}
                selectedNames={projectDraft.techStack}
                onChangeSelected={(techStack) =>
                  setProjectDraft((current) => ({ ...current, techStack }))
                }
              />
              <label className='flex items-center gap-2 text-sm text-muted-foreground'>
                <input
                  type='checkbox'
                  checked={projectDraft.featured}
                  onChange={(event) =>
                    setProjectDraft((current) => ({ ...current, featured: event.target.checked }))
                  }
                />
                {COPY.admin.projects.featured}
              </label>
            </div>

            <button
              type='submit'
              disabled={isSaving}
              className={cn(buttonVariants({ variant: 'primary' }), 'mt-5 w-full')}
            >
              {isSaving ? (
                <LoaderCircle className='size-4 animate-spin' />
              ) : editingSlug ? (
                <Save className='size-4' />
              ) : (
                <Plus className='size-4' />
              )}
              {editingSlug ? COPY.admin.actions.save : COPY.admin.projects.addAction}
            </button>
          </form>
        </div>
      ) : (
        <form
          onSubmit={onSaveProfile}
          className='mt-8 max-w-2xl space-y-3 rounded-[1.5rem] border border-border/75 bg-surface/80 p-5'
        >
          <h2 className='text-lg font-semibold text-foreground'>{COPY.admin.profile.title}</h2>
          <input
            value={profileDraft.name}
            onChange={(event) =>
              setProfileDraft((current) => ({ ...current, name: event.target.value }))
            }
            placeholder={COPY.admin.profile.name}
            className='admin-input'
          />
          <input
            value={profileDraft.headline}
            onChange={(event) =>
              setProfileDraft((current) => ({ ...current, headline: event.target.value }))
            }
            placeholder={COPY.admin.profile.headline}
            className='admin-input'
          />
          <textarea
            value={profileDraft.bio}
            onChange={(event) =>
              setProfileDraft((current) => ({ ...current, bio: event.target.value }))
            }
            placeholder={COPY.admin.profile.bio}
            className='admin-textarea'
            rows={4}
          />
          <button
            type='submit'
            disabled={isSaving}
            className={cn(buttonVariants({ variant: 'primary' }), 'mt-2')}
          >
            {isSaving ? (
              <LoaderCircle className='size-4 animate-spin' />
            ) : (
              <Save className='size-4' />
            )}
            {COPY.admin.actions.save}
          </button>
        </form>
      )}
    </section>
  )
}
