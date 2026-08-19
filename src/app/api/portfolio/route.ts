import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/auth'
import { loadPortfolioData, savePortfolioData } from '@/services/portfolio-store-service'
import type { IPortfolioData } from '@/types/portfolio-data'

function revalidatePortfolioPages() {
  revalidatePath('/', 'layout')
  revalidatePath('/projects')
  revalidatePath('/experience')
  revalidatePath('/education')
  revalidatePath('/skills')
  revalidatePath('/admin')
}

export async function GET() {
  const data = await loadPortfolioData()
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: IPortfolioData

  try {
    body = (await request.json()) as IPortfolioData
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (
    !body.profile ||
    !Array.isArray(body.projects) ||
    !Array.isArray(body.experiences) ||
    !Array.isArray(body.educations) ||
    !Array.isArray(body.skillCategories)
  ) {
    return NextResponse.json({ error: 'Invalid portfolio payload' }, { status: 400 })
  }

  try {
    await savePortfolioData(body)
    revalidatePortfolioPages()
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save portfolio data'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
