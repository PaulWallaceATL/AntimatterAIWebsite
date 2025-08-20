"use client"

import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'

const events = [
  { slug: 'ai-summit-2025', title: 'AI Summit 2025', date: 'May 8, 2025', location: 'Atlanta, GA' },
]

export default function EventsPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <Reveal>
        <section className="w-full max-w-5xl mx-auto">
          <h1 className="font-['Manrope',sans-serif] font-semibold text-[48px] leading-[56px] tracking-[-0.48px] text-white">Events</h1>
          <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Join us at upcoming talks, workshops, and community gatherings.</p>
          <div className="mt-8 grid grid-cols-1 gap-4">
            {events.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="rounded-xl border border-[#1c1c1c] p-6 hover:bg-[#111] transition-colors">
                <div className="text-white text-[20px] font-semibold">{e.title}</div>
                <div className="text-[#bdbdbd] mt-1 text-[14px]">{e.date} • {e.location}</div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  )
}


