import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import Navbar to prevent Hydration errors
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export const metadata: Metadata = {
  title: 'DocNeat.com — Secure. Fast. Accurate.',
  description: 'Convert bank statements, invoices, receipts to Excel/CSV instantly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 flex flex-col min-h-screen">
        <Navbar />
        
        {/* The flex-grow class ensures the main content pushes the footer to the bottom */}
        <main className="pt-20 md:pt-24 flex-grow">
          {children}
        </main>

        <footer className="w-full py-10 px-6 md:px-12 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            
            {/* Left Side: Company Info */}
            <div className="flex flex-col text-left text-sm text-gray-500">
              <span className="font-bold text-gray-900">Engaging Enterprises Ltd</span>
              <span>Monomark House, 27 Old Gloucester Street</span>
              <span>London, England, WC1N 3AX</span>
              <span className="mt-2 text-xs">Company No: 14111995</span>
            </div>

            {/* Right Side: Small Menu */}
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <span>|</span>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            </div>

          </div>
        </footer>
      </body>
    </html>
  )
}
