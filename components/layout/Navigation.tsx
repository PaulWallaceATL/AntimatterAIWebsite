'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
// Swap to CSS-based holo links to avoid too many WebGL contexts
import { HoloLinkCSS } from '@/components/ui/HoloLinkCSS'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '/about', hasDropdown: false },
    { label: 'Services', href: '/services', hasDropdown: false },
    { label: 'Ventures', href: '/ventures', hasDropdown: false },
    { label: 'Events', href: '/events', hasDropdown: false },
    { label: 'Company', href: '/company/news', hasDropdown: false },
    { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
    { label: 'Careers', href: '/careers', hasDropdown: false },
    { label: 'Contact', href: '/contact', hasDropdown: false },
    { label: 'Blog', href: '/blog', hasDropdown: false },
  ]

  return (
    <div className="sticky top-0 z-40 relative size-full h-20" data-name="Navbar" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-6 md:px-16 py-0 relative size-full">
          {/* Logo */}
          <Link href="/" className="block">
            <Logo />
          </Link>

          {/* CTAs - Right Side */}
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
            <Button variant="secondary" size="md" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button variant="primary" size="md" asChild>
              <Link href="/book-call">Start Your Project</Link>
            </Button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div 
            className="absolute box-border content-stretch flex flex-row gap-4 lg:gap-6 items-center justify-start p-0 top-1/2 translate-x-[-50%] translate-y-[-50%] hidden md:flex"
            style={{ left: "calc(50% + 0.5px)" }}
          >
            {navItems.map((item) => (
              <div key={item.label} className="flex items-center">
                <HoloLinkCSS href={item.href} label={item.label} />
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#000000] border-t border-[#1c1c1c]">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2 font-['Manrope',sans-serif] font-normal text-[14px] text-[#ffffff] hover:text-[#a2a3e9]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="secondary" size="md" asChild className="w-full">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button variant="primary" size="md" asChild className="w-full">
                <Link href="/book-call">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 