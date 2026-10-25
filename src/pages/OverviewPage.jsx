import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PiggyBank,
  BarChart3,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import KPISummaryGrid from '../components/KPISummaryGrid.jsx';
import SpendTrendChart from '../components/SpendTrendChart.jsx';
import TopServicesCard from '../components/TopServicesCard.jsx';
import RecentAnomaliesCard from '../components/RecentAnomaliesCard.jsx';
import { getOverviewSummary } from '../services/costRepository.js';

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kpis, setKpis] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('123456789012');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOverviewSummary();
      setKpis(data);
    } catch (err) {
      setError('Unable to load AWS overview telemetry. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedAccount]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8f8fc',
        color: '#181824'
      }}
    >
      {/* Persistent App Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <DashboardHeader
          title="Executive Overview"
          subtitle="Real-time multi-account AWS spending telemetry, budget pacing, and alerts"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={loadData}
        />

        {/* Dashboard Canvas */}
        <main style={{ padding: 'clamp(16px, 2.5vw, 28px)', flex: 1 }}>
          {loading ? (
            <div
              style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                color: '#575783'
              }}
            >
              <RefreshCw size={24} className="animate-spin" color="#2d62ff" />
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                Ingesting AWS telemetry for Account {selectedAccount}...
              </span>
            </div>
          ) : error ? (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                maxWidth: '480px',
                margin: '40px auto',
                color: '#991b1b'
              }}
            >
              <AlertCircle size={28} style={{ margin: '0 auto 10px auto' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>Telemetry Error</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>{error}</p>
              <button
                onClick={loadData}
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Retry Telemetry Ingestion
              </button>
            </div>
          ) : (
            <>
              {/* Row 1: Primary KPI Summary Grid */}
              <KPISummaryGrid kpis={kpis} />

              {/* Row 2: Spend Trend Chart & Top Services Breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                  gap: '20px',
                  marginBottom: '24px'
                }}
              >
                <SpendTrendChart dailyTrend={kpis?.dailyTrend} />
                <TopServicesCard topServices={kpis?.topServices} />
              </div>

              {/* Row 3: Operational Triage & FinOps Actions */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                  gap: '20px'
                }}
              >
                {/* Recent Flagged Anomalies */}
                <RecentAnomaliesCard />

                {/* Quick Action & FinOps Recommendations Hub */}
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
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#181824' }}>
                          FinOps Health & Governance
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: '#575783', marginTop: '2px' }}>
                          Deterministic health status across active policies
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          backgroundColor: '#ebfff5',
                          color: '#114e0b',
                          padding: '3px 8px',
                          borderRadius: '9999px'
                        }}
                      >
                        94% Compliant
                      </span>
                    </div>

                    {/* Policy List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <Link
                        to="/budgets"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          backgroundColor: '#f8f8fc',
                          border: '1px solid #e0e0eb',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2d62ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e0e0eb')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e0e0ff', color: '#2d62ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PiggyBank size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824' }}>Production Budget Target</div>
                            <div style={{ fontSize: '0.74rem', color: '#575783' }}>85.7% of $50,000 ceiling consumed</div>
                          </div>
                        </div>
                        <ArrowRight size={14} color="#575783" />
                      </Link>

                      <Link
                        to="/optimization"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          backgroundColor: '#f8f8fc',
                          border: '1px solid #e0e0eb',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2d62ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e0e0eb')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ebfff5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Sparkles size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824' }}>Right-Sizing & Idle Resources</div>
                            <div style={{ fontSize: '0.74rem', color: '#575783' }}>$6,840/mo recoverable across 5 recommendations</div>
                          </div>
                        </div>
                        <ArrowRight size={14} color="#575783" />
                      </Link>

                      <Link
                        to="/costs"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          backgroundColor: '#f8f8fc',
                          border: '1px solid #e0e0eb',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2d62ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e0e0eb')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f3f4f8', color: '#181824', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BarChart3 size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824' }}>Multidimensional Explorer</div>
                            <div style={{ fontSize: '0.74rem', color: '#575783' }}>Filter by Region, Service, and Environment tags</div>
                          </div>
                        </div>
                        <ArrowRight size={14} color="#575783" />
                      </Link>
                    </div>
                  </div>

                  {/* Trust Footer */}
                  <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #f0f0f5', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#575783' }}>
                    <ShieldCheck size={14} color="#10b981" />
                    <span>Deterministic telemetry synced with AWS Cost Explorer API</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
