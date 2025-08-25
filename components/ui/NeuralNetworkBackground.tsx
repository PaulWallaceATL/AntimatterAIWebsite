"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type NeuralNetworkBackgroundProps = {
  className?: string
  nodeCount?: number
  connectionsPerNode?: number
}

/**
 * Lightweight Three.js neural network field for the hero background.
 * - Nodes: custom shader points with per-node intensity
 * - Synapses: line segments with vertex colors derived from connected node intensities
 * - Interaction: nearest nodes glow and emit pulses on pointer move
 */
export function NeuralNetworkBackground({
  className,
  nodeCount = 180,
  connectionsPerNode = 3,
}: NeuralNetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, true)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 90

    // Generate nodes in a soft ellipsoid
    const count = Math.max(60, Math.min(600, nodeCount))
    const nodePositions = new Float32Array(count * 3)
    const nodeSeeds = new Float32Array(count)
    const nodeIntensities = new Float32Array(count)
    const tmpVec3 = new THREE.Vector3()

    const width = 100
    const height = 54
    const depth = 24

    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const x = r * Math.cos(theta) * width * 0.55
      const y = (Math.random() * 2 - 1) * height * 0.4
      const z = (Math.random() * 2 - 1) * depth * 0.35
      nodePositions[i * 3 + 0] = x
      nodePositions[i * 3 + 1] = y
      nodePositions[i * 3 + 2] = z
      nodeSeeds[i] = Math.random() * Math.PI * 2
      nodeIntensities[i] = 0.35
    }

    // Build k-nearest connections (simple O(n^2) for small counts)
    type Edge = { a: number; b: number }
    const edges: Edge[] = []
    const k = Math.max(1, Math.min(6, connectionsPerNode))
    for (let i = 0; i < count; i++) {
      const distances: { j: number; d2: number }[] = []
      const ix = nodePositions[i * 3 + 0]
      const iy = nodePositions[i * 3 + 1]
      const iz = nodePositions[i * 3 + 2]
      for (let j = 0; j < count; j++) {
        if (i === j) continue
        const dx = ix - nodePositions[j * 3 + 0]
        const dy = iy - nodePositions[j * 3 + 1]
        const dz = iz - nodePositions[j * 3 + 2]
        distances.push({ j, d2: dx * dx + dy * dy + dz * dz })
      }
      distances.sort((a, b) => a.d2 - b.d2)
      for (let n = 0; n < k; n++) {
        const j = distances[n].j
        if (i < j) edges.push({ a: i, b: j })
      }
    }

    // Nodes: custom shader points
    const nodeGeometry = new THREE.BufferGeometry()
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    nodeGeometry.setAttribute('aSeed', new THREE.BufferAttribute(nodeSeeds, 1))
    const intensityAttr = new THREE.BufferAttribute(nodeIntensities, 1)
    intensityAttr.usage = THREE.DynamicDrawUsage
    nodeGeometry.setAttribute('aIntensity', intensityAttr)

    const nodeUniforms = {
      uTime: new THREE.Uniform(0),
      uPixelRatio: new THREE.Uniform(Math.min(window.devicePixelRatio, 2)),
      uBaseSize: new THREE.Uniform(1.6),
      uColor: new THREE.Uniform(new THREE.Color('#a2a3e9')),
    }

    const nodeMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: nodeUniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uBaseSize;
        attribute float aSeed;
        attribute float aIntensity;
        varying float vIntensity;
        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * 0.14 + aSeed) * 0.18;
          pos.y += cos(uTime * 0.12 + aSeed) * 0.16;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          float size = uBaseSize * (1.0 + 0.15 * sin(aSeed + uTime * 0.8));
          size *= (300.0 / -mvPosition.z);
          gl_PointSize = clamp(size * uPixelRatio, 0.9, 6.0);
          vIntensity = aIntensity;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;
        varying float vIntensity;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = dot(c, c);
          float alpha = smoothstep(0.2, 0.0, d);
          vec3 col = uColor * (0.35 + 0.65 * clamp(vIntensity, 0.0, 1.5));
          gl_FragColor = vec4(col, alpha * (0.25 + 0.55 * clamp(vIntensity, 0.0, 1.5)));
        }
      `,
    })

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(nodePoints)

    // Synapses: line segments with vertex colors (updated per-frame)
    const edgePositions = new Float32Array(edges.length * 2 * 3)
    const edgeColors = new Float32Array(edges.length * 2 * 3)
    for (let e = 0; e < edges.length; e++) {
      const { a, b } = edges[e]
      const ax = nodePositions[a * 3 + 0]
      const ay = nodePositions[a * 3 + 1]
      const az = nodePositions[a * 3 + 2]
      const bx = nodePositions[b * 3 + 0]
      const by = nodePositions[b * 3 + 1]
      const bz = nodePositions[b * 3 + 2]
      edgePositions[e * 6 + 0] = ax
      edgePositions[e * 6 + 1] = ay
      edgePositions[e * 6 + 2] = az
      edgePositions[e * 6 + 3] = bx
      edgePositions[e * 6 + 4] = by
      edgePositions[e * 6 + 5] = bz
      // initial color low
      const c = 0.3
      edgeColors[e * 6 + 0] = c
      edgeColors[e * 6 + 1] = c
      edgeColors[e * 6 + 2] = 0.6
      edgeColors[e * 6 + 3] = c
      edgeColors[e * 6 + 4] = c
      edgeColors[e * 6 + 5] = 0.6
    }
    const edgeGeometry = new THREE.BufferGeometry()
    edgeGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    const edgeColorAttr = new THREE.BufferAttribute(edgeColors, 3)
    edgeColorAttr.usage = THREE.DynamicDrawUsage
    edgeGeometry.setAttribute('color', edgeColorAttr)
    const edgeMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })
    const edgeSegments = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    scene.add(edgeSegments)

    // Interaction & pulses
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) // z=0 plane
    const mouseNDC = new THREE.Vector2()
    let hoverPoint: THREE.Vector3 | null = null
    const activePulses: { origin: number; start: number }[] = []
    let lastPulseTime = 0

    function handleMouseMove(e: MouseEvent) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        hoverPoint = null
        return
      }
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseNDC.set(x, y)
      raycaster.setFromCamera(mouseNDC, camera)
      const hit = new THREE.Vector3()
      raycaster.ray.intersectPlane(plane, hit)
      hoverPoint = hit

      const now = performance.now() / 1000
      if (now - lastPulseTime > 0.18) {
        // find nearest node and emit a pulse
        let nearest = 0
        let bestD2 = Infinity
        for (let i = 0; i < count; i++) {
          const dx = hit.x - nodePositions[i * 3 + 0]
          const dy = hit.y - nodePositions[i * 3 + 1]
          const dz = hit.z - nodePositions[i * 3 + 2]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < bestD2) {
            bestD2 = d2
            nearest = i
          }
        }
        activePulses.push({ origin: nearest, start: now })
        if (activePulses.length > 8) activePulses.shift()
        lastPulseTime = now
      }
    }

    function handleMouseLeave() {
      hoverPoint = null
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, true)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      nodeUniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    })
    resizeObserver.observe(container)

    // Animation loop
    const start = performance.now()
    let raf = 0
    const baseColor = new THREE.Color('#6f70b0')
    const tempColor = new THREE.Color()

    const tick = () => {
      const t = (performance.now() - start) / 1000
      nodeUniforms.uTime.value = t

      // compute per-node intensity
      for (let i = 0; i < count; i++) {
        const base = 0.28 + 0.12 * Math.sin(nodeSeeds[i] + t * 0.8)
        let intensity = base

        // hover influence
        if (hoverPoint) {
          const dx = hoverPoint.x - nodePositions[i * 3 + 0]
          const dy = hoverPoint.y - nodePositions[i * 3 + 1]
          const dz = hoverPoint.z - nodePositions[i * 3 + 2]
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const hoverInfluence = Math.max(0, 1.0 - d * 0.04)
          intensity += hoverInfluence * 0.6
        }

        // pulse rings
        for (let p = 0; p < activePulses.length; p++) {
          const origin = activePulses[p].origin
          const dt = Math.max(0, t - activePulses[p].start)
          const speed = 10.0
          const wavelength = 6.0
          const ox = nodePositions[origin * 3 + 0]
          const oy = nodePositions[origin * 3 + 1]
          const oz = nodePositions[origin * 3 + 2]
          const dx = nodePositions[i * 3 + 0] - ox
          const dy = nodePositions[i * 3 + 1] - oy
          const dz = nodePositions[i * 3 + 2] - oz
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const phase = d * (Math.PI * 2 / wavelength) - dt * (speed * (Math.PI * 2 / wavelength))
          const ring = Math.max(0.0, Math.cos(phase)) * Math.exp(-dt * 0.7) * Math.exp(-d * 0.035)
          intensity += ring * 0.6
        }

        nodeIntensities[i] = intensity
      }
      intensityAttr.needsUpdate = true

      // update edge colors as gradient of endpoint intensities
      for (let e = 0; e < edges.length; e++) {
        const { a, b } = edges[e]
        const ia = Math.min(1.6, nodeIntensities[a])
        const ib = Math.min(1.6, nodeIntensities[b])
        tempColor.copy(baseColor).multiplyScalar(0.5 + ia * 0.5)
        edgeColors[e * 6 + 0] = tempColor.r
        edgeColors[e * 6 + 1] = tempColor.g
        edgeColors[e * 6 + 2] = tempColor.b
        tempColor.copy(baseColor).multiplyScalar(0.5 + ib * 0.5)
        edgeColors[e * 6 + 3] = tempColor.r
        edgeColors[e * 6 + 4] = tempColor.g
        edgeColors[e * 6 + 5] = tempColor.b
      }
      edgeColorAttr.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
      scene.remove(nodePoints)
      scene.remove(edgeSegments)
      nodeGeometry.dispose()
      edgeGeometry.dispose()
      nodeMaterial.dispose()
      edgeMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [nodeCount, connectionsPerNode])

  return <div ref={containerRef} className={className} style={{ pointerEvents: 'none', width: '100%', height: '100%' }} />
}


