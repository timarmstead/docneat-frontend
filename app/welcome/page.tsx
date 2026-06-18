// app/welcome/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'set-password' | 'error'>('loading');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!signInLoaded) return;

    const ticket = new URLSearchParams(window.location.search).get('__clerk_ticket');
    if (!ticket) {
      setStatus('error');
      return;
    }

    signIn.create({
      strategy: 'ticket',
      ticket,
    }).then(() => {
      setStatus('set-password');
    }).catch(() => {
      setStatus('error');
    });
  }, [signInLoaded]);

  const handleSetPassword = async () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!user) {
      setError('Not signed in. Please try the link again.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await user.updatePassword({ newPassword: password });
      router.push('/');
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">

        {status === 'loading' && (
          <>
            <div className="bg-emerald-100 p-5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#111729] mb-2">Setting up your account...</h1>
            <p className="text-slate-500">Just a moment.</p>
          </>
        )}

        {status === 'set-password' && (
          <>
            <div className="bg-emerald-100 p-5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#111729] mb-2">Welcome to DocNeat!</h1>
            <p className="text-slate-500 mb-8">Set a password to secure your account.</p>

            <div className="text-left space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Repeat your password"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleSetPassword}
                disabled={saving}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Set Password & Go to DocNeat →'}
              </button>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="bg-red-100 p-5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#111729] mb-2">Link Expired or Invalid</h1>
            <p className="text-slate-500 mb-6">This link may have already been used or has expired. Please contact support.</p>
            <a
              href="mailto:support@docneat.com"
              className="w-full inline-block bg-[#111729] hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all"
            >
              Contact Support
            </a>
          </>
        )}

      </div>
    </main>
  );
}