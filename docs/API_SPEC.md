# API Specification
**Status:** Proposed contracts for future Express backend  
**API version:** `/api/v1`  
**Current frontend:** Mock repository; do not wait for API implementation

## 1. Conventions
- JSON request/response bodies.
- Use standard HTTP methods and status codes.
- Validate query parameters, path parameters and request bodies.
- Use pagination for potentially large lists.
- Keep secrets out of responses and logs.
- Scope data by authenticated user and organization on the server.
- Use consistent error shape:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be validated",
    "requestId": "example-request-id"
  }
}
```

## 2. Proposed endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/auth/register` | Register a user |
| POST | `/api/v1/auth/login` | Sign in |
| POST | `/api/v1/auth/logout` | Sign out |
| GET | `/api/v1/auth/me` | Current user |
| GET | `/api/v1/overview` | Dashboard KPIs and summaries |
| GET | `/api/v1/costs` | Filtered, paginated cost records |
| GET | `/api/v1/costs/trends` | Time-series data |
| GET | `/api/v1/costs/breakdown` | Cost grouped by service/region/account |
| GET | `/api/v1/budgets` | List budgets |
| POST | `/api/v1/budgets` | Create budget |
| GET | `/api/v1/budgets/:id` | Get budget |
| PATCH | `/api/v1/budgets/:id` | Update budget |
| DELETE | `/api/v1/budgets/:id` | Delete budget |
| GET | `/api/v1/anomalies` | List rule-based anomalies |
| PATCH | `/api/v1/anomalies/:id` | Update anomaly status |
| GET | `/api/v1/recommendations` | List recommendations |
| GET | `/api/v1/reports` | List report metadata, if persisted |
| POST | `/api/v1/reports/export` | Generate/export selected report data |
| GET | `/api/v1/providers` | Provider connection status |
| POST | `/api/v1/providers/aws/sync` | Request an AWS billing sync |
| GET | `/api/v1/providers/sync-jobs/:id` | Check sync job status |
| GET | `/api/v1/notifications` | List notifications |
| PATCH | `/api/v1/notifications/:id` | Mark notification read |
| GET | `/api/v1/settings` | Read user/org preferences |
| PATCH | `/api/v1/settings` | Update allowed preferences |

These are proposed contracts; adjust them during backend implementation and record changes in `PROJECT_LOG.md`.

## 3. Example cost request
`GET /api/v1/costs?provider=aws&from=2026-10-01&to=2026-10-31&page=1&limit=20&service=Amazon%20EC2`

Example response:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0
  }
}
```
The empty list illustrates response shape only.

## 4. Example overview response
```json
{
  "currency": "USD",
  "period": {
    "from": "2026-10-01",
    "to": "2026-10-31"
  },
  "totalCost": 0,
  "previousPeriodCost": 0,
  "changeAmount": 0,
  "changePercent": null,
  "budgetUtilizationPercent": null,
  "topServices": [],
  "dailyTrend": []
}
```

## 5. Filtering and calculations
- Validate date ranges and reject `from > to`.
- Define whether end dates are inclusive and use the same rule throughout.
- Default page size should be bounded; enforce a maximum.
- Use parameterized SQL queries.
- Define cost basis and currency consistently.
- Handle no previous-period spend safely; do not return infinity/NaN.
- AI endpoints are intentionally excluded from this API specification because AI is deferred.
