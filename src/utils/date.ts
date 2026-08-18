import type { SupportedLocale } from '@/utils/localize'

// คำเตือน: ฟังก์ชันในไฟล์นี้ต้องคืนค่าตรงกันทั้งบน server และ client (deterministic)
// ห้ามเรียกฟังก์ชันที่พึ่งพา "เวลาปัจจุบัน" (เช่น calculateDurationInMonths แบบไม่ส่ง referenceDate)
// ตรงๆ ใน component ที่ render ทั้งฝั่ง server และ client โดยไม่ระวัง เพราะเวลา render
// ฝั่ง server กับ client จะไม่ตรงกันเป๊ะ ทำให้เกิด hydration mismatch ได้
// ถ้าจำเป็นต้องใช้ "วันนี้" ให้ fix ค่า referenceDate ไว้ล่วงหน้า (เช่น คำนวณครั้งเดียวใน service
// หรือส่งจาก server component เป็น prop) แทนการเรียก new Date() ซ้ำในแต่ละฝั่ง

interface IYearMonth {
  year: number
  month: number
}

/** แปลง 'YYYY-MM' เป็นปี/เดือนแบบตัวเลข */
function parseYearMonth(dateString: string): IYearMonth {
  const [yearPart, monthPart] = dateString.split('-')

  return {
    year: Number(yearPart),
    month: Number(monthPart),
  }
}

/** สร้าง Intl locale tag — ภาษาไทยใช้ปฏิทินพุทธศักราชเสมอ */
function resolveIntlLocaleTag(locale: SupportedLocale): string {
  return locale === 'th' ? 'th-TH-u-ca-buddhist' : 'en-US'
}

/**
 * แปลง 'YYYY-MM' เป็นข้อความ เช่น 'Jan 2024' (en) หรือ 'ม.ค. 2567' (th)
 * ใช้ Date.UTC เพื่อกันปัญหา timezone ทำให้ผลลัพธ์ต่างกันระหว่าง server/client
 */
export function formatMonthYear(dateString: string, locale: SupportedLocale): string {
  const { year, month } = parseYearMonth(dateString)
  const utcDate = new Date(Date.UTC(year, month - 1, 1))

  const formatter = new Intl.DateTimeFormat(resolveIntlLocaleTag(locale), {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return formatter.format(utcDate)
}

/**
 * แปลงช่วงเวลาเป็นข้อความ เช่น 'Jan 2023 - Present' หรือ 'ม.ค. 2566 - ปัจจุบัน'
 * endDate เป็น null หมายถึงยังทำงาน/เรียนอยู่ปัจจุบัน ให้ใช้ presentLabel แทน
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null,
  locale: SupportedLocale,
  presentLabel: string,
): string {
  const startLabel = formatMonthYear(startDate, locale)
  const endLabel = endDate ? formatMonthYear(endDate, locale) : presentLabel

  return `${startLabel} - ${endLabel}`
}

/**
 * คำนวณระยะเวลาเป็นจำนวนเดือน แบบนับรวมเดือนเริ่มต้นด้วย (inclusive)
 * เช่น 2023-01 ถึง 2023-03 = 3 เดือน
 * ถ้า endDate เป็น null (ยังทำอยู่ปัจจุบัน) จะใช้ referenceDate แทน — ถ้าไม่ส่งมาจะ fallback เป็น
 * new Date() ของเวลาที่เรียกฟังก์ชันนี้ (ระวัง hydration mismatch ตามคำเตือนด้านบนของไฟล์)
 */
export function calculateDurationInMonths(
  startDate: string,
  endDate: string | null,
  referenceDate?: Date,
): number {
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

/**
 * แปลงจำนวนเดือนเป็นข้อความอ่านง่าย เช่น '2 yrs 3 mos' / '2 ปี 3 เดือน'
 * ถ้าไม่ครบปีจะแสดงแค่เดือน และถ้าลงตัวพอดีปีจะไม่แสดงเดือน
 */
export function formatDuration(months: number, locale: SupportedLocale): string {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  const yearLabel = locale === 'th' ? 'ปี' : 'yrs'
  const monthLabel = locale === 'th' ? 'เดือน' : 'mos'

  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} ${yearLabel}`)
  }

  if (remainingMonths > 0 || years === 0) {
    parts.push(`${remainingMonths} ${monthLabel}`)
  }

  return parts.join(' ')
}
