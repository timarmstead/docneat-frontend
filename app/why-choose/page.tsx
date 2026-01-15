import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, BarChart3, Lock, Clock, Users } from 'lucide-react';

export const metadata = {
  title: 'Why Choose DocNeat — Secure AI Bank Statement Conversion',
  description: 'Discover why thousands of accountants and businesses trust DocNeat for fast, accurate, and secure bank statement to Excel conversion.',
};

const features = [
  {
    title: "99.9% AI Accuracy",
    description: "Our specialized OCR models are trained specifically on financial documents, handling complex tables and multi-page statements with pinpoint precision.",
    icon: <Zap className="text-emerald-400" size={24} />
  },
  {
    title: "Zero-Storage Security",
    description: "Unlike competitors, we process your files in-memory and delete them instantly. Your financial data is never stored on our servers.",
    icon: <Lock className="text-emerald-400" size={24} />
  },
  {
    title: "Instant Conversions",
    description: "Go from a 50-page PDF to a clean Excel spreadsheet in less than 10 seconds. Stop wasting hours on manual data entry.",
    icon: <Clock className="text-emerald-400" size={24} />
  },
  {
    title: "Accounting Ready",
    description: "Our exports are perfectly formatted for direct import into QuickBooks, Xero, and Sage, eliminating the need for manual cleanup.",
    icon: <BarChart3 className="text-emerald-400" size={24} />
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

        {/* Persona Section - Who it's for */}
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
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-400 rounded-full opacity-50 blur-3xl"></div>
        </div>

      </div>
    </div>
  );
}
