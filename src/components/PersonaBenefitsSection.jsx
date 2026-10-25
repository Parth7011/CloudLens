import React from 'react';
import { Terminal, LineChart, Briefcase, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PERSONAS = [
  {
    id: 'engineering',
    icon: Terminal,
    role: "DevOps & Platform Teams",
    tagline: "Infrastructure Velocity",
    headline: "Architect with cost awareness. Zero billing surprises.",
    description: "Empower developers with immediate feedback on their infrastructure changes. Eliminate endless Slack debates over mysterious AWS invoices.",
    benefits: [
      "Real-time feedback on EC2 instance types and storage provisioning",
      "Automated alerts on runaway test clusters or recursive Lambda loops",
      "Pod and namespace unit economics for Kubernetes clusters",
      "Clear attribution tags tied directly to deployment pipelines"
    ]
  },
  {
    id: 'finance',
    icon: LineChart,
    role: "Finance & Operations Leaders",
    tagline: "Capital Predictability",
    headline: "Deterministic budget guardrails and instant showback.",
    description: "Replace cumbersome manual Excel spreadsheets with automated, synchronized billing summaries and instant CSV exports.",
    benefits: [
      "Deterministic percentage change metrics comparing equivalent windows",
      "Configurable budget thresholds with visual warning badges",
      "Instant client-side CSV exports for reconciliation and accounting",
      "Unblended and amortized cost clarity without vendor lock-in"
    ]
  },
  {
    id: 'leadership',
    icon: Briefcase,
    role: "CTOs & Engineering VPs",
    tagline: "Executive Governance",
    headline: "Protect gross margins and prove infrastructure ROI.",
    description: "Align engineering velocity with financial discipline. Gain high-level visibility into cloud cost drivers without digging into AWS consoles.",
    benefits: [
      "Executive overview with top service drivers and month-over-month trendlines",
      "Transparent rule-based anomaly detection without black-box AI claims",
      "Least-privilege security model with zero cloud secret storage",
      "Measurable unit economics that validate infrastructure ROI"
    ]
  }
];

export default function PersonaBenefitsSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-warm-cream)',
        color: 'var(--color-charcoal)',
        padding: '100px 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Bridge - 2-Column Coda Lockup */}
        <div className="section-bridge">
          <div className="section-bridge-title">
            <div className="coda-pill coda-pill-cream" style={{ marginBottom: '16px' }}>
              <span>Tailored Solutions</span>
            </div>
            <h2 className="type-header-3xl" style={{ color: 'var(--color-charcoal)' }}>
              Built for every stakeholder.
            </h2>
          </div>
          <div className="section-bridge-desc">
            <p className="type-body-m" style={{ color: 'var(--color-muted-olive)' }}>
              Whether you are writing Terraform modules, forecasting corporate runway, or reporting
              gross margin efficiency to the board, CloudLens provides the exact resolution required.
            </p>
          </div>
        </div>

        {/* 3-Column Persona Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}
        >
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="card-clean-white"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '360px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--color-olive-cream)',
                        color: 'var(--color-forest-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-forest-green)', letterSpacing: '0.05em' }}>
                        {p.tagline}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                        {p.role}
                      </h3>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '10px', lineHeight: 1.4 }}>
                    {p.headline}
                  </h4>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-olive)', marginBottom: '20px', lineHeight: 1.55 }}>
                    {p.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {p.benefits.map((b, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: 'var(--color-charcoal)' }}>
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'rgba(0, 61, 33, 0.1)',
                            color: 'var(--color-forest-green)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        >
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span style={{ lineHeight: 1.45 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                  <Link
                    to="/overview"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-forest-green)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
                  >
                    <span>View role telemetry</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
