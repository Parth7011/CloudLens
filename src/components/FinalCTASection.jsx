import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section
      style={{
        backgroundColor: '#f8f8fc',
        color: '#181824',
        borderTop: '1px solid #e0e0eb',
        padding: '90px 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          {/* Top Pill Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '22px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: '#e0e0ff',
                color: '#2d62ff',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <span>CloudLens FinOps Platform</span>
            </div>
          </div>

          {/* Large Headline */}
          <h2
            className="type-header-4xl"
            style={{
              color: '#181824',
              marginBottom: '20px',
              fontWeight: 800,
              letterSpacing: '-0.035em'
            }}
          >
            Take total control of your <br />
            <span style={{ color: '#2d62ff' }}>cloud infrastructure capital.</span>
          </h2>

          <p
            className="type-body-l"
            style={{
              color: '#575783',
              maxWidth: '640px',
              margin: '0 auto 36px auto',
              fontSize: '1.05rem',
              lineHeight: 1.6
            }}
          >
            Connect AWS billing telemetry with read-only IAM permissions in under 5 minutes.
            Detect unexpected spikes before invoices arrive and gain granular unit economics across every microservice.
          </p>

          {/* SaaS Email Trial Capture Form */}
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto 32px auto',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <input
              type="email"
              placeholder="Enter your work email..."
              style={{
                flex: '1 1 260px',
                padding: '13px 20px',
                borderRadius: '9999px',
                border: '1px solid #e0e0eb',
                background: '#ffffff',
                color: '#181824',
                fontSize: '0.92rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(24, 24, 36, 0.04)'
              }}
              readOnly
              value="developer@company.com"
            />
            <Link
              to="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#181824',
                color: '#ffffff',
                padding: '13px 26px',
                borderRadius: '9999px',
                fontSize: '0.92rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(24, 24, 36, 0.15)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181824')}
            >
              <span>Start Free Trial</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: '#575783'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#114e0b" />
              <span>Read-only IAM role</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#114e0b" />
              <span>5-minute self-serve onboarding</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#114e0b" />
              <span>Cancel anytime, no commitment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
