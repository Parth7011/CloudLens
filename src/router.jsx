import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import CostExplorerPage from './pages/CostExplorerPage.jsx';
import BudgetsPage from './pages/BudgetsPage.jsx';
import AnomaliesPage from './pages/AnomaliesPage.jsx';
import OptimizationPage from './pages/OptimizationPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import PagePlaceholder from './components/PagePlaceholder.jsx';

export default function AppRouter() {
  return (
    <Routes>
      {/* Primary Page 1: Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Primary Pages 2 & 3: User Authentication (Pair 1 Ownership) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Primary Page 4: Executive Overview Dashboard */}
      <Route path="/overview" element={<OverviewPage />} />

      {/* Primary Page 5: Multidimensional Cost Explorer */}
      <Route path="/costs" element={<CostExplorerPage />} />
      <Route
        path="/cost-explorer"
        element={<Navigate to="/costs" replace />}
      />

      {/* Primary Page 6: Budgets & Alerting */}
      <Route path="/budgets" element={<BudgetsPage />} />

      {/* Primary Page 7: Anomaly Detection Center */}
      <Route path="/anomalies" element={<AnomaliesPage />} />

      {/* Primary Pages 8–12: Pair 2 Ownership */}
      {/* Page 8: Optimization — implemented */}
      <Route path="/optimization" element={<OptimizationPage />} />

      {/* Page 9: Reports — implemented */}
      <Route path="/reports" element={<ReportsPage />} />
      <Route
        path="/integrations"
        element={
          <PagePlaceholder
            pageNumber={10}
            pairOwner="Pair 2"
            title="Cloud Provider Integrations"
            description="AWS billing adapter telemetry, connection status, mock sync triggers, and sync job history."
            keyFeatures={[
              "AWS provider connection card with sync telemetry",
              "Simulated 'Sync Now' action with animated feedback",
              "Zero-credential mock connection instructions"
            ]}
          />
        }
      />
      <Route
        path="/notifications"
        element={
          <PagePlaceholder
            pageNumber={11}
            pairOwner="Pair 2"
            title="Notification Center & Alert Feed"
            description="Event log of budget threshold warnings, anomaly discoveries, and sync completion events."
            keyFeatures={[
              "Unread count badge and filter",
              "Mark as read and dismiss actions",
              "Direct navigation links to triggered alerts"
            ]}
          />
        }
      />
      <Route
        path="/settings"
        element={
          <PagePlaceholder
            pageNumber={12}
            pairOwner="Pair 2"
            title="Settings & Organization Preferences"
            description="User profile preferences, default currency selection, and session-stored configurations."
            keyFeatures={[
              "Default currency and date range preferences",
              "Organization metadata fields",
              "Session-persisted settings notice"
            ]}
          />
        }
      />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
