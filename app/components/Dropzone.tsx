'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { subtractCredit } from '../actions/credits';

export default function Dropzone() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("DocNeat is securing your data...");
  const [preview, setPreview] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  
  const [credits, setCredits] = useState<number>(3);
  const [isSyncing, setIsSyncing] = useState(true);

  // Initial Sync from Clerk
  useEffect(() => {
    if (isLoaded && isSyncing) {
      if (isSignedIn && user) {
        const userCredits = (user.publicMetadata as any).credits;
        setCredits(userCredits !== undefined ? userCredits : 3);
      }
      setIsSyncing(false);
    }
  }, [isLoaded, isSignedIn, user, isSyncing]);

  const getBrandedMessage = (prog: number) => {
    if (prog < 20) return "DocNeat is securing your data...";
    if (prog < 45) return "Analyzing structural layout...";
    if (prog < 70) return "Precisely aligning financial tables...";
    if (prog < 90) return "Refining transaction descriptions...";
    return "Finalizing your export...";
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading && !showSuccess && !error) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) return prev + 3; 
          if (prev < 75) return prev + 1.5; 
          if (prev < 95) return prev + 0.3; 
          return prev;
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [loading, showSuccess, error]);

  useEffect(() => {
    if (loading && !showSuccess) {
      setStatusMessage(getBrandedMessage(progress));
    }
  }, [progress, loading, showSuccess]);

  const triggerDownload = (csvContent: string, filename: string) => {
    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const pollStatus = async (jobId: string, fileKey: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`https://docneat-backend.onrender.com/status/${jobId}?file_key=${fileKey}&t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();

      if (res.status === 422 || result.status === "ERROR") {
        setError(result.message || "Invalid bank statement format.");
        setLoading(false);
        return;
      }

      if (result.status === "PROCESSING") {
        setTimeout(() => pollStatus(jobId, fileKey), 3000);
      } else if (result.status === "COMPLETED") {
        setPreview(result.preview || []);
        setProgress(100);
        
        // Immediate UI Update
        const nextCount = Math.max(0, credits - 1);
        setCredits(nextCount);
        setShowSuccess(true);

        if (result.csv_content) {
          setCsvData(result.csv_content);
          triggerDownload(result.csv_content, 'docneat-converted.csv');
          
          if (isSignedIn) {
            // Background database sync
            subtractCredit().catch(e => console.error("Credit sync failed:", e));
          }
        }
      }
    } catch (e) {
      setError("Connection lost. Please try again.");
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (isSignedIn && credits <= 0) {
      router.push('/pricing');
      return;
    }

    setLoading(true);
    setShowSuccess(false);
    setError(null);
    setProgress(5);
    
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = await getToken();
      const res = await fetch('https://docneat-backend.onrender.com/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.job_id) {
        pollStatus(data.job_id, data.file_key);
      }
    } catch (e) {
      setError("The upload failed.");
      setLoading(false);
    }
  }, [isSignedIn, credits, router, getToken]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] }, 
    multiple: false 
  });

  const handleResetAndOpen = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setPreview([]);
    setCsvData(null);
    setError(null);
    setProgress(0);
    setLoading(false);
    setShowSuccess(false);
    setTimeout(() => open(), 100);
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300 shadow-xl
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />
        
        {loading ? (
          <div className="text-center w-full max-w-md px-10">
            {showSuccess ? (
              <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl text-[#111729] font-bold">Data Extracted Successfully</p>
                
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-slate-500 mb-6 text-center max-w-sm">
                    {credits > 0 
                      ? `Nice! You've just saved hours of manual work. You have ${credits} free conversion${credits === 1 ? '' : 's'} remaining.`
                      : "Ready to automate your entire workflow? You've reached the end of your free trial, but you're just one click away from unlimited speed."
                    }
                  </p>
                  
                  <div className="flex gap-3">
                    {credits > 0 ? (
                      <button 
                        onClick={handleResetAndOpen} 
                        className="px-6 py-3 bg-[#111729] hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                      >
                        Convert Next Statement
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => { e.stopPropagation(); router.push('/pricing'); }}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                      >
                        Upgrade Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xl text-[#111729] font-medium">{statusMessage}</p>
              </div>
            )}
          </div>
        ) : error ? (
          <div className="text-center px-10">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button onClick={() => {setLoading(false); setError(null);}} className="px-4 py-2 bg-slate-100 rounded-lg text-sm">Try again</button>
          </div>
        ) : (
          <div className="text-center px-6">
            <div className="bg-emerald-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-emerald-600">📄</span>
            </div>
            <p className="text-2xl font-bold text-[#111729] mb-2">
              {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF bank statement"}
            </p>
            
            {!isSyncing && (
              <div className="flex flex-col items-center">
                <p className="text-slate-500 font-medium mb-4">
                  {isSignedIn 
                    ? (credits > 0 
                        ? `You have ${credits} conversion${credits === 1 ? '' : 's'} remaining` 
                        : "Trial complete. Upgrade for instant, unlimited access.")
                    : "First 3 conversions are free"}
                </p>
                {isSignedIn && credits <= 0 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); router.push('/pricing'); }}
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