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

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      if (!started.current && entries.some(e => e.isIntersecting)) {
        started.current = true
        const start = performance.now()
        const tick = () => {
          const t = Math.min(1, (performance.now() - start) / durationMs)
          const eased = 1 - Math.pow(1 - t, 3)
          setVal(Math.round(to * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, durationMs])

  return (
    <div ref={ref} className={className}>
      {val}
      {suffix}
    </div>
  )
}


