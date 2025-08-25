"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type LogoCarousel3DProps = {
  className?: string
  logos: { src: string; alt: string }[]
}

export function LogoCarousel3D({ className, logos }: LogoCarousel3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 16)

    const group = new THREE.Group()
    scene.add(group)

    const light = new THREE.PointLight(0xa2a3e9, 1.2, 100)
    light.position.set(0, 6, 16)
    scene.add(light)

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    const radius = 8
    const plane = new THREE.PlaneGeometry(4, 2)
    const meshes: THREE.Mesh[] = []

    logos.forEach((logo, i) => {
      const tex = loader.load(logo.src)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true })
      const m = new THREE.Mesh(plane, mat)
      const angle = (i / logos.length) * Math.PI * 2
      m.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
      m.lookAt(0, 0, 0)
      m.userData.baseAngle = angle
      m.userData.index = i
      group.add(m)
      meshes.push(m)
    })

    let raf = 0
    let targetRotation = 0
    let hoverIndex: number | null = null

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      )
      const ray = new THREE.Raycaster()
      ray.setFromCamera(mouse, camera)
      const hits = ray.intersectObjects(meshes)
      hoverIndex = hits.length ? hits[0].object.userData.index : null
    }
    container.addEventListener('mousemove', onMove, { passive: true })

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const tick = (t: number) => {
      // slow rotation
      targetRotation += 0.0008
      group.rotation.y += (targetRotation - group.rotation.y) * 0.06

      // hover focus
      meshes.forEach((m, i) => {
        const base = m.userData.baseAngle as number
        const ang = base + group.rotation.y
        // adjust position for subtle depth parallax
        const r = i === hoverIndex ? radius * 0.9 : radius
        m.position.set(Math.cos(ang) * r, 0, Math.sin(ang) * r)
        m.lookAt(0, 0, 0)
        const scale = i === hoverIndex ? 1.2 : 1.0
        m.scale.setScalar(m.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15).x)
        ;(m.material as THREE.Material).opacity = i === hoverIndex ? 1.0 : 0.75
      })

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener('mousemove', onMove)
      meshes.forEach(m => (m.material as THREE.Material).dispose())
      plane.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [logos])

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '160px' }} />
}


