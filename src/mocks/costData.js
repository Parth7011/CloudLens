/**
 * Realistic Mock AWS Cost Records for Cloud Cost Dashboard
 * All figures represent realistic production usage across AWS services.
 */
export const MOCK_COST_RECORDS = [
  // EC2 Compute
  { id: "c_01", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "ap-south-1", environment: "production", usageDate: "2026-10-20", amount: 624.50, currency: "USD", costType: "actual" },
  { id: "c_02", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "ap-south-1", environment: "production", usageDate: "2026-10-21", amount: 638.10, currency: "USD", costType: "actual" },
  { id: "c_03", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "ap-south-1", environment: "production", usageDate: "2026-10-22", amount: 642.00, currency: "USD", costType: "actual" },
  { id: "c_04", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "us-east-1", environment: "staging", usageDate: "2026-10-22", amount: 185.20, currency: "USD", costType: "actual" },
  { id: "c_05", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "ap-south-1", environment: "production", usageDate: "2026-10-23", amount: 845.00, currency: "USD", costType: "actual" }, // Spike anomaly
  { id: "c_06", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "ap-south-1", environment: "production", usageDate: "2026-10-24", amount: 650.00, currency: "USD", costType: "actual" },
  { id: "c_07", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "ap-south-1", environment: "production", usageDate: "2026-10-25", amount: 635.40, currency: "USD", costType: "actual" },

  // Amazon RDS
  { id: "c_08", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "ap-south-1", environment: "production", usageDate: "2026-10-20", amount: 380.00, currency: "USD", costType: "actual" },
  { id: "c_09", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "ap-south-1", environment: "production", usageDate: "2026-10-21", amount: 382.50, currency: "USD", costType: "actual" },
  { id: "c_10", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "ap-south-1", environment: "production", usageDate: "2026-10-22", amount: 385.00, currency: "USD", costType: "actual" },
  { id: "c_11", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "ap-south-1", environment: "production", usageDate: "2026-10-23", amount: 720.00, currency: "USD", costType: "actual" }, // Unplanned Multi-AZ failover test spike
  { id: "c_12", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "ap-south-1", environment: "production", usageDate: "2026-10-24", amount: 390.00, currency: "USD", costType: "actual" },
  { id: "c_13", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "ap-south-1", environment: "production", usageDate: "2026-10-25", amount: 388.00, currency: "USD", costType: "actual" },

  // Amazon S3
  { id: "c_14", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "us-east-1", environment: "production", usageDate: "2026-10-20", amount: 245.00, currency: "USD", costType: "actual" },
  { id: "c_15", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "us-east-1", environment: "production", usageDate: "2026-10-21", amount: 248.00, currency: "USD", costType: "actual" },
  { id: "c_16", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "us-east-1", environment: "production", usageDate: "2026-10-22", amount: 251.00, currency: "USD", costType: "actual" },
  { id: "c_17", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "us-east-1", environment: "production", usageDate: "2026-10-23", amount: 254.00, currency: "USD", costType: "actual" },
  { id: "c_18", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "us-east-1", environment: "production", usageDate: "2026-10-24", amount: 258.00, currency: "USD", costType: "actual" },
  { id: "c_19", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "us-east-1", environment: "production", usageDate: "2026-10-25", amount: 260.00, currency: "USD", costType: "actual" },

  // AWS Lambda & EKS
  { id: "c_20", provider: "aws", accountId: "123456789012", service: "AWS Lambda", region: "ap-south-1", environment: "production", usageDate: "2026-10-24", amount: 145.80, currency: "USD", costType: "actual" },
  { id: "c_21", provider: "aws", accountId: "123456789012", service: "Amazon EKS", region: "ap-south-1", environment: "production", usageDate: "2026-10-24", amount: 215.00, currency: "USD", costType: "actual" },
  { id: "c_22", provider: "aws", accountId: "123456789012", service: "Amazon CloudFront", region: "global", environment: "production", usageDate: "2026-10-24", amount: 98.40, currency: "USD", costType: "actual" }
];

export const MOCK_OVERVIEW_KPIS = {
  currency: "USD",
  periodLabel: "October 2026",
  totalSpend: 42850.40,
  previousPeriodSpend: 38120.00,
  percentageChange: 12.4,
  monthlyBudget: 50000.00,
  budgetUtilization: 85.7,
  activeAnomaliesCount: 3,
  uninvestigatedAnomaliesCount: 2,
  potentialSavings: 6840.00,
  forecastEstimate: 47600.00,
  topServices: [
    { service: "Amazon EC2", spend: 18240.00, percentage: 42.5, color: "#10b981" },
    { service: "Amazon RDS", spend: 10450.00, percentage: 24.4, color: "#06b6d4" },
    { service: "Amazon S3", spend: 6920.00, percentage: 16.1, color: "#818cf8" },
    { service: "AWS Lambda", spend: 4180.00, percentage: 9.8, color: "#f59e0b" },
    { service: "Amazon EKS", spend: 3060.40, percentage: 7.2, color: "#f43f5e" }
  ],
  dailyTrend: [
    { date: "Oct 18", spend: 1320, budgetDaily: 1610 },
    { date: "Oct 19", spend: 1390, budgetDaily: 1610 },
    { date: "Oct 20", spend: 1410, budgetDaily: 1610 },
    { date: "Oct 21", spend: 1435, budgetDaily: 1610 },
    { date: "Oct 22", spend: 1480, budgetDaily: 1610 },
    { date: "Oct 23", spend: 2190, budgetDaily: 1610, anomaly: true, note: "EC2 & RDS spikes flagged" },
    { date: "Oct 24", spend: 1460, budgetDaily: 1610 },
    { date: "Oct 25", spend: 1445, budgetDaily: 1610 }
  ]
};

/**
 * Predefined static savings benchmark tiers for landing page showcase.
 * In this frontend phase, values are static mock fixtures (no client-side formula math).
 */
export const MOCK_SAVINGS_TIERS = [
  { spend: 10000,  totalMonthlySavings: 2800,  annualSavings: 33600,  idleSavings: 1200, rightsizingSavings: 900,   commitmentSavings: 700 },
  { spend: 25000,  totalMonthlySavings: 7000,  annualSavings: 84000,  idleSavings: 3000, rightsizingSavings: 2250,  commitmentSavings: 1750 },
  { spend: 45000,  totalMonthlySavings: 12600, annualSavings: 151200, idleSavings: 5400, rightsizingSavings: 4050,  commitmentSavings: 3150 },
  { spend: 75000,  totalMonthlySavings: 21000, annualSavings: 252000, idleSavings: 9000, rightsizingSavings: 6750,  commitmentSavings: 5250 },
  { spend: 100000, totalMonthlySavings: 28000, annualSavings: 336000, idleSavings: 12000, rightsizingSavings: 9000, commitmentSavings: 7000 },
  { spend: 150000, totalMonthlySavings: 42000, annualSavings: 504000, idleSavings: 18000, rightsizingSavings: 13500, commitmentSavings: 10500 },
  { spend: 200000, totalMonthlySavings: 56000, annualSavings: 672000, idleSavings: 24000, rightsizingSavings: 18000, commitmentSavings: 14000 },
  { spend: 250000, totalMonthlySavings: 70000, annualSavings: 840000, idleSavings: 30000, rightsizingSavings: 22500, commitmentSavings: 17500 }
];

