"use client";

import Hero from "../../components/sections/hero";
import { CheckCircle2, Download, Upload, FileJson, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { softwareDataMap } from "./SoftwareData";

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

const relatedPlatforms = [
  { name: "QuickBooks", slug: "quickbooks" },
  { name: "Xero", slug: "xero" },
  { name: "Sage", slug: "sage" },
  { name: "Excel", slug: "excel" },
  { name: "FreshBooks", slug: "freshbooks" },
];

export default function SoftwarePageClient({ params }: { params: { platform: string } }) {
  const platformParam = params?.platform || "";
  const data = softwareDataMap[platformParam] || null;

  const displayName = data?.displayName || platformParam.charAt(0).toUpperCase() + platformParam.slice(1);

  const related = relatedPlatforms.filter(p => p.slug !== platformParam);

  return (
    <main className="bg-white">
      <Hero
        title={data?.heroTitle || `Convert PDF Bank Statements to ${displayName}`}
        description={data?.heroDescription || `Import your bank transactions into ${displayName} without manual data entry. DocNeat converts PDF bank statements into a ${displayName}-compatible CSV in seconds.`}
        bankName={data?.tagline || `${displayName} Import`}
      />

      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* How-to steps */}
            <h2 className="text-3xl font-bold text-[#111729] mb-4 text-center">
              How to import bank statements into {displayName}
            </h2>
            <p className="text-slate-500 text-center mb-16">
              Three steps from PDF to {displayName} — takes under two minutes.
            </p>

            <div className="grid gap-12">
              {(data?.steps || [
                { title: "Upload your bank statement PDF", text: `Drag and drop your PDF bank statement into the secure upload area above. DocNeat supports statements from 50+ banks globally.` },
                { title: "DocNeat extracts your transactions", text: `Our AI identifies the transaction table and formats the data into a ${displayName}-compatible CSV.` },
                { title: `Import into ${displayName}`, text: `Download your CSV and import it directly into ${displayName}. No column remapping or manual cleanup needed.` }
              ]).map((step, i) => {
                const icons = [Download, Upload, FileJson];
                const Icon = icons[i];
                return (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Icon className="text-emerald-600 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111729] mb-2">{i + 1}. {step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            {data?.benefits && (
              <div className="mt-16 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-[#111729]">
                    Why use DocNeat for {displayName} imports
                  </h3>
                </div>
                <div className="p-6 grid gap-3">
                  {data.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why text */}
            <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="text-lg font-bold text-[#111729] mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                Why DocNeat for {displayName}?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {data?.whyText || `DocNeat produces ${displayName}-compatible CSV output from any bank PDF, with the correct date format and column structure for direct import without manual reformatting.`}
              </p>
            </div>

            {/* Compatibility */}
            <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-bold text-[#111729]">Technical Specifications</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 w-1/3 bg-slate-50/30">Output Format</td>
                    <td className="px-6 py-4 text-sm text-slate-600">CSV (comma-separated values)</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Compatible With</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{data?.compatibility || displayName}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Processing Engine</td>
                    <td className="px-6 py-4 text-sm text-emerald-600 font-medium">DocNeat Financial OCR (v2.1)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Encryption</td>
                    <td className="px-6 py-4 text-sm text-slate-600">256-bit AES (SSL Secured)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FAQ */}
            {data?.faqs && data.faqs.length > 0 && (
              <div className="mt-12 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-[#111729]">
                    Frequently asked questions
                  </h3>
                </div>
                <div className="px-6">
                  {data.faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

            {/* Related platforms */}
            <div className="mt-24 border-t border-slate-100 pt-16">
              <h3 className="text-xl font-bold text-[#111729] mb-8">
                Other integrations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((platform) => (
                  <Link
                    key={platform.slug}
                    href={`/software/convert-pdf-to-${platform.slug}`}
                    className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    PDF to {platform.name}
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