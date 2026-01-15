'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react' // Ensure you have lucide-react installed

const navItems = [
  { name: 'Why Choose', href: '/why-choose' },
  { name: 'Pricing',    href: '/pricing' },
  { name: 'FAQ',        href: '/faq' },
  { name: 'Blog',       href: '/blog/convert-bank-statements-to-excel' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
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
                    pathname === item.href
                      ? 'text-emerald-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900 border-b border-slate-700 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                pathname === item.href
                  ? 'text-emerald-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-transform active:scale-95"
            >
              Start Converting
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
