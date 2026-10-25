import React, { useState } from 'react';
import { formatUSD } from '../utils/currency.js';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function SpendTrendChart({ dailyTrend }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'cumulative'

  // Default points fallback if not provided
  const points = dailyTrend && dailyTrend.length > 0 ? dailyTrend : [
    { date: 'Oct 01', spend: 1240, budgetDaily: 1610 },
    { date: 'Oct 05', spend: 1380, budgetDaily: 1610 },
    { date: 'Oct 09', spend: 1420, budgetDaily: 1610 },
    { date: 'Oct 13', spend: 2650, budgetDaily: 1610, anomaly: true, note: 'Runaway EKS Dev Pods' },
    { date: 'Oct 17', spend: 1480, budgetDaily: 1610 },
    { date: 'Oct 21', spend: 1510, budgetDaily: 1610 },
    { date: 'Oct 25', spend: 1620, budgetDaily: 1610 }
  ];

  // SVG dimensions
  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxSpend = Math.max(...points.map((p) => p.spend), 3000);
  const minSpend = 800;

  const getX = (idx) => paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
  const getY = (val) => height - paddingY - ((val - minSpend) / (maxSpend - minSpend)) * (height - paddingY * 2);

  const budgetY = getY(1610);

  // Build SVG path
  const pathD = points.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.spend);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L ${getX(points.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e0e0eb',
        padding: '24px',
        boxShadow: '0 4px 14px rgba(24, 24, 36, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Chart Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#181824' }}>
              Daily AWS Cost Trajectory
            </h3>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#2d62ff', backgroundColor: '#e0e0ff', padding: '2px 8px', borderRadius: '9999px' }}>
              October 2026
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#575783', marginTop: '2px' }}>
            Deterministic spend curve plotted against $1,610/day budget target
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: '#575783' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', backgroundColor: '#2d62ff', borderRadius: '2px' }} />
            <span>Actual Spend</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '1px', borderTop: '2px dashed #9ca3af' }} />
            <span>Daily Budget Cap</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
            <span>Anomaly Alert</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d62ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2d62ff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[1000, 1500, 2000, 2500].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f0f0f5" strokeWidth="1" />
                <text x={paddingX - 8} y={y + 4} fill="#9ca3af" fontSize="10" textAnchor="end">
                  ${level}
                </text>
              </g>
            );
          })}

          {/* Budget baseline line */}
          <line
            x1={paddingX}
            y1={budgetY}
            x2={width - paddingX}
            y2={budgetY}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Area fill */}
          <path d={areaD} fill="url(#spendGradient)" />

          {/* Curve stroke */}
          <path d={pathD} fill="none" stroke="#2d62ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Data points */}
          {points.map((pt, idx) => {
            const cx = getX(idx);
            const cy = getY(pt.spend);
            const isAnomaly = pt.anomaly || pt.spend > 2000;

            return (
              <g key={idx}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isAnomaly ? 6 : 4}
                  fill={isAnomaly ? '#ef4444' : '#2d62ff'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                  onMouseEnter={() => setHoveredPoint({ ...pt, x: cx, y: cy })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Date axis label */}
                <text x={cx} y={height - 8} fill="#9ca3af" fontSize="10" textAnchor="middle">
                  {pt.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              top: Math.max(10, hoveredPoint.y - 65),
              left: Math.min(width - 160, Math.max(10, hoveredPoint.x - 70)),
              backgroundColor: '#181824',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.78rem',
              boxShadow: '0 6px 18px rgba(24, 24, 36, 0.25)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <div style={{ fontWeight: 700 }}>{hoveredPoint.date}: {formatUSD(hoveredPoint.spend)}</div>
            <div style={{ fontSize: '0.72rem', color: hoveredPoint.spend > 1610 ? '#fca5a5' : '#86efac', marginTop: '2px' }}>
              {hoveredPoint.spend > 1610 ? `+$${(hoveredPoint.spend - 1610).toFixed(0)} above daily cap` : 'Within daily budget'}
            </div>
            {hoveredPoint.note && (
              <div style={{ color: '#f87171', fontWeight: 600, fontSize: '0.72rem', marginTop: '3px' }}>
                ⚠ {hoveredPoint.note}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Footer Insight */}
      <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f0f0f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#575783' }}>
        <span>Average Daily Burn: <strong style={{ color: '#181824' }}>$1,428.34/day</strong></span>
        <span style={{ color: '#10b981', fontWeight: 600 }}>Forecast on track for $47,600 MTD</span>
      </div>
    </div>
  );
}
