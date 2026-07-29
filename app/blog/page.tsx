import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'DocNeat Blog — Insights on Financial Automation & Data Security',
  description: 'Expert advice on converting bank statements, automating bookkeeping, and keeping your financial data secure in a digital world.',
};

const posts = [
  {
    title: "How to Safely Import PDF Bank Statements into QuickBooks, Xero, or Excel",
    excerpt: "Integration is a massive pain point. Learn how to get clean data into your accounting software without formatting errors or security leaks.",
    href: "/blog/how-to-safely-import-bank-statements",
    image: "/images/accounting-software-import.png",
    category: "Integrations"
  },
  {
    title: "How to Convert a Bank Statement PDF to Excel: Three Methods Compared",
    excerpt: "Copy-paste, native bank export, or a dedicated converter — we break down which method works best depending on how many statements you have and what you need to do with the data.",
    href: "/blog/bank-statement-pdf-to-excel",
    image: "/images/blog/How-to-Convert-Bank-Statements-to-Excel.png",
    category: "How-to Guide"
  },
  {
    title: "Security vs. Convenience: Why Zero-Storage is the New Standard for Bank Statement Converters",
    excerpt: "Most free PDF to CSV converters store your bank statements on their servers indefinitely. Here is what that means for your financial data and what to look for instead.",
    href: "/blog/security-vs-convenience",
    image: "/images/blog/bank-statement-to-excel.png",
    category: "Security"
  }
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-32 md:pt-44 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            The <span className="text-emerald-400">DocNeat</span> Blog
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Strategies and tools to help you eliminate manual data entry and scale your financial workflow.
          </p>
        </div>

        {/* Featured Post (Article 1) */}
        <div className="relative group mb-24">
          <Link href="/blog/convert-bank-statements-to-excel" className="grid lg:grid-cols-2 gap-10 items-center bg-slate-800/30 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/30 transition-all">
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl">
              <Image 
                src="/images/blog/bank-statement-to-excel.png" 
                alt="Bank Statement to Excel Conversion"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-4 block">Essential Reading</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-emerald-400 transition-colors">
                How to Convert Bank Statements to Excel: <span className="text-emerald-400">No More Manual Data Entry</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 line-clamp-3">
                Stop wasting hours on manual transcription. Learn how modern AI is transforming the way accountants handle PDF bank statements with 99.9% accuracy.
              </p>
              <div className="flex items-center text-white font-bold">
                Read Full Article <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {posts.map((post, index) => (
            <Link key={index} href={post.href} className="flex flex-col group">
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-2xl border border-slate-800 group-hover:border-emerald-500/30 transition-all">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-3">{post.category}</span>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="text-emerald-400 text-sm font-bold flex items-center">
                Read More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}

        </div>

        {/* Subscription CTA */}
        <div className="mt-32 p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay ahead of the curve</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Weekly tips on bookkeeping automation and data security delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors flex-1"
                required
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                Subscribe
              </button>
            </form>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>

      </div>
    </div>
  );
}