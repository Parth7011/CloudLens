import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatUSD } from '../utils/currency.js';
import { MOCK_SAVINGS_TIERS } from '../mocks/costData.js';

export default function SavingsCalculatorSection() {
  const [selectedTierIndex, setSelectedTierIndex] = useState(2); // default: $45,000 tier
  const currentTier = MOCK_SAVINGS_TIERS[selectedTierIndex] || MOCK_SAVINGS_TIERS[2];

  return (
    <section
      id="calculator"
      style={{
        backgroundColor: '#ffffff',
        color: '#181824',
        padding: '90px 0',
        position: 'relative',
        borderTop: '1px solid #e0e0eb'
      }}
    >
      <div className="container">
        {/* Scale Metrics Strip */}
        <div
          style={{
            borderBottom: '1px solid #e0e0eb',
            paddingBottom: '50px',
            marginBottom: '60px'
          }}
        >
          <p
            className="type-ui-label"
            style={{
              textAlign: 'center',
              color: '#2d62ff',
              marginBottom: '20px',
              fontWeight: 700
            }}
          >
            Built to operate at enterprise scale
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#181824' }}>
                99.99%
              </p>
              <p style={{ fontSize: '0.85rem', color: '#575783', marginTop: '4px' }}>
                telemetry pipeline uptime
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#2d62ff' }}>
                300+
              </p>
              <p style={{ fontSize: '0.85rem', color: '#575783', marginTop: '4px' }}>
                AWS accounts monitored
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#181824' }}>
                &lt; 3 hrs
              </p>
              <p style={{ fontSize: '0.85rem', color: '#575783', marginTop: '4px' }}>
                average anomaly detection speed
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#2d62ff' }}>
                100%
              </p>
              <p style={{ fontSize: '0.85rem', color: '#575783', marginTop: '4px' }}>
                deterministic rule transparency
              </p>
            </div>
          </div>
        </div>

        {/* Section Bridge */}
        <div className="section-bridge">
          <div className="section-bridge-title">
            <div
              style={{
                display: 'inline-flex',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#e0e0ff',
                color: '#2d62ff',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}
            >
              Interactive ROI Benchmark
            </div>
            <h2 className="type-header-3xl" style={{ color: '#181824' }}>
              Estimate your recoverable cloud capital.
            </h2>
          </div>
          <div className="section-bridge-desc">
            <p className="type-body-m" style={{ color: '#575783' }}>
              Industry benchmarks indicate engineering teams routinely carry 20% to 32% in unattached,
              over-provisioned, or un-committed cloud infrastructure. Inspect your potential return.
            </p>
          </div>
        </div>

        {/* Calculator Widget Frame */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e0e0eb',
            padding: '36px',
            boxShadow: '0 20px 45px -10px rgba(24, 24, 36, 0.06)'
          }}
        >
          {/* Slider Controls */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <label htmlFor="spend-tier-slider" style={{ fontSize: '1rem', fontWeight: 600, color: '#181824' }}>
                Monthly AWS Infrastructure Spend:
              </label>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#2d62ff'
                }}
              >
                {formatUSD(currentTier.monthlySpend)}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#575783', marginLeft: '4px' }}>/mo</span>
              </div>
            </div>

            <input
              id="spend-tier-slider"
              type="range"
              min="0"
              max={MOCK_SAVINGS_TIERS.length - 1}
              step="1"
              value={selectedTierIndex}
              onChange={(e) => setSelectedTierIndex(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                accentColor: '#2d62ff',
                cursor: 'pointer'
              }}
              aria-label="Select Monthly AWS Spend Benchmark Tier"
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.75rem', color: '#575783' }}>
              <span>$10,000/mo</span>
              <span>$25,000/mo</span>
              <span>$45,000/mo</span>
              <span>$100,000/mo</span>
              <span>$250,000+/mo</span>
            </div>
          </div>

          {/* Results Grid - Clean Light Surface */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              padding: '28px',
              backgroundColor: '#f8f8fc',
              borderRadius: '16px',
              border: '1px solid #e0e0eb',
              marginBottom: '28px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                Est. Monthly Recoverable Spend
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#2d62ff', margin: '4px 0' }}>
                {formatUSD(currentTier.estimatedMonthlySavings)}
              </p>
              <span style={{ fontSize: '0.75rem', color: '#575783' }}>
                ~{currentTier.wastePercentage}% of monthly infrastructure
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                Est. Annualized Capital Savings
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#181824', margin: '4px 0' }}>
                {formatUSD(currentTier.annualSavings)}
              </p>
              <span style={{ fontSize: '0.75rem', color: '#575783' }}>
                Reinvested in engineering velocity
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#575783', textTransform: 'uppercase', fontWeight: 700 }}>
                Engineering Hours Reclaimed
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#2d62ff', margin: '4px 0' }}>
                {currentTier.hoursSaved} hrs/yr
              </p>
              <span style={{ fontSize: '0.75rem', color: '#575783' }}>
                Automated anomaly and budget tracking
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#575783' }}>
              <CheckCircle2 size={16} color="#2d62ff" />
              <span>Based on verified FinOps Foundation industry benchmarks</span>
            </div>

            <Link
              to="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#181824',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.92rem',
                padding: '12px 24px',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(24, 24, 36, 0.12)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181824')}
            >
              <span>Start Recovering Spend</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
