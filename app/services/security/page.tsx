export default function SecurityServicePage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-5xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[48px] tracking-[-0.4px] text-white">Cybersecurity</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Comprehensive security solutions to protect your digital assets and data.</p>
        <ul className="mt-6 list-disc pl-6 text-[#bdbdbd]">
          <li>Security Audits</li>
          <li>Penetration Testing</li>
          <li>Compliance</li>
          <li>Monitoring</li>
        </ul>
      </section>
    </main>
  )
}

