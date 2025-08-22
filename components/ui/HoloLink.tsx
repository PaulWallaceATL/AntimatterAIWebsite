"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

type HoloLinkProps = {
  href: string
  label: string
  className?: string
}

/**
 * Holographic nav link: a small WebGL plane that renders a shader with
 * - subtle scanline/iridescent glow
 * - hover distortion
 * - click morph (rect -> circle -> fade) then navigates
 */
export function HoloLink({ href, label, className }: HoloLinkProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isHover, setIsHover] = useState(false)
  const [isMorphing, setIsMorphing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      uTime: new THREE.Uniform(0),
      uHover: new THREE.Uniform(0),
      uMorph: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(new THREE.Vector2(container.clientWidth, container.clientHeight)),
      uLabel: { value: 0 },
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uHover;
        uniform float uMorph;
        // base colors
        vec3 c1 = vec3(0.55, 0.56, 0.91);
        vec3 c2 = vec3(0.30, 0.31, 0.55);

        // Signed distance functions
        float sdRoundedRect(vec2 p, vec2 b, float r){
          vec2 q = abs(p) - b + vec2(r);
          return length(max(q, 0.0)) - r + min(max(q.x, q.y), 0.0);
        }
        float sdCircle(vec2 p, float r){ return length(p) - r; }

        void main(){
          vec2 uv = vUv * 2.0 - 1.0;

          // Morph between rounded rect and circle on click
          float rect = sdRoundedRect(uv, vec2(0.78, 0.34), 0.18);
          float circ = sdCircle(uv, 0.82);
          float shape = mix(rect, circ, smoothstep(0.0, 1.0, uMorph));
          float edge = smoothstep(0.02, 0.0, shape);

          // iridescent scanlines + noise shimmer
          float scan = sin((uv.y + uTime * 0.6) * 60.0) * 0.04;
          float glow = 0.18 + 0.24 * edge + 0.26 * uHover + scan;
          vec3 base = mix(c2, c1, 0.55 + 0.45 * sin(uTime + uv.x * 3.0));

          // subtle hover refraction
          vec2 disto = vec2(
            0.015 * uHover * sin(uTime * 2.0 + uv.y * 12.0),
            0.012 * uHover * cos(uTime * 2.2 + uv.x * 12.0)
          );
          float inner = smoothstep(0.0, -0.02, shape + dot(disto, disto));

          // final color
          vec3 col = base * (0.65 + 0.35 * inner) + vec3(glow);
          float alpha = inner * (0.85 - 0.4 * uMorph);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      ;(uniforms.uResolution.value as THREE.Vector2).set(w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    let raf = 0
    const start = performance.now()
    const tick = () => {
      const t = (performance.now() - start) / 1000
      uniforms.uTime.value = t
      uniforms.uHover.value += ((isHover ? 1 : 0) - uniforms.uHover.value) * 0.15
      uniforms.uMorph.value += ((isMorphing ? 1 : 0) - uniforms.uMorph.value) * 0.12
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [isHover, isMorphing])

  const onClick = () => {
    if (isMorphing) return
    setIsMorphing(true)
    // delay navigation to allow morph animation
    setTimeout(() => {
      router.push(href)
    }, 260)
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      role="link"
      aria-label={label}
      style={{ width: 96, height: 36, cursor: 'pointer' }}
      title={label}
    />
  )
}


