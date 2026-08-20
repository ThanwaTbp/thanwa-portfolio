import type { IconType } from 'react-icons'

export type TechCategory =
  | 'language'
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'database'
  | 'cloud'
  | 'tooling'
  | 'ai'
  | 'design'
  | 'animation'
  | 'testing'
  | 'cms'
  | 'payment'

export interface ITechItem {
  id: string
  name: string
  aliases: string[]
  category: TechCategory
  icon?: IconType
  colorClass: string
}

export interface ITechStackGroup {
  category: TechCategory
  items: ITechItem[]
}
