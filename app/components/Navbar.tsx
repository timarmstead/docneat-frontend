'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Why Choose', href: '/why-choose' },
  { name: 'Pricing',    href: '/pricing' },
  { name: 'FAQ',        href: '/faq' },
  { name: 'Blog',       href: '/blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Helper to determine if a link is "active"
  const isActive = (href: string) => {
    if (href === '/blog') return pathname.startsWith('/blog')
    return pathname === href
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg">
              <Image 
                src="/images/DocNeat-Logo.png" 
                alt="DocNeat Logo" 
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none uppercase">
                DOCNEAT.com
              </span>
              <span className="text-[10px] md:text-xs text-emerald-400 font-medium tracking-[0.15em] mt-1">
                SECURE | FAST | ACCURATE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-emerald-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button - SVG Version (No imports needed) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                /* Close Icon X */
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) :
