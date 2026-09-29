import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeInSection } from "./fade-in-section"
import { ImagePlaceholder } from "./image-placeholder"

export function HomeFounder() {
  return (
    <section className="px-6 pb-16 pt-4 md:pb-20" aria-labelledby="founder-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-14">
        <FadeInSection>
          <figure>
            <ImagePlaceholder label="Marcus Hunt, Founder" src="/images/webp/marcus-care-companion-poster.webp" className="aspect-[4/5]" />
            <figcaption className="mt-3 text-center text-sm font-semibold text-muted-foreground">
              Marcus Hunt, Founder
            </figcaption>
          </figure>
        </FadeInSection>
        <FadeInSection delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-red">Meet the Founder</p>
          <h2 id="founder-heading" className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Built by a student, for students.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Marcus Hunt started Fiesta Code after winning the Congressional App Challenge for Texas&apos;s 16th District.
            He wants younger El Paso students to see themselves as people who can build with technology, not just use it.
          </p>
          <Link
            href="/about#why-i-started"
            className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fiesta-red"
          >
            Why I started Fiesta Code
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  )
}
