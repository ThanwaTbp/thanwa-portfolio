'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, ChevronsUpDown, Search, X } from 'lucide-react'

import { TechIcon } from '@/components/common/TechIcon'
import { COPY, formatSelectedCount } from '@/constants/copy'
import { useTechStack } from '@/hooks/useTechStack'
import { cn } from '@/lib/utils'

// ความสูงโดยประมาณของ dropdown (ช่องค้นหา + รายการ) ใช้ตัดสินว่าจะเปิดขึ้นบนหรือลงล่าง
const PICKER_ESTIMATED_HEIGHT = 360

interface ITechMultiSelectProps {
  selectedNames: string[]
  onChangeSelected: (names: string[]) => void
  label?: string
}

export default function TechMultiSelect({
  selectedNames,
  onChangeSelected,
  label,
}: ITechMultiSelectProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [shouldOpenUpward, setShouldOpenUpward] = useState(false)
  const {
    searchQuery,
    isPickerOpen,
    selectedItems,
    groupedOptions,
    selectedCount,
    setSearchQuery,
    onClosePicker,
    onTogglePicker,
    onToggleTech,
    onRemoveTech,
    isTechSelected,
  } = useTechStack({ selectedNames, onChangeSelected })

  // เลือกทิศทางเปิด dropdown ตามที่ว่างจริงรอบๆ ตัว input ไม่ให้ล้นขอบจอ
  const syncOpenDirection = useCallback(() => {
    const anchor = panelRef.current
    if (!anchor) return

    const bounds = anchor.getBoundingClientRect()
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const spaceBelow = viewportHeight - bounds.bottom
    const spaceAbove = bounds.top

    setShouldOpenUpward(spaceBelow < PICKER_ESTIMATED_HEIGHT && spaceAbove > spaceBelow)
  }, [])

  useEffect(() => {
    if (!isPickerOpen) return

    syncOpenDirection()

    // ใช้ capture เพื่อจับ scroll ของ container ด้านในด้วย เช่นตอนอยู่ใน slide over ของหน้า admin
    window.addEventListener('scroll', syncOpenDirection, { passive: true, capture: true })
    window.addEventListener('resize', syncOpenDirection, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncOpenDirection, { capture: true })
      window.removeEventListener('resize', syncOpenDirection)
    }
  }, [isPickerOpen, syncOpenDirection])

  useEffect(() => {
    if (!isPickerOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        onClosePicker()
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClosePicker()
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isPickerOpen, onClosePicker])

  return (
    <div ref={panelRef} className='relative space-y-2'>
      {label ? <p className='text-sm font-medium text-foreground'>{label}</p> : null}

      <div className='rounded-lg border border-border/80 bg-background/80 p-2.5'>
        <div className='flex flex-wrap items-center gap-2'>
          {selectedItems.map((techItem) => (
            <button
              key={techItem.id}
              type='button'
              onClick={() => onRemoveTech(techItem.name)}
              className='inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface px-2.5 py-1 text-xs text-foreground transition-colors hover:border-border-strong'
            >
              <TechIcon name={techItem.name} className='size-3.5' />
              <span>{techItem.name}</span>
              <X className='size-3 text-muted-foreground' aria-hidden='true' />
            </button>
          ))}

          <button
            type='button'
            onClick={onTogglePicker}
            aria-expanded={isPickerOpen}
            className='inline-flex min-h-8 min-w-[8rem] flex-1 items-center justify-between gap-2 rounded-md px-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            <span>
              {selectedCount > 0 ? formatSelectedCount(selectedCount) : COPY.techStack.placeholder}
            </span>
            <ChevronsUpDown className='size-4 shrink-0' aria-hidden='true' />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-x-0 z-20 overflow-hidden rounded-lg border border-border/80 bg-surface shadow-[0_18px_50px_-32px_rgba(38,40,66,0.55)] transition-[transform,opacity] duration-200 ease-out',
          shouldOpenUpward ? 'bottom-full mb-2' : 'top-full mt-2',
          isPickerOpen && 'translate-y-0 opacity-100',
          !isPickerOpen && 'pointer-events-none invisible opacity-0',
          !isPickerOpen && (shouldOpenUpward ? 'translate-y-1' : '-translate-y-1'),
        )}
      >
        <label className='flex items-center gap-2 border-b border-border/70 px-3 py-2.5'>
          <Search className='size-4 text-muted-foreground' aria-hidden='true' />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={COPY.techStack.search}
            className='h-8 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle-foreground'
          />
        </label>

        <div className='no-scrollbar max-h-72 overflow-y-auto p-2'>
          {groupedOptions.length === 0 ? (
            <p className='px-3 py-8 text-center text-sm text-muted-foreground'>
              {COPY.techStack.empty}
            </p>
          ) : (
            groupedOptions.map((group) => (
              <div key={group.category} className='mb-2 last:mb-0'>
                <p className='px-2 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-subtle-foreground uppercase'>
                  {COPY.techStack.categories[group.category]}
                </p>
                <div className='flex flex-col'>
                  {group.items.map((techItem) => {
                    const selected = isTechSelected(techItem.name)

                    return (
                      <button
                        key={techItem.id}
                        type='button'
                        onClick={() => onToggleTech(techItem.name)}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
                          selected
                            ? 'bg-accent/10 text-foreground'
                            : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                        )}
                      >
                        <TechIcon name={techItem.name} className='size-4' />
                        <span className='flex-1'>{techItem.name}</span>
                        {selected ? (
                          <Check className='size-4 text-accent' aria-hidden='true' />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
