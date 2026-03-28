import { Metadata } from 'next'
import dynamic from 'next/dynamic';
import Link from 'next/link';

// 1. SEO METADATA - This controls how you appear on Google
export const metadata: Metadata = {
  title: 'DocNeat.com — Bank Statement Converter',
  description: 'The world\'s fastest AI bank statement converter. Extract transaction data from PDF statements into Excel or CSV with verified accuracy.',
  openGraph: {
    title: 'DocNeat.com — Bank Statement Converter',
    description: 'Convert PDF bank statements to Excel and CSV instantly.',
    siteName: 'DocNeat.com - Bank Statement Converter',
    type: 'website',
    url: 'https://www.docneat.com',
  }
}

// 2. VISUAL COMPONENTS
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
    <main className="min-h-screen bg-slate-900 pt-32 md:pt-44 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-16"> 
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
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-slate-800 pt-12">
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2">Immediate Deletion</h3>
            <p className="text-slate-400 text-sm">Files are processed in memory and deleted instantly. Your financial privacy is our priority.</p>
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2">AI-Powered Accuracy</h3>
            <p className="text-slate-400 text-sm">Advanced OCR built specifically for financial layouts ensures verified data integrity.</p>
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2">Workflow Optimized</h3>
            <p className="text-slate-400 text-sm">Eliminate hours of manual data entry with our high-speed, automated extraction engine.</p>
          </div>
        </div>

        {/* Updated Button Section with White Text */}
        <div className="text-center mt-20">
          <Link 
            href="/pricing" 
            className="inline-flex items-center justify-center px-10 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-lg group"
          >
            View Plans & Pricing 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <p className="text-slate-500 text-sm mt-4 font-medium italic">
            *No hidden fees
          </p>
        </div>

      </div>
    </main>
  );
}