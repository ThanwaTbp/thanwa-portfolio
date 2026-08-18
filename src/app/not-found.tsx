import Link from 'next/link'

// fallback 404 ระดับ root — ใช้เมื่อ path ไม่มี locale prefix เลย (เช่น /some-unknown-path)
// root layout เป็น pass-through (ไม่มี html/body) จึงต้อง render เองที่นี่ และห้ามพึ่ง next-intl
// เพราะไม่มี locale context ให้ใช้ตรงนี้ (จึงใช้ next/link ตรงๆ แทน @/i18n/navigation ซึ่งต้องพึ่ง locale routing)
// hardcode เป็นภาษาอังกฤษและลิงก์กลับไปที่ /en
export default function RootNotFound() {
  return (
    <html lang='en'>
      <body className='flex min-h-dvh flex-col items-center justify-center gap-6 bg-white px-4 text-center text-slate-900'>
        <p className='text-8xl font-bold tracking-tight text-slate-900'>404</p>
        <h1 className='text-2xl font-semibold tracking-tight'>Page not found</h1>
        <p className='max-w-md text-base text-slate-500'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href='/en'
          className='inline-flex h-11 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5'
        >
          Back to home
        </Link>
      </body>
    </html>
  )
}
