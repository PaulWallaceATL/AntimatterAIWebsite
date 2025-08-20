"use client"

import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'

const jobs = [
  { slug: 'frontend-engineer', title: 'Frontend Engineer', team: 'Engineering', location: 'Remote' },
]

export default function CareersPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <Reveal>
        <section className="w-full max-w-5xl mx-auto">
          <h1 className="font-['Manrope',sans-serif] font-semibold text-[48px] leading-[56px] tracking-[-0.48px] text-white">Careers</h1>
          <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Build impactful products with a team that values curiosity and craft.</p>
          <div className="mt-8 rounded-2xl border border-[#1c1c1c] p-8">
            <div className="text-white font-semibold mb-4">Open Roles</div>
            <div className="space-y-3">
              {jobs.map((j) => (
                <Link key={j.slug} href={`/careers/${j.slug}`} className="block rounded-lg border border-[#1c1c1c] p-4 hover:bg-[#111] transition-colors">
                  <div className="text-white">{j.title}</div>
                  <div className="text-[#bdbdbd] text-[14px]">{j.team} • {j.location}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  )
}


