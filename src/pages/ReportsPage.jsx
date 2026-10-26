import React, { useState, useEffect } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import { getReportData } from '../services/costRepository.js';
import { formatUSD } from '../utils/currency.js';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  BarChart2,
  Users,
  TrendingUp,
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const REPORT_TYPES = [
  { id: 'executiveSummary', label: 'Executive Summary', icon: LayoutDashboard },
  { id: 'serviceBreakdown', label: 'Service Breakdown', icon: BarChart2 },
  { id: 'teamAllocation', label: 'Team Allocation', icon: Users },
  { id: 'dailyTrend', label: 'Daily Trend', icon: TrendingUp }
];

// ─── Executive Summary ──────────────────────────────────────────────────────
function ExecutiveSummaryReport({ data }) {
  if (!data) return null;
  const { totalSpend, previousPeriodSpend, percentageChange, monthlyBudget, budgetUtilization, forecastEndOfMonth, topServices } = data;
  const remaining = monthlyBudget - totalSpend;
  const isOverForecast = forecastEndOfMonth > monthlyBudget;

  return (
    <div>
      {/* KPI Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          {
            label: 'MTD Total Spend',
            value: formatUSD(totalSpend),
            sub: `vs. ${formatUSD(previousPeriodSpend)} last month`,
            badge: `+${percentageChange}% MoM`,
            badgeBg: '#fee2e2',
            badgeColor: '#dc2626',
            valueColor: '#181824'
          },
          {
            label: 'Budget Utilization',
            value: `${budgetUtilization}%`,
            sub: `${formatUSD(remaining)} remaining of ${formatUSD(monthlyBudget)}`,
            badge: 'Warning',
            badgeBg: '#fef3c7',
            badgeColor: '#d97706',
            valueColor: '#d97706',
            showBar: true,
            barPct: budgetUtilization
          },
          {
            label: 'EOM Forecast',
            value: formatUSD(forecastEndOfMonth),
            sub: isOverForecast ? 'Projected to exceed budget' : 'Within budget',
            badge: isOverForecast ? 'Over Budget' : 'On Track',
            badgeBg: isOverForecast ? '#fee2e2' : '#ecfdf5',
            badgeColor: isOverForecast ? '#dc2626' : '#059669',
            valueColor: '#181824'
          }
        ].map((kpi, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0eb',
              borderRadius: '12px',
              padding: '18px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>{kpi.label}</span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: kpi.badgeBg,
                  color: kpi.badgeColor,
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}
              >
                {kpi.badge}
              </span>
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 800, color: kpi.valueColor, fontFamily: 'var(--font-display)' }}>
              {kpi.value}
            </div>
            {kpi.showBar && (
              <div style={{ height: '5px', backgroundColor: '#f0f0f5', borderRadius: '9999px', margin: '8px 0 4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(kpi.barPct, 100)}%`,
                    backgroundColor: kpi.barPct >= 90 ? '#dc2626' : kpi.barPct >= 80 ? '#f59e0b' : '#2d62ff',
                    borderRadius: '9999px'
                  }}
                />
              </div>
            )}
            <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: kpi.showBar ? 0 : '4px' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Spend vs Budget Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0eb',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '24px'
        }}
      >
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824', margin: '0 0 16px' }}>
          Spend vs. Budget Breakdown
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topServices.map((svc, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.82rem', color: '#181824', fontWeight: 500 }}>{svc.service}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#181824' }}>{formatUSD(svc.spend)}</span>
                  <span style={{ fontSize: '0.75rem', color: '#575783' }}>{svc.percentage}%</span>
                </div>
              </div>
              <div style={{ height: '6px', backgroundColor: '#f0f0f5', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${svc.percentage}%`,
                    backgroundColor: ['#2d62ff', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i % 5],
                    borderRadius: '9999px',
                    transition: 'width 0.5s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Service Breakdown ───────────────────────────────────────────────────────
function ServiceBreakdownReport({ data }) {
  const [sortField, setSortField] = useState('spend');
  const [sortDir, setSortDir] = useState('desc');

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sorted = [...(data || [])].sort((a, b) => {
    const va = a[sortField];
    const vb = b[sortField];
    if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
    return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
  });

  const maxSpend = Math.max(...sorted.map((r) => r.spend));

  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f8fc', borderBottom: '1px solid #e0e0eb' }}>
              {[
                { key: 'service', label: 'Service' },
                { key: 'region', label: 'Region' },
                { key: 'environment', label: 'Environment' },
                { key: 'spend', label: 'MTD Spend' },
                { key: 'lineItems', label: 'Records' },
                { key: 'change', label: 'MoM Change' }
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: sortField === col.key ? '#2d62ff' : '#575783',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {col.label} {sortField === col.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
              <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#575783', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                Proportion
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const isNeg = row.change.startsWith('-');
              return (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#181824' }}>{row.service}</td>
                  <td style={{ padding: '12px 16px', color: '#575783' }}>{row.region}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: row.environment === 'production' ? '#eef2ff' : '#f1f5f9',
                        color: row.environment === 'production' ? '#2d62ff' : '#64748b',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    >
                      {row.environment}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#181824' }}>{formatUSD(row.spend)}</td>
                  <td style={{ padding: '12px 16px', color: '#575783' }}>{row.lineItems}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isNeg ? '#059669' : '#dc2626', fontWeight: 700 }}>
                      {isNeg ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                      {row.change}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', minWidth: '120px' }}>
                    <div style={{ height: '6px', backgroundColor: '#f0f0f5', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${(row.spend / maxSpend) * 100}%`,
                          backgroundColor: '#2d62ff',
                          borderRadius: '9999px'
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Team Allocation ─────────────────────────────────────────────────────────
function TeamAllocationReport({ data }) {
  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f8fc', borderBottom: '1px solid #e0e0eb' }}>
              {['Team', 'Cost Center', 'Headcount', 'Primary Service', 'MTD Spend', '% of Total', 'Allocation'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: '#575783',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data || []).map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f5' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#181824' }}>{row.team}</td>
                <td style={{ padding: '12px 16px', color: '#575783' }}>
                  <code style={{ fontSize: '0.8rem', backgroundColor: '#f0f0f5', padding: '2px 6px', borderRadius: '4px' }}>{row.costCenter}</code>
                </td>
                <td style={{ padding: '12px 16px', color: '#575783', textAlign: 'center' }}>{row.headcount}</td>
                <td style={{ padding: '12px 16px', color: '#575783' }}>{row.primaryService}</td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#181824' }}>{formatUSD(row.spend)}</td>
                <td style={{ padding: '12px 16px', color: '#575783' }}>{row.percentage}%</td>
                <td style={{ padding: '12px 16px', minWidth: '120px' }}>
                  <div style={{ height: '6px', backgroundColor: '#f0f0f5', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${row.percentage}%`,
                        backgroundColor: ['#2d62ff', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i % 5],
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #e0e0eb',
          backgroundColor: '#f8f8fc',
          fontSize: '0.78rem',
          color: '#575783'
        }}
      >
        Team cost attribution is based on mock data for demonstration. Real attribution requires tagging policies and cost allocation tags.
      </div>
    </div>
  );
}

// ─── Daily Trend ─────────────────────────────────────────────────────────────
function DailyTrendReport({ data }) {
  if (!data || data.length === 0) return null;

  const W = 720, H = 240;
  const PAD = { top: 20, right: 20, bottom: 36, left: 60 };
  const maxSpend = Math.max(...data.map((d) => d.spend));
  const minSpend = Math.min(...data.map((d) => d.spend)) * 0.9;
  const budget = 1610;

  const xStep = (W - PAD.left - PAD.right) / (data.length - 1);
  const yRange = maxSpend - minSpend;

  const toY = (v) => PAD.top + ((maxSpend - v) / yRange) * (H - PAD.top - PAD.bottom);
  const toX = (i) => PAD.left + i * xStep;

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)},${toY(d.spend).toFixed(1)}`)
    .join(' ');

  const areaPath =
    `M ${toX(0).toFixed(1)},${toY(data[0].spend).toFixed(1)} ` +
    data.map((d, i) => `L ${toX(i).toFixed(1)},${toY(d.spend).toFixed(1)}`).join(' ') +
    ` L ${toX(data.length - 1).toFixed(1)},${H - PAD.bottom} L ${PAD.left},${H - PAD.bottom} Z`;

  const budgetY = toY(budget);

  const yTicks = 5;
  const yTickStep = yRange / (yTicks - 1);

  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', padding: '20px 24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824', margin: 0 }}>Daily Spend Trajectory — October 2026</h4>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#575783' }}>
            <div style={{ width: '20px', height: '3px', backgroundColor: '#2d62ff', borderRadius: '2px' }} />
            Daily Spend
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#575783' }}>
            <div style={{ width: '20px', height: '2px', backgroundColor: '#f59e0b', borderRadius: '2px', borderTop: '2px dashed #f59e0b' }} />
            Daily Budget ({formatUSD(budget)})
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#575783' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
            Anomaly Day
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: '420px', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="rpt-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d62ff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2d62ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis grid lines */}
          {Array.from({ length: yTicks }).map((_, i) => {
            const val = minSpend + i * yTickStep;
            const y = toY(val);
            return (
              <g key={i}>
                <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#f0f0f5" strokeWidth="1" />
                <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#575783">
                  ${Math.round(val / 100) * 100}
                </text>
              </g>
            );
          })}

          {/* Budget dashed line */}
          <line
            x1={PAD.left}
            y1={budgetY}
            x2={W - PAD.right}
            y2={budgetY}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* Area fill */}
          <path d={areaPath} fill="url(#rpt-area-grad)" />

          {/* Spend line */}
          <path d={linePath} fill="none" stroke="#2d62ff" strokeWidth="2.5" strokeLinejoin="round" />

          {/* X-axis labels (every 4 days) */}
          {data.map((d, i) => {
            if (i % 4 !== 0 && i !== data.length - 1) return null;
            return (
              <text key={i} x={toX(i)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize="10" fill="#575783">
                {d.date}
              </text>
            );
          })}

          {/* Anomaly markers */}
          {data.map((d, i) =>
            d.anomaly ? (
              <g key={`anom-${i}`}>
                <circle cx={toX(i)} cy={toY(d.spend)} r="5" fill="#dc2626" />
                <circle cx={toX(i)} cy={toY(d.spend)} r="9" fill="none" stroke="#dc2626" strokeWidth="1.5" opacity="0.4" />
              </g>
            ) : null
          )}

          {/* Data points */}
          {data.map((d, i) => (
            !d.anomaly && <circle key={i} cx={toX(i)} cy={toY(d.spend)} r="3" fill="#2d62ff" opacity="0.6" />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('executiveSummary');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportState, setExportState] = useState('idle'); // idle | loading | success | error
  const [selectedAccount, setSelectedAccount] = useState('123456789012');

  const fetchReport = async (type) => {
    setLoading(true);
    setError(null);
    setReportData(null);
    try {
      const data = await getReportData(type);
      setReportData(data);
    } catch (err) {
      console.error('Failed to load report:', err);
      setError('Failed to load report data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(activeReport);
  }, [activeReport]);

  const handleExport = () => {
    if (!reportData) return;
    setExportState('loading');

    setTimeout(() => {
      try {
        let csvRows = [];

        if (activeReport === 'executiveSummary') {
          csvRows = [
            ['Metric', 'Value'],
            ['Period', reportData.period],
            ['Total MTD Spend', reportData.totalSpend],
            ['Previous Period Spend', reportData.previousPeriodSpend],
            ['MoM Change (%)', reportData.percentageChange],
            ['Monthly Budget', reportData.monthlyBudget],
            ['Budget Utilization (%)', reportData.budgetUtilization],
            ['EOM Forecast', reportData.forecastEndOfMonth],
            [],
            ['Service', 'Spend', 'Percentage'],
            ...(reportData.topServices || []).map((s) => [s.service, s.spend, s.percentage])
          ];
        } else if (activeReport === 'serviceBreakdown') {
          csvRows = [
            ['Service', 'Region', 'Environment', 'Spend', 'Line Items', 'MoM Change'],
            ...(reportData || []).map((r) => [r.service, r.region, r.environment, r.spend, r.lineItems, r.change])
          ];
        } else if (activeReport === 'teamAllocation') {
          csvRows = [
            ['Team', 'Cost Center', 'Headcount', 'Primary Service', 'Spend', 'Percentage'],
            ...(reportData || []).map((r) => [r.team, r.costCenter, r.headcount, r.primaryService, r.spend, r.percentage])
          ];
        } else if (activeReport === 'dailyTrend') {
          csvRows = [
            ['Date', 'Spend', 'Anomaly'],
            ...(reportData || []).map((r) => [r.date, r.spend, r.anomaly ? 'Yes' : 'No'])
          ];
        }

        const csvContent = csvRows.map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cloudlens-${activeReport}-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setExportState('success');
        setTimeout(() => setExportState('idle'), 3000);
      } catch (err) {
        console.error('CSV export failed:', err);
        setExportState('error');
        setTimeout(() => setExportState('idle'), 3000);
      }
    }, 800);
  };

  const activeType = REPORT_TYPES.find((t) => t.id === activeReport);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Financial Reports & Export Engine"
          subtitle="Pre-configured cost reports with date range selection and client-side CSV exports"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={() => fetchReport(activeReport)}
        />

        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Report Controls Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            {/* Report Type Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '10px',
                padding: '5px',
                flexWrap: 'wrap'
              }}
            >
              {REPORT_TYPES.map((rt) => {
                const Icon = rt.icon;
                const isActive = activeReport === rt.id;
                return (
                  <button
                    key={rt.id}
                    onClick={() => setActiveReport(rt.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '7px 14px',
                      borderRadius: '7px',
                      border: 'none',
                      backgroundColor: isActive ? '#181824' : 'transparent',
                      color: isActive ? '#ffffff' : '#575783',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={15} />
                    {rt.label}
                  </button>
                );
              })}
            </div>

            {/* Export Button */}
            <button
              id="export-csv-btn"
              onClick={handleExport}
              disabled={exportState === 'loading' || loading || !!error}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor:
                  exportState === 'success' ? '#059669' : exportState === 'error' ? '#dc2626' : '#2d62ff',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: exportState === 'loading' || loading ? 'not-allowed' : 'pointer',
                opacity: loading || !!error ? 0.6 : 1,
                transition: 'background-color 0.3s ease'
              }}
            >
              {exportState === 'loading' ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generating...
                </>
              ) : exportState === 'success' ? (
                <>
                  <CheckCircle2 size={16} /> Downloaded!
                </>
              ) : exportState === 'error' ? (
                <>
                  <AlertTriangle size={16} /> Export Failed
                </>
              ) : (
                <>
                  <Download size={16} /> Export CSV
                </>
              )}
            </button>
          </div>

          {/* Report Metadata Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0eb',
              borderRadius: '10px',
              padding: '12px 18px',
              marginBottom: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeType && <activeType.icon size={16} color="#2d62ff" />}
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#181824' }}>{activeType?.label}</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#575783' }}>Period: <strong>October 2026</strong></div>
            <div style={{ fontSize: '0.82rem', color: '#575783' }}>Account: <strong>123456789012 — Production Core</strong></div>
            <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#575783', fontStyle: 'italic' }}>
              Demo data — values are pre-computed mock fixtures
            </div>
          </div>

          {/* Report Panel */}
          {loading ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '60px',
                textAlign: 'center',
                color: '#575783'
              }}
            >
              <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', display: 'block', margin: '0 auto 12px' }} />
              Loading {activeType?.label} report...
            </div>
          ) : error ? (
            <div
              style={{
                backgroundColor: '#fff1f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                color: '#b91c1c'
              }}
            >
              <AlertTriangle size={28} style={{ margin: '0 auto 10px', display: 'block' }} />
              <p style={{ margin: '0 0 14px', fontWeight: 600 }}>{error}</p>
              <button
                onClick={() => fetchReport(activeReport)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  backgroundColor: '#ffffff',
                  color: '#b91c1c',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Retry
              </button>
            </div>
          ) : !reportData ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '48px',
                textAlign: 'center',
                color: '#575783'
              }}
            >
              <FileText size={36} style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ margin: 0 }}>No data available for this report.</p>
            </div>
          ) : activeReport === 'executiveSummary' ? (
            <ExecutiveSummaryReport data={reportData} />
          ) : activeReport === 'serviceBreakdown' ? (
            <ServiceBreakdownReport data={reportData} />
          ) : activeReport === 'teamAllocation' ? (
            <TeamAllocationReport data={reportData} />
          ) : activeReport === 'dailyTrend' ? (
            <DailyTrendReport data={reportData} />
          ) : null}
        </main>
      </div>
    </div>
  );
}
