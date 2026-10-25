# Technology Stack
**Status:** Proposed baseline for team approval

## Frontend
- React with Vite
- Plain JavaScript and JSX only — do not use TypeScript or `.ts`/`.tsx` files.
- Tailwind CSS for styling, subject to the team confirming the final visual direction.
- React Router for routing.
- Recharts for data charts.
- Lucide React for icons.
- Fetch API for future backend requests.
- Optional: shadcn/ui for selected components if it fits the approved design. Do not force it into the project.

## Backend (later phase)
- Node.js + Express
- JavaScript
- REST API with `/api/v1` version prefix
- Modular monolith architecture
- Modules organized by business domain, not microservices

## Database (later phase)
- MySQL
- MySQL Workbench for visual database management and SQL inspection
- `mysql2` for direct SQL access is the beginner-friendly default.
- If the team selects Prisma instead, make that decision once and document it. Do not mix raw database access and ORM patterns arbitrarily.
- Use migrations or versioned SQL scripts for schema changes.

## Cloud integration (later phase)
- AWS first.
- Investigate AWS Cost Explorer and/or billing exports according to the exact data granularity, cost, permissions and freshness required.
- Add Azure/GCP only after AWS works end to end.
- Never expose AWS credentials in the browser or commit them to source control.

## Analytics (backend phase)
- SQL aggregations and deterministic calculations are strictly server-side Express responsibilities in later phases.
- Rule-based anomaly detection and budget utilization calculations belong in the backend domain modules.
- In the current frontend-only development phase, all metrics, KPIs, trends, and utilization states are consumed directly as pre-computed static mock fixtures. Frontend handles presentation formatting only (e.g. currency, dates).
- No AI/LLM API, model training, AI chatbot, or AI analysis in the initial scope.

## Testing
- Vitest for JavaScript unit tests.
- React Testing Library for component tests.
- Playwright may be introduced for end-to-end tests.
- Backend/API tests should cover validation, permissions, cost calculations and error handling.

## Development and collaboration
- Git with feature branches and pull requests.
- One shared `AGENTS.md` file containing rules for Antigravity.
- One `PROJECT_LOG.md` maintained throughout the project.
- Keep `.env` files out of Git; commit a `.env.example` containing variable names only.
- Document setup and run commands in `README.md`.

## Dependency policy
Install dependencies only when required. Avoid unnecessary state-management libraries, animation libraries, charting libraries, or AI packages. Pin/record working versions through the package lockfile.
