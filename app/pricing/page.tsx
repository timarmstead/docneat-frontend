import Link from 'next/link'
import { useState } from 'react';  // NEW: For loading state if wanted

export default function Pricing() {
  const [loading, setLoading] = useState(false);  // Optional: For button loading

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_1SdHnXGWw5FE61zBNcv5v8eZ' }),  // <-- Update with your real Stripe Price ID
      });

      if (!res.ok) throw new Error('Checkout failed');

      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      alert('Error starting checkout. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-mint-900 mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 mb-16">Choose the plan that fits you</p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-5xl font-bold mb-2">$0<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="text-left space-y-4 mb-8">
              <li>✓ 10 conversions/month</li>
              <li>✓ PDF & scanned support</li>
              <li>✓ Excel + CSV export</li>
            </ul>
            <div className="bg-gray-200 text-gray-500 py-4 rounded-lg cursor-not-allowed">Current Plan</div>
          </div>

          {/* Pro — Most Popular */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-mint-500 relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-mint-500 text-white px-6 py-2 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-5xl font-bold mb-2">$9<span className="text-lg font-normal text-gray-500">/month</span></p>
            <p className="text-gray-500 mb-6">or $79/year (27% off)</p>
            <ul className="text-left space-y-4 mb-8">
              <li>✓ Unlimited conversions</li>
              <li>✓ Batch upload (up to 50 files)</li>
              <li>✓ Priority support</li>
              <li>✓ Remove "Powered by DocNeat" badge</li>
            </ul>
            <form onSubmit={handleCheckout}>  {/* CHANGED: Add onSubmit handler */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-mint-500 hover:bg-mint-600 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Start Pro Plan'}
              </button>
            </form>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-5xl font-bold mb-2">$99<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="text-left space-y-4 mb-8">
              <li>✓ Everything in Pro</li>
              <li>✓ API access</li>
              <li>✓ Custom bank templates</li>
              <li>✓ White-label option</li>
            </ul>
            <a href="mailto:support@docneat.com" className="block w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-lg text-center transition">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
