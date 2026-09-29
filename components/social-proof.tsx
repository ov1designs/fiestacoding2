"use client"

import { useLanguage } from "./language-provider"
import { Quote, Newspaper } from "lucide-react"

export function SocialProof() {
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: t.social.testimonial1,
      author: t.social.testimonial1Author,
      role: t.social.testimonial1Role,
      accent: "fiesta-red",
    },
    {
      quote: t.social.testimonial2,
      author: t.social.testimonial2Author,
      role: t.social.testimonial2Role,
      accent: "fiesta-green",
    },
    {
      quote: t.social.testimonial3,
      author: t.social.testimonial3Author,
      role: t.social.testimonial3Role,
      accent: "fiesta-orange",
    },
  ]

  const press = [
    { name: t.social.pressElPaso, color: "text-fiesta-red" },
    { name: t.social.pressSchools, color: "text-fiesta-green" },
    { name: t.social.pressCommunity, color: "text-fiesta-orange" },
  ]

  const accentMap: Record<string, { border: string; bg: string; text: string }> = {
    "fiesta-red": { border: "border-fiesta-red/20", bg: "bg-fiesta-red/10", text: "text-fiesta-red" },
    "fiesta-green": { border: "border-fiesta-green/20", bg: "bg-fiesta-green/10", text: "text-fiesta-green" },
    "fiesta-orange": { border: "border-fiesta-orange/20", bg: "bg-fiesta-orange/10", text: "text-fiesta-orange" },
  }

  return (
    <section className="border-t border-border bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Testimonials */}
        <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
          {t.social.testimonialsTitle}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => {
            const s = accentMap[item.accent]
            return (
              <div
                key={item.author}
                className={`relative rounded-2xl border ${s.border} bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 md:p-8`}
              >
                <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                  <Quote className={`h-4 w-4 ${s.text}`} />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {'"'}{item.quote}{'"'}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${s.bg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${s.text}`}>
                      {item.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.author}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Press / Featured In */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t.social.pressTitle}
            </h3>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {press.map((p) => (
              <span
                key={p.name}
                className={`text-lg font-bold tracking-wide ${p.color} md:text-xl`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
