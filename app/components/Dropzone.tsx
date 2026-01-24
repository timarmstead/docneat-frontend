'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [preview, setPreview] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Logic for Branded Status Messages
  const getBrandedMessage = (prog: number) => {
    if (prog < 20) return "DocNeat is securing your data...";
    if (prog < 45) return "Analyzing structural layout...";
    if (prog < 70) return "Precisely aligning financial tables...";
    if (prog < 90) return "Refining transaction descriptions...";
    return "Finalizing your export...";
  };

  // 2. Simulated Progress Bar Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading && !showSuccess) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) return prev + 3; // Initial surge
          if (prev < 75) return prev + 1.5; // Processing
          if (prev < 95) return prev + 0.3; // High-precision phase
          return prev;
        });
      }, 600);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading, showSuccess]);

  // Update message whenever progress changes
  useEffect(() => {
    if (loading && !showSuccess) {
      setStatusMessage(getBrandedMessage(progress));
    }
  }, [progress, loading, showSuccess]);

  const triggerDownload = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pollStatus = async (jobId: string, fileKey: string) => {
    try {
      const res = await fetch(`https://docneat-backend.onrender.com/status/${jobId}?file_key=${fileKey}`);
      if (!res.ok) throw new Error('Status check failed');
      
      const result = await res.json();

      if (result.status === "PROCESSING") {
        // Keep polling every 3 seconds
        setTimeout(() => pollStatus(jobId, fileKey), 3000);
      } else if (result.status === "COMPLETED") {
        setShowSuccess(true);
        setPreview(result.preview || []);
        if (result.csv_content) {
          triggerDownload(result.csv_content, 'docneat-converted.csv');
        }
        
        // Transition from "Success" back to normal state after a delay
        setTimeout(() => {
          setLoading(false);
          setShowSuccess(false);
        }, 2500);
      } else {
        throw new Error('Analysis failed on server');
      }
    } catch (e) {
      console.error(e);
      alert('Error checking document status.');
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    setPreview([]);
    setShowSuccess(false);
    setProgress(5);
    
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://docneat-backend.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      if (data.job_id) {
        pollStatus(data.job_id, data.file_key);
      } else {
        throw new Error('No Job ID received');
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Please check your connection or file format.');
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false 
  });

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300
          ${isDragActive ? 'border-emerald-500 bg-emerald-50/10' : 'border-slate-700 bg-slate-800/50 hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />
        
        {loading ? (
          <div className="text-center w-full max-w-md px-10">
            {showSuccess ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-full mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl text-white font-bold">Statement Converted</p>
                <p className="text-slate-400 mt-2">Your CSV has been downloaded successfully.</p>
              </div>
            ) : (
              <div className="w-full">
                {/* Minimalist Progress Bar */}
                <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xl text-white font-medium">{statusMessage}</p>
                <p className="text-slate-500 text-sm mt-3 italic">Do not close this window</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center px-6">
            <div className="bg-emerald-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📄</span>
            </div>
            <p className="text-2xl font-medium text-white mb-2">
              {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF bank statement"}
            </p>
            <p className="text-slate-400">or click to select a file from your computer</p>
          </div>
        )}
      </div>

      {/* Point 3 Excluded: Keeping your original table logic exactly as is */}
      {preview.length > 0 && (
        <div className="mt-8 overflow-hidden bg-slate-800 border border-slate-700 rounded-xl shadow-2xl">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
            <h3 className="text-white font-bold">
