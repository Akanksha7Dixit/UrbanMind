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
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import { useEffect, useMemo, useState } from "react";


// =====================================================
// CONSTANTS
// =====================================================

const STORAGE_KEY =
  "urbanmind-scenarios";

const BASELINE = {
  population: 1.8,
  coverage: 91,
  traffic: 68,
  aqi: 67,
  healthScore: 84,
  infrastructure: 128,
};


// =====================================================
// HELPERS
// =====================================================

const clamp = (
  value,
  min,
  max
) => {
  return Math.min(
    Math.max(value, min),
    max
  );
};


const generateId = () => {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
};

const formatCurrency = (
  value
) => {
  if (value >= 1000) {
    return `₹${(
      value / 1000
    ).toFixed(2)}K Cr`;
  }
  return `₹${Math.round(
    value
  )} Cr`;
};


// =====================================================
// DEFAULT SCENARIO
// =====================================================

const createDefaultScenario = () => ({
  id: generateId(),
  name: "Urban Expansion 2030",
  description:
    "Long-term infrastructure investment plan focused on healthcare, transport and sustainable development.",

  targetYear: 2030,
  populationGrowth: 18,
  housingExpansion: 45,
  greenInvestment: 72,
  infrastructureBudget: 180,
  newHospitals: 2,
  newSchools: 5,
  metroExpansion: 15,
  roadExpansion: 10,
  status: "Draft",
  createdAt:
    new Date().toISOString(),
  simulatedAt: null,
  results: null,
});

// =====================================================
// SCENARIO CARD
// =====================================================

function ScenarioCard({
  scenario,
  active,
  onSelect,
  onDelete,
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-4
        transition
        ${active
          ? "border-cyan-500/40 bg-cyan-500/10"
          : "border-white/10 bg-white/[0.03]"
        }
      `}
    >
      <button
        type="button"
        onClick={onSelect}
        className="
          w-full
          text-left
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div>

            <h3
              className="
                font-semibold
                text-white
              "
            >
              {scenario.name}
            </h3>

            <p
              className="
                mt-1
                line-clamp-2
                text-xs
                text-slate-500
              "
            >
              {scenario.description}
            </p>

          </div>

          <span
            className={`
              rounded-full
              px-2
              py-1
              text-[10px]
              font-medium

              ${scenario.status ===
                "Simulated"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-amber-500/10 text-amber-400"
              }
            `}
          >
            {scenario.status}
          </span>

        </div>

        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-3
          "
        >

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Year
            </p>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-white
              "
            >
              {scenario.targetYear}
            </p>
          </div>

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Budget
            </p>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-white
              "
            >
              ₹{scenario.infrastructureBudget} Cr
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
        className="
          mt-3
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
          transition
          hover:text-red-400
        "
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
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        p-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <p
          className="
            text-sm
            text-slate-400
          "
        >
          {label}
        </p>

        <span
          className="
            rounded-lg
            bg-cyan-500/10
            px-2
            py-1
            text-sm
            font-semibold
            text-cyan-400
          "
        >
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
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="
          mt-5
          w-full
          accent-cyan-500
        "
      />

      <div
        className="
          mt-2
          flex
          justify-between
          text-[10px]
          text-slate-600
        "
      >
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
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        p-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <p
          className="
            text-sm
            text-slate-400
          "
        >
          {label}
        </p>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >

          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(event) =>
              onChange(
                clamp(
                  Number(
                    event.target.value
                  ) || 0,
                  min,
                  max
                )
              )
            }
            className="
              w-20
              rounded-lg
              border
              border-white/10
              bg-slate-900
              px-2
              py-1
              text-right
              text-sm
              text-white
              outline-none
              focus:border-cyan-500
            "
          />

          {suffix && (
            <span
              className="
                text-sm
                text-slate-500
              "
            >
              {suffix}
            </span>
          )}

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
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <Icon
          size={20}
          className="text-cyan-400"
        />

        {change !== undefined && (
          <span
            className={`
              text-xs
              font-medium

              ${positive
                ? "text-emerald-400"
                : "text-red-400"
              }
            `}
          >
            {change > 0
              ? "+"
              : ""}
            {change}
          </span>
        )}

      </div>

      <p
        className="
          mt-5
          text-sm
          text-slate-400
        "
      >
        {label}
      </p>

      <h3
        className="
          mt-2
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h3>

    </div>
  );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ScenarioBuilder() {

  // ===================================================
  // STATE
  // ===================================================

  const [
    scenario,
    setScenario,
  ] = useState(
    createDefaultScenario()
  );

  const [
    scenarios,
    setScenarios,
  ] = useState([]);

  const [
    showCreatePanel,
    setShowCreatePanel,
  ] = useState(true);

  const [
    simulationRunning,
    setSimulationRunning,
  ] = useState(false);

  const [
    notification,
    setNotification,
  ] = useState("");

  // ===================================================
  // LOAD SAVED SCENARIOS
  // ===================================================
  useEffect(() => {
    const loadScenarios = async () => {
      try {
        const response = await axiosInstance.get("/scenarios");

        console.log("Scenarios from backend:", response.data);

        if (response.data.success) {
          setScenarios(response.data.scenarios || []);
        } else {
          setScenarios(response.data || []);
        }

      } catch (error) {
        console.error(
          "Unable to load scenarios:",
          error
        );

        setNotification(
          "Unable to load scenarios from server."
        );
      }
    };

    loadScenarios();
  }, []);


  // ===================================================
  // SAVE SCENARIOS TO LOCAL STORAGE
  // ===================================================



  // ===================================================
  // NOTIFICATION
  // ===================================================

  useEffect(() => {

    if (!notification) {
      return;
    }

    const timer =
      setTimeout(() => {
        setNotification("");
      }, 3000);

    return () =>
      clearTimeout(timer);

  }, [notification]);


  // ===================================================
  // UPDATE SCENARIO
  // ===================================================

  const updateScenario = (
    field,
    value
  ) => {

    setScenario(
      (previous) => ({
        ...previous,
        [field]: value,
        status: "Draft",
        results: null,
      })
    );

  };


  // ===================================================
  // CREATE NEW SCENARIO
  // ===================================================

  const createNewScenario = () => {

    const newScenario =
      createDefaultScenario();

    newScenario.name =
      "New Urban Scenario";

    newScenario.description =
      "Create a new urban development scenario and evaluate its future impact.";

    setScenario(
      newScenario
    );

    setShowCreatePanel(
      true
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ===================================================
  // RUN SIMULATION
  // ===================================================

  const runSimulation = async () => {

    setSimulationRunning(
      true
    );

    setNotification(
      "Urban simulation is running..."
    );


    setTimeout(async() => {

      const populationGrowth =
        scenario.populationGrowth;

      const housingExpansion =
        scenario.housingExpansion;

      const greenInvestment =
        scenario.greenInvestment;

      const newHospitals =
        scenario.newHospitals;

      const newSchools =
        scenario.newSchools;

      const metroExpansion =
        scenario.metroExpansion;

      const roadExpansion =
        scenario.roadExpansion;

      const budget =
        scenario.infrastructureBudget;


      // -----------------------------------------------
      // COVERAGE
      // -----------------------------------------------

      const coverageIncrease =
        (
          populationGrowth * 0.12
        ) +
        (
          newHospitals * 1.8
        ) +
        (
          newSchools * 0.8
        ) +
        (
          metroExpansion * 0.12
        ) +
        (
          roadExpansion * 0.15
        );

      const coverage =
        clamp(
          BASELINE.coverage +
          coverageIncrease,
          0,
          100
        );


      // -----------------------------------------------
      // TRAFFIC
      // -----------------------------------------------

      const trafficReduction =
        (
          metroExpansion * 0.35
        ) +
        (
          roadExpansion * 0.2
        ) +
        (
          greenInvestment * 0.04
        );

      const traffic =
        clamp(
          BASELINE.traffic -
          trafficReduction +
          populationGrowth * 0.18,
          0,
          100
        );


      // -----------------------------------------------
      // AQI
      // -----------------------------------------------

      const aqiChange =
        (
          greenInvestment * 0.08
        ) +
        (
          metroExpansion * 0.04
        ) -
        (
          populationGrowth * 0.06
        ) -
        (
          housingExpansion * 0.02
        );

      const aqi =
        clamp(
          BASELINE.aqi -
          aqiChange,
          20,
          200
        );


      // -----------------------------------------------
      // HEALTH SCORE
      // -----------------------------------------------

      const healthScore =
        clamp(
          BASELINE.healthScore +
          (
            coverage -
            BASELINE.coverage
          ) * 0.35 +
          (
            BASELINE.traffic -
            traffic
          ) * 0.18 +
          (
            BASELINE.aqi -
            aqi
          ) * 0.12,
          0,
          100
        );


      // -----------------------------------------------
      // POPULATION
      // -----------------------------------------------

      const population =
        BASELINE.population *
        (
          1 +
          populationGrowth / 100
        );


      // -----------------------------------------------
      // INFRASTRUCTURE
      // -----------------------------------------------

      const infrastructure =
        BASELINE.infrastructure +
        newHospitals +
        newSchools +
        Math.round(
          metroExpansion * 0.8
        ) +
        Math.round(
          roadExpansion * 0.7
        );


      // -----------------------------------------------
      // ROI
      // -----------------------------------------------

      const estimatedBenefit =
        (
          coverageIncrease * 12
        ) +
        (
          trafficReduction * 8
        ) +
        (
          greenInvestment * 1.5
        );

      const roi =
        budget > 0
          ? (
            estimatedBenefit /
            budget
          ) * 100
          : 0;


      // -----------------------------------------------
      // RISK
      // -----------------------------------------------

      const budgetRisk =
        budget > 300
          ? "High"
          : budget > 180
            ? "Medium"
            : "Low";


      const environmentalRisk =
        greenInvestment >= 60
          ? "Low"
          : populationGrowth > 20
            ? "High"
            : "Medium";


      const trafficRisk =
        traffic > 70
          ? "High"
          : traffic > 55
            ? "Medium"
            : "Low";


      const implementationRisk =
        populationGrowth > 25 ||
          budget > 350
          ? "High"
          : populationGrowth > 15 ||
            budget > 200
            ? "Medium"
            : "Low";


      // -----------------------------------------------
      // RECOMMENDATION
      // -----------------------------------------------

      let recommendation =
        "Maintain balanced investment across core urban infrastructure.";

      let recommendationReason =
        "The current scenario provides a balanced combination of growth, infrastructure and sustainability.";

      if (
        coverage <
        BASELINE.coverage + 5
      ) {

        recommendation =
          "Prioritize healthcare and education infrastructure.";

        recommendationReason =
          "The projected population growth is likely to create additional demand for essential public services.";

      } else if (
        traffic >
        BASELINE.traffic
      ) {

        recommendation =
          "Increase public transport and road capacity.";

        recommendationReason =
          "Population growth is creating additional mobility pressure under the current infrastructure plan.";

      } else if (
        aqi >
        BASELINE.aqi
      ) {

        recommendation =
          "Increase green investment before expansion.";

        recommendationReason =
          "The scenario may increase environmental pressure without additional sustainability investment.";

      } else if (
        greenInvestment >= 60
      ) {

        recommendation =
          "Prioritize the green mobility corridor.";

        recommendationReason =
          "Strong sustainability investment is expected to improve environmental performance and urban resilience.";

      } else if (
        newHospitals >= 2
      ) {

        recommendation =
          "Expand healthcare capacity in high-growth sectors.";

        recommendationReason =
          "Additional healthcare capacity can help absorb projected population growth.";

      }


      // -----------------------------------------------
      // TIMELINE
      // -----------------------------------------------

      const startYear =
        Math.max(
          2026,
          scenario.targetYear - 4
        );

      const timeline = [
        {
          year: startYear,
          title:
            "Planning & Approvals",
          description:
            "Feasibility studies, land assessment and project approvals.",
          icon: Target,
        },
        {
          year:
            startYear + 1,
          title:
            "Core Infrastructure",
          description:
            "Begin roads, utilities and primary public infrastructure.",
          icon: Route,
        },
        {
          year:
            startYear + 2,
          title:
            "Healthcare & Education",
          description:
            `${newHospitals} hospitals and ${newSchools} schools planned.`,
          icon: Hospital,
        },
        {
          year:
            startYear + 3,
          title:
            "Mobility Expansion",
          description:
            `${metroExpansion} km metro and ${roadExpansion}% road expansion.`,
          icon: Train,
        },
      ];


      // -----------------------------------------------
      // RESULTS
      // -----------------------------------------------

      const results = {

        population,

        coverage,

        traffic,

        aqi,

        healthScore,

        infrastructure,

        coverageChange:
          coverage -
          BASELINE.coverage,

        trafficChange:
          traffic -
          BASELINE.traffic,

        aqiChange:
          aqi -
          BASELINE.aqi,

        healthScoreChange:
          healthScore -
          BASELINE.healthScore,

        infrastructureChange:
          infrastructure -
          BASELINE.infrastructure,

        roi,

        estimatedCost:
          budget,

        risks: {
          budget: budgetRisk,
          environmental:
            environmentalRisk,
          traffic: trafficRisk,
          implementation:
            implementationRisk,
        },

        recommendation,

        recommendationReason,

        timeline,

        confidence:
          clamp(
            76 +
            greenInvestment * 0.08 +
            Math.min(
              newHospitals * 2,
              8
            ),
            70,
            96
          ),

        generatedAt:
          new Date().toISOString(),
      };


      const updatedScenario = {

        ...scenario,

        status: "Simulated",

        simulatedAt:
          new Date().toISOString(),

        results,

      };


      setScenario(
        updatedScenario
      );


      // Update saved scenario
      // Save simulation results to MongoDB
      if (scenario._id) {
        try {
          await axiosInstance.put(
            `/scenarios/${scenario._id}`,
            {
              ...scenario,
              status: "Simulated",
              simulatedAt: new Date().toISOString(),
              simulationResults: results,
            }
          );

          const listResponse =
            await axiosInstance.get("/scenarios");

          if (listResponse.data.success) {
            setScenarios(
              listResponse.data.scenarios || []
            );
          }

        } catch (error) {
          console.error(
            "Unable to save simulation results:",
            error
          );

          setNotification(
            "Simulation completed, but results could not be saved."
          );
        }
      }


      setSimulationRunning(
        false
      );

      setNotification(
        "Simulation completed successfully."
      );


      setTimeout(() => {

        const resultElement =
          document.getElementById(
            "simulation-results"
          );

        if (resultElement) {

          resultElement.scrollIntoView(
            {
              behavior: "smooth",
              block: "start",
            }
          );

        }

      }, 100);

    }, 900);
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
        status: scenario.results
          ? "Simulated"
          : "Draft",
        simulatedAt: scenario.simulatedAt,
        simulationResults: scenario.results,
      };

      let response;

      // Existing MongoDB scenario
      if (scenario._id) {
        response = await axiosInstance.put(
          `/scenarios/${scenario._id}`,
          scenarioToSave
        );
      }

      // New scenario
      else {
        response = await axiosInstance.post(
          "/scenarios",
          scenarioToSave
        );
      }

      console.log(
        "Saved scenario:",
        response.data
      );

      const savedScenario =
        response.data.scenario;

      setScenario(savedScenario);

      // Refresh list from MongoDB
      const listResponse =
        await axiosInstance.get(
          "/scenarios"
        );

      if (listResponse.data.success) {
        setScenarios(
          listResponse.data.scenarios || []
        );
      }

      setNotification(
        "Scenario saved successfully."
      );

    } catch (error) {

      console.error(
        "Unable to save scenario:",
        error
      );

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
      await axiosInstance.delete(
        `/scenarios/${id}`
      );

      setScenarios((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      if (scenario._id === id) {
        setScenario(
          createDefaultScenario()
        );
      }

      setNotification(
        "Scenario deleted."
      );

    } catch (error) {

      console.error(
        "Unable to delete scenario:",
        error
      );

      setNotification(
        error.response?.data?.message ||
        "Unable to delete scenario."
      );
    }
  };


  // ===================================================
  // EXPORT SCENARIO
  // ===================================================

  const exportScenario = () => {

    const blob =
      new Blob(
        [
          JSON.stringify(
            scenario,
            null,
            2
          ),
        ],
        {
          type:
            "application/json",
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `${scenario.name
        .replace(/\s+/g, "-")
        .toLowerCase()}-scenario.json`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );


    setNotification(
      "Scenario exported."
    );

  };


  // ===================================================
  // RESET
  // ===================================================

  const resetScenario = () => {

    const reset =
      createDefaultScenario();

    reset.name =
      scenario.name;

    reset.description =
      scenario.description;

    reset.targetYear =
      scenario.targetYear;

    setScenario(
      reset
    );

    setNotification(
      "Scenario reset."
    );

  };


  // ===================================================
  // RESULTS
  // ===================================================

  const results =
    scenario.results;


  // ===================================================
  // FORECAST DATA
  // ===================================================

  const forecast =
    useMemo(() => {

      if (!results) {

        return {
          coverage: 0,
          traffic: 0,
          aqi: 0,
          roi: 0,
        };

      }

      return {
        coverage:
          results.coverageChange,

        traffic:
          results.trafficChange,

        aqi:
          results.aqiChange,

        roi:
          results.roi,
      };

    }, [results]);


  // ===================================================
  // DIGITAL TWIN BUILDINGS
  // ===================================================

  const buildings =
    useMemo(() => {

      const count =
        results
          ? Math.min(
            18,
            8 +
            Math.round(
              scenario.housingExpansion /
              10
            )
          )
          : 8;

      return Array.from(
        {
          length: count,
        },
        (_, index) => {

          const columns =
            6;

          const row =
            Math.floor(
              index /
              columns
            );

          const column =
            index %
            columns;

          return {
            id: index,

            left:
              10 +
              column * 14,

            top:
              12 +
              row * 18,

            height:
              25 +
              (
                index *
                13
              ) %
              70,

            width:
              7 +
              (
                index *
                7
              ) %
              7,
          };

        }
      );

    }, [
      results,
      scenario.housingExpansion,
    ]);


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <div
      className="
        space-y-10
        p-8
        pb-20
      "
    >

      {/* =================================================
          NOTIFICATION
      ================================================= */}

      {notification && (

        <div
          className="
            fixed
            right-6
            top-6
            z-[2000]
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-cyan-500/30
            bg-slate-950/95
            px-5
            py-3
            text-sm
            text-white
            shadow-2xl
            backdrop-blur-xl
          "
        >

          <CheckCircle2
            size={18}
            className="
              text-cyan-400
            "
          />

          {notification}

        </div>

      )}


      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-end
          xl:justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-cyan-400
            "
          >
            Urban Simulation
          </p>


          <h1
            className="
              mt-3
              text-4xl
              font-bold
              text-white
            "
          >
            Scenario Builder
          </h1>


          <p
            className="
              mt-2
              max-w-3xl
              text-slate-400
            "
          >
            Create, simulate and compare
            future urban development
            strategies before making
            real-world planning decisions.
          </p>

        </div>


        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          <button
            type="button"
            onClick={
              createNewScenario
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-2.5
              text-sm
              text-white
              transition
              hover:bg-white/5
            "
          >

            <Plus size={17} />

            New Scenario

          </button>


          <button
            type="button"
            onClick={
              saveScenario
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-cyan-500/30
              bg-cyan-500/10
              px-4
              py-2.5
              text-sm
              text-cyan-400
              transition
              hover:bg-cyan-500/20
            "
          >

            <Save size={17} />

            Save

          </button>


          <button
            type="button"
            onClick={
              exportScenario
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-2.5
              text-sm
              text-slate-300
              transition
              hover:bg-white/5
            "
          >

            <Download size={17} />

            Export

          </button>

        </div>

      </div>


      {/* =================================================
          WORKSPACE
      ================================================= */}

      <div
        className="
          grid
          gap-8
          xl:grid-cols-[300px_minmax(0,1fr)]
        "
      >

        {/* =================================================
            SAVED SCENARIOS
        ================================================= */}

        <aside
          className="
            h-fit
            rounded-3xl
            border
            border-white/10
            bg-white/[0.02]
            p-5
            xl:sticky
            xl:top-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-slate-500
                "
              >
                Workspace
              </p>

              <h2
                className="
                  mt-2
                  text-lg
                  font-semibold
                  text-white
                "
              >
                My Scenarios
              </h2>

            </div>


            <button
              type="button"
              onClick={
                createNewScenario
              }
              className="
                rounded-lg
                bg-cyan-500/10
                p-2
                text-cyan-400
                hover:bg-cyan-500/20
              "
            >

              <Plus size={17} />

            </button>

          </div>


          <div
            className="
              mt-5
              space-y-3
            "
          >

            {scenarios.length ===
              0 ? (

              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-white/10
                  p-5
                  text-center
                "
              >

                <BarChart3
                  size={24}
                  className="
                    mx-auto
                    text-slate-600
                  "
                />

                <p
                  className="
                    mt-3
                    text-sm
                    text-slate-500
                  "
                >
                  No saved scenarios yet.
                </p>

              </div>

            ) : (

              scenarios.map(
                (item) => (

                  <ScenarioCard
                    key={
                      item._id
                    }
                    scenario={
                      item
                    }
                    active={
                      item._id ===
                      scenario._id
                    }
                    onSelect={() =>
                      loadScenario(
                        item
                      )
                    }
                    onDelete={() =>
                      deleteScenario(
                        item._id
                      )
                    }
                  />

                )
              )

            )}

          </div>

        </aside>


        {/* =================================================
            MAIN BUILDER
        ================================================= */}

        <main
          className="
            min-w-0
            space-y-10
          "
        >

          {/* =================================================
              SCENARIO HERO
          ================================================= */}

          <section
            className="
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-r
              from-cyan-950/30
              via-slate-950
              to-indigo-950/30
              p-8
              lg:p-10
            "
          >

            <div
              className="
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              <div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      rounded-full
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-cyan-400
                    "
                  >
                    {scenario.status}
                  </span>


                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      text-slate-500
                    "
                  >

                    <Clock size={13} />

                    Target:
                    {" "}
                    {scenario.targetYear}

                  </span>

                </div>


                <h2
                  className="
                    mt-5
                    text-4xl
                    font-bold
                    text-white
                    lg:text-5xl
                  "
                >
                  {scenario.name}
                </h2>


                <p
                  className="
                    mt-4
                    max-w-3xl
                    leading-relaxed
                    text-slate-400
                  "
                >
                  {scenario.description}
                </p>

              </div>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  lg:min-w-[420px]
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Population
                  </p>

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    {results
                      ? results.population.toFixed(
                        2
                      )
                      : BASELINE.population}
                    M
                  </h3>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Investment
                  </p>

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    ₹
                    {
                      scenario.infrastructureBudget
                    }
                    Cr
                  </h3>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Coverage
                  </p>

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    {results
                      ? `${results.coverage.toFixed(
                        1
                      )}%`
                      : `${BASELINE.coverage}%`}
                  </h3>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    ROI
                  </p>

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    {results
                      ? `${results.roi.toFixed(
                        1
                      )}%`
                      : "—"}
                  </h3>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              CONFIGURATION
          ================================================= */}

          {showCreatePanel && (

            <section>

              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                      text-white
                    "
                  >
                    Scenario Configuration
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                    "
                  >
                    Adjust planning assumptions
                    and run a simulated future.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setShowCreatePanel(
                      false
                    )
                  }
                  className="
                    rounded-lg
                    p-2
                    text-slate-500
                    hover:bg-white/5
                    hover:text-white
                  "
                >

                  <X size={18} />

                </button>

              </div>


              {/* BASIC DETAILS */}

              <div
                className="
                  mb-6
                  grid
                  gap-6
                  lg:grid-cols-3
                "
              >

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    lg:col-span-2
                  "
                >

                  <label
                    className="
                      text-sm
                      text-slate-400
                    "
                  >
                    Scenario Name
                  </label>


                  <input
                    type="text"
                    value={
                      scenario.name
                    }
                    onChange={(event) =>
                      updateScenario(
                        "name",
                        event.target.value
                      )
                    }
                    className="
                      mt-3
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-cyan-500
                    "
                  />

                </div>


                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                  "
                >

                  <label
                    className="
                      text-sm
                      text-slate-400
                    "
                  >
                    Target Year
                  </label>


                  <input
                    type="number"
                    min="2026"
                    max="2050"
                    value={
                      scenario.targetYear
                    }
                    onChange={(event) =>
                      updateScenario(
                        "targetYear",
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="
                      mt-3
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-cyan-500
                    "
                  />

                </div>


                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    lg:col-span-3
                  "
                >

                  <label
                    className="
                      text-sm
                      text-slate-400
                    "
                  >
                    Scenario Description
                  </label>


                  <textarea
                    value={
                      scenario.description
                    }
                    onChange={(event) =>
                      updateScenario(
                        "description",
                        event.target.value
                      )
                    }
                    rows="3"
                    className="
                      mt-3
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-cyan-500
                    "
                  />

                </div>

              </div>


              {/* GROWTH PARAMETERS */}

              <div
                className="
                  grid
                  gap-5
                  lg:grid-cols-2
                "
              >

                <SliderField
                  label="Population Growth"
                  value={
                    scenario.populationGrowth
                  }
                  min={0}
                  max={50}
                  onChange={(value) =>
                    updateScenario(
                      "populationGrowth",
                      value
                    )
                  }
                />


                <SliderField
                  label="Housing Expansion"
                  value={
                    scenario.housingExpansion
                  }
                  min={0}
                  max={100}
                  onChange={(value) =>
                    updateScenario(
                      "housingExpansion",
                      value
                    )
                  }
                />


                <SliderField
                  label="Green Investment"
                  value={
                    scenario.greenInvestment
                  }
                  min={0}
                  max={100}
                  onChange={(value) =>
                    updateScenario(
                      "greenInvestment",
                      value
                    )
                  }
                />


                <SliderField
                  label="Infrastructure Budget"
                  value={
                    scenario.infrastructureBudget
                  }
                  min={50}
                  max={500}
                  suffix=" Cr"
                  onChange={(value) =>
                    updateScenario(
                      "infrastructureBudget",
                      value
                    )
                  }
                />

              </div>


              {/* INFRASTRUCTURE PARAMETERS */}

              <div
                className="
                  mt-5
                  grid
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-4
                "
              >

                <NumberField
                  label="New Hospitals"
                  value={
                    scenario.newHospitals
                  }
                  max={20}
                  onChange={(value) =>
                    updateScenario(
                      "newHospitals",
                      value
                    )
                  }
                />


                <NumberField
                  label="New Schools"
                  value={
                    scenario.newSchools
                  }
                  max={30}
                  onChange={(value) =>
                    updateScenario(
                      "newSchools",
                      value
                    )
                  }
                />


                <NumberField
                  label="Metro Expansion"
                  value={
                    scenario.metroExpansion
                  }
                  max={100}
                  suffix=" km"
                  onChange={(value) =>
                    updateScenario(
                      "metroExpansion",
                      value
                    )
                  }
                />


                <NumberField
                  label="Road Expansion"
                  value={
                    scenario.roadExpansion
                  }
                  max={100}
                  suffix="%"
                  onChange={(value) =>
                    updateScenario(
                      "roadExpansion",
                      value
                    )
                  }
                />

              </div>


              {/* ACTIONS */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={
                    runSimulation
                  }
                  disabled={
                    simulationRunning
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-cyan-500
                    px-6
                    py-3
                    font-semibold
                    text-slate-950
                    transition
                    hover:bg-cyan-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  <Play size={17} />

                  {simulationRunning
                    ? "Running Simulation..."
                    : "Run Simulation"}

                </button>


                <button
                  type="button"
                  onClick={
                    resetScenario
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-5
                    py-3
                    text-sm
                    text-slate-300
                    transition
                    hover:bg-white/5
                  "
                >

                  <RotateCcw
                    size={16}
                  />

                  Reset

                </button>

              </div>

            </section>

          )}


          {/* =================================================
              CURRENT VS SCENARIO
          ================================================= */}

          <section
            id="simulation-results"
          >

            <div
              className="
                mb-6
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-cyan-400
                "
              >
                Decision Intelligence
              </p>


              <h2
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-white
                "
              >
                Current vs Scenario
              </h2>

            </div>


            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.02]
              "
            >

              <div
                className="
                  grid
                  grid-cols-3
                  border-b
                  border-white/10
                  bg-white/[0.03]
                "
              >

                <div
                  className="
                    p-5
                    text-sm
                    font-medium
                    text-slate-400
                  "
                >
                  Metric
                </div>

                <div
                  className="
                    border-l
                    border-white/10
                    p-5
                    text-sm
                    font-medium
                    text-slate-400
                  "
                >
                  Current
                </div>

                <div
                  className="
                    border-l
                    border-white/10
                    p-5
                    text-sm
                    font-medium
                    text-cyan-400
                  "
                >
                  Scenario
                </div>

              </div>


              {[
                {
                  label:
                    "Population",
                  current:
                    `${BASELINE.population}M`,
                  scenario:
                    results
                      ? `${results.population.toFixed(
                        2
                      )}M`
                      : "Run simulation",
                },

                {
                  label:
                    "Infrastructure Coverage",
                  current:
                    `${BASELINE.coverage}%`,
                  scenario:
                    results
                      ? `${results.coverage.toFixed(
                        1
                      )}%`
                      : "Run simulation",
                },

                {
                  label:
                    "Traffic Congestion",
                  current:
                    `${BASELINE.traffic}%`,
                  scenario:
                    results
                      ? `${results.traffic.toFixed(
                        1
                      )}%`
                      : "Run simulation",
                },

                {
                  label:
                    "AQI",
                  current:
                    BASELINE.aqi,
                  scenario:
                    results
                      ? results.aqi.toFixed(
                        1
                      )
                      : "Run simulation",
                },

                {
                  label:
                    "Urban Health Score",
                  current:
                    BASELINE.healthScore,
                  scenario:
                    results
                      ? results.healthScore.toFixed(
                        1
                      )
                      : "Run simulation",
                },

                {
                  label:
                    "Infrastructure Assets",
                  current:
                    BASELINE.infrastructure,
                  scenario:
                    results
                      ? results.infrastructure
                      : "Run simulation",
                },
              ].map(
                (row) => (

                  <div
                    key={
                      row.label
                    }
                    className="
                      grid
                      grid-cols-3
                      border-b
                      border-white/10
                      last:border-b-0
                    "
                  >

                    <div
                      className="
                        p-5
                        text-sm
                        text-white
                      "
                    >
                      {row.label}
                    </div>


                    <div
                      className="
                        border-l
                        border-white/10
                        p-5
                        text-sm
                        text-slate-400
                      "
                    >
                      {row.current}
                    </div>


                    <div
                      className="
                        border-l
                        border-white/10
                        p-5
                        text-sm
                        font-semibold
                        text-cyan-400
                      "
                    >
                      {row.scenario}
                    </div>

                  </div>

                )
              )}

            </div>

          </section>


          {/* =================================================
              SIMULATION RESULTS
          ================================================= */}

          {results && (

            <section>

              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                      text-white
                    "
                  >
                    Simulation Results
                  </h2>


                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                    "
                  >
                    Projected impact of your
                    selected planning strategy.
                  </p>

                </div>


                <div
                  className="
                    rounded-full
                    bg-emerald-500/10
                    px-3
                    py-1
                    text-xs
                    text-emerald-400
                  "
                >

                  Simulation Complete

                </div>

              </div>


              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-4
                "
              >

                <ResultCard
                  icon={TrendingUp}
                  label="Coverage Impact"
                  value={`${results.coverage.toFixed(
                    1
                  )}%`}
                  change={Number(
                    results.coverageChange.toFixed(
                      1
                    )
                  )}
                  positive={
                    results.coverageChange >=
                    0
                  }
                />


                <ResultCard
                  icon={Activity}
                  label="Traffic Impact"
                  value={`${results.traffic.toFixed(
                    1
                  )}%`}
                  change={Number(
                    results.trafficChange.toFixed(
                      1
                    )
                  )}
                  positive={
                    results.trafficChange <=
                    0
                  }
                />


                <ResultCard
                  icon={Trees}
                  label="Projected AQI"
                  value={results.aqi.toFixed(
                    1
                  )}
                  change={Number(
                    results.aqiChange.toFixed(
                      1
                    )
                  )}
                  positive={
                    results.aqiChange <=
                    0
                  }
                />


                <ResultCard
                  icon={Target}
                  label="Urban Health Score"
                  value={results.healthScore.toFixed(
                    1
                  )}
                  change={Number(
                    results.healthScoreChange.toFixed(
                      1
                    )
                  )}
                  positive={
                    results.healthScoreChange >=
                    0
                  }
                />

              </div>


              {/* BUDGET / ROI */}

              <div
                className="
                  mt-5
                  grid
                  gap-5
                  md:grid-cols-3
                "
              >

                <ResultCard
                  icon={DollarSign}
                  label="Estimated Cost"
                  value={formatCurrency(
                    results.estimatedCost
                  )}
                />


                <ResultCard
                  icon={TrendingUp}
                  label="Projected ROI"
                  value={`${results.roi.toFixed(
                    1
                  )}%`}
                />


                <ResultCard
                  icon={Building2}
                  label="Infrastructure Assets"
                  value={
                    results.infrastructure
                  }
                  change={
                    results.infrastructureChange
                  }
                />

              </div>

            </section>

          )}


          {/* =================================================
              DIGITAL TWIN
          ================================================= */}

          <section>

            <div
              className="
                mb-6
                flex
                flex-col
                gap-3
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  Digital Twin Preview
                </h2>


                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  Visual representation of
                  projected urban expansion.
                </p>

              </div>


              <div
                className="
                  flex
                  items-center
                  gap-4
                  text-xs
                  text-slate-500
                "
              >

                <span
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-cyan-400
                    "
                  />
                  Existing
                </span>


                <span
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-400
                    "
                  />
                  Planned
                </span>

              </div>

            </div>


            <div
              className="
                relative
                h-[500px]
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-cyan-950/20
                via-slate-950
                to-indigo-950/20
              "
            >

              {/* GRID */}

              <div
                className="
                  absolute
                  inset-0
                  opacity-20
                "
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(255,255,255,.05)
                      1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      90deg,
                      rgba(255,255,255,.05)
                      1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize:
                    "40px 40px",
                }}
              />


              {/* ROADS */}

              <div
                className="
                  absolute
                  left-0
                  top-[45%]
                  h-[3px]
                  w-full
                  rotate-[-8deg]
                  bg-cyan-400/20
                "
              />

              <div
                className="
                  absolute
                  left-[25%]
                  top-0
                  h-full
                  w-[3px]
                  rotate-[12deg]
                  bg-cyan-400/20
                "
              />


              {/* BUILDINGS */}

              {buildings.map(
                (building) => (

                  <div
                    key={
                      building.id
                    }
                    className="
                      absolute
                      rounded-sm
                      border
                      border-cyan-400/20
                      bg-cyan-400/10
                    "
                    style={{
                      left:
                        `${building.left}%`,
                      top:
                        `${building.top}%`,
                      height:
                        `${building.height}px`,
                      width:
                        `${building.width}%`,
                    }}
                  />

                )
              )}


              {/* EXISTING ASSETS */}

              <div
                className="
                  absolute
                  left-[18%]
                  top-[25%]
                  h-4
                  w-4
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_20px_rgba(34,211,238,.7)]
                "
              />


              <div
                className="
                  absolute
                  left-[43%]
                  top-[38%]
                  h-4
                  w-4
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_20px_rgba(34,211,238,.7)]
                "
              />


              <div
                className="
                  absolute
                  right-[20%]
                  top-[25%]
                  h-4
                  w-4
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_20px_rgba(34,211,238,.7)]
                "
              />


              {/* NEW HOSPITALS */}

              {results &&
                Array.from(
                  {
                    length:
                      scenario.newHospitals,
                  },
                  (_, index) => (

                    <div
                      key={
                        `hospital-${index}`
                      }
                      className="
                        absolute
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-emerald-400/40
                        bg-emerald-400/10
                        text-emerald-400
                      "
                      style={{
                        left:
                          `${35 +
                          index * 12}%`,
                        top:
                          `${58 +
                          (index % 2) *
                          12}%`,
                      }}
                      title="Planned Hospital"
                    >

                      <Hospital
                        size={15}
                      />

                    </div>

                  )
                )}


              {/* NEW SCHOOLS */}

              {results &&
                Array.from(
                  {
                    length:
                      Math.min(
                        scenario.newSchools,
                        8
                      ),
                  },
                  (_, index) => (

                    <div
                      key={
                        `school-${index}`
                      }
                      className="
                        absolute
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-yellow-400/40
                        bg-yellow-400/10
                        text-yellow-400
                      "
                      style={{
                        left:
                          `${12 +
                          index * 10}%`,
                        top:
                          `${70 -
                          (index % 3) *
                          10}%`,
                      }}
                      title="Planned School"
                    >

                      <School
                        size={13}
                      />

                    </div>

                  )
                )}


              {/* TITLE */}

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  pointer-events-none
                "
              >

                <div
                  className="
                    text-center
                  "
                >

                  <p
                    className="
                      text-6xl
                      font-bold
                      text-white/[0.04]
                      lg:text-8xl
                    "
                  >
                    DIGITAL TWIN
                  </p>


                  {results && (

                    <p
                      className="
                        mt-3
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.3em]
                        text-cyan-400/40
                      "
                    >
                      Scenario Projection
                    </p>

                  )}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              AI FORECAST
          ================================================= */}

          <section>

            <div
              className="
                mb-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-white
                "
              >
                AI Forecast
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                Projected impact generated
                from scenario parameters.
              </p>

            </div>


            <div
              className="
                grid
                gap-6
                lg:grid-cols-4
              "
            >

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <TrendingUp
                  size={20}
                  className="text-cyan-400"
                />

                <p
                  className="
                    mt-4
                    text-slate-400
                  "
                >
                  Coverage Impact
                </p>

                <h3
                  className="
                    mt-2
                    text-4xl
                    font-bold
                    text-white
                  "
                >
                  {results
                    ? `${forecast.coverage >=
                      0
                      ? "+"
                      : ""
                    }${forecast.coverage.toFixed(
                      1
                    )}%`
                    : "—"}
                </h3>

              </div>


              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <Train
                  size={20}
                  className="text-cyan-400"
                />

                <p
                  className="
                    mt-4
                    text-slate-400
                  "
                >
                  Traffic Impact
                </p>

                <h3
                  className="
                    mt-2
                    text-4xl
                    font-bold
                    text-white
                  "
                >
                  {results
                    ? `${forecast.traffic <=
                      0
                      ? ""
                      : "+"
                    }${forecast.traffic.toFixed(
                      1
                    )}%`
                    : "—"}
                </h3>

              </div>


              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <Trees
                  size={20}
                  className="text-emerald-400"
                />

                <p
                  className="
                    mt-4
                    text-slate-400
                  "
                >
                  AQI Impact
                </p>

                <h3
                  className="
                    mt-2
                    text-4xl
                    font-bold
                    text-white
                  "
                >
                  {results
                    ? `${forecast.aqi <=
                      0
                      ? ""
                      : "+"
                    }${forecast.aqi.toFixed(
                      1
                    )}`
                    : "—"}
                </h3>

              </div>


              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >

                <DollarSign
                  size={20}
                  className="text-cyan-400"
                />

                <p
                  className="
                    mt-4
                    text-slate-400
                  "
                >
                  ROI
                </p>

                <h3
                  className="
                    mt-2
                    text-4xl
                    font-bold
                    text-cyan-400
                  "
                >
                  {results
                    ? `${forecast.roi.toFixed(
                      1
                    )}%`
                    : "—"}
                </h3>

              </div>

            </div>

          </section>


          {/* =================================================
              IMPLEMENTATION TIMELINE
          ================================================= */}

          <section>

            <div
              className="
                mb-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-white
                "
              >
                Implementation Timeline
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                Suggested execution roadmap
                for the selected scenario.
              </p>

            </div>


            <div
              className="
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-4
              "
            >

              {(
                results?.timeline ||
                [
                  {
                    year:
                      scenario.targetYear -
                      3,
                    title:
                      "Planning & Approvals",
                    description:
                      "Feasibility and planning stage.",
                    icon: Target,
                  },
                  {
                    year:
                      scenario.targetYear -
                      2,
                    title:
                      "Core Infrastructure",
                    description:
                      "Infrastructure development.",
                    icon: Route,
                  },
                  {
                    year:
                      scenario.targetYear -
                      1,
                    title:
                      "Public Services",
                    description:
                      "Healthcare and education.",
                    icon: Hospital,
                  },
                  {
                    year:
                      scenario.targetYear,
                    title:
                      "Project Completion",
                    description:
                      "Final implementation.",
                    icon: CheckCircle2,
                  },
                ]
              ).map(
                (
                  item,
                  index
                ) => {

                  const Icon =
                    item.icon ||
                    CheckCircle2;

                  return (

                    <div
                      key={
                        `${item.year}-${index}`
                      }
                      className="
                        relative
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            text-cyan-400
                          "
                        >
                          {item.year}
                        </span>


                        <Icon
                          size={20}
                          className="
                            text-slate-500
                          "
                        />

                      </div>


                      <h3
                        className="
                          mt-5
                          font-semibold
                          text-white
                        "
                      >
                        {item.title}
                      </h3>


                      <p
                        className="
                          mt-2
                          text-sm
                          leading-relaxed
                          text-slate-500
                        "
                      >
                        {item.description}
                      </p>

                    </div>

                  );

                }
              )}

            </div>

          </section>


          {/* =================================================
              AI RECOMMENDATION
          ================================================= */}

          <section
            className="
              rounded-3xl
              border
              border-cyan-500/20
              bg-cyan-500/5
              p-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-start
                lg:justify-between
              "
            >

              <div>

                <p
                  className="
                    text-cyan-400
                  "
                >
                  AI Recommendation Engine
                </p>


                <h2
                  className="
                    mt-4
                    text-3xl
                    font-bold
                    text-white
                    lg:text-4xl
                  "
                >
                  {results
                    ? results.recommendation
                    : "Run a simulation to generate a planning recommendation."}
                </h2>


                <p
                  className="
                    mt-5
                    max-w-3xl
                    leading-relaxed
                    text-slate-400
                  "
                >
                  {results
                    ? results.recommendationReason
                    : "UrbanMind will evaluate population growth, infrastructure coverage, mobility, environmental impact and investment assumptions."}
                </p>


                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    gap-6
                  "
                >

                  <span
                    className="
                      text-emerald-400
                    "
                  >
                    Confidence{" "}
                    {results
                      ? `${results.confidence.toFixed(
                        0
                      )}%`
                      : "—"}
                  </span>


                  <span
                    className="
                      text-cyan-400
                    "
                  >
                    {results
                      ? results.roi >=
                        100
                        ? "High ROI"
                        : results.roi >=
                          50
                          ? "Moderate ROI"
                          : "Low ROI"
                      : "Awaiting simulation"}
                  </span>

                </div>

              </div>


              <div
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-500/10
                  text-cyan-400
                "
              >

                <Target size={28} />

              </div>

            </div>

          </section>


          {/* =================================================
              RISK ANALYSIS
          ================================================= */}

          <section>

            <div
              className="
                mb-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-white
                "
              >
                Risk Analysis
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                Risk levels are estimated from
                the scenario configuration.
              </p>

            </div>


            <div
              className="
                grid
                gap-6
                lg:grid-cols-4
              "
            >

              {[
                {
                  key:
                    "budget",
                  label:
                    "Budget Risk",
                  icon:
                    AlertTriangle,
                },

                {
                  key:
                    "environmental",
                  label:
                    "Environmental Risk",
                  icon:
                    ShieldCheck,
                },

                {
                  key:
                    "traffic",
                  label:
                    "Traffic Risk",
                  icon:
                    Activity,
                },

                {
                  key:
                    "implementation",
                  label:
                    "Implementation Risk",
                  icon:
                    AlertTriangle,
                },
              ].map(
                (item) => {

                  const risk =
                    results?.risks?.[
                    item.key
                    ] ||
                    "Pending";

                  const Icon =
                    item.icon;

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
                      key={
                        item.key
                      }
                      className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-6
                      "
                    >

                      <Icon
                        className={
                          riskClass
                        }
                      />


                      <h3
                        className="
                          mt-4
                          font-semibold
                          text-white
                        "
                      >
                        {item.label}
                      </h3>


                      <p
                        className={`
                          mt-2
                          font-medium
                          ${riskClass}
                        `}
                      >
                        {risk}
                      </p>

                    </div>

                  );

                }
              )}

            </div>

          </section>


          {/* =================================================
              PLANNING SUMMARY
          ================================================= */}

          <section>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.02]
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <BarChart3
                  size={22}
                  className="
                    text-cyan-400
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  Planning Summary
                </h2>

              </div>


              <div
                className="
                  mt-7
                  grid
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-4
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Population Growth
                  </p>

                  <p
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-white
                    "
                  >
                    +
                    {
                      scenario.populationGrowth
                    }%
                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Housing Expansion
                  </p>

                  <p
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-white
                    "
                  >
                    {
                      scenario.housingExpansion
                    }%
                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Green Investment
                  </p>

                  <p
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-white
                    "
                  >
                    {
                      scenario.greenInvestment
                    }%
                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Target Year
                  </p>

                  <p
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-white
                    "
                  >
                    {
                      scenario.targetYear
                    }
                  </p>

                </div>

              </div>


              <div
                className="
                  mt-8
                  grid
                  gap-5
                  border-t
                  border-white/10
                  pt-8
                  md:grid-cols-2
                  xl:grid-cols-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Hospital
                    size={20}
                    className="
                      text-emerald-400
                    "
                  />

                  <div>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Hospitals
                    </p>

                    <p
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      +
                      {
                        scenario.newHospitals
                      }
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <School
                    size={20}
                    className="
                      text-yellow-400
                    "
                  />

                  <div>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Schools
                    </p>

                    <p
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      +
                      {
                        scenario.newSchools
                      }
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Train
                    size={20}
                    className="
                      text-cyan-400
                    "
                  />

                  <div>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Metro
                    </p>

                    <p
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      +
                      {
                        scenario.metroExpansion
                      }
                      km
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Route
                    size={20}
                    className="
                      text-purple-400
                    "
                  />

                  <div>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Roads
                    </p>

                    <p
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      +
                      {
                        scenario.roadExpansion
                      }%
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}