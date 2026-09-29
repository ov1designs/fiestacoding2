"use client"

import { useEffect, useRef, useState } from "react"

const IMPACT_ITEMS = [
  { value: 200, suffix: "+", label: "Students Served" },
  { value: 6, suffix: "", label: "Workshops Hosted" },
  { value: 150, suffix: "+", label: "Volunteer Hours" },
  { value: 7, suffix: "", label: "Student Volunteers Trained" },
]

function AnimatedImpactNumber({ value, suffix, label, delay }: (typeof IMPACT_ITEMS)[number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()

        const startTime = performance.now() + delay
        const duration = 700
        const easeOut = (progress: number) => 1 - Math.pow(1 - progress, 4)

        const animate = (time: number) => {
          if (time < startTime) {
            requestAnimationFrame(animate)
            return
          }
          const progress = Math.min((time - startTime) / duration, 1)
          setCount(Math.floor(easeOut(progress) * value))
          if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.25 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay, value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-2 py-2 text-center">
      <span
        className={`text-3xl font-bold text-fiesta-red transition-opacity duration-300 md:text-4xl ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {count}{suffix}
      </span>
      <span className="max-w-36 text-sm leading-relaxed text-muted-foreground">{label}</span>
    </div>
  )
}

export function HomeImpact() {
  return (
    <section className="px-6 pb-12 pt-2 md:pb-16 md:pt-4" aria-labelledby="impact-heading">
      <div className="mx-auto max-w-6xl">
        <div className="card-lift rounded-2xl border border-border bg-card px-5 py-6 md:px-8 md:py-7">
          <h2 id="impact-heading" className="text-center text-2xl font-bold text-white md:text-3xl">
            Our Impact
          </h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4">
            {IMPACT_ITEMS.map((item, index) => (
              <AnimatedImpactNumber key={item.label} {...item} delay={index * 120} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeImpact
