'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Why Choose', href: '/why-choose' },
  { name: 'Pricing',    href: '/pricing' },
  { name: 'FAQ',        href: '/faq' },
  { name: 'Blog',       href: '/blog/convert-bank-statements-to-excel' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            {/* Replaced the green div with your logo image */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg">
              <Image 
                src="images/DocNeat-Logo.png" 
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
          <div className="md:hidden" />
        </div>
      </div>
    </nav>
  )
}
