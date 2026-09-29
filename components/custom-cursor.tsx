"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const smoothPos = useRef({ x: -100, y: -100 })
  const velocity = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const setOpacity = (val: number) => {
      if (outerRef.current) outerRef.current.style.opacity = String(val)
      if (innerRef.current) innerRef.current.style.opacity = String(val)
    }

    let prevX = -100
    let prevY = -100

    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX
      const ny = e.clientY
      if (prevX > -99) {
        velocity.current.x = nx - prevX
        velocity.current.y = ny - prevY
      }
      prevX = nx
      prevY = ny
      pos.current.x = nx
      pos.current.y = ny
      if (!visible.current) {
        visible.current = true
        setOpacity(1)
      }
    }

    const onMouseLeave = () => {
      visible.current = false
      setOpacity(0)
    }
    const onMouseEnter = () => {
      visible.current = true
      setOpacity(1)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.documentElement.addEventListener("mouseleave", onMouseLeave)
    document.documentElement.addEventListener("mouseenter", onMouseEnter)

    let raf: number
    const animate = () => {
      // Smooth follow with spring-like easing
      const dx = pos.current.x - smoothPos.current.x
      const dy = pos.current.y - smoothPos.current.y
      smoothPos.current.x += dx * 0.18
      smoothPos.current.y += dy * 0.18

      // Cursor speed affects ring scale for a breathing effect
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const scale = 1 + Math.min(speed * 0.008, 0.3) // scale up to 1.3x when fast
      velocity.current.x *= 0.85
      velocity.current.y *= 0.85

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${smoothPos.current.x - 18}px, ${smoothPos.current.y - 18}px, 0) scale(${scale})`
        // Opacity increases slightly when moving fast
        outerRef.current.style.borderColor = `hsl(4 78% 55% / ${0.2 + Math.min(speed * 0.01, 0.3)})`
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`
      }

      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMouseMove)
      document.documentElement.removeEventListener("mouseleave", onMouseLeave)
      document.documentElement.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid hsl(4 78% 55% / 0.2)",
          opacity: 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "hsl(4 78% 55% / 0.7)",
          opacity: 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
      />
    </>
  )
}
