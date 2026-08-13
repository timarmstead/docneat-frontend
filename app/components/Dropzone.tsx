'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { subtractCredit } from '../actions/credits';

const BACKEND_URL = 'https://docneat-backend.onrender.com';

// GA4 event helper
const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

interface FileJob {
  file: File;
  jobId?: string;
  fileKey?: string;
  status: 'pending' | 'uploading' | 'processing' | 'done' | 'error';
  pageCount?: number;
  csvContent?: string;
  error?: string;
}

export default function Dropzone() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const [jobs, setJobs] = useState<FileJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(3);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        const userCredits = (user.publicMetadata as any).credits;
        setCredits(userCredits !== undefined ? userCredits : 3);
      } else {
        const savedCredits = localStorage.getItem('docneat_guest_credits');
        if (savedCredits !== null) {
          setCredits(parseInt(savedCredits));
        } else {
          setCredits(3);
          localStorage.setItem('docneat_guest_credits', '3');
        }
      }
      setIsSyncing(false);
    }
  }, [isLoaded, isSignedIn, user]);

  const updateJob = (index: number, updates: Partial<FileJob>) => {
    setJobs(prev => prev.map((j, i) => i === index ? { ...j, ...updates } : j));
  };

  const pollStatus = async (jobId: string, fileKey: string, index: number) => {
    try {
      const token = await getToken();
      const res = await fetch(`${BACKEND_URL}/status/${jobId}?file_key=${fileKey}&t=${Date.now()}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      const result = await res.json();

      if (res.status === 422 || result.status === 'ERROR') {
        updateJob(index, { status: 'error', error: result.message || 'Invalid bank statement format.' });
        trackEvent('conversion_failed', {
          error_message: result.message || 'Invalid bank statement format.',
          user_type: isSignedIn ? 'signed_in' : 'guest',
        });
        return;
      }

      if (result.status === 'PROCESSING') {
        setTimeout(() => pollStatus(jobId, fileKey, index), 3000);
      } else if (result.status === 'COMPLETED') {
        updateJob(index, {
          status: 'done',
          csvContent: result.csv_content,
          pageCount: result.page_count || 1,
        });
        if (result.preview?.length > 0 && preview.length === 0) {
          setPreview(result.preview);
        }
      }
    } catch (e) {
      updateJob(index, { status: 'error', error: 'Connection lost. Please try again.' });
      trackEvent('conversion_failed', {
        error_message: 'Connection lost',
        user_type: isSignedIn ? 'signed_in' : 'guest',
      });
    }
  };

  const uploadFile = async (file: File, index: number) => {
    updateJob(index, { status: 'uploading' });
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = await getToken();
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (data.job_id) {
        updateJob(index, { status: 'processing', jobId: data.job_id, fileKey: data.file_key });
        pollStatus(data.job_id, data.file_key, index);
      } else {
        updateJob(index, { status: 'error', error: 'Upload failed.' });
        trackEvent('conversion_failed', {
          error_message: 'Upload failed',
          user_type: isSignedIn ? 'signed_in' : 'guest',
        });
      }
    } catch (e) {
      updateJob(index, { status: 'error', error: 'Upload failed.' });
      trackEvent('conversion_failed', {
        error_message: 'Upload failed',
        user_type: isSignedIn ? 'signed_in' : 'guest',
      });
    }
  };

  // Watch jobs — when all are done, merge CSVs and trigger download
  useEffect(() => {
    if (jobs.length === 0) return;
    const allComplete = jobs.every(j => j.status === 'done' || j.status === 'error');
    if (!allComplete) return;

    const completedJobs = jobs.filter(j => j.status === 'done' && j.csvContent);
    if (completedJobs.length === 0) return;

    setAllDone(true);
    setIsProcessing(false);

    // Merge all CSVs — keep header from first file only
    const csvParts = completedJobs.map((j, i) => {
      const lines = (j.csvContent as string).split('\n');
      return i === 0 ? lines.join('\n') : lines.slice(1).join('\n');
    });
    const mergedCsv = csvParts.join('\n');

    // Trigger download
    const blob = new Blob([mergedCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'docneat-converted.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Deduct credits
    const totalPages = completedJobs.reduce((sum, j) => sum + (j.pageCount || 1), 0);
    const nextCredits = Math.max(0, credits - totalPages);
    setCredits(nextCredits);

    // Track successful conversion
    trackEvent('conversion_completed', {
      files_converted: completedJobs.length,
      total_pages: totalPages,
      user_type: isSignedIn ? 'signed_in' : 'guest',
      credits_remaining: nextCredits,
    });

    if (!isSignedIn) {
      localStorage.setItem('docneat_guest_credits', nextCredits.toString());
    } else {
      subtractCredit(totalPages).then(() => user?.reload()).catch(console.error);
    }
  }, [jobs]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (credits <= 0) {
      trackEvent('upgrade_clicked', {
        trigger: 'no_credits',
        user_type: isSignedIn ? 'signed_in' : 'guest',
      });
      router.push('/pricing');
      return;
    }

    // Track file drop
    trackEvent('conversion_started', {
      file_count: acceptedFiles.length,
      user_type: isSignedIn ? 'signed_in' : 'guest',
      credits_available: credits,
    });

    setError(null);
    setAllDone(false);
    setPreview([]);
    setIsProcessing(true);

    const newJobs: FileJob[] = acceptedFiles.map(file => ({ file, status: 'pending' }));
    setJobs(newJobs);

    // Upload all files in parallel
    acceptedFiles.forEach((file, index) => uploadFile(file, index));
  }, [credits, router, getToken, isSignedIn]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
  });

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJobs([]);
    setAllDone(false);
    setPreview([]);
    setError(null);
    setIsProcessing(false);
    setTimeout(() => open(), 100);
  };

  const completedCount = jobs.filter(j => j.status === 'done').length;
  const errorCount = jobs.filter(j => j.status === 'error').length;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300 shadow-xl
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />

        {isProcessing || allDone ? (
          <div className="text-center w-full max-w-md px-10">
            {allDone ? (
              <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl text-[#111729] font-bold mb-2">
                  {completedCount} of {jobs.length} file{jobs.length > 1 ? 's' : ''} converted
                </p>
                {errorCount > 0 && (
                  <p className="text-red-500 text-sm mb-3">{errorCount} file{errorCount > 1 ? 's' : ''} failed — check the format and try again.</p>
                )}
                <p className="text-slate-500 mb-6 text-center max-w-sm">
                  {credits > 0
                    ? `Nice! You've just saved hours of manual work. You have ${credits} free conversion${credits === 1 ? '' : 's'} remaining.`
                    : "Ready to automate your entire workflow? You've reached the end of your free trial, but you're just one click away from unlimited speed."}
                </p>
                <div className="flex gap-3">
                  {credits > 0 ? (
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-[#111729] hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                    >
                      Convert Next Statement
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        trackEvent('upgrade_clicked', {
                          trigger: 'trial_complete',
                          user_type: isSignedIn ? 'signed_in' : 'guest',
                        });
                        router.push('/pricing');
                      }}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                    >
                      Upgrade Now
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <p className="text-lg font-semibold text-[#111729] mb-4">
                  Processing {jobs.length} file{jobs.length > 1 ? 's' : ''}...
                </p>
                {jobs.map((job, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      job.status === 'done' ? 'bg-emerald-500' :
                      job.status === 'error' ? 'bg-red-500' :
                      'bg-amber-400 animate-pulse'
                    }`} />
                    <span className="text-slate-600 truncate max-w-[200px]">{job.file.name}</span>
                    <span className="text-slate-400 ml-auto capitalize flex-shrink-0">
                      {job.status === 'uploading' ? 'Uploading...' :
                       job.status === 'processing' ? 'Extracting...' :
                       job.status === 'done' ? 'Done ✓' :
                       job.status === 'error' ? 'Failed' : 'Waiting...'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : error ? (
          <div className="text-center px-10">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button onClick={() => setError(null)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm">
              Try again
            </button>
          </div>
        ) : (
          <div className="text-center px-6">
            <div className="bg-emerald-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-emerald-600">📄</span>
            </div>
            <p className="text-2xl font-bold text-[#111729] mb-2">
              {isDragActive ? 'Drop the PDFs here' : 'Drag & drop one or more PDF bank statements'}
            </p>

            {!isSyncing && (
              <div className="flex flex-col items-center">
                <p className="text-slate-500 font-medium mb-4">
                  {isSignedIn
                    ? (credits > 0
                        ? `You have ${credits} page credit${credits === 1 ? '' : 's'} remaining`
                        : 'Trial complete. Sign in to continue.')
                    : (credits > 0
                        ? `First 3 conversions are free (${credits} left)`
                        : 'Trial complete. Sign in to continue.')}
                </p>
                {credits <= 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      trackEvent('upgrade_clicked', {
                        trigger: 'no_credits_banner',
                        user_type: isSignedIn ? 'signed_in' : 'guest',
                      });
                      router.push('/pricing');
                    }}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                  >
                    Upgrade Now
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {preview.length > 0 && (
        <div className="mt-8 overflow-hidden bg-white border border-slate-200 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="text-[#111729] font-bold">Conversion Preview</h3>
            <span className="text-emerald-600 text-xs font-mono uppercase tracking-widest font-bold">Live Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {preview.slice(0, 5).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-6 py-4 text-sm text-slate-600">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}