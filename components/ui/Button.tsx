"use client"
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#696aac] text-white hover:bg-[#7a7bb8] focus-visible:ring-[#7a7bb8] ring-offset-[#0A0A0A]',
        secondary: 'bg-[#1c1c1c] text-white hover:bg-[#2c2c2c] focus-visible:ring-[#2c2c2c] ring-offset-[#0A0A0A]',
        outline: 'border border-[#696aac] text-[#a2a3e9] hover:bg-[#1a1a1a] focus-visible:ring-[#696aac] ring-offset-[#0A0A0A]',
        ghost: 'bg-transparent text-white hover:bg-[#141414] focus-visible:ring-[#2c2c2c] ring-offset-[#0A0A0A]',
        link: 'text-[#a2a3e9] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 py-2',
        md: 'h-10 px-6',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  const [morph, setMorph] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let particles: { x: number; y: number; vx: number; vy: number; life: number }[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new (window as any).ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const color = variant === 'primary' ? 'rgba(162,163,233,1)' : 'rgba(105,106,172,1)'

    const spawn = () => {
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 1 + Math.random() * 2
        particles.push({ x: canvas.clientWidth / 2, y: canvas.clientHeight / 2, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      // update
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.life -= 0.02
        if (p.life <= 0) particles.splice(i, 1)
      }
      // draw
      ctx.fillStyle = color
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [variant])

  const onEnter = () => { setMorph(true) }
  const onLeave = () => { setMorph(false) }
  const burst = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const centerX = canvas.clientWidth / 2
    const centerY = canvas.clientHeight / 2
    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = []
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2
      const s = 2 + Math.random() * 2.5
      particles.push({ x: centerX, y: centerY, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 })
    }
    // merge with existing list by briefly drawing now
    const ctx = canvas.getContext('2d')!
    ctx.save()
    ctx.globalAlpha = 0.9
    ctx.fillStyle = variant === 'primary' ? 'rgba(162,163,233,1)' : 'rgba(105,106,172,1)'
    for (const p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill() }
    ctx.restore()
  }

  // If asChild is true, we cannot add extra DOM (Slot requires a single child)
  if (asChild) {
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), 'btn-glow btn-3d')}
        data-morph={morph}
        ref={ref as any}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        {...props}
      >
        <span className="btn-shimmer">{props.children}</span>
      </Comp>
    )
  }

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }), 'btn-glow btn-3d')}
      data-morph={morph}
      ref={ref}
      onMouseEnter={() => { onEnter(); burst() }}
      onMouseLeave={onLeave}
      onClick={burst}
      {...props}
    >
      <span className="btn-shimmer">{props.children}</span>
      <canvas ref={canvasRef} className="btn-3d-canvas" />
    </Comp>
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }