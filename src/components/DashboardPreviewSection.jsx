import React, { useState } from 'react';
import {
  TrendingUp, AlertTriangle, ShieldCheck,
  Calendar, ArrowRight, Zap, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatUSD } from '../utils/currency.js';
import { MOCK_OVERVIEW_KPIS } from '../mocks/costData.js';

export default function DashboardPreviewSection() {
  const [activePeriod, setActivePeriod] = useState('30d');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const kpis = MOCK_OVERVIEW_KPIS;

  // Static mock spend curve points for the preview SVG
  const trendPoints = [
    { day: 'Oct 01', cost: 1240, anomaly: false },
    { day: 'Oct 05', cost: 1380, anomaly: false },
    { day: 'Oct 09', cost: 1420, anomaly: false },
    { day: 'Oct 13', cost: 2650, anomaly: true, note: 'Runaway EKS Dev Pods' },
    { day: 'Oct 17', cost: 1480, anomaly: false },
    { day: 'Oct 21', cost: 1510, anomaly: false },
    { day: 'Oct 25', cost: 1620, anomaly: false }
  ];

  const services = [
    { name: 'Amazon EC2', spend: '$19,282.68', pct: 45, color: '#2d62ff' },
    { name: 'Amazon EKS', spend: '$10,284.10', pct: 24, color: '#575783' },
    { name: 'Amazon RDS', spend: '$6,856.06', pct: 16, color: '#10b981' },
    { name: 'Amazon S3', spend: '$3,856.54', pct: 9, color: '#f59e0b' },
    { name: 'AWS Lambda', spend: '$2,571.02', pct: 6, color: '#8b5cf6' }
  ];

  return (
    <section
      id="product-preview"
      style={{
        backgroundColor: '#f8f8fc',
        color: '#181824',
        padding: '90px 0',
        position: 'relative',
        borderBottom: '1px solid #e0e0eb'
      }}
    >
      <div className="container">
        {/* Section Bridge - 2-Column Lockup */}
        <div className="section-bridge" style={{ alignItems: 'flex-start', marginBottom: '44px' }}>
          <div className="section-bridge-title">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#e0e0ff',
                color: '#2d62ff',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2d62ff' }} />
              <span>Live Telemetry Engine</span>
            </div>
            <h2 className="type-header-3xl" style={{ color: '#181824' }}>
              Cloud spend analytics. <br />
              <span style={{ color: '#2d62ff' }}>Without the guesswork.</span>
            </h2>
          </div>
          <div className="section-bridge-desc">
            <p className="type-body-m" style={{ color: '#575783', marginBottom: '20px' }}>
              Experience the CloudLens analytics engine. Track daily spend trends, monitor budget caps,
              and receive instant alerts when resources deviate from expected baselines.
            </p>
            <Link
              to="/overview"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#181824',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.88rem',
                padding: '11px 22px',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(24, 24, 36, 0.12)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181824')}
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Dashboard Theater Frame - Pristine Light SaaS */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e0e0eb',
            boxShadow: '0 24px 60px -15px rgba(24, 24, 36, 0.08)',
            overflow: 'hidden'
          }}
        >
          {/* Top Bar Window Chrome */}
          <div
            style={{
              padding: '14px 24px',
              borderBottom: '1px solid #e0e0eb',
              backgroundColor: '#fcfcfe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.8rem', color: '#575783', marginLeft: '12px', fontWeight: 500 }}>
                app.cloudlens.io/analytics
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: '#114e0b', backgroundColor: '#ebfff5', padding: '3px 10px', borderRadius: '9999px', fontWeight: 600 }}>
                ● AWS Connected: 123456789012 (Production)
              </span>
              <div style={{ display: 'flex', background: '#f0f0f6', borderRadius: '9999px', padding: '3px' }}>
                {['7d', '30d', '90d', 'YTD'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      borderRadius: '9999px',
                      background: activePeriod === p ? '#ffffff' : 'transparent',
                      color: activePeriod === p ? '#181824' : '#575783',
                      boxShadow: activePeriod === p ? '0 2px 6px rgba(24, 24, 36, 0.08)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Internal Dashboard View */}
          <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
            {/* 4 Metric Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '14px',
                marginBottom: '24px'
              }}
            >
              {/* Card 1: Total Spend */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 2px 8px rgba(24, 24, 36, 0.02)'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                  Total AWS Spend (MTD)
                </span>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#181824', margin: '6px 0' }}>
                  {formatUSD(kpis.totalSpend)}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#dc2626' }}>
                  <TrendingUp size={12} />
                  <span>+{kpis.percentageChange}% vs previous month</span>
                </div>
              </div>

              {/* Card 2: Budget Utilization */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 2px 8px rgba(24, 24, 36, 0.02)'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                  Budget Utilization
                </span>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#2d62ff', margin: '6px 0' }}>
                  {kpis.budgetUtilization}%
                </p>
                <span style={{ fontSize: '0.75rem', color: '#575783' }}>
                  $42.8k of $50,000 monthly target
                </span>
              </div>

              {/* Card 3: Active Anomalies */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 2px 8px rgba(24, 24, 36, 0.02)'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                  Active Anomalies
                </span>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#d97706', margin: '6px 0' }}>
                  {kpis.activeAnomaliesCount} Flagged
                </p>
                <span style={{ fontSize: '0.75rem', color: '#575783' }}>
                  Rule-based threshold alerts
                </span>
              </div>

              {/* Card 4: Potential Savings */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 2px 8px rgba(24, 24, 36, 0.02)'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                  Optimization Target
                </span>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#10b981', margin: '6px 0' }}>
                  {formatUSD(kpis.potentialSavings)}/mo
                </p>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                  5 idle resource recommendations
                </span>
              </div>
            </div>

            {/* Main Interactive Chart & Service Breakdown Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '20px',
                alignItems: 'stretch'
              }}
            >
              {/* Daily Spend Trend SVG Visualizer */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: 'clamp(16px, 2.5vw, 22px)',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#181824' }}>Daily Spend Telemetry</h3>
                    <p style={{ fontSize: '0.78rem', color: '#575783' }}>Interactive daily telemetry curve with anomaly callout</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#2d62ff', fontWeight: 600 }}>
                    AWS Cost Ingestion Active
                  </span>
                </div>

                {/* SVG Curve Canvas */}
                <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <svg viewBox="0 0 500 160" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <defs>
                      <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2d62ff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#2d62ff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M 10 120 L 80 110 L 160 105 L 240 30 L 320 100 L 400 95 L 490 85 L 490 155 L 10 155 Z"
                      fill="url(#lightGradient)"
                    />

                    {/* Spend line */}
                    <path
                      d="M 10 120 L 80 110 L 160 105 L 240 30 L 320 100 L 400 95 L 490 85"
                      fill="none"
                      stroke="#2d62ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {trendPoints.map((pt, i) => {
                      const coords = [
                        [10, 120], [80, 110], [160, 105], [240, 30], [320, 100], [400, 95], [490, 85]
                      ][i];

                      return (
                        <g key={i}>
                          <circle
                            cx={coords[0]}
                            cy={coords[1]}
                            r={pt.anomaly ? 6 : 4}
                            fill={pt.anomaly ? '#ef4444' : '#2d62ff'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredPoint(pt)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                          {pt.anomaly && (
                            <text
                              x={coords[0]}
                              y={coords[1] - 12}
                              fill="#ef4444"
                              fontSize="10"
                              fontWeight="700"
                              textAnchor="middle"
                            >
                              ANOMALY
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tooltip on hover */}
                  {hoveredPoint && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#181824',
                        border: '1px solid #e0e0eb',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '0.75rem',
                        color: '#ffffff',
                        pointerEvents: 'none',
                        boxShadow: '0 4px 12px rgba(24, 24, 36, 0.15)'
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>{hoveredPoint.day}</span>: {formatUSD(hoveredPoint.cost)}
                      {hoveredPoint.note && (
                        <span style={{ display: 'block', color: '#f87171', fontWeight: 600 }}>
                          {hoveredPoint.note}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Service Breakdown */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '22px'
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#181824', marginBottom: '4px' }}>
                  Service Cost Allocation
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#575783', marginBottom: '18px' }}>
                  Top AWS service consumers this billing period
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {services.map((svc) => (
                    <div key={svc.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600, color: '#181824' }}>{svc.name}</span>
                        <span style={{ color: '#575783' }}>{svc.spend} ({svc.pct}%)</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#f0f0f5', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${svc.pct}%`,
                            height: '100%',
                            backgroundColor: svc.color,
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
