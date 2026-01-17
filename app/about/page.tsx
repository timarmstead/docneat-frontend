import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us — DocNeat by Engaging Enterprises Ltd',
  description: 'Learn about Engaging Enterprises Ltd and our mission to provide secure, customer-focused SaaS solutions like DocNeat.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-44 pb-20">
        
        {/* Header Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            About <span className="text-emerald-400">Us</span>
          </h1>
          <p className="text-xl leading-relaxed text-slate-400">
            At the intersection of innovation and efficiency, we build tools that empower businesses to reclaim their time.
          </p>
        </section>

        {/* Corporate Identity Section */}
        <section className="space-y-8 text-lg leading-relaxed">
          <div className="bg-slate-800/40 border border-slate-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">Our Roots</h2>
            <p>
              <strong className="text-white">Engaging Enterprises Ltd</strong> is a technology and marketing company established in 2023. Since our inception, we have been dedicated to bridging the gap between complex technology and user-friendly business solutions.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
          <p>
            We strive to deliver customer-focused SaaS (Software as a Service) products that solve real-world problems. We believe that professional software shouldn't be difficult to use, nor should it compromise on security. 
          </p>
          <p>
            Whether it is streamlining marketing workflows or automating data entry, our goal is to provide high-performance tools that allow our users to focus on what matters most: <span className="text-white font-medium">growth</span>.
          </p>

          <hr className="border-slate-800 my-12" />

          {/* Product Focus: DocNeat */}
          <div className="relative group">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              About <span className="text-emerald-400">DOCNEAT.com</span>
            </h2>
            <p>
              DocNeat is our flagship solution for financial data management. Born from the frustration of manual bookkeeping, DocNeat was built to handle the heavy lifting of document conversion.
            </p>
            <p className="mt-4">
              By leveraging secure OCR technology, we provide accountants, small business owners, and bookkeepers with an instant way to turn flat PDF bank statements into actionable Excel, CSV, or QuickBooks-ready data.
            </p>
            
            {/* Highlighted Quote Section - Restored Formatting */}
            <div className="mt-10 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl italic relative overflow-hidden text-slate-200">
              <div className="relative z-10">
                "We don't just process files; we protect your data and ensure its integrity. Our <span className="text-emerald-400 font-semibold underline underline-offset-4 decoration-emerald-500/30">Zero-Storage commitment</span> combined with our <span className="text-emerald-400 font-semibold underline underline-offset-4 decoration-emerald-500/30">Precision-First extraction</span> ensures that your financial privacy and data accuracy are never an afterthought."
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
            </div>
          </div>
        </section>

        {/* CTA Section - Reverted to your exact text */}
        <section className="mt-24 text-center">
          <h3 className="text-white text-xl font-bold mb-6">Ready to see DocNeat in action?</h3>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Start Your First Conversion
          </Link>
        </section>

      </div>
    </div>
  );
}
