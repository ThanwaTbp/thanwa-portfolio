'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ANIMATION_DURATION, ANIMATION_EASE, gsap, STAGGER } from '@/lib/animation'
import { cn } from '@/lib/utils'

export interface IHeroCodePanelProps {
  name: string
  role: string
  location: string
  stack: string[]
  available: boolean
}

interface ICodeToken {
  value: string
  tone: 'keyword' | 'identifier' | 'key' | 'string' | 'boolean' | 'punctuation' | 'plain'
}

interface ICodeLine {
  tokens: ICodeToken[]
}

const TOKEN_CLASS: Record<ICodeToken['tone'], string> = {
  keyword: 'text-accent',
  identifier: 'text-foreground',
  key: 'text-accent-2',
  string: 'text-[#c45d4b] dark:text-[#e8a196]',
  boolean: 'text-accent',
  punctuation: 'text-subtle-foreground',
  plain: 'text-muted-foreground',
}

function buildCodeLines({
  name,
  role,
  location,
  stack,
  available,
}: IHeroCodePanelProps): ICodeLine[] {
  return [
    {
      tokens: [
        { value: 'const ', tone: 'keyword' },
        { value: 'frontend', tone: 'identifier' },
        { value: ' = {', tone: 'punctuation' },
      ],
    },
    {
      tokens: [
        { value: '  name', tone: 'key' },
        { value: ': ', tone: 'punctuation' },
        { value: `'${name}'`, tone: 'string' },
        { value: ',', tone: 'punctuation' },
      ],
    },
    {
      tokens: [
        { value: '  role', tone: 'key' },
        { value: ': ', tone: 'punctuation' },
        { value: `'${role}'`, tone: 'string' },
        { value: ',', tone: 'punctuation' },
      ],
    },
    {
      tokens: [
        { value: '  location', tone: 'key' },
        { value: ': ', tone: 'punctuation' },
        { value: `'${location}'`, tone: 'string' },
        { value: ',', tone: 'punctuation' },
      ],
    },
    {
      tokens: [
        { value: '  stack', tone: 'key' },
        { value: ': [', tone: 'punctuation' },
      ],
    },
    ...stack.map((tech, techIndex) => ({
      tokens: [
        { value: `    '${tech}'`, tone: 'string' as const },
        { value: techIndex === stack.length - 1 ? '' : ',', tone: 'punctuation' as const },
      ],
    })),
    {
      tokens: [{ value: '  ],', tone: 'punctuation' }],
    },
    {
      tokens: [
        { value: '  available', tone: 'key' },
        { value: ': ', tone: 'punctuation' },
        { value: String(available), tone: 'boolean' },
      ],
    },
    {
      tokens: [{ value: '}', tone: 'punctuation' }],
    },
  ]
}

export function HeroCodePanel({ name, role, location, stack, available }: IHeroCodePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const caretRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const codeLines = buildCodeLines({ name, role, location, stack, available })

  useGSAP(
    () => {
      const panel = panelRef.current
      if (!panel) return

      const lineElements = panel.querySelectorAll<HTMLElement>('[data-code-line]')
      const caret = caretRef.current

      if (reducedMotion) {
        gsap.set(lineElements, { opacity: 1, y: 0 })
        if (caret) gsap.set(caret, { opacity: 1 })
        return
      }

      gsap.set(lineElements, { opacity: 0, y: 8 })

      const timeline = gsap.timeline()

      timeline.to(lineElements, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_DURATION.fast,
        stagger: STAGGER.base,
        ease: ANIMATION_EASE.soft,
      })

      if (caret) {
        timeline.to(
          caret,
          {
            opacity: 0,
            duration: 0.55,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          },
          '>-0.1',
        )
      }

      return () => timeline.kill()
    },
    { scope: panelRef, dependencies: [name, role, location, available, reducedMotion] },
  )

  return (
    <div
      ref={panelRef}
      className='w-full overflow-hidden rounded-[1.5rem] border border-border/80 bg-surface/90 shadow-[0_24px_80px_-48px_rgba(38,40,66,0.55)]'
    >
      <div className='flex items-center gap-3 border-b border-border/70 px-4 py-3'>
        <div className='flex items-center gap-1.5' aria-hidden='true'>
          <span className='size-2.5 rounded-full bg-[#ff5f57]' />
          <span className='size-2.5 rounded-full bg-[#febc2e]' />
          <span className='size-2.5 rounded-full bg-[#28c840]' />
        </div>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='truncate rounded-md border border-border/70 bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground'>
            profile.ts
          </span>
        </div>
      </div>

      <div className='overflow-x-auto px-4 py-4'>
        <pre className='min-w-max font-mono text-[13px] leading-7 sm:text-sm'>
          {codeLines.map((codeLine, lineIndex) => (
            <div key={`${codeLine.tokens[0]?.value}-${lineIndex}`} className='flex gap-4'>
              <span
                className='w-5 shrink-0 select-none text-right text-subtle-foreground/80'
                aria-hidden='true'
              >
                {lineIndex + 1}
              </span>
              <span data-code-line className='whitespace-pre'>
                {codeLine.tokens.map((token, tokenIndex) => (
                  <span
                    key={`${token.value}-${tokenIndex}`}
                    className={cn(TOKEN_CLASS[token.tone])}
                  >
                    {token.value}
                  </span>
                ))}
                {lineIndex === codeLines.length - 1 ? (
                  <span
                    ref={caretRef}
                    aria-hidden='true'
                    className='ml-[1px] inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-accent align-baseline'
                  />
                ) : null}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
