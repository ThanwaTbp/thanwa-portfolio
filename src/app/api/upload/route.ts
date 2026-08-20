import { NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/auth'
import { saveUploadedMedia, type MediaKind } from '@/services/media-store-service'

function parseKind(value: FormDataEntryValue | null): MediaKind {
  return value === 'document' ? 'document' : 'image'
}

export async function POST(request: Request) {
  try {
    await requireAdminSession()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid upload payload' }, { status: 400 })
  }

  const file = formData.get('file')
  const kind = parseKind(formData.get('kind'))

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'A file is required' }, { status: 400 })
  }

  try {
    const uploaded = await saveUploadedMedia(file, kind)
    return NextResponse.json(uploaded)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to upload file'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
