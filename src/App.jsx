import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import GoogleKeywordPlanner from './components/GoogleKeywordPlanner';
import PlagiarismChecker from './components/PlagiarismChecker';
import SeoMatrics from './components/SeoMatrics';
import AiTools from './components/AiTools';
import Footer from './components/Footer';
import siteConfig from './siteConfig';
import './App.css';

function App() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  useEffect(() => {
    const path = window.location.pathname.replace('/TextUtils-reactjs', '') || '/';
    const titles = {
      '/': siteConfig.home.title,
      '/about': siteConfig.about.title,
      '/GoogleKeywordPlanner': siteConfig.keywordPlanner.title,
      '/PlagiarismChecker': siteConfig.plagiarismChecker.title,
      '/SeoTool': siteConfig.seo.title,
      '/AiTools': siteConfig.ai.title,
    };
    document.title = titles[path] || siteConfig.name + ' — ' + siteConfig.tagline;
  }, []);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 1500);
  };

  const toggleMode = (forced) => {
    if (forced) {
      setMode(forced);
    } else {
      setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: 56 }}>
      <Navbar />
      <Alert alert={alert} />
      <Switch>
        <Route exact path="/">
          <TextForm showAlert={showAlert} mode={mode} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/GoogleKeywordPlanner">
          <GoogleKeywordPlanner />
        </Route>
        <Route path="/PlagiarismChecker">
          <PlagiarismChecker />
        </Route>
        <Route path="/SeoTool">
          <SeoMatrics />
        </Route>
        <Route path="/AiTools">
          <AiTools />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
