"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Heart } from "lucide-react"
import { useLanguage } from "./language-provider"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
]

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { href: "/", label: t.footer.home },
    { href: "/about", label: t.footer.about },
    { href: "/volunteer", label: t.footer.volunteer },
    { href: "/event-locations", label: t.footer.locations },
    { href: "/donate", label: t.footer.donate },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Brand column */}
          <div className="flex flex-col items-start lg:max-w-xs">
            <Image
              src="/images/logo.png"
              alt="Fiesta Coding + AI Logo"
              width={200}
              height={200}
              className="h-20 w-20 object-contain"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
            <a
              href={`mailto:${t.footer.email}`}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-fiesta-red transition-colors hover:text-fiesta-red/80"
            >
              <Mail className="h-4 w-4" />
              {t.footer.email}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t.footer.connect}
            </h4>
            <div className="mt-4 flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-fiesta-red/40 hover:text-fiesta-red"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {t.footer.followUs}
            </p>
          </div>

          {/* Donate CTA */}
          <div className="lg:ml-auto">
            <div className="rounded-xl border border-fiesta-red/20 bg-fiesta-red/5 p-4">
              <Heart className="h-5 w-5 text-fiesta-red" />
              <p className="mt-3 text-sm font-semibold text-white">
                {t.donate.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {t.donate.impact4}
              </p>
              <Link
                href="/donate"
                className="btn-glow mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-fiesta-red px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-fiesta-red/25 hover:shadow-xl hover:shadow-fiesta-red/35 active:scale-[0.97]"
              >
                {t.footer.donate}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start gap-2 border-t border-border pt-6 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">{t.footer.rights}</p>
          <p className="text-xs text-muted-foreground">{t.footer.partnership}</p>
          <p className="text-xs text-muted-foreground">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
