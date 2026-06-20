import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ mode, toggleMode }) {
  const isDark = mode === 'dark';

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          TextUtils
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/GoogleKeywordPlanner">
                Keyword Planner
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/PlagiarismChecker">
                Plagiarism Checker
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/SeoTool">
                SEO Tool
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/AiTools">
                AI Tools
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-1">
              <button
                className="color-swatch"
                style={{ backgroundColor: '#22D3EE' }}
                onClick={() => toggleMode('dark')}
                title="Cyan (default)"
              />
              <button
                className="color-swatch"
                style={{ backgroundColor: '#3B82F6' }}
                onClick={() => toggleMode('dark')}
                title="Blue accent"
              />
              <button
                className="color-swatch"
                style={{ backgroundColor: '#A1A1AA' }}
                onClick={() => toggleMode('light')}
                title="Light mode"
              />
            </div>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="themeSwitch"
                checked={isDark}
                onChange={toggleMode}
              />
              <label className="form-check-label ms-1" htmlFor="themeSwitch" style={{ color: 'var(--text-secondary)' }}>
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
