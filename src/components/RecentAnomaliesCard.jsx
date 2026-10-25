import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { formatUSD } from '../utils/currency.js';

export default function RecentAnomaliesCard() {
  const anomalies = [
    {
      id: 'anom-01',
      service: 'Amazon EKS',
      rule: 'SURGE-DEV-NAMESPACE',
      amount: 1230.00,
      date: 'Oct 23, 2026',
      status: 'Uninvestigated',
      severity: 'Critical'
    },
    {
      id: 'anom-02',
      service: 'Amazon RDS',
      rule: 'UNPLANNED-MULTI-AZ',
      amount: 340.00,
      date: 'Oct 23, 2026',
      status: 'Uninvestigated',
      severity: 'High'
    },
    {
      id: 'anom-03',
      service: 'Amazon S3',
      rule: 'EGRESS-ANOMALY-BACKUP',
      amount: 180.00,
      date: 'Oct 22, 2026',
      status: 'Acknowledged',
      severity: 'Medium'
    }
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return { bg: '#fef2f2', text: '#dc2626' };
      case 'High':
        return { bg: '#fff7ed', text: '#ea580c' };
      default:
        return { bg: '#fefce8', text: '#ca8a04' };
    }
  };

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
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#181824' }}>
              Recent Cost Anomalies
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#575783', marginTop: '2px' }}>
              Deterministic threshold deviations flagged in last 72h
            </p>
          </div>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#fff7ed',
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldAlert size={16} />
          </div>
        </div>

        {/* Anomaly Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {anomalies.map((anom) => {
            const sev = getSeverityStyle(anom.severity);
            return (
              <div
                key={anom.id}
                style={{
                  backgroundColor: '#f8f8fc',
                  border: '1px solid #e0e0eb',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#181824' }}>
                      {anom.service}
                    </span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: sev.bg,
                        color: sev.text,
                        padding: '1px 6px',
                        borderRadius: '9999px'
                      }}
                    >
                      {anom.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#575783' }}>
                    Rule: <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{anom.rule}</code> • {anom.date}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.9rem' }}>
                    +{formatUSD(anom.amount)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: anom.status === 'Uninvestigated' ? '#ea580c' : '#10b981', fontWeight: 600 }}>
                    {anom.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #f0f0f5' }}>
        <Link
          to="/anomalies"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#2d62ff',
            textDecoration: 'none'
          }}
        >
          <span>Open Full Anomaly Triage Center</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
