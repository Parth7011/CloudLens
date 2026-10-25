import React, { useState, useEffect, useMemo } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import { getAnomalies } from '../services/costRepository.js';
import { formatUSD } from '../utils/currency.js';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  X,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('123456789012');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const fetchAnomaliesData = async () => {
    setLoading(true);
    try {
      const data = await getAnomalies({
        severity: severityFilter,
        status: statusFilter
      });
      setAnomalies(data);
    } catch (err) {
      console.error('Failed to load anomalies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomaliesData();
  }, [severityFilter, statusFilter]);

  const filteredAnomalies = useMemo(() => {
    if (!searchQuery.trim()) return anomalies;
    const q = searchQuery.toLowerCase();
    return anomalies.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.ruleId.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.resourceId.toLowerCase().includes(q)
    );
  }, [anomalies, searchQuery]);

  // Financial KPIs
  const activeCount = anomalies.filter((a) => a.status !== 'resolved').length;
  const uninvestigatedCount = anomalies.filter((a) => a.status === 'uninvestigated').length;
  const totalFinancialSurge = anomalies
    .filter((a) => a.status !== 'resolved')
    .reduce((acc, curr) => acc + curr.surgeAmount, 0);

  const handleStatusChange = (id, newStatus) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selectedAnomaly && selectedAnomaly.id === id) {
      setSelectedAnomaly((prev) => ({ ...prev, status: newStatus }));
    }
    const statusText = newStatus === 'acknowledged' ? 'acknowledged' : newStatus === 'resolved' ? 'marked as resolved' : newStatus;
    setToastMessage(`Anomaly alert ${statusText} successfully.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDismiss = (id) => {
    setAnomalies((prev) => prev.filter((a) => a.id !== id));
    if (selectedAnomaly && selectedAnomaly.id === id) {
      setSelectedAnomaly(null);
    }
    setToastMessage('Alert dismissed as false positive.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Anomaly Detection Center"
          subtitle="Rule-based spike detection, triage investigation hub, and root-cause telemetry"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={fetchAnomaliesData}
        />

        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Toast feedback */}
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
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Active Flags</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '0.72rem', fontWeight: 700 }}>
                  High Priority
                </span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                {activeCount} Anomalies
              </div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>
                Detected across AWS clusters
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Uninvestigated</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#fef3c7', color: '#d97706', fontSize: '0.72rem', fontWeight: 700 }}>
                  Needs Triage
                </span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                {uninvestigatedCount} Unreviewed
              </div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>
                Awaiting engineer review
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Total Financial Impact</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#eef2ff', color: '#2d62ff', fontSize: '0.72rem', fontWeight: 700 }}>
                  Surge / Day
                </span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-display)' }}>
                +{formatUSD(totalFinancialSurge)}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>
                Unplanned extra run-rate
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Detection Latency</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.72rem', fontWeight: 700 }}>
                  Automated
                </span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                &lt; 2.5 Hours
              </div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>
                Average discovery time
              </div>
            </div>
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

              {/* Severity Filter */}
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
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
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
                <option value="all">All Statuses</option>
                <option value="uninvestigated">Uninvestigated</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
              </select>
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
                placeholder="Search anomaly rule, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.85rem',
                  color: '#181824',
                  width: '200px'
                }}
              />
            </div>
          </div>

          {/* Anomaly Feed List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#575783' }}>
                <RefreshCw size={20} className="spin-animation" /> Loading anomaly telemetry...
              </div>
            ) : filteredAnomalies.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '40px',
                  textAlign: 'center',
                  color: '#575783'
                }}
              >
                <ShieldCheck size={36} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#181824', margin: '0 0 4px' }}>
                  No Anomalies Detected
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#575783', margin: 0 }}>
                  All AWS services are running within their expected statistical cost envelopes.
                </p>
              </div>
            ) : (
              filteredAnomalies.map((item) => {
                const isCrit = item.severity === 'critical';
                const isHigh = item.severity === 'high';
                const sevBg = isCrit ? '#fee2e2' : isHigh ? '#ffedd5' : '#fef3c7';
                const sevColor = isCrit ? '#dc2626' : isHigh ? '#ea580c' : '#d97706';

                const statusBg =
                  item.status === 'resolved' ? '#ecfdf5' : item.status === 'acknowledged' ? '#fef3c7' : '#fee2e2';
                const statusColor =
                  item.status === 'resolved' ? '#059669' : item.status === 'acknowledged' ? '#d97706' : '#dc2626';

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0eb',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            backgroundColor: sevBg,
                            color: sevColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {item.severity}
                        </span>

                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            backgroundColor: statusBg,
                            color: statusColor,
                            textTransform: 'capitalize'
                          }}
                        >
                          {item.status}
                        </span>

                        <code
                          style={{
                            fontSize: '0.78rem',
                            backgroundColor: '#f0f0f5',
                            color: '#181824',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          {item.ruleId}
                        </code>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#575783', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> Detected: {item.detectedAt}
                      </div>
                    </div>

                    {/* Title & Resource Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#181824', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
                          {item.title}
                        </h3>
                        <div style={{ fontSize: '0.82rem', color: '#575783' }}>
                          Service: <strong style={{ color: '#181824' }}>{item.service}</strong> • Resource:{' '}
                          <code style={{ fontSize: '0.78rem', backgroundColor: '#fafafc', padding: '1px 5px' }}>{item.resourceId}</code> • Region:{' '}
                          <strong>{item.region}</strong> ({item.environment})
                        </div>
                      </div>

                      {/* Surge Numbers */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: '#575783' }}>Surge Spike Impact</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#dc2626' }}>
                          +{formatUSD(item.surgeAmount)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#575783' }}>
                          Observed: {formatUSD(item.observedCost)} (Baseline: {formatUSD(item.baselineCost)})
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
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
                      <button
                        onClick={() => setSelectedAnomaly(item)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
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
                        Investigate Root Cause & Telemetry
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.status !== 'acknowledged' && item.status !== 'resolved' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'acknowledged')}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e0e0eb',
                              color: '#181824',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Acknowledge
                          </button>
                        )}

                        {item.status !== 'resolved' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'resolved')}
                            style={{
                              backgroundColor: '#181824',
                              border: 'none',
                              color: '#ffffff',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Mark as Resolved
                          </button>
                        )}

                        <button
                          onClick={() => handleDismiss(item.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#575783',
                            padding: '6px 8px',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          Dismiss (False Positive)
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Root-cause Telemetry Modal */}
      {selectedAnomaly && (
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
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              width: '100%',
              maxWidth: '560px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    backgroundColor: selectedAnomaly.severity === 'critical' ? '#fee2e2' : '#ffedd5',
                    color: selectedAnomaly.severity === 'critical' ? '#dc2626' : '#ea580c',
                    textTransform: 'uppercase'
                  }}
                >
                  {selectedAnomaly.severity} Severity Alert
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#181824', margin: '6px 0 0', fontFamily: 'var(--font-display)' }}>
                  {selectedAnomaly.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAnomaly(null)}
                style={{ background: 'none', border: 'none', color: '#575783', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Diagnostic stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '14px',
                backgroundColor: '#f8f8fc',
                borderRadius: '10px',
                marginBottom: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: '#575783' }}>Statistical Baseline</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#181824' }}>
                  {formatUSD(selectedAnomaly.baselineCost)} / day
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#575783' }}>Observed Peak Spend</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dc2626' }}>
                  {formatUSD(selectedAnomaly.observedCost)} / day
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#575783' }}>Service Resource</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#181824' }}>
                  {selectedAnomaly.service}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#575783' }}>Target AWS Region</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#181824' }}>
                  {selectedAnomaly.region} ({selectedAnomaly.environment})
                </div>
              </div>
            </div>

            {/* Root Cause Analysis */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#181824', marginBottom: '4px' }}>
                Automated Root Cause Diagnosis
              </div>
              <p style={{ fontSize: '0.85rem', color: '#575783', lineHeight: 1.5, margin: 0 }}>
                {selectedAnomaly.rootCause}
              </p>
            </div>

            {/* Recommended Action */}
            <div
              style={{
                padding: '14px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065f46', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} /> Recommended Remediation
              </div>
              <p style={{ fontSize: '0.85rem', color: '#047857', lineHeight: 1.5, margin: 0 }}>
                {selectedAnomaly.recommendation}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSelectedAnomaly(null)}
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
              {selectedAnomaly.status !== 'resolved' && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedAnomaly.id, 'resolved')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#181824',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
