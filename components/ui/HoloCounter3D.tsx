"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

type HoloCounter3DProps = {
  value: number
  durationMs?: number
  className?: string
  suffix?: string
}

export function HoloCounter3D({ value, durationMs = 1400, className, suffix }: HoloCounter3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [started, setStarted] = useState(false)
  const hoverTarget = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 9)

    // lights
    scene.add(new THREE.AmbientLight(0x8080aa, 0.45))
    const point = new THREE.PointLight(0xa2a3e9, 0.9, 50)
    point.position.set(4, 5, 10)
    scene.add(point)

    // materials
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c9caff'),
      emissive: new THREE.Color('#7f80d6'),
      emissiveIntensity: 0.36,
      metalness: 0.15,
      roughness: 0.25,
      transparent: true,
      opacity: 0.9,
      transmission: 0.45,
      thickness: 0.4,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    })

    // digit blueprint (seven-segment)
    const segLen = 1.9
    const segThick = 0.22
    const depth = 0.18
    const unit = new THREE.BoxGeometry(segLen, segThick, depth)
    const unitV = new THREE.BoxGeometry(segThick, segLen, depth)

    function createDigit(): THREE.Group {
      const g = new THREE.Group()
      const a = new THREE.Mesh(unit, mat.clone()); a.position.set(0, 1.02, 0)
      const d = new THREE.Mesh(unit, mat.clone()); d.position.set(0, -1.02, 0)
      const gseg = new THREE.Mesh(unit, mat.clone()); gseg.position.set(0, 0.0, 0)
      const b = new THREE.Mesh(unitV, mat.clone()); b.position.set(0.96, 0.52, 0)
      const c = new THREE.Mesh(unitV, mat.clone()); c.position.set(0.96, -0.52, 0)
      const e = new THREE.Mesh(unitV, mat.clone()); e.position.set(-0.96, -0.52, 0)
      const f = new THREE.Mesh(unitV, mat.clone()); f.position.set(-0.96, 0.52, 0)
      const arr = [a, b, c, d, e, f, gseg]
      arr.forEach(m => g.add(m))
      // store for fast toggle
      ;(g as any)._segments = arr
      return g
    }

    function setDigit(group: THREE.Group, d: number) {
      const arr: THREE.Mesh[] = (group as any)._segments
      const [a, b, c, dseg, e, f, gseg] = arr
      const on = (idx: number, v: boolean) => { arr[idx].visible = v }
      // patterns: a,b,c,d,e,f,g
      const pat: Record<number, [boolean, boolean, boolean, boolean, boolean, boolean, boolean]> = {
        0: [true, true, true, true, true, true, false],
        1: [false, true, true, false, false, false, false],
        2: [true, true, false, true, true, false, true],
        3: [true, true, true, true, false, false, true],
        4: [false, true, true, false, false, true, true],
        5: [true, false, true, true, false, true, true],
        6: [true, false, true, true, true, true, true],
        7: [true, true, true, false, false, false, false],
        8: [true, true, true, true, true, true, true],
        9: [true, true, true, true, false, true, true],
      }
      const bits = pat[d as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9]
      if (!bits) return
      for (let i = 0; i < 7; i++) on(i, bits[i])
    }

    // build group of up to 3 digits
    const maxDigits = Math.max(1, value.toString().length)
    const group = new THREE.Group()
    const digits: THREE.Group[] = []
    for (let i = 0; i < maxDigits; i++) {
      const d = createDigit()
      d.position.x = (i - (maxDigits - 1) / 2) * 2.4
      digits.push(d)
      group.add(d)
    }
    scene.add(group)

    // optional subtle rotation
    group.rotation.x = -0.06
    group.rotation.y = 0.18

    // handle resize
    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // pointer parallax
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      hoverTarget.current.x = nx
      hoverTarget.current.y = ny
    }
    container.addEventListener('mousemove', onMove, { passive: true })

    // animate counting
    let raf = 0
    let start = 0
    let currentValue = 0
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const updateDigits = (num: number) => {
      const str = Math.floor(num).toString().padStart(maxDigits, '0')
      for (let i = 0; i < maxDigits; i++) {
        const ch = str[i]
        setDigit(digits[i], parseInt(ch, 10))
      }
    }
    updateDigits(0)

    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const t = Math.min(1, elapsed / durationMs)
      const k = easeOut(t)
      currentValue = value * k
      updateDigits(currentValue)
      // ease group towards pointer
      const targetY = 0.18 + hoverTarget.current.x * 0.08
      const targetX = -0.06 + hoverTarget.current.y * 0.06
      group.rotation.y += (targetY - group.rotation.y) * 0.08
      group.rotation.x += (targetX - group.rotation.x) * 0.08
      renderer.render(scene, camera)
      if (t < 1 || !started) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener('mousemove', onMove)
      scene.remove(group)
      digits.forEach(d => (d as any)._segments?.forEach((m: THREE.Mesh) => m.geometry.dispose()))
      unit.dispose()
      unitV.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [value, durationMs, started])

  return (
    <div className={className} ref={containerRef} style={{ width: '140px', height: '68px', position: 'relative' }}>
      {suffix && (
        <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-[#c7c8f2] text-sm font-semibold">{suffix}</span>
      )}
    </div>
  )
}


