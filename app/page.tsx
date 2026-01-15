import dynamic from 'next/dynamic';
import Link from 'next/link';

const Dropzone = dynamic(() => import('@/components/Dropzone'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center border-4 border-dashed border-slate-700 rounded-2xl bg-slate-800/50">
      <p className="text-xl text-slate-400 animate-pulse">Loading secure upload area...</p>
    </div>
  ),
});

export default function Home() {
  return (
    // Increased pt-24 to pt-40 (mobile) and pt-60 (desktop) for better spacing
    <main className="min-h-screen bg-slate-900 pt-40 md:pt-60 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-20"> {/* Increased margin bottom to separate from Dropzone */}
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            Turn Any Bank Statement into a <br className="hidden md:block" />
            <span className="text-emerald-400">Clean Spreadsheet</span> in Seconds.
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-8 leading-relaxed">
            No complex software, no data retention, no errors. Just secure, fast, and accurate conversion for smarter bookkeeping.
          </p>
        </div>

        {/* Upload Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-700"></div>
          
          <div className="relative">
            <Dropzone />
          </div>
        </div>

        {/* Value Reinforcement */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-slate-800 pt-12">
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2">Immediate Deletion</h3>
            <p className="text-slate-400 text-sm">Files are processed in memory and deleted instantly. Your financial privacy is our priority.</p>
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2">AI-Powered Accuracy</h3>
            <p className="text-slate-400 text-sm">Advanced OCR built specifically for financial layouts ensures 99.9% data integrity.</p>
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2">Zero Setup</h3>
            <p className="text-slate-400 text-sm">No accounts or credit cards required. Start converting your documents immediately.</p>
          </div>
        </div>

        {/* Pricing Link */}
        <div className="text-center mt-16">
          <Link href="/pricing" className="text-slate-500 hover:text-emerald-400 transition-colors font-medium text-lg inline-flex items-center gap-2">
            View Simple Pricing <span>→</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
