"use client"; 

import Hero from "../../components/sections/hero";
import { CheckCircle2, Download, Upload, FileJson } from "lucide-react";

export default function BankPage({ params }: { params: { bank: string } }) {
  const slugParts = params.bank ? params.bank.split('-') : [];
  
  const ignoredWords = ['convert', 'statement', 'to', 'csv', 'pdf', 'conversion'];
  const nameParts = slugParts.filter(part => !ignoredWords.includes(part.toLowerCase()));

  // Fallback if nameParts is empty to prevent blank screen
  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Your Bank";

  // LOGO API LOGIC
  const LOGO_DEV_KEY = 'pk_Ol0me5iRTGmkOcrArHEA5g'; 
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
    'halifax': 'halifax.co.uk'
  };

  const bankSlug = params.bank ? params.bank.toLowerCase() : '';
  const matchedSlug = Object.keys(domainMap).find(key => bankSlug.includes(key));
  const logoDomain = matchedSlug ? domainMap[matchedSlug] : `${nameParts.join('').toLowerCase() || 'bank'}.com`;
  const logoUrl = `https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_KEY}`;

  // DYNAMIC CONTENT LOGIC - Revised for PDF Statements & 100% Accuracy Messaging
  const descriptions = [
    `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel.`,
    `Stop wasting hours on manual data entry. Our AI-powered tool converts ${bankDisplayName} PDFs into clean, audit-ready CSV files instantly.`,
    `The most reliable way to turn ${bankDisplayName} PDF statements into spreadsheets with complete data integrity. Secure, fast, and optimized for professional accounting.`
  ];

  const whyTexts = [
    `PDF files are designed for viewing, not for data analysis. By converting your ${bankDisplayName} statements to CSV, you unlock the ability to import transactions directly into accounting software like QuickBooks or Xero.`,
    `Manual entry from ${bankDisplayName} PDFs is prone to human error. Our converter preserves every decimal point and date, ensuring your books balance the first time you import them into your spreadsheet.`,
    `Most generic converters struggle with the complex table structures found in ${bankDisplayName} documents. DocNeat is specifically tuned to recognize these layouts, saving you the time of cleaning up broken rows.`
  ];

  // Safety check for the index
  const versionIndex = bankDisplayName.length % descriptions.length;

  const heroTitle = `Convert your ${bankDisplayName} Statements to CSV`;
  const heroDescription = descriptions[versionIndex] || descriptions[0];
  const activeWhyText = whyTexts[versionIndex] || whyTexts[0];
  const badgeText = `${bankDisplayName} Statement Conversion`;

  return (
    <main className="bg-white">
      <Hero
        title={heroTitle}
        description={heroDescription}
        bankName={badgeText}
        bankSlug={params.bank} 
      />

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

      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#111729] mb-4 text-center">
              How to export {bankDisplayName} transactions to CSV
            </h2>
            <p className="text-slate-500 text-center mb-16">
              Follow these simple steps to get your {bankDisplayName} data ready for accounting or analysis.
            </p>

            <div className="grid gap-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Download className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">1. Download PDF from {bankDisplayName}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Log in to your {bankDisplayName} online banking portal. Navigate to your statements or transaction history and download the desired period as a PDF document.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Upload className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">2. Upload to Docneat</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Drag and drop your {bankDisplayName} PDF into the secure conversion box at the top of this page. Our AI immediately begins identifying headers and transaction rows.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FileJson className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">3. Download as CSV or Excel</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Review the preview of your data. Once satisfied, click export. Your file will be perfectly formatted for immediate import into QuickBooks, Xero, or Excel.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-lg font-bold text-[#111729] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    Why use an AI converter for {bankDisplayName}?
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    {activeWhyText}
                </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}