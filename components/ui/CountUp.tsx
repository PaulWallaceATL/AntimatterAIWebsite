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
    const io = new IntersectionObserver((entries) => {
      if (!started.current && entries.some(e => e.isIntersecting)) {
        started.current = true
        if (prefersReduced) {
          setVal(to)
          return
        }
        const start = performance.now()
        const animate = () => {
          const t = Math.min(1, (performance.now() - start) / durationMs)
          const eased = 1 - Math.pow(1 - t, 3)
          setVal(Math.round(to * eased))
          if (t < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
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


