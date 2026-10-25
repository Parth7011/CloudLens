import React from 'react';
import { ArrowRight, Play, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle at 12% 18%, #f0f4ff 0%, transparent 45%), radial-gradient(circle at 88% 30%, #f0fdf4 0%, transparent 45%)',
        color: '#181824',
        paddingTop: 'calc(var(--nav-height) + 64px)',
        paddingBottom: '80px',
        overflow: 'hidden',
        borderBottom: '1px solid #e0e0eb'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Minimal Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 40px auto' }}>
          {/* Subtle Accent Pill */}
          <div style={{ display: 'inline-flex', marginBottom: '22px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: '#f8f8fc',
                border: '1px solid #e0e0eb',
                fontSize: '0.8rem',
                color: '#181824',
                letterSpacing: '0.02em',
                boxShadow: '0 2px 8px rgba(24, 24, 36, 0.04)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2d62ff' }} />
              <span style={{ fontWeight: 700 }}>CloudLens</span>
              <span style={{ color: '#cdcddd' }}>•</span>
              <span style={{ color: '#575783', fontWeight: 500 }}>AWS Cloud Spend Intelligence</span>
            </div>
          </div>

          {/* Clean Display Headline */}
          <h1
            className="type-header-4xl"
            style={{
              color: '#181824',
              marginBottom: '20px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15
            }}
          >
            Cloud infrastructure spend, <br />
            <span style={{ color: '#2d62ff' }}>observed with precision.</span>
          </h1>

          {/* Supporting Subtitle */}
          <p
            className="type-body-l"
            style={{
              color: '#575783',
              maxWidth: '640px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
              fontSize: '1.05rem'
            }}
          >
            Unify multi-account AWS billing telemetry across containers, services, and regions.
            Detect unexpected surges, monitor deterministic budget caps, and eliminate cloud waste.
          </p>

          {/* Minimal Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#181824',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '13px 28px',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(24, 24, 36, 0.15)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2d62ff';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181824';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Start free trial</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/overview"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#181824',
                border: '1px solid #e0e0eb',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '13px 26px',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(24, 24, 36, 0.04)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#cdcddd';
                e.currentTarget.style.backgroundColor = '#f8f8fc';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0eb';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Play size={14} fill="#181824" />
              <span>Explore live demo</span>
            </Link>
          </div>
        </div>

        {/* Clean Light Telemetry Highlight Strip (Replaces 3D Canvas) */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e0e0eb',
              padding: '20px 22px',
              boxShadow: '0 10px 25px -5px rgba(24, 24, 36, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#e0e0ff',
                color: '#2d62ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
                Active Telemetry
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#181824', marginTop: '2px' }}>
                14 AWS Accounts
              </div>
              <div style={{ fontSize: '0.75rem', color: '#575783', marginTop: '2px' }}>
                EC2, S3, RDS, EKS in real-time
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e0e0eb',
              padding: '20px 22px',
              boxShadow: '0 10px 25px -5px rgba(24, 24, 36, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#ebfff5',
                color: '#114e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Activity size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
                Current MTD Run-Rate
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#181824', marginTop: '2px' }}>
                $42,850.40
              </div>
              <div style={{ fontSize: '0.75rem', color: '#114e0b', fontWeight: 600, marginTop: '2px' }}>
                ↓ $3,420 below monthly ceiling
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e0e0eb',
              padding: '20px 22px',
              boxShadow: '0 10px 25px -5px rgba(24, 24, 36, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#f8f8fc',
                color: '#181824',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
                Security & Isolation
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#181824', marginTop: '2px' }}>
                Read-Only IAM
              </div>
              <div style={{ fontSize: '0.75rem', color: '#575783', marginTop: '2px' }}>
                Zero write credentials needed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
