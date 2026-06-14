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
        
        // PAGE-BASED CREDIT LOGIC
        const pagesProcessed = result.page_count || 1;
        const nextCount = Math.max(0, credits - pagesProcessed);
        setCredits(nextCount);
        
        if (!isSignedIn) {
          localStorage.setItem('docneat_guest_credits', nextCount.toString());
        }

        setShowSuccess(true);
        if (result.csv_content) {
          setCsvData(result.csv_content);
          const blob = new Blob([result.csv_content], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'docneat-converted.csv');
          document.body.appendChild(link);
          link.click();
          
          if (isSignedIn) {
            try {
              await subtractCredit();
              await user?.reload();
            } catch (err) {
              console.error("Sync error:", err);
            }
          }
        }
      }
    } catch (e) {
      setError("Connection lost. Please try again.");
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (credits <= 0) {
      router.push('/pricing');
      return;
    }
    setLoading(true); setShowSuccess(false); setError(null); setProgress(5);
    
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      const res = await fetch('https://docneat-backend.onrender.com/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${await getToken()}` },
        body: formData,
      });
      const data = await res.json();
      if (data.job_id) pollStatus(data.job_id, data.file_key);
    } catch (e) { setError("The upload failed."); setLoading(false); }
  }, [credits, router, getToken]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] }, 
    multiple: false 
  });

  return (
    <div className="w-full">
      <div {...getRootProps()} className={`min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300 shadow-xl ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-400'}`}>
        <input {...getInputProps()} />
        {loading ? (
            <p className="text-xl text-[#111729] font-medium">Processing...</p>
        ) : (
            <div className="text-center px-6">
                <div className="bg-emerald-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl text-emerald-600">📄</span>
                </div>
                <p className="text-2xl font-bold text-[#111729] mb-2">
                    {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF bank statement"}
                </p>
                {!isSyncing && (
                    <p className="text-slate-500 font-medium mb-4">
                        {isSignedIn 
                            ? (credits > 0 ? `You have ${credits} page credits remaining` : "Trial complete. Upgrade for instant, unlimited access.")
                            : (credits > 0 ? `First 3 conversions are free (${credits} left)` : "Trial complete. Sign in to continue.")}
                    </p>
                )}
            </div>
        )}
      </div>
    </div>
  );
}