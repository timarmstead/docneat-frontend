// app/pricing/page.tsx
'use client'; 

import { useState } from 'react';

// GA4 event helper
const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, id: string, planName: string, planPrice: number) => {
    setLoading(id);

    // Track checkout initiation
    trackEvent('checkout_initiated', {
      plan_name: planName,
      plan_price: planPrice,
      currency: 'USD',
    });
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No URL returned from checkout API');
        setLoading(null);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 pt-32 md:pt-44 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Secure, accurate bank statement conversion at any scale. 
            <span className="block text-emerald-400 mt-2 text-lg">First 3 statements are on us.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Starter Tier */}
          <div className="bg-slate-800/40 rounded-2xl shadow-sm p-8 border border-slate-800 flex flex-col hover:border-slate-700 transition">
            <h3 className="text-xl font-bold mb-4 text-white">Starter</h3>
            <p className="text-4xl font-bold mb-2 text-white">$30<span className="text-lg font-normal text-slate-500">/mo</span></p>
            <p className="text-sm text-slate-500 mb-6">Perfect for individuals & freelancers</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-slate-400">
              <li className="flex items-start text-sm">✓ <span className="ml-2"><strong>400 pages</strong> / month</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">PDF & Scanned support</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">Unlimited file history</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">Email support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('price_1Tnd0LGWw5FE61zB1vFKR0TK', 'starter', 'Starter', 30)}
              disabled={!!loading}
              className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-bold py-3 rounded-xl transition disabled:opacity-50 text-sm"
            >
              {loading === 'starter' ? 'Connecting...' : 'Choose Starter'}
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-800/60 rounded-2xl shadow-2xl p-8 border-4 border-emerald-500 relative flex flex-col md:scale-105 z-10">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Professional</h3>
            <p className="text-4xl font-bold mb-2 text-white">$60<span className="text-lg font-normal text-slate-500">/mo</span></p>
            <p className="text-sm text-slate-400 mb-6">Best for Bookkeepers & Accountants</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-slate-300">
              <li className="flex items-start text-sm">✓ <span className="ml-2"><strong>1,000 pages</strong> / month</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">Batch uploads (up to 50)</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">QuickBooks/Xero formats</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">Priority support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('price_1Tnd18GWw5FE61zBX1BGIvpm', 'pro', 'Professional', 60)}
              disabled={!!loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50 shadow-lg active:scale-95"
            >
              {loading === 'pro' ? 'Connecting...' : 'Start Pro Plan'}
            </button>
          </div>

          {/* Business Tier */}
          <div className="bg-slate-800/40 rounded-2xl shadow-sm p-8 border border-slate-800 flex flex-col hover:border-slate-700 transition">
            <h3 className="text-xl font-bold mb-4 text-white">Business</h3>
            <p className="text-4xl font-bold mb-2 text-white">$99<span className="text-lg font-normal text-slate-500">/mo</span></p>
            <p className="text-sm text-slate-500 mb-6">Best for Firms & High Volume</p>
            <ul className="text-left space-y-4 mb-8 flex-grow text-slate-400">
              <li className="flex items-start text-sm">✓ <span className="ml-2"><strong>4,000 pages</strong> / month</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">API Access</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">Custom Bank Templates</span></li>
              <li className="flex items-start text-sm">✓ <span className="ml-2">Dedicated Account Manager</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('price_1T3EgWGWw5FE61zBCy208ve3', 'business', 'Business', 99)}
              disabled={!!loading}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 rounded-xl transition disabled:opacity-50 text-sm active:scale-95"
            >
              {loading === 'business' ? 'Connecting...' : 'Get Business'}
            </button>
          </div>

        </div>
        
        <div className="mt-24 border-t border-slate-800 pt-10">
          <p className="text-slate-500">
            Need a custom volume or on-premise solution? 
            <a href="mailto:support@docneat.com" className="ml-2 text-emerald-400 font-semibold underline hover:text-emerald-300 transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}