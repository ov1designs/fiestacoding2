"use client"

import { useState } from "react"
import { ArrowLeft, Check, Cpu, FolderOpen, Loader2 } from "lucide-react"
import { ImagePlaceholder } from "@/components/image-placeholder"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/components/language-provider"
import { DONATION_TIERS } from "@/lib/products"

const Checkout = dynamic(() => import("@/components/checkout"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-fiesta-red" />
    </div>
  ),
})

export default function DonatePage() {
  const { locale, t } = useLanguage()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const selectedProduct = DONATION_TIERS.find((p) => p.id === selectedTier)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.donate.backHome}
        </Link>

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {t.donate.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.donate.subtitle}
          </p>
        </div>

        {!selectedTier ? (
          <>
            {/* Donation tiers */}
            <div className="grid gap-4 sm:grid-cols-2">
              {DONATION_TIERS.map((tier) => {
                const name = locale === "es" ? tier.nameEs : tier.name
                const desc =
                  locale === "es" ? tier.descriptionEs : tier.description
                const amount = (tier.priceInCents / 100).toFixed(0)

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className="card-lift group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 text-left hover:border-fiesta-red/50 hover:bg-fiesta-red/5 hover:shadow-fiesta-red/10 active:scale-[0.97]"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {name}
                      </span>
                      <span className="text-2xl font-bold text-foreground">
                        {"$"}{amount}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-fiesta-red opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {t.donate.selectCta}
                      <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Where your donation goes */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Where Your Donation Goes</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Every workshop is free for families. Donations cover the hands-on materials that make coding real for students.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="card-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  {/* TODO: add src="/images/donate/microbits.jpg" */}
                  <ImagePlaceholder label="Students coding micro:bits" hint="Workshop materials photo" className="aspect-[16/9] rounded-none border-0 border-b-2" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-fiesta-green">
                      <Cpu className="h-5 w-5" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-foreground">Workshop materials: micro:bits</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Micro:bits are pocket-sized computers students program to light up, make sounds, and react to the world,
                      so their code does something they can see and hold.
                    </p>
                  </div>
                </div>
                <div className="card-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  {/* TODO: add src="/images/donate/take-home-folder.jpg" */}
                  <ImagePlaceholder label="Take-home coding folder" hint="Supplies photo" className="aspect-[16/9] rounded-none border-0 border-b-2" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-fiesta-orange">
                      <FolderOpen className="h-5 w-5" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-foreground">Supplies: a folder for every child</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Each child goes home with a folder of coding projects and activities to keep exploring at home with
                      their family.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact section */}
            <div className="mt-16 card-lift rounded-xl border border-border bg-card p-6 md:p-8">
              <h2 className="mb-4 text-xl font-bold text-foreground">
                {t.donate.impactTitle}
              </h2>
              <ul className="flex flex-col gap-3">
                {[
                  t.donate.impact1,
                  t.donate.impact2,
                  t.donate.impact3,
                  t.donate.impact4,
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-fiesta-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Back to tiers */}
            <button
              type="button"
              onClick={() => setSelectedTier(null)}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.donate.changeTier}
            </button>

            {/* Selected tier info */}
            {selectedProduct && (
              <div className="mb-6 rounded-xl border border-fiesta-red/30 bg-fiesta-red/5 px-5 py-4">
                <p className="text-sm text-muted-foreground">
                  {t.donate.selectedLabel}{" "}
                  <span className="font-semibold text-foreground">
                    {locale === "es"
                      ? selectedProduct.nameEs
                      : selectedProduct.name}{" "}
                    — ${(selectedProduct.priceInCents / 100).toFixed(0)}
                  </span>
                </p>
              </div>
            )}

            {/* Stripe embedded checkout */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <Checkout productId={selectedTier} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
