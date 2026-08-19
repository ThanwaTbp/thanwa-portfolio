import { getAdminCredentials, isAuthConfigured } from '@/lib/auth'
import { getAppwriteConfig } from '@/lib/appwrite'

export interface ILoginPayload {
  email: string
  password: string
}

export function isAppwriteReady() {
  return getAppwriteConfig() !== null
}

export function isAdminAuthReady() {
  return isAuthConfigured() && getAdminCredentials() !== null
}

export async function signInWithAppwrite(payload: ILoginPayload) {
  void payload
  throw new Error('Use /api/auth/login for admin authentication')
}
