import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        color: '#181824',
        borderTop: '1px solid #e0e0eb',
        padding: '70px 0 40px 0'
      }}
    >
      <div className="container">
        {/* Top 4-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px 32px',
            marginBottom: '50px'
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: '#2d62ff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="3" fill="#ffffff" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: '#181824', letterSpacing: '-0.02em' }}>
                CloudLens
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#575783', lineHeight: 1.6, marginBottom: '18px' }}>
              Cloud spending intelligence & deterministic FinOps platform. Built for modern engineering teams, finance leaders, and DevOps architects.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#114e0b', backgroundColor: '#ebfff5', padding: '4px 10px', borderRadius: '9999px', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span>All Systems Operational • 99.99% Uptime</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Product Features
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#575783' }}>
              <li>
                <Link to="/overview" style={{ color: '#575783', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.target.style.color = '#181824')} onMouseLeave={(e) => (e.target.style.color = '#575783')}>
                  Cost Explorer
                </Link>
              </li>
              <li>
                <Link to="/overview" style={{ color: '#575783', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.target.style.color = '#181824')} onMouseLeave={(e) => (e.target.style.color = '#575783')}>
                  Budget Thresholds
                </Link>
              </li>
              <li>
                <Link to="/overview" style={{ color: '#575783', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.target.style.color = '#181824')} onMouseLeave={(e) => (e.target.style.color = '#575783')}>
                  Rule Anomaly Detection
                </Link>
              </li>
              <li>
                <Link to="/overview" style={{ color: '#575783', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.target.style.color = '#181824')} onMouseLeave={(e) => (e.target.style.color = '#575783')}>
                  Right-Sizing Advisor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Supported Integrations */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Integrations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#575783' }}>
              <li>Amazon Web Services (AWS)</li>
              <li>AWS Cost & Usage Reports</li>
              <li>Amazon CloudWatch Metrics</li>
              <li>Slack & PagerDuty Alerts</li>
            </ul>
          </div>

          {/* Column 3: Trust & Governance */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824', marginBottom: '16px', letterSpacing: '0.02em' }}>
              Security & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#575783' }}>
              <li>SOC 2 Type II Certified</li>
              <li>Read-Only IAM Policy</li>
              <li>Zero Write Permissions</li>
              <li>AES-256 GCM Encryption</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div
          style={{
            borderTop: '1px solid #e0e0eb',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: '#575783'
          }}
        >
          <p>© {currentYear} CloudLens Inc. All rights reserved. Deterministic FinOps intelligence.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
