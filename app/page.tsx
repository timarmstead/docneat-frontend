import dynamic from 'next/dynamic';
import Link from 'next/link';

const Dropzone = dynamic(() => import('@/components/Dropzone'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center border-4 border-dashed border-gray-200 rounded-2xl bg-white">
      <p className="text-xl text-gray-400 animate-pulse">Loading secure upload area...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Reduced headline size for a cleaner look */}
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Turn Any Bank Statement into a <br className="hidden md:block" />
            <span className="text-emerald-600">Clean Spreadsheet</span> in Seconds.
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed">
            No complex software, no data retention, no errors. Just secure, fast, and accurate conversion for smarter bookkeeping.
          </p>
        </div>

        {/* Upload Section - Clean White Card */}
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <Dropzone />
        </div>

        {/* Value Reinforcement - Simple & Minimalist */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-2">Immediate Deletion</h3>
            <p className="text-gray-500 text-sm">Files are processed in memory and deleted instantly. Your data never touches our disks.</p>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-2">AI-Powered Accuracy</h3>
            <p className="text-gray-500 text-sm">Advanced OCR built specifically for financial layouts ensures 99.9% data integrity.</p>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-2">Zero Setup</h3>
            <p className="text-gray-500 text-sm">No accounts or credit cards required. Start converting your documents immediately.</p>
          </div>
        </div>

        {/* Pricing Link */}
        <div className="text-center mt-16">
          <Link href="/pricing" className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg inline-flex items-center gap-2">
            View Simple Pricing <span>→</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
