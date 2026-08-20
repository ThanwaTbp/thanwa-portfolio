'use client'

import Image from 'next/image'
import { ImagePlus, LoaderCircle, Trash2 } from 'lucide-react'

import { buttonVariants } from '@/components/ui/Button'
import { COPY } from '@/constants/copy'
import { useAdminActionAlert } from '@/features/admin/hooks/useAdminActionAlert'
import { useAdminUpload } from '@/features/admin/hooks/useAdminUpload'
import { cn } from '@/lib/utils'

interface IAdminImageFieldProps {
  label: string
  value?: string
  onChange: (url: string | undefined) => void
  kind?: 'image' | 'document'
  shape?: 'wide' | 'portrait'
}

export function AdminImageField({
  label,
  value,
  onChange,
  kind = 'image',
  shape = 'wide',
}: IAdminImageFieldProps) {
  const { isUploading, errorMessage, uploadFile } = useAdminUpload()
  const { confirmDelete } = useAdminActionAlert()
  const looksLikeImage = Boolean(value && /\.(jpe?g|png|webp|gif|avif)(\?|$)/i.test(value))
  const showImagePreview = Boolean(
    value && (kind === 'image' ? !value.toLowerCase().includes('.pdf') : looksLikeImage),
  )
  const isPortrait = shape === 'portrait'

  const onPickFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const url = await uploadFile(file, kind)
    if (url) onChange(url)
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm font-medium text-foreground'>{label}</p>
      {value ? (
        <div
          className={cn(
            'overflow-hidden border border-border/70 bg-surface-muted',
            isPortrait ? 'aspect-square max-w-56 rounded-2xl' : 'rounded-xl',
          )}
        >
          {showImagePreview ? (
            <Image
              src={value}
              alt=''
              width={isPortrait ? 448 : 960}
              height={isPortrait ? 448 : 384}
              unoptimized
              className={cn('w-full object-cover', isPortrait ? 'h-full' : 'h-auto max-h-48')}
            />
          ) : (
            <a
              href={value}
              target='_blank'
              rel='noopener noreferrer'
              className='block truncate px-4 py-3 text-sm text-accent'
            >
              {value}
            </a>
          )}
        </div>
      ) : isPortrait ? (
        <div className='flex aspect-square max-w-56 items-center justify-center rounded-2xl border border-dashed border-border/80 bg-surface-muted/60 text-subtle-foreground'>
          <ImagePlus className='size-7' />
        </div>
      ) : null}
      <div className='flex flex-wrap items-center gap-2'>
        <label className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'cursor-pointer')}>
          {isUploading ? (
            <LoaderCircle className='size-4 animate-spin' />
          ) : (
            <ImagePlus className='size-4' />
          )}
          {value ? COPY.admin.media.replace : COPY.admin.media.upload}
          <input
            type='file'
            accept={kind === 'image' ? 'image/*' : 'image/*,.pdf,application/pdf'}
            className='sr-only'
            onChange={(event) => void onPickFile(event)}
            disabled={isUploading}
          />
        </label>
        {value ? (
          <button
            type='button'
            onClick={() => {
              void (async () => {
                const didConfirm = await confirmDelete()
                if (!didConfirm) return
                onChange(undefined)
              })()
            }}
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <Trash2 className='size-4' />
            {COPY.admin.media.remove}
          </button>
        ) : null}
      </div>
      {errorMessage ? <p className='text-sm text-red-500'>{errorMessage}</p> : null}
    </div>
  )
}
