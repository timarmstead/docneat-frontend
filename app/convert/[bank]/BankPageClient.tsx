"use client"; 

import Hero from "../../components/sections/hero";
import { CheckCircle2, Download, Upload, FileJson } from "lucide-react";

export default function BankPageClient({ params }: { params: { bank: string } }) {
  const slugParts = params.bank ? params.bank.split('-') : [];
  
  const ignoredWords = ['convert', 'statement', 'to', 'csv', 'pdf', 'conversion'];
  const nameParts = slugParts.filter(part => !ignoredWords.includes(part.toLowerCase()));

  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Your Bank";

  const LOGO_DEV_KEY = 'pk_Ol0me5iRTGmkOcrArHEA5g'; 
  const domainMap: Record<string, string> = {
    'chase': 'chase.com', 'bank-of-america': 'bankofamerica.com', 'wells-fargo': 'wellsfargo.com',
    'citibank': 'citi.com', 'capital-one': 'capitalone.com', 'td-bank': 'td.com',
    'pnc-bank': 'pnc.com', 'us-bank': 'usbank.com', 'hsbc': 'hsbc.com',
    'barclays': 'barclays.co.uk', 'halifax': 'halifax.co.uk'
  };

  const bankSlug = params.bank ? params.bank.toLowerCase() : '';
  const matchedSlug = Object.keys(domainMap).find(key => bankSlug.includes(key));
  const logoDomain = matchedSlug ? domainMap[matchedSlug] : `${nameParts.join('').toLowerCase() || 'bank'}.com`;
  const logoUrl = `https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_KEY}`;

  const descriptions = [
    `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel.`,
    `Stop wasting hours on manual data entry. Our AI-powered tool converts ${bankDisplayName} PDF statements into clean, audit-ready CSV files instantly.`,
    `The most reliable way to turn ${bankDisplayName} PDF statements into spreadsheets with complete data integrity. Secure, fast, and optimized for professional accounting.`
  ];

  const whyTexts = [
    `PDF files are designed for viewing, not for data analysis...`,
    `Manual entry from ${bankDisplayName} PDFs is prone to human error...`,
    `Most generic converters struggle with the complex table structures...`
  ];

  const versionIndex = bankDisplayName.length % descriptions.length;
  const heroTitle = `Convert your ${bankDisplayName} Statements to CSV`;
  const heroDescription = descriptions[versionIndex] || descriptions[0];
  const activeWhyText = whyTexts[versionIndex] || whyTexts[0];
  const badgeText = `${bankDisplayName} Statement Conversion`;

  return (
    <main className="bg-white">
      <Hero title={heroTitle} description={heroDescription} bankName={badgeText} bankSlug={params.bank} />
      <div className="flex justify-center -mt-8 mb-12">
        <div className="w-16 h-16 flex items-center justify-center bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          <img 
            src={logoUrl} 
            alt={`${bankDisplayName} logo`} 
            className="max-h-full max-w-full object-contain"
            onError={(e) => (e.currentTarget.parentElement!.parentElement!.style.display = 'none')}
          />
        </div>
      </div>
      {/* ... the rest of your sections ... */}
      <section className="pt-12 pb-24">
          {/* Paste your existing instructions section here */}
      </section>
    </main>
  );
}