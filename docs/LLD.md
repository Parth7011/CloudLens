# Low-Level Design (LLD)
**Status:** Initial implementation contract

## 1. Frontend folder structure
```text
src/
  components/
    Navbar.jsx
    HeroSection.jsx
    DashboardPreviewSection.jsx
    FinOpsLayersSection.jsx
    SavingsCalculatorSection.jsx
    FinalCTASection.jsx
    Footer.jsx
    CloudHero3D.jsx
    PagePlaceholder.jsx
  pages/
    LandingPage.jsx
    LoginPage.jsx
    SignupPage.jsx
  services/
    costRepository.js
  mocks/
    costData.js
  utils/
    currency.js
  styles/
    index.css
  App.jsx
  router.jsx
  main.jsx
```
Adjust only with a documented reason. Flat folder organization keeps identical elements collectively in `components/`, `pages/`, `services/`, and `mocks/` without deep nested subdirectories.

## 2. Frontend module contract
Each feature should own its page-level components, feature-specific components, and feature logic. Reusable components belong in `components/`. Common presentation formatting (currency, dates) belongs in `utils/`. Avoid circular imports between features.

## 3. Data repository boundary
Pages should not import mock arrays directly. They should call a repository function, for example:
```js
// costRepository.js — initial mock implementation
export async function getCosts(filters = {}) {
  // Filter mock data using the same contract expected from the API.
  return [];
}
```
The example return is intentionally empty and is not the final mock dataset. Actual mock records should live under `mocks/`. Later, repository functions can call REST endpoints.

## 4. Shared frontend data contracts
### Cost record
```js
{
  id: "cost_001",
  provider: "aws",
  accountId: "demo-account",
  service: "Amazon EC2",
  region: "ap-south-1",
  projectId: "demo-project",
  environment: "production",
  usageDate: "2026-10-01",
  amount: 125.50,
  currency: "USD",
  costType: "actual"
}
```
All example values are demo data. Do not represent them as real AWS billing.

### Budget
```js
{
  id: "budget_001",
  name: "Production monthly budget",
  amount: 5000,
  currency: "USD",
  period: "monthly",
  provider: "aws",
  thresholdPercent: 80,
  isActive: true
}
```

### Anomaly
```js
{
  id: "anomaly_001",
  provider: "aws",
  service: "Amazon EC2",
  detectedAt: "2026-10-20T10:00:00Z",
  expectedCost: 100,
  actualCost: 165,
  impactAmount: 65,
  status: "new",
  detectionMethod: "rule-based"
}
```

## 5. Analytics Data Contracts (Future Backend Responsibility)
> **Scope Boundary:** In the current frontend-only phase, all metrics, percentages, utilization rates, and anomaly impacts are pre-computed static values in mock fixtures under `mocks/`. During the future backend phase, these deterministic formulas will be implemented in Node.js/Express service modules (`modules/costs/costService.js`, `modules/budgets/budgetService.js`). The frontend performs presentation formatting only.

- Period change amount = current period total minus previous period total.
- Period change percentage = `(current - previous) / previous * 100`; if previous is zero, show “N/A” or a clearly defined special state.
- Budget utilization = `spend / budget amount * 100`; reject or safely handle zero/negative budgets.
- Rule-based anomaly example: flag a daily service cost if it exceeds a configurable percentage above its rolling baseline, subject to enough historical data. Show the threshold/rule and avoid implying causation.
- Forecasting is optional for the initial UI. If included, use a documented simple estimate and label it as an estimate.
- Backend calculations must have unit tests for normal, zero and missing-data cases.

## 6. Future backend module layout
```text
backend/
  src/
    app.js
    server.js
    config/
    middleware/
    modules/
      auth/
      costs/
      budgets/
      anomalies/
      optimization/
      reports/
      providers/
      notifications/
      settings/
      organizations/
    shared/
      database/
      errors/
      validation/
      utils/
    jobs/
  prisma-or-sql/
  tests/
```
Inside a module, use routes, controllers, services and repositories where appropriate. Avoid creating empty layers that add no value, but keep business logic out of controllers and route handlers.

## 7. Error and loading states
Every page that loads data should support:
- Loading/skeleton state.
- Empty state with a useful next action.
- Error state with retry where possible.
- Success/updated feedback for mutations.
- Disabled state while a request is in progress where needed.

## 8. Component behavior
- Buttons must perform the action stated by their labels.
- Filters must affect the displayed data.
- Date filters must be consistent across related dashboard components.
- Tables must have working sorting/pagination if the UI suggests those features.
- Export must export the selected data, not a hard-coded sample.
- Keep keyboard focus visible and provide labels for inputs.
