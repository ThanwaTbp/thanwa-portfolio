'use client'

import { Plus, Trash2 } from 'lucide-react'

import { buttonVariants } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'

interface IAdminStringListFieldProps {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function AdminStringListField({
  label,
  values,
  onChange,
  placeholder,
}: IAdminStringListFieldProps) {
  const onChangeItem = (itemIndex: number, nextValue: string) => {
    onChange(values.map((value, currentIndex) => (currentIndex === itemIndex ? nextValue : value)))
  }

  const onRemoveItem = (itemIndex: number) => {
    onChange(values.filter((_, currentIndex) => currentIndex !== itemIndex))
  }

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between gap-3'>
        <p className='text-sm font-medium text-foreground'>{label}</p>
        <button
          type='button'
          onClick={() => onChange([...values, ''])}
          className={buttonVariants({ variant: 'ghost', size: 'sm' })}
        >
          <Plus className='size-4' />
          {COPY.admin.actions.addItem}
        </button>
      </div>
      {values.length === 0 ? (
        <p className='text-sm text-muted-foreground'>{COPY.admin.emptyList}</p>
      ) : (
        <div className='space-y-2'>
          {values.map((value, itemIndex) => (
            <div key={`${label}-${itemIndex}`} className='flex gap-2'>
              <input
                value={value}
                onChange={(event) => onChangeItem(itemIndex, event.target.value)}
                placeholder={placeholder}
                className='admin-input'
              />
              <button
                type='button'
                onClick={() => onRemoveItem(itemIndex)}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                <Trash2 className='size-4' />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
