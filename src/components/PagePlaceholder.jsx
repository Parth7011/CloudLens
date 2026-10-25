import React from 'react';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PagePlaceholder({ title, pageNumber, pairOwner, description, keyFeatures = [] }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-warm-cream)',
        color: 'var(--color-charcoal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px'
      }}
    >
      <div
        className="card-clean-white"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '48px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light-medium)',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(32, 32, 32, 0.08)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div className="coda-pill coda-pill-cream">
            <Clock size={14} color="var(--color-forest-green)" />
            <span>Upcoming Sprint Implementation</span>
          </div>
        </div>

        <h1
          className="type-header-3xl"
          style={{
            color: 'var(--color-charcoal)',
            marginBottom: '8px'
          }}
        >
          {title}
        </h1>

        <div
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-forest-green)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '20px'
          }}
        >
          Page {pageNumber} of 12 • Owned by {pairOwner}
        </div>

        <p
          className="type-body-m"
          style={{
            color: 'var(--color-muted-olive)',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}
        >
          {description}
        </p>

        {keyFeatures.length > 0 && (
          <div
            style={{
              backgroundColor: 'var(--color-olive-cream)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              textAlign: 'left',
              marginBottom: '32px',
              border: '1px solid rgba(32, 32, 32, 0.08)'
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '12px', letterSpacing: '0.05em' }}>
              Planned UI Capabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {keyFeatures.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-pill-charcoal">
            <ArrowLeft size={16} />
            <span>Return to Landing Page</span>
          </Link>
          <Link to="/overview" className="btn-pill-outline-charcoal">
            <span>Inspect Executive Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
