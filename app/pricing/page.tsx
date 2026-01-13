'use client'; 

import { useState } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = (url: string, id: string) => {
    setLoading(id);
    // Direct redirect to your Stripe Payment Link
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6 font-tight">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 mb-16">Accurate AI bank statement conversion at any scale</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Free</h3>
            <p className="text-4xl font-bold mb-2 text-slate-900">$0<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Try our technology</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-gray-600">
              <li className="flex items-start">✓ <span className="ml-2">10 pages / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Standard AI extraction</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Excel & CSV exports</span></li>
            </ul>
            <div className="bg-gray-100 text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed">
              Current Plan
            </div>
          </div>

          {/* Starter Tier */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 flex flex-col hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Starter</h3>
            <p className="text-4xl font-bold mb-2 text-slate-900">$30<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Perfect for individuals</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-gray-600">
              <li className="flex items-start">✓ <span className="ml-2"><strong>400 pages</strong> / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">PDF & Scanned support</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Unlimited file history</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Email support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('https://buy.stripe.com/3cIbJ10LfdvC2p6dJI1gs00', 'starter')}
              disabled={!!loading}
              className="w-full bg-mint-50 text-mint-700 border border-mint-200 hover:bg-mint-100 font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading === 'starter' ? 'Connecting...' : 'Choose Starter'}
            </button>
          </div>

          {/* Pro Tier — Most Popular */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-mint-500 relative flex flex-col lg:scale-110 z-10">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-mint-500 text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">Professional</h3>
            <p className="text-4xl font-bold mb-2 text-slate-900">$60<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Best for Bookkeepers</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-gray-600">
              <li className="flex items-start">✓ <span className="ml-2"><strong>1,000 pages</strong> / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Batch uploads (up to 50)</span></li>
              <li className="flex items-start">✓ <span className="ml-2">QuickBooks/Xero formats</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Priority support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('https://buy.stripe.com/14AfZhfG9bnu4xe0WW1gs01', 'pro')}
              disabled={!!loading}
              className="w-full bg-mint-500 hover:bg-mint-600 text-white font-bold py-4 rounded-lg transition disabled:opacity-50 shadow-lg"
            >
              {loading === 'pro' ? 'Connecting...' : 'Start Pro Plan'}
            </button>
          </div>

          {/* Business Tier */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 flex flex-col hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Business</h3>
            <p className="text-4xl font-bold mb-2 text-slate-900">$99<span className="text-lg font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500 mb-6">Best for Firms & Lending</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-gray-600">
              <li className="flex items-start">✓ <span className="ml-2"><strong>4,000 pages</strong> / month</span></li>
              <li className="flex items-start">✓ <span className="ml-2">API Access</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Custom Bank Templates</span></li>
              <li className="flex items-start">✓ <span className="ml-2">Dedicated Account Manager</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('https://buy.stripe.com/aFa28r2Tn2QY0gYbBA1gs02', 'business')}
              disabled={!!loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading === 'business' ? 'Connecting...' : 'Get Business'}
            </button>
          </div>

        </div>
        
        <div className="mt-20 border-t border-gray-200 pt-10">
           <p className="text-gray-500">
            Need a custom volume or on-premise solution? 
            <a href="mailto:support@docneat.com" className="ml-2 text-mint-600 font-semibold underline hover:text-mint-700">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
