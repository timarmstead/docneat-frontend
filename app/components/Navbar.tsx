'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useUser()

  const navItems = [
    { name: 'Why Choose', href: '/why-choose' },
    { name: 'Pricing',    href: '/pricing' },
    { name: 'FAQ',        href: '/faq' },
    { name: 'Blog',       href: '/blog' },
  ]

  const isActive = (href: string) => {
    if (href === '/blog') return pathname.startsWith('/blog')
    return pathname === href
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
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
                DOCNEAT<span className="lowercase">.com</span>
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
                    isActive(item.href) ? 'text-emerald-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Section - Cleaned Up */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors border border-slate-700 px-4 py-2 rounded-lg">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors focus:outline-none"
              type="button"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Cleaned Up */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900 border-b border-slate-700 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive(item.href) ? 'text-emerald-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button 
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
            </SignInButton>
          )}

          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
            >
              Start Converting
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}