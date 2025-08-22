import Image from 'next/image'

export function CaseStudies() {
  return (
    <div className="bg-[#000000] relative w-full">
      <div className="flex flex-col justify-center relative w-full">
        <div className="flex flex-col gap-16 items-start justify-center p-8 md:p-20 relative w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-20 items-center justify-center p-0 relative shrink-0 w-full">
            {/* Header */}
            <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
              <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[56px] text-left tracking-[-0.56px] w-full">
                <p className="block leading-[56px]">Case Studies</p>
              </div>
              <div className="flex items-end justify-between p-0 relative shrink-0 w-full">
                <div className="basis-0 font-['Manrope',sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#d7d7d7] text-[18px] text-left tracking-[-0.36px]">
                  <p className="block leading-[24px]">
                    Proven results, measurable impact—explore the
                    <br />
                    transformations we've delivered.
                  </p>
                </div>
                <div className="bg-[#1c1c1c] flex gap-10 h-14 items-center justify-center px-10 py-0 relative rounded-2xl shrink-0 cursor-pointer hover:bg-[#2c2c2c] transition-colors">
                  <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px]">
                    <p className="block leading-[24px] whitespace-pre">More Case Studies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Studies Content */}
            <div className="flex flex-col gap-12 items-center justify-center p-0 relative shrink-0 w-full">
              <div className="flex flex-col lg:flex-row gap-8 items-center justify-start p-0 relative shrink-0 w-full">
                {/* Feature Card */}
                <div className="bg-[#1c1c1c] flex flex-col items-start justify-between p-6 relative rounded-2xl w-full lg:w-[380px] h-[340px]">
                  <div className="h-12 relative shrink-0 w-[60.946px]">
                    <Image
                      alt="Feature"
                      className="block max-w-none size-full"
                      src="/assets/case-studies/feature-logo.svg"
                      fill
                    />
                  </div>
                  <div className="flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="flex gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                      <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[40px] text-left text-nowrap tracking-[-0.4px]">
                        <p className="block leading-[40px] whitespace-pre">Feature</p>
                      </div>
                      <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
                        <div className="flex-none rotate-[270deg] scale-y-[-100%]">
                          <div className="overflow-clip relative size-10">
                            <div className="absolute bottom-[1.385%] flex items-center justify-center left-[1.384%] right-[1.384%] top-[1.383%]">
                              <div className="flex-none h-[30.001px] rotate-[45deg] w-[25.002px]">
                                <div className="relative size-full">
                                  <Image
                                    alt="arrow"
                                    className="block max-w-none size-full"
                                    src="/assets/case-studies/arrow-diagonal-large.svg"
                                    fill
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[18px] text-left tracking-[-0.36px] w-full">
                      <p className="leading-[24px]">
                        <span className="">Feature is the social marketplace </span>
                        <span className="text-[#ffffff]">connecting fans directly</span>
                        <span className=""> with entertainers through </span>
                        <span className="text-[#ffffff]">authentic interactions.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video Showcase */}
                <div className="basis-0 bg-[#000000] grow h-[420px] md:h-[520px] min-h-px min-w-px relative rounded-3xl shrink-0 w-full">
                  <div className="flex flex-row items-end justify-center overflow-hidden relative size-full">
                    <div className="flex gap-2.5 h-full items-end justify-center p-4 md:p-[16px] relative w-full">
                      <div
                        className="absolute bg-center bg-cover bg-no-repeat h-[1510.5px] left-0 top-[-495.25px] w-[848px]"
                        style={{ backgroundImage: `url('/assets/case-studies/feature-video-showcase.png')` }}
                      />
                      <div className="backdrop-blur backdrop-filter basis-0 bg-[rgba(0,0,0,0.4)] grow h-14 min-h-px min-w-px relative rounded-2xl shrink-0">
                        <div className="flex flex-row items-center relative size-full">
                          <div className="flex gap-4 h-14 items-center justify-start p-[16px] relative w-full">
                            <div className="overflow-clip relative shrink-0 size-6">
                              <div className="absolute bottom-[9.373%] left-1/4 right-[6.25%] top-[9.373%]">
                                <Image
                                  alt="play"
                                  className="block max-w-none size-full"
                                  src="/assets/case-studies/play-icon.svg"
                                  fill
                                />
                              </div>
                            </div>
                            <div className="basis-0 bg-[rgba(255,255,255,0.3)] grow h-2 min-h-px min-w-px overflow-clip relative rounded-[20px] shrink-0">
                              <div className="absolute bg-[#ffffff] h-2 left-0 rounded-[20px] top-0 w-[281px]" />
                            </div>
                            <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap tracking-[-0.32px]">
                              <p className="block leading-[24px] whitespace-pre">00:55/01:04</p>
                            </div>
                            <div className="overflow-clip relative shrink-0 size-6">
                              <div className="absolute bottom-[9.377%] left-[9.375%] right-[6.25%] top-[9.38%]">
                                <Image
                                  alt="mute"
                                  className="block max-w-none size-full"
                                  src="/assets/case-studies/mute-icon.svg"
                                  fill
                                />
                              </div>
                            </div>
                            <div className="overflow-clip relative shrink-0 size-6">
                              <div className="absolute inset-[15.625%]">
                                <Image
                                  alt="fullscreen"
                                  className="block max-w-none size-full"
                                  src="/assets/case-studies/fullscreen-icon.svg"
                                  fill
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex gap-8 items-center justify-center p-0 relative shrink-0">
                {/* Left Arrow */}
                <div className="bg-[#1c1c1c] flex gap-2.5 items-center justify-start p-[8px] relative rounded-md shrink-0 cursor-pointer hover:bg-[#2c2c2c] transition-colors">
                  <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
                    <div className="flex-none rotate-[270deg]">
                      <div className="overflow-clip relative size-8">
                        <div className="absolute bottom-[12.5%] left-[18.748%] right-[18.748%] top-[12.498%]">
                          <Image
                            alt="previous"
                            className="block max-w-none size-full"
                            src="/assets/case-studies/arrow-navigation.svg"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex gap-2 items-start justify-start p-0 relative shrink-0">
                  <div className="bg-[#ffffff] h-2 rounded-[200px] shrink-0 w-10" />
                  <div className="bg-[#828282] rounded-[200px] shrink-0 size-2" />
                  <div className="bg-[#828282] rounded-[200px] shrink-0 size-2" />
                  <div className="bg-[#828282] rounded-[200px] shrink-0 size-2" />
                </div>

                {/* Right Arrow */}
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <div className="bg-[#1c1c1c] flex gap-2.5 items-center justify-start p-[8px] relative rounded-md cursor-pointer hover:bg-[#2c2c2c] transition-colors">
                      <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
                        <div className="flex-none rotate-[270deg]">
                          <div className="overflow-clip relative size-8">
                            <div className="absolute bottom-[12.5%] left-[18.748%] right-[18.748%] top-[12.498%]">
                              <Image
                                alt="next"
                                className="block max-w-none size-full"
                                src="/assets/case-studies/arrow-navigation.svg"
                                fill
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 