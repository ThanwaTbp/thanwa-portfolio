import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/auth'
import { loadPortfolioDataForAdmin, savePortfolioData } from '@/services/portfolio-store-service'
import type { IPortfolioData } from '@/types/portfolio-data'
import { isValidYearMonth } from '@/utils/date'

function revalidatePortfolioPages() {
  revalidatePath('/', 'layout')
  revalidatePath('/projects')
  revalidatePath('/experience')
  revalidatePath('/education')
  revalidatePath('/skills')
  revalidatePath('/admin', 'layout')
}

export async function GET() {
  try {
    const data = await loadPortfolioDataForAdmin()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load admin portfolio data', error)
    return NextResponse.json(
      { error: 'Cannot load portfolio data from Appwrite. Check the project and try again.' },
      { status: 503 },
    )
  }
}

function hasInvalidDates(entries: unknown[]) {
  return entries.some((entry) => {
    if (!entry || typeof entry !== 'object') return true

    const dates = entry as { startDate?: unknown; endDate?: unknown }
    return (
      !isValidYearMonth(dates.startDate) ||
      (dates.endDate !== null && !isValidYearMonth(dates.endDate))
    )
  })
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
    !body ||
    !body.profile ||
    !Array.isArray(body.projects) ||
    !Array.isArray(body.experiences) ||
    !Array.isArray(body.educations) ||
    !Array.isArray(body.skillCategories)
  ) {
    return NextResponse.json({ error: 'Invalid portfolio payload' }, { status: 400 })
  }

  if (hasInvalidDates(body.experiences) || hasInvalidDates(body.educations)) {
    return NextResponse.json(
      { error: 'Experience and education dates must use YYYY-MM.' },
      { status: 400 },
    )
  }

  const slugs = body.projects.map((project) =>
    typeof project?.slug === 'string' ? project.slug.trim() : '',
  )
  if (
    slugs.some((slug) => !slug) ||
    new Set(slugs).size !== slugs.length
  ) {
    return NextResponse.json(
      { error: 'Project slugs must be present and unique.' },
      { status: 400 },
    )
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
