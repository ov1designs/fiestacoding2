import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface ImagePlaceholderProps {
  /** Describes the photo that belongs here, e.g. "Marcus Hunt, founder". Used as alt text once `src` is set. */
  label: string
  /** Path in /public for the real photo. Leave empty to show the placeholder box. */
  src?: string
  /** Tailwind aspect/size classes, e.g. "aspect-[4/3]". */
  className?: string
  /** Hint shown under the label, e.g. "Students at computers". */
  hint?: string
  /** Small thumbnail version: icon + label only. */
  compact?: boolean
}

export function ImagePlaceholder({ label, src, className = "aspect-[4/3]", hint, compact = false }: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-border ${className}`}>
        <Image src={src} alt={label} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
    )
  }

  if (compact) {
    return (
      <div
        role="img"
        aria-label={`Photo coming soon: ${label}`}
        className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border bg-secondary/30 p-2 text-center ${className}`}
      >
        <ImageIcon className="h-5 w-5 text-muted-foreground/60" aria-hidden="true" />
        <p className="text-[10px] font-semibold leading-tight text-muted-foreground">{label}</p>
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${label}`}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary/30 p-4 text-center ${className}`}
    >
      <ImageIcon className="h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      {hint && <p className="text-xs text-muted-foreground/70">{hint}</p>}
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">Photo placeholder</p>
    </div>
  )
}
