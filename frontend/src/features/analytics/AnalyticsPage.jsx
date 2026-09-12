import { useEffect, useState } from "react";

import { useAuthStore } from "../../store/authStore";

import { getAnalytics } from "../../services/analyticsService";

import {
  BarChart3,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Wrench,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const token = useAuthStore((state) => state.token);

  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError("");

        const data = await getAnalytics(token);

        setAnalytics(data.analytics);
      } catch (error) {
        console.error(error);

        setError(
          error?.response?.data?.message ||
            "Unable to load live analytics."
        );
      }
    };

    if (token) {
      fetchAnalytics();
    }
  }, [token]);

  /*
   * ==============================
   * LOADING / ERROR
   * ==============================
   */

  if (!analytics && !error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Loading Analytics...
          </h2>

          <p className="mt-3 text-slate-400">
            Fetching live city analytics.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertTriangle className="mx-auto text-red-400" />

          <h2 className="mt-4 text-2xl font-bold">
            Analytics Unavailable
          </h2>

          <p className="mt-3 text-slate-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  /*
   * ==============================
   * SAFE VALUES
   * ==============================
   */

  const totalInfrastructure =
    Number(analytics.totalInfrastructure) || 0;

  const operationalInfrastructure =
    Number(analytics.operationalInfrastructure) || 0;

  const maintenanceInfrastructure =
    Number(analytics.maintenanceInfrastructure) || 0;

  const constructionInfrastructure =
    Number(analytics.constructionInfrastructure) || 0;

  const totalIssues =
    Number(analytics.totalIssues) || 0;

  const pendingIssues =
    Number(analytics.pendingIssues) || 0;

  const inProgressIssues =
    Number(analytics.inProgressIssues) || 0;

  const resolvedIssues =
    Number(analytics.resolvedIssues) || 0;

  /*
   * ==============================
   * DERIVED LIVE METRICS
   * ==============================
   */

  const infrastructureHealth =
    totalInfrastructure > 0
      ? Math.round(
          (operationalInfrastructure /
            totalInfrastructure) *
            100
        )
      : 0;

  const issueResolution =
    totalIssues > 0
      ? Math.round(
          (resolvedIssues / totalIssues) * 100
        )
      : 0;

  const issueWorkload =
    totalIssues > 0
      ? pendingIssues + inProgressIssues
      : 0;

  /*
   * ==============================
   * CHART DATA
   * ==============================
   */

  const infrastructureData = [
    {
      name: "Operational",
      value: operationalInfrastructure,
    },
    {
      name: "Maintenance",
      value: maintenanceInfrastructure,
    },
    {
      name: "Construction",
      value: constructionInfrastructure,
    },
  ];

  const issueData = [
    {
      name: "Pending",
      value: pendingIssues,
    },
    {
      name: "In Progress",
      value: inProgressIssues,
    },
    {
      name: "Resolved",
      value: resolvedIssues,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  /*
   * ==============================
   * DYNAMIC INSIGHTS
   * ==============================
   *
   * These are generated from the
   * actual analytics returned by
   * MongoDB through the backend.
   */
const insights = [];

if (totalInfrastructure === 0) {
  insights.push({
    title: "Infrastructure Data",
    icon: Building2,
    text:
      "No infrastructure assets are currently available in the live dataset.",
  });
} else if (maintenanceInfrastructure > 0) {
  insights.push({
    title: "Maintenance Activity",
    icon: Wrench,
    text:
      `${maintenanceInfrastructure} infrastructure asset${
        maintenanceInfrastructure === 1 ? "" : "s"
      } ${
        maintenanceInfrastructure === 1 ? "is" : "are"
      } currently marked for maintenance.`,
  });
} else {
  insights.push({
    title: "Infrastructure Status",
    icon: CheckCircle2,
    text:
      "No infrastructure assets are currently marked for maintenance.",
  });
}

if (totalIssues === 0) {
  insights.push({
    title: "Citizen Issues",
    icon: ClipboardCheck,
    text:
      "No citizen issues are currently present in the live dataset.",
  });
} else if (pendingIssues > 0) {
  insights.push({
    title: "Pending Issues",
    icon: AlertTriangle,
    text:
      `${pendingIssues} citizen issue${
        pendingIssues === 1 ? "" : "s"
      } ${
        pendingIssues === 1 ? "is" : "are"
      } currently pending resolution.`,
  });
} else {
  insights.push({
    title: "Issue Processing",
    icon: CheckCircle2,
    text:
      "There are currently no pending citizen issues in the live dataset.",
  });
}

if (totalIssues > 0) {
  insights.push({
    title: "Resolution Performance",
    icon: TrendingUp,
    text:
      `${resolvedIssues} of ${totalIssues} citizen issue${
        totalIssues === 1 ? "" : "s"
      } ${
        resolvedIssues === 1 ? "has" : "have"
      } been resolved, giving a current resolution rate of ${issueResolution}%.`,
  });
} else {
  insights.push({
    title: "Resolution Performance",
    icon: TrendingUp,
    text:
      "A resolution rate cannot be calculated because there are no citizen issues in the live dataset.",
  });
}

  /*
   * ==============================
   * RETURN
   * ==============================
   */

  return (
    <div className="space-y-8 p-8">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor infrastructure performance,
          operational health and citizen
          issues using live analytics.
        </p>
      </div>

      {/* ================= HERO ================= */}

      <section
        className="
          rounded-3xl
          border border-cyan-500/20
          bg-cyan-500/5
          p-8
        "
      >
        <div className="flex items-center gap-3">
          <BarChart3 className="text-cyan-400" />

          <p className="text-cyan-400">
            Urban Analytics
          </p>
        </div>

        <h2 className="mt-5 text-5xl font-bold">
          Live City Intelligence
        </h2>

        <p className="mt-5 max-w-3xl text-slate-400">
          UrbanMind presents analytics derived from
          the infrastructure and citizen issue
          records currently stored in the platform.
        </p>
      </section>

      {/* ================= KPI CARDS ================= */}

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="ai-card">
          <Building2 className="text-cyan-400" />

          <h2 className="mt-4 text-5xl font-bold">
            {totalInfrastructure}
          </h2>

          <p className="mt-2 text-slate-400">
            Total Infrastructure
          </p>
        </div>

        <div className="ai-card">
          <AlertTriangle className="text-red-400" />

          <h2 className="mt-4 text-5xl font-bold">
            {totalIssues}
          </h2>

          <p className="mt-2 text-slate-400">
            Citizen Issues
          </p>
        </div>

        <div className="ai-card">
          <CheckCircle2 className="text-green-400" />

          <h2 className="mt-4 text-5xl font-bold">
            {operationalInfrastructure}
          </h2>

          <p className="mt-2 text-slate-400">
            Operational Assets
          </p>
        </div>

        <div className="ai-card">
          <BarChart3 className="text-cyan-400" />

          <h2 className="mt-4 text-5xl font-bold">
            {resolvedIssues}
          </h2>

          <p className="mt-2 text-slate-400">
            Resolved Issues
          </p>
        </div>

      </div>

      {/* ================= QUICK OVERVIEW ================= */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/[0.02]
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          City Overview
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">

          <div>
            <p className="text-slate-400">
              Operational
            </p>

            <h3 className="mt-3 text-4xl font-bold text-green-400">
              {operationalInfrastructure}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">
              Maintenance
            </p>

            <h3 className="mt-3 text-4xl font-bold text-yellow-400">
              {maintenanceInfrastructure}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">
              Construction
            </p>

            <h3 className="mt-3 text-4xl font-bold text-red-400">
              {constructionInfrastructure}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">
              Pending Issues
            </p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              {pendingIssues}
            </h3>
          </div>

        </div>
      </section>

      {/* ================= ANALYTICS CHARTS ================= */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Infrastructure Analytics
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* ================= PIE CHART ================= */}

          <div className="ai-card">
            <h3 className="mb-6 text-xl font-semibold">
              Infrastructure Status
            </h3>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={infrastructureData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >
                    {infrastructureData.map(
                      (entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index]}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* ================= BAR CHART ================= */}

          <div className="ai-card">

            <h3 className="mb-6 text-xl font-semibold">
              Citizen Issue Status
            </h3>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={issueData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis dataKey="name" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    fill="#06b6d4"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>
          </div>

        </div>
      </section>

      {/* ================= PERFORMANCE SUMMARY ================= */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/[0.02]
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          Performance Summary
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="ai-card">

            <p className="text-slate-400">
              Infrastructure Health
            </p>

            <h2 className="mt-4 text-5xl font-bold text-green-400">
              {infrastructureHealth}%
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Operational assets divided by
              total infrastructure assets.
            </p>

          </div>

          <div className="ai-card">

            <p className="text-slate-400">
              Issue Resolution
            </p>

            <h2 className="mt-4 text-5xl font-bold text-cyan-400">
              {issueResolution}%
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Resolved issues divided by total
              citizen issues.
            </p>

          </div>

          <div className="ai-card">

            <p className="text-slate-400">
              Active Issue Workload
            </p>

            <h2 className="mt-4 text-5xl font-bold text-yellow-400">
              {issueWorkload}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Pending and in-progress citizen
              issues combined.
            </p>

          </div>

        </div>
      </section>

      {/* ================= LIVE INSIGHTS ================= */}

      <section
        className="
          rounded-3xl
          border border-cyan-500/20
          bg-cyan-500/5
          p-8
        "
      >

        <div className="flex items-center gap-3">

          <Brain className="text-cyan-400" />

          <h2 className="text-2xl font-bold">
            Live Insights
          </h2>

        </div>

        <p className="mt-3 text-sm text-slate-500">
          Automatically derived from the current
          analytics dataset.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {insights.map((insight) => {
            const Icon = insight.icon;

            return (
              <div
                key={insight.title}
                className="ai-card"
              >
                <Icon className="text-cyan-400" />

                <h3 className="mt-4 font-semibold">
                  {insight.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {insight.text}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= EXECUTIVE SUMMARY ================= */}

      <section
        className="
          rounded-3xl
          border border-white/10
          p-8
        "
      >

        <h2 className="text-2xl font-bold">
          Executive Summary
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <div>

            <h3 className="text-xl font-semibold">
              Current Status
            </h3>

            <ul className="mt-4 space-y-3 text-slate-400">

              <li>
                Total Infrastructure:{" "}
                {totalInfrastructure}
              </li>

              <li>
                Operational Assets:{" "}
                {operationalInfrastructure}
              </li>

              <li>
                Maintenance Assets:{" "}
                {maintenanceInfrastructure}
              </li>

              <li>
                Under Construction:{" "}
                {constructionInfrastructure}
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold">
              Citizen Issues
            </h3>

            <ul className="mt-4 space-y-3 text-slate-400">

              <li>
                Total Issues:{" "}
                {totalIssues}
              </li>

              <li>
                Pending:{" "}
                {pendingIssues}
              </li>

              <li>
                In Progress:{" "}
                {inProgressIssues}
              </li>

              <li>
                Resolved:{" "}
                {resolvedIssues}
              </li>

            </ul>

          </div>

        </div>

      </section>

    </div>
  );
}