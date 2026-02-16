"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Dropzone from '@/components/Dropzone';
import Link from 'next/link';

export default function BankConvertPage() {
  const params = useParams();
  const bankSlug = params.bank as string;
  
  const LOGO_DEV_KEY = 'pk_Ol0me5iRTGmkOcrArHEA5g'; 

  const bankName = bankSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/And/g, '&');

  const domainMap: Record<string, string> = {
    'chase': 'chase.com',
    'bank-of-america': 'bankofamerica.com',
    'wells-fargo': 'wellsfargo.com',
    'citibank': 'citi.com',
    'capital-one': 'capitalone.com',
    'td-bank': 'td.com',
    'pnc-bank': 'pnc.com',
    'us-bank': 'usbank.com',
    'hsbc': 'hsbc.com',
    'barclays': 'barclays.co.uk'
  };

  const logoDomain = domainMap[bankSlug] || `${bankSlug.replace(/-/g, '')}.com`;
  const logoUrl = `https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_KEY}`;
  const snapshotUrl = `/banks/${bankSlug}.png`; 

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      <section className="pt-20 pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center shadow-xl">
              <img 
                src={logoUrl} 
                alt={`${bankName} logo`} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Convert {bankName} Statement to <span className="text-emerald-400">CSV</span>
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Extract transaction data from your <strong className="text-white">{bankName}</strong> PDF statements 
            instantly. Secure, accurate, and ready for QuickBooks or Xero.
          </p>

          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-2xl mb-12">
            <Dropzone />
          </div>

          {/* Snapshot Section */}
          <div className="mt-16">
             <p className="text-sm uppercase tracking-widest text-slate-500 mb-6 font-semibold">Visual Proof</p>
             <div className="relative mx-auto max-w-3xl rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
               <img 
                 src={snapshotUrl} 
                 alt={`${bankName} conversion example`}
                 className="w-full h-auto opacity-80"
                 onError={(e) => (e.currentTarget.parentElement!.parentElement!.style.display = 'none')}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>

          <div className="mt-20">
            <Link href="/convert/pdf-bank-statement-to-csv" className="text-slate-500 hover:text-emerald-400 transition-colors">
              ← Back to all bank converters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}