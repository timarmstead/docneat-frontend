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
    <main className="min-h-screen bg-slate-900 pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
            Turn Any Bank Statement into a <br className="hidden md:block" />
            <span className="text-emerald-400">Clean Spreadsheet</span> in Seconds.
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed italic">
            No complex software, no data retention, no errors. Just secure, fast, and accurate conversion for smarter bookkeeping.
          </p>
        </div>

        {/* Upload Section */}
        <div className="relative group">
          {/* Subtle glow effect behind the dropzone */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative">
            <Dropzone />
          </div>
        </div>

        {/* Value Reinforcement & Trust */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-slate-800 pt-16">
          <div>
            <h3 className="text-emerald-400 font-bold text-xl mb-2">Immediate Deletion</h3>
            <p className="text-slate-400 text-sm">We process your files and delete them instantly. Your financial privacy is our priority.</p>
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-xl mb-2">AI-Powered Accuracy</h3>
            <p className="text-slate-400 text-sm">Our advanced OCR handles messy scans and complex bank layouts with 99.9% precision.</p>
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-xl mb-2">Zero Setup</h3>
            <p className="text-slate-400 text-sm">No accounts, no credit cards, no complex software. Just drag, drop, and download.</p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-16">
          <Link href="/pricing" className="text-slate-500 hover:text-emerald-400 transition-colors font-medium text-lg flex items-center justify-center gap-2">
            View Simple Pricing <span className="text-xl">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
