import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [preview, setPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = 'https://fastapi-production-f068.up.railway.app'; // Your backend

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    if (!file) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      setPreview(result.preview || []);

      // Auto-download Excel
      if (result.excel_url) {
        const excelResp = await fetch(`${backendUrl}${result.excel_url}`);
        const blob = await excelResp.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'docneat-converted.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      alert('Upload failed — try a smaller PDF or email support@docneat.com');
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-mint-900 mb-4">DocNeat.com</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-2">Easy. Fast. Accurate.</p>
          <p className="text-lg text-gray-500">Messy PDFs → Perfect Excel/CSV in seconds. No signup. Nothing stored.</p>
        </div>

        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all ${
            isDragActive ? 'border-mint-500 bg-mint-50' : 'border-gray-300 hover:border-mint-500'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-2xl font-medium text-gray-700 mb-4">
            {isDragActive ? 'Drop your file here...' : 'Drag & drop your bank statement, invoice, or receipt'}
          </p>
          <p className="text-gray-500">PDF • CSV • JPG • PNG • Works on scanned docs</p>
        </div>

        {loading && (
          <p className="text-center mt-8 text-xl font-medium text-mint-600">
            Extracting your neat data... (10–30 seconds)
          </p>
        )}

        {preview.length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-mint-900">Preview (first 3 rows):</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-mint-100">
                    {Object.keys(preview[0] || {}).map((key) => (
                      <th key={key} className="px-6 py-3 text-left font-medium">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-6 py-3 border-t">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center mt-4 text-green-600 font-medium">Excel downloaded automatically!</p>
          </div>
        )}
      </div>
    </div>
  );
}
