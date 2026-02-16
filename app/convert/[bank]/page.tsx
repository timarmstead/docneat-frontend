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
      {/* 1. Hero / Tool Section */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Container */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt={`${bankName} logo`} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Convert {bankName} Statement to <span className="text-emerald-400">CSV</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            The fastest way to extract transaction data from your {bankName} statements. 
            Secure, browser-based conversion with no data retention.
          </p>
          
          <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 shadow-2xl">
            <Dropzone />
          </div>
        </div>
      </section>

      {/* 2. Two-Column Educational Content (As originally agreed) */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Why {bankName} to CSV?</h2>
            <p className="text-slate-400 leading-relaxed">
              PDF files are designed for viewing, not for data analysis. By converting your 
              {bankName} statements to CSV, you unlock the ability to 
              import transactions directly into accounting software like <strong>QuickBooks</strong> or <strong>Xero</strong>.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Secure & Private</h2>
            <p className="text-slate-400 leading-relaxed">
              Your documents are processed 
              using 256-bit encryption and are never stored on our servers. The conversion 
              is temporary and deleted immediately after your download is ready.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visual Proof Snapshot Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-3xl font-bold text-white mb-10 text-center">Visual Proof</h2>
           <div className="relative mx-auto max-w-3xl rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
             <img 
               src={snapshotUrl} 
               alt={`${bankName} conversion example`}
               className="w-full h-auto opacity-80"
               onError={(e) => {
                  const section = e.currentTarget.closest('section');
                  if (section) section.style.display = 'none';
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
           </div>
           
           <div className="mt-16">
            <Link href="/convert/pdf-bank-statement-to-csv" className="text-emerald-400 hover:underline font-semibold">
              ← View all bank converters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}