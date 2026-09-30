"use client"

import Image from "next/image"
import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { FadeInSection } from "./fade-in-section"
import { INSIGHT_VIDEOS } from "@/data/siteContent"

export function HomeInsights() {
  const [active, setActive] = useState<number | null>(null)
  const count = INSIGHT_VIDEOS.length
  const video = active !== null ? INSIGHT_VIDEOS[active] : null

  const go = (step: number) => setActive((i) => (i === null ? i : (i + step + count) % count))

  return (
    <section className="px-6 pb-12 pt-4 md:pb-16" aria-labelledby="insights-heading">
      <div className="mx-auto max-w-6xl">
        <FadeInSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-yellow">Insights from Marcus</p>
          <h2 id="insights-heading" className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Coding, Community &amp; AI
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Short clips from founder Marcus Hunt on learning to code, building community, and what AI means for the next
            generation of creators.
          </p>
        </FadeInSection>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INSIGHT_VIDEOS.map((item, i) => (
            <li key={item.id}>
              <FadeInSection delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Play video: ${item.title}`}
                  className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-fiesta-yellow/50 hover:shadow-xl hover:shadow-fiesta-yellow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fiesta-yellow"
                >
                  <Image
                    src={item.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" aria-hidden="true" />
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fiesta-yellow text-background shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                  </span>
                  <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {item.duration}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3">
                    <span className="block text-sm font-bold leading-tight text-white">{item.title}</span>
                    <span className="mt-0.5 block text-[11px] text-white/70">{item.topic}</span>
                  </span>
                </button>
              </FadeInSection>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 outline-none"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1)
              if (e.key === "ArrowLeft") go(-1)
            }}
            onClick={(e) => {
              // Clicking the dark area around the video closes the lightbox
              if (e.target === e.currentTarget) setActive(null)
            }}
          >
            {video && (
              <div className="relative flex max-h-full flex-col items-center">
                <Dialog.Title className="sr-only">{video.title}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Video {active! + 1} of {count}: {video.topic}
                </Dialog.Description>

                <video
                  key={video.src}
                  src={video.src}
                  poster={video.poster}
                  controls
                  autoPlay
                  playsInline
                  className="aspect-[9/16] max-h-[82vh] w-auto max-w-full rounded-2xl bg-black shadow-2xl"
                />

                <div className="mt-4 flex items-center gap-4 text-white">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous video"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="min-w-[8rem] text-center">
                    <p className="text-sm font-bold">{video.title}</p>
                    <p className="text-xs text-white/60">
                      {active! + 1} / {count}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next video"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            <Dialog.Close
              aria-label="Close video"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
