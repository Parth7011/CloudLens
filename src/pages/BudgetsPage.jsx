import React, { useState, useEffect } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import { getBudgets } from '../services/costRepository.js';
import { formatUSD } from '../utils/currency.js';
import {
  ShieldAlert,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Sliders,
  Bell,
  X,
  Check,
  Hash,
  RefreshCw
} from 'lucide-react';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('123456789012');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [notificationToast, setNotificationToast] = useState('');

  // Form state for creating a budget
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Compute');
  const [formCap, setFormCap] = useState(15000);
  const [formWarning, setFormWarning] = useState(80);
  const [formCritical, setFormCritical] = useState(90);
  const [formChannel, setFormChannel] = useState('#cloud-alerts');

  const fetchBudgetsData = async () => {
    setLoading(true);
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (err) {
      console.error('Failed to load budgets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetsData();
  }, []);

  const totalMonthlyCap = budgets.reduce((acc, b) => acc + b.cap, 0) || 50000;
  const totalCurrentSpend = budgets.reduce((acc, b) => acc + b.currentSpend, 0) || 42850.40;
  const overallUtilization = ((totalCurrentSpend / totalMonthlyCap) * 100).toFixed(1);
  const remainingBudget = Math.max(0, totalMonthlyCap - totalCurrentSpend);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newBudget = {
      id: `b_custom_${Date.now()}`,
      name: formName,
      category: formCategory,
      scope: formCategory.toLowerCase(),
      period: 'Monthly',
      cap: Number(formCap),
      currentSpend: 0,
      projectedSpend: Number(formCap) * 0.85,
      unit: 'USD',
      warningThreshold: Number(formWarning),
      criticalThreshold: Number(formCritical),
      channel: formChannel.startsWith('#') ? formChannel : `#${formChannel}`,
      status: 'healthy',
      lastUpdated: 'Just now'
    };

    setBudgets([newBudget, ...budgets]);
    setShowCreateModal(false);
    setFormName('');
    setNotificationToast(`Budget policy "${newBudget.name}" configured successfully!`);
    setTimeout(() => setNotificationToast(''), 3500);
  };

  const handleUpdateThresholds = (e) => {
    e.preventDefault();
    if (!editingBudget) return;

    setBudgets((prev) =>
      prev.map((b) => (b.id === editingBudget.id ? { ...editingBudget } : b))
    );
    setNotificationToast(`Threshold policy for "${editingBudget.name}" updated!`);
    setEditingBudget(null);
    setTimeout(() => setNotificationToast(''), 3500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Budgets & Alerting"
          subtitle="Proactive cloud guardrails, spending limit enforcements, and channel alerting"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={fetchBudgetsData}
        />

        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Header Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#181824', margin: 0, fontFamily: 'var(--font-display)' }}>
                Active Spend Guardrails
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#575783', margin: '4px 0 0' }}>
                Monitors real-time AWS billing telemetry and triggers webhooks before budget overruns occur
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#2d62ff',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(45, 98, 255, 0.2)',
                transition: 'transform 0.15s ease'
              }}
            >
              <Plus size={16} />
              Create Budget Policy
            </button>
          </div>

          {/* Toast Notification */}
          {notificationToast && (
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
                gap: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <CheckCircle size={16} />
              {notificationToast}
            </div>
          )}

          {/* Macro Overview Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0eb',
              borderRadius: '14px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 12px rgba(24, 24, 36, 0.03)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '20px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: '#eef2ff',
                      color: '#2d62ff'
                    }}
                  >
                    October 2026 Cycle
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#575783', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> 6 days remaining
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#181824', margin: 0, fontFamily: 'var(--font-display)' }}>
                  Total Consolidated Cloud Spend
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: '#575783' }}>Configured Macro Ceiling</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                  {formatUSD(totalMonthlyCap)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: '#181824', fontWeight: 600 }}>
                  MTD Actual Spend: <strong style={{ color: '#2d62ff' }}>{formatUSD(totalCurrentSpend)}</strong>
                </span>
                <span style={{ color: '#575783', fontWeight: 600 }}>
                  {overallUtilization}% consumed ({formatUSD(remainingBudget)} buffer remaining)
                </span>
              </div>
              <div
                style={{
                  height: '14px',
                  backgroundColor: '#f0f0f5',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, overallUtilization)}%`,
                    backgroundColor: Number(overallUtilization) > 90 ? '#ef4444' : Number(overallUtilization) > 80 ? '#f59e0b' : '#2d62ff',
                    borderRadius: '9999px',
                    transition: 'width 0.6s ease'
                  }}
                />
              </div>
            </div>

            {/* Pacing Metadata Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #f0f0f5'
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: '#575783' }}>Burn Velocity</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#181824', marginTop: '2px' }}>
                  $1,714.00 / day
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#575783' }}>Projected Month-End Spend</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
                  $47,600.00 (within cap)
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#575783' }}>Active Alert Enforcements</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#181824', marginTop: '2px' }}>
                  {budgets.length} policies active
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#575783' }}>Alert Dispatch Delivery</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#2d62ff', marginTop: '2px' }}>
                  Slack & PagerDuty Live
                </div>
              </div>
            </div>
          </div>

          {/* Budget Policy Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {loading ? (
              <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#575783' }}>
                <RefreshCw size={20} className="spin-animation" /> Loading budget policies...
              </div>
            ) : (
              budgets.map((b) => {
                const util = ((b.currentSpend / b.cap) * 100).toFixed(1);
                const isCritical = Number(util) >= b.criticalThreshold;
                const isWarning = !isCritical && Number(util) >= b.warningThreshold;

                const badgeBg = isCritical ? '#fee2e2' : isWarning ? '#fef3c7' : '#ecfdf5';
                const badgeColor = isCritical ? '#dc2626' : isWarning ? '#d97706' : '#059669';
                const statusLabel = isCritical ? 'CRITICAL EXCEEDED' : isWarning ? 'WARNING THRESHOLD' : 'HEALTHY PACE';

                return (
                  <div
                    key={b.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: `1px solid ${isCritical ? '#fca5a5' : isWarning ? '#fde68a' : '#e0e0eb'}`,
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            backgroundColor: badgeBg,
                            color: badgeColor,
                            letterSpacing: '0.04em'
                          }}
                        >
                          {statusLabel}
                        </span>

                        <span style={{ fontSize: '0.78rem', color: '#575783', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Hash size={12} /> {b.channel}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#181824', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
                        {b.name}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: '#575783', marginBottom: '16px' }}>
                        Scope: <strong>{b.scope}</strong> • Period: {b.period}
                      </div>

                      {/* Spend Figures */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#575783' }}>Current Spend</div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#181824' }}>
                            {formatUSD(b.currentSpend)}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.75rem', color: '#575783' }}>Ceiling Limit</div>
                          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#575783' }}>
                            {formatUSD(b.cap)}
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div
                        style={{
                          height: '8px',
                          backgroundColor: '#f0f0f5',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                          marginBottom: '8px'
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, util)}%`,
                            backgroundColor: isCritical ? '#dc2626' : isWarning ? '#d97706' : '#10b981',
                            borderRadius: '9999px'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#575783' }}>
                        <span>{util}% spent</span>
                        <span>Projected: {formatUSD(b.projectedSpend)}</span>
                      </div>
                    </div>

                    {/* Bottom threshold chips and adjust trigger */}
                    <div
                      style={{
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid #f0f0f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#f8f8fc',
                            border: '1px solid #e0e0eb',
                            color: '#575783'
                          }}
                        >
                          Warn: {b.warningThreshold}%
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#f8f8fc',
                            border: '1px solid #e0e0eb',
                            color: '#575783'
                          }}
                        >
                          Crit: {b.criticalThreshold}%
                        </span>
                      </div>

                      <button
                        onClick={() => setEditingBudget({ ...b })}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#2d62ff',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Sliders size={13} /> Edit Thresholds
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Create Budget Modal */}
      {showCreateModal && (
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
              maxWidth: '480px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#181824', margin: 0, fontFamily: 'var(--font-display)' }}>
                New Budget Guardrail
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', color: '#575783', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                  Policy Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Serverless Lambda APIs"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0eb',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0eb',
                      fontSize: '0.85rem',
                      backgroundColor: '#f8f8fc'
                    }}
                  >
                    <option value="Compute">Compute</option>
                    <option value="Databases">Databases</option>
                    <option value="Storage">Storage</option>
                    <option value="Networking">Networking</option>
                    <option value="Staging">Staging</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                    Monthly Cap (USD)
                  </label>
                  <input
                    type="number"
                    value={formCap}
                    onChange={(e) => setFormCap(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0eb',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                    Warning Alert (%)
                  </label>
                  <input
                    type="number"
                    value={formWarning}
                    onChange={(e) => setFormWarning(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0eb',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                    Critical Alert (%)
                  </label>
                  <input
                    type="number"
                    value={formCritical}
                    onChange={(e) => setFormCritical(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0eb',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                  Slack Channel or Webhook
                </label>
                <input
                  type="text"
                  placeholder="#cloud-alerts"
                  value={formChannel}
                  onChange={(e) => setFormChannel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0eb',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#2d62ff',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Threshold Modal */}
      {editingBudget && (
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
              maxWidth: '440px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#181824', margin: 0 }}>
                Adjust Thresholds: {editingBudget.name}
              </h3>
              <button
                onClick={() => setEditingBudget(null)}
                style={{ background: 'none', border: 'none', color: '#575783', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateThresholds} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                  Warning Threshold (% of Cap)
                </label>
                <input
                  type="number"
                  value={editingBudget.warningThreshold}
                  onChange={(e) =>
                    setEditingBudget({ ...editingBudget, warningThreshold: Number(e.target.value) })
                  }
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0eb',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#181824', marginBottom: '6px' }}>
                  Critical Threshold (% of Cap)
                </label>
                <input
                  type="number"
                  value={editingBudget.criticalThreshold}
                  onChange={(e) =>
                    setEditingBudget({ ...editingBudget, criticalThreshold: Number(e.target.value) })
                  }
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0eb',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingBudget(null)}
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
                  Cancel
                </button>
                <button
                  type="submit"
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
                  Update Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
