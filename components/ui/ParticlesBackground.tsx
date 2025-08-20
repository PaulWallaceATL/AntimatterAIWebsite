"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type ParticlesBackgroundProps = {
  className?: string
  /** Optional desired particle count; defaults to 2000 */
  particleCount?: number
}

export function ParticlesBackground({ className, particleCount = 700 }: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, true)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 100

    // Particles geometry
    const count = Math.max(1000, Math.min(20000, particleCount))
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)

    const width = 100
    const height = 56
    const depth = 6

    for (let i = 0; i < count; i++) {
      // Place points in a soft elliptical blob with gentle Z spread
      const r = Math.sqrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const x = r * Math.cos(theta) * width * 0.6 + Math.sin(theta * 3.0) * 6.0
      const y = r * Math.sin(theta) * height * 0.4 + Math.cos(theta * 2.0) * 4.0
      const z = (Math.random() - 0.5) * depth
      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      seeds[i] = Math.random() * 6.28318
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const uniforms = {
      uTime: new THREE.Uniform(0),
      uRippleCenter: new THREE.Uniform(new THREE.Vector3(0, 0, 0)),
      uRippleTime: new THREE.Uniform(0),
      uHover: new THREE.Uniform(0),
      uPixelRatio: new THREE.Uniform(Math.min(window.devicePixelRatio, 2)),
      uBaseSize: new THREE.Uniform(1.4),
      uColor: new THREE.Uniform(new THREE.Color('#a2a3e9')),
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uRippleCenter;
        uniform float uRippleTime;
        uniform float uHover;
        uniform float uPixelRatio;
        uniform float uBaseSize;
        attribute float aSeed;
        varying float vAlpha;
        
        void main() {
          vec3 pos = position;
          // Gentle perpetual drift (more subtle and elegant)
          float dx = sin(uTime * 0.16 + pos.y * 0.18 + aSeed) * 0.25;
          float dy = cos(uTime * 0.14 + pos.x * 0.16 + aSeed) * 0.22;
          pos.x += dx;
          pos.y += dy;

          // Ripple displacement along Z, smooth and subtle
          float d = distance(pos.xy, uRippleCenter.xy);
          float influence = uHover * smoothstep(1.0, 0.0, d * 0.06);
          float wave = sin(d * 5.0 - uRippleTime * 3.0);
          pos.z += influence * wave * 0.8;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float size = uBaseSize * (1.0 + 0.2 * sin(aSeed + uTime * 0.4));
          size *= (300.0 / -mvPosition.z);
          gl_PointSize = clamp(size * uPixelRatio, 0.8, 6.0);

          vAlpha = 0.28 + 0.42 * influence;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = dot(c, c);
          float alpha = smoothstep(0.20, 0.0, d);
          gl_FragColor = vec4(uColor, alpha * vAlpha);
        }
      `,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Mouse ripple handling
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) // z=0 plane
    const mouseNDC = new THREE.Vector2()

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      if (!inside) {
        uniforms.uHover.value = 0.0
        return
      }
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseNDC.set(x, y)
      raycaster.setFromCamera(mouseNDC, camera)
      const hit = new THREE.Vector3()
      raycaster.ray.intersectPlane(plane, hit)
      if (hit) {
        uniforms.uRippleCenter.value.copy(hit)
        uniforms.uHover.value = 1.0
      }
    }

    function handleMouseLeave() {
      uniforms.uHover.value = 0.0
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, true)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    })
    resizeObserver.observe(container)

    let rafId = 0
    const start = performance.now()
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000
      uniforms.uTime.value = elapsed
      // Keep ripple time running so wave propagates
      uniforms.uRippleTime.value = elapsed
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
      scene.remove(points)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [particleCount])

  return (
    <div ref={containerRef} className={className} style={{ pointerEvents: 'none' }} />
  )
}


