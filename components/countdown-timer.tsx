"use client"

import { useEffect, useState } from "react"
import { Instagram } from "lucide-react"
import { useLanguage } from "./language-provider"
import { NEXT_EVENT, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/siteContent"

const TARGET_DATE = NEXT_EVENT.date ? new Date(NEXT_EVENT.date) : null

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft | null {
  if (!TARGET_DATE) return null
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units: { key: keyof TimeLeft; label: string; color: string }[] = [
    { key: "days", label: t.locations.days, color: "text-fiesta-red" },
    { key: "hours", label: t.locations.hours, color: "text-fiesta-orange" },
    { key: "minutes", label: t.locations.min, color: "text-fiesta-green" },
    { key: "seconds", label: t.locations.sec, color: "text-fiesta-yellow" },
  ]

  // No upcoming date set (or it has passed): show a "coming soon" state instead of zeros.
  const comingSoon = mounted && time === null

  return (
    <div className="card-lift rounded-2xl border border-border bg-card p-6 md:p-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {t.locations.countdownOverline}
      </p>
      <h3 className="mt-2 text-center text-2xl font-bold text-white md:text-3xl">
        {t.locations.countdownTitle}
      </h3>
      {comingSoon ? (
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="text-base font-semibold text-fiesta-yellow">Our next workshop date is coming soon!</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Follow @{INSTAGRAM_HANDLE} to be the first to know
          </a>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-4 gap-3 md:gap-4">
            {units.map((u) => (
              <div key={u.key} className="flex flex-col items-center rounded-xl bg-secondary p-3 md:p-6">
                <span className={`text-3xl font-bold md:text-5xl ${u.color}`} suppressHydrationWarning>
                  {time !== null ? time[u.key] : "--"}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
          {NEXT_EVENT.label && (
            <p className="mt-6 text-center text-sm text-muted-foreground">{NEXT_EVENT.label}</p>
          )}
        </>
      )}
    </div>
  )
}
