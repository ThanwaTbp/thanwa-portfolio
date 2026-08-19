'use client'

import { useCallback, useMemo, useState } from 'react'

import {
  getCanonicalTechName,
  getTechItemByName,
  groupTechStack,
  isTechNameSelected,
  searchTechStack,
  TECH_STACK_CATALOG,
  toggleTechSelection,
} from '@/constants/tech-stack'
import type { ITechItem, ITechStackGroup } from '@/types/tech-stack'

export interface IUseTechStackOptions {
  selectedNames: string[]
  onChangeSelected: (names: string[]) => void
}

export interface IUseTechStackResult {
  catalog: ITechItem[]
  searchQuery: string
  isPickerOpen: boolean
  selectedItems: ITechItem[]
  groupedOptions: ITechStackGroup[]
  selectedCount: number
  setSearchQuery: (query: string) => void
  onOpenPicker: () => void
  onClosePicker: () => void
  onTogglePicker: () => void
  onToggleTech: (techName: string) => void
  onRemoveTech: (techName: string) => void
  isTechSelected: (techName: string) => boolean
}

function toSelectableItem(name: string): ITechItem {
  const catalogItem = getTechItemByName(name)

  if (catalogItem) return catalogItem

  return {
    id: name.trim().toLowerCase(),
    name: name.trim(),
    aliases: [],
    category: 'tooling',
    colorClass: 'text-accent',
  }
}

export function useTechStack({
  selectedNames,
  onChangeSelected,
}: IUseTechStackOptions): IUseTechStackResult {
  const [searchQuery, setSearchQuery] = useState('')
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const selectedItems = useMemo(
    () => selectedNames.map((selectedName) => toSelectableItem(selectedName)),
    [selectedNames],
  )

  const groupedOptions = useMemo(() => groupTechStack(searchTechStack(searchQuery)), [searchQuery])

  const onOpenPicker = useCallback(() => setIsPickerOpen(true), [])

  const onClosePicker = useCallback(() => {
    setIsPickerOpen(false)
    setSearchQuery('')
  }, [])

  const onTogglePicker = useCallback(() => {
    setIsPickerOpen((isOpen) => !isOpen)
    setSearchQuery('')
  }, [])

  const onToggleTech = useCallback(
    (techName: string) => {
      onChangeSelected(toggleTechSelection(selectedNames, techName))
    },
    [onChangeSelected, selectedNames],
  )

  const onRemoveTech = useCallback(
    (techName: string) => {
      onChangeSelected(toggleTechSelection(selectedNames, getCanonicalTechName(techName)))
    },
    [onChangeSelected, selectedNames],
  )

  const isTechSelected = useCallback(
    (techName: string) => isTechNameSelected(selectedNames, techName),
    [selectedNames],
  )

  return {
    catalog: TECH_STACK_CATALOG,
    searchQuery,
    isPickerOpen,
    selectedItems,
    groupedOptions,
    selectedCount: selectedNames.length,
    setSearchQuery,
    onOpenPicker,
    onClosePicker,
    onTogglePicker,
    onToggleTech,
    onRemoveTech,
    isTechSelected,
  }
}
