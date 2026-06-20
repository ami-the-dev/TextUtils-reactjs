import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../siteConfig';

export default function Footer() {
  const { footer, name, tagline } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-elevated)',
      borderTop: '1px solid var(--bg-border)',
      padding: '32px 0 24px',
      marginTop: 48,
      fontFamily: 'var(--font-body)',
    }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div style={{ fontWeight: 600, fontSize: 18, fontFamily: 'var(--font-display)', color: '#22D3EE', marginBottom: 8 }}>
              {name}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {footer.description}
            </p>
          </div>
          <div className="col-md-4">
            <div style={{ fontWeight: 600, fontSize: 13, color: '#22D3EE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {footer.links.map((link) => (
                <Link key={link.to} to={link.to} style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: 13,
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={(e) => e.target.style.color = '#22D3EE'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ fontWeight: 600, fontSize: 13, color: '#22D3EE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              Connect
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {footer.social.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: 13,
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={(e) => e.target.style.color = '#22D3EE'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid var(--bg-border)',
          marginTop: 24,
          paddingTop: 16,
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}>
          &copy; {year} {name} &mdash; {tagline}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
