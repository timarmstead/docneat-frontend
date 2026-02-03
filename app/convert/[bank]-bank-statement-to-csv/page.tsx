import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- SEED DATA ---
const BANK_DATA: Record<string, { name: string; country: string }> = {
  "chase": { name: "Chase", country: "US" },
  "amex": { name: "American Express", country: "Global" },
  "barclays": { name: "Barclays", country: "UK" },
  "hsbc": { name: "HSBC", country: "Global" },
  "wells-fargo": { name: "Wells Fargo", country: "US" },
  "lloyds": { name: "Lloyds", country: "UK" },
  "natwest": { name: "NatWest", country: "UK" },
  "monzo": { name: "Monzo", country: "UK" },
  "revolut": { name: "Revolut", country: "Global" },
  "pnc": { name: "PNC", country: "US" },
};

// --- 1. PRE-RENDER PATHS ---
export async function generateStaticParams() {
  return Object.keys(BANK_DATA).map((bankKey) => ({
    bank: bankKey,
  }));
}

// --- 2. DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  // Defensive check for Next.js 14 build worker
  if (!params?.bank) return { title: "Bank Statement Converter | DocNeat" };

  const data = BANK_DATA[params.bank.toLowerCase()];
  
  if (!data) return { title: "Bank Statement Converter | DocNeat" };

  return {
    title: `Convert ${data.name} PDF Statements to CSV | DocNeat`,
    description: `Extract transaction data from your ${data.name} ${data.country} bank statements with 99.9% accuracy.`,
  };
}

// --- 3. THE PAGE COMPONENT ---
export default function BankLandingPage({ params }: { params: { bank: string } }) {
  // 1. Check if params and bank exist (Crucial for build step)
  if (!params?.bank) {
    return notFound();
  }

  const bankId = params.bank.toLowerCase();
  const data = BANK_DATA[bankId];

  // 2. If the bank isn't in our list, 404
  if (!data) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Simple Hero Section */}
      <section className="py-20 px-6 bg-slate-50 border-b">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Convert <span className="text-blue-600">{data.name}</span> Statements to CSV
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Extract transaction data from your {data.name} {data.country} bank statements with 99.9% accuracy.
          </p>
          
          {/* File Upload Placeholder */}
          <div className="max-w-md mx-auto p-12 border-2 border-dashed border-blue-200 rounded-2xl bg-white shadow-sm">
            <p className="text-blue-600 font-semibold">Click to upload your {data.name} PDF</p>
            <p className="text-xs text-slate-400 mt-2">Secure, private, and encrypted</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="p-6 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold mb-2">Built for {data.name}</h3>
          <p className="text-slate-600 text-sm">Custom parsers designed specifically for {data.name} statement layouts.</p>
        </div>
        <div className="p-6 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold mb-2">Zero Data Retention</h3>
          <p className="text-slate-600 text-sm">We process your financial data and purge it instantly. No storage, no risk.</p>
        </div>
        <div className="p-6 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold mb-2">Excel & CSV Ready</h3>
          <p className="text-slate-600 text-sm">Perfectly formatted rows ready for import into your favorite accounting software.</p>
        </div>
      </section>
    </div>
  );
}
