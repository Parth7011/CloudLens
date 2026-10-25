import React, { useState, useEffect, useMemo } from 'react';
import AppSidebar from '../components/AppSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import { getCosts } from '../services/costRepository.js';
import { formatUSD } from '../utils/currency.js';
import {
  Filter,
  Download,
  ArrowUpDown,
  Search,
  Layers,
  Globe,
  Server,
  Calendar,
  CheckCircle2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export default function CostExplorerPage() {
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('123456789012');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [envFilter, setEnvFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('none');
  const [sortField, setSortField] = useState('usageDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [exportNotice, setExportNotice] = useState(false);
  const pageSize = 8;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getCosts({
        service: serviceFilter,
        region: regionFilter,
        environment: envFilter
      });
      setCosts(data);
    } catch (err) {
      console.error('Failed to load cost data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [serviceFilter, regionFilter, envFilter]);

  // Client-side text search and sorting
  const filteredAndSortedRecords = useMemo(() => {
    let list = [...costs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.service.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.environment.toLowerCase().includes(q) ||
          r.accountId.includes(q)
      );
    }

    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return list;
  }, [costs, searchQuery, sortField, sortOrder]);

  const totalFilteredSpend = useMemo(() => {
    return filteredAndSortedRecords.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredAndSortedRecords]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedRecords.slice(start, start + pageSize);
  }, [filteredAndSortedRecords, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    if (!filteredAndSortedRecords.length) return;
    const headers = ['ID', 'Date', 'Provider', 'Account ID', 'Service', 'Region', 'Environment', 'Cost Type', 'Amount (USD)'];
    const rows = filteredAndSortedRecords.map((r) => [
      r.id,
      r.usageDate,
      r.provider,
      r.accountId,
      `"${r.service}"`,
      r.region,
      r.environment,
      r.costType,
      r.amount.toFixed(2)
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cloudlens-cost-records-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const resetFilters = () => {
    setServiceFilter('all');
    setRegionFilter('all');
    setEnvFilter('all');
    setSearchQuery('');
    setGroupBy('none');
  };

  // Aggregated data for visualizer chart
  const chartData = useMemo(() => {
    const map = {};
    filteredAndSortedRecords.forEach((r) => {
      const dateKey = r.usageDate.slice(5); // "10-20"
      map[dateKey] = (map[dateKey] || 0) + r.amount;
    });
    return Object.entries(map).map(([date, amount]) => ({ date, amount })).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredAndSortedRecords]);

  const maxChartVal = chartData.length ? Math.max(...chartData.map((d) => d.amount), 100) : 100;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8fc' }}>
      <AppSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <DashboardHeader
          title="Cost Explorer"
          subtitle="Multi-dimensional cloud spend telemetry, granular drilldowns, and tabular exports"
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onRefresh={fetchData}
        />

        <main style={{ padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#eef2ff',
                  color: '#2d62ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TrendingUp size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 500 }}>Filtered Total Spend</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                  {formatUSD(totalFilteredSpend)}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BarChart3 size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 500 }}>Total Matched Records</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                  {filteredAndSortedRecords.length} items
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0eb',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Layers size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#575783', fontWeight: 500 }}>Daily Run-Rate Average</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#181824', fontFamily: 'var(--font-display)' }}>
                  {formatUSD(chartData.length ? totalFilteredSpend / chartData.length : 0)}
                </div>
              </div>
            </div>
          </div>

          {/* Filter & Control Bar */}
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

              {/* Service Select */}
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
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
                <option value="all">All Services</option>
                <option value="ec2">Amazon EC2 (Compute)</option>
                <option value="rds">Amazon RDS (Database)</option>
                <option value="s3">Amazon S3 (Storage)</option>
                <option value="lambda">AWS Lambda (Serverless)</option>
                <option value="eks">Amazon EKS (Kubernetes)</option>
                <option value="dynamodb">Amazon DynamoDB</option>
                <option value="cloudfront">Amazon CloudFront (CDN)</option>
              </select>

              {/* Region Select */}
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
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
                <option value="all">All Regions</option>
                <option value="ap-south-1">ap-south-1 (Mumbai)</option>
                <option value="us-east-1">us-east-1 (N. Virginia)</option>
                <option value="us-west-2">us-west-2 (Oregon)</option>
                <option value="eu-west-1">eu-west-1 (Ireland)</option>
                <option value="global">global (Edge)</option>
              </select>

              {/* Environment Select */}
              <select
                value={envFilter}
                onChange={(e) => setEnvFilter(e.target.value)}
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
                <option value="all">All Environments</option>
                <option value="production">Production</option>
                <option value="staging">Staging / Dev</option>
              </select>

              {(serviceFilter !== 'all' || regionFilter !== 'all' || envFilter !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#2d62ff',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Right actions: Search + Export */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                  placeholder="Search service, region..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '0.85rem',
                    color: '#181824',
                    width: '160px'
                  }}
                />
              </div>

              <button
                onClick={handleExportCSV}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#181824',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Download size={15} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Spend Trend Bar Visualizer */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0eb',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#181824', margin: 0 }}>
                  Daily Spend Trajectory ({chartData.length} active reporting days)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#575783', margin: '3px 0 0' }}>
                  Aggregated spend totals per date bucket according to active filters
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#575783' }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#2d62ff' }}></span>
                Daily Ingested Total
              </div>
            </div>

            {chartData.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#575783', fontSize: '0.9rem' }}>
                No spend records match your current filter parameters.
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '12px',
                  height: '140px',
                  paddingTop: '20px',
                  borderBottom: '1px solid #e0e0eb'
                }}
              >
                {chartData.map((d) => {
                  const heightPercent = Math.max(12, Math.round((d.amount / maxChartVal) * 100));
                  return (
                    <div
                      key={d.date}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        height: '100%',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#181824' }}>
                        ${Math.round(d.amount)}
                      </div>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '48px',
                          height: `${heightPercent}%`,
                          backgroundColor: '#2d62ff',
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.3s ease',
                          cursor: 'pointer'
                        }}
                        title={`Date: ${d.date} | Spend: ${formatUSD(d.amount)}`}
                      />
                      <div style={{ fontSize: '0.75rem', color: '#575783', fontWeight: 500, marginTop: '4px' }}>
                        {d.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Records Table Section */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0eb',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e0e0eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fafafc'
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#181824', margin: 0 }}>
                  Granular Billing Line Items
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#575783' }}>
                  Showing {paginatedRecords.length} of {filteredAndSortedRecords.length} records
                </span>
              </div>

              {exportNotice && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: '#059669',
                    backgroundColor: '#ecfdf5',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  <CheckCircle2 size={14} />
                  CSV exported successfully!
                </div>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0eb', backgroundColor: '#f8f8fc', color: '#575783' }}>
                    <th
                      onClick={() => handleSort('usageDate')}
                      style={{ padding: '12px 16px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Date <ArrowUpDown size={13} />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('service')}
                      style={{ padding: '12px 16px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Service <ArrowUpDown size={13} />
                      </div>
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Region</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Environment</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Account ID</th>
                    <th
                      onClick={() => handleSort('amount')}
                      style={{ padding: '12px 16px', fontWeight: 600, cursor: 'pointer', textAlign: 'right', whiteSpace: 'nowrap' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        Amount (USD) <ArrowUpDown size={13} />
                      </div>
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>% of Filtered Total</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#575783' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <RefreshCw size={18} className="spin-animation" /> Loading cost telemetry...
                        </div>
                      </td>
                    </tr>
                  ) : paginatedRecords.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#575783' }}>
                        No records match the selected filter configuration.
                      </td>
                    </tr>
                  ) : (
                    paginatedRecords.map((item, idx) => {
                      const share = totalFilteredSpend > 0 ? ((item.amount / totalFilteredSpend) * 100).toFixed(1) : 0;
                      return (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: '1px solid #f0f0f5',
                            backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafc',
                            transition: 'background-color 0.15s ease'
                          }}
                        >
                          <td style={{ padding: '12px 16px', fontWeight: 600, color: '#181824', whiteSpace: 'nowrap' }}>
                            {item.usageDate}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#181824', fontWeight: 600 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: item.service.includes('EC2')
                                    ? '#2d62ff'
                                    : item.service.includes('RDS')
                                    ? '#10b981'
                                    : item.service.includes('S3')
                                    ? '#f59e0b'
                                    : '#8b5cf6'
                                }}
                              />
                              {item.service}
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#575783' }}>
                            <code style={{ fontSize: '0.8rem', backgroundColor: '#f0f0f5', padding: '2px 6px', borderRadius: '4px' }}>
                              {item.region}
                            </code>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                backgroundColor: item.environment === 'production' ? '#eef2ff' : '#ecfdf5',
                                color: item.environment === 'production' ? '#2d62ff' : '#059669'
                              }}
                            >
                              {item.environment}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', color: '#575783', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                            {item.accountId}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#181824' }}>
                            {formatUSD(item.amount)}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#575783' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2d62ff' }}>{share}%</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid #e0e0eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: '#575783' }}>
                Page <strong style={{ color: '#181824' }}>{currentPage}</strong> of{' '}
                <strong style={{ color: '#181824' }}>{totalPages}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e0e0eb',
                    backgroundColor: currentPage <= 1 ? '#f8f8fc' : '#ffffff',
                    color: currentPage <= 1 ? '#a0a0b0' : '#181824',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={14} /> Previous
                </button>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e0e0eb',
                    backgroundColor: currentPage >= totalPages ? '#f8f8fc' : '#ffffff',
                    color: currentPage >= totalPages ? '#a0a0b0' : '#181824',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
