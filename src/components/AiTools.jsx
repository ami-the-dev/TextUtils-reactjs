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

const tabBtn = (active) => ({
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

const skillDb = {
  'Software Development': {
    keywords: ['software', 'developer', 'engineer', 'programmer', 'full stack', 'frontend', 'backend', 'web', 'mobile', 'app'],
    skills: [
      { name: 'JavaScript / TypeScript', level: 90, category: 'Languages' },
      { name: 'Python', level: 85, category: 'Languages' },
      { name: 'Java / C#', level: 75, category: 'Languages' },
      { name: 'React / Next.js', level: 90, category: 'Frameworks' },
      { name: 'Node.js / Express', level: 85, category: 'Frameworks' },
      { name: 'SQL / NoSQL Databases', level: 80, category: 'Databases' },
      { name: 'REST API Design', level: 85, category: 'Backend' },
      { name: 'Git / CI/CD', level: 80, category: 'DevOps' },
      { name: 'Docker / Kubernetes', level: 70, category: 'DevOps' },
      { name: 'Agile / Scrum', level: 75, category: 'Methodologies' },
      { name: 'Test-Driven Development', level: 70, category: 'Practices' },
      { name: 'System Design', level: 65, category: 'Architecture' },
    ],
  },
  'Data Science & AI': {
    keywords: ['data', 'scientist', 'analyst', 'machine learning', 'ai', 'deep learning', 'ml', 'statistics', 'analytics'],
    skills: [
      { name: 'Python', level: 90, category: 'Languages' },
      { name: 'SQL', level: 85, category: 'Languages' },
      { name: 'Pandas / NumPy', level: 90, category: 'Libraries' },
      { name: 'Scikit-learn', level: 85, category: 'ML' },
      { name: 'TensorFlow / PyTorch', level: 80, category: 'Deep Learning' },
      { name: 'Data Visualization', level: 85, category: 'Analysis' },
      { name: 'Statistical Analysis', level: 80, category: 'Core' },
      { name: 'Feature Engineering', level: 75, category: 'ML' },
      { name: 'NLP / LLMs', level: 70, category: 'AI' },
      { name: 'A/B Testing', level: 75, category: 'Experimentation' },
      { name: 'Big Data (Spark/Hadoop)', level: 65, category: 'Infrastructure' },
      { name: 'MLOps', level: 60, category: 'DevOps' },
    ],
  },
  'Design & UX': {
    keywords: ['designer', 'ux', 'ui', 'product', 'graphic', 'visual', 'interaction', 'user experience', 'figma', 'creative'],
    skills: [
      { name: 'Figma / Sketch', level: 90, category: 'Tools' },
      { name: 'User Research', level: 85, category: 'Research' },
      { name: 'Wireframing', level: 90, category: 'Design' },
      { name: 'Prototyping', level: 85, category: 'Design' },
      { name: 'Visual Design', level: 80, category: 'Design' },
      { name: 'Design Systems', level: 80, category: 'Systems' },
      { name: 'Usability Testing', level: 75, category: 'Research' },
      { name: 'Information Architecture', level: 75, category: 'Structure' },
      { name: 'HTML / CSS', level: 70, category: 'Code' },
      { name: 'Motion Design', level: 65, category: 'Animation' },
      { name: 'Accessibility (a11y)', level: 70, category: 'Standards' },
      { name: 'Design Thinking', level: 80, category: 'Methodology' },
    ],
  },
  'Marketing & SEO': {
    keywords: ['marketing', 'seo', 'content', 'digital', 'growth', 'social media', 'brand', 'ppc', 'analytics', 'sem'],
    skills: [
      { name: 'SEO Strategy', level: 90, category: 'SEO' },
      { name: 'Keyword Research', level: 85, category: 'SEO' },
      { name: 'Content Marketing', level: 85, category: 'Content' },
      { name: 'Google Analytics', level: 80, category: 'Analytics' },
      { name: 'Google Search Console', level: 80, category: 'Tools' },
      { name: 'Link Building', level: 75, category: 'SEO' },
      { name: 'Social Media Marketing', level: 75, category: 'Social' },
      { name: 'Email Marketing', level: 70, category: 'Channels' },
      { name: 'PPC / Google Ads', level: 70, category: 'Paid' },
      { name: 'A/B Testing', level: 65, category: 'Optimization' },
      { name: 'Copywriting', level: 75, category: 'Content' },
      { name: 'SQL / NoSQL Databases', level: 40, category: 'Technical' },
    ],
  },
  'Product Management': {
    keywords: ['product', 'manager', 'pm', 'product owner', 'strategy', 'roadmap', 'stakeholder', 'agile'],
    skills: [
      { name: 'Product Strategy', level: 90, category: 'Strategy' },
      { name: 'Roadmap Planning', level: 85, category: 'Planning' },
      { name: 'User Stories', level: 90, category: 'Agile' },
      { name: 'Stakeholder Management', level: 85, category: 'Leadership' },
      { name: 'Data-Driven Decision Making', level: 80, category: 'Analytics' },
      { name: 'A/B Testing', level: 75, category: 'Experimentation' },
      { name: 'Competitive Analysis', level: 80, category: 'Research' },
      { name: 'Wireframing / Prototyping', level: 70, category: 'Design' },
      { name: 'Agile / Scrum', level: 85, category: 'Methodologies' },
      { name: 'SQL / Analytics', level: 65, category: 'Technical' },
      { name: 'Public Speaking', level: 70, category: 'Soft Skills' },
      { name: 'Cross-functional Leadership', level: 80, category: 'Leadership' },
    ],
  },
  'DevOps & Cloud': {
    keywords: ['devops', 'cloud', 'infrastructure', 'sre', 'platform', 'aws', 'azure', 'gcp', 'terraform', 'kubernetes'],
    skills: [
      { name: 'AWS / Azure / GCP', level: 85, category: 'Cloud' },
      { name: 'Docker / Kubernetes', level: 85, category: 'Orchestration' },
      { name: 'Terraform / Pulumi', level: 80, category: 'IaC' },
      { name: 'CI/CD Pipelines', level: 90, category: 'Automation' },
      { name: 'Linux Administration', level: 85, category: 'Systems' },
      { name: 'Monitoring / Observability', level: 80, category: 'Operations' },
      { name: 'Security Best Practices', level: 75, category: 'Security' },
      { name: 'Networking', level: 75, category: 'Infrastructure' },
      { name: 'Scripting (Bash/Python)', level: 80, category: 'Automation' },
      { name: 'Git / Version Control', level: 85, category: 'Tools' },
      { name: 'Database Administration', level: 65, category: 'Databases' },
      { name: 'Incident Response', level: 70, category: 'Operations' },
    ],
  },
};

function getFilteredSkills(input) {
  const lower = input.toLowerCase();
  const matched = [];
  for (const [, category] of Object.entries(skillDb)) {
    const matchScore = category.keywords.some((kw) => lower.includes(kw)) ? 1 : 0;
    if (matchScore > 0) {
      matched.push(...category.skills);
    }
  }
  if (matched.length === 0) {
    const all = Object.values(skillDb).flatMap((c) => c.skills);
    return all.sort(() => Math.random() - 0.5).slice(0, 10);
  }
  const seen = new Set();
  const unique = matched.filter((s) => { const d = s.name.toLowerCase(); if (seen.has(d)) return false; seen.add(d); return true; });
  const minProficiency = input.length > 30 ? 0 : 50;
  return unique.filter((s) => s.level >= minProficiency).slice(0, 14);
}


const experienceLevels = ['Intern', 'Junior', 'Mid-Level', 'Senior', 'Lead / Architect', 'VP / Director'];

const formalWords = ['therefore', 'furthermore', 'consequently', 'nevertheless', 'accordingly', 'subsequently', 'henceforth', 'heretofore', 'aforementioned', 'notwithstanding', 'utilize', 'commence', 'terminate', 'endeavor', 'facilitate', 'implement', 'demonstrate', 'participate', 'establish', 'indicate', 'acquire', 'sufficient', 'approximately', 'subsequent', 'prior', 'currently', 'additionally', 'moreover', 'thus', 'hence'];
const casualWords = ['cool', 'awesome', 'guys', 'hey', 'yeah', 'nope', 'gonna', 'wanna', 'kinda', 'sorta', 'pretty', 'totally', 'super', 'really', 'actually', 'basically', 'literally', 'honestly', 'anyway', 'well', 'so', 'ok', 'okay', 'btw', 'lol', 'stuff', 'things', 'nice', 'great', 'fun'];

const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'beautiful', 'happy', 'love', 'best', 'brilliant', 'awesome', 'outstanding', 'superb', 'perfect', 'pleasant', 'delightful', 'joy', 'success', 'benefit', 'advantage', 'impressive', 'remarkable', 'splendid', 'helpful', 'useful', 'effective', 'efficient', 'powerful', 'strong'];
const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'ugly', 'poor', 'fail', 'failure', 'wrong', 'damage', 'destroy', 'hurt', 'pain', 'sad', 'angry', 'annoy', 'disaster', 'crisis', 'problem', 'issue', 'difficult', 'hard', 'terrible', 'dreadful', 'pathetic', 'useless', 'waste', 'weak'];

function getFrequentWords(text, n = 5) {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'by', 'with', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'can', 'could', 'this', 'that', 'these', 'those', 'it', 'its', 'my', 'your', 'his', 'her', 'our', 'their', 'i', 'we', 'you', 'he', 'she', 'they', 'me', 'him', 'us', 'them', 'not', 'no', 'so', 'if', 'as', 'than', 'then', 'just', 'also', 'very', 'too', 'really', 'about', 'up', 'out', 'more', 'some', 'any', 'each', 'every', 'all', 'both', 'few', 'most', 'other', 'into', 'over', 'such', 'only', 'own', 'same', 'what', 'which', 'who', 'whom', 'when', 'where', 'why', 'how']);
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const freq = {};
  for (const w of words) {
    if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1;
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n);
}

function summarize(text) {
  const sentences = text.match(/[^.!?\n]+[.!?]*/g) || [];
  if (sentences.length <= 3) return { summary: text, ratio: 100 };
  const topWords = new Set(getFrequentWords(text, 8).map(([w]) => w));
  const scored = sentences.map((s) => {
    const words = s.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const score = words.filter((w) => topWords.has(w)).length / (words.length || 1);
    return { sentence: s.trim(), score };
  });
  scored.sort((a, b) => b.score - a.score);
  const keepCount = Math.max(2, Math.ceil(sentences.length * 0.35));
  const selected = scored.slice(0, keepCount).sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));
  return { summary: selected.map((s) => s.sentence).join(' '), ratio: Math.round((keepCount / sentences.length) * 100) };
}

function paraphrase(text) {
  const synonyms = {
    good: 'beneficial', bad: 'detrimental', big: 'substantial', small: 'compact',
    fast: 'rapid', slow: 'gradual', old: 'antique', new: 'modern',
    happy: 'delighted', sad: 'melancholy', angry: 'frustrated', calm: 'serene',
    bright: 'vibrant', dark: 'dim', rich: 'affluent', poor: 'underprivileged',
    easy: 'straightforward', hard: 'demanding', safe: 'secure', dangerous: 'hazardous',
    important: 'significant', interesting: 'engaging', beautiful: 'stunning',
    help: 'assist', make: 'create', use: 'utilize', show: 'demonstrate',
    get: 'obtain', give: 'provide', find: 'discover', think: 'believe',
    know: 'understand', need: 'require', want: 'desire', try: 'attempt',
    start: 'commence', end: 'conclude', change: 'modify', improve: 'enhance',
    reduce: 'diminish', increase: 'amplify', explain: 'elaborate', include: 'incorporate',
    also: 'furthermore', but: 'however', so: 'therefore', because: 'due to',
    very: 'extremely', really: 'genuinely', always: 'consistently', often: 'frequently',
  };
  const words = text.split(/\b/);
  let replaced = 0;
  const result = words.map((w) => {
    const lower = w.toLowerCase();
    if (synonyms[lower] && Math.random() > 0.5) { replaced++; return w[0] === w[0]?.toUpperCase() && lower !== w ? synonyms[lower].charAt(0).toUpperCase() + synonyms[lower].slice(1) : synonyms[lower]; }
    return w;
  }).join('');
  return { text: result, changed: replaced };
}

export default function AiTools() {
  const [tab, setTab] = useState('summarize');
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const [skillTitle, setSkillTitle] = useState('');
  const [skillLevel, setSkillLevel] = useState('Mid-Level');
  const [skillIndustry, setSkillIndustry] = useState('Software Development');
  const [skills, setSkills] = useState(null);

  const [mdInput, setMdInput] = useState("");

  const [llmstxtUrl, setLlmstxtUrl] = useState('');
  const [llmstxtName, setLlmstxtName] = useState('');
  const [llmstxtDesc, setLlmstxtDesc] = useState('');
  const [llmstxtSections, setLlmstxtSections] = useState('');
  const [llmstxtOutput, setLlmstxtOutput] = useState('');
  const [llmstxtLoading, setLlmstxtLoading] = useState(false);

  const runCurrent = () => {
    if (!input.trim()) return;
    switch (tab) {
      case 'summarize':
        setResult(summarize(input));
        break;
      case 'paraphrase':
        setResult(paraphrase(input));
        break;
      default:
        break;
    }
  };

  const handleGenerateSkills = () => {
    if (!skillTitle.trim()) return;
    const filtered = getFilteredSkills(`${skillTitle} ${skillIndustry}`);
    const levelMultiplier = { 'Intern': 0.6, 'Junior': 0.8, 'Mid-Level': 1.0, 'Senior': 1.15, 'Lead / Architect': 1.25, 'VP / Director': 1.3 };
    const mult = levelMultiplier[skillLevel] || 1.0;
    const adjusted = filtered.map((s) => ({ ...s, level: Math.min(Math.round(s.level * mult), 100) }));
    setSkills(adjusted);
  };


  const handleGenerateLlmstxt = async () => {
    if (!llmstxtUrl.trim()) return;
    setLlmstxtLoading(true);
    setLlmstxtOutput('');
    const host = llmstxtUrl.match(/^https?:\/\//) ? llmstxtUrl : `https://${llmstxtUrl}`;
    const origin = host.replace(/\/+$/, '');
    const siteName = llmstxtName.trim() || new URL(origin).hostname;
    const proxy = 'https://corsproxy.io/?url=';
    const MAX_PAGES = 60;

    let siteDesc = llmstxtDesc.trim();
    const pages = {}; // path -> { title, url }
    const seen = new Set();
    const queue = [];

    const extractMeta = (html) => {
      const m = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      return m ? m[1] : '';
    };

    const extractTitle = (html) => {
      const m = html.match(/<title>([^<]*)<\/title>/i);
      return m ? m[1].trim() : '';
    };

    const extractLinks = (html, pageUrl) => {
      const hostname = new URL(origin).hostname;
      const found = [];
      const aRe = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
      let m;
      while ((m = aRe.exec(html)) !== null) {
        let href = m[1].split('#')[0];
        if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
        try {
          const url = new URL(href, pageUrl);
          if (url.hostname === hostname) {
            const path = url.pathname.replace(/\/+$/, '') || '/';
            if (!path.match(/\.(pdf|zip|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$/i) && !seen.has(path)) {
              seen.add(path);
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

    // Crawl pages
    queue.push(origin);
    seen.add('/');

    while (queue.length > 0 && Object.keys(pages).length < MAX_PAGES) {
      const pageUrl = queue.shift();
      const html = await fetchPage(pageUrl);
      if (html) {
        const path = new URL(pageUrl).pathname.replace(/\/+$/, '') || '/';
        if (!pages[path]) {
          const title = extractTitle(html);
          pages[path] = { title: title || path.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ') || 'Home', url: pageUrl };
          if (!siteDesc) {
            const desc = extractMeta(html);
            if (desc) siteDesc = desc;
          }
        }
        const newPaths = extractLinks(html, pageUrl);
        for (const p of newPaths) {
          if (Object.keys(pages).length < MAX_PAGES) {
            queue.push(origin + p);
          }
        }
      }
    }

    // Also try sitemap.xml for titles
    const sitemapXml = await fetchPage(`${origin}/sitemap.xml`);
    if (sitemapXml) {
      const locRegex = /<loc>([^<]+)<\/loc>/gi;
      let m;
      while ((m = locRegex.exec(sitemapXml)) !== null) {
        try {
          const url = new URL(m[1]);
          const path = url.pathname.replace(/\/+$/, '') || '/';
          if (!pages[path] && !path.match(/\.(pdf|zip|png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|json|xml|txt)$/i)) {
            pages[path] = { title: path.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ') || 'Home', url: m[1] };
          }
        } catch {}
      }
    }

    // Group pages into sections by path depth
    const sections = {};
    const sortedPaths = Object.keys(pages).sort();
    for (const path of sortedPaths) {
      const segments = path.split('/').filter(Boolean);
      let section = 'General';
      if (segments.length >= 2) {
        section = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
      }
      if (!sections[section]) sections[section] = [];
      sections[section].push({ path, ...pages[path] });
    }

    // If manual sections provided, merge them
    const manualLines = llmstxtSections.split('\n').map((l) => l.trim()).filter(Boolean);
    let currentSection = 'General';
    for (const line of manualLines) {
      if (line.startsWith('#')) {
        currentSection = line.replace(/^#+\s*/, '');
      } else if (line) {
        const url = line.match(/^https?:\/\//) ? line : `${origin}${line.startsWith('/') ? line : '/' + line}`;
        if (!sections[currentSection]) sections[currentSection] = [];
        const path = url.replace(/\/+$/, '');
        if (!pages[new URL(path).pathname]) {
          sections[currentSection].push({ path: new URL(path).pathname, title: path.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ') || 'Link', url: path });
        }
      }
    }

    let txt = `# ${siteName}\n`;
    if (siteDesc) txt += `> ${siteDesc}\n`;
    txt += '\n';
    for (const [sec, urls] of Object.entries(sections)) {
      txt += `## ${sec}\n\n`;
      for (const u of urls) {
        const displayTitle = u.title || u.path.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ') || u.url;
        txt += `- ${displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1)}: ${u.url}\n`;
      }
      txt += '\n';
    }
    setLlmstxtOutput(txt.trim());
    setLlmstxtLoading(false);
  };

  const mdRef = React.createRef();

  const insertMarkdown = (before, after = '') => {
    const ta = mdRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = mdInput.substring(start, end);
    const replacement = before + selected + after;
    const newVal = mdInput.substring(0, start) + replacement + mdInput.substring(end);
    setMdInput(newVal);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const renderMarkdown = (md) => {
    if (!md) return '';
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    html = html
      .replace(/^### (.+)$/gm, '<h5>$1</h5>')
      .replace(/^## (.+)$/gm, '<h4>$1</h4>')
      .replace(/^# (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/`(.+?)`/g, '<code style="background:#27272A;padding:2px 6px;border-radius:4px;font-size:12px;color:#22D3EE">$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:8px 0">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#22D3EE">$1</a>')
      .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
      .replace(/^##### (.+)$/gm, '<h6>$1</h6>')
      .replace(/^#### (.+)$/gm, '<h6>$1</h6>');
    const lines = html.split('\n');
    let result = '';
    let inCodeBlock = false;
    let inUl = false;
    let inOl = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) { result += '</code></pre>'; inCodeBlock = false; }
        else { if (inUl) { result += '</ul>'; inUl = false; } if (inOl) { result += '</ol>'; inOl = false; } result += '<pre style="background:#27272A;padding:12px;border-radius:8px;font-size:12px;overflow-x:auto;margin:8px 0"><code>'; inCodeBlock = true; }
        continue;
      }
      if (inCodeBlock) { result += line + '\n'; continue; }
      if (/^<\/?(h[1-6]|p|div|blockquote|pre|img)/.test(trimmed)) { if (inUl) { result += '</ul>'; inUl = false; } if (inOl) { result += '</ol>'; inOl = false; } result += line; continue; }
      if (/^<hr/.test(trimmed)) { if (inUl) { result += '</ul>'; inUl = false; } if (inOl) { result += '</ol>'; inOl = false; } result += line; continue; }
      if (/^---$/.test(trimmed)) { if (inUl) { result += '</ul>'; inUl = false; } if (inOl) { result += '</ol>'; inOl = false; } result += '<hr style="border-color:var(--bg-border);margin:16px 0">'; continue; }
      if (/^> (.+)$/.test(trimmed)) { if (inUl) { result += '</ul>'; inUl = false; } if (inOl) { result += '</ol>'; inOl = false; } result += '<blockquote style="border-left:3px solid #22D3EE;padding:8px 16px;margin:8px 0;color:var(--text-secondary);background:rgba(34,211,238,0.05);border-radius:0 8px 8px 0">' + trimmed.replace(/^> /, '') + '</blockquote>'; continue; }
      if (/^[-*+]\s/.test(trimmed)) {
        if (inOl) { result += '</ol>'; inOl = false; }
        if (!inUl) { result += '<ul style="padding-left:20px;margin:8px 0">'; inUl = true; }
        result += '<li style="margin:2px 0;color:var(--text-primary)">' + trimmed.replace(/^[-*+]\s/, '') + '</li>';
        continue;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        if (inUl) { result += '</ul>'; inUl = false; }
        if (!inOl) { result += '<ol style="padding-left:20px;margin:8px 0">'; inOl = true; }
        result += '<li style="margin:2px 0;color:var(--text-primary)">' + trimmed.replace(/^\d+\.\s/, '') + '</li>';
        continue;
      }
      if (inUl) { result += '</ul>'; inUl = false; }
      if (inOl) { result += '</ol>'; inOl = false; }
      if (trimmed === '' && i > 0 && lines[i - 1].trim() !== '') { result += '<br>'; continue; }
      if (trimmed === '') continue;
      result += '<p style="margin:6px 0;line-height:1.7">' + line + '</p>';
    }
    if (inCodeBlock) result += '</code></pre>';
    if (inUl) result += '</ul>';
    if (inOl) result += '</ol>';
    return result;
  };

  const categoryOrder = ['Languages', 'Frameworks', 'Databases', 'Backend', 'Frontend', 'ML', 'Deep Learning', 'AI', 'Core', 'Analysis', 'Libraries', 'Research', 'Design', 'Systems', 'Structure', 'Code', 'Animation', 'Standards', 'Methodology', 'Methodologies', 'Architecture', 'Practices', 'Infrastructure', 'DevOps', 'Operations', 'Security', 'Automation', 'Tools', 'Orchestration', 'IaC', 'Cloud', 'Experimentation', 'SEO', 'Content', 'Analytics', 'Channels', 'Paid', 'Optimization', 'Social', 'Strategy', 'Planning', 'Agile', 'Leadership', 'Soft Skills', 'Technical'];

  const sidebarItems = [
    { key: 'summarize', label: 'Summarizer' },
    { key: 'paraphrase', label: 'Paraphrase' },
    { key: 'skill', label: 'Skill Generator' },
    { key: 'md', label: 'MD Editor' },
    { key: 'llmstxt', label: 'LLMs.txt' },
  ];

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* ─── Sidebar ─── */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16 }}>AI Tools</h2>
            </div>
            <div className="card-body p-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setTab(item.key); setResult(null); }}
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
                    backgroundColor: tab === item.key ? '#22D3EE' : 'transparent',
                    color: tab === item.key ? '#000' : 'var(--text-secondary)',
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

          {/* ─── SUMMARIZER ─── */}
          {tab === 'summarize' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Summarizer</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Extract key sentences from any text using frequency analysis — no API key required.</p>
                <div style={labelStyle}>Text to summarize</div>
                <textarea className="form-control mb-3" rows="6" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your text here..." />
                <button className="btn btn-primary" onClick={runCurrent} disabled={!input.trim()}>Summarize</button>
                {result && (
                  <div className="mt-4">
                    <div className="p-2 mb-2 rounded" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', fontSize: 13, color: '#22D3EE' }}>
                      Reduced to {result.ratio}% of original
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)', fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>
                      {result.summary}
                    </div>
                  </div>
                )}
                {!result && (
                  <div className="text-center py-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
                    Enter text and click Summarize.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── PARAPHRASE ─── */}
          {tab === 'paraphrase' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Paraphrase</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Rewrite text with synonym replacement to vary word choice and improve readability.</p>
                <div style={labelStyle}>Text to rewrite</div>
                <textarea className="form-control mb-3" rows="6" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your text here..." />
                <button className="btn btn-primary" onClick={runCurrent} disabled={!input.trim()}>Paraphrase</button>
                {result && (
                  <div className="mt-4">
                    <div className="p-2 mb-2 rounded" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', fontSize: 13, color: '#22D3EE' }}>
                      {result.changed > 0 ? `${result.changed} word(s) replaced` : 'No suitable replacements found. Try different text.'}
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)', fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>
                      {result.text}
                    </div>
                  </div>
                )}
                {!result && (
                  <div className="text-center py-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
                    Enter text and click Paraphrase.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── SKILL GENERATOR ─── */}
          {tab === 'skill' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>Skill Generator</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Generate a tailored skill set based on your job title, experience level, and industry.</p>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div style={labelStyle}>Job Title / Role</div>
                    <input type="text" className="form-control" placeholder="e.g. Senior Frontend Developer" value={skillTitle} onChange={(e) => setSkillTitle(e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <div style={labelStyle}>Experience Level</div>
                    <select className="form-select" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
                      {experienceLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <div style={labelStyle}>Industry</div>
                    <select className="form-select" value={skillIndustry} onChange={(e) => setSkillIndustry(e.target.value)}>
                      {Object.keys(skillDb).map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleGenerateSkills} disabled={!skillTitle.trim()}>Generate Skills</button>
                {skills && (
                  <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div style={labelStyle}>Generated Skills</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => {
                          const text = skills.map((s) => `${s.name} (${s.level}%)`).join('\n');
                          navigator.clipboard.writeText(text);
                        }}>Copy Text</button>
                        <button className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => {
                          let md = `# Skills for ${skillTitle}\n\n**Experience:** ${skillLevel}  \n**Industry:** ${skillIndustry}\n\n`;
                          const grouped = {};
                          for (const s of skills) {
                            if (!grouped[s.category]) grouped[s.category] = [];
                            grouped[s.category].push(s);
                          }
                          const sortedCats = Object.keys(grouped).sort((a, b) => (categoryOrder.indexOf(a) !== -1 ? categoryOrder.indexOf(a) : 999) - (categoryOrder.indexOf(b) !== -1 ? categoryOrder.indexOf(b) : 999));
                          for (const cat of sortedCats) {
                            md += `### ${cat}\n\n`;
                            for (const s of grouped[cat]) {
                              const bar = '\u2588'.repeat(Math.round(s.level / 10)) + '\u2591'.repeat(10 - Math.round(s.level / 10));
                              md += `- **${s.name}** \u2014 ${s.level}% ${bar}\n`;
                            }
                            md += '\n';
                          }
                          navigator.clipboard.writeText(md.trim());
                        }}>Copy Markdown</button>
                      </div>
                    </div>
                    {(() => {
                      const grouped = {};
                      for (const s of skills) {
                        if (!grouped[s.category]) grouped[s.category] = [];
                        grouped[s.category].push(s);
                      }
                      const sortedCats = Object.keys(grouped).sort((a, b) => (categoryOrder.indexOf(a) !== -1 ? categoryOrder.indexOf(a) : 999) - (categoryOrder.indexOf(b) !== -1 ? categoryOrder.indexOf(b) : 999));
                      return sortedCats.map((cat) => (
                        <div key={cat} className="mb-3">
                          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{cat}</div>
                          {grouped[cat].map((s, i) => (
                            <div key={i} className="d-flex align-items-center mb-1 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                              <div style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{s.name}</div>
                              <div style={{ width: 120, height: 6, borderRadius: 3, backgroundColor: '#27272A', marginRight: 10, overflow: 'hidden' }}>
                                <div style={{ width: `${s.level}%`, height: '100%', borderRadius: 3, backgroundColor: s.level >= 80 ? '#22D3EE' : s.level >= 50 ? '#3B82F6' : '#F59E0B' }} />
                              </div>
                              <div style={{ fontSize: 12, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', width: 32, textAlign: 'right' }}>{s.level}%</div>
                            </div>
                          ))}
                        </div>
                      ));
                    })()}
                  </div>
                )}
                {!skills && (
                  <div className="text-center py-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
                    Enter a job title and click Generate Skills.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── MD GENERATOR ─── */}
          {tab === 'md' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>MD Editor</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Write markdown on the left, see the rendered preview on the right. Use the toolbar to insert formatting.</p>
                <div className="d-flex flex-wrap gap-1 mb-3 p-2 rounded" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                  {[
                    { label: 'H1', action: () => insertMarkdown('# ') },
                    { label: 'H2', action: () => insertMarkdown('## ') },
                    { label: 'H3', action: () => insertMarkdown('### ') },
                    { label: 'B', action: () => insertMarkdown('**', '**'), style: { fontWeight: 700 } },
                    { label: 'I', action: () => insertMarkdown('*', '*'), style: { fontStyle: 'italic' } },
                    { label: 'S', action: () => insertMarkdown('~~', '~~'), style: { textDecoration: 'line-through' } },
                    { label: 'Link', action: () => insertMarkdown('[', '](url)') },
                    { label: 'Img', action: () => insertMarkdown('![alt](', ')') },
                    { label: 'UL', action: () => insertMarkdown('\n- ') },
                    { label: 'OL', action: () => insertMarkdown('\n1. ') },
                    { label: 'Code', action: () => insertMarkdown('`', '`') },
                    { label: 'Block', action: () => insertMarkdown('\n> ') },
                    { label: 'HR', action: () => insertMarkdown('\n---\n') },
                    { label: 'Clear', action: () => setMdInput('') },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={btn.action}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '5px 10px',
                        borderRadius: 4,
                        border: '1px solid var(--bg-border)',
                        cursor: 'pointer',
                        backgroundColor: btn.label === 'Clear' ? 'rgba(239,68,68,0.15)' : 'var(--bg-primary)',
                        color: btn.label === 'Clear' ? '#EF4444' : 'var(--text-primary)',
                        transition: 'all 0.15s',
                        ...(btn.style || {}),
                      }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#22D3EE'; e.target.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = btn.label === 'Clear' ? 'rgba(239,68,68,0.15)' : 'var(--bg-primary)'; e.target.style.color = btn.label === 'Clear' ? '#EF4444' : 'var(--text-primary)'; }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div style={labelStyle}>Markdown</div>
                    <textarea ref={mdRef} className="form-control" rows="14" value={mdInput} onChange={(e) => setMdInput(e.target.value)} placeholder={'# Hello World\n\nWrite **markdown** here...\n\n- List item 1\n- List item 2\n\n> A quote'} style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, resize: 'vertical' }} />
                  </div>
                  <div className="col-md-6">
                    <div style={labelStyle}>Preview</div>
                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)', minHeight: 340, maxHeight: 400, overflow: 'auto', fontSize: 14, lineHeight: 1.7, fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                      {mdInput.trim() ? (
                        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(mdInput) }} />
                      ) : (
                        <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14, textAlign: 'center', paddingTop: 140 }}>Preview will appear here</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-primary" onClick={() => navigator.clipboard.writeText(mdInput)} disabled={!mdInput.trim()}>Copy Markdown</button>
                  <button className="btn btn-primary" onClick={() => {
                    const previewContent = renderMarkdown(mdInput);
                    navigator.clipboard.writeText(previewContent.replace(/<[^>]+>/g, ''));
                  }} disabled={!mdInput.trim()}>Copy Plain Text</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── LLMs.TXT GENERATOR ─── */}
          {tab === 'llmstxt' && (
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20 }}>LLMs.txt Generator</h2>
              </div>
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 16 }}>Generate an <strong>llms.txt</strong> file for your website \u2014 a standard for providing LLMs with structured information about your site.</p>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div style={labelStyle}>Website URL</div>
                    <input type="url" className="form-control" placeholder="https://example.com" value={llmstxtUrl} onChange={(e) => setLlmstxtUrl(e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <div style={labelStyle}>Site Name (optional)</div>
                    <input type="text" className="form-control" placeholder="Auto from URL" value={llmstxtName} onChange={(e) => setLlmstxtName(e.target.value)} />
                  </div>
                <div className="col-md-3 d-flex align-items-end">
                  <button className="btn btn-primary w-100" onClick={handleGenerateLlmstxt} disabled={llmstxtLoading || !llmstxtUrl.trim()}>
                    {llmstxtLoading ? <span className="spinner-border spinner-border-sm" role="status" style={{ color: '#fff' }} /> : 'Generate'}
                  </button>
                </div>
              </div>
              {llmstxtLoading && (
                <div className="p-2 mb-3 rounded" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', fontSize: 13, color: '#22D3EE', textAlign: 'center' }}>
                  Crawling pages and extracting titles...
                </div>
              )}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div style={labelStyle}>Site Description (optional \u2014 auto-fetched if empty)</div>
                    <textarea className="form-control" rows="3" value={llmstxtDesc} onChange={(e) => setLlmstxtDesc(e.target.value)} placeholder="Brief description of your site..." />
                  </div>
                  <div className="col-md-6">
                    <div style={labelStyle}>Pages / Sections (one per line, use # for section headers)</div>
                    <textarea className="form-control" rows="3" value={llmstxtSections} onChange={(e) => setLlmstxtSections(e.target.value)} placeholder={'/\n/about\n/blog\n# Products\n/products\n/products/feature-x'} />
                  </div>
                </div>
                {llmstxtOutput && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div style={labelStyle}>Generated llms.txt</div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => navigator.clipboard.writeText(llmstxtOutput)}>Copy</button>
                        <button className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => {
                          const blob = new Blob([llmstxtOutput], { type: 'text/plain' });
                          const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'llms.txt'; a.click(); URL.revokeObjectURL(a.href);
                        }}>Download</button>
                      </div>
                    </div>
                    <pre className="p-3 rounded" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--bg-border)', fontSize: 13, lineHeight: 1.5, fontFamily: 'var(--font-body)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 400, overflow: 'auto', margin: 0 }}>{llmstxtOutput}</pre>
                  </div>
                )}
                {!llmstxtOutput && (
                  <div className="text-center py-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
                    Enter a URL and optional pages, then click Generate.
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
