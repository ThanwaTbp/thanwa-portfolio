import { Account, Client } from 'appwrite'

export interface IAppwriteConfig {
  endpoint: string
  projectId: string
}

export function getAppwriteConfig(): IAppwriteConfig | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

  if (!endpoint || !projectId) return null

  return { endpoint, projectId }
}

export function createAppwriteClient() {
  const config = getAppwriteConfig()

  if (!config) {
    throw new Error('Appwrite environment variables are not configured yet')
  }

  return new Client().setEndpoint(config.endpoint).setProject(config.projectId)
}

export function createAppwriteAccount() {
  return new Account(createAppwriteClient())
}
