'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#000000] relative w-full">
      <div className="flex flex-col items-center justify-center relative w-full">
        <div className="flex flex-col gap-16 items-center justify-center px-6 md:px-[120px] py-16 relative w-full max-w-7xl mx-auto">
          {/* Newsletter and Back to Top */}
          <div className="flex items-start justify-between p-0 relative shrink-0 w-full">
            <div className="flex flex-col gap-8 items-start justify-center p-0 relative shrink-0">
              <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap tracking-[-0.24px]">
                <p className="block leading-[32px] whitespace-pre">
                  Stay in the loop with digital trends,
                  <br />
                  development tips, and industry news.
                </p>
              </div>
              <div className="relative rounded-lg shrink-0 w-full md:w-[480px]">
                <div className="flex items-center justify-between overflow-hidden pl-4 pr-3 py-3 relative w-full border border-[#828282] rounded-lg">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="bg-transparent font-['Manrope',sans-serif] font-normal text-[18px] leading-[24px] tracking-[-0.36px] text-[#828282] placeholder-[#828282] flex-1 outline-none"
                  />
                  <Button variant="primary" size="md">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="flex gap-0.5 items-center justify-start p-0 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px]">
                <p className="block leading-[24px] whitespace-pre">Back to top</p>
              </div>
              <div className="overflow-clip relative shrink-0 size-6">
                <div className="absolute bottom-[12.5%] left-[18.748%] right-[18.748%] top-[12.498%]">
                  <Image
                    src="/assets/arrow-up.svg"
                    alt="arrow up"
                    fill
                    className="block max-w-none"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="bg-[#545454] h-px shrink-0 w-full" />

          {/* Main Footer Content */}
          <div className="flex gap-12 items-start justify-start p-0 relative shrink-0 w-full">
            {/* Logo and Contact Info */}
            <div className="flex flex-col gap-16 items-start justify-start p-0 relative shrink-0 w-[480px]">
              <div className="flex gap-8 items-center justify-start p-0 relative shrink-0 w-full">
                <div className="h-24 flex items-center justify-start relative shrink-0 w-[97.231px]">
                  <div className="scale-[2]">
                    <Logo />
                  </div>
                </div>
                <div className="basis-0 font-['Manrope',sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#828282] text-[18px] text-left tracking-[-0.36px]">
                  <p className="leading-[24px]">
                    <span className="">Creating </span>
                    <span className="text-[#ffffff]">high-impact</span>
                    <span className=""> websites, apps, and experiences that </span>
                    <span className="text-[#ffffff]">drive engagement</span>
                    <span className=""> and </span>
                    <span className="text-[#ffffff]">deliver results</span>
                    <span className="">.</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="font-['Manrope',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#ffffff] text-[14px] text-left tracking-[-0.14px]">
                  <p className="block leading-[20px]">hello@antimatterai.com</p>
                </div>
                <div className="font-['Manrope',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#ffffff] text-[14px] text-left tracking-[-0.14px]">
                  <p className="block leading-[20px]">+1 (555) 123-4567</p>
                </div>
                <div className="font-['Manrope',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#ffffff] text-[14px] text-left tracking-[-0.14px]">
                  <p className="block leading-[20px]">Atlanta, GA</p>
                </div>
                <button className="flex gap-0.5 items-center justify-start p-0 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[-0.14px]">
                    <p className="block leading-[20px] whitespace-pre">Book a Call</p>
                  </div>
                  <div className="overflow-clip relative shrink-0 size-5">
                    <div className="absolute bottom-[1.385%] flex items-center justify-center left-[1.384%] right-[1.384%] top-[1.383%]">
                      <div className="flex-none h-[15.001px] rotate-[45deg] w-[12.501px]">
                        <div className="relative size-full">
                          <Image
                            src="/assets/arrow-diagonal-small.svg"
                            alt="arrow"
                            fill
                            className="block max-w-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Links Section */}
            <div className="basis-0 flex gap-16 grow items-start justify-end min-h-px min-w-px p-0 relative shrink-0">
              {/* Services */}
              <div className="flex flex-col gap-3 items-start justify-center p-0 relative shrink-0 w-[124px]">
                <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[14px] text-center text-nowrap tracking-[-0.14px]">
                  <p className="block leading-[20px] whitespace-pre">Services</p>
                </div>
                <div className="flex flex-col font-['Manrope',sans-serif] font-normal gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-[14px] text-left tracking-[-0.14px] w-full">
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Web Development</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">AI Solutions</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Design Agency</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Digital marketing</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Web3 Development</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Security Solutions</p>
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-3 items-start justify-center p-0 relative shrink-0 w-[124px]">
                <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[14px] text-center text-nowrap tracking-[-0.14px]">
                  <p className="block leading-[20px] whitespace-pre">Company</p>
                </div>
                <div className="flex flex-col font-['Manrope',sans-serif] font-normal gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-[14px] text-left tracking-[-0.14px] w-full">
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">About</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Mission & Vision</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Case Studies</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Our Team</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Blog</p>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="flex flex-col gap-3 items-start justify-center p-0 relative shrink-0 w-[124px]">
                <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[14px] text-center text-nowrap tracking-[-0.14px]">
                  <p className="block leading-[20px] whitespace-pre">Resources</p>
                </div>
                <div className="flex flex-col font-['Manrope',sans-serif] font-normal gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-[14px] text-left tracking-[-0.14px] w-full">
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Clinix AI</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">ShadowShield AI</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Synergies4 AI</p>
                  </div>
                  <div className="relative shrink-0 w-full cursor-pointer hover:opacity-80 transition-opacity">
                    <p className="block leading-[20px]">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-end justify-between p-0 relative shrink-0 w-full">
            <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] text-left text-nowrap tracking-[-0.12px]">
              <p className="block leading-[16px] whitespace-pre">© 2024, Antimatter AI. All rights reserved.</p>
            </div>
            <div className="flex font-['Manrope',sans-serif] font-normal gap-8 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap tracking-[-0.12px]">
              <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <p className="block leading-[16px] text-nowrap whitespace-pre">Privacy</p>
              </div>
              <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <p className="block leading-[16px] text-nowrap whitespace-pre">Terms</p>
              </div>
              <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <p className="block leading-[16px] text-nowrap whitespace-pre">Cookies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 