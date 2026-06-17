// app/success/page.tsx
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        
        {/* Success Icon */}
        <div className="bg-emerald-100 p-5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#111729] mb-3">
          Payment Successful!
        </h1>

        <p className="text-slate-500 text-base mb-6 leading-relaxed">
          Welcome to DocNeat. Check your email — we've sent you a link to set up your account and access your page credits.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-8 text-sm text-emerald-800">
          <strong>Didn't receive an email?</strong> Check your spam folder, or{' '}
          <a href="mailto:support@docneat.com" className="underline font-medium">
            contact support
          </a>
          .
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-[#111729] hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            Start Converting Statements
          </Link>
          <Link
            href="/sign-in"
            className="w-full border border-slate-200 hover:border-slate-300 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all"
          >
            Sign In to Your Account
          </Link>
        </div>

      </div>
    </main>
  );
}