import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "../../features/dashboard/DashboardPage";
import GISWorkspace from "../../features/gis/GISWorkspace";
import ScenarioBuilder from "../../features/simulation/ScenarioBuilder";
import AnalyticsPage from "../../features/analytics/AnalyticsPage";
import ReportsPage from "../../features/reports/ReportsPage";
import AIRecommendationCenter from "../../features/ai-center/AIRecommendationCenter";
import CitizenPortal from "../../features/citizen-portal/CitizenPortal";
import SettingsPage from "../../features/settings/SettingsPage";

import LoginPage from "../../features/auth/LoginPage";
import RegisterPage from "../../features/auth/RegisterPage";
import ForgotPasswordPage from "../../features/auth/ForgotPasswordPage";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import RoleProtectedRoute from "../../components/auth/RoleProtectedRoute";
import AppLayout from "../../components/layouts/AppLayout";

import IssueManagement from "../../features/planning/IssueManagement";
import IssueSubmission from "../../features/citizen/IssueSubmission";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/auth/login"
          element={<LoginPage />}
        />

        <Route
          path="/auth/register"
          element={<RegisterPage />}
        />

        <Route
          path="/auth/forgot-password"
          element={<ForgotPasswordPage />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/gis"
            element={<GISWorkspace />}
          />

          <Route
            path="/simulation"
            element={<ScenarioBuilder />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/ai-recommendations"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "admin",
                  "planner",
                ]}
              >
                <AIRecommendationCenter />
              </RoleProtectedRoute>
            }
          />

          <Route
  path="/citizen-portal"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin",
        "citizen",
      ]}
    >
      <CitizenPortal />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/report-issue"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin",
        "citizen",
      ]}
    >
      <IssueSubmission />
    </RoleProtectedRoute>
  }
/>

          <Route
            path="/settings"
            element={
              <RoleProtectedRoute
                allowedRoles={["admin"]}
              >
                <SettingsPage />
              </RoleProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
  path="/issues"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin",
        "planner",
      ]}
    >
      <IssueManagement />
    </RoleProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}