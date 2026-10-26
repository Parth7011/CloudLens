import React, { useState, useEffect } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import { getIntegrations } from '../services/costRepository.js';
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Database,
  Wifi,
  WifiOff,
  Server,
  Globe,
  Info,
  Zap,
  Shield,
  ChevronRight,
  Activity,
} from 'lucide-react';

const SYNC_HISTORY = [
  { id: 's1', timestamp: '2026-10-26 17:04 UTC', status: 'success', records: 28410, duration: '1m 12s' },
  { id: 's2', timestamp: '2026-10-26 16:04 UTC', status: 'success', records: 28380, duration: '1m 08s' },
  { id: 's3', timestamp: '2026-10-26 15:04 UTC', status: 'success', records: 28350, duration: '1m 15s' },
  { id: 's4', timestamp: '2026-10-26 14:04 UTC', status: 'failed', records: 0, duration: '0m 42s' },
  { id: 's5', timestamp: '2026-10-26 13:04 UTC', status: 'success', records: 28290, duration: '1m 10s' },
];

const COMING_SOON_PROVIDERS = [
  {
    id: 'gcp',
    name: 'Google Cloud',
    abbr: 'GCP',
    color: '#4285F4',
    tagline: 'BigQuery Billing Export',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    abbr: 'AZ',
    color: '#0078D4',
    tagline: 'Azure Cost Management API',
  },
  {
    id: 'oci',
    name: 'Oracle Cloud',
    abbr: 'OCI',
    color: '#F80000',
    tagline: 'OCI Usage Reports',
  },
];

export default function IntegrationsPage() {
  const [integration, setIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('123456789012');
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getIntegrations();
      setIntegration(data);
    } catch (err) {
      console.error('Failed to load integrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSyncNow = () => {
    if (syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setToast('Demo refresh finished. No AWS sync was performed.');
      setTimeout(() => setToast(''), 3500);
    }, 2500);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Cloud Provider Integrations"
          subtitle="Manage billing data connectors and monitor sync health"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={fetchData}
        />
        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>

          {/* Toast */}
          {toast && (
            <div style={{
              position: 'fixed', top: '20px', right: '24px', zIndex: 9999,
              backgroundColor: '#181824', color: '#fff', padding: '12px 20px',
              borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600,
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: '8px',
              animation: 'fadeIn 0.2s ease',
            }}>
              <CheckCircle2 size={16} color="#22c55e" />
              {toast}
            </div>
          )}

          {/* KPI Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {/* Connected Providers */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Provider Status</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#16a34a', fontSize: '0.72rem', fontWeight: 700 }}>Active</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>AWS</div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>No AWS account is connected</div>
            </div>
            {/* Last Sync */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Last Sync</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#eef2ff', color: '#2d62ff', fontSize: '0.72rem', fontWeight: 700 }}>Sample</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Demo only</div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>Example history shown below</div>
            </div>
            {/* Records Ingested */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Records Ingested</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#eef2ff', color: '#2d62ff', fontSize: '0.72rem', fontWeight: 700 }}>Mock data</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>28,410</div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>Sample billing rows</div>
            </div>
            {/* Sync Health */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '12px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 600 }}>Sync Health</span>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#16a34a', fontSize: '0.72rem', fontWeight: 700 }}>Unavailable</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Not connected</div>
              <div style={{ fontSize: '0.78rem', color: '#575783', marginTop: '4px' }}>Live sync health is unavailable</div>
            </div>
          </div>

          {/* AWS Provider Connection Card */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* AWS Logo Badge */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px',
                  backgroundColor: '#FF9900', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255,153,0,0.3)',
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', fontFamily: 'var(--font-display)' }}>AWS</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Amazon Web Services</span>
                    <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
                      Demo Data
                    </span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#575783' }}>CUR 2.0 sample data; no AWS account connected</span>
                </div>
              </div>
              {/* Sync Now Button */}
              <button
                onClick={handleSyncNow}
                disabled={syncing}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px',
                  backgroundColor: syncing ? '#e0e0eb' : '#2d62ff',
                  color: syncing ? '#575783' : '#ffffff',
                  border: 'none', cursor: syncing ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: '0.88rem',
                  transition: 'all 0.2s ease',
                  boxShadow: syncing ? 'none' : '0 4px 12px rgba(45,98,255,0.25)',
                }}
              >
                <RefreshCw size={15} style={{ animation: syncing ? 'spin 1s linear infinite' : 'none' }} />
                {syncing ? 'Simulating...' : 'Simulate Sync'}
              </button>
            </div>

            {/* Connection Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#f8f8fc', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Sample Account ID</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824', fontFamily: 'monospace' }}>123456789012</div>
              </div>
              <div style={{ backgroundColor: '#f8f8fc', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Active Regions</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#181824' }}>ap-south-1, us-east-1, us-west-2</div>
              </div>
              <div style={{ backgroundColor: '#f8f8fc', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Data Source</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824' }}>CUR 2.0 Billing Export</div>
              </div>
              <div style={{ backgroundColor: '#f8f8fc', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Last Sync</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824' }}>Example: 17:04 UTC</div>
              </div>
              <div style={{ backgroundColor: '#f8f8fc', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Records Ingested</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824' }}>28,410 sample rows</div>
              </div>
              <div style={{ backgroundColor: '#f8f8fc', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 600, marginBottom: '4px' }}>Scope</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824' }}>14 Accounts · Multi-Region</div>
              </div>
            </div>

            {/* Sync Telemetry Pills */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[
                { icon: <Database size={13} />, text: '28,410 Sample Records', bg: '#eef2ff', color: '#2d62ff' },
                { icon: <Server size={13} />, text: '14 Demo Accounts', bg: '#dcfce7', color: '#16a34a' },
                { icon: <Globe size={13} />, text: 'Sample Regions', bg: '#fef3c7', color: '#d97706' },
              ].map((pill, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '5px 12px', borderRadius: '9999px',
                  backgroundColor: pill.bg, color: pill.color,
                  fontSize: '0.78rem', fontWeight: 700,
                }}>
                  {pill.icon}
                  {pill.text}
                </div>
              ))}
            </div>

            {/* Sync Job History */}
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#181824', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
                Sample Sync History
              </div>
              <div style={{ border: '1px solid #e0e0eb', borderRadius: '10px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f8fc' }}>
                      {['Timestamp', 'Status', 'Records', 'Duration'].map((h) => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#575783', fontSize: '0.75rem', borderBottom: '1px solid #e0e0eb' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SYNC_HISTORY.map((row, i) => (
                      <tr key={row.id} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafafa', borderBottom: i < SYNC_HISTORY.length - 1 ? '1px solid #f0f0f5' : 'none' }}>
                        <td style={{ padding: '10px 16px', color: '#181824', fontFamily: 'monospace', fontWeight: 600, fontSize: '0.82rem' }}>{row.timestamp}</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '2px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                            backgroundColor: row.status === 'success' ? '#dcfce7' : '#fee2e2',
                            color: row.status === 'success' ? '#16a34a' : '#dc2626',
                          }}>
                            {row.status === 'success'
                              ? <CheckCircle2 size={11} />
                              : <XCircle size={11} />}
                            {row.status === 'success' ? 'Success' : 'Failed'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 16px', color: '#181824', fontWeight: 600 }}>{row.records > 0 ? row.records.toLocaleString() : '—'}</td>
                        <td style={{ padding: '10px 16px', color: '#575783', fontWeight: 600 }}>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Coming Soon Providers */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)', margin: 0 }}>More Providers</h2>
              <p style={{ fontSize: '0.82rem', color: '#575783', margin: '4px 0 0' }}>Additional cloud integrations are coming in a future release.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {COMING_SOON_PROVIDERS.map((provider) => (
                <div key={provider.id} style={{
                  backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '14px',
                  padding: '22px', opacity: 0.6, cursor: 'not-allowed',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      backgroundColor: provider.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>{provider.abbr}</span>
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#f0f0f5', color: '#575783', fontSize: '0.72rem', fontWeight: 700 }}>Coming Soon</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181824', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{provider.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#575783' }}>{provider.tagline}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Connection Instructions Panel */}
          <div style={{
            backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '14px',
            padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={16} color="#2d62ff" />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181824', fontFamily: 'var(--font-display)' }}>How Mock CUR 2.0 Connection Works</div>
                <div style={{ fontSize: '0.78rem', color: '#575783' }}>Zero-credential, read-only demo integration</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { step: '1', icon: <Shield size={14} />, title: 'Future Read-Only IAM Policy', desc: 'A real AWS integration would use an approved, least-privilege read-only role. No AWS role is connected in this demo.' },
                { step: '2', icon: <Database size={14} />, title: 'CUR 2.0 Export Adapter', desc: 'Billing records are loaded from a static mock dataset that mirrors the AWS Cost and Usage Report 2.0 schema.' },
                { step: '3', icon: <RefreshCw size={14} />, title: 'Sync Demo', desc: 'The button runs a visual demo flow only; it does not contact AWS or refresh billing records.' },
                { step: '4', icon: <Zap size={14} />, title: 'No Real Credentials Needed', desc: 'This demo works entirely with static data. No AWS account, access keys, or S3 bucket are required to explore CloudLens.' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                    backgroundColor: '#eef2ff', color: '#2d62ff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', fontWeight: 800,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ color: '#2d62ff' }}>{item.icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#181824' }}>{item.title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#575783', lineHeight: '1.5' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
