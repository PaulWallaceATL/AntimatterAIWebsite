"use client"

import { useParams } from 'next/navigation'
import { Reveal } from '@/components/ui/Reveal'

export default function JobDetailPage() {
  const params = useParams<{ slug: string }>()
  const { slug } = params

  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <Reveal>
        <section className="w-full max-w-4xl mx-auto">
          <h1 className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[48px] tracking-[-0.4px] text-white">{slug}</h1>
          <div className="mt-6 grid gap-6">
            <div className="rounded-xl border border-[#1c1c1c] p-6">
              <div className="text-white font-semibold mb-2">Team / Department</div>
              <div className="text-[#bdbdbd]">TBD</div>
            </div>
            <div className="rounded-xl border border-[#1c1c1c] p-6">
              <div className="text-white font-semibold mb-2">Location</div>
              <div className="text-[#bdbdbd]">Remote</div>
            </div>
            <div className="rounded-xl border border-[#1c1c1c] p-6">
              <div className="text-white font-semibold mb-2">Description & Requirements</div>
              <div className="text-[#bdbdbd]">Coming soon.</div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  )
}


