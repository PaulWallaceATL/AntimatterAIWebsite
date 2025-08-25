import { Services } from '@/components/sections/Services'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { TrustedLeaders } from '@/components/sections/TrustedLeaders'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/ui/Button'
import { ParticlesBackground } from '@/components/ui/ParticlesBackground'
import { Hero } from '@/components/sections/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'

export default function HomePage() {
  return (
    <main className="bg-[#000000] box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full">
      {/* background handled by hero */}
      {/* Hero Section with Parallax */}
      <Hero />

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