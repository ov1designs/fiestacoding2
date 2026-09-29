"use client"

import { ExternalLink, Newspaper } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { FadeInSection } from "@/components/fade-in-section"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { NEWS_ITEMS } from "@/data/siteContent"

export default function InTheNewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-6 pb-12 pt-20 md:pb-16 md:pt-28">
          <FadeInSection>
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center gap-3 text-fiesta-green">
                <Newspaper className="h-5 w-5" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Press &amp; Recognition</p>
              </div>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-6xl">In the News</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Media coverage and recognition of Marcus Hunt and Fiesta Code, from the Congressional App Challenge to
                community coding events across El Paso.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* Features */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {NEWS_ITEMS.map((item, i) => (
              <FadeInSection key={item.id} delay={(i % 2) * 100}>
                <article className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  <ImagePlaceholder
                    label={item.imageLabel}
                    src={item.image}
                    hint="In the News photo"
                    className="aspect-[16/9] rounded-none border-0 border-b-2"
                  />
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fiesta-orange">
                      {item.outlet}
                      {item.date && <> &middot; {item.date}</>}
                    </p>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-white md:text-xl">{item.headline}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-6">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-glow inline-flex items-center gap-2 rounded-lg bg-fiesta-orange/10 px-5 py-2.5 text-sm font-semibold text-fiesta-orange hover:bg-fiesta-orange/20"
                        >
                          Read the story
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-lg border border-dashed border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground">
                          Link coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
