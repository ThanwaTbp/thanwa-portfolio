import { Client, Databases, ID, Permission, Query, Role, Storage } from 'node-appwrite'

export interface IAppwriteServerConfig {
  endpoint: string
  projectId: string
  apiKey: string
  databaseId: string
  collectionId: string
  bucketId?: string
}

export function getAppwriteServerConfig(): IAppwriteServerConfig | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
  const apiKey = process.env.APPWRITE_API_KEY
  const databaseId = process.env.APPWRITE_DATABASE_ID
  const collectionId = process.env.APPWRITE_COLLECTION_ID
  const bucketId = process.env.APPWRITE_BUCKET_ID

  if (!endpoint || !projectId || !apiKey || !databaseId || !collectionId) {
    return null
  }

  return {
    endpoint,
    projectId,
    apiKey,
    databaseId,
    collectionId,
    bucketId: bucketId || undefined,
  }
}

export function isAppwriteStoreReady() {
  return getAppwriteServerConfig() !== null
}

export function isAppwriteStorageReady() {
  const config = getAppwriteServerConfig()
  return Boolean(config?.bucketId)
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

export function createAppwriteStorage() {
  return new Storage(createAppwriteServerClient())
}

export function getAppwriteFileViewUrl(fileId: string) {
  const config = getAppwriteServerConfig()

  if (!config?.bucketId) {
    throw new Error('Appwrite storage bucket is not configured')
  }

  const endpoint = config.endpoint.replace(/\/$/, '')
  return `${endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${config.projectId}`
}

export { ID, Permission, Query, Role }
