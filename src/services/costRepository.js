import { MOCK_COST_RECORDS, MOCK_OVERVIEW_KPIS } from '../mocks/costData.js';

/**
 * Cost Repository - Decoupled data access layer.
 * In Phase 1, returns realistic mock data.
 * In Phase 4, will call backend REST endpoints via fetch().
 */

export async function getOverviewSummary() {
  // Simulate network tick for realistic async contract
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

  return records;
}
