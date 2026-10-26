import React, { useState, useEffect, useMemo } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import { getOptimizationRecommendations } from '../services/costRepository.js';
import { formatUSD } from '../utils/currency.js';
import {
  Sparkles,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  X,
  RefreshCw,
  TrendingDown,
  AlertTriangle,
  ChevronRight,
  Info,
  Cpu,
  Database,
  HardDrive,
  Globe
} from 'lucide-react';

const CATEGORY_ICONS = {
  Compute: Cpu,
  Database: Database,
  Storage: HardDrive,
  Network: Globe
};

const IMPACT_STYLES = {
  high: { bg: '#fee2e2', color: '#dc2626', label: 'High Impact' },
  medium: { bg: '#fef3c7', color: '#d97706', label: 'Medium Impact' },
  low: { bg: '#ecfdf5', color: '#059669', label: 'Low Impact' }
};

const STATUS_STYLES = {
  new: { bg: '#eef2ff', color: '#2d62ff', label: 'New' },
  'in-review': { bg: '#fef3c7', color: '#d97706', label: 'In Review' },
  applied: { bg: '#ecfdf5', color: '#059669', label: 'Applied' },
  dismissed: { bg: '#f1f5f9', color: '#64748b', label: 'Dismissed' }
};

export default function OptimizationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('123456789012');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRec, setSelectedRec] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOptimizationRecommendations({
        category: categoryFilter,
        impact: impactFilter,
        status: statusFilter
      });
      setRecommendations(data);
    } catch (err) {
      console.error('Failed to load optimization recommendations:', err);
      setError('Failed to load recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter, impactFilter, statusFilter]);

  const filteredRecs = useMemo(() => {
    if (!searchQuery.trim()) return recommendations;
    const q = searchQuery.toLowerCase();
    return recommendations.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.resourceId.toLowerCase().includes(q) ||
        r.resourceName.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
    );
  }, [recommendations, searchQuery]);

  // KPI calculations from the full (unfiltered) source data shown in strip
  const totalSavingsMonthly = recommendations.reduce((s, r) => s + r.estimatedMonthlySavings, 0);
  const totalSavingsAnnual = recommendations.reduce((s, r) => s + r.estimatedAnnualSavings, 0);
  const idleCount = recommendations.filter((r) => r.title.toLowerCase().includes('idle') || r.title.toLowerCase().includes('orphan')).length;
  const rightsizingCount = recommendations.filter((r) => r.category === 'Compute' || r.category === 'Database').length;

  const handleStatusChange = (id, newStatus) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRec && selectedRec.id === id) {
      setSelectedRec((prev) => ({ ...prev, status: newStatus }));
    }
    const msg =
      newStatus === 'applied'
        ? 'Recommendation marked as applied.'
        : newStatus === 'dismissed'
        ? 'Recommendation dismissed.'
        : 'Status updated.';
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Rightsizing & Cost Optimization"
          subtitle="Rule-based idle detection, rightsizing opportunities, and commitment recommendations"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={fetchData}
        />

        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Toast */}
          {toastMessage && (
            <div
              style={{
                marginBottom: '20px',
                padding: '12px 18px',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={16} />
              {toastMessage}
            </div>
          )}

          {/* KPI Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            {[
              {
                label: 'Est. Monthly Savings',
                value: formatUSD(totalSavingsMonthly),
                sub: 'Across all open recommendations',
                badge: 'Estimate Only',
                badgeBg: '#eef2ff',
                badgeColor: '#2d62ff',
                valueColor: '#059669'
              },
              {
                label: 'Est. Annual Recovery',
                value: formatUSD(totalSavingsAnnual),
                sub: 'If all recommendations are applied',
                badge: 'Estimate Only',
                badgeBg: '#eef2ff',
                badgeColor: '#2d62ff',
                valueColor: '#059669'
              },
              {
                label: 'Idle Resources',
                value: `${idleCount} Found`,
                sub: 'Zero-utilization instances & volumes',
                badge: 'Action Required',
                badgeBg: '#fee2e2',
                badgeColor: '#dc2626',
                valueColor: '#181824'
              },
              {
                label: 'Rightsizing Opportunities',
                value: `${rightsizingCount} Detected`,
                sub: 'Compute & database downsizing',
                badge: 'Review',
                badgeBg: '#fef3c7',
                badgeColor: '#d97706',
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
                <div
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: kpi.valueColor,
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  {kpi.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Savings Disclaimer Banner */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              padding: '10px 16px',
              marginBottom: '20px',
              fontSize: '0.82rem',
              color: '#92400e',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertTriangle size={15} />
            <strong>Demo Data:</strong>&nbsp;All savings figures are pre-computed estimates for demonstration purposes only. Actual AWS savings depend on usage, pricing, and resource configurations.
          </div>

          {/* Filter Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0eb',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#575783', fontSize: '0.85rem', fontWeight: 600 }}>
                <Filter size={16} /> Filters:
              </div>

              {[
                {
                  value: categoryFilter,
                  onChange: setCategoryFilter,
                  options: [
                    { value: 'all', label: 'All Categories' },
                    { value: 'Compute', label: 'Compute' },
                    { value: 'Database', label: 'Database' },
                    { value: 'Storage', label: 'Storage' },
                    { value: 'Network', label: 'Network' }
                  ]
                },
                {
                  value: impactFilter,
                  onChange: setImpactFilter,
                  options: [
                    { value: 'all', label: 'All Impact Levels' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' }
                  ]
                },
                {
                  value: statusFilter,
                  onChange: setStatusFilter,
                  options: [
                    { value: 'all', label: 'All Statuses' },
                    { value: 'new', label: 'New' },
                    { value: 'in-review', label: 'In Review' },
                    { value: 'applied', label: 'Applied' },
                    { value: 'dismissed', label: 'Dismissed' }
                  ]
                }
              ].map((sel, i) => (
                <select
                  key={i}
                  value={sel.value}
                  onChange={(e) => sel.onChange(e.target.value)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0eb',
                    backgroundColor: '#f8f8fc',
                    color: '#181824',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {sel.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f8f8fc',
                border: '1px solid #e0e0eb',
                borderRadius: '8px',
                padding: '6px 12px'
              }}
            >
              <Search size={15} color="#575783" />
              <input
                type="text"
                placeholder="Search by title or resource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.85rem',
                  color: '#181824',
                  width: '210px'
                }}
              />
            </div>
          </div>

          {/* Result count */}
          {!loading && !error && (
            <div style={{ marginBottom: '12px', fontSize: '0.82rem', color: '#575783' }}>
              Showing <strong style={{ color: '#181824' }}>{filteredRecs.length}</strong> recommendation{filteredRecs.length !== 1 ? 's' : ''}
            </div>
          )}

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#575783' }}>
                <RefreshCw size={22} style={{ animation: 'spin 1s linear infinite', display: 'block', margin: '0 auto 10px' }} />
                Loading recommendations...
              </div>
            ) : error ? (
              <div
                style={{
                  backgroundColor: '#fff1f2',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center',
                  color: '#b91c1c'
                }}
              >
                <AlertTriangle size={28} style={{ margin: '0 auto 10px', display: 'block' }} />
                <p style={{ margin: 0, fontWeight: 600 }}>{error}</p>
                <button
                  onClick={fetchData}
                  style={{
                    marginTop: '14px',
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
            ) : filteredRecs.length === 0 ? (
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
                <Sparkles size={36} color="#2d62ff" style={{ margin: '0 auto 12px', display: 'block' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#181824', margin: '0 0 6px' }}>
                  No Recommendations Found
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#575783', margin: 0 }}>
                  Adjust filters or clear your search to see all optimization recommendations.
                </p>
              </div>
            ) : (
              filteredRecs.map((rec) => {
                const impactStyle = IMPACT_STYLES[rec.impact] || IMPACT_STYLES.low;
                const statusStyle = STATUS_STYLES[rec.status] || STATUS_STYLES.new;
                const CategoryIcon = CATEGORY_ICONS[rec.category] || Cpu;

                return (
                  <div
                    key={rec.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0eb',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px'
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <div
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            backgroundColor: '#f0f4ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#2d62ff',
                            flexShrink: 0
                          }}
                        >
                          <CategoryIcon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600 }}>{rec.category} · {rec.service}</div>
                          <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#181824', margin: '2px 0 0', fontFamily: 'var(--font-display)' }}>
                            {rec.title}
                          </h3>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            backgroundColor: impactStyle.bg,
                            color: impactStyle.color,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {impactStyle.label}
                        </span>
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <p style={{ fontSize: '0.85rem', color: '#575783', lineHeight: 1.55, margin: '0 0 10px' }}>
                          {rec.description}
                        </p>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#575783', fontWeight: 600, marginBottom: '2px' }}>Current Spec</div>
                            <code style={{ fontSize: '0.78rem', backgroundColor: '#f8f8fc', border: '1px solid #e0e0eb', padding: '3px 8px', borderRadius: '6px', color: '#181824' }}>
                              {rec.currentSpec}
                            </code>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#575783', fontWeight: 600, marginBottom: '2px' }}>Recommended Spec</div>
                            <code style={{ fontSize: '0.78rem', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '6px', color: '#065f46' }}>
                              {rec.recommendedSpec}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* Savings Panel */}
                      <div
                        style={{
                          backgroundColor: '#f8f8fc',
                          border: '1px solid #e0e0eb',
                          borderRadius: '10px',
                          padding: '14px 18px',
                          minWidth: '180px',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Est. Monthly Savings</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-display)' }}>
                          {formatUSD(rec.estimatedMonthlySavings)}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#575783', marginTop: '2px' }}>
                          {formatUSD(rec.estimatedAnnualSavings)}/yr estimate
                        </div>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div
                      style={{
                        paddingTop: '12px',
                        borderTop: '1px solid #f0f0f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#575783' }}>
                        <Clock size={13} />
                        Detected: {rec.detectedAt} · Region: {rec.region} · {rec.environment}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedRec(rec)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: '#f8f8fc',
                            border: '1px solid #e0e0eb',
                            color: '#2d62ff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <Info size={14} />
                          View Details
                        </button>

                        {rec.status !== 'applied' && rec.status !== 'dismissed' && (
                          <button
                            onClick={() => handleStatusChange(rec.id, 'applied')}
                            style={{
                              backgroundColor: '#181824',
                              border: 'none',
                              color: '#ffffff',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Mark Applied
                          </button>
                        )}

                        {rec.status !== 'dismissed' && rec.status !== 'applied' && (
                          <button
                            onClick={() => handleStatusChange(rec.id, 'dismissed')}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#575783',
                              padding: '6px 8px',
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            Dismiss
                          </button>
                        )}

                        {rec.status === 'applied' && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#059669',
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}
                          >
                            <CheckCircle2 size={14} /> Applied
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedRec && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(24, 24, 36, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedRec(null); }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              width: '100%',
              maxWidth: '580px',
              maxHeight: '88vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      backgroundColor: IMPACT_STYLES[selectedRec.impact]?.bg,
                      color: IMPACT_STYLES[selectedRec.impact]?.color,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    {IMPACT_STYLES[selectedRec.impact]?.label}
                  </span>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      backgroundColor: STATUS_STYLES[selectedRec.status]?.bg,
                      color: STATUS_STYLES[selectedRec.status]?.color,
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}
                  >
                    {STATUS_STYLES[selectedRec.status]?.label}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#181824', margin: 0, fontFamily: 'var(--font-display)' }}>
                  {selectedRec.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#575783', marginTop: '4px' }}>
                  {selectedRec.service} · {selectedRec.region} · {selectedRec.environment}
                </div>
              </div>
              <button onClick={() => setSelectedRec(null)} style={{ background: 'none', border: 'none', color: '#575783', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Resource Stats Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '14px',
                backgroundColor: '#f8f8fc',
                borderRadius: '10px',
                marginBottom: '18px'
              }}
            >
              {[
                { label: 'Resource ID', value: selectedRec.resourceId },
                { label: 'Resource Name', value: selectedRec.resourceName },
                { label: 'Avg Utilization', value: selectedRec.utilizationAvg },
                { label: 'Detection Confidence', value: selectedRec.confidence }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.72rem', color: '#575783' }}>{item.label}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#181824', marginTop: '2px', wordBreak: 'break-all' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Spec Comparison */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#181824', marginBottom: '8px' }}>
                Resource Specification Change
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Current</div>
                  <code style={{ fontSize: '0.8rem', backgroundColor: '#fff1f2', border: '1px solid #fecaca', padding: '6px 10px', borderRadius: '6px', color: '#b91c1c', display: 'block' }}>
                    {selectedRec.currentSpec}
                  </code>
                </div>
                <ChevronRight size={16} color="#575783" style={{ flexShrink: 0, marginTop: '16px' }} />
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Recommended</div>
                  <code style={{ fontSize: '0.8rem', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '6px 10px', borderRadius: '6px', color: '#065f46', display: 'block' }}>
                    {selectedRec.recommendedSpec}
                  </code>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#181824', marginBottom: '6px' }}>
                Analysis Detail
              </div>
              <p style={{ fontSize: '0.85rem', color: '#575783', lineHeight: 1.55, margin: 0 }}>
                {selectedRec.description}
              </p>
            </div>

            {/* Savings Summary */}
            <div
              style={{
                padding: '14px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                marginBottom: '18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065f46', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <TrendingDown size={15} /> Estimated Savings
                </div>
                <span style={{ fontSize: '0.72rem', color: '#575783' }}>Demo — not guaranteed</span>
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#575783' }}>Monthly</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>{formatUSD(selectedRec.estimatedMonthlySavings)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#575783' }}>Annual</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>{formatUSD(selectedRec.estimatedAnnualSavings)}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#047857', margin: '8px 0 0', lineHeight: 1.4 }}>
                {selectedRec.savingsNote}
              </p>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedRec(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0eb',
                  backgroundColor: '#ffffff',
                  color: '#575783',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              {selectedRec.status !== 'applied' && selectedRec.status !== 'dismissed' && (
                <button
                  onClick={() => handleStatusChange(selectedRec.id, 'applied')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#181824',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Mark as Applied
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
