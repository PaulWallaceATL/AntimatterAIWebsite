'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 'services',
    question: 'What services does Antimatter AI offer?',
    answer: 'We design stunning and functional websites, apps, and custom products that create memorable digital customer experiences. Our services include custom website design, advanced development, and comprehensive SEO optimization. Additionally, we leverage data and AI to drive business growth, ensuring your online presence not only looks great but also performs exceptionally.'
  },
  {
    id: 'timeline',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and complexity. A typical website project takes 4-8 weeks, while more complex applications can take 12-16 weeks. We provide detailed project timelines during our initial consultation and keep you updated throughout the development process.'
  },
  {
    id: 'clients',
    question: 'Do you work with startups or only established companies?',
    answer: 'We work with companies of all sizes, from early-stage startups to established enterprises. Our scalable approach allows us to adapt our services to meet the specific needs and budgets of different organizations, whether you\'re launching your first product or scaling an existing business.'
  },
  {
    id: 'differentiation',
    question: 'What makes Antimatter AI different from other agencies?',
    answer: 'Our unique blend of cutting-edge AI technology, data-driven insights, and creative design sets us apart. We don\'t just build websites – we create intelligent digital experiences that adapt and evolve. Our team combines technical expertise with deep industry knowledge to deliver solutions that drive real business results.'
  },
  {
    id: 'support',
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes, we offer comprehensive post-launch support including maintenance, updates, monitoring, and optimization services. Our support packages are flexible and can be customized based on your specific needs, ensuring your digital presence continues to perform at its best long after launch.'
  },
  {
    id: 'communication',
    question: 'How do you handle project communication and updates?',
    answer: 'We believe in transparent, regular communication. You\'ll have access to a dedicated project manager, weekly progress updates, and a client portal where you can track development milestones. We use modern collaboration tools and maintain open channels for feedback throughout the entire project lifecycle.'
  },
  {
    id: 'pricing',
    question: 'What is your pricing structure?',
    answer: 'Our pricing is project-based and tailored to your specific requirements. We provide detailed proposals with clear cost breakdowns after our initial consultation. We offer flexible payment terms and can work within various budget ranges while maintaining our high standards of quality and service.'
  }
]

export function FAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>('services')

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="bg-[#000000] relative w-full">
      <div className="flex flex-col justify-center relative w-full">
        <div className="flex flex-col gap-16 items-start justify-center p-[80px] relative w-full">
          <div className="flex gap-20 items-start justify-start p-0 relative shrink-0 w-full">
            {/* Left Column - Header */}
            <div className="basis-0 flex flex-col gap-6 grow items-start justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-left">
              <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[#ffffff] text-[56px] tracking-[-0.56px] w-full">
                <p className="block leading-[56px]">FAQs</p>
              </div>
              <div className="font-['Manrope',sans-serif] font-normal relative shrink-0 text-[#d7d7d7] text-[18px] tracking-[-0.36px] w-full">
                <p className="block leading-[24px]">
                  Find answers to the most commonly asked questions about working with Antimatter AI.
                </p>
              </div>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="basis-0 flex flex-col gap-8 grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0">
              {faqData.map((faq, index) => (
                <div key={faq.id}>
                  <div
                    className="flex gap-8 items-start justify-start p-0 relative rounded-2xl shrink-0 w-full cursor-pointer"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="basis-0 flex flex-col gap-4 grow items-start justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-[#ffffff] text-left">
                      <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[18px] tracking-[-0.36px] w-full">
                        <p className="block leading-[24px]">{faq.question}</p>
                      </div>
                      {expandedFAQ === faq.id && (
                        <div className="font-['Manrope',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[-0.32px] w-full">
                          <p className="block leading-[24px]">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                    <div className="overflow-clip relative shrink-0 size-6">
                      <div className={expandedFAQ === faq.id ? "absolute bottom-[46.875%] left-[12.5%] right-[12.5%] top-[46.875%]" : "absolute inset-[12.5%]"}>
                        <Image
                          src={expandedFAQ === faq.id ? "/assets/services/minus-icon.svg" : "/assets/services/plus-icon.svg"}
                          alt={expandedFAQ === faq.id ? "collapse" : "expand"}
                          fill
                          className="block max-w-none"
                        />
                      </div>
                    </div>
                  </div>
                  {index < faqData.length - 1 && (
                    <div className="bg-[#545454] h-px shrink-0 w-full mt-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 