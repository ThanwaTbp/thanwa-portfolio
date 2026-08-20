import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { InputFile } from 'node-appwrite/file'

import {
  createAppwriteStorage,
  getAppwriteFileViewUrl,
  getAppwriteServerConfig,
  ID,
  isAppwriteStorageReady,
  Permission,
  Role,
} from '@/lib/appwrite-server'

const LOCAL_UPLOAD_DIRECTORY = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
])
const ALLOWED_DOCUMENT_TYPES = new Set(['application/pdf'])

export type MediaKind = 'image' | 'document'

export interface IUploadedMedia {
  url: string
  fileName: string
}

function getAllowedTypes(kind: MediaKind) {
  return kind === 'image'
    ? ALLOWED_IMAGE_TYPES
    : new Set([...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES])
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-')
}

function getFileExtension(fileName: string, mimeType: string) {
  const fromName = path.extname(fileName).replace('.', '').toLowerCase()
  if (fromName) return fromName

  if (mimeType === 'image/jpeg') return 'jpg'
  if (mimeType === 'image/png') return 'png'
  if (mimeType === 'image/webp') return 'webp'
  if (mimeType === 'image/gif') return 'gif'
  if (mimeType === 'image/avif') return 'avif'
  if (mimeType === 'application/pdf') return 'pdf'

  return 'bin'
}

export function getUploadPersistenceMode(): 'appwrite' | 'local' {
  return isAppwriteStorageReady() ? 'appwrite' : 'local'
}

export async function saveUploadedMedia(file: File, kind: MediaKind): Promise<IUploadedMedia> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File is larger than 8MB')
  }

  if (!getAllowedTypes(kind).has(file.type)) {
    throw new Error(
      kind === 'image' ? 'Only image files are allowed' : 'Only image or PDF files are allowed',
    )
  }

  const safeName = sanitizeFileName(file.name || `upload.${getFileExtension(file.name, file.type)}`)
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  if (isAppwriteStorageReady()) {
    return saveAppwriteMedia(fileBuffer, safeName)
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Configure Appwrite storage for production file uploads')
  }

  return saveLocalMedia(fileBuffer, safeName)
}

async function saveLocalMedia(fileBuffer: Buffer, fileName: string): Promise<IUploadedMedia> {
  await mkdir(LOCAL_UPLOAD_DIRECTORY, { recursive: true })

  const uniqueName = `${Date.now()}-${ID.unique()}-${fileName}`
  await writeFile(path.join(LOCAL_UPLOAD_DIRECTORY, uniqueName), fileBuffer)

  return {
    url: `/uploads/${uniqueName}`,
    fileName: uniqueName,
  }
}

async function saveAppwriteMedia(fileBuffer: Buffer, fileName: string): Promise<IUploadedMedia> {
  const config = getAppwriteServerConfig()

  if (!config?.bucketId) {
    throw new Error('Appwrite storage bucket is not configured')
  }

  const storage = createAppwriteStorage()
  const fileId = ID.unique()
  const inputFile = InputFile.fromBuffer(fileBuffer, fileName)

  await storage.createFile({
    bucketId: config.bucketId,
    fileId,
    file: inputFile,
    permissions: [Permission.read(Role.any())],
  })

  return {
    url: getAppwriteFileViewUrl(fileId),
    fileName,
  }
}
