import React, { useState } from 'react';
import siteConfig from '../siteConfig';

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

const seoFeatures = [
  { key: 'title', label: 'Title Tag' },
  { key: 'description', label: 'Meta Description' },
  { key: 'canonical', label: 'Canonical URL' },
  { key: 'lang', label: 'Language' },
  { key: 'charset', label: 'Charset' },
  { key: 'author', label: 'Author' },
  { key: 'viewport', label: 'Viewport' },
  { key: 'robots', label: 'Robots' },
  { key: 'keywords', label: 'Keywords' },
  { key: 'ogTitle', label: 'OG Title' },
  { key: 'ogDescription', label: 'OG Description' },
  { key: 'ogImage', label: 'OG Image' },
  { key: 'twitterCard', label: 'Twitter Card' },
];

function calcReadability(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const syllables = text.split(/\s+/).reduce((sum, w) => {
    const s = w.toLowerCase().replace(/[^a-z]/g, '');
    let count = 0;
    if (s.length <= 3) return sum + 1;
    const vowels = s.match(/[aeiouy]+/g);
    count = vowels ? vowels.length : 1;
    if (s.endsWith('e')) count--;
    if (s.endsWith('le') && s.length > 2) count++;
    return sum + Math.max(count, 1);
  }, 0);
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.round(score * 10) / 10;
}

function readabilityLabel(score) {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Confusing';
}

const tabBtn = (active, label) => ({
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 600,
  padding: '8px 14px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: active ? '#22D3EE' : 'transparent',
  color: active ? '#000' : 'var(--text-secondary)',
  transition: 'all 0.15s',
});

export default function SeoMatrics() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [keyword, setKeyword] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const [sidebarSection, setSidebarSection] = useState('content-analyzer');
  const [advTab, setAdvTab] = useState('schema');
  const [schemaInput, setSchemaInput] = useState('');
  const [schemaResult, setSchemaResult] = useState(null);
  const [domainCheck, setDomainCheck] = useState('');
  const [domainResults, setDomainResults] = useState(null);
  const [domainLoading, setDomainLoading] = useState(false);
  const [htmlInput, setHtmlInput] = useState('');
  const [semanticResult, setSemanticResult] = useState(null);
  const [geoContent, setGeoContent] = useState('');
  const [geoResult, setGeoResult] = useState(null);
  const [gapContent, setGapContent] = useState('');
  const [gapTarget, setGapTarget] = useState(1500);
  const [gapResult, setGapResult] = useState(null);

  const [sitemapBaseUrl, setSitemapBaseUrl] = useState('');
  const [sitemapPages, setSitemapPages] = useState('');
  const [sitemapFreq, setSitemapFreq] = useState('weekly');
  const [sitemapPriority, setSitemapPriority] = useState('0.7');
  const [sitemapDate, setSitemapDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [sitemapOutput, setSitemapOutput] = useState('');
  const [sitemapFetching, setSitemapFetching] = useState(false);

  const handleFetch = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();
      if (!json.status || !json.data) throw new Error('Could not fetch SEO data. Check the URL.');
      const d = json.data;
      setData({
        title: d.title || '',
        description: d.description || '',
        canonical: d.url || '',
        lang: d.lang || '',
        charset: d.charset || '',
        viewport: '',
        robots: '',
        author: d.author || '',
        keywords: '',
        ogTitle: d.og?.title || d.title || '',
        ogDescription: d.og?.description || d.description || '',
        ogImage: d.og?.image?.url || d.logo?.url || '',
        twitterCard: d.twitter?.card || '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeContent = () => {
    if (!content.trim()) return;
    const text = content;
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
    const avgWordsPerSentence = wordCount / sentences;
    const readability = calcReadability(text);
    const readabilityDesc = readabilityLabel(readability);

    let keywordDensity = 0;
    let keywordCount = 0;
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const matches = text.toLowerCase().match(new RegExp(escaped, 'g'));
      keywordCount = matches ? matches.length : 0;
      keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
    }

    const headingRegex = /<h[1-6][^>]*>.*?<\/h[1-6]>/gi;
    const headings = (text.match(headingRegex) || []).map((h) => {
      const level = parseInt(h[2]);
      const inner = h.replace(/<[^>]+>/g, '');
      return { level, text: inner };
    });
    let headingIssues = [];
    let expectedLevel = 1;
    for (const h of headings) {
      if (h.level > expectedLevel + 1) {
        headingIssues.push(`Skipped H${expectedLevel} \u2192 H${h.level}: "${h.text}"`);
      }
      expectedLevel = h.level;
    }
    if (headings.length === 0) headingIssues.push('No headings found');

    const imgRegex = /<img[^>]+>/gi;
    const images = (text.match(imgRegex) || []);
    const totalImages = images.length;
    const imagesWithoutAlt = images.filter((img) => !/alt\s*=\s*["']/.test(img)).length;

    const linkRegex = /<a\s[^>]*href=["']([^"']+)["'][^>]*>.*?<\/a>/gi;
    const links = [];
    let linkMatch;
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      const href = linkMatch[1];
      links.push({ href, internal: href.startsWith('/') || href.includes(window.location.hostname) });
    }
    const internalLinks = links.filter((l) => l.internal).length;
    const externalLinks = links.filter((l) => !l.internal).length;

    setAnalysis({
      wordCount, charCount, sentences, avgWordsPerSentence,
      readability, readabilityDesc,
      keywordCount, keywordDensity,
      headingIssues, totalImages, imagesWithoutAlt, internalLinks, externalLinks,
    });
  };

  const seoScore = data ? (() => {
    let score = 50;
    if (data.title && data.title.length >= 10 && data.title.length <= 60) score += 10;
    if (data.description && data.description.length >= 50 && data.description.length <= 160) score += 10;
    if (data.canonical) score += 5;
    if (data.lang) score += 5;
    if (data.ogTitle) score += 5;
    if (data.ogDescription) score += 5;
    if (data.ogImage) score += 5;
    if (data.twitterCard) score += 5;
    return Math.min(score, 100);
  })() : null;

  const handleValidateSchema = () => {
    if (!schemaInput.trim()) return;
    let html = schemaInput;
    const found = [];
    const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = regex.exec(html)) !== null) {
      try {
        found.push(JSON.parse(m[1].trim()));
      } catch {}
    }
    try {
      const parsed = JSON.parse(html);
      if (!found.some(f => JSON.stringify(f) === JSON.stringify(parsed))) found.push(parsed);
    } catch {}
    if (found.length === 0) {
      setSchemaResult({ valid: false, msg: 'No valid JSON-LD found' });
    } else {
      setSchemaResult({
        valid: true,
        count: found.length,
        items: found.map((item, i) => ({
          index: i,
          type: item['@type'] || item['@graph']?.[0]?.['@type'] || 'Unknown',
          keys: Object.keys(item).filter(k => !k.startsWith('@')),
        })),
      });
    }
  };

  const handleDomainCheck = async () => {
    if (!domainCheck.trim()) return;
    setDomainLoading(true);
    setDomainResults(null);
    const origin = domainCheck.match(/^https?:\/\//) ? domainCheck : `https://${domainCheck}`;
    const files = [
      { name: 'llms.txt', url: `${origin}/llms.txt` },
      { name: 'robots.txt', url: `${origin}/robots.txt` },
      { name: 'sitemap.xml', url: `${origin}/sitemap.xml` },
    ];
    const results = [];
    for (const f of files) {
      try {
        const res = await fetch(f.url);
        if (res.ok) {
          const text = await res.text();
          results.push({ ...f, status: 'ok', content: text.slice(0, 600) });
        } else {
          results.push({ ...f, status: res.status.toString(), content: '' });
        }
      } catch {
        results.push({ ...f, status: 'CORS / unreachable', content: '' });
      }
    }
    setDomainResults(results);
    setDomainLoading(false);
  };

  const handleSemanticAudit = () => {
    if (!htmlInput.trim()) return;
    const h = htmlInput;
    const checks = {
      'Doctype': /<!doctype\s+html/i.test(h),
      '<html>': /<html[^>]*>/i.test(h),
      '<head>': /<head[^>]*>/i.test(h),
      '<body>': /<body[^>]*>/i.test(h),
      '<header>': /<header[^>]*>/i.test(h),
      '<nav>': /<nav[^>]*>/i.test(h),
      '<main>': /<main[^>]*>/i.test(h),
      '<article>': /<article[^>]*>/i.test(h),
      '<section>': /<section[^>]*>/i.test(h),
      '<aside>': /<aside[^>]*>/i.test(h),
      '<footer>': /<footer[^>]*>/i.test(h),
      'Lang attr': /<html[^>]*\slang=/i.test(h),
      'Meta charset': /<meta[^>]*charset=/i.test(h),
      'Meta viewport': /<meta[^>]*name=["']viewport["']/i.test(h),
      'Meta description': /<meta[^>]*name=["']description["']/i.test(h),
      'Title tag': /<title>.*?<\/title>/i.test(h),
    };
    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    setSemanticResult({ checks, passed, total });
  };

  const handleGeoScore = () => {
    if (!geoContent.trim()) return;
    const text = geoContent;
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
    const avgWordsPerSentence = wordCount / sentences;
    const readability = calcReadability(text);

    let score = 50;
    if (readability >= 60) score += 10;
    if (avgWordsPerSentence >= 14 && avgWordsPerSentence <= 20) score += 10;
    if (wordCount >= 300 && wordCount <= 2000) score += 10;
    if (/<h1>/i.test(text)) score += 5;
    if (/<h2>/i.test(text)) score += 5;
    const hasLists = /<ul>|<ol>/i.test(text);
    if (hasLists) score += 5;
    const hasFaq = /faq|FAQ|"@type":"FAQ"/.test(text);
    if (hasFaq) score += 5;
    const hasTable = /<table>/i.test(text);
    if (hasTable) score += 5;
    const boldCount = (text.match(/<strong>|<b>/gi) || []).length;
    if (boldCount >= 2) score += 5;
    score = Math.min(score, 100);

    const tips = [];
    if (readability < 60) tips.push('Aim for readability score >= 60 (standard or easier).');
    if (avgWordsPerSentence > 22) tips.push('Shorten sentences to average 14-20 words.');
    if (wordCount < 300) tips.push('Increase content length to at least 300 words.');
    if (!/<h1>/i.test(text)) tips.push('Add an H1 heading for structure.');
    if (!/<h2>/i.test(text)) tips.push('Add H2 subheadings to organize content.');
    if (!hasLists) tips.push('Use bulleted/numbered lists for scannability.');
    if (!hasFaq) tips.push('Add FAQ structured data or a FAQ section for AI snippets.');
    if (boldCount < 2) tips.push('Highlight key terms with bold text.');

    setGeoResult({ score, tips });
  };

  const handleGapAnalysis = () => {
    if (!gapContent.trim()) return;
    const text = gapContent;
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const headingCount = (text.match(/<h[1-6]>/gi) || []).length;
    const imgCount = (text.match(/<img[^>]*>/gi) || []).length;
    const linkCount = (text.match(/<a\s[^>]*href=["']/gi) || []).length;
    const target = Number(gapTarget) || 1500;

    const gaps = [];
    if (wordCount < target * 0.8) gaps.push({ label: 'Word count', current: wordCount, target, diff: target - wordCount, unit: 'words' });
    if (headingCount < 3) gaps.push({ label: 'Headings', current: headingCount, target: 3, diff: 3 - headingCount, unit: 'headings' });
    if (imgCount < 2) gaps.push({ label: 'Images', current: imgCount, target: 2, diff: 2 - imgCount, unit: 'images' });
    if (linkCount < 3) gaps.push({ label: 'Links', current: linkCount, target: 3, diff: 3 - linkCount, unit: 'links' });

    setGapResult({ wordCount, headingCount, imgCount, linkCount, gaps, target });
  };

  const xmlEscape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

  const handleGenerateSitemap = () => {
    const base = sitemapBaseUrl.replace(/\/+$/, '');
    if (!base.match(/^https?:\/\//i)) return;
    const paths = sitemapPages.split('\n').map((p) => p.trim()).filter(Boolean);
    const date = sitemapDate || new Date().toISOString().split('T')[0];
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const path of paths) {
      const loc = path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
      xml += '  <url>\n';
      xml += `    <loc>${xmlEscape(loc)}</loc>\n`;
      xml += `    <lastmod>${xmlEscape(date)}</lastmod>\n`;
      xml += `    <changefreq>${xmlEscape(sitemapFreq)}</changefreq>\n`;
      xml += `    <priority>${xmlEscape(sitemapPriority)}</priority>\n`;
      xml += '  </url>\n';
    }
    xml += '</urlset>';
    setSitemapOutput(xml);
  };

  const handleFetchSitemapUrls = async () => {
    if (!sitemapBaseUrl.trim()) return;
    setSitemapFetching(true);
    let base = sitemapBaseUrl.match(/^https?:\/\//) ? sitemapBaseUrl.replace(/\/+$/, '') : `https://${sitemapBaseUrl.replace(/\/+$/, '')}`;
    if (!base.startsWith('https://')) { setSitemapFetching(false); return; }
    const proxy = 'https://corsproxy.io/?url=';
    const allPaths = new Set();
    const seen = new Set();
    const queue = [];
    const MAX_PAGES = 80;

    const extractPaths = (html, pageUrl) => {
      const hostname = new URL(base).hostname;
      const found = [];
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const anchors = doc.querySelectorAll('a[href]');
      for (const a of anchors) {
        let href = a.getAttribute('href').split('#')[0];
        if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
        try {
          const url = new URL(href, pageUrl);
          if (url.hostname === hostname) {
            const path = url.pathname.replace(/\/+$/, '') || '/';
            if (!path.match(/\.(pdf|zip|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$/i) && !seen.has(path)) {
              seen.add(path);
              allPaths.add(path);
              found.push(path);
            }
          }
        } catch {}
      }
      return found;
    };

    const fetchPage = async (url) => {
      try {
        const res = await fetch(proxy + encodeURIComponent(url), { signal: AbortSignal.timeout(10000) });
        if (res.ok) return await res.text();
      } catch {}
      return null;
    };

    // Start with homepage
    queue.push(base);
    seen.add('/');

    while (queue.length > 0 && allPaths.size < MAX_PAGES) {
      const pageUrl = queue.shift();
      const html = await fetchPage(pageUrl);
      if (html) {
        const newPaths = extractPaths(html, pageUrl);
        for (const p of newPaths) {
          if (allPaths.size < MAX_PAGES) {
            queue.push(base + p);
          }
        }
      }
    }

    // Also try sitemap.xml for additional URLs not found via crawling
    const sitemapXml = await fetchPage(`${base}/sitemap.xml`);
    if (sitemapXml) {
      const locRegex = /<loc>([^<]+)<\/loc>/gi;
      let m;
      while ((m = locRegex.exec(sitemapXml)) !== null) {
        try {
          const url = new URL(m[1]);
          const path = url.pathname.replace(/\/+$/, '') || '/';
          if (!path.match(/\.(pdf|zip|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$/i)) {
            allPaths.add(path);
          }
        } catch {}
      }
    }

    const result = [...allPaths].sort();
    setSitemapPages(result.length > 0 ? result.join('\n') : '/\n/about\n/contact');
    setSitemapFetching(false);
  };

  const sidebarItems = [
    { key: 'content-analyzer', label: 'Content Analyzer' },
    { key: 'url-audit', label: 'URL Audit' },
    { key: 'advanced-checks', label: 'Advanced SEO Checks' },
    { key: 'sitemap', label: 'Sitemap Generator' },
  ];

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* ─── Sidebar ─── */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16 }}>{siteConfig.seo.sidebarLabel}</h2>
            </div>
            <div className="card-body p-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSidebarSection(item.key)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: 4,
                    backgroundColor: sidebarSection === item.key ? '#22D3EE' : 'transparent',
                    color: sidebarSection === item.key ? '#000' : 'var(--text-secondary)',
                    transition: 'all 0.15s',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="col-md-9">

          {/* ─── CONTENT ANALYZER ─── */}
          {sidebarSection === 'content-analyzer' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Content Analyzer</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 24 }}>Paste your page content (text or HTML) for readability, keyword density, heading audit, and image alt checks.</p>
                <div className="row g-3 mb-3">
                  <div className="col-12">
                    <div style={labelStyle}>Content (text or HTML)</div>
                    <textarea className="form-control" rows="6" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Paste your content here..." />
                  </div>
                  <div className="col-12">
                    <div style={labelStyle}>Target Keyword</div>
                    <input type="text" className="form-control" placeholder="e.g. seo tools" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-3">
                        <button className="btn btn-primary w-100" onClick={handleAnalyzeContent} disabled={!content.trim()}>Analyze Content</button>
                      </div>
                    </div>
                  </div>
                </div>
                {analysis && (
                  <div className="row g-4 mt-2">
                    <div className="col-md-6">
                      <div style={labelStyle}>Content Stats</div>
                      <div style={{ marginTop: 8 }}>
                        {[['Word count', analysis.wordCount], ['Character count', analysis.charCount], ['Sentences', analysis.sentences], ['Avg words / sentence', analysis.avgWordsPerSentence.toFixed(1)]].map(([l, v]) => (
                          <div key={l} className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                            <span style={{ color: 'var(--text-secondary)' }}>{l}</span>
                            <span style={{ color: 'var(--text-primary)' }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div style={labelStyle}>Readability</div>
                      <div className="mt-2 p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                        <div style={{ fontSize: 32, fontWeight: 500, fontFamily: 'var(--font-display)', color: analysis.readability >= 60 ? '#22D3EE' : analysis.readability >= 40 ? '#F59E0B' : '#EF4444' }}>{analysis.readability}</div>
                        <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{analysis.readabilityDesc} (Flesch-Kincaid)</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div style={labelStyle}>Keyword</div>
                      <div style={{ marginTop: 8 }}>
                        <div className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Occurrences</span>
                          <span style={{ color: 'var(--text-primary)' }}>{analysis.keywordCount}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Density</span>
                          <span style={{ color: 'var(--text-primary)' }}>{analysis.keywordDensity.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div style={labelStyle}>Images &amp; Links</div>
                      <div style={{ marginTop: 8 }}>
                        <div className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Total images</span>
                          <span style={{ color: 'var(--text-primary)' }}>{analysis.totalImages}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Images missing alt</span>
                          <span style={{ color: analysis.imagesWithoutAlt > 0 ? '#EF4444' : '#22D3EE' }}>{analysis.imagesWithoutAlt}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Internal links</span>
                          <span style={{ color: 'var(--text-primary)' }}>{analysis.internalLinks}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>External links</span>
                          <span style={{ color: 'var(--text-primary)' }}>{analysis.externalLinks}</span>
                        </div>
                      </div>
                    </div>
                    {analysis.headingIssues.length > 0 ? (
                      <div className="col-12">
                        <div style={labelStyle}>Heading Structure</div>
                        <div style={{ marginTop: 8 }}>
                          {analysis.headingIssues.map((issue, i) => (
                            <div key={i} className="p-2 mb-1 rounded" style={{ backgroundColor: issue.includes('No headings') ? 'var(--bg-elevated)' : 'rgba(239, 68, 68, 0.1)', fontSize: 13, color: issue.includes('No headings') ? 'var(--text-secondary)' : '#EF4444' }}>{issue}</div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="col-12">
                        <div style={labelStyle}>Heading Structure</div>
                        <div className="mt-2 p-2 rounded" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', fontSize: 13, color: '#22D3EE' }}>Heading hierarchy looks valid</div>
                      </div>
                    )}
                  </div>
                )}
                {!analysis && (
                  <div className="text-center py-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Paste content and optionally enter a target keyword, then click Analyze Content.</div>
                )}
              </div>
            </div>
          )}

          {/* ─── URL AUDIT ─── */}
          {sidebarSection === 'url-audit' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>URL Audit</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 24 }}>Enter a URL to analyze its SEO meta tags via Microlink API.</p>
                <div style={labelStyle}>URL to analyze</div>
                <div className="input-group mb-4">
                  <input type="url" className="form-control" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleFetch()} />
                  <button className="btn btn-primary" onClick={handleFetch} disabled={loading || !url.trim()}>
                    {loading ? <span className="spinner-border spinner-border-sm" role="status" style={{ color: '#fff' }} /> : 'Analyze'}
                  </button>
                </div>
                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status"><span className="visually-hidden">Loading...</span></div>
                    <p className="mt-3" style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)' }}>Fetching SEO data...</p>
                  </div>
                )}
                {error && <div className="alert alert-danger" style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>{error}</div>}
                {data && !loading && (
                  <>
                    {seoScore !== null && (
                      <div className="text-center mb-4">
                        <div style={labelStyle}>SEO Score</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', border: `4px solid ${seoScore >= 80 ? '#22D3EE' : seoScore >= 50 ? '#F59E0B' : '#EF4444'}`, fontSize: 28, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginTop: 8 }}>{seoScore}</div>
                      </div>
                    )}
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div style={labelStyle}>Content</div>
                        <div style={{ marginTop: 8 }}>
                          {['title', 'description', 'canonical', 'lang', 'charset', 'author'].map((key) => (
                            <div key={key} className="mb-3">
                              <small style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{seoFeatures.find((f) => f.key === key)?.label || key}</small>
                              <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontFamily: 'var(--font-body)', fontSize: 13, wordBreak: 'break-all', color: data[key] ? 'var(--text-primary)' : 'var(--text-secondary)', marginTop: 2, border: '1px solid var(--bg-border)' }}>{data[key] || 'Not found'}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={labelStyle}>Indexability</div>
                        <div style={{ marginTop: 8 }}>
                          {['viewport', 'robots', 'keywords', 'ogTitle', 'ogDescription', 'ogImage', 'twitterCard'].map((key) => (
                            <div key={key} className="mb-3">
                              <small style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{seoFeatures.find((f) => f.key === key)?.label || key}</small>
                              <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontFamily: 'var(--font-body)', fontSize: 13, wordBreak: 'break-all', color: data[key] ? 'var(--text-primary)' : 'var(--text-secondary)', marginTop: 2, border: '1px solid var(--bg-border)' }}>{data[key] || 'Not found'}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {(data.ogTitle || data.title) && (
                      <div className="mt-4">
                        <div style={labelStyle}>Social Preview</div>
                        <div className="mt-2" style={{ maxWidth: 500, border: '1px solid var(--bg-border)', borderRadius: 12, overflow: 'hidden', backgroundColor: 'var(--bg-elevated)' }}>
                          {data.ogImage && (
                            <div style={{ height: 200, backgroundColor: '#27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img src={data.ogImage} alt="OG preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                          )}
                          <div style={{ padding: 12 }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>{data.canonical ? new URL(data.canonical).hostname : ''}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>{data.ogTitle || data.title}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.ogDescription || data.description}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {!data && !loading && !error && (
                  <div className="text-center py-5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Enter a URL and click Analyze to audit SEO tags.</div>
                )}
              </div>
            </div>
          )}

          {/* ─── SITEMAP GENERATOR ─── */}
          {sidebarSection === 'sitemap' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Sitemap Generator</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Generate a valid XML sitemap for your website. Add page paths below.</p>
                <div className="row g-3 mb-3">
                  <div className="col-md-9">
                    <div style={labelStyle}>Base URL</div>
                    <input type="url" className="form-control" placeholder="https://example.com" value={sitemapBaseUrl} onChange={(e) => setSitemapBaseUrl(e.target.value)} />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={handleFetchSitemapUrls} disabled={sitemapFetching || !sitemapBaseUrl.trim()}>
                      {sitemapFetching ? <span className="spinner-border spinner-border-sm" role="status" style={{ color: '#fff' }} /> : 'Fetch URLs'}
                    </button>
                  </div>
                  <div className="col-12">
                    <div style={labelStyle}>Page Paths (one per line \u2014 fetched or custom)</div>
                    <textarea className="form-control" rows="6" value={sitemapPages} onChange={(e) => setSitemapPages(e.target.value)} placeholder={"/\n/about\n/contact\n/blog\n/blog/post-1"} />
                  </div>
                  <div className="col-md-4">
                    <div style={labelStyle}>Change Frequency</div>
                    <select className="form-select" value={sitemapFreq} onChange={(e) => setSitemapFreq(e.target.value)}>
                      {['daily', 'weekly', 'monthly', 'yearly', 'always', 'hourly', 'never'].map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div style={labelStyle}>Priority</div>
                    <select className="form-select" value={sitemapPriority} onChange={(e) => setSitemapPriority(e.target.value)}>
                      {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div style={labelStyle}>Last Modified</div>
                    <input type="date" className="form-control" value={sitemapDate} onChange={(e) => setSitemapDate(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary" onClick={handleGenerateSitemap} disabled={!sitemapBaseUrl.trim() || !sitemapPages.trim()}>Generate Sitemap</button>
                  </div>
                </div>
                {sitemapOutput && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div style={labelStyle}>Generated Sitemap XML</div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => navigator.clipboard.writeText(sitemapOutput)}>Copy XML</button>
                        <button className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => {
                          const blob = new Blob([sitemapOutput], { type: 'application/xml' });
                          const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sitemap.xml'; a.click(); URL.revokeObjectURL(a.href);
                        }}>Download</button>
                      </div>
                    </div>
                    <pre className="p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)', fontSize: 12, lineHeight: 1.5, fontFamily: 'var(--font-body)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 400, overflow: 'auto', margin: 0 }}>{sitemapOutput}</pre>
                  </div>
                )}
                {!sitemapOutput && (
                  <div className="text-center py-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Enter a base URL and page paths, then click Generate Sitemap.</div>
                )}
              </div>
            </div>
          )}

          {/* ─── ADVANCED SEO CHECKS ─── */}
          {sidebarSection === 'advanced-checks' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Advanced SEO Checks</h2>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {['schema', 'domain', 'semantic', 'geo', 'gap'].map((t) => (
                    <button key={t} style={tabBtn(advTab === t, t)} onClick={() => setAdvTab(t)}>
                      {t === 'schema' ? 'Structured Data' : t === 'domain' ? 'Domain Files' : t === 'semantic' ? 'Semantic HTML' : t === 'geo' ? 'GEO Readiness' : 'Content Gap'}
                    </button>
                  ))}
                </div>

                {advTab === 'schema' && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Paste JSON-LD or HTML to extract and validate structured data schema.</p>
                    <div style={labelStyle}>Schema JSON-LD or HTML</div>
                    <textarea className="form-control mb-3" rows="6" value={schemaInput} onChange={(e) => setSchemaInput(e.target.value)} placeholder='Paste {"@context":"https://schema.org",...} or full HTML page...' />
                    <button className="btn btn-primary" onClick={handleValidateSchema} disabled={!schemaInput.trim()}>Validate</button>
                    {schemaResult && (
                      <div className="mt-3">
                        {schemaResult.valid ? (
                          <>
                            <div className="p-2 mb-2 rounded" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', fontSize: 13, color: '#22D3EE' }}>Found {schemaResult.count} valid schema object{schemaResult.count > 1 ? 's' : ''}</div>
                            {schemaResult.items.map((item, i) => (
                              <div key={i} className="p-2 mb-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13 }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{item.type}</strong>
                                <div style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Properties: {item.keys.join(', ')}</div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="p-2 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', fontSize: 13, color: '#EF4444' }}>{schemaResult.msg}</div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {advTab === 'domain' && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Check if essential SEO files exist on your domain as llms.txt, robots.txt, sitemap.xml etc.</p>
                    <div style={labelStyle}>Domain</div>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="example.com" value={domainCheck} onChange={(e) => setDomainCheck(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleDomainCheck()} />
                      <button className="btn btn-primary" onClick={handleDomainCheck} disabled={domainLoading || !domainCheck.trim()}>
                        {domainLoading ? <span className="spinner-border spinner-border-sm" role="status" style={{ color: '#fff' }} /> : 'Check'}
                      </button>
                    </div>
                    {domainResults && (
                      <div>
                        {domainResults.map((r, i) => (
                          <div key={i} className="p-3 mb-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <strong style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>{r.name}</strong>
                              <span className="badge" style={{ backgroundColor: r.status === 'ok' ? '#22D3EE' : '#EF4444', color: r.status === 'ok' ? '#000' : '#fff', fontSize: 11 }}>
                                {r.status === 'ok' ? 'Found' : r.status}
                              </span>
                            </div>
                            {r.content && <pre style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 150, overflow: 'auto', margin: 0 }}>{r.content}</pre>}
                            {r.status !== 'ok' && (
                              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                                Visit directly: <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: '#22D3EE' }}>{r.url}</a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {advTab === 'semantic' && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Paste HTML to check for proper semantic elements and meta tags.</p>
                    <div style={labelStyle}>HTML</div>
                    <textarea className="form-control mb-3" rows="6" value={htmlInput} onChange={(e) => setHtmlInput(e.target.value)} placeholder="<html><head>..." />
                    <button className="btn btn-primary" onClick={handleSemanticAudit} disabled={!htmlInput.trim()}>Audit</button>
                    {semanticResult && (
                      <div className="mt-3">
                        <div className="p-2 mb-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13, color: 'var(--text-primary)' }}>Passed {semanticResult.passed} / {semanticResult.total} checks</div>
                        <div className="row g-2">
                          {Object.entries(semanticResult.checks).map(([check, passed]) => (
                            <div key={check} className="col-md-6">
                              <div className="d-flex justify-content-between p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)', fontSize: 13, border: '1px solid var(--bg-border)' }}>
                                <span style={{ color: 'var(--text-primary)' }}>{check}</span>
                                <span style={{ color: passed ? '#22D3EE' : '#EF4444' }}>{passed ? 'Yes' : 'No'}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {advTab === 'geo' && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Score how well your content is optimized for AI search (Generative Engine Optimization).</p>
                    <div style={labelStyle}>Content (text or HTML)</div>
                    <textarea className="form-control mb-3" rows="6" value={geoContent} onChange={(e) => setGeoContent(e.target.value)} placeholder="Paste content..." />
                    <button className="btn btn-primary" onClick={handleGeoScore} disabled={!geoContent.trim()}>Score</button>
                    {geoResult && (
                      <div className="mt-3">
                        <div className="d-flex align-items-center gap-3 mb-3 p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', border: `4px solid ${geoResult.score >= 70 ? '#22D3EE' : geoResult.score >= 40 ? '#F59E0B' : '#EF4444'}`, fontSize: 22, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{geoResult.score}</div>
                          <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>GEO Readiness</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)' }}>{geoResult.score >= 70 ? 'Good for AI search' : geoResult.score >= 40 ? 'Needs improvement' : 'Poor'}</div>
                          </div>
                        </div>
                        {geoResult.tips.length > 0 && (
                          <div>
                            <div style={labelStyle}>Improvement Tips</div>
                            {geoResult.tips.map((tip, i) => (
                              <div key={i} className="p-2 mb-1 rounded" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', fontSize: 13, color: '#F59E0B' }}>{tip}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {advTab === 'gap' && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Compare your content against recommended benchmarks to identify gaps.</p>
                    <div className="row g-3 mb-3">
                      <div className="col-md-8">
                        <div style={labelStyle}>Content (text or HTML)</div>
                        <textarea className="form-control" rows="5" value={gapContent} onChange={(e) => setGapContent(e.target.value)} placeholder="Paste content..." />
                      </div>
                      <div className="col-md-4">
                        <div style={labelStyle}>Target word count</div>
                        <input type="number" className="form-control mb-3" value={gapTarget} onChange={(e) => setGapTarget(e.target.value)} />
                        <button className="btn btn-primary w-100" onClick={handleGapAnalysis} disabled={!gapContent.trim()}>Analyze Gaps</button>
                      </div>
                    </div>
                    {gapResult && (
                      <div>
                        <div className="row g-2 mb-3">
                          {[['Words', gapResult.wordCount], ['Headings', gapResult.headingCount], ['Images', gapResult.imgCount], ['Links', gapResult.linkCount]].map(([l, v]) => (
                            <div key={l} className="col-md-3">
                              <div className="p-3 rounded text-center" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                                <div style={{ fontSize: 24, fontWeight: 500, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{v}</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{l}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {gapResult.gaps.length > 0 ? (
                          <div>
                            <div style={labelStyle}>Gaps Found</div>
                            {gapResult.gaps.map((g, i) => (
                              <div key={i} className="d-flex justify-content-between align-items-center p-2 mb-1 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', fontSize: 13, color: '#EF4444' }}>
                                <span>{g.label}: {g.current} / {g.target} {g.unit}</span>
                                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>+{g.diff} needed</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2 rounded" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', fontSize: 13, color: '#22D3EE' }}>No major gaps — content meets benchmarks</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
