import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import CostExplorerPage from './pages/CostExplorerPage.jsx';
import BudgetsPage from './pages/BudgetsPage.jsx';
import AnomaliesPage from './pages/AnomaliesPage.jsx';
import PagePlaceholder from './components/PagePlaceholder.jsx';
import IntegrationsPage from './pages/IntegrationsPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';


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
      <Route
        path="/optimization"
        element={
          <PagePlaceholder
            pageNumber={8}
            pairOwner="Pair 2"
            title="Rightsizing & Cost Optimization"
            description="Actionable cost-reduction recommendations with estimated monthly dollar savings."
            keyFeatures={[
              "Idle compute and unattached storage detection",
              "EC2 instance family rightsizing recommendations",
              "Savings calculation estimates labeled clearly"
            ]}
          />
        }
      />
      <Route
        path="/reports"
        element={
          <PagePlaceholder
            pageNumber={9}
            pairOwner="Pair 2"
            title="Financial Reports & Export Engine"
            description="Pre-configured cost reports with date range selection and client-side CSV downloads."
            keyFeatures={[
              "Executive monthly summary and team allocation views",
              "Client-side CSV generator utility",
              "Export feedback states (loading, success, error)"
            ]}
          />
        }
      />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
