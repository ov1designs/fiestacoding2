"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useSignup } from "./signup-provider"
import { useLanguage } from "./language-provider"
import { FadeInSection } from "./fade-in-section"

export function HeroSection() {
  const { openSignup } = useSignup()
  const { t } = useLanguage()

  const eventInfo = [
    { label: t.hero.eventLocation, color: "text-fiesta-green" },
    { label: t.hero.eventAges, color: "text-fiesta-orange" },
    { label: t.hero.eventFormat, color: "text-fiesta-yellow" },
  ]

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center md:py-44">
      {/* Headline with staggered entrance */}
      <FadeInSection>
        <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] text-white md:text-7xl lg:text-[5.5rem]">
          <span className="text-fiesta-green">{t.hero.learn}</span>{" "}
          {t.hero.create}{" "}
          <span className="text-fiesta-red">{t.hero.celebrate}</span>
        </h1>
      </FadeInSection>

      {/* Mission box */}
      <FadeInSection delay={120}>
        <div className="mt-10 max-w-2xl rounded-xl border border-border/50 bg-background/50 px-6 py-6 backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:bg-background/60 md:px-10 md:py-8">
          <p className="text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.mission}
          </p>
          <a
            href="/about#meet-the-founder"
            className="link-underline mt-4 inline-block text-sm font-semibold text-fiesta-red/75 transition-colors hover:text-fiesta-red"
          >
            Founded by Marcus Hunt
          </a>
        </div>
      </FadeInSection>

      {/* CTA row */}
      <FadeInSection delay={240}>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={openSignup}
            className="btn-glow group inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg bg-fiesta-red px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-fiesta-red/25 hover:shadow-xl hover:shadow-fiesta-red/35 active:scale-[0.97]"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <a
            href="/volunteer"
            className="btn-glow inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-lg border-2 border-fiesta-orange/40 bg-fiesta-orange/5 px-8 py-3.5 text-base font-bold text-fiesta-orange hover:border-fiesta-orange/60 hover:bg-fiesta-orange/10 hover:shadow-lg hover:shadow-fiesta-orange/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </FadeInSection>

      {/* Event info strip */}
      <FadeInSection delay={360}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {eventInfo.map((item) => (
            <div
              key={item.label}
              className={`card-lift rounded-full border border-border bg-card px-4 py-2 ${item.color}`}
            >
              <span className="text-xs font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Next class and external opportunity */}
      <FadeInSection delay={480}>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:items-stretch">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-all duration-300 hover:border-fiesta-green/30 hover:bg-fiesta-green/5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fiesta-green" />
            <span className="text-xs font-medium text-muted-foreground">
              {t.hero.nextClass}{" "}
              <span className="text-foreground">{t.hero.nextClassDate}</span>
            </span>
          </div>
          <Link
            href="/app-challenge"
            className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-fiesta-yellow/90 px-4 py-2 text-xs font-bold text-background shadow-md shadow-fiesta-yellow/10 transition-all duration-200 hover:bg-fiesta-yellow hover:shadow-lg hover:shadow-fiesta-yellow/20"
          >
            Participate in the Congressional App Challenge
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </FadeInSection>
    </section>
  )
}
