import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

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
        <main className="pt-20 md:pt-24 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
