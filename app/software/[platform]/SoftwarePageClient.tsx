"use client";

import Hero from "../../components/sections/hero";
import { CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { softwareDataMap } from "./softwareData";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center py-4 gap-4"
      >
        <span className="text-sm font-semibold text-[#111729]">{question}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="text-sm text-slate-600 leading-relaxed pb-4">{answer}</p>}
    </div>
  );
}

const allPlatforms = [
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
  const related = allPlatforms.filter(p => p.slug !== platformParam);

  return (
    <main className="bg-white">
      <Hero
        title={data?.heroTitle || `Convert PDF Bank Statements to ${displayName}`}
        description={data?.heroDescription || `Import your bank transactions into ${displayName} without manual data entry. DocNeat converts PDF bank statements from any bank into a ${displayName}-compatible CSV in seconds.`}
        bankName={data?.tagline || `${displayName} Integration`}
        bankSlug={`convert-pdf-to-${platformParam}`}
      />

      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {[
                { num: "50+", label: "Banks supported" },
                { num: "<30s", label: "Average conversion" },
                { num: "0", label: "Manual cleanup needed" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#111729]">{stat.num}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Platform switcher */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#111729] mb-2">Works with your software</h2>
              <p className="text-slate-500 text-sm mb-6">DocNeat produces the exact CSV format each platform expects.</p>
              <div className="grid grid-cols-5 gap-3">
                {allPlatforms.map((platform) => (
                  <Link
                    key={platform.slug}
                    href={`/software/convert-pdf-to-${platform.slug}`}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      platform.slug === platformParam
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <span className={`text-xs font-semibold block ${platform.slug === platformParam ? "text-emerald-700" : "text-slate-500"}`}>
                      {platform.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#111729] mb-2">Three steps, under two minutes</h2>
              <p className="text-slate-500 text-sm mb-8">No account needed for your first three conversions.</p>
              <div className="grid grid-cols-3 gap-4">
                {(data?.steps || [
                  { title: "Download your PDF", text: `Log in to your bank and download the statement period you need as a PDF.` },
                  { title: "Upload to DocNeat", text: `Drag and drop your PDF above. Our AI extracts every transaction row instantly.` },
                  { title: `Import into ${displayName}`, text: `Download your CSV and import directly. No column remapping needed.` },
                ]).map((step, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center mb-3">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-bold text-[#111729] mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            {data?.benefits && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8">
                <h3 className="text-base font-bold text-[#111729] mb-4">Why DocNeat for {displayName}</h3>
                <div className="grid gap-3">
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
            <div className="p-6 bg-white border border-slate-100 rounded-2xl mb-8">
              <p className="text-sm text-slate-600 leading-relaxed">
                {data?.whyText || `DocNeat produces ${displayName}-compatible CSV output from any bank PDF, with the correct date format and column structure for direct import without manual reformatting.`}
              </p>
            </div>

            {/* Specs table */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden mb-8">
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                <h3 className="text-base font-bold text-[#111729]">Technical specifications</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 w-1/3 bg-slate-50/30">Output format</td>
                    <td className="px-6 py-4 text-sm text-slate-600">CSV (comma-separated values)</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Compatible with</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{data?.compatibility || displayName}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Processing engine</td>
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
              <div className="border border-slate-100 rounded-2xl overflow-hidden mb-12">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                  <h3 className="text-base font-bold text-[#111729]">Frequently asked questions</h3>
                </div>
                <div className="px-6">
                  {data.faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

            {/* Related */}
            <div className="border-t border-slate-100 pt-10">
              <h3 className="text-base font-bold text-[#111729] mb-6">Other integrations</h3>
              <div className="flex gap-6 flex-wrap">
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