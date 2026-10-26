import React, { useState } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import {
  User,
  Building2,
  SlidersHorizontal,
  Bell,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: <User size={15} /> },
  { id: 'organization', label: 'Organization', icon: <Building2 size={15} /> },
  { id: 'preferences', label: 'Preferences', icon: <SlidersHorizontal size={15} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
];

function FieldRow({ label, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#575783', marginBottom: '6px' }}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, disabled }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{
        width: '100%', padding: '10px 14px', borderRadius: '9px',
        border: '1.5px solid #e0e0eb', backgroundColor: disabled ? '#f8f8fc' : '#ffffff',
        fontSize: '0.88rem', color: '#181824', fontWeight: 600,
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s ease',
      }}
    />
  );
}

function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', padding: '10px 14px', borderRadius: '9px',
        border: '1.5px solid #e0e0eb', backgroundColor: '#ffffff',
        fontSize: '0.88rem', color: '#181824', fontWeight: 600,
        outline: 'none', boxSizing: 'border-box', cursor: 'pointer',
        appearance: 'auto',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

function SaveButton({ onClick, label = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 22px', borderRadius: '10px',
        backgroundColor: '#181824', color: '#ffffff',
        border: 'none', fontWeight: 700, fontSize: '0.88rem',
        cursor: 'pointer', transition: 'background 0.15s ease',
        boxShadow: '0 2px 8px rgba(24,24,36,0.12)',
      }}
    >
      {label}
    </button>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: '1px solid #f0f0f5',
    }}>
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#181824', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '0.78rem', color: '#575783' }}>{description}</div>
      </div>
      <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', flexShrink: 0, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '12px', transition: 'background 0.2s ease',
          backgroundColor: checked ? '#2d62ff' : '#e0e0eb',
        }}>
          <span style={{
            position: 'absolute', top: '3px',
            left: checked ? '23px' : '3px',
            width: '18px', height: '18px', borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            transition: 'left 0.2s ease',
          }} />
        </span>
      </label>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedAccount, setSelectedAccount] = useState('123456789012');
  const [toast, setToast] = useState('');

  // Profile state
  const [profile, setProfile] = useState({
    fullName: 'Finance Lead',
    email: 'finance.lead@acmecorp.io',
    role: 'Cloud Cost Lead',
    department: 'Engineering Finance',
  });

  // Organization state
  const [org, setOrg] = useState({
    name: 'Acme Corporation',
    industry: 'Technology',
    billingEntity: 'Acme Corp LLC',
    primaryCloud: 'Amazon Web Services',
  });

  // Preferences state
  const [prefs, setPrefs] = useState({
    currency: 'USD',
    dateRange: '30d',
    dashboardView: 'overview',
    numberFormat: 'en',
  });

  // Notification settings state
  const [notifSettings, setNotifSettings] = useState({
    budgetAlerts: true,
    anomalyDetections: true,
    syncEvents: true,
    weeklyDigest: false,
    systemStatus: true,
    slackWebhook: '',
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Settings"
          subtitle="Manage your profile, organization, and platform preferences"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={() => {}}
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

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'flex-start' }}>
            {/* Tab Navigation Sidebar */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '14px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '11px 14px', borderRadius: '9px',
                      border: 'none',
                      backgroundColor: isActive ? '#eef2ff' : 'transparent',
                      color: isActive ? '#2d62ff' : '#575783',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '0.85rem', cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      marginBottom: '2px',
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0eb', borderRadius: '14px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>

              {/* ── PROFILE TAB ── */}
              {activeTab === 'profile' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Profile</h2>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#575783' }}>Manage your personal account information.</p>
                  </div>
                  {/* Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%',
                      backgroundColor: '#181824', color: '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-display)',
                      flexShrink: 0,
                    }}>
                      FL
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181824' }}>{profile.fullName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#575783' }}>{profile.role} · {profile.department}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <FieldRow label="Full Name">
                      <TextInput value={profile.fullName} onChange={(v) => setProfile({ ...profile, fullName: v })} />
                    </FieldRow>
                    <FieldRow label="Work Email">
                      <TextInput value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
                    </FieldRow>
                    <FieldRow label="Role">
                      <TextInput value={profile.role} onChange={(v) => setProfile({ ...profile, role: v })} />
                    </FieldRow>
                    <FieldRow label="Department">
                      <TextInput value={profile.department} onChange={(v) => setProfile({ ...profile, department: v })} />
                    </FieldRow>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <SaveButton onClick={() => showToast('Profile saved successfully.')} label="Save Changes" />
                  </div>
                </div>
              )}

              {/* ── ORGANIZATION TAB ── */}
              {activeTab === 'organization' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Organization</h2>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#575783' }}>Configure organization-level metadata and billing entities.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <FieldRow label="Organization Name">
                      <TextInput value={org.name} onChange={(v) => setOrg({ ...org, name: v })} />
                    </FieldRow>
                    <FieldRow label="Industry">
                      <TextInput value={org.industry} onChange={(v) => setOrg({ ...org, industry: v })} />
                    </FieldRow>
                    <FieldRow label="Billing Entity">
                      <TextInput value={org.billingEntity} onChange={(v) => setOrg({ ...org, billingEntity: v })} />
                    </FieldRow>
                    <FieldRow label="Primary Cloud">
                      <TextInput value={org.primaryCloud} onChange={(v) => setOrg({ ...org, primaryCloud: v })} disabled />
                    </FieldRow>
                  </div>

                  <FieldRow label="AWS Account IDs">
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { id: '123456789012', label: 'Production' },
                        { id: '987654321098', label: 'Staging' },
                      ].map((acc) => (
                        <div key={acc.id} style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '6px 14px', borderRadius: '9999px',
                          backgroundColor: '#eef2ff', border: '1.5px solid #c7d4ff',
                          fontSize: '0.8rem', fontWeight: 700, color: '#2d62ff',
                        }}>
                          <span style={{ fontFamily: 'monospace' }}>{acc.id}</span>
                          <span style={{ color: '#575783', fontWeight: 500 }}>({acc.label})</span>
                        </div>
                      ))}
                    </div>
                  </FieldRow>

                  <div style={{ marginTop: '8px' }}>
                    <SaveButton onClick={() => showToast('Organization settings saved.')} label="Save Organization" />
                  </div>
                </div>
              )}

              {/* ── PREFERENCES TAB ── */}
              {activeTab === 'preferences' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Preferences</h2>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#575783' }}>Customize your default display and reporting settings.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <FieldRow label="Default Currency">
                      <SelectInput
                        value={prefs.currency}
                        onChange={(v) => setPrefs({ ...prefs, currency: v })}
                        options={[
                          { value: 'USD', label: 'USD — US Dollar' },
                          { value: 'EUR', label: 'EUR — Euro' },
                          { value: 'GBP', label: 'GBP — British Pound' },
                          { value: 'INR', label: 'INR — Indian Rupee' },
                        ]}
                      />
                    </FieldRow>
                    <FieldRow label="Default Date Range">
                      <SelectInput
                        value={prefs.dateRange}
                        onChange={(v) => setPrefs({ ...prefs, dateRange: v })}
                        options={[
                          { value: '30d', label: 'Last 30 Days' },
                          { value: '7d', label: 'Last 7 Days' },
                          { value: 'month', label: 'This Month' },
                          { value: 'quarter', label: 'Last Quarter' },
                        ]}
                      />
                    </FieldRow>
                    <FieldRow label="Default Dashboard View">
                      <SelectInput
                        value={prefs.dashboardView}
                        onChange={(v) => setPrefs({ ...prefs, dashboardView: v })}
                        options={[
                          { value: 'overview', label: 'Overview' },
                          { value: 'costs', label: 'Cost Explorer' },
                          { value: 'budgets', label: 'Budgets' },
                        ]}
                      />
                    </FieldRow>
                  </div>

                  {/* Number Format Radio */}
                  <FieldRow label="Number Format">
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {[
                        { value: 'en', label: '1,234.56  (US / International)' },
                        { value: 'de', label: '1.234,56  (European)' },
                      ].map((opt) => (
                        <label key={opt.value} style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '10px 16px', borderRadius: '9px',
                          border: `1.5px solid ${prefs.numberFormat === opt.value ? '#2d62ff' : '#e0e0eb'}`,
                          backgroundColor: prefs.numberFormat === opt.value ? '#eef2ff' : '#ffffff',
                          cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#181824',
                        }}>
                          <input
                            type="radio"
                            name="numberFormat"
                            value={opt.value}
                            checked={prefs.numberFormat === opt.value}
                            onChange={() => setPrefs({ ...prefs, numberFormat: opt.value })}
                            style={{ accentColor: '#2d62ff' }}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </FieldRow>

                  {/* Info Panel */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '14px 16px', borderRadius: '10px',
                    backgroundColor: '#f0f8ff', border: '1px solid #c7d4ff',
                    marginBottom: '20px',
                  }}>
                    <Info size={15} color="#2d62ff" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#2d62ff', fontWeight: 600, lineHeight: '1.5' }}>
                      These preferences are persisted to your browser session. They will reset if you clear local storage or use a different browser.
                    </p>
                  </div>

                  <SaveButton onClick={() => showToast('Preferences saved.')} label="Save Preferences" />
                </div>
              )}

              {/* ── NOTIFICATIONS TAB ── */}
              {activeTab === 'notifications' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>Notification Settings</h2>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#575783' }}>Choose which events trigger alerts and how you receive them.</p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <ToggleRow
                      label="Budget Threshold Alerts"
                      description="Get notified when a budget exceeds its configured warning or critical threshold."
                      checked={notifSettings.budgetAlerts}
                      onChange={(v) => setNotifSettings({ ...notifSettings, budgetAlerts: v })}
                    />
                    <ToggleRow
                      label="Anomaly Detections"
                      description="Receive alerts when unusual cost spikes are detected by the anomaly engine."
                      checked={notifSettings.anomalyDetections}
                      onChange={(v) => setNotifSettings({ ...notifSettings, anomalyDetections: v })}
                    />
                    <ToggleRow
                      label="Sync Completion Events"
                      description="Be notified when a billing data sync job completes or fails."
                      checked={notifSettings.syncEvents}
                      onChange={(v) => setNotifSettings({ ...notifSettings, syncEvents: v })}
                    />
                    <ToggleRow
                      label="Weekly Digest Email"
                      description="Receive a weekly summary of cost trends, anomalies, and budget health."
                      checked={notifSettings.weeklyDigest}
                      onChange={(v) => setNotifSettings({ ...notifSettings, weeklyDigest: v })}
                    />
                    <ToggleRow
                      label="System Status Updates"
                      description="Stay informed about CloudLens platform health and maintenance windows."
                      checked={notifSettings.systemStatus}
                      onChange={(v) => setNotifSettings({ ...notifSettings, systemStatus: v })}
                    />
                  </div>

                  {/* Slack Webhook */}
                  <FieldRow label="Slack Webhook URL">
                    <input
                      type="text"
                      value={notifSettings.slackWebhook}
                      onChange={(e) => setNotifSettings({ ...notifSettings, slackWebhook: e.target.value })}
                      placeholder="https://hooks.slack.com/services/..."
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: '9px',
                        border: '1.5px solid #e0e0eb', backgroundColor: '#ffffff',
                        fontSize: '0.85rem', color: '#181824', fontWeight: 600,
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </FieldRow>
                  <div style={{ marginTop: '8px' }}>
                    <SaveButton onClick={() => showToast('Notification settings saved.')} label="Save Notification Settings" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
