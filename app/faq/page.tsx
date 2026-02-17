import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions — DocNeat.com',
  description: 'Everything you need to know about DocNeat: Security, accuracy, file formats, and pricing for bank statement conversion.',
};

const faqs = [
  {
    question: "Is my financial data secure?",
    answer: "Absolutely. We employ an 'Immediate Deletion' policy. Your files are processed in temporary memory and permanently deleted the second your conversion is complete. We never store, view, or sell your data."
  },
  {
    question: "What file formats do you support?",
    answer: "We primarily convert PDF bank statements (both digital and scanned) into clean, structured Excel (.xlsx) or CSV files. We also support receipt and invoice extraction."
  },
  {
    question: "How accurate is the AI extraction?",
    answer: "Our specialized financial OCR model delivers verified data accuracy. It is designed to handle complex bank layouts, multi-page statements, and even slightly blurry scans."
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You can start converting immediately without a sign-up. We believe in removing friction so you can get your work done faster."
  },
  {
    question: "Which banks are supported?",
    answer: "DocNeat works with almost all major global banks, including Chase, Amex, HSBC, Barclays, and Wells Fargo. If your statement has columns for date, description, and amount, we can process it."
  },
  {
    question: "What happens if a statement fails to convert?",
    answer: "While rare, if a file doesn't process correctly, you aren't charged for that page. Our support team is also available to help optimize custom templates for business users."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-32 md:pt-44 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Frequently Asked <span className="text-emerald-400">Questions</span>
          </h1>
          <p className="text-lg text-slate-400">
            Everything you need to know about our secure conversion process.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-start">
                <span className="text-emerald-500 mr-3">Q.</span>
                {faq.question}
              </h3>
              <p className="text-slate-400 leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center p-10 rounded-3xl bg-gradient-to-b from-slate-800/50 to-transparent border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-slate-400 mb-8">
            Our team is here to help with custom bank templates or high-volume API requests.
          </p>
          <a 
            href="mailto:support@docneat.com" 
            className="inline-flex items-center justify-center bg-white hover:bg-slate-200 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all active:scale-95"
          >
            Contact Support
          </a>
        </div>

        {/* Home Link */}
        <div className="text-center mt-12">
          <Link href="/" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
