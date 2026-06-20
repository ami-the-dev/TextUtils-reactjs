import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import siteConfig from './siteConfig';

document.title = siteConfig.name + ' — ' + siteConfig.tagline;
const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) metaDesc.content = siteConfig.description;
const metaKeywords = document.querySelector('meta[name="keywords"]');
if (metaKeywords) metaKeywords.content = siteConfig.keywords;
const metaTheme = document.querySelector('meta[name="theme-color"]');
if (metaTheme) metaTheme.content = siteConfig.themeColor;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
