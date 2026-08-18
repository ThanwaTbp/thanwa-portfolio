'use client'

import { useMemo, useState } from 'react'

import type { IProject, ProjectCategory } from '@/types/portfolio'

export type ProjectCategoryFilter = ProjectCategory | 'all'

export interface IUseProjectFiltersResult {
  selectedCategory: ProjectCategoryFilter
  selectedTech: string | null
  filteredProjects: IProject[]
  hasActiveFilters: boolean
  onSelectCategory: (category: ProjectCategoryFilter) => void
  onSelectTech: (tech: string) => void
  onClearFilters: () => void
}

/**
 * จัดการ state การกรองผลงานฝั่ง client ทั้งหมด (หน้า /projects เป็น static/SSG จึงห้ามใช้ searchParams)
 * กรองพร้อมกันสองมิติ: category (เลือกได้ทีละหมวด) และ tech (เลือกได้ทีละตัว กดซ้ำเพื่อยกเลิก)
 */
export function useProjectFilters(projects: IProject[]): IUseProjectFiltersResult {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryFilter>('all')
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesTech = !selectedTech || project.techStack.includes(selectedTech)

      return matchesCategory && matchesTech
    })
  }, [projects, selectedCategory, selectedTech])

  const onSelectCategory = (category: ProjectCategoryFilter) => {
    setSelectedCategory(category)
  }

  const onSelectTech = (tech: string) => {
    // กดซ้ำตัวที่เลือกอยู่แล้ว = ยกเลิกการเลือก (toggle)
    setSelectedTech((currentTech) => (currentTech === tech ? null : tech))
  }

  const onClearFilters = () => {
    setSelectedCategory('all')
    setSelectedTech(null)
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedTech !== null

  return {
    selectedCategory,
    selectedTech,
    filteredProjects,
    hasActiveFilters,
    onSelectCategory,
    onSelectTech,
    onClearFilters,
  }
}
