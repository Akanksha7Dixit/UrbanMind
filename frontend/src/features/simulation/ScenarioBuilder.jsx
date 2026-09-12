import {
  TrendingUp,
  Building2,
  Trees,
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Plus,
  Save,
  Play,
  Trash2,
  Download,
  RotateCcw,
  Clock,
  Train,
  School,
  Hospital,
  Route,
  X,
  CheckCircle2,
  Target,
  BarChart3,
  MapPin,
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import { useEffect, useMemo, useState } from "react";

// =====================================================
// HELPERS
// =====================================================

const clamp = (value, min, max) =>
  Math.min(Math.max(Number(value) || 0, min), max);

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const formatCurrency = (value) => {
  const amount = Number(value) || 0;

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)}K Cr`;
  }

  return `₹${Math.round(amount)} Cr`;
};

const createDefaultScenario = () => ({
  id: generateId(),
  name: "New Urban Scenario",
  description:
    "Create a planning scenario and evaluate its projected impact using the current city data.",
  targetYear: new Date().getFullYear() + 1,
  populationGrowth: 0,
  housingExpansion: 0,
  greenInvestment: 0,
  infrastructureBudget: 0,
  newHospitals: 0,
  newSchools: 0,
  metroExpansion: 0,
  roadExpansion: 0,
  status: "Draft",
  createdAt: new Date().toISOString(),
  simulatedAt: null,
  results: null,
});

// =====================================================
// SCENARIO CARD
// =====================================================

function ScenarioCard({ scenario, active, onSelect, onDelete }) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        active
          ? "border-cyan-500/40 bg-cyan-500/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <button type="button" onClick={onSelect} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">{scenario.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
              {scenario.description}
            </p>
          </div>

          <span
            className={`rounded-full px-2 py-1 text-[10px] font-medium ${
              scenario.status === "Simulated"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-amber-500/10 text-amber-400"
            }`}
          >
            {scenario.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Year
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {scenario.targetYear}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Budget
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {formatCurrency(scenario.infrastructureBudget)}
            </p>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
        className="mt-3 flex items-center gap-2 text-xs text-slate-500 transition hover:text-red-400"
      >
        <Trash2 size={13} />
        Delete
      </button>
    </div>
  );
}

// =====================================================
// SLIDER FIELD
// =====================================================

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "%",
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>

        <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-sm font-semibold text-cyan-400">
          {value}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-5 w-full accent-cyan-500"
      />

      <div className="mt-2 flex justify-between text-[10px] text-slate-600">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

// =====================================================
// NUMBER FIELD
// =====================================================

function NumberField({
  label,
  value,
  min = 0,
  max = 100,
  suffix = "",
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{label}</p>

        <div className="flex items-center gap-1">
          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(event) =>
              onChange(
                clamp(event.target.value, min, max)
              )
            }
            className="w-20 rounded-lg border border-white/10 bg-slate-900 px-2 py-1 text-right text-sm text-white outline-none focus:border-cyan-500"
          />

          {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// RESULT CARD
// =====================================================

function ResultCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <Icon size={20} className="text-cyan-400" />

        {change !== undefined && (
          <span
            className={`text-xs font-medium ${
              positive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}
          </span>
        )}
      </div>

      <p className="mt-5 text-sm text-slate-400">{label}</p>

      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ScenarioBuilder() {
  const [scenario, setScenario] = useState(createDefaultScenario);
  const [scenarios, setScenarios] = useState([]);

  const [infrastructure, setInfrastructure] = useState([]);
  const [issues, setIssues] = useState([]);
  const [baseline, setBaseline] = useState(null);

  const [loadingData, setLoadingData] = useState(true);
  const [showCreatePanel, setShowCreatePanel] = useState(true);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [notification, setNotification] = useState("");

  // ===================================================
  // LOAD LIVE CITY DATA + SAVED SCENARIOS
  // ===================================================

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);

      try {
        const [
          infrastructureResponse,
          issuesResponse,
          scenariosResponse,
        ] = await Promise.all([
          axiosInstance.get("/infrastructure"),
          axiosInstance.get("/issues"),
          axiosInstance.get("/scenarios"),
        ]);

        const liveInfrastructure = Array.isArray(
          infrastructureResponse.data?.infrastructure
        )
          ? infrastructureResponse.data.infrastructure
          : Array.isArray(infrastructureResponse.data)
            ? infrastructureResponse.data
            : [];

        const liveIssues = Array.isArray(issuesResponse.data?.issues)
          ? issuesResponse.data.issues
          : Array.isArray(issuesResponse.data)
            ? issuesResponse.data
            : [];

        const savedScenarios = Array.isArray(
          scenariosResponse.data?.scenarios
        )
          ? scenariosResponse.data.scenarios
          : Array.isArray(scenariosResponse.data)
            ? scenariosResponse.data
            : [];

        setInfrastructure(liveInfrastructure);
        setIssues(liveIssues);
        setScenarios(savedScenarios);

        const totalInfrastructure = liveInfrastructure.length;

        const operationalInfrastructure = liveInfrastructure.filter(
          (item) => item.status === "Operational"
        ).length;

        const operationalRate =
          totalInfrastructure > 0
            ? (operationalInfrastructure / totalInfrastructure) * 100
            : 0;

        const totalUtilization = liveInfrastructure.reduce(
          (sum, item) => sum + Number(item.utilization || 0),
          0
        );

        const averageUtilization =
          totalInfrastructure > 0
            ? totalUtilization / totalInfrastructure
            : 0;

        const totalIssues = liveIssues.length;

        const resolvedIssues = liveIssues.filter(
          (item) => item.status === "Resolved"
        ).length;

        const issueResolutionRate =
          totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;

        const highPriorityIssues = liveIssues.filter(
          (item) =>
            item.priority === "High" || item.priority === "Critical"
        ).length;

        const serviceHealth =
          operationalRate * 0.6 + issueResolutionRate * 0.4;

        setBaseline({
          infrastructure: totalInfrastructure,
          operationalInfrastructure,
          operationalRate,
          averageUtilization,
          totalIssues,
          resolvedIssues,
          issueResolutionRate,
          highPriorityIssues,
          serviceHealth,
        });
      } catch (error) {
        console.error("Unable to load scenario data:", error);

        setNotification(
          error.response?.data?.message ||
            "Unable to load live city data."
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // ===================================================
  // NOTIFICATION
  // ===================================================

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => setNotification(""), 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  // ===================================================
  // UPDATE SCENARIO
  // ===================================================

  const updateScenario = (field, value) => {
    setScenario((previous) => ({
      ...previous,
      [field]: value,
      status: "Draft",
      results: null,
    }));
  };

  // ===================================================
  // CREATE NEW SCENARIO
  // ===================================================

  const createNewScenario = () => {
    setScenario(createDefaultScenario());
    setShowCreatePanel(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // RUN SIMULATION
  // ===================================================

  const runSimulation = async () => {
    if (!baseline) {
      setNotification("Live city data is still loading.");
      return;
    }

    setSimulationRunning(true);
    setNotification("Urban simulation is running...");

    await new Promise((resolve) => setTimeout(resolve, 400));

    const {
      populationGrowth,
      housingExpansion,
      greenInvestment,
      newHospitals,
      newSchools,
      metroExpansion,
      roadExpansion,
      infrastructureBudget,
    } = scenario;

    // These are simulation-model coefficients, not city data.
    const capacityAddition =
      newHospitals + newSchools + metroExpansion * 0.08 + roadExpansion * 0.05;

    const operationalImprovement =
      capacityAddition * 1.5 +
      greenInvestment * 0.04 +
      infrastructureBudget * 0.01;

    const projectedOperationalRate = clamp(
      baseline.operationalRate + operationalImprovement,
      0,
      100
    );

    const utilizationPressure =
      populationGrowth * 0.3 + housingExpansion * 0.15;

    const capacityRelief = capacityAddition * 2.5;

    const projectedUtilization = clamp(
      baseline.averageUtilization +
        utilizationPressure -
        capacityRelief,
      0,
      100
    );

    const issueResolutionImprovement =
      newHospitals * 1.2 +
      newSchools * 0.7 +
      greenInvestment * 0.05 +
      infrastructureBudget * 0.03;

    const projectedIssueResolutionRate = clamp(
      baseline.issueResolutionRate + issueResolutionImprovement,
      0,
      100
    );

    const projectedServiceHealth = clamp(
      projectedOperationalRate * 0.6 +
        projectedIssueResolutionRate * 0.4 -
        Math.max(projectedUtilization - 80, 0) * 0.2,
      0,
      100
    );

    const infrastructure =
      baseline.infrastructure +
      newHospitals +
      newSchools +
      Math.round(metroExpansion * 0.08) +
      Math.round(roadExpansion * 0.05);

    const coverageChange =
      projectedOperationalRate - baseline.operationalRate;

    const utilizationChange =
      projectedUtilization - baseline.averageUtilization;

    const resolutionChange =
      projectedIssueResolutionRate - baseline.issueResolutionRate;

    const healthChange =
      projectedServiceHealth - baseline.serviceHealth;

    const estimatedBenefit =
      Math.max(coverageChange, 0) * 10 +
      Math.max(resolutionChange, 0) * 8 +
      Math.max(-utilizationChange, 0) * 6 +
      greenInvestment * 0.8 +
      capacityAddition * 5;

    const roi =
      infrastructureBudget > 0
        ? (estimatedBenefit / infrastructureBudget) * 100
        : 0;

    const budgetRisk =
      infrastructureBudget === 0
        ? "Low"
        : infrastructureBudget > 350
          ? "High"
          : infrastructureBudget > 200
            ? "Medium"
            : "Low";

    const environmentalRisk =
      greenInvestment >= 60
        ? "Low"
        : populationGrowth > 20
          ? "High"
          : "Medium";

    const trafficRisk =
      projectedUtilization > 80
        ? "High"
        : projectedUtilization > 60
          ? "Medium"
          : "Low";

    const implementationRisk =
      populationGrowth > 25 || infrastructureBudget > 350
        ? "High"
        : populationGrowth > 15 || infrastructureBudget > 200
          ? "Medium"
          : "Low";

    let recommendation =
      "Maintain a balanced investment strategy based on the current city indicators.";

    let recommendationReason =
      "The scenario should be evaluated against live infrastructure performance, utilization and issue-resolution conditions.";

    if (projectedOperationalRate < baseline.operationalRate + 3) {
      recommendation =
        "Prioritize capacity and operational improvements.";

      recommendationReason =
        "The projected operational-rate improvement is limited relative to the current live infrastructure baseline.";
    } else if (projectedUtilization > 80) {
      recommendation =
        "Prioritize capacity expansion and mobility improvements.";

      recommendationReason =
        "Projected utilization remains high after applying the selected growth and expansion assumptions.";
    } else if (projectedIssueResolutionRate < baseline.issueResolutionRate + 5) {
      recommendation =
        "Increase investment in public-service response capacity.";

      recommendationReason =
        "The scenario produces only a limited improvement in the live issue-resolution indicator.";
    } else if (greenInvestment >= 60) {
      recommendation =
        "Prioritize sustainability investment alongside infrastructure growth.";

      recommendationReason =
        "The selected scenario places a strong emphasis on green investment while improving live service indicators.";
    } else {
      recommendation =
        "Proceed with balanced infrastructure expansion.";

      recommendationReason =
        "The selected assumptions improve the live operational, utilization and issue-resolution indicators without creating a high projected service risk.";
    }

    const startYear = Math.max(
      new Date().getFullYear(),
      scenario.targetYear - 3
    );

    const timeline = [
      {
        year: startYear,
        title: "Planning & Approvals",
        description:
          "Feasibility, planning and approval activities for the selected scenario.",
        icon: Target,
      },
      {
        year: startYear + 1,
        title: "Infrastructure Delivery",
        description:
          "Implement the infrastructure capacity selected in the scenario.",
        icon: Route,
      },
      {
        year: startYear + 2,
        title: "Public Services",
        description:
          `${newHospitals} hospitals and ${newSchools} schools selected in the scenario.`,
        icon: Hospital,
      },
      {
        year: scenario.targetYear,
        title: "Mobility & Review",
        description:
          `${metroExpansion} km metro and ${roadExpansion}% road expansion selected for evaluation.`,
        icon: Train,
      },
    ];

    const results = {
      infrastructure,
      operationalRate: projectedOperationalRate,
      averageUtilization: projectedUtilization,
      issueResolutionRate: projectedIssueResolutionRate,
      serviceHealth: projectedServiceHealth,

      operationalRateChange: coverageChange,
      utilizationChange,
      issueResolutionRateChange: resolutionChange,
      serviceHealthChange: healthChange,

      roi,
      estimatedCost: infrastructureBudget,

      risks: {
        budget: budgetRisk,
        environmental: environmentalRisk,
        traffic: trafficRisk,
        implementation: implementationRisk,
      },

      recommendation,
      recommendationReason,
      timeline,

      confidence: clamp(
        70 +
          Math.min(
            Math.abs(healthChange) + Math.abs(coverageChange),
            25
          ),
        70,
        95
      ),

      generatedAt: new Date().toISOString(),
    };

    const updatedScenario = {
      ...scenario,
      status: "Simulated",
      simulatedAt: new Date().toISOString(),
      results,
    };

    setScenario(updatedScenario);

    if (scenario._id) {
      try {
        await axiosInstance.put(`/scenarios/${scenario._id}`, {
          name: scenario.name,
          description: scenario.description,
          targetYear: scenario.targetYear,
          populationGrowth: scenario.populationGrowth,
          housingExpansion: scenario.housingExpansion,
          greenInvestment: scenario.greenInvestment,
          infrastructureBudget: scenario.infrastructureBudget,
          newHospitals: scenario.newHospitals,
          newSchools: scenario.newSchools,
          metroExpansion: scenario.metroExpansion,
          roadExpansion: scenario.roadExpansion,
          status: "Simulated",
          simulatedAt: updatedScenario.simulatedAt,
          simulationResults: results,
        });

        const listResponse = await axiosInstance.get("/scenarios");

        if (listResponse.data.success) {
          setScenarios(listResponse.data.scenarios || []);
        }
      } catch (error) {
        console.error("Unable to save simulation results:", error);

        setNotification(
          "Simulation completed, but results could not be saved."
        );
      }
    }

    setSimulationRunning(false);
    setNotification("Simulation completed successfully.");

    setTimeout(() => {
      document
        .getElementById("simulation-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  // ===================================================
  // SAVE SCENARIO
  // ===================================================

  const saveScenario = async () => {
    try {
      const scenarioToSave = {
        name: scenario.name,
        description: scenario.description,
        targetYear: scenario.targetYear,
        populationGrowth: scenario.populationGrowth,
        housingExpansion: scenario.housingExpansion,
        greenInvestment: scenario.greenInvestment,
        infrastructureBudget: scenario.infrastructureBudget,
        newHospitals: scenario.newHospitals,
        newSchools: scenario.newSchools,
        metroExpansion: scenario.metroExpansion,
        roadExpansion: scenario.roadExpansion,
        status: scenario.results ? "Simulated" : "Draft",
        simulatedAt: scenario.simulatedAt,
        simulationResults: scenario.results,
      };

      const response = scenario._id
        ? await axiosInstance.put(
            `/scenarios/${scenario._id}`,
            scenarioToSave
          )
        : await axiosInstance.post("/scenarios", scenarioToSave);

      const savedScenario =
        response.data?.scenario || {
          ...scenarioToSave,
          _id: scenario._id,
        };

      setScenario({
        ...savedScenario,
        results:
          savedScenario.results ||
          savedScenario.simulationResults ||
          null,
      });

      const listResponse = await axiosInstance.get("/scenarios");

      if (listResponse.data.success) {
        setScenarios(listResponse.data.scenarios || []);
      }

      setNotification("Scenario saved successfully.");
    } catch (error) {
      console.error("Unable to save scenario:", error);

      setNotification(
        error.response?.data?.message ||
          "Unable to save scenario."
      );
    }
  };

  // ===================================================
  // LOAD SCENARIO
  // ===================================================

  const loadScenario = (savedScenario) => {
    setScenario({
      ...savedScenario,
      results:
        savedScenario.results ||
        savedScenario.simulationResults ||
        null,
    });

    setShowCreatePanel(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // DELETE SCENARIO
  // ===================================================

  const deleteScenario = async (id) => {
    try {
      await axiosInstance.delete(`/scenarios/${id}`);

      setScenarios((previous) =>
        previous.filter((item) => item._id !== id)
      );

      if (scenario._id === id) {
        setScenario(createDefaultScenario());
      }

      setNotification("Scenario deleted.");
    } catch (error) {
      console.error("Unable to delete scenario:", error);

      setNotification(
        error.response?.data?.message ||
          "Unable to delete scenario."
      );
    }
  };

  // ===================================================
  // EXPORT
  // ===================================================

  const exportScenario = () => {
    const blob = new Blob(
      [JSON.stringify(scenario, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${scenario.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-scenario.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    setNotification("Scenario exported.");
  };

  // ===================================================
  // RESET
  // ===================================================

  const resetScenario = () => {
    const reset = createDefaultScenario();

    reset.name = scenario.name;
    reset.description = scenario.description;
    reset.targetYear = scenario.targetYear;

    setScenario(reset);
    setNotification("Scenario reset.");
  };

  const results = scenario.results;

  // ===================================================
  // DIGITAL TWIN
  // ===================================================
  //
  // The Digital Twin uses only records returned by the
  // backend. Positions are calculated from each record's
  // real latitude/longitude. No generated city objects,
  // index-based coordinates, or fake infrastructure are
  // used here.
  // ===================================================

  const digitalTwinData = useMemo(() => {
    // 0,0 is a valid numeric coordinate technically, but it is not a useful
    // city-record location for this application. Treat it as unavailable
    // rather than plotting a record at the Gulf of Guinea.
    const hasUsableCoordinates = (item) => {
      const latitude = Number(item.latitude);
      const longitude = Number(item.longitude);

      return (
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        !(latitude === 0 && longitude === 0)
      );
    };

    const liveInfrastructure = infrastructure.filter(hasUsableCoordinates);

    const liveIssues = issues.filter(hasUsableCoordinates);

    const coordinateRecords = [
      ...liveInfrastructure.map((item) => ({
        ...item,
        _twinType: "infrastructure",
      })),
      ...liveIssues.map((item) => ({
        ...item,
        _twinType: "issue",
      })),
    ];

    if (coordinateRecords.length === 0) {
      return {
        infrastructure: [],
        issues: [],
        markers: [],
        hasCoordinates: false,
      };
    }

    const latitudes = coordinateRecords.map((item) =>
      Number(item.latitude)
    );

    const longitudes = coordinateRecords.map((item) =>
      Number(item.longitude)
    );

    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const latitudeRange = maxLatitude - minLatitude;
    const longitudeRange = maxLongitude - minLongitude;

    const toPosition = (item) => {
      const latitude = Number(item.latitude);
      const longitude = Number(item.longitude);

      const normalizedX =
        longitudeRange === 0
          ? 50
          : ((longitude - minLongitude) / longitudeRange) * 80 + 10;

      const normalizedY =
        latitudeRange === 0
          ? 50
          : ((maxLatitude - latitude) / latitudeRange) * 80 + 10;

      return {
        ...item,
        left: clamp(normalizedX, 5, 95),
        top: clamp(normalizedY, 5, 95),
      };
    };

    const positionedRecords = coordinateRecords.map(toPosition);

    /*
     * Several real records can legitimately have identical or very close
     * coordinates. Rendering them all at exactly the same CSS position makes
     * the later marker hide the earlier ones. Group only visually overlapping
     * records; the underlying latitude/longitude remains unchanged.
     */
    const overlapThreshold = 3.5;
    const markerGroups = [];

    positionedRecords.forEach((record) => {
      const matchingGroup = markerGroups.find((group) =>
        group.records.some(
          (existing) =>
            Math.hypot(
              existing.left - record.left,
              existing.top - record.top
            ) <= overlapThreshold
        )
      );

      if (matchingGroup) {
        matchingGroup.records.push(record);

        const total = matchingGroup.records.length;
        matchingGroup.left =
          matchingGroup.records.reduce((sum, item) => sum + item.left, 0) /
          total;
        matchingGroup.top =
          matchingGroup.records.reduce((sum, item) => sum + item.top, 0) /
          total;
      } else {
        markerGroups.push({
          left: record.left,
          top: record.top,
          records: [record],
        });
      }
    });

    return {
      infrastructure: liveInfrastructure.map(toPosition),
      issues: liveIssues.map(toPosition),
      markers: markerGroups,
      hasCoordinates: true,
    };
  }, [infrastructure, issues]);

  const forecast = useMemo(() => {
    if (!results) {
      return {
        operationalRate: 0,
        utilization: 0,
        issueResolutionRate: 0,
        roi: 0,
      };
    }

    return {
      operationalRate: results.operationalRateChange,
      utilization: results.utilizationChange,
      issueResolutionRate: results.issueResolutionRateChange,
      roi: results.roi,
    };
  }, [results]);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="space-y-10 p-8 pb-20">
      {notification && (
        <div className="fixed right-6 top-6 z-[2000] flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-slate-950/95 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur-xl">
          <CheckCircle2 size={18} className="text-cyan-400" />
          {notification}
        </div>
      )}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Urban Simulation
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white">
            Scenario Builder
          </h1>

          <p className="mt-2 max-w-3xl text-slate-400">
            Create, simulate and compare future urban development strategies
            using the current live city indicators.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={createNewScenario}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white transition hover:bg-white/5"
          >
            <Plus size={17} />
            New Scenario
          </button>

          <button
            type="button"
            onClick={saveScenario}
            className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm text-cyan-400 transition hover:bg-cyan-500/20"
          >
            <Save size={17} />
            Save
          </button>

          <button
            type="button"
            onClick={exportScenario}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </div>

      {loadingData ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-slate-400">
          Loading live infrastructure and issue data...
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.02] p-5 xl:sticky xl:top-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Workspace
                </p>

                <h2 className="mt-2 text-lg font-semibold text-white">
                  My Scenarios
                </h2>
              </div>

              <button
                type="button"
                onClick={createNewScenario}
                className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus size={17} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {scenarios.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center">
                  <BarChart3 size={24} className="mx-auto text-slate-600" />
                  <p className="mt-3 text-sm text-slate-500">
                    No saved scenarios yet.
                  </p>
                </div>
              ) : (
                scenarios.map((item) => (
                  <ScenarioCard
                    key={item._id}
                    scenario={item}
                    active={item._id === scenario._id}
                    onSelect={() => loadScenario(item)}
                    onDelete={() => deleteScenario(item._id)}
                  />
                ))
              )}
            </div>
          </aside>

          <main className="min-w-0 space-y-10">
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/30 via-slate-950 to-indigo-950/30 p-8 lg:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                      {scenario.status}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={13} />
                      Target: {scenario.targetYear}
                    </span>
                  </div>

                  <h2 className="mt-5 text-4xl font-bold text-white lg:text-5xl">
                    {scenario.name}
                  </h2>

                  <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">
                    {scenario.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:min-w-[420px]">
                  <div>
                    <p className="text-xs text-slate-500">
                      Infrastructure
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {results
                        ? results.infrastructure
                        : baseline?.infrastructure ?? "—"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Service Health
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {results
                        ? `${results.serviceHealth.toFixed(1)}%`
                        : baseline
                          ? `${baseline.serviceHealth.toFixed(1)}%`
                          : "—"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Operational Rate
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {results
                        ? `${results.operationalRate.toFixed(1)}%`
                        : baseline
                          ? `${baseline.operationalRate.toFixed(1)}%`
                          : "—"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">ROI</p>
                    <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                      {results ? `${results.roi.toFixed(1)}%` : "—"}
                    </h3>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Live Baseline
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Current City Indicators
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  These values are calculated from the current infrastructure
                  and citizen-issue records returned by the backend.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <ResultCard
                  icon={Building2}
                  label="Infrastructure Assets"
                  value={baseline?.infrastructure ?? "—"}
                />

                <ResultCard
                  icon={ShieldCheck}
                  label="Operational Rate"
                  value={
                    baseline
                      ? `${baseline.operationalRate.toFixed(1)}%`
                      : "—"
                  }
                />

                <ResultCard
                  icon={Activity}
                  label="Average Utilization"
                  value={
                    baseline
                      ? `${baseline.averageUtilization.toFixed(1)}%`
                      : "—"
                  }
                />

                <ResultCard
                  icon={CheckCircle2}
                  label="Issue Resolution Rate"
                  value={
                    baseline
                      ? `${baseline.issueResolutionRate.toFixed(1)}%`
                      : "—"
                  }
                />
              </div>
            </section>

            {showCreatePanel && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      Scenario Configuration
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Adjust planning assumptions and run a simulated future.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCreatePanel(false)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mb-6 grid gap-6 lg:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-2">
                    <label className="text-sm text-slate-400">
                      Scenario Name
                    </label>

                    <input
                      type="text"
                      value={scenario.name}
                      onChange={(event) =>
                        updateScenario("name", event.target.value)
                      }
                      className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <label className="text-sm text-slate-400">
                      Target Year
                    </label>

                    <input
                      type="number"
                      min={new Date().getFullYear()}
                      max="2050"
                      value={scenario.targetYear}
                      onChange={(event) =>
                        updateScenario(
                          "targetYear",
                          Number(event.target.value)
                        )
                      }
                      className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-3">
                    <label className="text-sm text-slate-400">
                      Scenario Description
                    </label>

                    <textarea
                      value={scenario.description}
                      onChange={(event) =>
                        updateScenario("description", event.target.value)
                      }
                      rows="3"
                      className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <SliderField
                    label="Population Growth Assumption"
                    value={scenario.populationGrowth}
                    min={0}
                    max={50}
                    onChange={(value) =>
                      updateScenario("populationGrowth", value)
                    }
                  />

                  <SliderField
                    label="Housing Expansion Assumption"
                    value={scenario.housingExpansion}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      updateScenario("housingExpansion", value)
                    }
                  />

                  <SliderField
                    label="Green Investment Assumption"
                    value={scenario.greenInvestment}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      updateScenario("greenInvestment", value)
                    }
                  />

                  <SliderField
                    label="Infrastructure Budget"
                    value={scenario.infrastructureBudget}
                    min={0}
                    max={500}
                    suffix=" Cr"
                    onChange={(value) =>
                      updateScenario("infrastructureBudget", value)
                    }
                  />
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <NumberField
                    label="New Hospitals"
                    value={scenario.newHospitals}
                    max={20}
                    onChange={(value) =>
                      updateScenario("newHospitals", value)
                    }
                  />

                  <NumberField
                    label="New Schools"
                    value={scenario.newSchools}
                    max={30}
                    onChange={(value) =>
                      updateScenario("newSchools", value)
                    }
                  />

                  <NumberField
                    label="Metro Expansion"
                    value={scenario.metroExpansion}
                    max={100}
                    suffix=" km"
                    onChange={(value) =>
                      updateScenario("metroExpansion", value)
                    }
                  />

                  <NumberField
                    label="Road Expansion"
                    value={scenario.roadExpansion}
                    max={100}
                    suffix="%"
                    onChange={(value) =>
                      updateScenario("roadExpansion", value)
                    }
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={runSimulation}
                    disabled={simulationRunning || !baseline}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Play size={17} />
                    {simulationRunning
                      ? "Running Simulation..."
                      : "Run Simulation"}
                  </button>

                  <button
                    type="button"
                    onClick={resetScenario}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>
              </section>
            )}

            <section id="simulation-results">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Decision Intelligence
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Current vs Scenario
                </h2>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
                <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03]">
                  <div className="p-5 text-sm font-medium text-slate-400">
                    Metric
                  </div>
                  <div className="border-l border-white/10 p-5 text-sm font-medium text-slate-400">
                    Current
                  </div>
                  <div className="border-l border-white/10 p-5 text-sm font-medium text-cyan-400">
                    Scenario
                  </div>
                </div>

                {[
                  {
                    label: "Infrastructure Assets",
                    current: baseline?.infrastructure ?? "—",
                    scenario: results?.infrastructure ?? "Run simulation",
                  },
                  {
                    label: "Operational Rate",
                    current: baseline
                      ? `${baseline.operationalRate.toFixed(1)}%`
                      : "—",
                    scenario: results
                      ? `${results.operationalRate.toFixed(1)}%`
                      : "Run simulation",
                  },
                  {
                    label: "Average Utilization",
                    current: baseline
                      ? `${baseline.averageUtilization.toFixed(1)}%`
                      : "—",
                    scenario: results
                      ? `${results.averageUtilization.toFixed(1)}%`
                      : "Run simulation",
                  },
                  {
                    label: "Issue Resolution Rate",
                    current: baseline
                      ? `${baseline.issueResolutionRate.toFixed(1)}%`
                      : "—",
                    scenario: results
                      ? `${results.issueResolutionRate.toFixed(1)}%`
                      : "Run simulation",
                  },
                  {
                    label: "Service Health",
                    current: baseline
                      ? `${baseline.serviceHealth.toFixed(1)}%`
                      : "—",
                    scenario: results
                      ? `${results.serviceHealth.toFixed(1)}%`
                      : "Run simulation",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-3 border-b border-white/10 last:border-b-0"
                  >
                    <div className="p-5 text-sm text-white">
                      {row.label}
                    </div>

                    <div className="border-l border-white/10 p-5 text-sm text-slate-400">
                      {row.current}
                    </div>

                    <div className="border-l border-white/10 p-5 text-sm font-semibold text-cyan-400">
                      {row.scenario}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {results && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      Simulation Results
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Projected impact of the selected planning assumptions
                      against the current live baseline.
                    </p>
                  </div>

                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Simulation Complete
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <ResultCard
                    icon={TrendingUp}
                    label="Operational Rate"
                    value={`${results.operationalRate.toFixed(1)}%`}
                    change={Number(
                      results.operationalRateChange.toFixed(1)
                    )}
                    positive={results.operationalRateChange >= 0}
                  />

                  <ResultCard
                    icon={Activity}
                    label="Average Utilization"
                    value={`${results.averageUtilization.toFixed(1)}%`}
                    change={Number(
                      results.utilizationChange.toFixed(1)
                    )}
                    positive={results.utilizationChange <= 0}
                  />

                  <ResultCard
                    icon={CheckCircle2}
                    label="Issue Resolution Rate"
                    value={`${results.issueResolutionRate.toFixed(1)}%`}
                    change={Number(
                      results.issueResolutionRateChange.toFixed(1)
                    )}
                    positive={results.issueResolutionRateChange >= 0}
                  />

                  <ResultCard
                    icon={ShieldCheck}
                    label="Service Health"
                    value={`${results.serviceHealth.toFixed(1)}%`}
                    change={Number(
                      results.serviceHealthChange.toFixed(1)
                    )}
                    positive={results.serviceHealthChange >= 0}
                  />
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  <ResultCard
                    icon={DollarSign}
                    label="Estimated Cost"
                    value={formatCurrency(results.estimatedCost)}
                  />

                  <ResultCard
                    icon={TrendingUp}
                    label="Projected ROI"
                    value={`${results.roi.toFixed(1)}%`}
                  />

                  <ResultCard
                    icon={Building2}
                    label="Infrastructure Assets"
                    value={results.infrastructure}
                    change={
                      results.infrastructure - baseline.infrastructure
                    }
                  />
                </div>
              </section>
            )}

            <section>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Digital Twin Preview
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Visual representation of scenario-driven infrastructure
                    expansion.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Existing
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Planned
                  </span>
                </div>
              </div>

              <div className="relative h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-950/20 via-slate-950 to-indigo-950/20">
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

                <div className="absolute left-0 top-[45%] h-[3px] w-full rotate-[-8deg] bg-cyan-400/20" />
                <div className="absolute left-[25%] top-0 h-full w-[3px] rotate-[12deg] bg-cyan-400/20" />

                {!digitalTwinData.hasCoordinates ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-md text-center">
                      <MapPin size={32} className="mx-auto text-slate-600" />
                      <h3 className="mt-4 text-lg font-semibold text-white">
                        No Mapped Records Available
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        Add infrastructure or citizen issues with valid
                        latitude and longitude values to populate the Digital
                        Twin from live city data. Records with missing, invalid,
                        or 0,0 coordinates are intentionally not plotted.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {digitalTwinData.markers.map((marker, markerIndex) => {
                      const isCluster = marker.records.length > 1;
                      const hasIssue = marker.records.some(
                        (record) => record._twinType === "issue"
                      );
                      const primaryRecord =
                        marker.records.find(
                          (record) => record._twinType === "infrastructure"
                        ) || marker.records[0];

                      return (
                        <div
                          key={`twin-marker-${markerIndex}`}
                          className="group absolute z-30 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${marker.left}%`,
                            top: `${marker.top}%`,
                          }}
                        >
                          <div
                            className={`relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm ${
                              hasIssue
                                ? "border-red-300/70 bg-red-500/20 text-red-300 shadow-[0_0_24px_rgba(239,68,68,.5)]"
                                : "border-cyan-300/70 bg-cyan-400/20 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.55)]"
                            }`}
                          >
                            {hasIssue ? (
                              <AlertTriangle size={16} />
                            ) : (
                              <Building2 size={17} />
                            )}

                            {isCluster && (
                              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 bg-slate-900 px-1 text-[10px] font-bold text-white shadow-lg">
                                {marker.records.length}
                              </span>
                            )}
                          </div>

                          <div
                            className={`pointer-events-none absolute z-[80] hidden w-64 rounded-xl border border-white/10 bg-slate-950/95 p-3 text-left shadow-2xl backdrop-blur-md group-hover:block ${
                              marker.top < 30
                                ? "top-full mt-3"
                                : "bottom-full mb-3"
                            } ${
                              marker.left < 30
                                ? "left-0"
                                : marker.left > 70
                                  ? "right-0"
                                  : "left-1/2 -translate-x-1/2"
                            }`}
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {isCluster
                                ? `${marker.records.length} live records at this location`
                                : primaryRecord._twinType === "issue"
                                  ? "Live Citizen Issue"
                                  : "Live Infrastructure"}
                            </p>

                            <div className="mt-2 space-y-2">
                              {marker.records.map((record) => (
                                <div
                                  key={`${record._twinType}-${record._id}`}
                                  className="rounded-lg border border-white/5 bg-white/[0.03] p-2"
                                >
                                  <p className="truncate text-sm font-semibold text-white">
                                    {record.name || record.title}
                                  </p>

                                  <p
                                    className={`mt-1 text-xs ${
                                      record._twinType === "issue"
                                        ? "text-red-400"
                                        : "text-cyan-400"
                                    }`}
                                  >
                                    {record._twinType === "issue"
                                      ? record.priority || "Issue"
                                      : record.type || "Infrastructure"}
                                  </p>

                                  {record._twinType === "infrastructure" && (
                                    <p className="mt-1 text-xs text-slate-400">
                                      {record.sector || "Sector not specified"}
                                    </p>
                                  )}

                                  {record._twinType === "issue" && (
                                    <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                                      {record.description || "Citizen issue"}
                                    </p>
                                  )}

                                  <p className="mt-1 text-xs text-slate-500">
                                    {Number(record.latitude).toFixed(5)},{" "}
                                    {Number(record.longitude).toFixed(5)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="absolute bottom-5 left-5 z-40 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                            <Building2 size={11} />
                          </span>
                          Live Infrastructure ({digitalTwinData.infrastructure.length})
                        </span>

                        <span className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                            <AlertTriangle size={11} />
                          </span>
                          Live Issues ({digitalTwinData.issues.length})
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-white/[0.04] lg:text-8xl">
                      DIGITAL TWIN
                    </p>

                    {results && (
                      <p className="mt-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400/40">
                        Scenario Projection
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Scenario Forecast
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Projected changes calculated from the live baseline and the
                  selected scenario assumptions.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-4">
                <ResultCard
                  icon={TrendingUp}
                  label="Operational Rate Impact"
                  value={
                    results
                      ? `${
                          forecast.operationalRate >= 0 ? "+" : ""
                        }${forecast.operationalRate.toFixed(1)}%`
                      : "—"
                  }
                />

                <ResultCard
                  icon={Activity}
                  label="Utilization Impact"
                  value={
                    results
                      ? `${
                          forecast.utilization > 0 ? "+" : ""
                        }${forecast.utilization.toFixed(1)}%`
                      : "—"
                  }
                />

                <ResultCard
                  icon={CheckCircle2}
                  label="Resolution Impact"
                  value={
                    results
                      ? `${
                          forecast.issueResolutionRate >= 0 ? "+" : ""
                        }${forecast.issueResolutionRate.toFixed(1)}%`
                      : "—"
                  }
                />

                <ResultCard
                  icon={DollarSign}
                  label="ROI"
                  value={
                    results ? `${forecast.roi.toFixed(1)}%` : "—"
                  }
                />
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Implementation Timeline
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Suggested execution roadmap for the selected scenario.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {(
                  results?.timeline || [
                    {
                      year: scenario.targetYear,
                      title: "Planning & Review",
                      description:
                        "Planning stage for the selected scenario.",
                      icon: Target,
                    },
                  ]
                ).map((item, index) => {
                  const Icon = item.icon || CheckCircle2;

                  return (
                    <div
                      key={`${item.year}-${index}`}
                      className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400">{item.year}</span>
                        <Icon size={20} className="text-slate-500" />
                      </div>

                      <h3 className="mt-5 font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-cyan-400">
                    Scenario Recommendation
                  </p>

                  <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                    {results
                      ? results.recommendation
                      : "Run a simulation to generate a planning recommendation."}
                  </h2>

                  <p className="mt-5 max-w-3xl leading-relaxed text-slate-400">
                    {results
                      ? results.recommendationReason
                      : "UrbanMind will evaluate the selected assumptions against live infrastructure utilization, operational performance and citizen-issue resolution indicators."}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-6">
                    <span className="text-emerald-400">
                      Confidence{" "}
                      {results
                        ? `${results.confidence.toFixed(0)}%`
                        : "—"}
                    </span>

                    <span className="text-cyan-400">
                      {results
                        ? results.roi >= 100
                          ? "High ROI"
                          : results.roi >= 50
                            ? "Moderate ROI"
                            : "Low ROI"
                        : "Awaiting simulation"}
                    </span>
                  </div>
                </div>

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Target size={28} />
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Risk Analysis
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Risk levels are estimated from the selected scenario
                  configuration and live baseline indicators.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-4">
                {[
                  {
                    key: "budget",
                    label: "Budget Risk",
                    icon: AlertTriangle,
                  },
                  {
                    key: "environmental",
                    label: "Environmental Risk",
                    icon: ShieldCheck,
                  },
                  {
                    key: "traffic",
                    label: "Utilization Risk",
                    icon: Activity,
                  },
                  {
                    key: "implementation",
                    label: "Implementation Risk",
                    icon: AlertTriangle,
                  },
                ].map((item) => {
                  const risk = results?.risks?.[item.key] || "Pending";
                  const Icon = item.icon;

                  const riskClass =
                    risk === "Low"
                      ? "text-emerald-400"
                      : risk === "Medium"
                        ? "text-amber-400"
                        : risk === "High"
                          ? "text-red-400"
                          : "text-slate-500";

                  return (
                    <div
                      key={item.key}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      <Icon className={riskClass} />

                      <h3 className="mt-4 font-semibold text-white">
                        {item.label}
                      </h3>

                      <p className={`mt-2 font-medium ${riskClass}`}>
                        {risk}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <div className="flex items-center gap-3">
                  <BarChart3 size={22} className="text-cyan-400" />

                  <h2 className="text-2xl font-semibold text-white">
                    Planning Summary
                  </h2>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Population Growth Assumption
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      +{scenario.populationGrowth}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Housing Expansion Assumption
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {scenario.housingExpansion}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Green Investment Assumption
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {scenario.greenInvestment}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Target Year</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {scenario.targetYear}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 border-t border-white/10 pt-8 md:grid-cols-2 xl:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <Hospital size={20} className="text-emerald-400" />
                    <div>
                      <p className="text-xs text-slate-500">Hospitals</p>
                      <p className="font-semibold text-white">
                        +{scenario.newHospitals}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <School size={20} className="text-yellow-400" />
                    <div>
                      <p className="text-xs text-slate-500">Schools</p>
                      <p className="font-semibold text-white">
                        +{scenario.newSchools}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Train size={20} className="text-cyan-400" />
                    <div>
                      <p className="text-xs text-slate-500">Metro</p>
                      <p className="font-semibold text-white">
                        +{scenario.metroExpansion} km
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Route size={20} className="text-purple-400" />
                    <div>
                      <p className="text-xs text-slate-500">Roads</p>
                      <p className="font-semibold text-white">
                        +{scenario.roadExpansion}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
