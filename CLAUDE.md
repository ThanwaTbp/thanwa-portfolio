@AGENTS.md

# Thanwa Portfolio — project conventions

## Stack

Next.js 16 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4, next-themes (dark/light), GSAP + ScrollTrigger, motion, lucide-react. Package manager: **bun**

## Structure

```
src/app/                routes (page.tsx สะอาด ไม่มี business logic)
src/components/ui/      base UI (Button, Card, Badge, ...)
src/components/common/  component กลาง + animation primitives
src/components/layout/  SiteHeader / SiteFooter
src/features/<name>/ui  section ของแต่ละหน้า
src/constants/          ข้อมูล portfolio + UI copy (`copy.ts`)
src/services/           portfolio-service.ts เป็นชั้นกลางก่อนถึง UI
```

## Code style

ไม่ใช้ semicolon · single quotes · ห้าม `any` · ห้าม inline style (ใช้ Tailwind) · interface ขึ้นต้นด้วย `I` · component PascalCase 2 พยางค์ขึ้นไป · event handler prefix `on` + กริยา · ตัวแปร loop ใช้ชื่อเอกพจน์ที่สื่อความหมาย · comment ภาษาไทย เฉพาะ business logic

## Animation rules (ห้ามละเมิด — เว็บนี้เน้นความลื่น)

animate ได้เฉพาะ `transform` / `opacity` · ใช้ `useGSAP()` เสมอเพื่อ auto cleanup · ScrollTrigger ที่เล่นครั้งเดียวใช้ `once: true` · ค่าที่เปลี่ยนทุกเฟรมเขียนผ่าน `ref` ไม่ใช่ `useState` · scroll/pointer listener ต้อง passive + rAF throttle · ทุก animation ต้องเคารพ `prefers-reduced-motion`

## Next.js 16 notes

`params`/`searchParams` เป็น Promise ต้อง `await` · เอกสารจริงอยู่ที่ `node_modules/next/dist/docs/`
