# AGENTS.md — Antigravity Project Rules

## 1. Read before acting
Before making changes, inspect the repository and read:
- `docs/PRD.md`
- `docs/TECH_STACK.md`
- `docs/HLD.md`
- `docs/LLD.md`
- `docs/DATA_MODEL.md`
- `docs/API_SPEC.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `PROJECT_LOG.md`

If the docs conflict with the current repository, do not silently rewrite the architecture. Explain the conflict and propose a small documented resolution.

## 2. Language and stack
- Use JavaScript and JSX only.
- Do not create TypeScript files or add TypeScript configuration.
- Frontend: React + Vite.
- Use the dependencies already selected in `package.json`; add a dependency only when justified.
- The eventual backend is Node.js + Express with MySQL.
- No AI/LLM integration in the current scope.

## 3. Product scope
- Initial data is mock AWS billing data.
- AWS is the first real provider for a later integration phase.
- Do not implement Azure/GCP billing yet.
- Do not invent successful real provider connections or syncs in demo UI.
- The design direction is undecided. Do not lock a brand name, color system, dark/light theme, or 3D style without team approval.

## 4. Architecture rules
- Keep frontend pages/components separate from data access and business logic.
- Pages must use repository/service functions; do not scatter direct mock-array imports throughout the UI.
- Build a modular monolith backend: one deployable Express application with domain modules.
- Keep routes, controllers, services and repositories separated when useful.
- Provider-specific code belongs in provider adapters.
- Do not create microservices or introduce distributed infrastructure without explicit approval.
- Avoid circular dependencies, duplicated business logic and cross-module database access.
- Use parameterized SQL and validate server-side requests.
- Never expose secrets in frontend code or responses.

## 5. Team ownership
- Pair 1 owns: Landing Page, Login, Sign Up, Overview, Cost Explorer, Budgets, Anomalies.
- Pair 2 owns: Optimization, Reports, Integrations, Notifications, Settings.
- Shared components, routing and data contracts require explicit ownership. Do not overwrite another pair's work.
- Inspect the latest project log and current code before beginning a handover task.

## 6. Code quality
- Prefer small, readable components and functions.
- Keep calculations deterministic and unit-testable.
- Use consistent date/currency formatting.
- All visible controls must work or clearly state that they are demo/unavailable.
- Include relevant loading, empty, error and success states.
- Preserve working code; do not perform unrelated refactors.
- Do not create large sets of empty placeholder files.
- Do not claim tests passed unless they were actually run.

## 7. Security
- Never commit `.env` files, credentials, tokens or real billing exports.
- Maintain `.env.example` with placeholder variable names only.
- Keep AWS permissions least-privilege.
- Treat billing records as potentially sensitive.
- Do not send billing/account data to external AI services; AI is out of scope unless approved later.

## 8. Project progress log — mandatory
Maintain `PROJECT_LOG.md` at the repository root.
After every meaningful implementation session, update it with:
- Date/session
- Pair/agent and scope worked on
- Files created/changed
- Features completed
- Tests/checks run and actual outcomes
- Known bugs, blockers and incomplete work
- Decisions made and why
- Shared files/contracts changed
- Exact next steps and suggested owner
- Handover notes for the other pair

Do not erase historical entries. Append a dated entry and update the current status/next-actions section. If no work was completed, do not fabricate progress. Before starting a new task, read the latest log.

## 9. End-of-task response
Summarize:
1. What changed.
2. Files changed.
3. Tests/checks actually run and results.
4. Remaining issues.
5. Next recommended steps.
6. Confirm that `PROJECT_LOG.md` was updated.
