'use client'

import { useState } from 'react'

interface IUseAdminUploadResult {
  isUploading: boolean
  errorMessage: string | null
  uploadFile: (file: File, kind?: 'image' | 'document') => Promise<string | null>
}

export function useAdminUpload(): IUseAdminUploadResult {
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const uploadFile = async (file: File, kind: 'image' | 'document' = 'image') => {
    setIsUploading(true)
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('kind', kind)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const payload = (await response.json()) as { url?: string; error?: string }

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? 'Failed to upload file')
      }

      return payload.url
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload file'
      setErrorMessage(message)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return {
    isUploading,
    errorMessage,
    uploadFile,
  }
}
