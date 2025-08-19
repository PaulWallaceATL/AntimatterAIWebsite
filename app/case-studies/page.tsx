import Link from 'next/link'

const cases = [
  { title: 'Clinix AI', href: '/case-studies/clinix-ai', summary: 'AI-powered medical documentation with 98% accuracy.' },
  { title: 'ShadowShield AI', href: '/case-studies/shadowshield-ai', summary: 'Enterprise AI security preventing data breaches.' },
  { title: 'Synergies4 AI', href: '/case-studies/synergies4-ai', summary: 'AI-powered Agile training with personalized learning.' },
]

export default function CaseStudiesIndexPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-5xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[48px] leading-[56px] tracking-[-0.48px] text-white">Case Studies</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Discover how we transform industries with cutting-edge AI solutions.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <Link key={c.href} href={c.href} className="bg-[#1c1c1c] rounded-2xl p-6 hover:bg-[#242424] transition-colors">
              <div className="text-white font-semibold text-[20px]">{c.title}</div>
              <div className="text-[#bdbdbd] mt-2 text-[14px]">{c.summary}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

