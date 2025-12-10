import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [preview, setPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = 'https://fastapi-production-f068.up.railway.app';

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
      const response = await fetch(`${backendUrl}/upload`, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();
      setPreview(result.preview || []);

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
      alert('Upload failed — try a smaller file or email support@docneat.com');
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
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-mint-900 mb-4">DocNeat.com</h1>
        <p className="text-3xl font-semibold text-gray-700 mb-3">Easy. Fast. Accurate.</p>
        <p className="text-xl text-gray-600 mb-12">Messy PDFs → Perfect Excel/CSV in seconds</p>

        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-2xl p-20 cursor-pointer transition-all ${
            isDragActive ? 'border-mint-500 bg-mint-50' : 'border-gray-300 hover:border-mint-500'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl">Drop it here...</p>
          ) : (
            <p className="text-2xl">Drag & drop your bank statement, invoice, or receipt</p>
          )}
          <p className="text-gray-500 mt-4">PDF • CSV • JPG • PNG • Works on scanned docs</p>
        </div>

        {loading && <p className="mt-10 text-2xl text-mint-600">Extracting your neat data...</p>}

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
            <p className="mt-6 text-green-600 font-bold text-xl">Excel downloaded automatically!</p>
          </div>
        )}
      </div>
    </div>
     <div className="text-center mt-12">
        </div>
      </div>
    </div>
  );
}
