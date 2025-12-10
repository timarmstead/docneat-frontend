import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DocNeat.com — Easy. Fast. Accurate.',
  description: 'Convert bank statements, invoices, receipts to Excel/CSV instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
