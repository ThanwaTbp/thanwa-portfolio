'use client'

import { ChevronDown, FolderOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { IProject, ProjectCategory } from '@/types/portfolio'

import { useProjectFilters, type ProjectCategoryFilter } from '../hooks/useProjectFilters'
import { ProjectGrid } from './ProjectGrid'

export interface IProjectFiltersProps {
  projects: IProject[]
  categories: ProjectCategory[]
  techStack: string[]
}

const INITIAL_VISIBLE_TECH_COUNT = 8

interface IFilterPillProps {
  label: string
  isActive: boolean
  onSelect: () => void
}

// pill ตัวกรองมาตรฐาน — เลือกอยู่ใช้ bg-accent/text-accent-foreground ตามดีไซน์ของระบบ
function FilterPill({ label, isActive, onSelect }: IFilterPillProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'border border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}

// ครอบ ProjectGrid พร้อมแถบตัวกรอง category/tech ทั้งหมดเป็น client-side filtering
// (หน้า /projects เป็น static/SSG จึงห้ามพึ่ง searchParams)
export function ProjectFilters({ projects, categories, techStack }: IProjectFiltersProps) {
  const translate = useTranslations('projects')
  const [showAllTech, setShowAllTech] = useState(false)

  const {
    selectedCategory,
    selectedTech,
    filteredProjects,
    onSelectCategory,
    onSelectTech,
    onClearFilters,
  } = useProjectFilters(projects)

  const onToggleShowAllTech = () => {
    setShowAllTech((currentValue) => !currentValue)
  }

  // ไม่มีผลงานเลยตั้งแต่ต้น — ไม่ต้องมีปุ่มล้างตัวกรอง เพราะไม่มีตัวกรองให้ล้าง
  if (projects.length === 0) {
    return (
      <EmptyState icon={FolderOpen} title={translate('empty.title')} description={translate('empty.description')} />
    )
  }

  const visibleTechStack = showAllTech ? techStack : techStack.slice(0, INITIAL_VISIBLE_TECH_COUNT)
  const hasMoreTech = techStack.length > INITIAL_VISIBLE_TECH_COUNT

  const categoryFilters: { value: ProjectCategoryFilter; label: string }[] = [
    { value: 'all', label: translate('all') },
    ...categories.map((category) => ({ value: category, label: translate(`categories.${category}`) })),
  ]

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-wrap gap-2' role='group' aria-label={translate('filterByCategory')}>
          {categoryFilters.map((categoryFilter) => (
            <FilterPill
              key={categoryFilter.value}
              label={categoryFilter.label}
              isActive={selectedCategory === categoryFilter.value}
              onSelect={() => onSelectCategory(categoryFilter.value)}
            />
          ))}
        </div>

        {techStack.length > 0 && (
          <div className='flex flex-wrap items-center gap-2' role='group' aria-label={translate('filterByTech')}>
            {visibleTechStack.map((tech) => (
              <button
                key={tech}
                type='button'
                onClick={() => onSelectTech(tech)}
                aria-pressed={selectedTech === tech}
                className={cn(
                  'inline-flex h-8 items-center rounded-full px-3 text-xs font-medium transition-colors duration-200',
                  selectedTech === tech
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-surface-muted text-muted-foreground hover:text-foreground',
                )}
              >
                {tech}
              </button>
            ))}

            {hasMoreTech && (
              <button
                type='button'
                onClick={onToggleShowAllTech}
                aria-expanded={showAllTech}
                className='inline-flex h-8 items-center gap-1 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground'
              >
                {showAllTech ? translate('all') : `+${techStack.length - INITIAL_VISIBLE_TECH_COUNT}`}
                <ChevronDown
                  className={cn('size-3.5 transition-transform duration-200', showAllTech && 'rotate-180')}
                  aria-hidden='true'
                />
              </button>
            )}
          </div>
        )}
      </div>

      <p className='text-sm text-muted-foreground'>{translate('resultsCount', { count: filteredProjects.length })}</p>

      {filteredProjects.length > 0 ? (
        <ProjectGrid projects={filteredProjects} />
      ) : (
        <EmptyState
          icon={FolderOpen}
          title={translate('empty.title')}
          description={translate('empty.description')}
          action={
            <Button variant='outline' size='sm' onClick={onClearFilters}>
              {translate('empty.action')}
            </Button>
          }
        />
      )}
    </div>
  )
}
