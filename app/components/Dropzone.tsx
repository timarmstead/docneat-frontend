'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
    const res = await fetch('https://docneat-backend.onrender.com/upload', {
  method: 'POST',
  body: formData,
  timeout: 60000,  // 60 seconds timeout
});
      const data = await res.json();
      setPreview(data.preview || []);

      if (data.excel_url) {
        const excel = await fetch(`https://docneat-backend.onrender.com${data.excel_url}`);
        const blob = await excel.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'docneat-converted.xlsx';
        a.click();
      }
    } catch (e) {
      alert('Upload failed — try a smaller file');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'text/csv': ['.csv'], 'image/*': ['.jpg', '.jpeg', '.png'] },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-2xl p-24 cursor-pointer transition-all ${
          isDragActive ? 'border-mint-500 bg-mint-50' : 'border-gray-300 hover:border-mint-500'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-3xl font-medium">
          {isDragActive ? 'Drop it here...' : 'Drag & drop your file'}
        </p>
        <p className="text-gray-500 mt-4 text-xl">PDF • CSV • JPG • PNG • Scanned docs supported</p>
      </div>

      {loading && <p className="mt-10 text-2xl text-mint-600">Extracting your data...</p>}

      {preview.length > 0 && (
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-mint-900">Preview (first 3 rows)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-mint-100">
                <tr>
                  {Object.keys(preview[0]).map((k) => (
                    <th key={k} className="px-6 py-4 text-left">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-6 py-4 border-t">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-green-600 font-bold text-xl text-center">
            Excel downloaded automatically!
          </p>
        </div>
      )}
    </>
  );
}
