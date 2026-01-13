'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
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
      setPreview(data.preview || []);

      // Handle Downloads
      const downloadFile = async (url: string, filename: string) => {
        const fullUrl = url.startsWith('http') ? url : `https://docneat-backend.onrender.com${url}`;
        const res = await fetch(fullUrl);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      };

      if (data.excel_url) await downloadFile(data.excel_url, 'docneat-converted.xlsx');
      if (data.csv_url) await downloadFile(data.csv_url, 'docneat-converted.csv');

    } catch (e) {
      console.error(e);
      alert('Something went wrong. Please try again with a smaller file.');
    } finally {
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
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-white hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Processing your document...</p>
          </div>
        ) : (
          <div className="text-center px-6">
            <p className="text-2xl font-medium text-gray-700 mb-2">
              {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF bank statement"}
            </p>
            <p className="text-gray-500">or click to select a file from your computer</p>
          </div>
        )}
      </div>

      {preview.length > 0 && (
        <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {preview.slice(0, 5).map((row, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm text-gray-600">{JSON.stringify(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
