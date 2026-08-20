'use client'

import { useState } from 'react'
import { FileText, LoaderCircle, Plus, Save, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import TechMultiSelect from '@/components/ui/TechMultiSelect'
import { COPY } from '@/constants/copy'
import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { AdminImageField } from '@/features/admin/ui/AdminImageField'
import { AdminStringListField } from '@/features/admin/ui/AdminStringListField'
import { cn } from '@/lib/utils'
import type { IProfile, ISocialLink } from '@/types/portfolio'

const SOCIAL_PLATFORMS: ISocialLink['platform'][] = [
  'github',
  'linkedin',
  'email',
  'x',
  'dribbble',
  'website',
]

export type ProfileSection = 'identity' | 'hero' | 'media' | 'socials' | 'stats'

export const PROFILE_SECTION_IDS: ProfileSection[] = [
  'identity',
  'hero',
  'media',
  'socials',
  'stats',
]

const PROFILE_SECTIONS: { id: ProfileSection; label: string; hint: string }[] = [
  {
    id: 'identity',
    label: COPY.admin.profile.sections.identity,
    hint: COPY.admin.profile.hints.identity,
  },
  { id: 'hero', label: COPY.admin.profile.sections.hero, hint: COPY.admin.profile.hints.hero },
  { id: 'media', label: COPY.admin.profile.sections.media, hint: COPY.admin.profile.hints.media },
  {
    id: 'socials',
    label: COPY.admin.profile.sections.socials,
    hint: COPY.admin.profile.hints.socials,
  },
  { id: 'stats', label: COPY.admin.profile.sections.stats, hint: COPY.admin.profile.hints.stats },
]

interface IAdminProfilePanelProps {
  profile: IProfile
  isSaving: boolean
  section: ProfileSection
  onSectionChange: (section: ProfileSection) => void
  onSaveProfile: (profile: IProfile) => Promise<boolean>
}

interface IFieldLabelProps {
  htmlFor?: string
  children: React.ReactNode
}

function FieldLabel({ htmlFor, children }: IFieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className='block text-[0.7rem] font-medium tracking-wide text-muted-foreground'
    >
      {children}
    </label>
  )
}

interface IAvailabilitySwitchProps {
  available: boolean
  onToggle: () => void
}

function AvailabilitySwitch({ available, onToggle }: IAvailabilitySwitchProps) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={available}
      onClick={onToggle}
      className='inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-surface/80 px-3 py-1.5'
    >
      <span className='relative flex size-2' aria-hidden='true'>
        {available ? (
          <span className='absolute inset-0 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping' />
        ) : null}
        <span
          className={cn(
            'relative size-2 rounded-full',
            available ? 'bg-emerald-500' : 'bg-subtle-foreground',
          )}
        />
      </span>
      <span className='text-xs font-medium text-foreground'>
        {available ? COPY.admin.profile.available : COPY.admin.profile.unavailable}
      </span>
    </button>
  )
}

export function AdminProfilePanel({
  profile,
  isSaving,
  section,
  onSectionChange,
  onSaveProfile,
}: IAdminProfilePanelProps) {
  const [draft, setDraft] = useState(profile)
  const { confirmDelete } = useAdminActionAlert()

  const activeSection = PROFILE_SECTIONS.find((item) => item.id === section)

  const onToggleAvailable = () => {
    setDraft((current) => ({ ...current, available: !current.available }))
  }

  const onSubmitProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedRoles = (draft.heroRoles ?? []).map((role) => role.trim()).filter(Boolean)
    const normalizedStack = (draft.heroStack ?? []).map((item) => item.trim()).filter(Boolean)

    const didSave = await onSaveProfile({
      ...draft,
      name: draft.name.trim(),
      headline: draft.headline.trim(),
      bio: draft.bio.trim(),
      location: draft.location.trim(),
      socials: draft.socials.filter((item) => item.label.trim() && item.url.trim()),
      stats: draft.stats.filter((item) => item.label.trim()),
      heroIntro: draft.heroIntro?.trim() || undefined,
      heroRoles: normalizedRoles.length > 0 ? normalizedRoles : undefined,
      heroStack: normalizedStack.length > 0 ? normalizedStack : undefined,
    })

    if (!didSave) return
  }

  return (
    <form onSubmit={(event) => void onSubmitProfile(event)} className='mx-auto max-w-3xl'>
      <header className='mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-foreground'>{COPY.admin.profile.title}</h1>
          <p className='mt-1 text-sm text-muted-foreground'>{COPY.admin.profile.subtitle}</p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <AvailabilitySwitch available={draft.available} onToggle={onToggleAvailable} />
          <button
            type='submit'
            disabled={isSaving}
            className={cn(buttonVariants({ variant: 'primary', size: 'sm' }), 'shrink-0')}
          >
            {isSaving ? (
              <LoaderCircle className='size-4 animate-spin' />
            ) : (
              <Save className='size-4' />
            )}
            {COPY.admin.actions.save}
          </button>
        </div>
      </header>

      <nav className='no-scrollbar mb-6 flex gap-1 overflow-x-auto border-b border-border/50'>
        {PROFILE_SECTIONS.map((item) => {
          const isActive = section === item.id
          return (
            <button
              key={item.id}
              type='button'
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'relative shrink-0 px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              {isActive ? (
                <span className='absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-foreground' />
              ) : null}
            </button>
          )
        })}
      </nav>

      <section className='min-w-0'>
        <p className='mb-6 text-sm leading-6 text-muted-foreground'>{activeSection?.hint}</p>

        {section === 'identity' ? (
          <div className='max-w-2xl space-y-5'>
            <div className='grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]'>
              <div className='space-y-1.5'>
                <FieldLabel htmlFor='profile-name'>{COPY.admin.profile.name}</FieldLabel>
                <input
                  id='profile-name'
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  className='admin-input'
                />
              </div>
              <div className='space-y-1.5'>
                <FieldLabel htmlFor='profile-location'>{COPY.admin.profile.location}</FieldLabel>
                <input
                  id='profile-location'
                  value={draft.location}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, location: event.target.value }))
                  }
                  className='admin-input'
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <FieldLabel htmlFor='profile-headline'>{COPY.admin.profile.headline}</FieldLabel>
              <input
                id='profile-headline'
                value={draft.headline}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, headline: event.target.value }))
                }
                className='admin-input'
              />
            </div>

            <div className='space-y-1.5'>
              <FieldLabel htmlFor='profile-bio'>{COPY.admin.profile.bio}</FieldLabel>
              <textarea
                id='profile-bio'
                value={draft.bio}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, bio: event.target.value }))
                }
                className='admin-textarea min-h-40'
                rows={8}
              />
            </div>
          </div>
        ) : null}

        {section === 'hero' ? (
          <div className='max-w-2xl space-y-8'>
            <div className='space-y-1.5'>
              <FieldLabel htmlFor='profile-hero-intro'>{COPY.admin.profile.heroIntro}</FieldLabel>
              <textarea
                id='profile-hero-intro'
                value={draft.heroIntro ?? ''}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, heroIntro: event.target.value }))
                }
                className='admin-textarea min-h-32'
                rows={5}
              />
            </div>

            <AdminStringListField
              label={COPY.admin.profile.heroRoles}
              values={draft.heroRoles ?? []}
              onChange={(heroRoles) => setDraft((current) => ({ ...current, heroRoles }))}
            />

            <TechMultiSelect
              label={COPY.admin.profile.heroStack}
              selectedNames={draft.heroStack ?? []}
              onChangeSelected={(heroStack) => setDraft((current) => ({ ...current, heroStack }))}
            />
          </div>
        ) : null}

        {section === 'media' ? (
          <div className='grid max-w-2xl gap-10 sm:grid-cols-2'>
            <AdminImageField
              label={COPY.admin.profile.avatar}
              value={draft.avatar}
              shape='portrait'
              onChange={(avatar) => setDraft((current) => ({ ...current, avatar }))}
            />
            <div>
              <AdminImageField
                label={COPY.admin.profile.resume}
                value={draft.resumeUrl}
                kind='document'
                onChange={(resumeUrl) => setDraft((current) => ({ ...current, resumeUrl }))}
              />
              <p className='mt-3 inline-flex items-center gap-2 text-xs leading-5 text-muted-foreground'>
                <FileText className='size-3.5 shrink-0' />
                {COPY.admin.profile.resumeHint}
              </p>
            </div>
          </div>
        ) : null}

        {section === 'socials' ? (
          <div className='max-w-3xl'>
            <div className='mb-4 flex items-center justify-end'>
              <button
                type='button'
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    socials: [...current.socials, { platform: 'website', label: '', url: '' }],
                  }))
                }
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              >
                <Plus className='size-4' />
                {COPY.admin.actions.addItem}
              </button>
            </div>

            {draft.socials.length === 0 ? (
              <div className='rounded-2xl border border-dashed border-border/80 px-5 py-10 text-center'>
                <p className='text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
              </div>
            ) : (
              <ul className='space-y-2'>
                {draft.socials.map((social, index) => (
                  <li
                    key={`social-${index}`}
                    className='grid gap-2 rounded-2xl border border-border/60 bg-surface/50 p-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto]'
                  >
                    <select
                      value={social.platform}
                      aria-label={COPY.admin.profile.socialPlatform}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          socials: current.socials.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  platform: event.target.value as ISocialLink['platform'],
                                }
                              : item,
                          ),
                        }))
                      }
                      className='admin-select'
                    >
                      {SOCIAL_PLATFORMS.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>

                    <div className='grid min-w-0 gap-2 sm:grid-cols-2'>
                      <input
                        value={social.label}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            socials: current.socials.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, label: event.target.value } : item,
                            ),
                          }))
                        }
                        placeholder={COPY.admin.profile.socialLabel}
                        className='admin-input'
                      />
                      <input
                        value={social.url}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            socials: current.socials.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, url: event.target.value } : item,
                            ),
                          }))
                        }
                        placeholder={COPY.admin.profile.socialUrl}
                        className='admin-input'
                      />
                    </div>

                    <button
                      type='button'
                      onClick={() => {
                        void (async () => {
                          const didConfirm = await confirmDelete()
                          if (!didConfirm) return
                          setDraft((current) => ({
                            ...current,
                            socials: current.socials.filter((_, itemIndex) => itemIndex !== index),
                          }))
                        })()
                      }}
                      className='inline-flex h-9 w-9 items-center justify-center self-start rounded-lg text-muted-foreground transition-colors hover:text-red-500'
                      aria-label={COPY.admin.actions.delete}
                    >
                      <Trash2 className='size-4' />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        {section === 'stats' ? (
          <div className='max-w-3xl'>
            <div className='mb-4 flex items-center justify-end'>
              <button
                type='button'
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    stats: [...current.stats, { label: '', value: 0, suffix: '+' }],
                  }))
                }
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              >
                <Plus className='size-4' />
                {COPY.admin.actions.addItem}
              </button>
            </div>

            {draft.stats.length === 0 ? (
              <div className='rounded-xl border border-dashed border-border/80 px-5 py-10 text-center'>
                <p className='text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
              </div>
            ) : (
              <div>
                <div className='mb-2 hidden grid-cols-[minmax(0,1fr)_7rem_6rem_2.25rem] gap-3 px-3 sm:grid'>
                  <FieldLabel>{COPY.admin.profile.statLabel}</FieldLabel>
                  <FieldLabel>{COPY.admin.profile.statValue}</FieldLabel>
                  <FieldLabel>{COPY.admin.profile.statSuffix}</FieldLabel>
                  <span />
                </div>
                <ul className='space-y-2'>
                  {draft.stats.map((stat, index) => (
                    <li
                      key={`stat-${index}`}
                      className='grid gap-3 rounded-xl border border-border/60 bg-background/50 p-3 sm:grid-cols-[minmax(0,1fr)_7rem_6rem_2.25rem]'
                    >
                      <input
                        value={stat.label}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            stats: current.stats.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, label: event.target.value } : item,
                            ),
                          }))
                        }
                        placeholder={COPY.admin.profile.statLabel}
                        aria-label={COPY.admin.profile.statLabel}
                        className='admin-input'
                      />
                      <input
                        type='number'
                        value={stat.value}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            stats: current.stats.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, value: Number(event.target.value) }
                                : item,
                            ),
                          }))
                        }
                        placeholder={COPY.admin.profile.statValue}
                        aria-label={COPY.admin.profile.statValue}
                        className='admin-input'
                      />
                      <input
                        value={stat.suffix ?? ''}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            stats: current.stats.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, suffix: event.target.value } : item,
                            ),
                          }))
                        }
                        placeholder={COPY.admin.profile.statSuffix}
                        aria-label={COPY.admin.profile.statSuffix}
                        className='admin-input'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          void (async () => {
                            const didConfirm = await confirmDelete()
                            if (!didConfirm) return
                            setDraft((current) => ({
                              ...current,
                              stats: current.stats.filter((_, itemIndex) => itemIndex !== index),
                            }))
                          })()
                        }}
                        className='inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-red-500'
                        aria-label={COPY.admin.actions.delete}
                      >
                        <Trash2 className='size-4' />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </section>
    </form>
  )
}
