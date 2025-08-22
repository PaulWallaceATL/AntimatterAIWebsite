import Image from 'next/image'

interface Testimonial {
  name: string
  role: string
  quote: string
  profile: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Jay W.',
    role: 'Founder, Rakanda Gold Coffee',
    quote:
      'Antimatter AI transformed our brand identity completely. The new design increased our customer engagement by 300% and perfectly captures our premium coffee experience.',
    profile: '/assets/testimonials/profile-jay-w.png',
  },
  {
    name: 'Jon H.',
    role: 'Creative Director, Keyspace Studio',
    quote:
      'Working with Antimatter AI on our UI/UX redesign was incredible. They understood our vision and delivered a design that exceeded all expectations.',
    profile: '/assets/testimonials/profile-jon-h.png',
  },
  {
    name: 'Mike R.',
    role: 'CEO, RT Direct',
    quote:
      'The team created a stunning website design that not only looks amazing but also improved our conversion rate by 150%. Highly recommended!',
    profile: '/assets/testimonials/profile-mike-r.png',
  },
]

export function Testimonials() {
  return (
    <div className="bg-[#000000] relative w-full overflow-hidden">
      <div className="flex flex-col justify-center relative w-full">
        <div className="flex flex-col gap-16 items-start justify-center p-8 md:p-20 relative w-full">
          {/* Background Cards - decorative, hide on small screens */}
          <div className="absolute hidden md:flex gap-6 items-center justify-center left-1/2 -translate-x-1/2 p-0 top-[-80px] w-full max-w-7xl px-4">
            <div className="flex items-center justify-center relative shrink-0">
              <div className="rotate-180 scale-y-[-1]">
                <div className="bg-gradient-to-r from-[#ffffff14] to-[#99999900] h-80 rounded-2xl w-[600px]" />
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.08)] h-80 rounded-2xl shrink-0 w-[600px]" />
            <div className="bg-[rgba(255,255,255,0.08)] h-80 rounded-2xl shrink-0 w-[600px]" />
            <div className="bg-gradient-to-r from-[#ffffff14] to-[#99999900] h-80 rounded-2xl shrink-0 w-[600px]" />
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-20 items-start justify-start p-0 relative shrink-0 w-full max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col gap-6 items-start justify-center leading-[0] p-0 relative shrink-0 text-center w-full">
              <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[#ffffff] text-[40px] md:text-[56px] tracking-[-0.56px] w-full">
                <p className="block leading-[44px] md:leading-[56px]">What Our Clients Say</p>
              </div>
              <div className="font-['Manrope',sans-serif] font-normal relative shrink-0 text-[#d7d7d7] text-[18px] tracking-[-0.36px] w-full">
                <p className="block leading-[24px]">
                  Don't just take our word for it. Here's what our clients have to say about working with Antimatter AI.
                </p>
              </div>
            </div>

            {/* Testimonials and Controls */}
            <div className="flex flex-col gap-12 items-center justify-center p-0 relative shrink-0 w-full">
              {/* Testimonials Row */}
              <div className="flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center p-0 relative shrink-0 w-full">
                  {/* Left gradient card */}
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="rotate-180 scale-y-[-1]">
                      <div className="bg-gradient-to-r from-[#ffffff14] to-[#99999900] h-80 rounded-2xl w-[600px]" />
                    </div>
                  </div>

                  {/* Main testimonial cards */}
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.name}
                      className="bg-[#1c1c1c] flex flex-col min-h-60 items-start justify-between p-6 relative rounded-2xl w-full md:w-[500px]"
                    >
                      <div className="flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
                        {/* Stars */}
                        <div className="flex gap-px items-center justify-start p-0 relative shrink-0">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="relative shrink-0 size-5">
                              <div className="absolute bottom-[5.203%] left-[5.2%] right-[5.205%] top-[5.208%]">
                                <Image
                                  src="/assets/testimonials/star-fill.svg"
                                  alt="star"
                                  fill
                                  className="block max-w-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Quote */}
                        <div className="font-['Manrope',sans-serif] font-semibold leading-[0] min-w-full relative shrink-0 text-[#ffffff] text-[20px] text-left tracking-[-0.2px]">
                          <p className="block leading-[28px]">{testimonial.quote}</p>
                        </div>
                      </div>
                      {/* Author */}
                      <div className="flex gap-4 items-center justify-start p-0 relative shrink-0 w-full">
                        <div className="bg-center bg-cover bg-no-repeat rounded-[48px] shrink-0 size-14 relative overflow-hidden">
                          <Image
                            src={testimonial.profile}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="basis-0 flex flex-col gap-1 grow items-start justify-start leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-[#d7d7d7] text-left">
                          <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[18px] tracking-[-0.36px] w-full">
                            <p className="block leading-[24px]">{testimonial.name}</p>
                          </div>
                          <div className="font-['Manrope',sans-serif] font-normal opacity-60 relative shrink-0 text-[14px] tracking-[-0.14px] w-full">
                            <p className="block leading-[20px]">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Right gradient card */}
                  <div className="hidden md:block bg-gradient-to-r from-[#ffffff14] to-[#99999900] h-80 rounded-2xl shrink-0 w-[500px]" />
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex gap-8 items-center justify-center p-0 relative shrink-0">
                {/* Left Arrow */}
                <div className="bg-[#1c1c1c] flex gap-2.5 items-center justify-start p-[8px] relative rounded-md shrink-0">
                  <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
                    <div className="-rotate-90">
                      <div className="relative size-8">
                        <div className="absolute bottom-[12.5%] left-[18.748%] right-[18.748%] top-[12.498%]">
                          <Image
                            src="/assets/testimonials/arrow-navigation.svg"
                            alt="previous"
                            fill
                            className="block max-w-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex gap-2 items-start justify-start p-0 relative shrink-0">
                  <div className="bg-[#828282] rounded-[200px] shrink-0 size-2" />
                  <div className="bg-[#ffffff] h-2 rounded-[200px] shrink-0 w-10" />
                  <div className="bg-[#828282] rounded-[200px] shrink-0 size-2" />
                </div>

                {/* Right Arrow */}
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="rotate-180 scale-y-[-1]">
                    <div className="bg-[#1c1c1c] flex gap-2.5 items-center justify-start p-[8px] relative rounded-md">
                      <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
                        <div className="-rotate-90">
                          <div className="relative size-8">
                            <div className="absolute bottom-[12.5%] left-[18.748%] right-[18.748%] top-[12.498%]">
                              <Image
                                src="/assets/testimonials/arrow-navigation.svg"
                                alt="next"
                                fill
                                className="block max-w-none"
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