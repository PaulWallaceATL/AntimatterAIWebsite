export default function DesignServicePage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-5xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[48px] tracking-[-0.4px] text-white">Design</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Stunning visual experiences that captivate and convert. From UI/UX to brand identity.</p>
        <ul className="mt-6 list-disc pl-6 text-[#bdbdbd]">
          <li>UI/UX Design</li>
          <li>Brand Identity</li>
          <li>Graphic Design</li>
          <li>Prototyping</li>
        </ul>
      </section>
    </main>
  )
}

