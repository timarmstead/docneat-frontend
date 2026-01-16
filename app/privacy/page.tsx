import React from 'react';

export const metadata = {
  title: 'Privacy Policy — DocNeat.com',
  description: 'How we protect your data and handle your financial documents.',
};

export default function PrivacyPage() {
  return (
    /* Increased top padding (pt-24 and md:pt-32) to fix navbar clutter */
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20 text-slate-300">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight">Privacy Policy</h1>
      
      <p className="mb-10 text-slate-400">
        Last Updated: January 15, 2026
      </p>

      <section className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">1. Introduction</h2>
          <p className="leading-relaxed">
            DocNeat (operated by <strong>Engaging Enterprises Ltd</strong>) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your data when you use our document conversion services. We adhere to the UK GDPR and international data protection standards.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Account Information:</strong> Name, email address, and billing information required for subscription management.</li>
            <li><strong className="text-white">Technical Data:</strong> IP address and browser type collected for security and system performance monitoring.</li>
          </ul>
        </div>

        <div className="bg-mint-900/20 p-8 rounded-2xl border border-mint-500/30 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-mint-400 font-bold">3. Immediate Deletion Guarantee</h2>
          <p className="leading-relaxed text-slate-200 font-medium">
            Your financial privacy is our priority. Any uploaded statements (PDFs, images, or scans) are processed in volatile memory and are deleted immediately after the data extraction to CSV or Excel is complete. 
          </p>
          <p className="leading-relaxed text-slate-400 mt-3 text-sm italic">
            We do not store your financial statement data, nor do we sell, rent, or trade your personal information to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">4. Data Security & Processing</h2>
          <p className="leading-relaxed mb-3">
            To ensure the highest level of security, we employ the following measures:
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li><strong className="text-white">No Long-term Storage:</strong> As noted above, uploaded files are purged from our systems the moment the conversion is finished.</li>
            <li><strong className="text-white">Encryption:</strong> All data is transmitted via industry-standard HTTPS/TLS encryption.</li>
            <li><strong className="text-white">Automated Processing:</strong> Files are handled by automated scripts; no human staff members view your documents unless you explicitly request technical support for a specific file error.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">5. Global Data Compliance</h2>
          <p className="leading-relaxed">
            As a UK-based company, we process data in compliance with the UK GDPR. For our international clients, including those in the EU and USA, we ensure that any cross-border data transfers are protected by Standard Contractual Clauses (SCCs) to ensure your data remains protected to the highest standard.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">6. Your Rights</h2>
          <p className="leading-relaxed mb-3">
            Under the GDPR, you have the following rights:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The right to access and download a copy of your personal account data.</li>
            <li>The right to request the deletion of your account.</li>
            <li>The right to withdraw consent at any time.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">7. Contact Information</h2>
          <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 shadow-inner">
            <p className="font-bold text-white text-lg mb-1">Engaging Enterprises Ltd</p>
            <p className="text-slate-300">Monomark House, 27 Old Gloucester Street</p>
            <p className="text-slate-300">London, England, WC1N 3AX</p>
            <p className="mt-4 text-xs font-mono tracking-widest text-slate-500 uppercase">Company No: 14111995</p>
          </div>
        </div>
      </section>
    </div>
  );
}
