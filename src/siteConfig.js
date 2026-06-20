const siteConfig = {
  name: 'TextUtils',
  tagline: 'Web Optimizer Systems for search engine and AI tools',
  description: 'TextUtils — text manipulation, SEO audit, plagiarism checker, keyword planner, markdown editor, and AI-powered text tools by Nexora Systems',
  url: 'https://textutils.io',
  themeColor: '#000000',
  backgroundColor: '#000000',
  author: 'Ami the dev',
  keywords: 'text utils, seo tools, plagiarism checker, keyword planner, markdown editor, ai tools, summarizer, sitemap generator, llms.txt',
  ogImage: '/icon.svg',

  nav: {
    brand: 'TextUtils',
    links: [
      { to: '/', label: 'Home', exact: true },
      { to: '/about', label: 'About' },
      { to: '/GoogleKeywordPlanner', label: 'Keyword Planner' },
      { to: '/PlagiarismChecker', label: 'Plagiarism Checker' },
      { to: '/SeoTool', label: 'SEO Tool' },
      { to: '/AiTools', label: 'AI Tools' },
    ],
  },

  home: {
    title: 'TextUtils — Web SEO and GEO Optimization Systems',
    heading: 'Try TextUtils',
    description: 'Enter text below for instant analysis and transformation.',
  },

  seo: {
    title: 'Free SEO Tool & Website Analyzer | SEO Checker Online — TextUtils',
    heading: 'SEO Tools',
    description: 'Analyze your website SEO with TextUtils.io SEO Tool. Check SEO score, meta tags, keywords, performance, and get recommendations to improve your search rankings.',
    sidebarLabel: 'SEO Tools',
    keywords: 'seo tool, free seo tool, seo analyzer, website seo checker, seo audit tool, website optimization tool, seo analysis, keyword analyzer, meta tag checker, technical seo checker, seo score checker, on page seo checker, search engine optimization tool, website ranking checker, seo report tool',
    schema: {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SEO Tool",
  "url": "https://textutils.io/SeoTool",
  "description": "Free online SEO analysis tool to audit websites, check SEO score, analyze keywords, meta tags, and improve search engine optimization.",
  "applicationCategory": "SEO Tool",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "TextUtils.io",
    "url": "https://textutils.io"
  }
}

  },

  ai: {
    title: 'Free AI Tools Directory | Best AI Tools Online 2026 — TextUtils',
    heading: 'AI Tools',
    description: 'Discover the best free AI tools for content creation, writing, coding, image generation, SEO, productivity, and automation with TextUtils.io AI Tools.',
    keywords: 'AI tools, free AI tools, best AI tools, AI software, AI productivity tools, AI writing tools, AI chatbot, AI content generator, AI image generator, AI code generator, AI SEO tools, artificial intelligence tools, generative AI tools, AI automation tools, online AI tools',
    sidebarLabel: 'AI Tools',
    schema: {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Tools",
  "url": "https://textutils.io/AITools",
  "description": "Free AI tools directory to discover artificial intelligence solutions for writing, coding, image generation, SEO, productivity, and automation.",
  "applicationCategory": "AI Tool",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "TextUtils.io",
    "url": "https://textutils.io"
  }
}
  },

  about: {
    title: 'About — TextUtils',
  },

  keywordPlanner: {
    title: 'Google Keyword Planner — TextUtils',
    description: 'Find high-ranking SEO keywords with TextUtils.io Google Keyword Planner. Discover keyword ideas, search volume, CPC, competition, long-tail keywords, and optimize your content strategy.',
    keywords: 'Google keyword planner, free keyword planner, keyword research tool, keyword finder, keyword generator, SEO keyword research, search volume checker, keyword analysis tool, long tail keywords, CPC checker, keyword competition checker, SEO optimization tool',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Google Keyword Planner",
      "url": "https://textutils.io/GoogleKeywordPlanner",
      "description": "Free SEO keyword research tool to discover keyword ideas, search volume, CPC, competition, and long-tail keyword opportunities.",
      "applicationCategory": "SEO Tool",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "TextUtils.io",
        "url": "https://textutils.io"
      }
    },
  },

  plagiarismChecker: {
    title: 'Free Plagiarism Checker Online | Duplicate Content Checker — TextUtils',
    description: 'Check plagiarism online for free with TextUtils.io. Detect duplicate content, compare text originality, identify copied content, and improve your SEO and writing quality.',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Plagiarism Checker",
      "url": "https://textutils.io/plagiarismChecker",
      "description": "Free online plagiarism checker to analyze text originality, detect duplicate content, and help writers create unique content.",
      "applicationCategory": "Writing Tool",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "TextUtils.io",
        "url": "https://textutils.io"
      }
    },
  },

  footer: {
    description: 'All-in-one text manipulation, SEO audit, AI tools, and web utilities built with modern design systems.',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/GoogleKeywordPlanner', label: 'Keyword Planner' },
      { to: '/PlagiarismChecker', label: 'Plagiarism Checker' },
      { to: '/SeoTool', label: 'SEO Tool' },
      { to: '/AiTools', label: 'AI Tools' },
    ],
    social: [
      { label: 'GitHub', url: '#' },
      { label: 'Twitter', url: '#' },
      { label: 'LinkedIn', url: '#' },
    ],
  },
};

export default siteConfig;
