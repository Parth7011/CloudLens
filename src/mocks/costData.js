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


/**
 * Mock Optimization Recommendations Dataset
 * All savings figures are ESTIMATES only - not verified by AWS.
 */
export const MOCK_OPTIMIZATION_RECOMMENDATIONS = [
  {
    id: "opt_01",
    category: "Compute",
    service: "Amazon EC2",
    resourceId: "i-0a1b2c3d4e5f6a7b8",
    resourceName: "prod-api-server-03",
    region: "ap-south-1",
    environment: "production",
    title: "Downsize Over-Provisioned EC2 Instance",
    description: "Instance is running at average 12% CPU utilization over the past 30 days. Rightsizing from m5.2xlarge to m5.large will maintain performance headroom while eliminating idle compute waste.",
    currentSpec: "m5.2xlarge (8 vCPU / 32 GB)",
    recommendedSpec: "m5.large (2 vCPU / 8 GB)",
    estimatedMonthlySavings: 184.50,
    estimatedAnnualSavings: 2214.00,
    impact: "high",
    status: "new",
    detectedAt: "2026-10-24",
    utilizationAvg: "12% CPU, 18% Memory",
    confidence: "High",
    savingsNote: "Estimate based on On-Demand pricing. Actual savings may vary."
  },
  {
    id: "opt_02",
    category: "Compute",
    service: "Amazon EC2",
    resourceId: "i-9c8d7e6f5a4b3c2d1",
    resourceName: "staging-worker-01",
    region: "us-east-1",
    environment: "staging",
    title: "Terminate Idle EC2 Staging Instance",
    description: "Instance has had 0% CPU utilization for 14 consecutive days. No scheduled jobs or active connections detected. Safe to terminate or convert to a stopped state.",
    currentSpec: "c5.xlarge (4 vCPU / 8 GB) - Running",
    recommendedSpec: "Terminate or Stop",
    estimatedMonthlySavings: 124.00,
    estimatedAnnualSavings: 1488.00,
    impact: "high",
    status: "new",
    detectedAt: "2026-10-22",
    utilizationAvg: "0% CPU, 0% Network",
    confidence: "High",
    savingsNote: "Estimate based on On-Demand pricing for us-east-1."
  },
  {
    id: "opt_03",
    category: "Database",
    service: "Amazon RDS",
    resourceId: "db-instance-rds-reports-dev",
    resourceName: "rds-reports-dev",
    region: "ap-south-1",
    environment: "staging",
    title: "Convert Dev RDS to Single-AZ",
    description: "Development RDS instance is configured with Multi-AZ replication - unnecessary for non-production workloads. Switching to Single-AZ reduces IO and replication costs.",
    currentSpec: "db.r5.large - Multi-AZ",
    recommendedSpec: "db.r5.large - Single-AZ",
    estimatedMonthlySavings: 96.00,
    estimatedAnnualSavings: 1152.00,
    impact: "medium",
    status: "in-review",
    detectedAt: "2026-10-23",
    utilizationAvg: "8% CPU, 15% Storage IOPS",
    confidence: "Medium",
    savingsNote: "Multi-AZ standby cost eliminated. Data transfer costs unchanged."
  },
  {
    id: "opt_04",
    category: "Storage",
    service: "Amazon S3",
    resourceId: "s3-corp-analytics-archive-prod",
    resourceName: "corp-analytics-archive-prod",
    region: "us-east-1",
    environment: "production",
    title: "Enable S3 Intelligent-Tiering on Archive Bucket",
    description: "Bucket holds 4.2 TB of analytics data. Access patterns show 70% of objects have not been accessed in 90+ days. Enabling Intelligent-Tiering will auto-migrate cold objects to lower-cost tiers.",
    currentSpec: "S3 Standard - 4.2 TB",
    recommendedSpec: "S3 Intelligent-Tiering",
    estimatedMonthlySavings: 78.40,
    estimatedAnnualSavings: 940.80,
    impact: "medium",
    status: "new",
    detectedAt: "2026-10-25",
    utilizationAvg: "30% objects accessed in 90 days",
    confidence: "Medium",
    savingsNote: "Savings depend on actual access frequency changes."
  },
  {
    id: "opt_05",
    category: "Compute",
    service: "AWS Lambda",
    resourceId: "lambda-payment-processor-prod",
    resourceName: "payment-processor-prod",
    region: "ap-south-1",
    environment: "production",
    title: "Reduce Lambda Memory Allocation",
    description: "Function P99 duration is 180ms with 512MB memory allocation. CloudWatch metrics show peak memory usage of only 128MB. Reducing allocation to 256MB will lower per-invocation cost.",
    currentSpec: "512 MB - 4.2M invocations/month",
    recommendedSpec: "256 MB - 4.2M invocations/month",
    estimatedMonthlySavings: 42.10,
    estimatedAnnualSavings: 505.20,
    impact: "low",
    status: "new",
    detectedAt: "2026-10-25",
    utilizationAvg: "128MB peak used / 512MB allocated",
    confidence: "High",
    savingsNote: "Duration billed in 1ms increments; estimate uses current invocation volume."
  },
  {
    id: "opt_06",
    category: "Database",
    service: "Amazon RDS",
    resourceId: "rds-db-cluster-aurora-prod",
    resourceName: "aurora-prod-writer",
    region: "ap-south-1",
    environment: "production",
    title: "Purchase Reserved Instance for Aurora Writer",
    description: "Aurora cluster has maintained consistent usage for 6+ months. Committing to a 1-year Reserved Instance for the writer node provides significant cost reduction vs. On-Demand.",
    currentSpec: "db.r5.2xlarge - On-Demand",
    recommendedSpec: "db.r5.2xlarge - 1-yr Reserved (No Upfront)",
    estimatedMonthlySavings: 220.00,
    estimatedAnnualSavings: 2640.00,
    impact: "high",
    status: "in-review",
    detectedAt: "2026-10-21",
    utilizationAvg: "Consistent 24/7 production load",
    confidence: "High",
    savingsNote: "Committed spend. Early termination not possible without penalty."
  },
  {
    id: "opt_07",
    category: "Network",
    service: "Amazon CloudFront",
    resourceId: "cloudfront-EABCDEF123456",
    resourceName: "cdn-static-assets-prod",
    region: "global",
    environment: "production",
    title: "Enable CloudFront Cache Compression",
    description: "Static asset distribution has compression disabled. Enabling gzip/Brotli compression for text-based assets reduces data transfer size by an estimated 60-70%.",
    currentSpec: "Compression: Disabled",
    recommendedSpec: "Compression: gzip + Brotli enabled",
    estimatedMonthlySavings: 34.20,
    estimatedAnnualSavings: 410.40,
    impact: "low",
    status: "applied",
    detectedAt: "2026-10-20",
    utilizationAvg: "2.1 TB/month data transfer",
    confidence: "Medium",
    savingsNote: "Actual savings depend on cache hit rate and content type mix."
  },
  {
    id: "opt_08",
    category: "Storage",
    service: "Amazon EKS",
    resourceId: "eks-prod-cluster-persistent-volumes",
    resourceName: "eks-prod-orphaned-pvcs",
    region: "ap-south-1",
    environment: "production",
    title: "Delete Orphaned EKS Persistent Volume Claims",
    description: "14 PersistentVolumeClaims detected with no active pod binding for 21+ days. These EBS volumes continue to incur storage charges despite not being used.",
    currentSpec: "14 orphaned PVCs - 1.4 TB gp3",
    recommendedSpec: "Delete unbound PVCs after backup verification",
    estimatedMonthlySavings: 115.00,
    estimatedAnnualSavings: 1380.00,
    impact: "medium",
    status: "new",
    detectedAt: "2026-10-24",
    utilizationAvg: "0 active pod bindings",
    confidence: "Medium",
    savingsNote: "Verify data retention requirements before deletion."
  }
];

/**
 * Mock Reports Dataset
 * Pre-computed summary data consumed by the Reports page.
 * No client-side aggregation math - all values are static fixtures.
 */
export const MOCK_REPORTS = {
  executiveSummary: {
    period: "October 2026",
    totalSpend: 42850.40,
    previousPeriodSpend: 38120.00,
    percentageChange: 12.4,
    monthlyBudget: 50000.00,
    budgetUtilization: 85.7,
    forecastEndOfMonth: 47600.00,
    topServices: [
      { service: "Amazon EC2", spend: 18240.00, percentage: 42.5 },
      { service: "Amazon RDS", spend: 10450.00, percentage: 24.4 },
      { service: "Amazon S3", spend: 6920.00, percentage: 16.1 },
      { service: "AWS Lambda", spend: 4180.00, percentage: 9.8 },
      { service: "Amazon EKS", spend: 3060.40, percentage: 7.2 }
    ]
  },
  serviceBreakdown: [
    { service: "Amazon EC2", region: "ap-south-1", environment: "production", spend: 18240.00, lineItems: 7, change: "+8.2%" },
    { service: "Amazon RDS", region: "ap-south-1", environment: "production", spend: 10450.00, lineItems: 6, change: "+11.4%" },
    { service: "Amazon S3", region: "us-east-1", environment: "production", spend: 6920.00, lineItems: 7, change: "+6.1%" },
    { service: "AWS Lambda", region: "ap-south-1", environment: "production", spend: 4180.00, lineItems: 3, change: "+4.8%" },
    { service: "Amazon EKS", region: "ap-south-1", environment: "production", spend: 3060.40, lineItems: 2, change: "+14.2%" },
    { service: "Amazon CloudFront", region: "global", environment: "production", spend: 98.40, lineItems: 1, change: "-2.1%" },
    { service: "Amazon DynamoDB", region: "ap-south-1", environment: "production", spend: 84.60, lineItems: 1, change: "+3.5%" }
  ],
  teamAllocation: [
    { team: "Platform Engineering", costCenter: "CC-101", spend: 18240.00, percentage: 42.5, primaryService: "Amazon EC2", headcount: 12 },
    { team: "Data & Analytics", costCenter: "CC-102", spend: 10450.00, percentage: 24.4, primaryService: "Amazon RDS", headcount: 8 },
    { team: "Product Engineering", costCenter: "CC-103", spend: 7200.00, percentage: 16.8, primaryService: "S3 + Lambda", headcount: 15 },
    { team: "DevOps & Reliability", costCenter: "CC-104", spend: 5240.00, percentage: 12.2, primaryService: "Amazon EKS", headcount: 5 },
    { team: "QA & Staging", costCenter: "CC-105", spend: 1720.00, percentage: 4.1, primaryService: "EC2 (staging)", headcount: 6 }
  ],
  dailyTrend: [
    { date: "Oct 1", spend: 1280 }, { date: "Oct 2", spend: 1310 }, { date: "Oct 3", spend: 1295 },
    { date: "Oct 4", spend: 1320 }, { date: "Oct 5", spend: 1340 }, { date: "Oct 6", spend: 1290 },
    { date: "Oct 7", spend: 1305 }, { date: "Oct 8", spend: 1360 }, { date: "Oct 9", spend: 1385 },
    { date: "Oct 10", spend: 1400 }, { date: "Oct 11", spend: 1395 }, { date: "Oct 12", spend: 1380 },
    { date: "Oct 13", spend: 1370 }, { date: "Oct 14", spend: 1410 }, { date: "Oct 15", spend: 1430 },
    { date: "Oct 16", spend: 1390 }, { date: "Oct 17", spend: 1420 }, { date: "Oct 18", spend: 1320 },
    { date: "Oct 19", spend: 1390 }, { date: "Oct 20", spend: 1410 }, { date: "Oct 21", spend: 1435 },
    { date: "Oct 22", spend: 1480 }, { date: "Oct 23", spend: 2190, anomaly: true }, { date: "Oct 24", spend: 1460 },
    { date: "Oct 25", spend: 1445 }
  ]
};
