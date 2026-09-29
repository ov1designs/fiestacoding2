"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Heart, Instagram, Menu, X } from "lucide-react"
import { useSignup } from "./signup-provider"
import { useLanguage } from "./language-provider"
import { INSTAGRAM_URL } from "@/data/siteContent"

interface NavLink {
  href: string
  label: string
  color: string
  bg: string
  underline: string
  dot: string
  /** Always shown in yellow so it stands out (App Challenge). */
  highlight?: boolean
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { openSignup } = useSignup()
  const { locale, setLocale, t } = useLanguage()

  // The logo links Home. Order: About Us | Workshops | Volunteer | In the News | App Challenge | Donate (button, rendered last)
  const links: NavLink[] = [
    { href: "/about", label: t.nav.about, color: "text-fiesta-green", bg: "bg-fiesta-green/10", underline: "bg-fiesta-green", dot: "bg-fiesta-green" },
    { href: "/workshops", label: t.nav.workshops, color: "text-fiesta-orange", bg: "bg-fiesta-orange/10", underline: "bg-fiesta-orange", dot: "bg-fiesta-orange" },
    { href: "/volunteer", label: t.nav.volunteer, color: "text-fiesta-red", bg: "bg-fiesta-red/10", underline: "bg-fiesta-red", dot: "bg-fiesta-red" },
    { href: "/in-the-news", label: t.nav.news, color: "text-fiesta-green", bg: "bg-fiesta-green/10", underline: "bg-fiesta-green", dot: "bg-fiesta-green" },
    { href: "/app-challenge", label: t.nav.appChallenge, color: "text-fiesta-yellow", bg: "bg-fiesta-yellow/15", underline: "bg-fiesta-yellow", dot: "bg-fiesta-yellow", highlight: true },
  ]

  const donateActive = pathname === "/donate"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-4 px-5 py-3 md:min-h-28 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Image
            src="/images/fiesta-coding-ai-logo.png"
            alt="Fiesta Coding + AI Logo"
            width={800}
            height={251}
            priority
            className="h-auto w-44 object-contain md:w-52"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((link) => {
            const isActive = pathname === link.href
            const isHovered = hoveredLink === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 ${
                    link.highlight
                      ? isActive
                        ? "bg-fiesta-yellow text-background"
                        : "border border-fiesta-yellow/50 bg-fiesta-yellow/10 text-fiesta-yellow hover:bg-fiesta-yellow/20"
                      : isActive
                        ? `${link.bg} ${link.color}`
                        : isHovered
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  {!link.highlight && (
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full ${link.underline} transition-all duration-300 ${
                        isActive ? "w-6" : "w-0"
                      }`}
                    />
                  )}
                </Link>
              </li>
            )
          })}
          {/* Donate: final nav item, shown as a button */}
          <li className="ml-2">
            <Link
              href="/donate"
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-fiesta-orange px-5 py-2.5 text-sm font-bold text-background shadow-md shadow-fiesta-orange/25 transition-all duration-200 hover:shadow-lg hover:shadow-fiesta-orange/35 hover:brightness-110 active:scale-[0.96] ${
                donateActive ? "ring-2 ring-fiesta-orange/50 ring-offset-2 ring-offset-background" : ""
              }`}
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {t.nav.donate}
            </Link>
          </li>
        </ul>

        {/* Desktop right controls */}
        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Fiesta Code on Instagram"
            className="text-muted-foreground transition-colors hover:text-fiesta-red"
          >
            <Instagram className="h-5 w-5" />
          </a>

          {/* Language toggle */}
          <div className="relative flex h-9 w-20 items-center rounded-full border border-border/60 bg-secondary/60 p-0.5 transition-colors hover:border-border">
            <div
              className={`absolute top-0.5 h-8 w-[39px] rounded-full bg-fiesta-red shadow-md shadow-fiesta-red/20 transition-all duration-200 ${
                locale === "es" ? "left-[39px]" : "left-0.5"
              }`}
            />
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`relative z-10 flex h-8 w-[39px] items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 ${
                locale === "en" ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`relative z-10 flex h-8 w-[39px] items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 ${
                locale === "es" ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ES
            </button>
          </div>

          {/* Sign Up */}
          <button
            type="button"
            onClick={openSignup}
            className="group relative overflow-hidden whitespace-nowrap rounded-full bg-fiesta-red px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-fiesta-red/20 transition-all duration-200 hover:shadow-lg hover:shadow-fiesta-red/30 hover:brightness-110 active:scale-[0.96]"
          >
            <span className="relative z-10">{t.nav.signUp}</span>
            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center justify-center rounded-lg p-2 text-foreground transition-all duration-200 hover:bg-secondary active:scale-90 xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-border/40 bg-background transition-all duration-300 xl:hidden ${
          open ? "max-h-[720px] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                    link.highlight
                      ? "bg-fiesta-yellow/10 font-semibold text-fiesta-yellow"
                      : pathname === link.href
                        ? `${link.bg} ${link.color}`
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {pathname === link.href && (
                    <span className={`h-1.5 w-1.5 rounded-full ${link.dot}`} />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {/* Mobile language toggle */}
            <div className="relative flex h-10 w-[92px] items-center rounded-full border border-border/60 bg-secondary/60 p-0.5">
              <div
                className={`absolute top-0.5 h-9 w-[45px] rounded-full bg-fiesta-red shadow-md shadow-fiesta-red/20 transition-all duration-200 ${
                  locale === "es" ? "left-[45px]" : "left-0.5"
                }`}
              />
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`relative z-10 flex h-9 w-[45px] items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  locale === "en" ? "text-white" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={`relative z-10 flex h-9 w-[45px] items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  locale === "es" ? "text-white" : "text-muted-foreground"
                }`}
              >
                ES
              </button>
            </div>
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 rounded-full bg-fiesta-orange px-5 py-3 text-sm font-bold text-background shadow-md shadow-fiesta-orange/25 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {t.nav.donate}
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openSignup()
              }}
              className="flex-1 rounded-full bg-fiesta-red py-3 text-sm font-semibold text-white shadow-md shadow-fiesta-red/20 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            >
              {t.nav.signUp}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
