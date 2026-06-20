import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

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

export default function TextForm({ showAlert, mode }) {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleUpClick = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    setText(text.toUpperCase());
    showAlert('Converted to uppercase', 'success');
  };

  const handleLoClick = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    setText(text.toLowerCase());
    showAlert('Converted to lowercase', 'success');
  };

  const handleCapitalize = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    setText(text.replace(/\b\w/g, (char) => char.toUpperCase()));
    showAlert('Capitalized each word', 'success');
  };

  const handleRemoveExtraSpaces = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    setText(text.replace(/\s+/g, ' ').trim());
    showAlert('Extra spaces removed', 'success');
  };

  const handleClear = () => {
    setText('');
    showAlert('Text cleared', 'success');
  };

  const handleCopy = async () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    try {
      await navigator.clipboard.writeText(text);
      showAlert('Copied to clipboard', 'success');
    } catch {
      showAlert('Failed to copy', 'danger');
    }
  };

  const handleDownload = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    a.click();
    URL.revokeObjectURL(url);
    showAlert('Downloaded as text.txt', 'success');
  };

  const handleSpeech = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    if (!('speechSynthesis' in window)) {
      showAlert('Speech synthesis not supported!', 'danger');
      return;
    }
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words > 1000) {
      showAlert('Text too long for speech (max 1000 words)', 'danger');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 5000));
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
    showAlert('Reading aloud...', 'success');
  };

  const handleEmbedURLs = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    let result = text;
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/g;
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/g;
    result = result.replace(youtubeRegex, (_, id) =>
      `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`
    );
    result = result.replace(vimeoRegex, (_, id) =>
      `<iframe width="560" height="315" src="https://player.vimeo.com/video/${id}" frameborder="0" allowfullscreen></iframe>`
    );
    setText(result);
    showAlert('URLs converted to embed code', 'success');
  };

  const handleQR = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    setShowQR(!showQR);
  };

  const handleFindReplace = () => {
    if (!text) { showAlert('Please enter text', 'danger'); return; }
    if (!findText) { showAlert('Please enter text to find', 'danger'); return; }
    const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    setText(text.replace(regex, replaceText));
    showAlert('Find & replace done', 'success');
  };

  const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const charCount = text.length;
  const readingTime = wordCount > 0 ? (wordCount / 0.08).toFixed(1) : 0;

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Text Manipulation</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <label htmlFor="textArea" style={labelStyle}>Enter your text</label>
            <textarea
              id="textArea"
              className="form-control"
              rows="8"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
            />
          </div>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <button className="btn btn-primary btn-sm" onClick={handleUpClick} disabled={!text}>Uppercase</button>
            <button className="btn btn-primary btn-sm" onClick={handleLoClick} disabled={!text}>Lowercase</button>
            <button className="btn btn-primary btn-sm" onClick={handleCapitalize} disabled={!text}>Capitalize</button>
            <button className="btn btn-primary btn-sm" onClick={handleRemoveExtraSpaces} disabled={!text}>Remove Spaces</button>
            <button className="btn btn-primary btn-sm" onClick={handleClear} disabled={!text}>Clear</button>
            <button className="btn btn-primary btn-sm" onClick={handleCopy} disabled={!text}>Copy</button>
            <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={!text}>Download</button>
            <button className="btn btn-primary btn-sm" onClick={handleSpeech} disabled={!text}>Text-to-Speech</button>
            <button className="btn btn-primary btn-sm" onClick={handleEmbedURLs} disabled={!text}>Embed URLs</button>
            <button className="btn btn-primary btn-sm" onClick={handleQR} disabled={!text}>
              {showQR ? 'Hide QR' : 'QR Code'}
            </button>
          </div>

          <div style={labelStyle}>Find &amp; Replace</div>
          <div className="row g-2 mb-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Replace with..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary btn-sm w-100" onClick={handleFindReplace} disabled={!text}>Replace</button>
            </div>
          </div>

          {showQR && text && (
            <div className="mb-3 text-center p-3" style={{ backgroundColor: '#fff', borderRadius: 8, display: 'inline-block' }}>
              <QRCodeSVG value={text} size={160} />
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">
          <h3 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18 }}>Text Summary</h3>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-4 mb-3">
            <div>
              <span className="badge" style={{ backgroundColor: 'var(--primary)', color: '#000' }}>{wordCount}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', marginLeft: 6 }}>words</span>
            </div>
            <div>
              <span className="badge" style={{ backgroundColor: 'var(--primary)', color: '#000' }}>{charCount}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', marginLeft: 6 }}>characters</span>
            </div>
            <div>
              <span className="badge" style={{ backgroundColor: 'var(--primary)', color: '#000' }}>{readingTime}s</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', marginLeft: 6 }}>read</span>
            </div>
          </div>
          <div style={labelStyle}>Preview</div>
          <div className="preview-box">
            {text || 'Nothing to preview'}
          </div>
        </div>
      </div>
    </div>
  );
}
