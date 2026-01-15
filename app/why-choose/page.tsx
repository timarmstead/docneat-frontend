import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Why Choose DocNeat — Secure AI Bank Statement Conversion',
  description: 'Discover why thousands of accountants and businesses trust DocNeat for fast, accurate, and secure bank statement to Excel conversion.',
};

const features = [
  {
    title: "99.9% AI Accuracy",
    description: "Our specialized OCR models are trained specifically on financial documents, handling complex tables and multi-page statements with pinpoint precision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="m13 2-2 10h9L7 22l2-10H1z"/></svg>
    )
  },
  {
    title: "Zero-Storage Security",
    description: "Unlike competitors, we process your files in-memory and delete them instantly. Your financial data is never stored on our servers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    )
  },
  {
    title: "Instant Conversions",
    description: "Go from a 50-page PDF to a clean Excel spreadsheet in less than 10 seconds. Stop wasting hours on manual data entry.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    )
  },
  {
    title: "Accounting Ready",
    description: "Our exports are perfectly formatted for direct import into QuickBooks, Xero, and Sage, eliminating the need for manual cleanup.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    )
  }
];

export default function WhyChoosePage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-32 md:pt-44 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            Built for speed. <br />
            <span className="text-emerald-400">Trusted for security.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            DocNeat was built to solve the "Accounting Bottleneck." We combine enterprise-grade AI extraction with a security model that ensures your data stays your data.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-emerald-500/30 transition-all group">
              <div className="mb-4 p-3 bg-slate-900 rounded-lg inline-block group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Persona Section */}
        <div className="grid md:grid-cols-3 gap-12 py-20 border-t border-slate-800">
          <div>
            <div className="text-emerald-500 mb-4 font-bold tracking-widest text-sm uppercase">For Accountants</div>
            <h2 className="text-2xl font-bold text-white mb-4">Scale your practice</h2>
            <p className="text-slate-400 leading-relaxed">
              Process client shoeboxes of bank statements in minutes instead of days. Free up your staff for higher-value advisory work.
            </p>
          </div>
          <div>
            <div className="text-emerald-500 mb-4 font-bold tracking-widest text-sm uppercase">For Small Businesses</div>
            <h2 className="text-2xl font-bold text-white mb-4">Automate bookkeeping</h2>
            <p className="text-slate-400 leading-relaxed">
              Keep your books up to date without the manual grind. Export clean CSVs that plug directly into your accounting software.
            </p>
          </div>
          <div>
            <div className="text-emerald-500 mb-4 font-bold tracking-widest text-sm uppercase">For Individuals</div>
            <h2 className="text-2xl font-bold text-white mb-4">Simplify your taxes</h2>
            <p className="text-slate-400 leading-relaxed">
              Organize a year's worth of transactions for tax filing or mortgage applications in a single click. No subscriptions required.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 p-12 rounded-3xl bg-emerald-500 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to stop manual data entry?</h2>
            <p className="text-emerald-100 mb-10 text-lg max-w-2xl mx-auto font-medium">
              Join thousands of professionals who save an average of 15 hours per month using DocNeat.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-white text-emerald-600 font-bold py-4 px-10 rounded-xl text-lg hover:bg-slate-100 transition-all active:scale-95 shadow-xl"
            >
              Get Started for Free
            </Link>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-400 rounded-full opacity-50 blur-3xl"></div>
        </div>

      </div>
    </div>
  );
}
