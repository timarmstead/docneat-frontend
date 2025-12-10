import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendUrl] = useState('https://fastapi-production-f068.up.railway.app'); // Your backend URL!

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];
    if (!file) return;

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
        const excelBlob = await excelResp.blob();
        const url = window.URL.createObjectURL(excelBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'docneat-converted.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      alert('Oops! Try again or email support@docneat.com');
    }
    setLoading(false);
  }, [backendUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 
      'application/pdf': ['.pdf'], 
      'text/csv': ['.csv'], 
      'image/*': ['.jpg', '.png'] 
    } 
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-mint-900 mb-4">DocNeat.com</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-2">Easy. Fast. Accurate.</p>
          <p className="text-lg text-gray-500">Messy PDFs → Perfect Excel/CSV in seconds. No signup. Nothing stored.</p>
        </div>

        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-mint-500 bg-mint-100' : 'border-gray-300 hover:border-mint-500'}`}>
          <input {...getInputProps()} />
          <p className="text-xl font-medium text-gray-700 mb-2">
            {isDragActive ? 'Drop it here...' : 'Drag & drop your bank statement, invoice, or receipt'}
          </p>
          <p className="text-gray-500">Supports PDF, CSV, JPG, PNG. Works on scanned docs too.</p>
        </div>

        {loading && <p className="text-center mt-4 text-mint-600 font-medium">Extracting your neat data... (this may take 10–30 seconds)</p>}

        {preview.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-mint-900">Preview (first 3 rows extracted):</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-mint-100">
                    {Object.keys(preview[0] || {}).map((key) => (
                      <th key={key} className="px-4 py-2 border-b text-left font-medium">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-4 py-2 border-b">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">Full Excel downloaded automatically! CSV available too.</p>
          </div>
        )}
      </div>
    </div>
  );
}
