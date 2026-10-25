import React, { useState } from 'react';
import { Server, Box, Database, Network, ArrowRight, ArrowLeft } from 'lucide-react';

const LAYERS = [
  {
    number: "01",
    label: "LAYER 01 — Baseline Foundation",
    title: "Core Compute & Storage",
    description: "Unallocated EC2 instances and unattached EBS volumes account for over 35% of cloud waste. CloudLens correlates instance telemetry and storage tiering so you only pay for compute actively delivering business value.",
    services: ["Amazon EC2", "Amazon EBS", "Amazon S3", "Auto Scaling"],
    metric: "$18,240 tracked monthly",
    insight: "12 unattached EBS gp3 volumes detected ($380/mo wasted)"
  },
  {
    number: "02",
    label: "LAYER 02 — High Density Workloads",
    title: "Kubernetes & Pod Allocation",
    description: "Shared EKS clusters obscure individual squad costs. CloudLens breaks down CPU and memory requests by namespace, pod, and service labels, giving engineering teams precise unit economics on their microservices.",
    services: ["Amazon EKS", "Amazon ECS", "AWS Fargate", "Container Insights"],
    metric: "100% namespace attribution",
    insight: "Identified over-provisioned memory requests in staging-api namespace"
  },
  {
    number: "03",
    label: "LAYER 03 — The Data Engines",
    title: "Databases & Serverless Workloads",
    description: "Aurora read-replicas, DynamoDB on-demand spikes, and Lambda execution duration often escalate without warning. Our rule-based anomaly monitors detect abnormal multi-AZ failovers within hours.",
    services: ["Amazon RDS Aurora", "Amazon DynamoDB", "AWS Lambda", "ElastiCache"],
    metric: "$14,630 normalized spend",
    insight: "Rule RDS-FAILOVER-DEV flagged +$340 daily surge"
  },
  {
    number: "04",
    label: "LAYER 04 — The Hidden Margin Drain",
    title: "Data Transfer & Network Egress",
    description: "Inter-region replication, cross-AZ traffic, and NAT Gateway processing fees silently erode gross margins. CloudLens monitors data pipelines to surface hidden egress paths and recommend cost-effective VPC endpoints.",
    services: ["AWS NAT Gateways", "Amazon CloudFront", "VPC Peering", "Direct Connect"],
    metric: "Zero egress blind spots",
    insight: "Migrating to S3 Gateway Endpoint saved $420/mo in NAT data fees"
  }
];

export default function FinOpsLayersSection() {
  const [activeLayer, setActiveLayer] = useState(0);

  const prev = () => setActiveLayer((curr) => (curr > 0 ? curr - 1 : LAYERS.length - 1));
  const next = () => setActiveLayer((curr) => (curr < LAYERS.length - 1 ? curr + 1 : 0));

  const current = LAYERS[activeLayer];

  return (
    <section
      id="features"
      style={{
        backgroundColor: 'var(--color-olive-cream)',
        color: 'var(--color-charcoal)',
        padding: '100px 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Bridge - 2-Column Lockup */}
        <div className="section-bridge">
          <div className="section-bridge-title">
            <div className="coda-pill coda-pill-cream" style={{ marginBottom: '16px', background: 'rgba(32, 32, 32, 0.08)' }}>
              <span>Infrastructure Architecture</span>
            </div>
            <h2 className="type-header-3xl" style={{ color: 'var(--color-charcoal)' }}>
              Cloud spend lives in four layers.
            </h2>
          </div>
          <div className="section-bridge-desc">
            <p className="type-body-m" style={{ color: 'var(--color-muted-olive)', marginBottom: '16px' }}>
              Traditional cloud invoices only provide a single aggregated monthly bill. CloudLens breaks down your cloud
              capital into four distinct operational domains with deterministic attribution.
            </p>
            {/* Coda Squircle Stepper Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={prev}
                aria-label="Previous Layer"
                className="squircle-btn squircle-btn-light"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next Layer"
                className="squircle-btn squircle-btn-light"
              >
                <ArrowRight size={16} />
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-olive)', alignSelf: 'center', marginLeft: '8px', fontWeight: 600 }}>
                {activeLayer + 1} / {LAYERS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Coda Benefits Stack Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {LAYERS.map((layer, idx) => {
            const isActive = idx === activeLayer;
            return (
              <div
                key={layer.number}
                onClick={() => setActiveLayer(idx)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#181824',
                  border: isActive ? '2px solid #2d62ff' : '1px solid #e0e0eb',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 14px 34px rgba(45, 98, 255, 0.12)' : '0 2px 8px rgba(24, 24, 36, 0.03)',
                  transform: isActive ? 'translateY(-3px)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: isActive ? '#2d62ff' : '#181824'
                    }}
                  >
                    {layer.number}
                  </span>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isActive ? '#2d62ff' : '#cdcddd'
                    }}
                  />
                </div>

                <h3
                  className="type-header-xl"
                  style={{
                    color: '#181824',
                    marginBottom: '10px'
                  }}
                >
                  {layer.title}
                </h3>

                <p
                  className="type-body-s"
                  style={{
                    color: '#575783',
                    marginBottom: '20px',
                    lineHeight: 1.55
                  }}
                >
                  {layer.description}
                </p>

                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid #e0e0eb',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#2d62ff' }}>
                    Verified Insight
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#181824', fontWeight: 500 }}>
                    {layer.insight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
