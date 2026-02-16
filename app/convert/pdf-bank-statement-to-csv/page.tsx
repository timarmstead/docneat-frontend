"use client";

import React from 'react';
import Dropzone from '@/components/Dropzone'; 
import Link from 'next/link';

export default function PillarPage() {
  const featuredBanks = [
    "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One",
    "TD Bank", "PNC Bank", "US Bank", "HSBC", "Barclays"
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            PDF Bank Statement to <span className="text-emerald-400">CSV</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Turn any bank statement into a <strong className="text-white font-semibold">clean spreadsheet</strong> in seconds. 
            No complex software, no data retention, no errors.
          </p>
          
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
            <Dropzone />
          </div>
        </div>
      </section>

      {/* Trust & Logic Section - Space Reduced Here */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-emerald-400 text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-sm text-slate-400">256-bit encryption ensures your financial data never leaves your control.</p>
          </div>
          <div className="p-6">
            <div className="text-emerald-400 text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Extraction</h3>
            <p className="text-sm text-slate-400">Stop manual data entry. Get a perfectly formatted CSV ready for import.</p>
          </div>
          <div className="p-6">
            <div className="text-emerald-400 text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">100% Accurate</h3>
            <p className="text-sm text-slate-400">Precisely aligns financial tables from even the most complex bank layouts.</p>
          </div>
        </div>
      </section>

      {/* The Hub / Bank Directory */}
      <section className="py-20 px-6 bg-slate-800/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Bank-Specific Converters</h2>
            <p className="text-slate-400">Optimized extraction for the world&apos;s leading financial institutions.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {featuredBanks.map((bank) => (
              <Link 
                key={bank}
                href={`/convert/${bank.toLowerCase().replace(/\s+/g, '-')}-statement-to-csv`}
                className="group p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-emerald-500 transition-all text-center"
              >
                <span className="text-slate-300 group-hover:text-emerald-400 transition-colors">{bank}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/convert" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-semibold gap-2">
              Explore all 50+ supported bank formats <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
