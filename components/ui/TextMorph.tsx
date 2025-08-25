"use client"

import { useEffect, useRef } from 'react'

type TextMorphProps = {
  text: string
  className?: string
}

// Canvas-based text morph: particles start as random blobs and settle into glyphs.
export function TextMorph({ text, className }: TextMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true } as any) as CanvasRenderingContext2D
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const words = text.split(/\s+/)
    let wordIndex = 0
    let particles: { x: number; y: number; vx: number; vy: number; tx: number; ty: number }[] = []
    const targetPoints: { x: number; y: number }[] = []

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // re-sample current word
      sampleWord(words[wordIndex])
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function sampleWord(word: string) {
      if (!canvas) return
      targetPoints.length = 0
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#fff'
      // adaptive font size
      const base = Math.min(w, h)
      const size = Math.max(28, Math.min(88, base * 0.12))
      ctx.font = `600 ${size}px Manrope, Inter, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(word, w / 2, h / 2)
      const cw = canvas.width
      const ch = canvas.height
      const img = ctx.getImageData(0, 0, cw, ch)
      // sample points
      const stepCss = 6
      const stepPx = Math.max(4, Math.round(stepCss * dpr))
      for (let y = 0; y < ch; y += stepPx) {
        for (let x = 0; x < cw; x += stepPx) {
          const idx = (y * cw + x) * 4 + 3
          if (img.data[idx] > 128) {
            targetPoints.push({ x: x / dpr, y: y / dpr })
          }
        }
      }
      // init particles (keep count stable)
      const need = targetPoints.length
      particles = new Array(need).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
      }))
      for (let i = 0; i < need; i++) {
        particles[i].tx = targetPoints[i].x
        particles[i].ty = targetPoints[i].y
      }
    }

    resize()

    let raf = 0
    let lastSwitch = performance.now()
    const switchDelay = 900 // ms between words

    const tick = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // physics towards target
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const ax = (p.tx - p.x) * 0.08
        const ay = (p.ty - p.y) * 0.08
        p.vx = (p.vx + ax) * 0.86
        p.vy = (p.vy + ay) * 0.86
        p.x += p.vx
        p.y += p.vy
      }

      // render particles
      ctx.fillStyle = '#E4E5FF'
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // advance to next word
      const now = performance.now()
      if (now - lastSwitch > switchDelay) {
        lastSwitch = now
        wordIndex = (wordIndex + 1) % words.length
        sampleWord(words[wordIndex])
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [text])

  return <canvas ref={canvasRef} className={className} />
}


