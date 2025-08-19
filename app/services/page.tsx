import Link from 'next/link'

const services = [
  { title: 'Design', href: '/services/design', description: 'UI/UX, brand identity, and prototyping.' },
  { title: 'Development', href: '/services/development', description: 'Web, mobile, e-commerce, and custom software.' },
  { title: 'Marketing', href: '/services/marketing', description: 'SEO, social, content, and analytics.' },
  { title: 'AI Solutions', href: '/services/ai', description: 'ML, automation, chatbots, and data analysis.' },
  { title: 'Web3 & Blockchain', href: '/services/web3', description: 'Smart contracts, DApps, NFTs, and DeFi.' },
  { title: 'Cybersecurity', href: '/services/security', description: 'Audits, pentesting, compliance, monitoring.' },
]

export default function ServicesIndexPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-5xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[48px] leading-[56px] tracking-[-0.48px] text-white">Services</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Comprehensive digital solutions that transform your business and drive innovation.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Link key={svc.href} href={svc.href} className="bg-[#1c1c1c] rounded-2xl p-6 hover:bg-[#242424] transition-colors">
              <div className="text-white font-semibold text-[20px]">{svc.title}</div>
              <div className="text-[#bdbdbd] mt-2 text-[14px]">{svc.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

