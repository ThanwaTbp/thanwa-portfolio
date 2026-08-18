import type { Locale } from '@/i18n/routing'
import type { ILocalizedText } from '@/types/portfolio'

/**
 * type locale ที่ใช้ทั่วทั้ง data layer — อ้างอิงจาก '@/i18n/routing' โดยตรง
 * ตั้งชื่อ alias เป็น SupportedLocale ไว้ให้ utils อื่น (เช่น date.ts) import ใช้ได้
 * โดยไม่ต้องผูกกับ i18n routing ตรงๆ
 */
export type SupportedLocale = Locale

/**
 * คืนข้อความตาม locale ที่ระบุ
 * ถ้าค่าของ locale นั้นว่างเปล่า (string ว่าง) ให้ fallback ไปใช้ค่า 'en' แทน
 * เพื่อกันกรณีข้อมูลแปลไทยยังไม่ครบ ไม่ให้ UI แสดงข้อความว่าง
 */
export function getLocalizedText(text: ILocalizedText, locale: Locale): string {
  const localizedValue = text[locale]

  return localizedValue && localizedValue.trim().length > 0 ? localizedValue : text.en
}
