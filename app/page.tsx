import dynamic from 'next/dynamic';

// Dynamically import Dropzone – only loads on the client (no build-time server parsing)
const Dropzone = dynamic(() => import('./components/Dropzone'), {
  ssr: false,  // Important: disables server-side rendering for this component
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center border-4 border-dashed border-gray-300 rounded-2xl bg-gray-50">
      <p className="text-xl text-gray-500 animate-pulse">Loading upload area...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-mint-900 mb-4">DocNeat.com</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-2">Easy. Fast. Accurate.</p>
          <p className="text-lg text-gray-500">Messy PDFs → Perfect Excel/CSV in seconds. No signup. Nothing stored.</p>
        </div>

        {/* The upload area – now loaded dynamically */}
        <Dropzone />

        <div className="text-center mt-12">
          <a href="/pricing" className="text-mint-600 hover:underline font-medium text-lg">
            View Pricing →
          </a>
        </div>
      </div>
    </main>
  )
}
