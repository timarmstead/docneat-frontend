import Link from "next/link";
import { MoveRight, Banknote, ShieldCheck, Zap } from "lucide-react";

const bankList = [
  // US & Canada
  "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One", 
  "TD Bank", "PNC Bank", "US Bank", "RBC", "BMO", "Scotiabank", "CIBC",
  // UK & Europe
  "HSBC", "Barclays", "NatWest", "Lloyds Bank", "Santander", "Monzo", 
  "Revolut", "Starling Bank", "Deutsche Bank", "Societe Generale", "Halifax",
  // India
  "Axis Bank", "HDFC Bank", "SBI", "ICICI Bank", "Canara Bank", "TMB", 
  "KVB", "Kotak Mahindra", "Yes Bank", "Standard Chartered",
  // Australia & Global
  "NAB", "ANZ Bank", "Commonwealth Bank", "Westpac", "DBS Bank", "Mercury",
  "Chime", "Ally Bank", "Fifth Third", "SunTrust", "Silicon Valley Bank",
  "First Republic", "Regions Bank", "M&T Bank", "Huntington", "KeyBank", "Discover"
];

export default function ConvertDirectory() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section - pt-32 ensures it starts below your Navbar */}
      <div className="bg-[#111729] pt-32 pb-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Supported Banks</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Select your bank to convert PDF statements to CSV or Excel with 99.9% accuracy. 
            AI-optimized for global financial institutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Zap className="text-emerald-600 w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Instant Conversion</span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <ShieldCheck className="text-emerald-600 w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Banknote className="text-emerald-600 w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Precision Extraction</span>
            </div>
        </div>

        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#111729]">Select your bank</h2>
          <p className="text-slate-500">Choose your institution to begin your secure conversion.</p>
        </div>

        {/* The Bank Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {bankList.sort().map((bank) => {
            // Generate SEO friendly slug
            const slug = `${bank.toLowerCase().replace(/\s+/g, '-')}-statement-to-csv`;
            return (
              <Link 
                key={slug} 
                href={`/convert/${slug}`}
                className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all flex justify-between items-center"
              >
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Convert PDF to CSV</p>
                    <span className="font-bold text-[#111729] group-hover:text-emerald-600 transition-colors">
                        {bank}
                    </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-emerald-50 transition-colors">
                  <MoveRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}