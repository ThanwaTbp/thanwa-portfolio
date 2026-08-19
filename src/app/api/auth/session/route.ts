import { NextResponse } from 'next/server'

import { getAdminSession, isAuthConfigured } from '@/lib/auth'
import { getPortfolioPersistenceMode } from '@/services/portfolio-store-service'

export async function GET() {
  const session = await getAdminSession()

  return NextResponse.json({
    authenticated: Boolean(session),
    email: session?.email ?? null,
    authConfigured: isAuthConfigured(),
    persistenceMode: getPortfolioPersistenceMode(),
  })
}
