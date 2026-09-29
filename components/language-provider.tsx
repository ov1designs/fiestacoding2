"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import { translations, type Locale, type Translations } from "@/lib/translations"

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])
  const toggle = useCallback(
    () => setLocaleState((prev) => (prev === "en" ? "es" : "en")),
    []
  )

  const t = translations[locale]

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}
