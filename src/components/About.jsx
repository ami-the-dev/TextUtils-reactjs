import React from 'react';

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

export default function About() {
  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>About TextUtils</h2>
        </div>
        <div className="card-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 24 }}>
            TextUtils is a browser-based text utility suite providing text transformation, analysis,
            content SEO auditing, keyword research simulation, and plagiarism checking — all
            client-side with no backend dependency.
          </p>

          <div className="accordion" id="aboutAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Text Transformation
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#aboutAccordion">
                <div className="accordion-body">
                  Convert text to uppercase, lowercase, capitalize each word, remove extra spaces,
                  clear, copy to clipboard, download as .txt, text-to-speech, embed YouTube/Vimeo URLs,
                  generate QR codes, and find & replace text.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Analytics
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#aboutAccordion">
                <div className="accordion-body">
                  Real-time word count, character count, and estimated reading time.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Theme
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#aboutAccordion">
                <div className="accordion-body">
                  Dark mode default with cyan accent #22D3EE, blue accent #3B82F6. Preference saved to localStorage.
                  Inter for headings, JetBrains Mono for body text.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Tech Stack
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#aboutAccordion">
                <div className="accordion-body">
                  React 18, Vite, react-router-dom v5, Bootstrap 5, lucide-react, pdfjs-dist, mammoth, qrcode.react.
                  Design system by Nexora Systems.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
