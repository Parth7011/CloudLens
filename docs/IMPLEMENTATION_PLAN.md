# Implementation Plan and Pair Handover
**Status:** Working plan for a four-person team (two pairs)

## 1. Scope
Build the frontend first with JavaScript/JSX and realistic mock AWS data. The frontend is strictly a UI presentation and interaction layer: all analytics metrics, spending deltas, budget utilization figures, and anomaly indicators are consumed from pre-computed static mock fixtures. Business calculations, aggregations, and forecasting belong to the future Express + MySQL backend phase. AI is deferred. Real AWS billing integration is a later phase.

## 2. Exact page ownership
### Pair 1 — first 7 pages
1. Landing Page
2. Login
3. Sign Up
4. Overview
5. Cost Explorer
6. Budgets
7. Anomalies

Pair 1 owns these feature implementations and their feature-specific mock data and interactions.

### Pair 2 — remaining 5 pages
8. Optimization
9. Reports
10. Integrations
11. Notifications
12. Settings

Pair 2 owns these feature implementations and their feature-specific mock data and interactions.

### Shared ownership / coordination
- Shared router and app entry point.
- Shared layout, sidebar, topbar and global navigation.
- Shared UI primitives and styling tokens.
- Shared data contracts and repository interfaces.
- Global responsive behavior and accessibility.
- Integration tests and final app verification.
- `PROJECT_LOG.md` maintenance.

Before coding, the pairs must agree who owns each shared file. Prefer one owner for shared components; other pair proposes changes through a pull request rather than editing the same files concurrently.

## 3. Pair 1 starting instructions
1. Read `PRD.md`, `TECH_STACK.md`, `HLD.md`, `LLD.md`, `DATA_MODEL.md`, `API_SPEC.md` and `AGENTS.md`.
2. Inspect the repository before creating or modifying files.
3. Confirm the working setup: React + Vite + JavaScript/JSX. Do not introduce TypeScript.
4. Agree with Pair 2 on routes, shared layout, component APIs, data models, and mock repository functions.
5. Implement the landing page, Login and Sign Up UI.
6. Implement Overview using predefined mock summary fixtures and presentation formatting (no client-side mathematical aggregation engines).
7. Implement Cost Explorer filters and table behavior.
8. Implement Budgets with create/edit interactions and display of predefined mock utilization states.
9. Implement Anomalies using clearly labeled rule-based demo records.
10. Add loading, empty, error and responsive states.
11. Test the seven routes and their main interactions.
12. Update `PROJECT_LOG.md` after each meaningful work session and hand over integration notes.

## 4. Pair 2 handover — exact starting instructions
Pair 2 must not start by independently creating another application or replacing shared architecture.

### First: inspect and coordinate
1. Read `AGENTS.md` first, then `PRD.md`, `TECH_STACK.md`, `HLD.md`, `LLD.md`, `DATA_MODEL.md`, `API_SPEC.md`, `IMPLEMENTATION_PLAN.md` and the latest `PROJECT_LOG.md`.
2. Pull the agreed shared branch and inspect the actual folder structure, `package.json`, routes, shared layout and components.
3. Run the project using the commands in `README.md`; report setup/build errors before changing architecture.
4. Check the progress log for Pair 1's completed work, in-progress work, known issues, component contracts and file ownership.
5. Confirm the shared route paths, layout API, CSS/styling conventions, mock data contracts and naming conventions with Pair 1.
6. Do not duplicate the router, sidebar, topbar, global styles, mock repositories or shared UI components. Reuse the existing ones.

### Then implement these five pages
**Page 8 — Optimization**
- Show a list/grid of optimization recommendations using mock data.
- Include recommendation title, provider/service, explanation, estimated savings where available, impact/severity and status.
- Provide meaningful filters and a details view or modal if consistent with the shared UI.
- Label savings as estimates; do not imply recommendations have been verified by AWS.
- No AI-generated recommendations in this release.

**Page 9 — Reports**
- Provide cost summary/report views with date range and relevant filters.
- Reuse predefined mock report fixtures and shared display formatting (currency, dates). Do not execute client-side calculation engines.
- Implement CSV export for the selected/filtered data.
- Handle empty data, export errors and success feedback.
- Do not create a separate inconsistent cost dataset.

**Page 10 — Integrations**
- Show AWS as the initial supported provider.
- Include connection status, account/connection summary, last sync time and sync history/status using mock data.
- Any “Connect AWS” or “Sync” action must show a clear demo flow or explicit not-yet-connected status; never pretend a real connection or sync succeeded.
- Keep the structure ready for future provider adapters, but do not implement Azure/GCP integration.

**Page 11 — Notifications**
- Display sample budget and anomaly notifications.
- Support read/unread state and useful filtering if included.
- Keep state behavior consistent within the frontend session unless persistence is already available.
- Reuse shared notification badges and layout components.

**Page 12 — Settings**
- Provide profile/preferences UI, default currency/date-range preferences if in scope, and organization settings placeholders where appropriate.
- Validate forms and show save feedback.
- If data is mock-only, label the behavior as a demo; do not imply settings are persisted to a server.
- Do not implement real authentication/security settings without backend support.

### Pair 2 completion checklist
- All five routes work inside the existing application.
- Shared navigation highlights the correct active page.
- Pages follow the agreed data contracts and use repository/service functions rather than importing unrelated mock arrays directly.
- No duplicate app shell, global router or design system is introduced.
- Buttons, filters, dialogs, exports and toggles perform the advertised behavior.
- Loading, empty, error and responsive states are included as relevant.
- No AI APIs or real cloud credentials are added.
- Run the agreed checks and test the integrated app, not just isolated pages.
- Update `PROJECT_LOG.md` with files changed, completed work, known issues, decisions and next actions.
- Provide Pair 1/integration lead with a handover summary and any required shared-component changes.

## 5. Suggested sequence
### Phase 0 — Align
Approve scope, name later, design direction later, folder structure, route list, contracts, branch strategy and shared-file owners.

### Phase 1 — Foundation
Create Vite React JS app, router, app shell, shared components, mock repository interface and progress log. Both pairs agree on interfaces before feature work.

### Phase 2 — Parallel frontend implementation
Pair 1 implements pages 1–7. Pair 2 implements pages 8–12 against the same agreed shell/contracts. Integrate frequently.

### Phase 3 — Frontend integration
Resolve merge conflicts, verify every route, test shared filters/data consistency, responsive behavior, error states and CSV export.

### Phase 4 — Backend planning and implementation
Implement Express modular monolith, MySQL schema/migrations, auth and domain APIs. Replace mock repositories with API repositories.

### Phase 5 — AWS billing integration
Implement least-privilege AWS access, import/sync process, normalization, deduplication, sync status and cost reconciliation.

### Phase 6 — Hardening
Add tests, logging, caching where useful, security review, deployment and documentation.

## 6. Definition of done for a page
A page is done when it:
- Matches the team's approved design direction (once selected).
- Uses shared components and agreed data contracts.
- Works with mock data without backend credentials.
- Has functioning interactions and useful feedback states.
- Is responsive and keyboard-accessible.
- Has no blocking console errors.
- Has relevant tests or a documented reason tests are deferred.
- Is integrated into the shared application.
- Is recorded in `PROJECT_LOG.md`.
