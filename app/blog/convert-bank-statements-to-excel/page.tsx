import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'How to Convert Bank Statements to Excel: No More Manual Data Entry — DocNeat.com',
  description: 'Learn how to effortlessly convert PDF bank statements to Excel or CSV, eliminating manual data entry and human error. DocNeat offers fast, secure, and accurate conversions.',
};

export default function BlogPostPage() {
  return (
    /* Unified padding pt-32 / md:pt-44 to match the homepage and pricing exactly */
    <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-44 pb-20 text-slate-300">
      
      {/* New Timeless Heading with Emerald Highlight */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight">
        How to Convert Bank Statements to Excel: 
        <span className="text-emerald-400"> No More Manual Data Entry</span>
      </h1>
      
      <p className="text-slate-500 mb-10 border-b border-slate-800 pb-6 text-sm italic">
        Updated: January 2026
      </p>

      {/* Main Feature Image */}
      <div className="relative w-full h-[300px] md:h-[500px] mb-16">
        <Image 
          src="/images/blog/How-to-Convert-Bank-Statements-to-Excel.png" 
          alt="Professional transformation of bank statement data into a clean Excel spreadsheet"
          fill
          className="rounded-2xl shadow-2xl object-cover border border-slate-800"
          priority 
        />
      </div>
      
      <section className="space-y-8 text-lg leading-relaxed">
        <p>
          If you've ever spent hours manually typing transactions from PDF bank statements into Excel or your accounting software, you know the frustration. The endless numbers, the squinting at tiny fonts, and the nagging fear of making a costly mistake. It's tedious, time-consuming, and frankly, a waste of your valuable time.
        </p>

        <p>
          Manual data entry for financial documents is rapidly becoming a relic of the past. Thanks to advanced OCR (Optical Character Recognition) and AI, converting bank statements to Excel is now faster, more accurate, and more secure than ever before.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The Problem: The "Accounting Bottleneck"</h2>
        <p>
          This "accounting bottleneck" isn't just a nuisance; it's a significant drain on productivity. A single misplaced digit can throw off your entire reconciliation, leading to wasted time tracking down discrepancies and potential compliance issues.
        </p>
        
        <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-8 my-10 rounded-r-lg">
          <p className="italic text-emerald-400 font-medium text-xl">
            "Manual data entry isn't just tedious; it's a productivity black hole that costs businesses thousands each year in lost time and error correction."
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The Solution: Automated Data Extraction</h2>
        <p>
          At <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-500/30 underline-offset-4">DocNeat</Link>, we believe your time is better spent analyzing your finances, not manually transcribing them. Our platform transforms your bank statements, invoices, and receipts into ready-to-use Excel or CSV files in three simple steps:
        </p>

        <ul className="space-y-6 py-4">
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">1</span>
            <p><strong className="text-white">Upload:</strong> Drop your PDF or scan onto the platform.</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">2</span>
            <p><strong className="text-white">Extract:</strong> Our platform identifies dates, descriptions, and amounts in seconds.</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">3</span>
            <p><strong className="text-white">Download:</strong> Get a perfectly formatted file ready for your software.</p>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Security First: Your Data is Safe</h2>
        <p>
          We understand that financial data is sensitive. That's why DocNeat is built with an <strong className="text-emerald-400 font-bold">Immediate Deletion Guarantee</strong>.
        </p>
        <p>
          All uploaded statements are processed in temporary memory and are deleted the moment the extraction is complete. We do not store your financial statement data, nor do we ever share it with third parties. For more details, see our <Link href="/privacy" className="text-emerald-400 hover:underline underline-offset-4">Privacy Policy</Link>.
        </p>

        <div className="text-center mt-20 pt-12 border-t border-slate-800">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all shadow-lg shadow-emerald-500/20 group"
          >
            Start Converting for Free
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <p className="text-slate-500 text-sm mt-4 font-medium italic">
            *No sign-up required
          </p>
        </div>
      </section>
    </div>
  );
}

