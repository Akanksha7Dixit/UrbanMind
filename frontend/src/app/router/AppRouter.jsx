import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ===============================
// PAGES
// ===============================

import DashboardPage from "../../features/dashboard/DashboardPage";

import GISWorkspace from "../../features/gis/GISWorkspace";

import ScenarioBuilder from "../../features/simulation/ScenarioBuilder";

import AnalyticsPage from "../../features/analytics/AnalyticsPage";

import AIRecommendationCenter from "../../features/ai-center/AIRecommendationCenter";

import CitizenPortal from "../../features/citizen-portal/CitizenPortal";

import LoginPage from "../../features/auth/LoginPage";

import RegisterPage from "../../features/auth/RegisterPage";

import ForgotPasswordPage from "../../features/auth/ForgotPasswordPage";

import InfrastructureManagement from "../../features/planning/InfrastructureManagement";

import IssueManagement from "../../features/planning/IssueManagement";

import IssueSubmission from "../../features/citizen/IssueSubmission";

import ReportsPage from "../../features/reports/pages/ReportsPage";

import ReportViewerPage from "../../features/reports/pages/ReportViewerPage";

import SettingsPage from "../../features/settings/SettingsPage";

// ===============================
// AUTH / LAYOUT
// ===============================

import ProtectedRoute from "../../components/auth/ProtectedRoute";

import RoleProtectedRoute from "../../components/auth/RoleProtectedRoute";

import AppLayout from "../../components/layouts/AppLayout";


export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =====================================================
            PUBLIC AUTH ROUTES
        ====================================================== */}

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


        {/* =====================================================
            PUBLIC RECRUITER DEMO
        ====================================================== */}

        <Route element={<AppLayout />}>

          {/* Dashboard */}

          <Route
            path="/demo"
            element={<DashboardPage />}
          />


          {/* GIS */}

          <Route
            path="/demo/gis"
            element={<GISWorkspace />}
          />


          {/* Scenario Builder */}

          <Route
            path="/demo/simulation"
            element={<ScenarioBuilder />}
          />


          {/* AI Recommendations */}

          <Route
            path="/demo/ai-recommendations"
            element={<AIRecommendationCenter />}
          />


          {/* Analytics */}

          <Route
            path="/demo/analytics"
            element={<AnalyticsPage />}
          />


          {/* Reports */}

          <Route
            path="/demo/reports"
            element={<ReportsPage />}
          />

        </Route>


        {/* =====================================================
            PROTECTED APPLICATION
        ====================================================== */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          {/* =================================================
              ROOT
          ================================================== */}

          <Route
            path="/"
            element={
              <Navigate
                to="/auth/login"
                replace
              />
            }
          />


          {/* =================================================
              COMMON DASHBOARD
          ================================================== */}

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />


          {/* =================================================
              CITIZEN
          ================================================== */}

          <Route
            path="/citizen/dashboard"
            element={
              <RoleProtectedRoute
                allowedRoles={["citizen"]}
              >
                <CitizenPortal />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/citizen-portal"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "citizen",
                  "admin",
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
                  "citizen",
                  "admin",
                ]}
              >
                <IssueSubmission />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              PLANNER
          ================================================== */}

          <Route
            path="/planner/dashboard"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "admin",
                ]}
              >
                <DashboardPage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/gis"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "admin",
                ]}
              >
                <GISWorkspace />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "admin",
                ]}
              >
                <ScenarioBuilder />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/infrastructure"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "admin",
                ]}
              >
                <InfrastructureManagement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/issues"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "admin",
                ]}
              >
                <IssueManagement />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              AI / ANALYTICS / REPORTS
          ================================================== */}

          <Route
            path="/ai-recommendations"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "analyst",
                  "admin",
                ]}
              >
                <AIRecommendationCenter />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "analyst",
                  "admin",
                ]}
              >
                <AnalyticsPage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "analyst",
                  "admin",
                ]}
              >
                <ReportsPage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/reports/:id"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "planner",
                  "analyst",
                  "admin",
                ]}
              >
                <ReportViewerPage />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              ANALYST
          ================================================== */}

          <Route
            path="/analyst/dashboard"
            element={
              <RoleProtectedRoute
                allowedRoles={[
                  "analyst",
                  "admin",
                ]}
              >
                <DashboardPage />
              </RoleProtectedRoute>
            }
          />


          {/* =================================================
              ADMIN
          ================================================== */}

          <Route
            path="/admin/dashboard"
            element={
              <RoleProtectedRoute
                allowedRoles={["admin"]}
              >
                <DashboardPage />
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


        {/* =====================================================
            FALLBACK
        ====================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/auth/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}