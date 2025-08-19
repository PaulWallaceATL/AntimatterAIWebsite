export default function ShadowShieldAIPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-4xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[48px] tracking-[-0.4px] text-white">ShadowShield AI</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Enterprise AI security platform preventing data breaches with real-time monitoring.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#c7c8f2]">
          <div>
            <div className="text-[28px] font-semibold">$4.9M</div>
            <div className="text-[#bdbdbd] text-[14px]">Breach Prevention</div>
          </div>
          <div>
            <div className="text-[28px] font-semibold">100+</div>
            <div className="text-[#bdbdbd] text-[14px]">DLP Presets</div>
          </div>
          <div>
            <div className="text-[28px] font-semibold">99.9%</div>
            <div className="text-[#bdbdbd] text-[14px]">Uptime</div>
          </div>
        </div>
      </section>
    </main>
  )
}

