import Dropzone from './components/Dropzone';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-mint-900 mb-4">DocNeat.com</h1>
        <p className="text-3xl font-semibold text-gray-700 mb-4">Easy. Fast. Accurate.</p>
        <p className="text-xl text-gray-600 mb-12">Messy PDFs → Perfect Excel/CSV in seconds</p>

        <Dropzone />

        <div className="mt-16">
          <a href="/pricing" className="text-2xl text-mint-600 hover:underline font-medium">
            View Pricing →
          </a>
        </div>
      </div>
    </main>
  );
}
