import type { IExperience } from '@/types/portfolio'

/**
 * เรียงประสบการณ์แบบล่าสุดอยู่บนสุด
 * งานที่ยังทำอยู่ (endDate เป็น null) ต้องขึ้นก่อนเสมอ ต่อด้วยงานที่จบล่าสุด
 * แล้วค่อยใช้วันเริ่มงานเป็นตัวตัดสินกรณีจบเดือนเดียวกัน
 */
export function sortExperiencesByRecency(experiences: IExperience[]): IExperience[] {
  return [...experiences].sort((firstExperience, secondExperience) => {
    const isFirstCurrent = firstExperience.endDate === null
    const isSecondCurrent = secondExperience.endDate === null

    if (isFirstCurrent !== isSecondCurrent) return isFirstCurrent ? -1 : 1

    const endDateOrder = (secondExperience.endDate ?? '').localeCompare(
      firstExperience.endDate ?? '',
    )
    if (endDateOrder !== 0) return endDateOrder

    return secondExperience.startDate.localeCompare(firstExperience.startDate)
  })
}
