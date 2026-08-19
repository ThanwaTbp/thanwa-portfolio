import { Client, Databases, ID, Query } from 'node-appwrite'

export interface IAppwriteServerConfig {
  endpoint: string
  projectId: string
  apiKey: string
  databaseId: string
  collectionId: string
}

export function getAppwriteServerConfig(): IAppwriteServerConfig | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
  const apiKey = process.env.APPWRITE_API_KEY
  const databaseId = process.env.APPWRITE_DATABASE_ID
  const collectionId = process.env.APPWRITE_COLLECTION_ID

  if (!endpoint || !projectId || !apiKey || !databaseId || !collectionId) {
    return null
  }

  return {
    endpoint,
    projectId,
    apiKey,
    databaseId,
    collectionId,
  }
}

export function isAppwriteStoreReady() {
  return getAppwriteServerConfig() !== null
}

function createAppwriteServerClient() {
  const config = getAppwriteServerConfig()

  if (!config) {
    throw new Error('Appwrite server environment variables are not configured')
  }

  return new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey)
}

export function createAppwriteDatabases() {
  return new Databases(createAppwriteServerClient())
}

export { ID, Query }
