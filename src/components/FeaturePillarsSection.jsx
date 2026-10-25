import React from 'react';
import {
  Compass, ShieldAlert, AlertTriangle, Sliders, FileText,
  CloudLightning, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: Compass,
    title: "Multidimensional Cost Explorer",
    tag: "Granular Telemetry",
    description: "Slice and inspect AWS compute and storage by date range, service, region, environment, and cost tags. High-clarity data tables with client-side filters.",
    link: "/costs"
  },
  {
    icon: ShieldAlert,
    title: "Deterministic Budget Guardrails",
    tag: "Threshold Control",
    description: "Set hard and soft spending limits per account or service. Visual progress indicators provide deterministic utilization percentages before budgets are breached.",
    link: "/budgets"
  },
  {
    icon: AlertTriangle,
    title: "Rule-Based Anomaly Detection",
    tag: "Surge Protection",
    description: "Catch unexpected surges caused by unclosed clusters or runaway loops. Transparent rule thresholds explain why an anomaly was flagged without mysterious black boxes.",
    link: "/anomalies"
  },
  {
    icon: Sliders,
    title: "Rightsizing & Optimization",
    tag: "Waste Elimination",
    description: "Surface idle EC2 instances, unattached EBS storage, and underutilized RDS replicas. Clearly displays estimated monthly dollar savings with action tracking.",
    link: "/optimization"
  },
  {
    icon: FileText,
    title: "Executive Reports & CSV Export",
    tag: "One-Click Export",
    description: "Generate stakeholder summaries with period-over-period delta comparisons. Instant client-side CSV download gives finance teams clean data without delays.",
    link: "/reports"
  },
  {
    icon: CloudLightning,
    title: "AWS Multi-Account Ingestion",
    tag: "Enterprise Hierarchy",
    description: "Built for AWS Cost Explorer and billing export ingestion. Normalized schema preserves full traceability while keeping cloud credentials strictly protected.",
    link: "/integrations"
  }
];

export default function FeaturePillarsSection() {
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
              <span>Platform Capabilities</span>
            </div>
            <h2 className="type-header-3xl" style={{ color: 'var(--color-charcoal)' }}>
              Purpose-built for cloud capital.
            </h2>
          </div>
          <div className="section-bridge-desc">
            <p className="type-body-m" style={{ color: 'var(--color-muted-olive)' }}>
              A modular suite uniting engineering granularity with executive oversight.
              From daily Kubernetes attribution to corporate budget compliance.
            </p>
          </div>
        </div>

        {/* Coda Clean White Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px'
          }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="card-clean-white"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
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
                    <Link
                      to={feat.link}
                      className="squircle-btn squircle-btn-light"
                      aria-label={`Go to ${feat.title}`}
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--color-forest-green)',
                      letterSpacing: '0.06em',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    {feat.tag}
                  </span>

                  <h3 className="type-header-xl" style={{ color: 'var(--color-charcoal)', marginBottom: '12px' }}>
                    {feat.title}
                  </h3>

                  <p className="type-body-s" style={{ color: 'var(--color-muted-olive)', lineHeight: 1.55 }}>
                    {feat.description}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                  <Link
                    to={feat.link}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-forest-green)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
                  >
                    <span>Inspect feature</span>
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
