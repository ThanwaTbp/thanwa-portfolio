import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const SESSION_COOKIE_NAME = 'portfolio-admin-session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export interface IAdminSession {
  email: string
  role: 'admin'
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET

  if (!secret || secret.length < 16) {
    throw new Error('AUTH_SECRET must be set and at least 16 characters long')
  }

  return new TextEncoder().encode(secret)
}

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) return null

  return { email, password }
}

export function isAuthConfigured() {
  return getAdminCredentials() !== null && Boolean(process.env.AUTH_SECRET)
}

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email, role: 'admin' satisfies IAdminSession['role'] })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getAuthSecret())

  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getAdminSession(): Promise<IAdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getAuthSecret())

    if (payload.role !== 'admin' || typeof payload.email !== 'string') {
      return null
    }

    return {
      email: payload.email,
      role: 'admin',
    }
  } catch {
    return null
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}
