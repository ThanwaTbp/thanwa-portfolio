import { CheckCircle2, Circle, Mail, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/i18n/routing'
import type { IProfile } from '@/types/portfolio'
import { getLocalizedText } from '@/utils/localize'
import { Card, CardContent } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import { RevealOnScroll } from '@/components/common/RevealOnScroll'
import { SectionHeading } from '@/components/common/SectionHeading'

export interface IAboutSectionProps {
  profile: IProfile
  locale: Locale
}

export async function AboutSection({ profile, locale }: IAboutSectionProps) {
  const translate = await getTranslations('home')
  const translateCommon = await getTranslations('common')

  const emailSocial = profile.socials.find((social) => social.platform === 'email')

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28'>
      <RevealOnScroll>
        <SectionHeading
          eyebrow={translate('aboutTitle')}
          title={getLocalizedText(profile.name, locale)}
          description={translate('aboutDescription')}
        />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className='mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12'>
        <p className='text-lg leading-relaxed text-muted-foreground'>{getLocalizedText(profile.bio, locale)}</p>

        <Card>
          <CardContent className='flex flex-col gap-5 p-6'>
            <div className='flex items-start gap-3'>
              <MapPin className='mt-0.5 size-5 shrink-0 text-accent' aria-hidden='true' />
              <p className='text-sm font-medium text-foreground'>{getLocalizedText(profile.location, locale)}</p>
            </div>

            <Separator />

            <div className='flex items-start gap-3'>
              {profile.available ? (
                <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-accent' aria-hidden='true' />
              ) : (
                <Circle className='mt-0.5 size-5 shrink-0 text-subtle-foreground' aria-hidden='true' />
              )}
              <p className='text-sm font-medium text-foreground'>
                {profile.available ? translateCommon('availableForWork') : translateCommon('notAvailable')}
              </p>
            </div>

            {emailSocial && (
              <>
                <Separator />
                <div className='flex items-start gap-3'>
                  <Mail className='mt-0.5 size-5 shrink-0 text-accent' aria-hidden='true' />
                  <a
                    href={emailSocial.url}
                    className='break-all text-sm font-medium text-foreground transition-colors hover:text-accent'
                  >
                    {emailSocial.label}
                  </a>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </RevealOnScroll>
    </section>
  )
}
