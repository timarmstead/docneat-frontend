"use client";

import Hero from "../../components/sections/hero";
import { CheckCircle2, Download, Upload, FileJson, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { bankDataMap, BankData } from "./bankData";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center py-4 gap-4"
      >
        <span className="text-sm font-semibold text-[#111729]">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-sm text-slate-600 leading-relaxed pb-4">{answer}</p>
      )}
    </div>
  );
}

export default function BankPageClient({ params }: { params: { bank: string } }) {
  const bankParam = params?.bank || "";
  const slugParts = bankParam.split("-");

  const ignoredWords = ["convert", "statement", "to", "csv", "pdf", "conversion"];
  const nameParts = slugParts.filter(
    (part) => !ignoredWords.includes(part.toLowerCase())
  );

  const bankDisplayName =
    nameParts.length > 0
      ? nameParts.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      : "Your Bank";

  // Look up bank-specific data, fall back to generic if not found
  const bankKey = nameParts.join("-").toLowerCase();
  const bankData: BankData | null = bankDataMap[bankKey] || null;

  const LOGO_DEV_KEY = "pk_Ol0me5iRTGmkOcrArHEA5g";
  const domainMap: Record<string, string> = {
    "chase": "chase.com",
    "bank-of-america": "bankofamerica.com",
    "wells-fargo": "wellsfargo.com",
    "citibank": "citi.com",
    "capital-one": "capitalone.com",
    "td-bank": "td.com",
    "pnc-bank": "pnc.com",
    "us-bank": "usbank.com",
    "hsbc": "hsbc.com",
    "barclays": "barclays.co.uk",
    "halifax": "halifax.co.uk",
  };

  const matchedSlug = Object.keys(domainMap).find((key) =>
    bankParam.toLowerCase().includes(key)
  );
  const logoDomain = matchedSlug
    ? domainMap[matchedSlug]
    : `${nameParts.join("").toLowerCase() || "bank"}.com`;
  const logoUrl = `https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_KEY}`;

  const descriptions = [
    `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel.`,
    `Stop wasting hours on manual data entry. Our AI-powered tool converts ${bankDisplayName} PDF statements into clean, audit-ready CSV files instantly.`,
    `The most reliable way to turn ${bankDisplayName} PDF statements into spreadsheets with complete data integrity. Secure, fast, and optimized for professional accounting.`,
  ];

  const versionIndex = bankDisplayName.length % descriptions.length;
  const heroTitle = `Convert your ${bankDisplayName} Statements to CSV`;
  const heroDescription = descriptions[versionIndex] || descriptions[0];
  const badgeText = `${bankDisplayName} Statement Conversion`;

  const whyText =
    bankData?.whyText ||
    `Most generic converters struggle with the complex table structures found in ${bankDisplayName} documents. DocNeat is specifically tuned to recognize these layouts, saving you the time of cleaning up broken rows.`;

  const relatedBanks = (
    bankData?.relatedBanks || [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Bank of America", slug: "bank-of-america-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "Citibank", slug: "citibank-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
    ]
  ).filter((b) => b.slug !== bankParam);

  return (
    <main className="bg-white">
      <Hero
        title={heroTitle}
        description={heroDescription}
        bankName={badgeText}
        bankSlug={bankParam}
      />

      <div className="flex justify-center -mt-8 mb-12">
        <div className="w-16 h-16 flex items-center justify-center bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          <img
            src={logoUrl}
            alt={`${bankDisplayName} logo`}
            className="max-h-full max-w-full object-contain"
            onError={(e) =>
              (e.currentTarget.parentElement!.parentElement!.style.display = "none")
            }
          />
        </div>
      </div>

      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* How-to steps */}
            <h2 className="text-3xl font-bold text-[#111729] mb-4 text-center">
              How to export {bankDisplayName} transactions to CSV
            </h2>
            <p className="text-slate-500 text-center mb-16">
              Follow these simple steps to get your {bankDisplayName} data ready for
              accounting or analysis.
            </p>

            <div className="grid gap-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Download className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">
                    1. Download PDF from {bankDisplayName}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Log in to your {bankDisplayName} online banking portal. Navigate to
                    your statements or transaction history and download the desired period
                    as a PDF document.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Upload className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">
                    2. Upload to Docneat
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Drag and drop your {bankDisplayName} PDF into the secure conversion
                    box at the top of this page. Our AI immediately begins identifying
                    headers and transaction rows.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FileJson className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">
                    3. Download as CSV or Excel
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Review the preview of your data. Once satisfied, click export. Your
                    file will be perfectly formatted for immediate import into QuickBooks,
                    Xero, or Excel.
                  </p>
                </div>
              </div>
            </div>

            {/* Statement format — bank-specific */}
            {bankData?.statementFormat && (
              <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-lg font-bold text-[#111729] mb-3">
                  {bankDisplayName} statement format
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {bankData.statementFormat}
                </p>
              </div>
            )}

            {/* Extracted columns — bank-specific */}
            {bankData?.extractedColumns && (
              <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-[#111729]">
                    Data extracted from {bankDisplayName} statements
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-2 gap-3">
                  {bankData.extractedColumns.map((col) => (
                    <div key={col} className="flex items-center gap-2">
                      <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical specs table */}
            <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-bold text-[#111729]">
                  Technical Specifications: {bankDisplayName}
                </h3>
              </div>
              <div className="bg-white p-0">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 w-1/3 bg-slate-50/30">
                        Document Source
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        Standard {bankDisplayName} Bank PDF
                      </td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">
                        Processing Engine
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-600 font-medium">
                        DocNeat Financial OCR (v2.1)
                      </td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">
                        Encryption Level
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        256-bit AES (SSL Secured)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">
                        Target Compatibility
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {bankData?.compatibility || "QuickBooks, Xero, Sage, Excel"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Common issues — bank-specific */}
            {bankData?.commonIssues && (
              <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-[#111729]">
                    How DocNeat handles {bankDisplayName} PDF quirks
                  </h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {bankData.commonIssues.map((issue, i) => (
                    <div key={i} className="flex gap-4 px-6 py-4">
                      <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 leading-relaxed">{issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why use AI converter */}
            <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="text-lg font-bold text-[#111729] mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                Why use an AI converter for {bankDisplayName}?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{whyText}</p>
            </div>

            {/* FAQ — bank-specific */}
            {bankData?.faqs && bankData.faqs.length > 0 && (
              <div className="mt-12 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-[#111729]">
                    Frequently asked questions
                  </h3>
                </div>
                <div className="px-6">
                  {bankData.faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

            {/* Related banks */}
            <div className="mt-24 border-t border-slate-100 pt-16">
              <h3 className="text-xl font-bold text-[#111729] mb-8">
                Related Bank Converters
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedBanks.map((bank) => (
                  <Link
                    key={bank.slug}
                    href={`/convert/${bank.slug}`}
                    className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    {bank.name} to CSV
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}