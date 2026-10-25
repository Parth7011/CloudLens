import React from 'react';
import { TrendingUp, AlertTriangle, Sparkles, PiggyBank, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatUSD } from '../utils/currency.js';

export default function KPISummaryGrid({ kpis }) {
  if (!kpis) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      {/* KPI 1: Total MTD Spend */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e0e0eb',
          padding: '20px 22px',
          boxShadow: '0 4px 14px rgba(24, 24, 36, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
              Total AWS Spend (MTD)
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#dc2626',
                backgroundColor: '#fef2f2',
                padding: '2px 8px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <TrendingUp size={12} />
              +{kpis.percentageChange}%
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#181824',
              letterSpacing: '-0.03em'
            }}
          >
            {formatUSD(kpis.totalSpend)}
          </div>
        </div>

        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f0f0f5', fontSize: '0.76rem', color: '#575783' }}>
          Prior period baseline: <span style={{ fontWeight: 600, color: '#181824' }}>{formatUSD(kpis.previousPeriodSpend)}</span>
        </div>
      </div>

      {/* KPI 2: Budget Utilization */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e0e0eb',
          padding: '20px 22px',
          boxShadow: '0 4px 14px rgba(24, 24, 36, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
              Budget Utilization
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2d62ff' }}>
              {kpis.budgetUtilization}% Cap
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#181824',
              letterSpacing: '-0.03em'
            }}
          >
            {formatUSD(kpis.monthlyBudget)}
          </div>
        </div>

        <div>
          {/* Progress bar */}
          <div style={{ width: '100%', height: '7px', backgroundColor: '#f0f0f6', borderRadius: '4px', overflow: 'hidden', margin: '10px 0 6px 0' }}>
            <div
              style={{
                width: `${Math.min(100, kpis.budgetUtilization)}%`,
                height: '100%',
                backgroundColor: kpis.budgetUtilization > 90 ? '#ef4444' : '#2d62ff',
                borderRadius: '4px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#575783' }}>
            {formatUSD(kpis.monthlyBudget - kpis.totalSpend)} remaining cushion
          </div>
        </div>
      </div>

      {/* KPI 3: Active Anomalies */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e0e0eb',
          padding: '20px 22px',
          boxShadow: '0 4px 14px rgba(24, 24, 36, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
              Flagged Anomalies
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#b45309',
                backgroundColor: '#fef3c7',
                padding: '2px 8px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <AlertTriangle size={12} />
              {kpis.uninvestigatedAnomaliesCount} New
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#d97706',
              letterSpacing: '-0.03em'
            }}
          >
            {kpis.activeAnomaliesCount} Alerts
          </div>
        </div>

        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f0f0f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.76rem', color: '#575783' }}>Rule thresholds active</span>
          <Link
            to="/anomalies"
            style={{
              fontSize: '0.76rem',
              fontWeight: 600,
              color: '#2d62ff',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>Triage</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* KPI 4: Optimization Target */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e0e0eb',
          padding: '20px 22px',
          boxShadow: '0 4px 14px rgba(24, 24, 36, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#575783', letterSpacing: '0.04em' }}>
              Identified Savings
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#114e0b',
                backgroundColor: '#ebfff5',
                padding: '2px 8px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Sparkles size={12} />
              Recoverable
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#10b981',
              letterSpacing: '-0.03em'
            }}
          >
            {formatUSD(kpis.potentialSavings)}
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#575783', marginLeft: '3px' }}>/mo</span>
          </div>
        </div>

        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f0f0f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.76rem', color: '#575783' }}>5 waste insights ready</span>
          <Link
            to="/optimization"
            style={{
              fontSize: '0.76rem',
              fontWeight: 600,
              color: '#2d62ff',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>Optimize</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
