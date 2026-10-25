# High-Level Design (HLD)
**Status:** Draft; frontend-first with future backend architecture

## 1. Architecture overview
The application starts as a React frontend using mock data behind a repository interface. Later, the frontend calls a single Express backend. The backend is a modular monolith and connects to MySQL and AWS billing services.

```text
User / Browser
      |
      v
React + Vite frontend
  - Public landing/auth UI
  - Dashboard pages
  - Shared components
  - Feature modules
  - Data repository interface
      |
      | Phase 1: mock repository
      | Later: HTTPS REST API
      v
Node.js + Express backend (single deployment)
  - Auth module
  - Costs module
  - Budgets module
  - Anomalies module
  - Optimization module
  - Reports module
  - Providers module
  - Notifications module
  - Settings/organization module
      |                         |
      v                         v
MySQL database             AWS billing interface
                            (Cost Explorer and/or exports)
```

## 2. Key decisions
- Frontend-first: do not block UI development on backend or AWS access.
- JavaScript only for frontend and backend.
- AWS is the first real provider, but the data model and provider boundary should not hard-code AWS concepts into all UI components.
- MySQL is the relational database.
- Use a modular monolith, not microservices.
- No AI in the current scope.
- Keep the final design system undecided until the team chooses UI references.

## 3. Frontend responsibilities
- Render pages and shared navigation.
- Handle UI state, filters, forms and client-side validation.
- Request data through a service/repository layer.
- Format numbers, dates and currency consistently.
- Show loading, empty, error and success states.
- Never access MySQL or cloud provider credentials directly.

## 4. Backend responsibilities (later)
- Validate requests and authenticate/authorize users.
- Apply business rules and cost calculations.
- Query MySQL through repositories.
- Normalize provider billing records.
- Coordinate billing imports and track sync status.
- Apply pagination and filtering server-side where appropriate.
- Return consistent API responses and safe errors.

## 5. Data flow
1. During frontend development, pages request data from mock repositories.
2. Mock repositories return records matching the agreed frontend data contracts.
3. In backend integration, the repository implementation switches to REST calls without rewriting page components.
4. The backend obtains stored normalized cost records from MySQL.
5. A provider adapter imports billing information from AWS.
6. Cost services aggregate records and return data to the frontend.

## 6. Deployment evolution
- Development: Vite frontend and mock data.
- Integration development: Vite + Express + local MySQL.
- Demo deployment: separately deployed frontend/backend and a protected MySQL instance.
- Later: scheduled billing imports, caching, monitoring, backups and more providers.

## 7. Security boundaries
- Secrets only on the server or in a secrets manager.
- Never commit `.env` files.
- Use least-privilege AWS access.
- Validate and authorize all API requests on the server.
- Enforce organization/account scoping before multi-user support is considered complete.
- Do not expose raw provider responses or internal errors unnecessarily.
