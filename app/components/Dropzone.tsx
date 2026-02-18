'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [preview, setPreview] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } else {
      if (!showSuccess) setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading, showSuccess, error]);

  useEffect(() => {
    if (loading && !showSuccess && !error) {
      setStatusMessage(getBrandedMessage(progress));
    }
  }, [progress, loading, showSuccess, error]);

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
      const result = await res.json();

      if (res.status === 422 || result.status === "ERROR") {
        setError(result.message || "Invalid bank statement format.");
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error('Status check failed');

      if (result.status === "PROCESSING") {
        setTimeout(() => pollStatus(jobId, fileKey), 3000);
      } else if (result.status === "COMPLETED") {
        setPreview(result.preview || []);
        if (result.csv_content) {
          triggerDownload(result.csv_content, 'docneat-converted.csv');
        }
        setProgress(100);
        setShowSuccess(true);
      } else {
        throw new Error('Analysis failed on server');
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong with the connection. Please try again.");
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    setShowSuccess(false);
    setError(null);
    setPreview([]);
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
      setError("The upload failed. Please check your internet connection.");
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false 
  });

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setLoading(false);
    setShowSuccess(false);
    setError(null);
    setPreview([]);
    setProgress(0);
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
              <div className="flex flex-col items-center">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl text-[#111729] font-bold">Statement Converted</p>
                <p className="text-slate-500 mt-2">Your CSV has been downloaded successfully.</p>
                <button 
                  onClick={handleReset}
                  className="mt-8 px-6 py-2 bg-[#111729] hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Process Another File
                </button>
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
                <p className="text-slate-400 text-sm mt-3 italic">Do not close this window</p>
              </div>
            )}
          </div>
        ) : error ? (
          <div className="text-center px-10">
            <div className="bg-red-100 text-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xl text-[#111729] font-bold">Unrecognized Format</p>
            <p className="text-slate-500 mt-2 mb-6">{error}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              Try a different file
            </button>
          </div>
        ) : (
          <div className="text-center px-6">
            <div className="bg-emerald-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-emerald-600">📄</span>
            </div>
            <p className="text-2xl font-bold text-[#111729] mb-2">
              {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF bank statement"}
            </p>
            <p className="text-slate-500">or click to select a file from your computer</p>
          </div>
        )}
      </div>

      {preview.length > 0 && (
        <div className="mt-8 overflow-hidden bg-white border border-slate-200 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="text-[#111729] font-bold">Conversion Preview</h3>
            <span className="text-emerald-600 text-xs font-mono uppercase tracking-widest">Success</span>
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
                      <td key={j} className="px-6 py-4 text-sm text-slate-600">
                        {val}
                      </td>
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