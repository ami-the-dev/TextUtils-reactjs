import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import siteConfig from '../siteConfig';

export default function Navbar() {
  const [blast, setBlast] = useState(false);

  const handleCelebrate = () => {
    setBlast(true);
    const colors = ['#22D3EE', '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = Math.random() * window.innerWidth + 'px';
      el.style.top = Math.random() * window.innerHeight + 'px';
      el.style.setProperty('--dx', (Math.random() - 0.5) * 600 + 'px');
      el.style.setProperty('--dy', (Math.random() - 0.5) * 600 + 'px');
      el.style.setProperty('--r', Math.random() * 1080 + 'deg');
      el.style.width = (4 + Math.random() * 8) + 'px';
      el.style.height = (4 + Math.random() * 8) + 'px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
    setTimeout(() => setBlast(false), 600);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1030 }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          {siteConfig.nav.brand}
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
            {siteConfig.nav.links.map((link) => (
              <li key={link.to} className="nav-item">
                <NavLink className="nav-link" exact={link.exact} to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCelebrate}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: blast ? '#22D3EE' : 'var(--text-secondary)',
              fontSize: 24,
              lineHeight: 1,
              padding: '4px 8px',
              transition: 'all 0.15s',
              transform: blast ? 'scale(1.4)' : 'scale(1)',
            }}
            title="Celebrate!"
          >
            <PartyPopper size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
