"use client"

import { useEffect, useRef } from "react"

const SYMBOLS = [
  "func", "let", "var", "if", "for", "=>", "{}", "[]", "<>", "//",
  "&&", "||", "===", "!=", "++", "AI", "def", "01", "px", "npm",
  "#=", "F5", "0x", ">>", "<<", "+=", "B1", "FF", "ML", "API",
  "int", "&&=", "$_", "*/", "??", "</>", "0b",
]

const COLORS = [
  "rgba(200, 60, 50, 0.35)",
  "rgba(120, 160, 50, 0.30)",
  "rgba(200, 180, 50, 0.30)",
  "rgba(200, 60, 50, 0.25)",
  "rgba(100, 140, 40, 0.25)",
  "rgba(220, 120, 40, 0.28)",
]

const PUSH_RADIUS = 25
const SOFT_ZONE = 60 // outer zone where symbols gently drift away

interface Symbol {
  x: number
  y: number
  vx: number
  vy: number
  text: string
  color: string
  size: number
  speed: number
  rotation: number
  rotSpeed: number
  sway: number
  swayOffset: number
  friction: number
}

interface CodeBackgroundProps {
  symbols?: string[]
  colors?: string[]
  count?: number
}

export function CodeBackground({ symbols: symbolSet = SYMBOLS, colors = COLORS, count = 80 }: CodeBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    const symbols: Symbol[] = Array.from({ length: count }, () => {
      const x = Math.random() * w
      return {
        x,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        text: symbolSet[Math.floor(Math.random() * symbolSet.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 16 + Math.random() * 26,
        speed: 0.07 + Math.random() * 0.02,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.002,
        sway: 0.2 + Math.random() * 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        friction: 0.94 + Math.random() * 0.04, // 0.94 - 0.98 per symbol
      }
    })

    let lastMouse = { x: -9999, y: -9999 }
    let time = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Track cursor velocity
        if (lastMouse.x > -9000) {
          mouseRef.current.vx = x - lastMouse.x
          mouseRef.current.vy = y - lastMouse.y
        }
        lastMouse.x = x
        lastMouse.y = y
        mouseRef.current.x = x
        mouseRef.current.y = y
      } else {
        mouseRef.current.x = -9999
        mouseRef.current.y = -9999
        mouseRef.current.vx = 0
        mouseRef.current.vy = 0
      }
    }

    document.addEventListener("mousemove", onMouseMove)

    let raf: number
    const draw = () => {
      time += 0.01
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      ctx.clearRect(0, 0, cw, ch)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mvx = mouseRef.current.vx
      const mvy = mouseRef.current.vy

      // Slowly decay cursor velocity when not moving
      mouseRef.current.vx *= 0.85
      mouseRef.current.vy *= 0.85

      for (const s of symbols) {
        const dx = s.x - mx
        const dy = s.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0 && dist < PUSH_RADIUS) {
          // Hard boundary: push to edge
          const nx = dx / dist
          const ny = dy / dist
          s.x = mx + nx * PUSH_RADIUS
          s.y = my + ny * PUSH_RADIUS
          // Deflect with cursor momentum for natural feel
          const cursorSpeed = Math.sqrt(mvx * mvx + mvy * mvy)
          const deflectStrength = 1.5 + cursorSpeed * 0.3
          s.vx = nx * deflectStrength + mvx * 0.2
          s.vy = ny * deflectStrength + mvy * 0.2
          // Spin symbols when pushed
          s.rotSpeed = (Math.random() - 0.5) * 0.04
        } else if (dist > 0 && dist < PUSH_RADIUS + SOFT_ZONE) {
          // Soft zone: gentle repel proportional to proximity
          const proximity = 1 - (dist - PUSH_RADIUS) / SOFT_ZONE
          const nx = dx / dist
          const ny = dy / dist
          const softForce = proximity * proximity * 0.6
          s.vx += nx * softForce + mvx * proximity * 0.02
          s.vy += ny * softForce + mvy * proximity * 0.02
        }

        // Apply velocity with per-symbol friction
        s.x += s.vx
        s.vy += s.speed
        s.y += s.vy

        // Ambient sway
        s.x += Math.sin(time * 2 + s.swayOffset) * s.sway * 0.15

        s.vx *= s.friction
        s.vy *= s.friction

        // Slowly decay rotation
        s.rotation += s.rotSpeed
        s.rotSpeed *= 0.98

        // Wrap around
        if (s.y > ch + 50) {
          s.y = -50
          s.x = Math.random() * cw
          s.vx = 0
          s.vy = 0
          s.rotSpeed = (Math.random() - 0.5) * 0.002
        }
        if (s.x < -80) s.x = cw + 40
        if (s.x > cw + 80) s.x = -40

        // Draw with slight opacity pulse
        const pulse = 0.85 + Math.sin(time * 3 + s.swayOffset) * 0.15
        ctx.save()
        ctx.globalAlpha = pulse
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        ctx.font = `700 ${s.size}px ui-monospace, monospace`
        ctx.fillStyle = s.color
        ctx.fillText(s.text, 0, 0)
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [symbolSet, colors, count])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
