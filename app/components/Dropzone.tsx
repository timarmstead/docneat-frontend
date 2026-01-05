// Inside the onDrop callback, after successful upload:
try {
  const res = await fetch('https://docneat-backend.onrender.com/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload failed');
  }

  const data = await res.json();
  setPreview(data.preview || []);

  // Auto-download Excel
  if (data.excel_url) {
    const excelRes = await fetch(`https://docneat-backend.onrender.com${data.excel_url}`);
    const excelBlob = await excelRes.blob();
    const excelUrl = window.URL.createObjectURL(excelBlob);
    const excelLink = document.createElement('a');
    excelLink.href = excelUrl;
    excelLink.download = 'docneat-converted.xlsx';
    document.body.appendChild(excelLink); // Needed in some browsers
    excelLink.click();
    document.body.removeChild(excelLink);
    window.URL.revokeObjectURL(excelUrl);
  }

  // Auto-download CSV
  if (data.csv_url) {
    const csvRes = await fetch(`https://docneat-backend.onrender.com${data.csv_url}`);
    const csvBlob = await csvRes.blob();
    const csvUrl = window.URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = 'docneat-converted.csv';
    document.body.appendChild(csvLink);
    csvLink.click();
    document.body.removeChild(csvLink);
    window.URL.revokeObjectURL(csvUrl);
  }

} catch (e) {
  console.error(e);
  alert('Something went wrong during processing — try again or use a smaller file.');
} finally {
  setLoading(false);
}
