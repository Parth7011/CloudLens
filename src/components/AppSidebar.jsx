import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  PiggyBank,
  AlertTriangle,
  Sparkles,
  FileText,
  Boxes,
  Bell,
  Settings,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/costs', label: 'Cost Explorer', icon: BarChart3 },
  { path: '/budgets', label: 'Budgets', icon: PiggyBank },
  { path: '/anomalies', label: 'Anomalies', icon: AlertTriangle, badge: '3' },
  { path: '/optimization', label: 'Optimization', icon: Sparkles },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/integrations', label: 'Integrations', icon: Boxes },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function AppSidebar() {
  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e0eb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0
      }}
    >
      {/* Top Header & Brand */}
      <div>
        <div
          style={{
            height: '64px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0eb'
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: '#2d62ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="3" fill="#ffffff" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#181824',
                letterSpacing: '-0.025em'
              }}
            >
              CloudLens
            </span>
          </Link>

          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              backgroundColor: '#e0e0ff',
              color: '#2d62ff',
              padding: '3px 8px',
              borderRadius: '9999px',
              letterSpacing: '0.04em'
            }}
          >
            PROD
          </span>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              padding: '6px 12px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#575783',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            Platform
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#2d62ff' : '#575783',
                  backgroundColor: isActive ? '#f0f4ff' : 'transparent',
                  transition: 'all 0.15s ease'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      padding: '1px 7px',
                      borderRadius: '9999px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Account Indicator & Support */}
      <div style={{ padding: '16px', borderTop: '1px solid #e0e0eb' }}>
        <div
          style={{
            backgroundColor: '#f8f8fc',
            border: '1px solid #e0e0eb',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#181824',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem',
              fontWeight: 700
            }}
          >
            FL
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#181824', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Cloud Cost Lead
            </div>
            <div style={{ fontSize: '0.74rem', color: '#575783', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Acme Production
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
