import { Services } from '@/components/sections/Services'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { TrustedLeaders } from '@/components/sections/TrustedLeaders'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="bg-[#000000] box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full">
      {/* Hero Section */}
      <section className="bg-[#000000] box-border content-stretch flex flex-col gap-8 items-start justify-start overflow-clip p-[120px] relative shrink-0 w-full">
        {/* Background Fade Gradient Bars */}
        <div className="absolute box-border content-stretch flex flex-row gap-8 h-[704px] items-start justify-start left-1/2 overflow-clip pb-16 pt-0 px-0 top-0 translate-x-[-50%] w-full">
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-80 min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-96 min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-[448px] min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-[512px] min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-[576px] min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-full min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-full min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-[576px] min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-[512px] min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-[448px] min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-96 min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
          <div className="basis-0 bg-gradient-to-b from-[#ffffff00] grow h-80 min-h-px min-w-px rounded-bl-[20px] rounded-br-[20px] shrink-0 to-[#ffffff14]" />
        </div>

        {/* Background Logo */}
        <div className="absolute h-[704px] top-0 translate-x-[-50%] w-[713.026px] left-1/2 opacity-5">
          <Image
            src="/assets/logo.svg"
            alt="Antimatter AI"
            fill
            className="object-contain"
          />
        </div>

        {/* Hero Content */}
        <div className="relative shrink-0 w-full z-10">
          <div className="flex flex-col items-center justify-center relative size-full">
            <div className="box-border content-stretch flex flex-col gap-24 items-center justify-center px-[120px] py-0 relative w-full">
              <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-col gap-6 items-center justify-center leading-[0] p-0 relative shrink-0 text-center w-full">
                  <h1 className="font-['Manrope',sans-serif] font-semibold text-[64px] leading-[80px] tracking-[-0.64px] text-[#ffffff] relative shrink-0 w-full">
                    Building Digital Solutions<br />
                    that <span className="text-[#a2a3e9]">Matter</span>
          </h1>
                  <p className="font-['Manrope',sans-serif] font-normal text-[18px] leading-[24px] tracking-[-0.36px] text-[#f4f4f4] relative shrink-0 w-full">
                    Transforming ideas into digital reality with AI, Web3, and Cutting-Edge Technology.
                  </p>
                </div>
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                  <Link href="/case-studies">
                    <Button variant="secondary" size="lg" type="button">View Our Work</Button>
                  </Link>
                  <Link href="/book-call">
                    <Button variant="primary" size="lg" type="button">Start Your Project</Button>
                  </Link>
                </div>
              </div>

              {/* Metrics */}
              <div className="box-border content-stretch flex flex-row gap-8 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-center">
                  <div className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-[#c7c8f2] relative shrink-0 w-full">
                    50+
                  </div>
                  <div className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] tracking-[-0.32px] text-[#d7d7d7] relative shrink-0 w-full">
                    Projects Delivered
                  </div>
                </div>
                <div className="bg-[#1c1c1c] self-stretch shrink-0 w-px" />
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-center">
                  <div className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-[#c7c8f2] relative shrink-0 w-full">
                    100%
                  </div>
                  <div className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] tracking-[-0.32px] text-[#d7d7d7] relative shrink-0 w-full">
                    Client Satisfaction
                  </div>
                </div>
                <div className="bg-[#1c1c1c] self-stretch shrink-0 w-px" />
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-center">
                  <div className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-[#c7c8f2] relative shrink-0 w-full">
                    24/7
                  </div>
                  <div className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] tracking-[-0.32px] text-[#d7d7d7] relative shrink-0 w-full">
                    Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders Section */}
      <TrustedLeaders />

      {/* Services Section */}
      <Services />

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Still Have Questions CTA */}
      <section className="bg-[#000000] p-[80px] relative w-full">
        <div className="bg-[#1c1c1c] relative rounded-3xl shrink-0 w-full">
          <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
            <div className="flex flex-col gap-8 items-center justify-center px-8 py-12 relative w-full">
              <div className="flex flex-col font-['Manrope',sans-serif] font-semibold gap-2 items-center justify-center leading-[0] p-0 relative shrink-0 text-center w-full">
                <div className="text-[32px] leading-[40px] tracking-[-0.32px] text-[#ffffff] relative shrink-0 w-full">
                  Still have questions?
                </div>
                <div className="text-[24px] leading-[32px] tracking-[-0.24px] text-[#828282] relative shrink-0 w-full">
                  We're here to help.
                </div>
              </div>
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  )
} 