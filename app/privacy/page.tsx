import React from 'react';

export const metadata = {
  title: 'Privacy Policy — DocNeat.com',
  description: 'How we protect your data and handle your financial documents.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
      
      <p className="mb-6 text-gray-600">
        Last Updated: January 15, 2026
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Introduction</h2>
          <p className="leading-relaxed">
            DocNeat (operated by <strong>Engaging Enterprises Ltd</strong>) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your data when you use our document conversion services. We adhere to the UK GDPR and international data protection standards.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, and billing information required for subscription management.</li>
            <li><strong>Uploaded Documents:</strong> Financial files (bank statements, invoices, receipts) that you upload for conversion.</li>
            <li><strong>Technical Data:</strong> IP address and browser type collected for security and system performance monitoring.</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-3 text-blue-900">3. Our "No Third-Party" Guarantee</h2>
          <p className="leading-relaxed text-blue-800">
            We do not sell, rent, or trade your personal data or uploaded documents to any third parties. Your data is used exclusively to provide the service you have requested. We do not use your financial data for training third-party AI models without your explicit, separate consent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Data Security & Storage</h2>
          <p className="leading-relaxed mb-3">
            Your security is our priority. We employ industry-standard measures including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Full HTTPS/TLS encryption for all data in transit.</li>
            <li>Encrypted storage for files awaiting processing.</li>
            <li>Automatic deletion of processed files from our temporary servers after a set period.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">5. International Clients (EU, US, etc.)</h2>
          <p className="leading-relaxed">
            As a UK-based company, we process data in compliance with the UK GDPR. For our international clients, including those in the EU and USA, we ensure that any cross-border data transfers are protected by Standard Contractual Clauses (SCCs) or other legally recognized safety frameworks to ensure your data remains protected to the highest standard.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Your Rights</h2>
          <p className="leading-relaxed mb-3">
            Under the GDPR, you have the following rights:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The right to access and download a copy of your personal data.</li>
            <li>The right to request the deletion of your account and all associated data.</li>
            <li>The right to withdraw consent at any time.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">7. Contact Information</h2>
          <div className="text-gray-600 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="font-bold text-gray-900">Engaging Enterprises Ltd</p>
            <p>Monomark House, 27 Old Gloucester Street</p>
            <p>London, England, WC1N 3AX</p>
            <p className="mt-2 text-sm italic">Company No: 14111995</p>
          </div>
        </div>
      </section>
    </div>
  );
}
