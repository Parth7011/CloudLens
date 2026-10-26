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

      {/* Primary Pages 8–12: Pair 2 Ownership */}
      <Route path="/optimization" element={<OptimizationPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
