// app/dashboard/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [portalError, setPortalError] = useState('');

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/');
    }
  }, [isLoaded, user]);

  if (!isLoaded || !user) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <svg className="w-10 h-10 text-emerald-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      </main>
    );
  }

  const metadata = user.publicMetadata as any;
  const credits = metadata.credits ?? 0;
  const planName = metadata.planName ?? 'Free';
  const hasSubscription = !!metadata.stripeSubscriptionId;

  const planMax: Record<string, number> = {
    Starter: 400,
    Professional: 1000,
    Business: 4000,
    Free: 3,
  };

  const maxCredits = planMax[planName] ?? 3;
  const creditsUsed = maxCredits - credits;
  const progressPercent = Math.min(100, Math.round((creditsUsed / maxCredits) * 100));

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    setPortalError('');
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPortalError('Could not open billing portal. Please try again.');
        setLoadingPortal(false);
      }
    } catch (err) {
      setPortalError('Could not open billing portal. Please try again.');
      setLoadingPortal(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 pt-32 md:pt-44 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My Account
          </h1>
          <p className="text-slate-400">
            Welcome back, {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Credits Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Page Credits</h2>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                {planName} Plan
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-white">{credits}</span>
                <span className="text-slate-400 mb-1">/ {maxCredits} pages remaining</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${100 - progressPercent}%` }}
                />
              </div>
              <p className="text-slate-500 text-sm mt-2">
                {creditsUsed} pages used this month
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                Credits reset monthly on your billing date.
              </p>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
            <h2 className="text-lg font-bold text-white mb-6">Subscription</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Current Plan</span>
                <span className="text-white font-semibold">{planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-semibold">
                  {hasSubscription ? '● Active' : '● Free Trial'}
                </span>
              </div>
            </div>

            {hasSubscription ? (
              <div className="space-y-3">
                <button
                  onClick={handleManageSubscription}
                  disabled={loadingPortal}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {loadingPortal ? 'Opening...' : 'Manage Subscription →'}
                </button>
                {portalError && (
                  <p className="text-red-400 text-sm text-center">{portalError}</p>
                )}
                <p className="text-slate-500 text-xs text-center">
                  Update payment, view invoices, or cancel
                </p>
              </div>
            ) : (
              <button
                onClick={() => router.push('/pricing')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
              >
                Upgrade Plan →
              </button>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
            <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full text-left flex items-center justify-between px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all"
              >
                <span>Convert a Statement</span>
                <span className="text-emerald-400">→</span>
              </button>
              <button
                onClick={() => router.push('/pricing')}
                className="w-full text-left flex items-center justify-between px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all"
              >
                <span>View Plans</span>
                <span className="text-emerald-400">→</span>
              </button>
              <a
                href="mailto:support@docneat.com"
                className="w-full text-left flex items-center justify-between px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all"
              >
                <span>Contact Support</span>
                <span className="text-emerald-400">→</span>
              </a>
            </div>
          </div>

          {/* Account Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
            <h2 className="text-lg font-bold text-white mb-6">Account</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Email</span>
                <span className="text-white text-sm">{user.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
            <div className="space-y-3">
              <button

                className="w-full text-left flex items-center justify-between px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all"
                onClick={() => router.push('/change-password')}
              >
                <span>Change Password</span>
                <span className="text-emerald-400">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}