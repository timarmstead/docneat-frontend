import { Metadata } from 'next'
import Hero from "@/components/sections/hero";
import { CheckCircle2, ArrowRightLeft, FileSpreadsheet, ShieldCheck } from "lucide-react";
import Link from "next/link";

// 1. GENERATE HIGH-CTR METADATA
export async function generateMetadata({ params }: { params: { platform: string } }): Promise<Metadata> {
  const platformRaw = params.platform.split('-').pop() || "Accounting Software";
  const platformName = platformRaw.charAt(0).toUpperCase() + platformRaw.slice(1);

  return {
    // Optimized Title: Matches "Import PDF to QuickBooks" intent
    title: `Import PDF Bank Statements into ${platformName} | DocNeat Converter`,
    
    // Optimized Description: Focuses on "No Manual Entry" and "Audit-Ready"
    description: `The fastest way to convert PDF bank statements for ${platformName} import. Automatically format transaction data into clean, audit-ready CSVs with AI-powered accuracy.`,
    
    openGraph: {
      title: `Import PDF to ${platformName} | DocNeat`,
      description: `Seamless bank statement conversion for ${platformName}.`,
    }
  }
}

// 2. PAGE COMPONENT
export default function SoftwarePage({ params }: { params: { platform: string } }) {
  const platformRaw = params.platform.split('-').pop() || "Accounting Software";
  const platformName = platformRaw.charAt(0).toUpperCase() + platformRaw.slice(1);

  const heroTitle = `Convert PDF Bank Statements for ${platformName}`;
  const heroDescription = `Automatically format your bank transactions for seamless import into ${platformName}. No manual data entry, no formatting errors, just audit-ready data.`;

  return (
    <main className="bg-white">
      <Hero
        title={heroTitle}
        description={heroDescription}
        bankName={`${platformName} Integration`}
        bankSlug={params.platform} 
      />

      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#111729] mb-4 text-center">
              The fastest way to import transactions into {platformName}
            </h2>
            <p className="text-slate-500 text-center mb-16">
              Stop manually typing data. Our AI recognizes your bank's layout and maps it perfectly to {platformName}'s import requirements.
            </p>

            <div className="grid gap-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">Auto-Mapping Headers</h3>
                  <p className="text-slate-600 leading-relaxed">
                    DocNeat automatically identifies Date, Description, and Amount columns, ensuring they align with the {platformName} CSV template perfectly.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <FileSpreadsheet className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">Clean CSV Exports</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We remove unnecessary headers, footers, and page numbers from your PDF, giving you a clean list of transactions ready for {platformName} reconciliation.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111729] mb-2">Audit-Ready Accuracy</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Every decimal point is verified by our AI v3.4 engine, ensuring your {platformName} books balance exactly with your physical bank statements.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-bold text-[#111729]">{platformName} Import Specs</h3>
              </div>
              <div className="bg-white p-0">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 w-1/3 bg-slate-50/30">Output Format</td>
                      <td className="px-6 py-4 text-sm text-slate-600">CSV (Optimized for {platformName})</td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Date Format</td>
                      <td className="px-6 py-4 text-sm text-slate-600">Auto-detected (MM/DD/YYYY or DD/MM/YYYY)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50/30">Data Privacy</td>
                      <td className="px-6 py-4 text-sm text-emerald-600 font-medium">Memory-only processing (No retention)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-24 border-t border-slate-100 pt-16">
              <h3 className="text-xl font-bold text-[#111729] mb-8">Popular Banks for {platformName}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/convert/chase-statement-to-csv" className="text-sm text-slate-500 hover:text-blue-600">Chase to {platformName}</Link>
                <Link href="/convert/hsbc-statement-to-csv" className="text-sm text-slate-500 hover:text-blue-600">HSBC to {platformName}</Link>
                <Link href="/convert/barclays-statement-to-csv" className="text-sm text-slate-500 hover:text-blue-600">Barclays to {platformName}</Link>
                <Link href="/convert/wells-fargo-statement-to-csv" className="text-sm text-slate-500 hover:text-blue-600">Wells Fargo to {platformName}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}