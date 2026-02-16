"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Dropzone from '@/components/Dropzone';
import Link from 'next/link';

export default function BankConvertPage() {
  const params = useParams();
  const bankSlug = params.bank as string;
  
  // LOGO.DEV PUBLIC KEY
  const LOGO_DEV_KEY = 'pk_Ol0me5iRTGmkOcrArHEA5g'; 

  // Format the name for display (e.g., chase -> Chase)
  const bankName = bankSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/And/g, '&');

  // Domain Mapping: Maps your slugs to the actual website of the bank
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
    'barclays': 'barclays.co.uk',
    'monzo': 'monzo.com',
    'revolut': 'revolut.com'
  };

  const logoDomain = domainMap[bankSlug] || `${bankSlug.replace(/-/g, '')}.com`;
  const logoUrl = `https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_KEY}`;
  const snapshotUrl = `/banks/${bankSlug}.png`; 

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 1. The Dynamic Logo Container */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl ring-4 ring-slate-800/50 transition-transform hover:scale-105">
              <img 
                src={logoUrl} 
                alt={`${bankName} logo`} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                    // If Logo.dev fails, hide the logo container entirely
                    e.currentTarget.parentElement!.style.display = 'none';
                }} 
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Convert {bankName} Statement to <span className="text-emerald-400">CSV</span>
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Extract transaction data from your <strong className="text-white font-semibold">{bankName}</strong> PDF statements 
            instantly. Secure, accurate, and ready for QuickBooks or Xero.
          </p>

          {/* 2. The Conversion Tool */}
          <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 shadow-2xl mb-16 backdrop-blur-md">
            <Dropzone />
          </div>

          {/* 3. The Visual Proof Section */}
          <div className="group transition-all duration-700">
             <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-slate-700"></div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Supported Format Preview</p>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-slate-700"></div>
             </div>
             
             <div className="relative mx-auto max-w-2xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-slate-950">
               <img 
                 src={snapshotUrl} 
                 alt={`${bankName} statement layout example`}
                 className="w-full h-auto opacity-40 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                 onError={(e) => {
                    // This hides the entire "Visual Proof" section if the PNG isn't in /public/banks/
                    const section = e.currentTarget.closest('.group');
                    if (section) (section as HTMLElement).style.display = 'none';
                 }} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
             </div>
             <p className="mt-6 text-sm text-slate-500 font-medium">
                Verified extraction for {bankName} transaction layouts.
             </p>
          </div>

        </div>
      </section>

      {/* Navigation Footer */}
      <div className="text-center pb-20 mt-12">
        <Link href="/convert/pdf-bank-statement-to-csv" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-all font-semibold text-sm">
          <span>←</span> View all 50+ bank converters
        </Link>
      </div>
    </div>
  );
}