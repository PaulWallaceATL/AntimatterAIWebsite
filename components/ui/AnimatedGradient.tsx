"use client"

import { useEffect, useRef } from 'react'

type AnimatedGradientProps = {
  className?: string
}

// Simple canvas shader-like gradient to avoid heavier WebGL cost for the page bg
export function AnimatedGradient({ className }: AnimatedGradientProps) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let raf = 0
    let start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const colors = [
      [162, 163, 233], // #a2a3e9
      [105, 106, 172], // #696aac
      [34, 34, 54],
    ]

    const tick = () => {
      const t = (performance.now() - start) / 1000
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      ctx.clearRect(0, 0, w, h)

      // animated radial gradients that drift
      for (let i = 0; i < 3; i++) {
        const [r, g, b] = colors[i]
        const x = (Math.sin(t * 0.2 + i) * 0.35 + 0.5) * w
        const y = (Math.cos(t * 0.22 + i * 1.7) * 0.35 + 0.5) * h
        const radius = Math.max(w, h) * 0.6
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
        grad.addColorStop(0, `rgba(${r},${g},${b},0.12)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.rect(0, 0, w, h)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={className} />
}


