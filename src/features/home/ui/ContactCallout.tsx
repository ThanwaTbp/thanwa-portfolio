import { getTranslations } from 'next-intl/server'

import type { IProfile } from '@/types/portfolio'
import { buttonVariants } from '@/components/ui/Button'
import { BorderBeam } from '@/components/common/BorderBeam'
import { MagneticButton } from '@/components/common/MagneticButton'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'

export interface IContactCalloutProps {
  profile: IProfile
}

export async function ContactCallout({ profile }: IContactCalloutProps) {
  const translateCommon = await getTranslations('common')
  const translateHome = await getTranslations('home')

  const emailSocial = profile.socials.find((social) => social.platform === 'email')

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <RevealOnScroll>
        <div className='relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:px-12'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl'
          />
          <BorderBeam />

          <div className='relative flex flex-col items-center gap-6'>
            <h2 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
              {translateCommon('getInTouch')}
            </h2>
            {emailSocial && (
              <MagneticButton>
                <a href={emailSocial.url} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
                  {translateHome('ctaContact')}
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
