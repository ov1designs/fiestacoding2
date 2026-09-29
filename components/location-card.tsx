import { MapPin, Clock, Accessibility, Navigation } from "lucide-react"

interface LocationCardProps {
  name: string
  subtitle: string
  address: string[]
  hours: string[]
  accessibility: string[]
  directionsUrl: string
  mapEmbedUrl: string
  labels: {
    address: string
    hours: string
    accessibility: string
    getDirections: string
  }
}

const rows = [
  {
    key: "address" as const,
    labelKey: "address" as const,
    icon: MapPin,
    color: "text-fiesta-red",
    bg: "bg-fiesta-red/10",
  },
  {
    key: "hours" as const,
    labelKey: "hours" as const,
    icon: Clock,
    color: "text-fiesta-orange",
    bg: "bg-fiesta-orange/10",
  },
  {
    key: "accessibility" as const,
    labelKey: "accessibility" as const,
    icon: Accessibility,
    color: "text-fiesta-green",
    bg: "bg-fiesta-green/10",
  },
]

export function LocationCard({
  name,
  subtitle,
  address,
  hours,
  accessibility,
  directionsUrl,
  mapEmbedUrl,
  labels,
}: LocationCardProps) {
  const data = { address, hours, accessibility }

  return (
    <div className="card-lift overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-col lg:flex-row">
        {/* Info */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <div className="my-5 h-px bg-border" />

          <div className="flex flex-col gap-5">
            {rows.map((r) => (
              <div key={r.key} className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${r.bg}`}
                >
                  <r.icon className={`h-4 w-4 ${r.color}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {labels[r.labelKey]}
                  </p>
                  {data[r.key].map((line) => (
                    <p
                      key={line}
                      className="text-sm leading-relaxed text-foreground"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-fiesta-red py-3 text-sm font-semibold text-white shadow-lg shadow-fiesta-red/20 hover:shadow-xl hover:shadow-fiesta-red/30"
            >
              <Navigation className="h-4 w-4" />
              {labels.getDirections}
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="relative min-h-[280px] border-t border-border lg:min-h-0 lg:w-[460px] lg:border-l lg:border-t-0">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${name} location`}
          />
        </div>
      </div>
    </div>
  )
}
