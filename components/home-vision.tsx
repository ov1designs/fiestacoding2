"use client"

import { useLanguage } from "@/components/language-provider"
import { FadeInSection } from "@/components/fade-in-section"
import { CountdownTimer } from "@/components/countdown-timer"

export function HomeVision() {
  const { t } = useLanguage()
  const visionGoals = [
    t.about.visionGoal1,
    t.about.visionGoal2,
    t.about.visionGoal3,
    t.about.visionGoal4,
  ]

  return (
    <section id="vision" className="px-6 pb-12 pt-2 md:pb-16 md:pt-4" aria-labelledby="vision-heading">
      <div className="mx-auto max-w-6xl">
        <FadeInSection>
          <h2 id="vision-heading" className="text-3xl font-bold text-white md:text-4xl">
            {t.about.visionTitle}
          </h2>
        </FadeInSection>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visionGoals.map((goal, i) => (
            <FadeInSection key={goal} delay={i * 80}>
              <div className="card-lift h-full rounded-xl border border-border bg-card p-5">
                <span className="text-sm leading-relaxed text-muted-foreground">{goal}</span>
              </div>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection delay={400}>
          <p className="mt-8 text-left text-base font-semibold text-white">
            {t.about.visionClosing}
          </p>
        </FadeInSection>
        <FadeInSection delay={200}>
          <div className="mx-auto mt-10 max-w-3xl">
            <CountdownTimer />
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

export default HomeVision
