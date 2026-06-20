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
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar mode={mode} toggleMode={toggleMode} />
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
    </div>
  );
}

export default App;
