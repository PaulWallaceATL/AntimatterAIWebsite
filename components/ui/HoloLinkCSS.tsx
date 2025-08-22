"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type HoloLinkCSSProps = {
  href: string
  label: string
}

export function HoloLinkCSS({ href, label }: HoloLinkCSSProps) {
  const [morph, setMorph] = useState(false)
  const router = useRouter()

  const onClick = () => {
    if (morph) return
    setMorph(true)
    setTimeout(() => router.push(href), 240)
  }

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center text-[12px] tracking-[-0.12px] font-['Manrope',sans-serif] text-white/90 hover:text-white transition-colors px-4 h-9 rounded-full overflow-hidden group ${morph ? 'rounded-[14px] scale-95' : ''}`}
      style={{ WebkitBackdropFilter: 'saturate(140%) blur(6px)', backdropFilter: 'saturate(140%) blur(6px)' }}
      aria-label={label}
      title={label}
    >
      <span className="relative z-10">{label}</span>
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 group-hover:opacity-100 transition-opacity" style={{
        background: 'linear-gradient(90deg, rgba(162,163,233,0.2), rgba(162,163,233,0.06) 35%, rgba(162,163,233,0.25) 50%, rgba(162,163,233,0.06) 65%, rgba(162,163,233,0.2))',
        backgroundSize: '220% 100%'
      }} />
      <span className="absolute -inset-px rounded-[inherit] ring-1 ring-[#696aac]/40 group-hover:ring-[#a2a3e9]/60" />
      <span className="absolute inset-0 rounded-[inherit] mix-blend-screen opacity-50 group-hover:opacity-80" style={{
        background: 'radial-gradient(60% 80% at 50% 20%, rgba(255,255,255,0.25), transparent 60%)'
      }} />
    </button>
  )
}


