"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { FadeInSection } from "@/components/fade-in-section"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { useLanguage } from "@/components/language-provider"
import {
  CODING_EXPERIENCE_LEVELS,
  VOLUNTEER_ROLES,
  TIME_BLOCKS,
  generateICS,
  EVENT_DETAILS,
} from "@/data/siteContent"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CalendarPlus,
  Link2,
  Clock,
  MapPin,
} from "lucide-react"

const volunteerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  experience: z.string().min(1, "Please select experience level"),
  role: z.string().optional(),
  availability: z.array(z.string()).min(1, "Select at least one time block"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  note: z.string().optional(),
})

type VolunteerForm = z.infer<typeof volunteerSchema>

const STEPS = 3

export default function VolunteerPage() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { availability: [], consent: undefined },
  })

  const availability = watch("availability")

  const nextStep = async () => {
    let valid = false
    if (step === 1) valid = await trigger(["name", "email", "phone"])
    if (step === 2) valid = await trigger(["experience", "availability"])
    if (valid) setStep((s) => Math.min(s + 1, STEPS))
  }

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const onSubmit = async (data: VolunteerForm) => {
    setSubmitting(true)
    setSubmitError("")
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Submission failed")
      setSubmitted(true)
    } catch {
      setSubmitError(t.volunteer.errorMessage || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const downloadICS = () => {
    const blob = new Blob([generateICS()], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "fiesta-code-jam.ics"
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/volunteer")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-fiesta-green/10">
              <CheckCircle2 className="h-8 w-8 text-fiesta-green" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">{t.volunteer.confirmTitle}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.volunteer.confirmBody}</p>

            {/* Event details */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <CalendarPlus className="h-4 w-4 shrink-0 text-fiesta-red" />
                  <span className="text-sm text-muted-foreground">{EVENT_DETAILS.date}, {EVENT_DETAILS.startTime} - {EVENT_DETAILS.endTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-fiesta-orange" />
                  <span className="text-sm text-muted-foreground">{EVENT_DETAILS.locationLabel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-fiesta-green" />
                  <span className="text-sm text-muted-foreground">{EVENT_DETAILS.notes}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={downloadICS}
                className="inline-flex items-center gap-2 rounded-lg bg-fiesta-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fiesta-red/20 transition-all hover:scale-105 hover:brightness-110 active:scale-[0.97]"
              >
                <CalendarPlus className="h-4 w-4" />
                {t.volunteer.addCalendar}
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                <Link2 className="h-4 w-4" />
                {linkCopied ? t.volunteer.linkCopied : t.volunteer.copyLink}
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* It Takes a Community */}
        <section className="border-b border-border px-6 pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <FadeInSection>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fiesta-red">Volunteer</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-6xl">{t.about.communityTitle}</h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Fiesta Code workshops are possible because of students, volunteers, educators, community organizations,
                and partners who give their time and expertise.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.about.communityVolunteers}</p>
              <a
                href="#volunteer-form"
                className="btn-glow group mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-fiesta-red px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-fiesta-red/25 hover:shadow-xl hover:shadow-fiesta-red/35"
              >
                Volunteer With Fiesta Code
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </FadeInSection>
            <FadeInSection delay={150}>
              <ImagePlaceholder label="Volunteers and students at a Fiesta Code workshop" src="/images/webp/workshop-room-wide.webp" className="aspect-[4/3]" />
            </FadeInSection>
          </div>
        </section>

        {/* Sign-up heading */}
        <section id="volunteer-form" className="scroll-mt-32 px-6 pb-8 pt-16 md:pb-12 md:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">{t.volunteer.headline}</h2>
            <p className="mt-4 text-base text-muted-foreground">{t.volunteer.subheading}</p>
          </div>
        </section>

        {/* Progress */}
        <section className="px-6 pb-8">
          <div className="mx-auto flex max-w-lg items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  s < step ? "bg-fiesta-green text-white" : s === step ? "bg-fiesta-red text-white" : "bg-secondary text-muted-foreground"
                }`}>
                  {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                <span className={`hidden text-xs font-semibold sm:block ${s === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? t.volunteer.step1Title : s === 2 ? t.volunteer.step2Title : t.volunteer.step3Title}
                </span>
                {s < 3 && <div className={`h-px w-8 ${s < step ? "bg-fiesta-green" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="card-lift rounded-2xl border border-border bg-card p-6 md:p-10">

              {/* Step 1: Contact */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.nameLabel}</label>
                    <input {...register("name")} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-fiesta-red focus:ring-1 focus:ring-fiesta-red" />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.emailLabel}</label>
                    <input type="email" {...register("email")} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-fiesta-red focus:ring-1 focus:ring-fiesta-red" />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.phoneLabel}</label>
                    <input type="tel" {...register("phone")} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-fiesta-red focus:ring-1 focus:ring-fiesta-red" />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.experienceLabel}</label>
                    <select {...register("experience")} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-fiesta-red focus:ring-1 focus:ring-fiesta-red">
                      <option value="">Select...</option>
                      {CODING_EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    {errors.experience && <p className="mt-1 text-xs text-destructive">{errors.experience.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.roleLabel}</label>
                    <select {...register("role")} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-fiesta-red focus:ring-1 focus:ring-fiesta-red">
                      <option value="">Select...</option>
                      {VOLUNTEER_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.availabilityLabel}</label>
                    <div className="flex flex-col gap-2">
                      {TIME_BLOCKS.map((block) => (
                        <label key={block} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all ${
                          availability?.includes(block) ? "border-fiesta-red bg-fiesta-red/5 text-foreground" : "border-border bg-background text-muted-foreground hover:border-border hover:bg-secondary"
                        }`}>
                          <input type="checkbox" value={block} {...register("availability")} className="sr-only" />
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                            availability?.includes(block) ? "border-fiesta-red bg-fiesta-red" : "border-border"
                          }`}>
                            {availability?.includes(block) && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                          {block}
                        </label>
                      ))}
                    </div>
                    {errors.availability && <p className="mt-1 text-xs text-destructive">{errors.availability.message}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Consent */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <label className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-4 text-sm transition-all ${
                    watch("consent") ? "border-fiesta-green bg-fiesta-green/5" : "border-border bg-background"
                  }`}>
                    <input type="checkbox" {...register("consent")} className="sr-only" />
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      watch("consent") ? "border-fiesta-green bg-fiesta-green" : "border-border"
                    }`}>
                      {watch("consent") && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-muted-foreground">{t.volunteer.consentLabel}</span>
                  </label>
                  {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.volunteer.noteLabel}</label>
                    <textarea {...register("note")} rows={3} className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-fiesta-red focus:ring-1 focus:ring-fiesta-red" />
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted">
                    <ArrowLeft className="h-4 w-4" />
                    {t.volunteer.back}
                  </button>
                ) : <div />}
                {step < STEPS ? (
                  <button type="button" onClick={nextStep} className="btn-glow inline-flex items-center gap-2 rounded-lg bg-fiesta-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fiesta-red/20 hover:shadow-xl hover:shadow-fiesta-red/30">
                    {t.volunteer.next}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={submitting} className="btn-glow inline-flex items-center gap-2 rounded-lg bg-fiesta-green px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fiesta-green/20 hover:shadow-xl hover:shadow-fiesta-green/30 disabled:pointer-events-none disabled:opacity-50">
                    {submitting ? "Submitting..." : t.volunteer.submit}
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              {submitError && (
                <p className="mt-4 text-center text-sm text-destructive">{submitError}</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
