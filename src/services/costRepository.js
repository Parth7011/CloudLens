import { MOCK_COST_RECORDS, MOCK_OVERVIEW_KPIS, MOCK_BUDGETS, MOCK_ANOMALIES } from '../mocks/costData.js';

/**
 * Cost Repository - Decoupled data access layer.
 * In Phase 1, returns realistic mock data.
 * In Phase 4, will call backend REST endpoints via fetch().
 */

export async function getOverviewSummary() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return { ...MOCK_OVERVIEW_KPIS };
}

export async function getCosts(filters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  let records = [...MOCK_COST_RECORDS];

  if (filters.service && filters.service !== 'all') {
    records = records.filter((r) => r.service.toLowerCase().includes(filters.service.toLowerCase()));
  }

  if (filters.region && filters.region !== 'all') {
    records = records.filter((r) => r.region === filters.region);
  }

  if (filters.environment && filters.environment !== 'all') {
    records = records.filter((r) => r.environment === filters.environment);
  }

  return records;
}

export async function getBudgets() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return [...MOCK_BUDGETS];
}

export async function getAnomalies(filters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  let anomalies = [...MOCK_ANOMALIES];

  if (filters.severity && filters.severity !== 'all') {
    anomalies = anomalies.filter((a) => a.severity === filters.severity);
  }

  if (filters.status && filters.status !== 'all') {
    anomalies = anomalies.filter((a) => a.status === filters.status);
  }

  return anomalies;
}

export async function getIntegrations() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return {
    provider: 'aws',
    status: 'connected',
    accountId: '123456789012',
    regions: ['ap-south-1', 'us-east-1', 'us-west-2'],
    dataSource: 'CUR 2.0 Billing Export',
    lastSync: 'Today, 17:04 UTC',
    recordsIngested: 28410,
    activeAccounts: 14,
    uptimePercent: 99.2,
  };
}
