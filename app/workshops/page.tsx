"use client"

import Link from "next/link"
import {
  ArrowRight,
  Blocks,
  Brain,
  Cpu,
  Hand,
  HeartHandshake,
  Lightbulb,
  PartyPopper,
  Quote,
  Smile,
  Sparkles,
  Terminal,
  Users,
  Palette,
  Tent,
  Home as HomeIcon,
  Rocket,
  FlaskConical,
  Laptop,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { FadeInSection } from "@/components/fade-in-section"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { useLanguage } from "@/components/language-provider"
import { TESTIMONIALS } from "@/data/siteContent"

/* Photos for "What Actually Happens at an Event?" */
const EVENT_PHOTOS = [
  { label: "Marcus teaching students at a Fiesta Code workshop", src: "/images/webp/marcus-teaching-students.webp" },
  { label: "Students working at computers", src: "/images/webp/workshop-kids-at-laptops.webp" },
]

const STATION_TRAITS = [
  { label: "Interactive", icon: Hand, color: "text-fiesta-red border-fiesta-red/30 bg-fiesta-red/10" },
  { label: "Hands-on", icon: Cpu, color: "text-fiesta-orange border-fiesta-orange/30 bg-fiesta-orange/10" },
  { label: "Beginner friendly", icon: Smile, color: "text-fiesta-yellow border-fiesta-yellow/30 bg-fiesta-yellow/10" },
  { label: "Creative", icon: Palette, color: "text-fiesta-green border-fiesta-green/30 bg-fiesta-green/10" },
  { label: "Collaborative", icon: Users, color: "text-fiesta-red border-fiesta-red/30 bg-fiesta-red/10" },
  { label: "Fun", icon: PartyPopper, color: "text-fiesta-orange border-fiesta-orange/30 bg-fiesta-orange/10" },
]

const TOOLS = [
  { name: "Codemoji", level: "Start here", desc: "Emoji-based lessons that introduce the building blocks of code in a playful way.", icon: Smile, color: "text-fiesta-yellow", bar: "bg-fiesta-yellow" },
  { name: "Scratch", level: "Visual blocks", desc: "Snap-together blocks to create animations, stories, and games.", icon: Blocks, color: "text-fiesta-orange", bar: "bg-fiesta-orange" },
  { name: "Microsoft MakeCode", level: "Code + hardware", desc: "Program micro:bits and games with blocks, then peek at the real code underneath.", icon: Cpu, color: "text-fiesta-green", bar: "bg-fiesta-green" },
  { name: "Python", level: "Real text code", desc: "Write text-based programs once confidence grows, the same language used by professionals.", icon: Terminal, color: "text-fiesta-red", bar: "bg-fiesta-red" },
]

const PROGRAMS = [
  { name: "Coding workshops", icon: Laptop },
  { name: "AI activities", icon: Brain },
  { name: "Family coding", icon: HomeIcon },
  { name: "Community workshops", icon: HeartHandshake },
  { name: "Camps", icon: Tent },
  { name: "Youth Code Jam / larger community coding events", icon: Rocket },
  { name: "STEAM and technology exploration", icon: FlaskConical },
]

const CATEGORY_STYLES: Record<string, string> = {
  Student: "text-fiesta-red",
  Parent: "text-fiesta-green",
  Volunteer: "text-fiesta-orange",
  "Community Partner": "text-fiesta-yellow",
}

export default function WorkshopsPage() {
  const { t } = useLanguage()

  const codeJamCards = [
    { icon: Lightbulb, title: t.about.codeJamCard1Title, desc: t.about.codeJamCard1Desc, color: "text-fiesta-green", bar: "bg-fiesta-green" },
    { icon: Users, title: t.about.codeJamCard2Title, desc: t.about.codeJamCard2Desc, color: "text-fiesta-orange", bar: "bg-fiesta-orange" },
    { icon: Sparkles, title: t.about.codeJamCard3Title, desc: t.about.codeJamCard3Desc, color: "text-fiesta-red", bar: "bg-fiesta-red" },
    { icon: Brain, title: t.about.codeJamCard4Title, desc: t.about.codeJamCard4Desc, color: "text-fiesta-yellow", bar: "bg-fiesta-yellow" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-6 pb-10 pt-20 md:pt-28">
          <FadeInSection>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-orange">Workshops</p>
              <h1 className="mt-3 max-w-4xl text-balance text-4xl font-bold leading-tight text-white md:text-6xl">
                {t.about.whatIsCodeJam}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.about.codeJamIntro}</p>
            </div>
          </FadeInSection>
        </section>

        {/* What Actually Happens: cards + photo grid */}
        <section id="code-events" className="px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {codeJamCards.map((card, i) => (
                <FadeInSection key={card.title} delay={i * 100}>
                  <div className="card-lift group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6">
                    <div className={`absolute left-0 top-0 h-full w-1 ${card.bar}`} />
                    <card.icon className={`mb-4 h-6 w-6 ${card.color}`} aria-hidden="true" />
                    <h2 className="text-sm font-bold text-white">{card.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {EVENT_PHOTOS.map((photo, i) => (
                <FadeInSection key={photo.label} delay={i * 100}>
                  <ImagePlaceholder label={photo.label} src={photo.src} className="aspect-[4/3]" />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Every Station... */}
        <section id="stations" className="border-y border-border bg-card px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-white md:text-4xl">{t.about.stationDesign}</h2>
            </FadeInSection>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {STATION_TRAITS.map((trait, i) => (
                <FadeInSection key={trait.label} delay={i * 70}>
                  <div className={`flex h-full flex-col items-center gap-2 rounded-xl border px-3 py-5 text-center ${trait.color}`}>
                    <trait.icon className="h-6 w-6" aria-hidden="true" />
                    <span className="text-sm font-bold">{trait.label}</span>
                  </div>
                </FadeInSection>
              ))}
            </div>
            <FadeInSection delay={100}>
              <p className="mt-8 text-lg font-semibold text-white">{t.about.stationClosing}</p>
            </FadeInSection>
          </div>
        </section>

        {/* Our Programs */}
        <section id="programs" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Our Programs</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Fiesta Code introduces students to coding through beginner-friendly, hands-on tools and projects.
              </p>
            </FadeInSection>

            {/* What We Teach */}
            <FadeInSection delay={100}>
              <h3 className="mt-12 text-xl font-bold text-white md:text-2xl">What We Teach</h3>
            </FadeInSection>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TOOLS.map((tool, i) => (
                <FadeInSection key={tool.name} delay={i * 100}>
                  <li className="card-lift relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6">
                    <div className={`absolute inset-x-0 top-0 h-1 ${tool.bar}`} style={{ width: `${(i + 1) * 25}%` }} />
                    <div className="flex items-center justify-between">
                      <tool.icon className={`h-7 w-7 ${tool.color}`} aria-hidden="true" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        Step {i + 1}
                      </span>
                    </div>
                    <p className="mt-4 text-lg font-bold text-white">{tool.name}</p>
                    <p className={`text-xs font-semibold ${tool.color}`}>{tool.level}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                  </li>
                </FadeInSection>
              ))}
            </ol>
            <FadeInSection delay={150}>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
                These platforms allow students to begin with visual, approachable coding and build toward more advanced
                programming skills as their confidence grows.
              </p>
            </FadeInSection>

            {/* Programs */}
            <FadeInSection delay={100}>
              <h3 className="mt-14 text-xl font-bold text-white md:text-2xl">Programs</h3>
            </FadeInSection>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAMS.map((program, i) => (
                <FadeInSection key={program.name} delay={i * 60}>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
                    <program.icon className="h-5 w-5 shrink-0 text-fiesta-orange" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground">{program.name}</span>
                  </div>
                </FadeInSection>
              ))}
            </div>
            <FadeInSection delay={100}>
              <ImagePlaceholder
                label="Coding workshop in action"
                src="/images/webp/workshop-classroom-wide.webp"
                className="mt-8 aspect-[16/9] md:aspect-[21/9]"
              />
            </FadeInSection>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="border-t border-border bg-card px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-white md:text-4xl">What Families Are Saying</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Students, parents, volunteers, and community partners share what Fiesta Code means to them.
              </p>
            </FadeInSection>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((item, i) => (
                <FadeInSection key={item.quote} delay={i * 100}>
                  <figure className="card-lift flex h-full rounded-2xl border border-border bg-background p-6">
                    <div className="flex flex-1 flex-col">
                      <Quote className={`h-5 w-5 ${CATEGORY_STYLES[item.category]}`} aria-hidden="true" />
                      <blockquote className="mt-3 text-base leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</blockquote>
                      <figcaption className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        &mdash; {item.author}
                        {item.sample && (
                          <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                            Sample
                          </span>
                        )}
                      </figcaption>
                    </div>
                  </figure>
                </FadeInSection>
              ))}
            </div>
            <FadeInSection delay={200}>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/event-locations"
                  className="btn-glow group inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-fiesta-red px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-fiesta-red/25 hover:shadow-xl hover:shadow-fiesta-red/35"
                >
                  See Upcoming Workshops
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>
    </div>
  )
}
