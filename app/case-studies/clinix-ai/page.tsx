export default function ClinixAIPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-4xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[48px] tracking-[-0.4px] text-white">Clinix AI</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">AI-powered medical documentation saving physicians 2.5+ hours daily with 98% accuracy.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#c7c8f2]">
          <div>
            <div className="text-[28px] font-semibold">2.5hrs/day</div>
            <div className="text-[#bdbdbd] text-[14px]">Time Saved</div>
          </div>
          <div>
            <div className="text-[28px] font-semibold">98%</div>
            <div className="text-[#bdbdbd] text-[14px]">Accuracy</div>
          </div>
          <div>
            <div className="text-[28px] font-semibold">5.0★</div>
            <div className="text-[#bdbdbd] text-[14px]">Rating</div>
          </div>
        </div>
      </section>
    </main>
  )
}

