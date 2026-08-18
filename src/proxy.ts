import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Next.js 16 เปลี่ยนชื่อ Middleware เป็น Proxy — ทำหน้าที่เดิมคือ redirect/rewrite ตาม locale prefix
export const proxy = createMiddleware(routing)

export const config = {
  // ข้าม _next, _vercel, api และไฟล์ static (path ที่มีจุดในชื่อ เช่น favicon.ico, .svg, .png)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
