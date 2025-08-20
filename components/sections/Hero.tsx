"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ParticlesBackground } from '@/components/ui/ParticlesBackground'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section ref={ref} className="bg-[#000000] box-border content-stretch flex flex-col gap-8 items-start justify-start overflow-clip p-[120px] relative shrink-0 w-full">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <ParticlesBackground className="absolute inset-0" />
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
          <Image src="/assets/logo.svg" alt="Antimatter AI" fill className="object-contain" />
        </div>
      </motion.div>

      {/* Foreground Content */}
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
                <div className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-[#c7c8f2] relative shrink-0 w-full">50+</div>
                <div className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] tracking-[-0.32px] text-[#d7d7d7] relative shrink-0 w-full">Projects Delivered</div>
              </div>
              <div className="bg-[#1c1c1c] self-stretch shrink-0 w-px" />
              <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-center">
                <div className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-[#c7c8f2] relative shrink-0 w-full">100%</div>
                <div className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] tracking-[-0.32px] text-[#d7d7d7] relative shrink-0 w-full">Client Satisfaction</div>
              </div>
              <div className="bg-[#1c1c1c] self-stretch shrink-0 w-px" />
              <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-center">
                <div className="font-['Manrope',sans-serif] font-semibold text-[40px] leading-[40px] tracking-[-0.4px] text-[#c7c8f2] relative shrink-0 w-full">24/7</div>
                <div className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] tracking-[-0.32px] text-[#d7d7d7] relative shrink-0 w-full">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


