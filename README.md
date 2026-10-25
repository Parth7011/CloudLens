# Cloud Cost Dashboard — Documentation Pack

This package contains the initial project specification for a frontend-first cloud cost dashboard.

## Files
- `docs/PRD.md` — product goals, requirements, page scope and acceptance criteria.
- `docs/TECH_STACK.md` — chosen and proposed technologies.
- `docs/HLD.md` — high-level architecture and data flow.
- `docs/LLD.md` — frontend structure, contracts and implementation-level guidance.
- `docs/DATA_MODEL.md` — conceptual relational data model.
- `docs/API_SPEC.md` — proposed REST API contracts for the later backend.
- `docs/IMPLEMENTATION_PLAN.md` — phases, page ownership and detailed Pair 2 handover.
- `AGENTS.md` — mandatory rules for Antigravity.
- `PROJECT_LOG.md` — ongoing progress log and handover record.

## Important scope decisions
- JavaScript/JSX only; no TypeScript.
- Frontend first, using mock AWS data.
- MySQL is the planned database.
- Backend will be a Node.js + Express modular monolith.
- AWS first for real billing integration.
- AI is deferred; initial analysis uses deterministic calculations and rules.
- Final brand name and UI direction are not yet selected.

## Suggested workflow
1. Review the documents with both pairs.
2. Approve the shared route list, data contracts, folder structure and shared-file ownership.
3. Create the frontend foundation.
4. Work in parallel according to `docs/IMPLEMENTATION_PLAN.md`.
5. Update `PROJECT_LOG.md` after every meaningful work session.
6. Integrate and test before starting backend implementation.
