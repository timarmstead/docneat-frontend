import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- TYPES ---
interface PageProps {
  params: Promise<{ bank: string }>;
}

// --- SEED DATA (The "First 10") ---
// This mimics your database. Later, you'll move this to Railway.
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

// --- 1. PRE-RENDER THESE PATHS ---
// This tells Vercel exactly which 10 pages to generate at build time,
// solving the "Prerender Error".
export async function generateStaticParams() {
  return Object.keys(BANK_DATA).map((bank) => ({
    bank: bank,
  }));
}

// --- 2. DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { bank } = await params;
  const data = BANK_DATA[bank.toLowerCase()];
  
  if (!data) return { title: "Bank Statement Converter | DocNeat" };

  return {
    title: `Convert ${data.name} PDF Statements to CSV | DocNeat`,
    description: `Extract transaction data from your ${data.name} ${data.country} bank statements with 99.9% accuracy. Specifically formatted for Xero and QuickBooks.`,
  };
}

// --- 3. THE PAGE COMPONENT ---
export default async function BankLandingPage({ params }: PageProps) {
  const { bank } = await params;
  const bankId = bank.toLowerCase();
  const data = BANK_DATA[bankId];

  // If someone visits a bank not in our list, show 404
  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION: 
         Tip: Swap these divs for Launch UI <Hero /> components 
      */}
      <section className="py-20 px-6 bg-slate-50 border-b">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Convert <span className="text-primary">{data.name}</span> Statements to CSV
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Stop manually typing data from your {data.name} {data.country} PDFs. 
            Get perfectly formatted transaction lists in seconds.
          </p>
          
          {/* THE DROPZONE HOOK */}
          <div className="max-w-md mx-auto p-8 border-2 border-dashed border-primary/30 rounded-2xl bg-white shadow-sm hover:border-primary transition-colors cursor-pointer">
            <p className="text-sm font-medium text-slate-500">
              Drop your {data.name} PDF here to start
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">99.9% Table Accuracy</h3>
          <p className="text-slate-600">DocNeat is optimized for the specific column layouts of {data.name} statements.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Privacy First</h3>
          <p className="text-slate-600">Your financial data is processed in-memory and never stored on our servers.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Accounting Ready</h3>
          <p className="text-slate-600">Exports formatted specifically for easy import into Xero, QuickBooks, or Sage.</p>
        </div>
      </section>

      {/* STICKY CTA (Mobile Only Trend) */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden">
        <button className="w-full bg-primary text-white py-4 rounded-full font-bold shadow-lg">
          Convert {data.name} PDF Now
        </button>
      </div>
    </div>
  );
}
