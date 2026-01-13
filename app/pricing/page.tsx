'use client'; 

import { useState } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null); // Track which button is loading

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }), 
      });

      if (!res.ok) throw new Error('Checkout failed');

      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      alert('Error starting checkout. Please try again.');
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-mint-900 mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 mb-16">Accurate AI bank statement conversion at any scale</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Free</h3>
            <p className="text-4xl font-bold mb-2">$0<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Try our technology</p>
            <ul className="text-left space-y-4 mb-8 flex-grow">
              <li className="flex items-start">✓ <span className="ml-2">10 pages / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Standard AI extraction</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Excel & CSV exports</span></li>
            </ul>
            <div className="bg-gray-100 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed">
              Current Plan
            </div>
          </div>

          {/* Starter Tier */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Starter</h3>
            <p className="text-4xl font-bold mb-2">$30<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Perfect for individuals</p>
            <ul className="text-left space-y-4 mb-8 flex-grow">
              <li className="flex items-start">✓ <span className="ml-2"><strong>400 pages</strong> / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">PDF & Scanned support</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Unlimited file history</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Email support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('STRIPE_STARTER_PRICE_ID')} // Replace with real ID
              disabled={!!loading}
              className="w-full bg-mint-100 text-mint-700 hover:bg-mint-200 font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading === 'STRIPE_STARTER_PRICE_ID' ? 'Processing...' : 'Choose Starter'}
            </button>
          </div>

          {/* Pro Tier — Most Popular */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-mint-500 relative flex flex-col scale-105 z-10">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-mint-500 text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold mb-4">Professional</h3>
            <p className="text-4xl font-bold mb-2">$60<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Best for Bookkeepers</p>
            <ul className="text-left space-y-4 mb-8 flex-grow">
              <li className="flex items-start">✓ <span className="ml-2"><strong>1,000 pages</strong> / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Batch uploads (up to 50)</span></li>
              <li className="flex items-start">✓ <span className="ml-2">QuickBooks/Xero formats</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Priority support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('STRIPE_PRO_PRICE_ID')} // Replace with real ID
              disabled={!!loading}
              className="w-full bg-mint-500 hover:bg-mint-600 text-white font-bold py-4 rounded-lg transition disabled:opacity-50 shadow-lg"
            >
              {loading === 'STRIPE_PRO_PRICE_ID' ? 'Processing...' : 'Start Pro Plan'}
            </button>
          </div>

          {/* Business Tier */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Business</h3>
            <p className="text-4xl font-bold mb-2">$99<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Best for Firms & Lending</p>
            <ul className="text-left space-y-4 mb-8 flex-grow">
              <li className="flex items-start">✓ <span className="ml-2"><strong>4,000 pages</strong> / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">API Access</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Custom Bank Templates</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Dedicated Account Manager</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('STRIPE_BUSINESS_PRICE_ID')} // Replace with real ID
              disabled={!!loading}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading === 'STRIPE_BUSINESS_PRICE_ID' ? 'Processing...' : 'Get Business'}
            </button>
          </div>

        </div>
        
        <p className="mt-12 text-gray-500">
          Need a custom volume or on-premise solution? <a href="mailto:support@docneat.com" className="text-mint-600 font-semibold underline">Contact us</a>
        </p>
      </div>
    </div>
  )
}
