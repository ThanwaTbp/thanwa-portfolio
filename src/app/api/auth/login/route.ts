import { NextResponse } from 'next/server'

import { createAdminSession, getAdminCredentials, isAuthConfigured } from '@/lib/auth'

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin credentials are not configured on the server' },
      { status: 503 },
    )
  }

  const credentials = getAdminCredentials()

  if (!credentials) {
    return NextResponse.json({ error: 'Admin credentials are missing' }, { status: 503 })
  }

  let body: { email?: string; password?: string }

  try {
    body = (await request.json()) as { email?: string; password?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const isValidEmail = email === credentials.email.trim().toLowerCase()
  const isValidPassword = password === credentials.password

  if (!isValidEmail || !isValidPassword) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  await createAdminSession(email)

  return NextResponse.json({ ok: true, email })
}
