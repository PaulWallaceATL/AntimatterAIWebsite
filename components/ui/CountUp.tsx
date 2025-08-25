"use client"

import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  to: number
  durationMs?: number
  suffix?: string
  className?: string
}

export function CountUp({ to, durationMs = 1200, suffix = '', className }: CountUpProps) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let fallbackTimer: any

    const startAnim = () => {
      if (started.current) return
      started.current = true
      if (prefersReduced) { setVal(to); return }
      const start = performance.now()
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / durationMs)
        const eased = 1 - Math.pow(1 - t, 3)
        setVal(Math.round(to * eased))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) startAnim()
    }, { threshold: 0.2, rootMargin: "-10% 0% -10% 0%" })
    io.observe(el)
    // Fallback: if observer never fires (e.g., overlay stacking), start after 1s
    fallbackTimer = setTimeout(startAnim, 1000)
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(fallbackTimer) }
  }, [to, durationMs, prefersReduced])

  return (
    <div
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums', minWidth: `${(to.toString() + suffix).length}ch` }}
      aria-live="polite"
    >
      <span>{val}</span>
      <span>{suffix}</span>
    </div>
  )
}


