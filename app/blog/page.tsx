import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'DocNeat Blog — Insights on Financial Automation & Data Security',
  description: 'Expert advice on converting bank statements, automating bookkeeping, and keeping your financial data secure in a digital world.',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-32 md:pt-44 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            The <span className="text-emerald-400">DocNeat</span> Blog
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Strategies and tools to help you eliminate manual data entry and scale your financial workflow.
          </p>
        </div>

        {/* Featured Post - Linking to your created blog */}
        <div className="relative group mb-20">
          <Link href="/blog/convert-bank-statements-to-excel" className="grid lg:grid-cols-2 gap-10 items-center bg-slate-800/30 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/30 transition-all">
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl">
              <Image 
                src="/images/blog/bank-statement-to-excel.png" 
                alt="Bank Statement to Excel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-4 block">Featured Article</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-emerald-400 transition-colors">
                How to Convert Bank Statements to Excel: <span className="text-emerald-400">No More Manual Data Entry</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 line-clamp-3">
                Stop wasting hours on manual transcription. Learn how modern AI is transforming the way accountants and businesses handle PDF bank statements with 99.9% accuracy.
              </p>
              <div className="flex items-center text-white font-bold">
                Read Full Article <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid for Future Posts (Placeholders) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Example of a 'Coming Soon' or Second Post */}
          <div className="flex flex-col opacity-60">
            <div className="bg-slate-800 h-64 rounded-2xl mb-6 flex items-center justify-center border border-slate-700">
               <span className="text-slate-500 font-medium">Coming Soon</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 italic text-slate-500">The Future of OCR in 2026</h3>
            <p className="text-slate-500 text-sm">How deep learning is making traditional scanning obsolete.</p>
          </div>

          <div className="flex flex-col opacity-60">
            <div className="bg-slate-800 h-64 rounded-2xl mb-6 flex items-center justify-center border border-slate-700">
               <span className="text-slate-500 font-medium">Coming Soon</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 italic text-slate-500">Security vs. Convenience</h3>
            <p className="text-slate-500 text-sm">Why "Zero-Storage" is the new standard for financial apps.</p>
          </div>

        </div>

        {/* Newsletter / CTA */}
        <div className="mt-32 p-12 rounded-3xl bg-slate-800/40 border border-slate-800 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want more productivity tips?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get our latest insights on financial automation delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-slate-900 border border-slate-700 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors flex-1"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
