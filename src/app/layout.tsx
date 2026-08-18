import './globals.css'

// root layout เป็น pass-through เท่านั้น — html/body ย้ายไปอยู่ที่ [locale]/layout.tsx
// เพื่อให้ locale layout ควบคุม lang attribute และ font ได้ตรงกับ route จริง
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return children
}
