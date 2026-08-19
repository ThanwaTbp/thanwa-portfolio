import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

import { getDefaultPortfolioData } from '@/constants/portfolio-defaults'
import { createAppwriteDatabases, getAppwriteServerConfig, ID, Query } from '@/lib/appwrite-server'
import type { IPortfolioData } from '@/types/portfolio-data'

const LOCAL_DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json')
const PORTFOLIO_DOCUMENT_KEY = 'main'

function isValidPortfolioData(value: unknown): value is IPortfolioData {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<IPortfolioData>

  return (
    Boolean(candidate.profile) &&
    Array.isArray(candidate.projects) &&
    Array.isArray(candidate.experiences) &&
    Array.isArray(candidate.educations) &&
    Array.isArray(candidate.skillCategories)
  )
}

async function readLocalPortfolioData(): Promise<IPortfolioData | null> {
  try {
    const rawContent = await readFile(LOCAL_DATA_PATH, 'utf8')
    const parsed = JSON.parse(rawContent) as unknown

    return isValidPortfolioData(parsed) ? parsed : null
  } catch {
    return null
  }
}

async function writeLocalPortfolioData(data: IPortfolioData) {
  await mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true })
  await writeFile(LOCAL_DATA_PATH, JSON.stringify(data, null, 2), 'utf8')
}

async function readAppwritePortfolioData(): Promise<IPortfolioData | null> {
  const config = getAppwriteServerConfig()

  if (!config) return null

  const databases = createAppwriteDatabases()
  const response = await databases.listDocuments({
    databaseId: config.databaseId,
    collectionId: config.collectionId,
    queries: [Query.equal('key', PORTFOLIO_DOCUMENT_KEY), Query.limit(1)],
  })

  const document = response.documents[0]

  if (!document || typeof document.payload !== 'string') {
    return null
  }

  try {
    const parsed = JSON.parse(document.payload) as unknown
    return isValidPortfolioData(parsed) ? parsed : null
  } catch {
    return null
  }
}

async function writeAppwritePortfolioData(data: IPortfolioData) {
  const config = getAppwriteServerConfig()

  if (!config) {
    throw new Error('Appwrite store is not configured')
  }

  const databases = createAppwriteDatabases()
  const payload = JSON.stringify(data)
  const response = await databases.listDocuments({
    databaseId: config.databaseId,
    collectionId: config.collectionId,
    queries: [Query.equal('key', PORTFOLIO_DOCUMENT_KEY), Query.limit(1)],
  })

  const existingDocument = response.documents[0]

  if (existingDocument) {
    await databases.updateDocument({
      databaseId: config.databaseId,
      collectionId: config.collectionId,
      documentId: existingDocument.$id,
      data: {
        key: PORTFOLIO_DOCUMENT_KEY,
        payload,
      },
    })
    return
  }

  await databases.createDocument({
    databaseId: config.databaseId,
    collectionId: config.collectionId,
    documentId: ID.unique(),
    data: {
      key: PORTFOLIO_DOCUMENT_KEY,
      payload,
    },
  })
}

export const loadPortfolioData = cache(async (): Promise<IPortfolioData> => {
  const appwriteData = await readAppwritePortfolioData()
  if (appwriteData) return appwriteData

  const localData = await readLocalPortfolioData()
  if (localData) return localData

  return getDefaultPortfolioData()
})

export async function savePortfolioData(data: IPortfolioData) {
  if (getAppwriteServerConfig()) {
    await writeAppwritePortfolioData(data)
    return
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Configure Appwrite database for production data persistence')
  }

  await writeLocalPortfolioData(data)
}

export function getPortfolioPersistenceMode(): 'appwrite' | 'local' | 'defaults' {
  if (getAppwriteServerConfig()) return 'appwrite'
  return 'local'
}
