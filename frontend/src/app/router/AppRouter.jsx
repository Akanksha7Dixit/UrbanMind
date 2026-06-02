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

import AppLayout from "../../components/layouts/AppLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
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
            element={<AIRecommendationCenter />}
          />

          <Route
  path="/citizen-portal"
  element={<CitizenPortal />}
/>


          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}