"use client"

import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { CheckCircle2, ArrowRight, MapPin, CalendarDays } from "lucide-react"

export default function ThankYouPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-6 py-28 md:py-40">
        {/* Success icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-fiesta-green/10">
          <CheckCircle2 className="h-10 w-10 text-fiesta-green" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-center text-4xl font-bold text-white md:text-5xl">
          {t.thankYou.title}
        </h1>
        <p className="mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground">
          {t.thankYou.body}
        </p>

        {/* Info cards */}
        <div className="mt-12 grid w-full max-w-lg gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fiesta-red/10">
              <CalendarDays className="h-5 w-5 text-fiesta-red" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t.thankYou.date}</p>
              <p className="text-xs text-muted-foreground">{t.thankYou.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fiesta-green/10">
              <MapPin className="h-5 w-5 text-fiesta-green" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t.thankYou.location}</p>
              <p className="text-xs text-muted-foreground">{t.thankYou.locationDetail}</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/event-locations"
            className="inline-flex items-center gap-2 rounded-lg bg-fiesta-red px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          >
            {t.thankYou.viewLocations}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {t.thankYou.backHome}
          </Link>
        </div>
      </main>
    </div>
  )
}
