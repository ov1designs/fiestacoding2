"use client"

import { Navbar } from "@/components/navbar"
import { LocationCard } from "@/components/location-card"
import { useLanguage } from "@/components/language-provider"


export default function EventLocationsPage() {
  const { t } = useLanguage()

  const locations = [
    {
      name: t.locations.mac.name,
      subtitle: t.locations.mac.subtitle,
      address: [t.locations.mac.address1, t.locations.mac.address2],
      hours: [t.locations.mac.hours1, t.locations.mac.hours2],
      accessibility: [t.locations.mac.access1, t.locations.mac.access2],
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=201+W+Franklin+Ave%2C+El+Paso%2C+TX+79901",
      mapEmbedUrl:
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=201+W+Franklin+Ave,+El+Paso,+TX+79901&zoom=15",
    },
    {
      name: t.locations.laNube.name,
      subtitle: t.locations.laNube.subtitle,
      address: [t.locations.laNube.address1, t.locations.laNube.address2],
      hours: [t.locations.laNube.hours1, t.locations.laNube.hours2],
      accessibility: [t.locations.laNube.access1, t.locations.laNube.access2],
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=201+W+Main+Dr%2C+El+Paso%2C+TX+79901",
      mapEmbedUrl:
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=201+W+Main+Dr,+El+Paso,+TX+79901&zoom=15",
    },
  ]

  const quickInfo = [
    {
      title: t.locations.quickSaturday,
      detail: t.locations.quickSaturdayDetail,
    },
    {
      title: t.locations.quickLocations,
      detail: t.locations.quickLocationsDetail,
    },
    {
      title: t.locations.quickFree,
      detail: t.locations.quickFreeDetail,
    },
  ]

  const cardLabels = {
    address: t.locations.address,
    hours: t.locations.hoursLabel,
    accessibility: t.locations.accessibility,
    getDirections: t.locations.getDirections,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-6 pb-16 pt-20 md:pb-20 md:pt-28">
          <div className="mx-auto max-w-6xl">
            {t.locations.overline && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-red">
                {t.locations.overline}
              </p>
            )}
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
              {t.locations.headline}{" "}
              <span className="text-fiesta-red">{t.locations.headlineAccent}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              {t.locations.subtitle}
            </p>
          </div>
        </section>

        {/* Quick info */}
        <section className="px-6 pb-8">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {quickInfo.map((q) => (
              <div
                key={q.title}
                className="rounded-xl border border-border bg-card px-5 py-4"
              >
                <p className="text-sm font-semibold text-white">{q.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{q.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location cards */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="mx-auto flex max-w-6xl flex-col gap-8">
            {locations.map((loc) => (
              <LocationCard key={loc.name} {...loc} labels={cardLabels} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
