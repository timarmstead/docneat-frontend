import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'   // ← adjust path if your components folder is elsewhere

export const metadata: Metadata = {
  title: 'DocNeat.com — Easy. Fast. Accurate.',
  description: 'Convert bank statements, invoices, receipts to Excel/CSV instantly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <Navbar />
        {/* pt-16 or pt-20 offsets the fixed navbar height */}
        <main className="pt-20 md:pt-24 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
