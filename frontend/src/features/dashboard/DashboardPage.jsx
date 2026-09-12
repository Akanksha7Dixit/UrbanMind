import PageHeader from "../../components/shared/PageHeader";
import KpiCard from "../../components/shared/KpiCard";
import StatusCard from "../../components/shared/StatusCard";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuthStore } from "../../store/authStore";

import {
  getDashboardStats,
} from "../../services/dashboardService";

import {
  getInfrastructure,
} from "../../services/infrastructureService";

import {
  getIssues,
} from "../../services/issueService";

import {
  getRecommendations,
} from "../../services/recommendationService";

import {
  Users,
  Car,
  Wind,
  Wallet,
  Building2,
  AlertTriangle,
  Activity,
  MapPin,
} from "lucide-react";

export default function DashboardPage() {
  const token = useAuthStore((state) => state.token);

  const [stats, setStats] = useState(null);
  const [infrastructure, setInfrastructure] = useState([]);
  const [issues, setIssues] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setStats(null);
        setInfrastructure([]);
        setIssues([]);
        setRecommendations([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setDataError("");

        const [
          dashboardData,
          infrastructureData,
          issueData,
          recommendationData,
        ] = await Promise.all([
          getDashboardStats(token),
          getInfrastructure(token),
          getIssues(token),
          getRecommendations(),
        ]);

        setStats(dashboardData || null);
        setInfrastructure(
          Array.isArray(infrastructureData?.infrastructure)
            ? infrastructureData.infrastructure
            : []
        );
        setIssues(
          Array.isArray(issueData?.issues)
            ? issueData.issues
            : []
        );
        setRecommendations(
          Array.isArray(recommendationData?.recommendations)
            ? recommendationData.recommendations
            : []
        );
      } catch (error) {
        console.error("Dashboard data error:", error);
        setDataError(
          error.response?.data?.message ||
            "Unable to load the latest urban data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const operationalInfrastructure = useMemo(
    () =>
      infrastructure.filter(
        (item) => item.status === "Operational"
      ).length,
    [infrastructure]
  );

  const infrastructureCoverage = useMemo(() => {
    if (!infrastructure.length) return 0;

    return Math.round(
      (operationalInfrastructure / infrastructure.length) * 100
    );
  }, [
    infrastructure.length,
    operationalInfrastructure,
  ]);

  const issueResolutionRate = useMemo(() => {
    if (!issues.length) return 0;

    const resolved = issues.filter(
      (issue) => issue.status === "Resolved"
    ).length;

    return Math.round(
      (resolved / issues.length) * 100
    );
  }, [issues]);

  const mappedInfrastructure = useMemo(
    () =>
      infrastructure.filter((item) => {
        const latitude = Number(item.latitude);
        const longitude = Number(item.longitude);

        return (
          Number.isFinite(latitude) &&
          Number.isFinite(longitude) &&
          latitude !== 0 &&
          longitude !== 0
        );
      }),
    [infrastructure]
  );

  const mapMarkers = useMemo(() => {
    if (!mappedInfrastructure.length) return [];

    const latitudes = mappedInfrastructure.map((item) =>
      Number(item.latitude)
    );
    const longitudes = mappedInfrastructure.map((item) =>
      Number(item.longitude)
    );

    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const latitudeRange = maxLatitude - minLatitude;
    const longitudeRange = maxLongitude - minLongitude;

    return mappedInfrastructure.map((item) => {
      const latitude = Number(item.latitude);
      const longitude = Number(item.longitude);

      const left =
        longitudeRange === 0
          ? 50
          : ((longitude - minLongitude) / longitudeRange) * 78 + 11;

      const top =
        latitudeRange === 0
          ? 50
          : ((maxLatitude - latitude) / latitudeRange) * 78 + 11;

      return {
        ...item,
        left,
        top,
      };
    });
  }, [mappedInfrastructure]);

  const highestUtilization = useMemo(() => {
    if (!infrastructure.length) return null;

    return infrastructure.reduce((highest, item) => {
      const current = Number(item.utilization);
      const previous = Number(highest?.utilization);

      if (!Number.isFinite(current)) return highest;
      if (!Number.isFinite(previous) || current > previous) return item;

      return highest;
    }, null);
  }, [infrastructure]);

  const primaryRecommendation =
    recommendations.length > 0
      ? recommendations[0]
      : null;

  return (
    <div className="space-y-8 p-8">
      <PageHeader
        title="Good Morning, Planner"
        description="Live Urban Intelligence Overview"
      />

      {dataError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {dataError}
        </div>
      )}

      {/* Live Urban Health */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Activity className="text-cyan-400" size={24} />
              <h2 className="text-2xl font-semibold">
                Urban Service Health
              </h2>
            </div>

            <p className="mt-3 max-w-3xl text-slate-400">
              Current service indicators calculated from live
              infrastructure and citizen-issue records.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Operational
              </p>
              <p className="mt-2 text-2xl font-bold">
                {loading ? "—" : `${infrastructureCoverage}%`}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                infrastructure
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Resolution
              </p>
              <p className="mt-2 text-2xl font-bold">
                {loading ? "—" : `${issueResolutionRate}%`}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                issues resolved
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                AI Signals
              </p>
              <p className="mt-2 text-2xl font-bold">
                {loading ? "—" : recommendations.length}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Status Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatusCard
          title="Infrastructure Assets"
          value={loading ? "—" : infrastructure.length}
        />

        <StatusCard
          title="Citizen Issues"
          value={loading ? "—" : issues.length}
        />

        <StatusCard
          title="Operational Coverage"
          value={
            loading
              ? "—"
              : `${infrastructureCoverage}%`
          }
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          change="Live"
          icon={Users}
        />

        <KpiCard
          title="Total Issues"
          value={stats?.totalIssues ?? issues.length}
          change="Live"
          icon={Car}
        />

        <KpiCard
          title="Pending Issues"
          value={
            stats?.pendingIssues ??
            issues.filter(
              (issue) => issue.status === "Pending"
            ).length
          }
          change="Live"
          icon={Wind}
        />

        <KpiCard
          title="Resolved Issues"
          value={
            stats?.resolvedIssues ??
            issues.filter(
              (issue) => issue.status === "Resolved"
            ).length
          }
          change="Live"
          icon={Wallet}
        />
      </div>

      {/* GIS Preview */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              City Operations Map Preview
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Live infrastructure records with valid geographic coordinates.
            </p>
          </div>

          <div className="text-sm text-slate-400">
            Mapped assets:{" "}
            <span className="font-semibold text-cyan-400">
              {mappedInfrastructure.length}
            </span>
          </div>
        </div>

        <div className="relative h-[550px] overflow-hidden rounded-2xl bg-slate-950">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,.05) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,.05) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Live insight */}
          <div className="absolute left-6 top-6 z-30 max-w-xs rounded-xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-xl">
            <p className="text-cyan-400">
              Live Infrastructure Signal
            </p>

            {highestUtilization ? (
              <>
                <p className="mt-2 font-medium text-white">
                  {highestUtilization.name}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Highest recorded utilization:{" "}
                  {Number(highestUtilization.utilization).toFixed(0)}%
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {highestUtilization.sector || "Sector unavailable"}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-400">
                No infrastructure utilization data is available.
              </p>
            )}
          </div>

          {/* Live map stats */}
          <div className="absolute right-6 top-6 z-20 flex flex-wrap justify-end gap-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2">
              <p className="text-xs text-slate-400">
                Hospitals
              </p>
              <p className="font-semibold">
                {
                  infrastructure.filter(
                    (item) => item.type === "Hospital"
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2">
              <p className="text-xs text-slate-400">
                Road Assets
              </p>
              <p className="font-semibold">
                {
                  infrastructure.filter(
                    (item) => item.type === "Road"
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2">
              <p className="text-xs text-slate-400">
                Coverage
              </p>
              <p className="font-semibold text-emerald-400">
                {infrastructureCoverage}%
              </p>
            </div>
          </div>

          {/* Live infrastructure markers */}
          {mapMarkers.length > 0 ? (
            mapMarkers.map((item) => (
              <div
                key={item._id}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                }}
                title={`${item.name} • ${item.type} • ${item.sector}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-500/20 shadow-lg shadow-cyan-500/30">
                  <Building2
                    size={15}
                    className="text-cyan-300"
                  />
                </div>

                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-3 text-xs shadow-xl group-hover:block">
                  <p className="font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-cyan-400">
                    {item.type}
                  </p>
                  <p className="mt-1 text-slate-400">
                    {item.sector}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-slate-500">
                    <MapPin size={11} />
                    {Number(item.latitude).toFixed(5)},{" "}
                    {Number(item.longitude).toFixed(5)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-6 py-5 text-center backdrop-blur-xl">
                <Building2
                  className="mx-auto text-slate-500"
                  size={30}
                />
                <p className="mt-3 font-medium">
                  No Mapped Infrastructure
                </p>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Infrastructure records with valid latitude and
                  longitude will appear here automatically.
                </p>
              </div>
            </div>
          )}

          {/* Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-bold tracking-widest text-slate-800/60">
              URBAN GIS
            </span>
          </div>
        </div>
      </div>

      {/* Live Operations + AI */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Live Operations */}
        <div className="xl:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex items-center gap-3">
            <Activity className="text-cyan-400" size={22} />
            <div>
              <h3 className="text-xl font-semibold">
                Live Operations
              </h3>
              <p className="text-sm text-slate-400">
                Current records from the urban data store.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-cyan-400" />
                <h4 className="font-medium">
                  Operational Infrastructure
                </h4>
              </div>

              <p className="mt-3 text-3xl font-bold">
                {operationalInfrastructure}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                of {infrastructure.length} total assets
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-400" />
                <h4 className="font-medium">
                  Unresolved Issues
                </h4>
              </div>

              <p className="mt-3 text-3xl font-bold">
                {
                  issues.filter(
                    (issue) => issue.status !== "Resolved"
                  ).length
                }
              </p>

              <p className="mt-1 text-sm text-slate-400">
                pending or in progress
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="xl:col-span-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                AI Recommendations
              </h3>
              <p className="text-sm text-slate-400">
                Based on the current urban dataset.
              </p>
            </div>

            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
              {recommendations.length} live
            </span>
          </div>

          {primaryRecommendation ? (
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              <p className="text-sm text-cyan-400">
                Recommended Action
              </p>

              <h4 className="mt-2 text-xl font-semibold">
                {primaryRecommendation.title}
              </h4>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {primaryRecommendation.recommendation}
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                {primaryRecommendation.category && (
                  <span className="text-cyan-400">
                    {primaryRecommendation.category}
                  </span>
                )}

                {primaryRecommendation.priority && (
                  <span className="text-amber-400">
                    {primaryRecommendation.priority}
                  </span>
                )}

                {Number.isFinite(
                  Number(primaryRecommendation.confidence)
                ) && (
                  <span className="text-emerald-400">
                    Confidence{" "}
                    {Number(
                      primaryRecommendation.confidence
                    ).toFixed(0)}
                    %
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="font-medium">
                No AI recommendations available
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Recommendations will appear when the AI service
                has current urban data to analyze.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
