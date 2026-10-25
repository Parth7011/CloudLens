# Data Model
**Status:** Initial conceptual schema; refine before database implementation

## 1. Principles
- MySQL relational schema.
- Primary keys and foreign keys for relationships.
- Normalize core transactional data to at least 3NF where appropriate.
- Add indexes based on real query patterns.
- Store monetary values as fixed-precision decimals in the database, not floating-point values.
- Store timestamps consistently and make timezone handling explicit.
- Use a normalized common cost model while preserving provider/account references needed for traceability.
- Do not store cloud access keys in plaintext.

## 2. Proposed entities
### users
- `id` (PK)
- `email` (unique)
- `display_name`
- `password_hash` or external identity reference
- `created_at`, `updated_at`

### organizations
- `id` (PK)
- `name`
- `created_at`, `updated_at`

### organization_members
- `organization_id` (FK)
- `user_id` (FK)
- `role`
- Composite unique key: (`organization_id`, `user_id`)

### cloud_accounts
- `id` (PK)
- `organization_id` (FK)
- `provider` (initially `aws`)
- `external_account_id`
- `display_name`
- `connection_status`
- `last_sync_at`
- `created_at`, `updated_at`
- Do not store secret access keys in this table in plaintext.

### cost_records
- `id` (PK)
- `cloud_account_id` (FK)
- `provider`
- `external_record_id` or stable idempotency key
- `service`
- `region` (nullable)
- `project_tag` (nullable)
- `environment_tag` (nullable)
- `usage_date`
- `amount` DECIMAL
- `currency`
- `cost_basis` (actual/amortized, if supported)
- `created_at`, `updated_at`
- Unique key on a suitable provider/account/record identity to avoid duplicate imports.
- Candidate indexes: (`cloud_account_id`, `usage_date`), (`service`, `usage_date`).

### budgets
- `id` (PK)
- `organization_id` (FK)
- `name`
- `amount` DECIMAL
- `currency`
- `period` (monthly/quarterly/yearly)
- `provider_scope` (aws/all)
- optional service/account scope
- `threshold_percent`
- `is_active`
- `created_at`, `updated_at`

### anomalies
- `id` (PK)
- `organization_id` (FK)
- `cloud_account_id` (FK, nullable if aggregated)
- `service`
- `detected_at`
- `expected_cost` DECIMAL
- `actual_cost` DECIMAL
- `impact_amount` DECIMAL
- `detection_rule`
- `status` (new/investigating/resolved)
- `created_at`, `updated_at`

### recommendations
- `id` (PK)
- `organization_id` (FK)
- `cloud_account_id` (FK, nullable)
- `provider`
- `service`
- `title`
- `description`
- `estimated_monthly_savings` DECIMAL, nullable
- `status`
- `created_at`, `updated_at`
- In the first release, recommendations may be static/demo or rule-based. Do not imply AWS has confirmed savings unless verified.

### reports (optional persisted metadata)
- `id` (PK)
- `organization_id` (FK)
- `name`
- `filters_json`
- `created_by` (FK)
- `created_at`

### sync_jobs
- `id` (PK)
- `cloud_account_id` (FK)
- `status`
- `started_at`, `finished_at`
- `records_imported`
- `error_code` and safe `error_summary`
- `idempotency_key`

### notifications
- `id` (PK)
- `organization_id` (FK)
- `type`
- `title`
- `message`
- `read_at` (nullable)
- `created_at`

## 3. Relationship summary
- Organization 1:N organization_members, budgets, anomalies, recommendations, reports and notifications.
- User M:N Organization through organization_members.
- Organization 1:N cloud_accounts.
- Cloud account 1:N cost_records and sync_jobs.
- Cloud account may be associated with anomalies and recommendations.
- A budget may have optional scopes to a provider, account, service or project; represent scope explicitly if multiple dimensions are needed.

## 4. Notes for implementation
This is a conceptual model, not a final migration. Confirm exact keys, delete behavior, constraints, cost basis, currency handling and tag storage before creating tables. If tag dimensions need flexible querying, choose a deliberate relational representation or JSON strategy and document its trade-offs.
