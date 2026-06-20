import React, { useState } from 'react';

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

const mockSuggestions = [
  { keyword: 'text analysis tool', volume: 2400, trend: [120, 190, 170, 250, 300, 280, 310, 350, 380, 290, 410, 430] },
  { keyword: 'SEO checker online', volume: 1800, trend: [90, 110, 130, 150, 170, 190, 210, 200, 220, 240, 260, 280] },
  { keyword: 'free plagiarism checker', volume: 3200, trend: [200, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410] },
  { keyword: 'keyword research tool', volume: 1500, trend: [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190] },
];

export default function GoogleKeywordPlanner() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const data = mockSuggestions.map((s) => ({
        ...s,
        volume: Math.floor(Math.random() * 5000) + 500,
        trend: s.trend.map(() => Math.floor(Math.random() * 500) + 50),
      }));
      setResults(data);
      setLoading(false);
    }, 1000);
  };

  const maxTrend = results
    ? Math.max(...results.flatMap((r) => r.trend))
    : 1;

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Keyword Planner</h2>
        </div>
        <div className="card-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 24 }}>
            Enter a keyword to get simulated keyword suggestions and search volume data.
          </p>

          <div style={labelStyle}>Keyword</div>
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch} disabled={loading || !keyword.trim()}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" style={{ color: '#fff' }} /> : 'Search'}
            </button>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3" style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)' }}>Fetching keyword data...</p>
            </div>
          )}

          {results && !loading && (
            <>
              <div style={labelStyle}>Keyword Suggestions</div>
              {results.map((item, idx) => (
                <div key={idx} className="card mb-3" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-primary)' }}>{item.keyword}</strong>
                      <span className="badge" style={{ backgroundColor: 'var(--primary)', color: '#000' }}>
                        {item.volume.toLocaleString()} /mo
                      </span>
                    </div>
                    <div className="d-flex align-items-end gap-1" style={{ height: 60 }}>
                      {item.trend.map((val, i) => (
                        <div
                          key={i}
                          title={`Month ${i + 1}: ${val}`}
                          style={{
                            width: '7%',
                            height: `${(val / maxTrend) * 100}%`,
                            minHeight: 4,
                            backgroundColor: 'var(--primary)',
                            borderRadius: '2px 2px 0 0',
                            opacity: 0.8,
                            transition: 'height 0.3s',
                          }}
                        />
                      ))}
                    </div>
                    <small style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 11 }}>12-month trend</small>
                  </div>
                </div>
              ))}
            </>
          )}

          {!results && !loading && (
            <div className="text-center py-5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
              Enter a keyword and click Search to see simulated results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
