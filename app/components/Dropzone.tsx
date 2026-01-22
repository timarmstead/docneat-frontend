'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [preview, setPreview] = useState<any[]>([]);

  // Helper to handle the CSV download
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

  // The Polling Function: Checks if AWS is done every 3 seconds
  const pollStatus = async (jobId: string, fileKey: string) => {
    try {
      const res = await fetch(`https://docneat-backend.onrender.com/status/${jobId}?file_key=${fileKey}`);
      if (!res.ok) throw new Error('Status check failed');
      
      const result = await res.json();

      if (result.status === "PROCESSING") {
        setStatusMessage("AWS is analyzing multi-page layout... (15-30s)");
        setTimeout(() => pollStatus(jobId, fileKey), 3000);
      } else if (result.status === "COMPLETED") {
        setPreview(result.preview || []);
        if (result.csv_content) {
          triggerDownload(result.csv_content, 'docneat-converted.csv');
        }
        setLoading(false);
        setStatusMessage("");
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
    setStatusMessage("Uploading to secure transit...");
    setPreview([]);
    
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      // STEP 1: Upload and Start Job
      const res = await fetch('https://docneat-backend.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      
      // STEP 2: Start Polling using the returned JobId
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
        className={`min-h-[400px] flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-colors
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-700 bg-slate-800/50 hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-xl text-white font-medium">{statusMessage}</p>
            <p className="text-slate-400 text-sm mt-2">Do not close this window</p>
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

      {preview.length > 0 && (
        <div className="mt-8 overflow-hidden bg-slate-800 border border-slate-700 rounded-xl shadow-2xl">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
            <h3 className="text-white font-bold">Conversion Preview (First 5 Rows)</h3>
            <span className="text-emerald-400 text-xs font-mono">Success</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-900/50">
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {preview.slice(0, 5).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-6 py-4 text-sm text-slate-300">
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
