'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LiquidHoverCard } from '@/components/ui/LiquidHoverCard'

export function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const services = [
    {
      id: 'design',
      title: 'Design',
      description: 'Stunning visual experiences that captivate and convert, from UI/UX to brand identity,',
      icon: '/assets/services/design-icon.svg',
      services: ['UI/UX Design', 'Brand Identity', 'Graphic Design', 'Prototyping'],
      technologies: ['Figma', 'Adobe Illustrator', 'Blendr', 'Spline', 'Webflow', 'Three.js'],
      caseStudy: {
        title: 'Feature',
        description: 'Feature is the social marketplace connecting fans directly with entertainers through authentic interactions.',
        image: '/assets/services/feature-case-study.png'
      }
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Cutting-edge web and mobile applications built with the latest technologies.',
      icon: '/assets/services/development-icon.svg',
      services: ['Web Dev', 'Mobile Apps', 'E-commerce', 'Custom Software'],
      technologies: ['React', 'Next.js', 'Node.js', 'Django', 'Flutter', 'Swift', 'AWS', 'Vercel'],
      caseStudy: {
        title: 'Orthoscribe',
        description: 'A next-generational clinical documentation assistant, powered by advanced voice intelligence, designed specifically for orthopedic practices.',
        image: '/assets/services/orthoscribe-case-study.png'
      }
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Data-driven digital marketing strategies that drive growth and engagement.',
      icon: '/assets/services/marketing-icon.svg',
      services: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics'],
      technologies: ['HubSpot', 'Salesforce Marketing Cloud', 'Mailchimp', 'Google Ads', 'Gong'],
      caseStudy: {
        title: 'Feature',
        description: 'Feature is the social marketplace connecting fans directly with entertainers through authentic interactions.',
        image: '/assets/services/feature-case-study.png'
      }
    },
    {
      id: 'healthcare',
      title: 'Healthcare Apps/Compliance',
      description: 'Insert description about healthcare apps and compliance',
      icon: '/assets/services/healthcare-icon.svg',
      services: ['Service Here', 'Service Here', 'Service Here', 'Custom Service Here'],
      technologies: ['Epic FHIR', 'Redox (interoperability)', 'AWS Health Lake', 'Microsoft Azure Health Data Services', 'Aptible (HIPAA PaaS)', 'Vanta (SOC 2 Automation)', 'TrueVault (HIPAA data vault)'],
      caseStudy: {
        title: 'Orthoscribe',
        description: 'A next-generational clinical documentation assistant, powered by advanced voice intelligence, designed specifically for orthopedic practices.',
        image: '/assets/services/orthoscribe-case-study.png'
      }
    },
    {
      id: 'ai',
      title: 'AI Development',
      description: 'Intelligent automation and machine learning solutions for modern businesses.',
      icon: '/assets/services/ai-icon.svg',
      services: ['Machine Learning', 'Automation', 'Chatbots', 'Data Analysis'],
      technologies: ['OpenAI', 'Google Vertex AI', 'Anthropic Claude', 'TensorFlow', 'PyTorch', 'LangChain', 'Pinecone'],
      caseStudy: {
        title: 'Feature',
        description: 'Feature is the social marketplace connecting fans directly with entertainers through authentic interactions.',
        image: '/assets/services/feature-case-study.png'
      }
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and data.',
      icon: '/assets/services/cybersecurity-icon.svg',
      services: ['Security Audits', 'Penetration Testing', 'Compliance', 'Monitoring'],
      technologies: ['OWASP', 'CrowdStrike Falcon', 'Splunk', 'Tenable Nessus', 'Cloudflare', 'Qualys'],
      caseStudy: {
        title: 'Orthoscribe',
        description: 'A next-generational clinical documentation assistant, powered by advanced voice intelligence, designed specifically for orthopedic practices.',
        image: '/assets/services/orthoscribe-case-study.png'
      }
    }
  ]

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="bg-[#000000] relative size-full">
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-16 items-start justify-center p-8 md:p-[80px] relative size-full">
          <div className="box-border content-stretch flex flex-col gap-20 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-6 items-start justify-center leading-[0] p-0 relative shrink-0 text-left w-full">
              <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[#ffffff] text-[56px] tracking-[-0.56px] w-full">
                <p className="block leading-[56px]">Our Services</p>
              </div>
              <div className="font-['Manrope',sans-serif] font-normal relative shrink-0 text-[#d7d7d7] text-[18px] tracking-[-0.36px] w-full">
                <p className="block leading-[24px]">
                  We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
                </p>
              </div>
            </div>
          </div>
          
          <div className="box-border content-stretch flex flex-col gap-12 items-start justify-start p-0 relative shrink-0 w-full">
            {services.map((service, index) => {
              const isExpanded = expandedService === service.id
              return (
                <div key={service.id}>
                  <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row gap-4 md:gap-8 items-center justify-center p-0 relative shrink-0 w-full">
                      <div className="basis-0 box-border content-stretch flex flex-row gap-4 md:gap-8 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[12px] md:p-[16px] relative rounded-xl shrink-0">
                          <div className="absolute border-[#a2a3e9] border-[1.5px] border-solid inset-0 pointer-events-none rounded-xl" />
                          <div className="overflow-clip relative shrink-0 size-8">
                            <Image
                              alt={service.title}
                              src={service.icon}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="basis-0 box-border content-stretch flex flex-col gap-2 md:gap-3 grow items-start justify-center leading-[0] min-h-px min-w-px p-0 relative shrink-0 text-left tracking-[-0.32px]">
                          <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[#ffffff] text-[24px] md:text-[32px]">
                            <p className="block leading-[32px] md:leading-[40px] whitespace-pre">{service.title}</p>
                          </div>
                          <div className="font-['Manrope',sans-serif] font-normal min-w-full relative shrink-0 text-[#d7d7d7] text-[16px]" style={{ width: "min-content" }}>
                            <p className="block leading-[24px]">{service.description}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleService(service.id)}
                        className="flex items-center justify-center w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none"
                      >
                        <Image
                          alt={isExpanded ? 'collapse' : 'expand'}
                          src={isExpanded ? '/assets/services/minus-icon.svg' : '/assets/services/plus-icon.svg'}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </div>
                    
                    {isExpanded && (
                      <div className="relative shrink-0 w-full">
                        <div className="relative size-full">
                          <div className="box-border content-stretch flex flex-row gap-16 items-start justify-start pl-24 pr-0 py-0 relative w-full">
                            <div className="basis-0 box-border content-stretch flex flex-col gap-8 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                              <div className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full">
                                <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[16px] text-left text-nowrap tracking-[-0.32px]">
                                  <p className="block leading-[24px] whitespace-pre">Case Study</p>
                                </div>
                                <div className="box-border content-stretch flex flex-row gap-6 items-start justify-start p-0 relative shrink-0 w-full">
                                  <div className="relative rounded-xl shrink-0 w-full sm:w-80 h-48 overflow-hidden">
                                    <LiquidHoverCard className="absolute inset-0" />
                                  </div>
                                  <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                                    <div className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
                                      <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[20px] text-left text-nowrap tracking-[-0.2px]">
                                        <p className="block leading-[24px] whitespace-pre">{service.caseStudy.title}</p>
                                      </div>
                                      <div className="overflow-clip relative shrink-0 size-6">
                                        <div className="absolute bottom-[1.385%] flex items-center justify-center left-[1.384%] right-[1.384%] top-[1.383%]">
                                          <div className="flex-none h-[18.001px] rotate-[45deg] w-[15.001px]">
                                            <div className="relative size-full">
                                              <Image
                                                alt="arrow"
                                                src="/assets/services/arrow-diagonal.svg"
                                                fill
                                                className="object-contain"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[0px] text-left tracking-[-0.14px] w-full">
                                      <p className="leading-[20px] text-[14px]">
                                        {service.caseStudy.title === 'Feature' ? (
                                          <>
                                            <span className="">Feature is the social marketplace </span>
                                            <span className="text-[#ffffff]">connecting fans directly</span>
                                            <span className=""> with entertainers through </span>
                                            <span className="text-[#ffffff]">authentic interactions.</span>
                                          </>
                                        ) : (
                                          <>
                                            <span className="">A </span>
                                            <span className="text-[#ffffff]">next-generational clinical documentation assistant</span>
                                            <span className="">, powered by </span>
                                            <span className="text-[#ffffff]">advanced voice intelligence</span>
                                            <span className="">, designed specifically for orthopedic practices.</span>
                                          </>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="box-border content-stretch flex flex-col sm:flex-row gap-2 items-center justify-start p-0 relative shrink-0 pb-8">
                                <div className="bg-[#1c1c1c] box-border content-stretch flex flex-row gap-10 h-14 items-center justify-center px-10 py-0 relative rounded-2xl shrink-0 cursor-pointer hover:bg-[#2c2c2c] transition-colors">
                                  <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px]">
                                    <p className="block leading-[24px] whitespace-pre">See More Case Studies</p>
                                  </div>
                                </div>
                                <div className="bg-[#696aac] box-border content-stretch flex flex-row gap-10 h-14 items-center justify-center px-10 py-0 relative rounded-2xl shrink-0 cursor-pointer hover:bg-[#7a7bb8] transition-colors">
                                  <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px]">
                                    <p className="block leading-[24px] whitespace-pre">Learn More</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="basis-0 box-border content-stretch flex flex-col gap-8 md:gap-12 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full">
                                <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[16px] text-left text-nowrap tracking-[-0.32px]">
                                  <p className="block leading-[24px] whitespace-pre">Services</p>
                                </div>
                                <div className="[flex-flow:wrap] box-border content-center flex gap-4 items-center justify-start p-0 relative shrink-0 w-full">
                                  {service.services.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                      <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[18px] text-left text-nowrap tracking-[-0.36px]">
                                        <p className="block leading-[24px] whitespace-pre">{item}</p>
                                      </div>
                                      {idx < service.services.length - 1 && (
                                        <div className="bg-[#545454] h-3 shrink-0 w-px" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full">
                                <div className="font-['Manrope',sans-serif] font-normal leading-[0] relative shrink-0 text-[#828282] text-[16px] text-left text-nowrap tracking-[-0.32px]">
                                  <p className="block leading-[24px] whitespace-pre">Technologies</p>
                                </div>
                                <div className="[flex-flow:wrap] box-border content-center flex gap-4 items-center justify-start p-0 relative shrink-0 w-full">
                                  {service.technologies.map((tech, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                      <div className="font-['Manrope',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[18px] text-left text-nowrap tracking-[-0.36px]">
                                        <p className="block leading-[24px] whitespace-pre">{tech}</p>
                                      </div>
                                      {idx < service.technologies.length - 1 && (
                                        <div className="bg-[#545454] h-3 shrink-0 w-px" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {index < services.length - 1 && (
                    <div className="bg-[#545454] h-px shrink-0 w-full" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 