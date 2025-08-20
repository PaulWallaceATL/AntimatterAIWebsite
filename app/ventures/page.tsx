"use client"

import { Reveal } from '@/components/ui/Reveal'

export default function VenturesPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <Reveal>
        <section className="w-full max-w-5xl mx-auto">
          <h1 className="font-['Manrope',sans-serif] font-semibold text-[48px] leading-[56px] tracking-[-0.48px] text-white">Ventures</h1>
          <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Incubating and investing in products that align with our mission.</p>
          <div className="mt-8 rounded-2xl border border-[#1c1c1c] p-8 text-[#bdbdbd]">Coming soon.</div>
        </section>
      </Reveal>
    </main>
  )
}


