"use client"

import { Navbar } from "@/components/navbar"
import { FadeInSection } from "@/components/fade-in-section"
import { CodeBackground } from "@/components/code-background"
import { CustomCursor } from "@/components/custom-cursor"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { useSignup } from "@/components/signup-provider"
import { useLanguage } from "@/components/language-provider"
import { IMPACT_STATS } from "@/data/siteContent"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Brain, Code2, HeartHandshake, Megaphone, Palette, PartyPopper, Trophy } from "lucide-react"

/* ---- Animated counter with spring easing ---- */
function AnimatedStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          let start = 0
          const duration = 1600
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
          const step = (ts: number) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            setCount(Math.floor(easeOut(progress) * value))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-4 py-6">
      <span className={`text-3xl font-bold text-fiesta-red md:text-4xl ${triggered ? "animate-count-pop" : "opacity-0"}`}>
        {count}{suffix || "+"}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

/* Creative + code symbols for the About hero background */
const CREATIVE_SYMBOLS = [
  "</>", "{}", "✦", "★", "♪", "◆", "●", "▲", "draw()", "play()", "remix", "color",
  "fun()", "build", "art", "if", "=>", "AI", "++", "loop", "sprite", "create", "{ }", "✎",
]
const CREATIVE_COLORS = [
  "rgba(200, 60, 50, 0.38)",
  "rgba(120, 160, 50, 0.34)",
  "rgba(220, 190, 50, 0.36)",
  "rgba(220, 120, 40, 0.34)",
  "rgba(210, 110, 120, 0.32)",
]

const FOUNDER_HIGHLIGHTS = [
  { icon: Code2, text: "Student coder and community volunteer", color: "text-fiesta-green" },
  { icon: Trophy, text: "Congressional App Challenge winner", color: "text-fiesta-yellow" },
  { icon: Megaphone, text: "Congressional App Challenge Ambassador", color: "text-fiesta-orange" },
  { icon: Brain, text: "AI and computer science interests", color: "text-fiesta-red" },
  { icon: HeartHandshake, text: "Technology for community impact", color: "text-fiesta-green" },
]

const CREATIVE_STEPS = [
  { icon: Palette, label: "Imagine it", color: "text-fiesta-red", border: "border-fiesta-red/30", bg: "bg-fiesta-red/10", tilt: "-3deg" },
  { icon: Code2, label: "Code it", color: "text-fiesta-green", border: "border-fiesta-green/30", bg: "bg-fiesta-green/10", tilt: "2deg" },
  { icon: PartyPopper, label: "Celebrate it", color: "text-fiesta-yellow", border: "border-fiesta-yellow/30", bg: "bg-fiesta-yellow/10", tilt: "-2deg" },
]

export default function AboutPage() {
  const { openSignup } = useSignup()
  const { t, locale } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero: Where Creativity Meets Coding (animated background like Home) */}
        <section className="relative cursor-none overflow-hidden border-b border-border/40">
          <CodeBackground symbols={CREATIVE_SYMBOLS} colors={CREATIVE_COLORS} count={70} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <FadeInSection>
                <h1 className="text-balance text-5xl font-bold leading-[1.05] text-white md:text-7xl">
                  {locale === "en" ? (
                    <>
                      Where <span className="text-fiesta-gradient">Creativity</span>
                      <br />
                      Meets{" "}
                      <span className="font-mono text-fiesta-green">
                        &lt;Coding<span className="animate-caret text-fiesta-yellow">_</span>/&gt;
                      </span>
                    </>
                  ) : (
                    t.about.headline
                  )}
                </h1>
              </FadeInSection>
              <FadeInSection delay={120}>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">{t.about.subheading}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{t.about.introParagraph}</p>
              </FadeInSection>
              <FadeInSection delay={220}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {CREATIVE_STEPS.map((step, i) => (
                    <span
                      key={step.label}
                      style={{ ["--tilt" as string]: step.tilt, animationDelay: `${i * 0.4}s` }}
                      className={`animate-float inline-flex items-center gap-2 rounded-full border ${step.border} ${step.bg} px-4 py-2 text-sm font-bold ${step.color}`}
                    >
                      <step.icon className="h-4 w-4" aria-hidden="true" />
                      {step.label}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-xl font-bold leading-snug text-white md:text-2xl">
                  Fiesta Code is about learning technology{" "}
                  <span className="text-fiesta-yellow">and having fun creating with it.</span>
                </p>
              </FadeInSection>
            </div>
            <FadeInSection delay={200}>
              <div className="relative">
                <div
                  className="absolute -inset-3 rotate-2 rounded-3xl bg-gradient-to-br from-fiesta-red/30 via-fiesta-orange/20 to-fiesta-green/30 blur-sm"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl bg-background">
                  <ImagePlaceholder label="Students creating at a Fiesta Code workshop" src="/images/webp/workshop-room-wide.webp" className="aspect-[4/3]" />
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* In-page navigation */}
        <nav aria-label="About page sections" className="px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3 border-y border-border/60 py-4 text-sm font-semibold">
            <a className="link-underline text-fiesta-green" href="#why-i-started">Why I Started Fiesta Code</a>
            <a className="link-underline text-fiesta-red" href="#meet-the-founder">Meet the Founder</a>
            <a className="link-underline text-fiesta-yellow" href="#impact">Impact</a>
            <Link className="link-underline text-fiesta-orange" href="/workshops">What happens at a workshop &rarr;</Link>
          </div>
        </nav>

        {/* Why I Started Fiesta Code (Marcus's voice) + Meet the Founder, together in one card.
            DRAFT copy based on public info: have Marcus review and rewrite in his own words. */}
        <section id="why-i-started" className="scroll-mt-32 px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-secondary p-6 shadow-xl shadow-black/20 md:p-10 lg:p-14">
          <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <FadeInSection>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-green">In Marcus&apos;s words</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Why I Started Fiesta Code</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I got into coding because I wanted to fix something real. I watched my grandmother live with
                  Alzheimer&apos;s and saw how much my grandfather took on as her caregiver. That led to Care Companion,
                  and it&apos;s when I realized technology can solve real problems for real families.
                </p>
                <p>
                  Winning the Congressional App Challenge and presenting in Washington, D.C. showed me what happens when
                  students get a real chance to build. But I kept thinking about younger kids in El Paso who never get that
                  first chance, or who think coding is only for &ldquo;other people.&rdquo;
                </p>
                <p>
                  I believe students should{" "}
                  <span className="font-semibold text-white">create with technology, not just consume it</span>. So I
                  wanted coding to feel approachable and fun, more like a fiesta than a test. When a kid builds something
                  that works, even something small, you can see their confidence change.
                </p>
              </div>
              <p className="mt-6 text-lg font-bold text-fiesta-green">
                My goal is to help more El Paso students see themselves as people who can build with technology.
              </p>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">&mdash; Marcus Hunt</p>
            </FadeInSection>
            <FadeInSection delay={150}>
              {/* Meet the Founder */}
              <aside
                id="meet-the-founder"
                aria-labelledby="founder-heading"
                className="scroll-mt-32 lg:sticky lg:top-32"
              >
                <ImagePlaceholder
                  label="Marcus Hunt at the U.S. Capitol"
                  src="/images/webp/dc-capitol-marcus.webp"
                  className="aspect-[4/3]"
                />
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-red">{t.about.founderTitle}</p>
                  <h3 id="founder-heading" className="mt-2 text-3xl font-bold text-white">Marcus Hunt</h3>
                  <p className="mt-1 text-base font-semibold text-fiesta-yellow">Founder of Fiesta Code</p>
                  <p className="mt-6 border-l-2 border-fiesta-green/50 pl-4 text-sm italic leading-relaxed text-fiesta-green">
                    {t.about.founderQuote}
                  </p>
                </div>
              </aside>
            </FadeInSection>
          </div>
          <FadeInSection delay={200}>
            <ul className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8" aria-label="About Marcus">
              {FOUNDER_HIGHLIGHTS.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 rounded-full border border-border bg-background/60 px-5 py-2.5">
                  <item.icon className={`h-4 w-4 shrink-0 ${item.color}`} aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </FadeInSection>
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="scroll-mt-32 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <FadeInSection>
              <p className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground">{t.about.whyClosing}</p>
            </FadeInSection>
            <div className="mt-8 flex flex-wrap items-center justify-start rounded-2xl border border-border bg-card">
              {IMPACT_STATS.map((stat) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-16 md:pb-24">
          <FadeInSection>
            <div className="mx-auto max-w-7xl text-left">
              <h2 className="text-3xl font-bold text-white md:text-4xl">{t.about.ctaTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.about.ctaBody}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={openSignup}
                  className="btn-glow group inline-flex items-center gap-2 rounded-lg bg-fiesta-red px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fiesta-red/20 hover:shadow-xl hover:shadow-fiesta-red/30"
                >
                  {t.about.ctaRegister}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <Link
                  href="/volunteer"
                  className="btn-glow inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-muted hover:shadow-lg hover:shadow-black/20"
                >
                  {t.about.ctaVolunteer}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>
    </div>
  )
}
