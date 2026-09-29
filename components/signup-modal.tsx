"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import { useLanguage } from "./language-provider"

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDVMMGUjeTXUvd4GOmgyQnW4BgxVoOxbqCZ4RqmW8ojKDd0Q/viewform?embedded=true"

interface SignupModalProps {
  open: boolean
  onClose: () => void
}

export function SignupModal({ open, onClose }: SignupModalProps) {
  const [loading, setLoading] = useState(true)
  const loadCountRef = useRef(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      setLoading(true)
      loadCountRef.current = 0
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const handleIframeLoad = useCallback(() => {
    loadCountRef.current += 1
    if (loadCountRef.current === 1) {
      setLoading(false)
    } else if (loadCountRef.current >= 2) {
      onClose()
      router.push("/thank-you")
    }
  }, [onClose, router])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Sign up form"
    >
      <div className="relative flex h-full max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            {t.signup.overline && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-red">
                {t.signup.overline}
              </p>
            )}
            <h2 className={`text-lg font-bold text-white${t.signup.overline ? " mt-1" : ""}`}>
              {t.signup.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close sign up form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form iframe */}
        <div className="relative flex-1">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card">
              <Loader2 className="h-8 w-8 animate-spin text-fiesta-red" />
              <p className="text-sm text-muted-foreground">{t.signup.loading}</p>
            </div>
          )}
          <iframe
            src={GOOGLE_FORM_URL}
            title="Fiesta Coding Sign Up Form"
            className="h-full w-full"
            onLoad={handleIframeLoad}
            style={{ border: "none", minHeight: "500px" }}
          />
        </div>

        {/* Footer hint */}
        <div className="border-t border-border bg-secondary/50 px-6 py-3">
          <p className="text-center text-xs text-muted-foreground">
            {t.signup.privacy}
          </p>
        </div>
      </div>
    </div>
  )
}
