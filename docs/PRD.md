# Cloud Cost Dashboard — Product Requirements Document
**Version:** 0.1  
**Status:** Draft for team review  
**Product name:** Undecided (use “Cloud Cost Dashboard” as the working name)  
**Scope:** Frontend-first; AWS-first product strategy; AI deferred

## 1. Product summary
Build a web application that helps users understand cloud spending through cost summaries, charts, service-level breakdowns, budgets, anomaly indicators, reports, and provider connection status. The first working version uses realistic mock AWS billing data. Real AWS billing integration and backend persistence are later phases.

## 2. Problem statement
Cloud cost information can be difficult to interpret across billing periods and services. Users need a single, understandable interface to inspect spending, compare periods, monitor budgets, and identify unusual changes.

## 3. Goals
- Present cloud costs and trends in a clear dashboard.
- Allow users to explore costs by date range, service, region, and other available dimensions.
- Make budget status and rule-based anomalies easy to understand.
- Provide report views and CSV export.
- Establish frontend data contracts that can later connect to an Express API and MySQL.
- Keep the backend architecture extensible for future cloud providers.
- Maintain a project progress log that Antigravity updates after meaningful work.

## 4. Non-goals for the initial release
- No AI explanations, chatbot, LLM API, model training, or AI endpoints.
- No multi-cloud billing integration in the first integration milestone.
- No microservices, Kubernetes, Kafka, or other infrastructure that is not needed for the project.
- No production-grade organization billing or enterprise access management until the core product is working.
- No final UI design system yet. The visual direction is intentionally undecided; do not lock a 3D, dark, light, or brand direction without team approval.

## 5. Target users
- Developers who want to understand cloud spend by service or project.
- Small engineering teams tracking cloud budgets.
- Cloud/DevOps learners who need a clear view of billing trends.

## 6. Product scope and exact primary page count
There are **12 primary pages** in the planned product. Pair ownership is split as agreed below.

### Pair 1 — first 7 pages (through Anomalies)
1. Landing Page
2. Login
3. Sign Up
4. Overview
5. Cost Explorer
6. Budgets
7. Anomalies

### Pair 2 — remaining 5 pages
8. Optimization
9. Reports
10. Integrations
11. Notifications
12. Settings

Shared cross-cutting work includes app routing, global layout, shared UI primitives, data contracts, accessibility, responsive behavior, testing, integration, and project logging. Ownership of shared files must be agreed before editing.

A 404 page, loading states, empty states, error states, dialogs, and drawers are supporting UI states/components, not counted as primary pages. A password-reset page is not in the initial 12-page scope unless approved later.

## 7. Functional requirements
### P0 — first frontend release
- FR-01: Public landing page with product explanation and calls to action.
- FR-02: Login and Sign Up UI with client-side validation. Authentication may be mocked until backend work.
- FR-03: Overview page showing total cost, period comparison, budget utilization, forecast placeholder/clearly labeled estimate, and top cost drivers.
- FR-04: Cost Explorer with date range, provider (AWS in first release), service, region and other agreed filters.
- FR-05: Cost table with sorting, pagination or a clearly defined client-side equivalent for mock data.
- FR-06: Budget list, budget creation/edit UI, thresholds, utilization and status.
- FR-07: Anomalies page showing rule-based sample anomalies, impact, service, date and investigation status.
- FR-08: Pair 2 pages have complete layouts and defined interactions: Optimization, Reports, Integrations, Notifications and Settings.
- FR-09: CSV export works for the selected/filtered report or cost data where offered.
- FR-10: Shared navigation and routing work across all pages.
- FR-11: Mock data is isolated behind a repository/data-access layer so it can be replaced later.
- FR-12: All visible controls have a meaningful action or are explicitly marked as unavailable/not yet implemented.
- FR-13: Provide loading, empty, error, and success feedback states as applicable.
- FR-14: Keep `PROJECT_LOG.md` current as work proceeds.

### P1 — later backend/integration milestones
- Real authentication and authorization.
- Express REST API and MySQL persistence.
- AWS billing data import using an approved AWS billing interface.
- Scheduled sync jobs and sync history.
- Server-side budget persistence and alert processing.
- Additional cloud providers after AWS has been proven end to end.

## 8. Analytics definitions (backend specifications)
> **Scope Boundary:** In the current frontend-only milestone, all analytics, delta percentages, budget utilizations, and anomaly metrics are supplied as static, pre-calculated fields inside mock fixtures (`mocks/`). Mathematical aggregations and calculations will be implemented server-side in Phase 4.

- Cost totals must use one explicitly selected cost basis and currency per view.
- Period comparison must compare equivalent date windows.
- Percentage change: `(currentPeriodCost - previousPeriodCost) / previousPeriodCost * 100`. Handle a zero previous-period cost safely.
- Budget utilization: `spendForBudgetPeriod / budgetAmount * 100`. Handle a zero/invalid budget amount.
- Anomaly impact: use a deterministic rule and show that the result is a rule-based flag, not an AI diagnosis.
- Forecasts shown in the mock UI must be labeled as estimates and use a documented simple method; do not imply provider-certified forecasts.
- Do not mix currencies without explicit conversion rates and clear labels.

## 9. Non-functional requirements
- Responsive at common desktop, tablet, and mobile widths.
- Keyboard-accessible navigation and controls; visible focus states.
- Clear contrast and readable charts/tables.
- Consistent date, currency, and number formatting.
- No cloud credentials or secret values in frontend code.
- Modular, reusable components; avoid duplicated business logic.
- Meaningful error messages without exposing secrets or stack traces.
- Mock and live data implementations must share the same frontend-facing contracts.

## 10. MVP acceptance criteria
- All 12 pages are routable and have agreed page ownership.
- The app starts with documented commands and no blocking console/build errors.
- Core charts, filters, budget interactions and table controls behave as described.
- Mock data is realistic, internally consistent, and clearly documented.
- Pair 1 and Pair 2 can work in parallel without conflicting on shared files.
- CSV export works wherever it is presented.
- Responsive, loading, empty and error states are covered.
- No AI functionality is present in this release.
- `PROJECT_LOG.md` records completed work, current work, blockers, decisions, and next actions.
