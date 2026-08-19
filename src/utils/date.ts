/**
 * แปลง 'YYYY-MM' เป็นปี/เดือนแบบตัวเลข
 */
function parseYearMonth(dateString: string) {
  const [yearPart, monthPart] = dateString.split('-')

  return {
    year: Number(yearPart),
    month: Number(monthPart),
  }
}

export function formatMonthYear(dateString: string) {
  const { year, month } = parseYearMonth(dateString)
  const utcDate = new Date(Date.UTC(year, month - 1, 1))

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(utcDate)
}

export function formatDateRange(startDate: string, endDate: string | null, presentLabel: string) {
  const startLabel = formatMonthYear(startDate)
  const endLabel = endDate ? formatMonthYear(endDate) : presentLabel

  return `${startLabel} - ${endLabel}`
}

export function calculateDurationInMonths(
  startDate: string,
  endDate: string | null,
  referenceDate?: Date,
) {
  const start = parseYearMonth(startDate)

  const end = endDate
    ? parseYearMonth(endDate)
    : (() => {
        const resolvedReferenceDate = referenceDate ?? new Date()
        return {
          year: resolvedReferenceDate.getUTCFullYear(),
          month: resolvedReferenceDate.getUTCMonth() + 1,
        }
      })()

  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1

  return Math.max(totalMonths, 1)
}

export function formatDuration(months: number) {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} yrs`)
  }

  if (remainingMonths > 0 || years === 0) {
    parts.push(`${remainingMonths} mos`)
  }

  return parts.join(' ')
}
