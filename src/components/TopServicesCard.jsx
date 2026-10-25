import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { formatUSD } from '../utils/currency.js';

export default function TopServicesCard({ topServices }) {
  const defaultServices = [
    { service: 'Amazon EC2', spend: 18240.00, percentage: 42.5, color: '#2d62ff' },
    { service: 'Amazon RDS', spend: 10450.00, percentage: 24.4, color: '#0ea5e9' },
    { service: 'Amazon S3', spend: 6920.00, percentage: 16.1, color: '#10b981' },
    { service: 'AWS Lambda', spend: 4180.00, percentage: 9.8, color: '#f59e0b' },
    { service: 'Amazon EKS', spend: 3060.40, percentage: 7.2, color: '#8b5cf6' }
  ];

  const items = topServices && topServices.length > 0 ? topServices : defaultServices;

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
              Top AWS Cost Drivers
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#575783', marginTop: '2px' }}>
              Ranked by total monthly consumption
            </p>
          </div>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#f8f8fc',
              border: '1px solid #e0e0eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#575783'
            }}
          >
            <Layers size={16} />
          </div>
        </div>

        {/* Services List with Progress Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((svc) => (
            <div key={svc.service}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: svc.color }} />
                  <span style={{ fontWeight: 600, color: '#181824' }}>{svc.service}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#181824' }}>{formatUSD(svc.spend)}</span>
                  <span style={{ fontSize: '0.74rem', color: '#575783', minWidth: '40px', textAlign: 'right' }}>
                    {svc.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div style={{ width: '100%', height: '6px', backgroundColor: '#f0f0f5', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${svc.percentage}%`,
                    height: '100%',
                    backgroundColor: svc.color,
                    borderRadius: '3px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #f0f0f5' }}>
        <Link
          to="/costs"
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
          <span>Explore multidimensional cost breakdown</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
