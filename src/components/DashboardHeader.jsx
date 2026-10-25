import React, { useState } from 'react';
import { ChevronDown, Download, RefreshCw, Calendar, Check } from 'lucide-react';

export default function DashboardHeader({
  title = "Executive Overview",
  subtitle = "High-level cloud spend telemetry, budget caps, and anomaly detection",
  selectedAccount,
  onAccountChange,
  dateRange = "October 2026",
  onRefresh
}) {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const accounts = [
    { id: '123456789012', name: 'Production Core AWS', env: 'Production', region: 'Multi-Region' },
    { id: '987654321098', name: 'Staging & Dev AWS', env: 'Staging', region: 'us-east-1' },
    { id: 'all', name: 'All Consolidated Accounts (2)', env: 'Aggregated', region: 'Global' }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice(true);
      setTimeout(() => setExportNotice(false), 3000);
    }, 600);
  };

  const currentAccount = accounts.find((a) => a.id === selectedAccount) || accounts[0];

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0eb',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      {/* Title & Context */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#181824',
              letterSpacing: '-0.025em'
            }}
          >
            {title}
          </h1>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              backgroundColor: '#ebfff5',
              color: '#114e0b',
              padding: '2px 8px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
            Live Ingestion
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#575783' }}>
          {subtitle}
        </p>
      </div>

      {/* Control Tools */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {/* Account Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f8f8fc',
              border: '1px solid #e0e0eb',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: '#181824',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2d62ff' }} />
            <span>{currentAccount.name}</span>
            <ChevronDown size={14} color="#575783" />
          </button>

          {accountDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                width: '260px',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                boxShadow: '0 12px 30px rgba(24, 24, 36, 0.08)',
                padding: '6px',
                zIndex: 50
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#575783', padding: '6px 10px', textTransform: 'uppercase' }}>
                Select AWS Account
              </div>
              {accounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    if (onAccountChange) onAccountChange(acc.id);
                    setAccountDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: acc.id === selectedAccount ? '#f0f4ff' : 'transparent',
                    color: acc.id === selectedAccount ? '#2d62ff' : '#181824',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{acc.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#575783' }}>{acc.env} • {acc.id}</div>
                  </div>
                  {acc.id === selectedAccount && <Check size={14} color="#2d62ff" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0eb',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '0.84rem',
            color: '#181824',
            fontWeight: 500
          }}
        >
          <Calendar size={14} color="#575783" />
          <span>{dateRange}</span>
        </div>

        {/* Export Report Button */}
        <button
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#181824',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(24, 24, 36, 0.1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181824')}
        >
          <Download size={14} />
          <span>{isExporting ? 'Generating...' : 'Export'}</span>
        </button>

        {/* Toast notice for CSV export */}
        {exportNotice && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              backgroundColor: '#181824',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 100
            }}
          >
            <Check size={16} color="#10b981" />
            <span>Overview telemetry summary report exported as CSV.</span>
          </div>
        )}
      </div>
    </header>
  );
}
