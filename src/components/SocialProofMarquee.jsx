import React, { useState } from 'react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    company: "Lyft",
    tagline: "Infrastructure Cloud Operations",
    quote: "“Consolidating multi-region AWS compute down to clear unit economics gave our engineering teams immediate feedback on their architecture decisions.”",
    author: "Infrastructure Cloud Operations Lead",
    impact: "-26% Idle EC2 Spend"
  },
  {
    company: "Wiz",
    tagline: "Cloud Security & Governance",
    quote: "“The deterministic anomaly rules caught a runaway test cluster within 3 hours. That alone saved us tens of thousands in unbudgeted egress.”",
    author: "Head of Cloud Infrastructure",
    impact: "$48k Spikes Prevented"
  },
  {
    company: "AppsFlyer",
    tagline: "Real-time Telemetry & Big Data",
    quote: "“Tagging and breaking down Kubernetes pod allocations across shared EKS nodes eliminated our monthly billing surprises entirely.”",
    author: "Principal DevOps Architect",
    impact: "100% Shared Cost Allocation"
  },
  {
    company: "Cockroach Labs",
    tagline: "Distributed Cloud Database",
    quote: "“The team was able to verify deterministic budget utilization in seconds instead of digging through raw AWS Cost Explorer CSV exports.”",
    author: "Sr. Engineering Manager",
    impact: "8x Faster Cost Reviews"
  },
  {
    company: "Coralogix",
    tagline: "Observability Platform",
    quote: "“Clean, deterministic data contracts. You don't need complex black-box AI to get total clarity on where your cloud capital is going.”",
    author: "Director of Platform Operations",
    impact: "34% Waste Eliminated"
  }
];

export default function SocialProofMarquee() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section
      style={{
        padding: '36px 0 48px 0',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        backgroundColor: 'var(--color-warm-cream)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* SaaS Core Proof Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '24px',
            paddingBottom: '36px',
            marginBottom: '32px',
            borderBottom: '1px solid var(--border-light)',
            textAlign: 'center'
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-charcoal)', margin: 0, letterSpacing: '-0.03em' }}>
              $120M+
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-olive)', fontWeight: 600, marginTop: '4px' }}>
              Annual Cloud Spend Ingested
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-forest-green)', margin: 0, letterSpacing: '-0.03em' }}>
              &lt; 15 min
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-olive)', fontWeight: 600, marginTop: '4px' }}>
              Anomaly Detection SLA
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-charcoal)', margin: 0, letterSpacing: '-0.03em' }}>
              34%
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-olive)', fontWeight: 600, marginTop: '4px' }}>
              Average Infrastructure Waste Cut
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-forest-green)', margin: 0, letterSpacing: '-0.03em' }}>
              99.98%
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-olive)', fontWeight: 600, marginTop: '4px' }}>
              Container Cost Allocation Accuracy
            </p>
          </div>
        </div>

        <p
          className="type-ui-label"
          style={{
            textAlign: 'center',
            color: 'var(--color-muted-olive)',
            marginBottom: '28px'
          }}
        >
          Trusted by engineering and cloud teams at scale
        </p>

        {/* Coda-Style Editorial Logo Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '36px 56px'
          }}
        >
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveItem(idx)}
              onMouseLeave={() => setActiveItem(null)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                  color: activeItem === idx ? 'var(--color-charcoal)' : 'var(--color-muted-olive)',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.company}
              </span>

              {/* Hover Popover Quote */}
              {activeItem === idx && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 12px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '300px',
                    backgroundColor: 'var(--color-charcoal)',
                    color: 'var(--color-warm-cream)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    boxShadow: '0 12px 30px rgba(32, 32, 32, 0.2)',
                    border: '1px solid var(--border-dark)',
                    zIndex: 20,
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Quote size={14} color="var(--color-mint)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-mint)', textTransform: 'uppercase' }}>
                      {item.impact}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.45, marginBottom: '8px', color: '#ffffff' }}>
                    {item.quote}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted-cream)', fontWeight: 600 }}>
                    — {item.author}, {item.company}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
