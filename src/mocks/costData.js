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

  // AWS Lambda & EKS & CloudFront & Others
  { id: "c_20", provider: "aws", accountId: "123456789012", service: "AWS Lambda", region: "ap-south-1", environment: "production", usageDate: "2026-10-24", amount: 145.80, currency: "USD", costType: "actual" },
  { id: "c_21", provider: "aws", accountId: "123456789012", service: "Amazon EKS", region: "ap-south-1", environment: "production", usageDate: "2026-10-24", amount: 215.00, currency: "USD", costType: "actual" },
  { id: "c_22", provider: "aws", accountId: "123456789012", service: "Amazon CloudFront", region: "global", environment: "production", usageDate: "2026-10-24", amount: 98.40, currency: "USD", costType: "actual" },
  { id: "c_23", provider: "aws", accountId: "123456789012", service: "Amazon EC2", region: "us-west-2", environment: "staging", usageDate: "2026-10-23", amount: 142.30, currency: "USD", costType: "actual" },
  { id: "c_24", provider: "aws", accountId: "123456789012", service: "Amazon RDS", region: "us-east-1", environment: "staging", usageDate: "2026-10-23", amount: 112.50, currency: "USD", costType: "actual" },
  { id: "c_25", provider: "aws", accountId: "123456789012", service: "AWS Lambda", region: "us-east-1", environment: "production", usageDate: "2026-10-25", amount: 154.20, currency: "USD", costType: "actual" },
  { id: "c_26", provider: "aws", accountId: "123456789012", service: "Amazon EKS", region: "us-east-1", environment: "production", usageDate: "2026-10-25", amount: 230.10, currency: "USD", costType: "actual" },
  { id: "c_27", provider: "aws", accountId: "123456789012", service: "Amazon DynamoDB", region: "ap-south-1", environment: "production", usageDate: "2026-10-25", amount: 84.60, currency: "USD", costType: "actual" },
  { id: "c_28", provider: "aws", accountId: "123456789012", service: "Amazon S3", region: "eu-west-1", environment: "production", usageDate: "2026-10-24", amount: 165.00, currency: "USD", costType: "actual" }
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
    { service: "Amazon EC2", spend: 18240.00, percentage: 42.5, color: "#2d62ff" },
    { service: "Amazon RDS", spend: 10450.00, percentage: 24.4, color: "#10b981" },
    { service: "Amazon S3", spend: 6920.00, percentage: 16.1, color: "#f59e0b" },
    { service: "AWS Lambda", spend: 4180.00, percentage: 9.8, color: "#8b5cf6" },
    { service: "Amazon EKS", spend: 3060.40, percentage: 7.2, color: "#ec4899" }
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
 * Mock Budgets Dataset
 */
export const MOCK_BUDGETS = [
  {
    id: "b_prod_01",
    name: "Production Consolidated Infrastructure",
    category: "Organization",
    scope: "production",
    period: "Monthly",
    cap: 50000,
    currentSpend: 42850.40,
    projectedSpend: 47600.00,
    unit: "USD",
    warningThreshold: 80,
    criticalThreshold: 90,
    channel: "#cloud-alerts-prod",
    status: "warning", // healthy, warning, critical
    lastUpdated: "2026-10-25 18:30 UTC"
  },
  {
    id: "b_ec2_02",
    name: "Core Compute Cluster (EC2 & ASG)",
    category: "Compute",
    scope: "Amazon EC2",
    period: "Monthly",
    cap: 20000,
    currentSpend: 19280.00,
    projectedSpend: 21800.00,
    unit: "USD",
    warningThreshold: 80,
    criticalThreshold: 90,
    channel: "#devops-compute",
    status: "critical",
    lastUpdated: "2026-10-25 18:30 UTC"
  },
  {
    id: "b_rds_03",
    name: "Managed Database Services (Aurora & RDS)",
    category: "Databases",
    scope: "Amazon RDS",
    period: "Monthly",
    cap: 12000,
    currentSpend: 10450.00,
    projectedSpend: 11400.00,
    unit: "USD",
    warningThreshold: 80,
    criticalThreshold: 90,
    channel: "#db-reliability",
    status: "warning",
    lastUpdated: "2026-10-25 18:30 UTC"
  },
  {
    id: "b_stg_04",
    name: "Non-Production Sandbox & Staging",
    category: "Staging",
    scope: "staging",
    period: "Monthly",
    cap: 10000,
    currentSpend: 4200.00,
    projectedSpend: 5100.00,
    unit: "USD",
    warningThreshold: 80,
    criticalThreshold: 90,
    channel: "#eng-sandbox",
    status: "healthy",
    lastUpdated: "2026-10-25 18:30 UTC"
  }
];

/**
 * Mock Anomalies Dataset
 */
export const MOCK_ANOMALIES = [
  {
    id: "anom_01",
    ruleId: "SURGE-DEV-NAMESPACE",
    title: "Uncontrolled Pod Scaler in Dev Namespace",
    service: "Amazon EKS",
    resourceId: "eks/staging-cluster/dev-payments",
    region: "ap-south-1",
    environment: "staging",
    detectedAt: "2026-10-23 09:15 UTC",
    severity: "critical", // critical, high, medium, low
    status: "uninvestigated", // uninvestigated, acknowledged, resolved
    baselineCost: 180.00,
    observedCost: 1410.00,
    surgeAmount: 1230.00,
    rootCause: "A developer load-test deployment triggered Horizontal Pod Autoscaler to 120 replicas without cpu resource limits.",
    recommendation: "Apply resource limits and downscale non-production namespace to max 6 pods."
  },
  {
    id: "anom_02",
    ruleId: "UNPLANNED-MULTI-AZ-FAILOVER",
    title: "Aurora Multi-AZ Synchronous Replica Burst",
    service: "Amazon RDS",
    resourceId: "rds:db-cluster-aurora-prod",
    region: "ap-south-1",
    environment: "production",
    detectedAt: "2026-10-23 14:40 UTC",
    severity: "high",
    status: "acknowledged",
    baselineCost: 385.00,
    observedCost: 720.00,
    surgeAmount: 335.00,
    rootCause: "Automated failover drill initiated cross-AZ write replication buffer bursts during peak ETL data ingestion.",
    recommendation: "Schedule database failover simulations strictly in designated low-traffic maintenance windows."
  },
  {
    id: "anom_03",
    ruleId: "EGRESS-ANOMALY-BACKUP",
    title: "Inter-Region Glacier S3 Vault Synchronization",
    service: "Amazon S3",
    resourceId: "s3://corp-analytics-archive-prod",
    region: "us-east-1",
    environment: "production",
    detectedAt: "2026-10-24 02:10 UTC",
    severity: "medium",
    status: "uninvestigated",
    baselineCost: 80.00,
    observedCost: 260.00,
    surgeAmount: 180.00,
    rootCause: "Unfiltered daily database snapshot lifecycle rule transferred uncompressed logs cross-region.",
    recommendation: "Compress Parquet snapshots before cross-region replication or enable S3 Lifecycle tiering transition."
  }
];

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

