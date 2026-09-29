"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, Award, Landmark, Megaphone, Smartphone, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { FadeInSection } from "@/components/fade-in-section"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { APP_CHALLENGE_LINKS } from "@/data/siteContent"

/** External link button. An empty href renders a "coming soon" state instead of a dead link. */
function ExternalButton({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-6 py-3 text-sm font-semibold text-muted-foreground">
        {children} <span className="text-xs font-normal">(link coming soon)</span>
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "btn-glow group inline-flex items-center gap-2 rounded-lg bg-fiesta-yellow px-6 py-3 text-sm font-bold text-background shadow-lg shadow-fiesta-yellow/20 hover:shadow-xl hover:shadow-fiesta-yellow/30"
          : "btn-glow group inline-flex items-center gap-2 rounded-lg border border-fiesta-yellow/50 bg-fiesta-yellow/10 px-6 py-3 text-sm font-bold text-fiesta-yellow hover:bg-fiesta-yellow/20"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

function SectionLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-yellow">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </p>
  )
}

export default function AppChallengePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero: The Congressional App Challenge */}
        <section className="relative overflow-hidden border-b border-border px-6 pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-fiesta-yellow/10 blur-3xl" aria-hidden="true" />
          <FadeInSection>
            <div className="relative mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-yellow">App Challenge</p>
              <h1 className="mt-3 max-w-4xl text-balance text-4xl font-bold leading-tight text-white md:text-6xl">
                Congressional <span className="text-fiesta-yellow">App Challenge</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                The Congressional App Challenge is a nationwide competition hosted by Members of the U.S. House of
                Representatives. It encourages middle and high school students to learn to code by building their own
                original apps. Marcus Hunt entered the Challenge with a teammate and an idea to help families caring for
                the people they love.
              </p>
              <div className="mt-8">
                <ExternalButton href={APP_CHALLENGE_LINKS.challengeHome}>Visit the Congressional App Challenge</ExternalButton>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Care Companion */}
        <section id="care-companion" className="scroll-mt-32 px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <FadeInSection>
              <SectionLabel icon={Smartphone}>The App</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Care Companion</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Care Companion is the app Marcus Hunt and Sebastian Ruiz created to support caregivers and individuals who
                need help managing care information, like medications, therapy schedules, and day-to-day care details.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Both came from personal experience: Marcus watched his grandfather care for his grandmother, who lived
                with Alzheimer&apos;s, and Sebastian saw his parents and nurses coordinate around-the-clock care for his
                younger sister.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ExternalButton href={APP_CHALLENGE_LINKS.careCompanionApp} primary>
                  View Care Companion
                </ExternalButton>
                <ExternalButton href={APP_CHALLENGE_LINKS.careCompanionFeature}>Read About Care Companion</ExternalButton>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              {/* TODO: add src="/images/app-challenge/care-companion.jpg" (app screenshot or demo photo) */}
              <ImagePlaceholder label="Care Companion app" hint="App screenshot or demo photo" className="aspect-[4/3]" />
            </FadeInSection>
          </div>
        </section>

        {/* Winning TX-16 */}
        <section id="tx16-winner" className="scroll-mt-32 border-y border-border bg-card px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <FadeInSection>
              <SectionLabel icon={Award}>Winners</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Winning Texas&apos;s 16th Congressional District</h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Marcus Hunt (Coronado High School) and Sebastian Ruiz (Cathedral High School) were named the 2024
                Congressional App Challenge winners for Texas&apos;s 16th Congressional District, represented by Rep.
                Veronica Escobar, for Care Companion.
              </p>
            </FadeInSection>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { label: "Marcus and Sebastian with their award certificates", src: "/images/webp/cac-award-certificates.webp" },
                { label: "2024 Congressional App Challenge winners", src: "/images/webp/cac-2024-winners-group.webp" },
                { label: "Presenting Care Companion", src: "/images/webp/cac-presenting-podium.webp" },
              ].map(({ label, src }, i) => (
                <FadeInSection key={label} delay={i * 100}>
                  <ImagePlaceholder label={label} src={src} className="aspect-[4/3]" />
                </FadeInSection>
              ))}
            </div>
            <FadeInSection delay={100}>
              <div className="mt-8">
                <ExternalButton href={APP_CHALLENGE_LINKS.winningProjectPage}>View the Official Winning Project Page</ExternalButton>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* House of Code */}
        <section id="house-of-code" className="scroll-mt-32 px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <FadeInSection>
              <SectionLabel icon={Landmark}>Washington, D.C.</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">House of Code</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                As a district winner, Marcus traveled to Washington, D.C. to present Care Companion at #HouseOfCode, the
                Congressional App Challenge&apos;s celebration of student winners from across the country.
              </p>
              <div className="mt-8">
                <ExternalButton href={APP_CHALLENGE_LINKS.houseOfCode}>Learn About House of Code</ExternalButton>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              <div className="grid grid-cols-2 gap-4">
                <ImagePlaceholder label="The House of Code stage in Washington, D.C." src="/images/webp/house-of-code-stage.webp" className="col-span-2 aspect-[16/9]" />
                <ImagePlaceholder label="Marcus at the U.S. Capitol" src="/images/webp/dc-capitol-marcus.webp" className="aspect-square" />
                <ImagePlaceholder label="Marcus and Sebastian outside Rep. Escobar's office" src="/images/webp/dc-rep-escobar-office.webp" className="aspect-square" />
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* From Winner to Ambassador */}
        <section id="ambassador" className="scroll-mt-32 border-y border-border bg-card px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <FadeInSection delay={150} className="order-2 lg:order-1">
              <ImagePlaceholder label="Marcus as a Challenge Ambassador" hint="Ambassador photo" className="aspect-[4/3]" />
            </FadeInSection>
            <FadeInSection className="order-1 lg:order-2">
              <SectionLabel icon={Megaphone}>Ambassador</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">From Winner to Ambassador</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Marcus kept going after his win. As a Congressional App Challenge Ambassador, he helps encourage other El
                Paso students to learn to code, build their own apps, and enter the Challenge themselves.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3">
                <ExternalButton href={APP_CHALLENGE_LINKS.ambassadorProgram} primary>
                  Learn About the Congressional App Challenge Ambassador Program
                </ExternalButton>
                {APP_CHALLENGE_LINKS.marcusAmbassador && (
                  <ExternalButton href={APP_CHALLENGE_LINKS.marcusAmbassador}>Marcus&apos;s Ambassador Profile</ExternalButton>
                )}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* What Came Next */}
        <section id="what-came-next" className="scroll-mt-32 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <FadeInSection>
              <SectionLabel icon={Sparkles}>Fiesta Code</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">What Came Next</h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
                The Congressional App Challenge reinforced something Marcus already believed:{" "}
                <span className="font-semibold text-white">
                  young people don&apos;t have to wait until college or adulthood to use technology to solve problems.
                </span>
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                That experience helped inspire him to give younger students the chance to experience coding for themselves
                through Fiesta Code.
              </p>
            </FadeInSection>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { label: "From the App Challenge", src: "/images/webp/cac-marcus-sebastian-rep-escobar.webp" },
                { label: "To teaching younger students", src: "/images/webp/marcus-teaching-students.webp" },
                { label: "Students building today", src: "/images/webp/workshop-kids-at-laptops.webp" },
              ].map(({ label, src }, i) => (
                <FadeInSection key={label} delay={i * 100}>
                  <ImagePlaceholder label={label} src={src} className="aspect-[4/3]" />
                </FadeInSection>
              ))}
            </div>
            <FadeInSection delay={150}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/workshops"
                  className="btn-glow group inline-flex items-center gap-2 rounded-lg bg-fiesta-red px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fiesta-red/25"
                >
                  See Fiesta Code Workshops
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/about#why-i-started"
                  className="btn-glow inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Why Marcus Started Fiesta Code
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>
    </div>
  )
}
