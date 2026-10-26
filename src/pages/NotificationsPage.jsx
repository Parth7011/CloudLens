import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import {
  AlertOctagon,
  AlertTriangle,
  Bell,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  X,
  ArrowRight,
  Info,
  XCircle,
} from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 'n1', type: 'anomaly', severity: 'critical', title: 'Critical Anomaly: EKS Pod Scaler Surge', desc: 'SURGE-DEV-NAMESPACE triggered — +$1,230/day above baseline.', time: '2 min ago', read: false, link: '/anomalies' },
  { id: 'n2', type: 'budget', severity: 'critical', title: 'Budget Breached: Core Compute Cluster', desc: 'EC2 budget has exceeded 90% threshold ($19,280 of $20,000).', time: '15 min ago', read: false, link: '/budgets' },
  { id: 'n3', type: 'anomaly', severity: 'high', title: 'High Anomaly: Aurora Multi-AZ Replica Burst', desc: 'UNPLANNED-MULTI-AZ-FAILOVER — +$335/day surge in RDS costs.', time: '3 hours ago', read: false, link: '/anomalies' },
  { id: 'n4', type: 'sync', severity: 'info', title: 'Sync Completed: AWS CUR 2.0', desc: '28,410 billing records refreshed from ap-south-1 and us-east-1.', time: '1 hour ago', read: false, link: '/integrations' },
  { id: 'n5', type: 'budget', severity: 'warning', title: 'Budget Warning: Managed Database Services', desc: 'RDS budget at 87% utilization ($10,450 of $12,000).', time: '5 hours ago', read: true, link: '/budgets' },
  { id: 'n6', type: 'anomaly', severity: 'medium', title: 'Medium Anomaly: S3 Glacier Sync Egress', desc: 'EGRESS-ANOMALY-BACKUP — inter-region transfer cost spike detected.', time: '1 day ago', read: true, link: '/anomalies' },
  { id: 'n7', type: 'sync', severity: 'error', title: 'Sync Failed: AWS CUR 2.0 (14:04 UTC)', desc: 'Temporary IAM permission error prevented billing data refresh.', time: '3 hours ago', read: true, link: '/integrations' },
  { id: 'n8', type: 'system', severity: 'info', title: 'CloudLens Platform Status: All Systems Operational', desc: '99.99% uptime recorded for October 2026. No degradation events.', time: '2 days ago', read: true, link: '/overview' },
];

const FILTER_TABS = ['All', 'Unread', 'Budget', 'Anomaly', 'Sync'];

function getIconForNotification(type, severity) {
  const iconProps = { size: 18 };
  if (type === 'anomaly') {
    if (severity === 'critical' || severity === 'high') return { el: <AlertOctagon {...iconProps} />, bg: '#fee2e2', color: '#dc2626' };
    return { el: <AlertTriangle {...iconProps} />, bg: '#fef3c7', color: '#d97706' };
  }
  if (type === 'budget') {
    if (severity === 'critical') return { el: <AlertOctagon {...iconProps} />, bg: '#fee2e2', color: '#dc2626' };
    return { el: <AlertTriangle {...iconProps} />, bg: '#fef3c7', color: '#d97706' };
  }
  if (type === 'sync') {
    if (severity === 'error') return { el: <XCircle {...iconProps} />, bg: '#fee2e2', color: '#dc2626' };
    return { el: <RefreshCw {...iconProps} />, bg: '#eef2ff', color: '#2d62ff' };
  }
  return { el: <Info {...iconProps} />, bg: '#f0fdf4', color: '#16a34a' };
}

function getTypeBadge(type, severity) {
  const labels = {
    anomaly: 'Anomaly',
    budget: 'Budget Alert',
    sync: severity === 'error' ? 'Sync Failed' : 'Sync Complete',
    system: 'System',
  };
  const styles = {
    anomaly: { bg: severity === 'critical' || severity === 'high' ? '#fee2e2' : '#fef3c7', color: severity === 'critical' || severity === 'high' ? '#dc2626' : '#d97706' },
    budget: { bg: severity === 'critical' ? '#fee2e2' : '#fef3c7', color: severity === 'critical' ? '#dc2626' : '#d97706' },
    sync: { bg: severity === 'error' ? '#fee2e2' : '#dcfce7', color: severity === 'error' ? '#dc2626' : '#16a34a' },
    system: { bg: '#f0f0f5', color: '#575783' },
  };
  const style = styles[type] || styles.system;
  return { label: labels[type] || type, ...style };
}

function getLinkLabel(type) {
  if (type === 'anomaly') return '→ View Anomaly';
  if (type === 'budget') return '→ View Budget';
  if (type === 'sync') return '→ View Integrations';
  return '→ View Details';
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState('123456789012');

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      if (activeFilter === 'Unread') return !n.read;
      if (activeFilter === 'Budget') return n.type === 'budget';
      if (activeFilter === 'Anomaly') return n.type === 'anomaly';
      if (activeFilter === 'Sync') return n.type === 'sync';
      return true;
    });
  }, [notifications, activeFilter]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Notification Center"
          subtitle="Budget alerts, anomaly discoveries, and sync events"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={() => setNotifications(MOCK_NOTIFICATIONS)}
        />
        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>

          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={20} color="#181824" />
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Alert Feed</span>
              </div>
              {unreadCount > 0 && (
                <span style={{
                  padding: '3px 10px', borderRadius: '9999px',
                  backgroundColor: '#2d62ff', color: '#ffffff',
                  fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {unreadCount} Unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '9px',
                  backgroundColor: '#ffffff', border: '1px solid #e0e0eb',
                  color: '#181824', fontWeight: 700, fontSize: '0.82rem',
                  cursor: 'pointer', transition: 'all 0.15s ease',
                }}
              >
                <CheckCircle2 size={14} color="#16a34a" />
                Mark All as Read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    padding: '7px 16px', borderRadius: '9px',
                    border: isActive ? '1.5px solid #2d62ff' : '1.5px solid #e0e0eb',
                    backgroundColor: isActive ? '#eef2ff' : '#ffffff',
                    color: isActive ? '#2d62ff' : '#575783',
                    fontWeight: 700, fontSize: '0.82rem',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Notification Feed */}
          {filtered.length === 0 ? (
            // Empty State
            <div style={{
              backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '16px',
              padding: '60px 24px', textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ShieldCheck size={26} color="#16a34a" />
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>All caught up!</div>
              <div style={{ fontSize: '0.85rem', color: '#575783' }}>No notifications to show for the selected filter.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map((notif) => {
                const icon = getIconForNotification(notif.type, notif.severity);
                const badge = getTypeBadge(notif.type, notif.severity);
                const linkLabel = getLinkLabel(notif.type);
                return (
                  <div
                    key={notif.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0eb',
                      borderLeft: notif.read ? '1px solid #e0e0eb' : '3px solid #2d62ff',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      transition: 'box-shadow 0.15s ease',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                      backgroundColor: icon.bg, color: icon.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {icon.el}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824' }}>{notif.title}</span>
                          <span style={{
                            padding: '2px 8px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700,
                            backgroundColor: badge.bg, color: badge.color,
                          }}>{badge.label}</span>
                          {!notif.read && (
                            <span style={{
                              width: '7px', height: '7px', borderRadius: '50%',
                              backgroundColor: '#2d62ff', display: 'inline-block', flexShrink: 0,
                            }} />
                          )}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 500, whiteSpace: 'nowrap' }}>{notif.time}</span>
                      </div>
                      <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#575783', lineHeight: '1.5' }}>{notif.desc}</p>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <Link
                          to={notif.link}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.78rem', fontWeight: 700, color: '#2d62ff',
                            textDecoration: 'none',
                          }}
                        >
                          {linkLabel} <ArrowRight size={12} />
                        </Link>
                        {!notif.read && (
                          <button
                            onClick={() => markRead(notif.id)}
                            style={{
                              padding: '4px 10px', borderRadius: '7px',
                              border: '1px solid #e0e0eb', backgroundColor: '#f8f8fc',
                              color: '#575783', fontWeight: 600, fontSize: '0.75rem',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                            }}
                          >
                            <CheckCircle2 size={11} />
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => dismiss(notif.id)}
                          style={{
                            padding: '4px 8px', borderRadius: '7px',
                            border: '1px solid #e0e0eb', backgroundColor: '#f8f8fc',
                            color: '#575783', fontWeight: 600, fontSize: '0.75rem',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                          }}
                        >
                          <X size={11} />
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
