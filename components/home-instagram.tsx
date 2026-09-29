import { Instagram } from "lucide-react"
import { INSTAGRAM_URL } from "@/data/siteContent"

export function HomeInstagram() {
  return (
    <section className="border-t border-border/60 bg-secondary/30 px-6 py-20 sm:px-10 lg:px-16" aria-labelledby="instagram-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-fiesta-red">Follow Us on Instagram</p>
          <h2 id="instagram-heading" className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Follow Fiesta Code on Instagram
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            See upcoming workshops, event photos, coding projects, and what we&apos;re building next.
          </p>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Fiesta Code on Instagram at fiestacoding.ai"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full border-2 border-fiesta-yellow bg-fiesta-yellow px-6 py-3 font-semibold text-background transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-fiesta-yellow/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fiesta-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
          <span>@fiestacoding.ai</span>
        </a>
      </div>
    </section>
  )
}
