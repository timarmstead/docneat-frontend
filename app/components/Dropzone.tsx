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
  
  const [credits, setCredits] = useState<number>(3);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        const userCredits = (user.publicMetadata as any).credits;
        setCredits(userCredits !== undefined ? userCredits : 3);
      } else {
        const savedCredits = localStorage.getItem('docneat_guest_credits');
        setCredits(savedCredits !== null ? parseInt(savedCredits) : 3);
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

      if (result.status === "PROCESSING") {
        setTimeout(() => pollStatus(jobId, fileKey), 3000);
      } else if (result.status === "COMPLETED") {
        setPreview(result.preview || []);
        setProgress(100);
        
        // Page-based credit logic
        const pagesToDeduct = result.page_count || 1;
        const nextCount = Math.max(0, credits - pagesToDeduct);
        
        setCredits(nextCount);
        if (!isSignedIn) localStorage.setItem('docneat_guest_credits', nextCount.toString());

        setShowSuccess(true);
        if (result.csv_content) {
          const blob = new Blob([result.csv_content], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'docneat-converted.csv');
          document.body.appendChild(link);
          link.click();
          
          if (isSignedIn) await subtractCredit(); // Ensure your server-side action deducts pages
        }
      }
    } catch (e) { setError("Connection lost."); setLoading(false); }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (credits <= 0) { router.push('/pricing'); return; }
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
    } catch (e) { setError("Upload failed."); setLoading(false); }
  }, [credits, getToken, router]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, accept: {'application/pdf': ['.pdf']}, multiple: false });

  return (
    <div className="w-full">
      <div {...getRootProps()} className="min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-all border-slate-200 bg-white hover:border-emerald-400">
        <input {...getInputProps()} />
        {/* UI remains exactly as you had it */}
        <p className="text-2xl font-bold text-[#111729] mb-2">
            {loading ? "Processing..." : isDragActive ? "Drop PDF" : "Drag & drop a PDF bank statement"}
        </p>
      </div>
    </div>
  );
}