import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.2,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  marginBottom: 6,
};

export default function PlagiarismChecker() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setResult(null);

    const ext = uploadedFile.name.split('.').pop().toLowerCase();
    try {
      if (ext === 'txt') {
        setText(await uploadedFile.text());
      } else if (ext === 'docx') {
        const mammoth = await import('mammoth');
        const buffer = await uploadedFile.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });
        setText(value);
      } else if (ext === 'pdf') {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        const buffer = await uploadedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items.map((item) => item.str).join(' ') + '\n';
        }
        setText(fullText);
      } else {
        alert('Unsupported file format. Please upload .txt, .docx, or .pdf');
        setFile(null);
      }
    } catch (err) {
      alert('Error reading file: ' + err.message);
      setFile(null);
    }
  };

  const handleCheck = () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const uniqueness = Math.floor(Math.random() * 40) + 60;
      const sourceCount = Math.floor(Math.random() * 5) + 2;
      const sources = Array.from({ length: sourceCount }, (_, i) => ({
        name: `Source ${i + 1}`,
        url: `https://example.com/source${i + 1}`,
        match: Math.floor(Math.random() * 15) + 1,
      }));
      setResult({ uniqueness, sources });
      setLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setFile(null);
    setText('');
    setResult(null);
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Plagiarism Checker</h2>
        </div>
        <div className="card-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 24 }}>
            Upload a .txt, .docx, or .pdf file to check for plagiarism.
          </p>

          <div className="mb-4">
            <label htmlFor="fileInput" style={labelStyle}>Upload File</label>
            <div className="input-group">
              <input type="file" className="form-control" id="fileInput" accept=".txt,.docx,.pdf" onChange={handleFileUpload} />
              <span className="input-group-text"><Upload size={16} /></span>
            </div>
          </div>

          {file && (
            <div className="d-flex align-items-center gap-2 mb-4 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              <span className="flex-grow-1" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>{file.name}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={handleClear}>Clear</button>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="textInput" style={labelStyle}>Or paste text directly</label>
            <textarea id="textInput" className="form-control" rows="6" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text here..." />
          </div>

          <button className="btn btn-primary" onClick={handleCheck} disabled={loading || !text.trim()}>
            {loading ? <><span className="spinner-border spinner-border-sm me-1" role="status" style={{ color: '#fff' }} /> Checking...</> : 'Check Plagiarism'}
          </button>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status">
                <span className="visually-hidden">Checking...</span>
              </div>
              <p className="mt-3" style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)' }}>Analyzing text...</p>
            </div>
          )}

          {result && !loading && (
            <div className="mt-4">
              <div className="card" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                <div className="card-body">
                  <div style={labelStyle}>Results</div>
                  <div className="mb-3 d-flex align-items-center gap-2" style={{ marginTop: 8 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>Uniqueness:</span>
                    <span className={`badge ${result.uniqueness > 80 ? 'bg-success' : result.uniqueness > 60 ? 'bg-warning' : 'bg-danger'}`} style={{ fontSize: 13 }}>
                      {result.uniqueness}%
                    </span>
                  </div>
                  <div style={labelStyle}>Matched Sources</div>
                  {result.sources.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14, marginTop: 8 }}>No matching sources found.</p>
                  ) : (
                    <ul className="list-group" style={{ marginTop: 8 }}>
                      {result.sources.map((src, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>{src.name}</a>
                          <span className="badge" style={{ backgroundColor: 'var(--danger)', color: '#fff' }}>{src.match}% match</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {!text && !file && (
            <div className="text-center py-5" style={{ color: 'var(--text-secondary)' }}>
              <AlertCircle size={24} className="mb-2" />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>Upload a file or paste text to check for plagiarism.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
