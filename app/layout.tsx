import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import Navbar to prevent Hydration errors
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export const metadata: Metadata = {
  title: 'DocNeat.com — Secure. Fast. Accurate.',
  description: 'Convert bank statements, invoices, receipts to Excel/CSV instantly and securely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      {/* Changed bg-gray-50 to bg-slate-900 to remove the white line */}
      <body className="antialiased bg-slate-900 text-slate-200 flex flex-col min-h-screen">
        <Navbar />
        
        {/* The main content area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Updated Dark Footer */}
        <footer className="w-full py-12 px-6 md:px-12 border-t border-slate-800 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              
              {/* Left Side: Company Info */}
              <div className="flex flex-col text-left text-sm text-slate-400">
                <span className="font-bold text-white text-lg mb-2">DOCNEAT.com</span>
                <span className="font-semibold text-slate-300">Engaging Enterprises Ltd</span>
                <span>Monomark House, 27 Old Gloucester Street</span>
                <span>London, England, WC1N 3AX</span>
                <span className="mt-2 text-xs text-slate-500 font-mono">Company No: 14111995</span>
              </div>

              {/* Middle Section: Quick Navigation */}
              <div className="flex flex-col gap-3">
                <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Navigation</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link>
                  <Link href="/blog/convert-bank-statements-to-excel" className="text-slate-400 hover:text-white transition-colors">Resources & Blog</Link>
                  <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
                </div>
              </div>

              {/* Right Side: Legal Menu */}
              <div className="flex flex-col gap-3">
                <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Legal</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-600">
              <span>© {new Date().getFullYear()} DocNeat.com</span>
              <div className="flex gap-4">
                <span>Secure 256-bit Encryption</span>
                <span className="hidden md:inline">|</span>
                <span>No Data Retention</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
