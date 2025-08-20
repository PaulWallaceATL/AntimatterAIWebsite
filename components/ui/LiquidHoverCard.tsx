"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type LiquidHoverCardProps = {
  className?: string
}

export function LiquidHoverCard({ className }: LiquidHoverCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(new THREE.Vector2(container.clientWidth, container.clientHeight)),
      uMouse: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
      uIntensity: new THREE.Uniform(0),
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uIntensity;

        // brand colors
        vec3 colorTop = vec3(0.08, 0.08, 0.08); // #141414
        vec3 colorBottom = vec3(0.11, 0.11, 0.11); // ~ #1c1c1c
        vec3 accent = vec3(0.64, 0.64, 0.91); // #a2a3e9

        void main() {
          vec2 uv = vUv;

          // background subtle vertical gradient
          float g = smoothstep(0.0, 1.0, uv.y);
          vec3 base = mix(colorTop, colorBottom, g);

          // distance from mouse for ripples
          float d = distance(uv, uMouse);
          float ripple = sin(d * 60.0 - uTime * 3.0) * exp(-d * 6.0) * 0.015 * uIntensity;
          // gentle flow
          float flow = 0.004 * sin(uTime * 0.8 + uv.y * 12.0);
          uv.y += ripple + flow * uIntensity;

          // second pass to create subtle refractive look
          float ripple2 = sin(d * 40.0 - uTime * 2.0) * exp(-d * 5.0) * 0.008 * uIntensity;
          uv.x += ripple2;

          // recompute gradient after distortion
          float g2 = smoothstep(0.0, 1.0, uv.y);
          vec3 col = mix(colorTop, colorBottom, g2);

          // soft highlight near cursor
          float glow = exp(-d * 12.0) * 0.18 * uIntensity;
          col += accent * glow * 0.25;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // interaction
    let targetIntensity = 0

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      if (!inside) {
        targetIntensity = 0
        return
      }
      targetIntensity = 1
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      uniforms.uMouse.value.set(x, 1.0 - y)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    // resize
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w, h)
    })
    ro.observe(container)

    let raf = 0
    const start = performance.now()
    const tick = () => {
      const t = (performance.now() - start) / 1000
      uniforms.uTime.value = t
      // ease intensity
      uniforms.uIntensity.value += (targetIntensity - uniforms.uIntensity.value) * 0.08
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={className} style={{ pointerEvents: 'none' }} />
}


