import {
  Layers3,
  Filter,
  Pencil,
  Ruler,
  Download,
  Share2,
  Sparkles,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import {
  useEffect,
  useState,
} from "react";

import AIAssistantDrawer from "../../components/ai/AIAssistantDrawer";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  getInfrastructure,
} from "../../services/infrastructureService";

import {
  getIssues,
} from "../../services/issueService";

/* ---------------- Leaflet Marker Fix ---------------- */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function GISWorkspace() {

  /* ---------------- AI Drawer ---------------- */

  const [aiOpen, setAiOpen] =
    useState(false);

  /* ---------------- Authentication ---------------- */

  const token =
    useAuthStore(
      (state) => state.token
    );

  /* ---------------- Data ---------------- */

  const [
    infrastructure,
    setInfrastructure,
  ] = useState([]);

  const [
    issues,
    setIssues,
  ] = useState([]);

  /* ---------------- Search ---------------- */

  const [search, setSearch] =
    useState("");

  /* ---------------- Filters ---------------- */

  const [
    selectedType,
    setSelectedType,
  ] = useState("All");

  /* ---------------- Layer Visibility ---------------- */

  const [
    showInfrastructure,
    setShowInfrastructure,
  ] = useState(true);

  const [
    showIssues,
    setShowIssues,
  ] = useState(true);

  const [
    showHospitals,
    setShowHospitals,
  ] = useState(true);

  /* ---------------- API ---------------- */

  useEffect(() => {

    const fetchData = async () => {

      try {

        const infra =
          await getInfrastructure(token);

        setInfrastructure(
          infra.infrastructure
        );

        const issueData =
          await getIssues(token);

        setIssues(
          issueData.issues
        );

      } catch (error) {

        console.error(error);

      }

    };

    if (token) {
      fetchData();
    }

  }, [token]);

  return (

    <div className="flex w-full flex-col">

      {/* ================= TOOLBAR ================= */}

      <div className="border-b border-white/10 bg-slate-950 p-4">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* Left */}

          <div className="flex flex-wrap gap-3">

            <button className="toolbar-btn">
              <Layers3 size={18} />
              Layers
            </button>

            <button className="toolbar-btn">
              <Filter size={18} />
              Filters
            </button>

            <button className="toolbar-btn">
              <Pencil size={18} />
              Draw
            </button>

            <button className="toolbar-btn">
              <Ruler size={18} />
              Measure
            </button>

          </div>

          {/* Search */}

          <div className="flex flex-1 items-center justify-center gap-3">

            <input
              placeholder="Search infrastructure..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                max-w-md
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                outline-none
              "
            />

            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(
                  e.target.value
                )
              }
              className="
                rounded-2xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-3
              "
            >

              <option>
                All
              </option>

              <option>
                Hospital
              </option>

              <option>
                School
              </option>

              <option>
                Road
              </option>

              <option>
                Police
              </option>

              <option>
                Metro
              </option>

            </select>

          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-3">

            <button className="toolbar-btn">

              <Download size={18} />

              Export

            </button>

            <button className="toolbar-btn">

              <Share2 size={18} />

              Share

            </button>

            <button
              onClick={() =>
                setAiOpen(true)
              }
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-cyan-500
                px-5
                py-3
                font-medium
                text-slate-950
              "
            >

              <Sparkles size={18} />

              AI Analyze

            </button>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex flex-1">

        <main className="flex-1">

          <div className="mx-auto w-full max-w-[1600px] px-8 py-10 xl:px-14">

            {/* HEADER */}

            <div className="mb-10">

              <h1 className="text-4xl font-semibold">

                GIS Command Center

              </h1>

              <p className="mt-4 max-w-4xl text-xl leading-relaxed text-slate-400">

                Urban infrastructure, mobility,
                healthcare and population intelligence platform.

              </p>

            </div>

            {/* ================= MAP SECTION ================= */}

            <section
  className="
    mb-16
    rounded-3xl
    border border-white/10
    bg-white/[0.02]
    p-8
  "
>

  <div className="mb-8">

    <h2 className="text-3xl font-semibold">
      Live City Operations Map
    </h2>

    <p className="mt-2 text-slate-400">
      Real-time spatial intelligence workspace.
    </p>

  </div>

  <div
    className="
      relative
      h-[650px]
      overflow-hidden
      rounded-3xl
      border border-white/10
      xl:h-[800px]
    "
  >

    {/* ================= Layer Panel ================= */}

    <div
      className="
        absolute
        left-6
        top-6
        z-[1000]
        w-72
        rounded-3xl
        border border-white/10
        bg-slate-950/95
        p-6
        backdrop-blur-xl
      "
    >

      <h3 className="mb-5 text-xl font-semibold">
        Map Layers
      </h3>

      <label className="mb-4 flex items-center justify-between">

        <span>Infrastructure</span>

        <input
          type="checkbox"
          checked={showInfrastructure}
          onChange={() =>
            setShowInfrastructure(
              !showInfrastructure
            )
          }
        />

      </label>

      <label className="mb-4 flex items-center justify-between">

        <span>Citizen Issues</span>

        <input
          type="checkbox"
          checked={showIssues}
          onChange={() =>
            setShowIssues(
              !showIssues
            )
          }
        />

      </label>

      <label className="mb-4 flex items-center justify-between">

        <span>Hospitals</span>

        <input
          type="checkbox"
          checked={showHospitals}
          onChange={() =>
            setShowHospitals(
              !showHospitals
            )
          }
        />

      </label>

      {/* ================= Legend ================= */}

      <div className="mt-6 border-t border-white/10 pt-5">

        <h4 className="mb-4 text-lg font-semibold">
          Legend
        </h4>

        <div className="space-y-3 text-sm">

          <div>
            🔵 Infrastructure
          </div>

          <div>
            🔴 Citizen Issues
          </div>

          <div>
            🟢 Hospitals
          </div>

          <div>
            🟡 Schools
          </div>

        </div>

      </div>

    </div>

    {/* ================= MAP ================= */}

    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      zoomControl={false}
      className="h-full w-full"
    >

      <ZoomControl
        position="bottomright"
      />

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* ================= Infrastructure ================= */}

      {showInfrastructure &&
        infrastructure

          .filter((item) => {

            if (
              !showHospitals &&
              item.type === "Hospital"
            ) {
              return false;
            }

            return true;

          })

          .filter((item) =>

            selectedType === "All"

              ? true

              : item.type === selectedType

          )

          .filter((item) =>

            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.type
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.sector
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

          )

          .map((item) => (

            <Marker
              key={item._id}
              position={[
                Number(item.latitude),
                Number(item.longitude),
              ]}
            >

              <Popup>

                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p>
                  <strong>Type:</strong>{" "}
                  {item.type}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {item.status}
                </p>

                <p>
                  <strong>Sector:</strong>{" "}
                  {item.sector}
                </p>

                <p>
                  <strong>Utilization:</strong>{" "}
                  {item.utilization}%
                </p>

              </Popup>

            </Marker>

          ))}

      {/* ================= Citizen Issues ================= */}

      {showIssues &&
        issues

          .filter(
            (issue) =>
              issue.latitude &&
              issue.longitude
          )

          .map((issue) => (

            <Marker
              key={issue._id}
              position={[
                Number(issue.latitude),
                Number(issue.longitude),
              ]}
            >

              <Popup>

                <h3 className="font-bold">
                  {issue.title}
                </h3>

                <p>
                  {issue.description}
                </p>

                <p>
                  Status:
                  {" "}
                  {issue.status}
                </p>

                <p>
                  Category:
                  {" "}
                  {issue.category}
                </p>

              </Popup>

            </Marker>

          ))}

    </MapContainer>

    {/* ================= Floating Statistics ================= */}

    <div
      className="
        absolute
        right-6
        top-6
        z-[1000]
        grid
        gap-4
      "
    >

      <div
        className="
          rounded-2xl
          bg-slate-950/90
          p-5
          backdrop-blur-xl
        "
      >

        <p className="text-xs text-slate-400">
          Population
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          1.2M
        </h3>

      </div>

      <div
        className="
          rounded-2xl
          bg-slate-950/90
          p-5
          backdrop-blur-xl
        "
      >

        <p className="text-xs text-slate-400">
          Coverage
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          91%
        </h3>

      </div>

      <div
        className="
          rounded-2xl
          bg-slate-950/90
          p-5
          backdrop-blur-xl
        "
      >

        <p className="text-xs text-slate-400">
          Infrastructure
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {infrastructure.length}
        </h3>

      </div>

      <div
        className="
          rounded-2xl
          bg-slate-950/90
          p-5
          backdrop-blur-xl
        "
      >

        <p className="text-xs text-slate-400">
          Active Issues
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {issues.length}
        </h3>

      </div>

    </div>

  </div>

</section>

{/* ================= AI INSIGHTS ================= */}

<section className="mb-16">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h2 className="text-3xl font-semibold">
        AI Urban Intelligence
      </h2>

      <p className="mt-2 text-slate-400">
        Live recommendations generated from
        infrastructure and citizen issue data.
      </p>

    </div>

    <button
      onClick={() => setAiOpen(true)}
      className="
        rounded-2xl
        bg-cyan-500
        px-6
        py-3
        font-semibold
        text-slate-950
      "
    >
      Open AI Assistant
    </button>

  </div>

  <div className="grid gap-6 lg:grid-cols-3">

    <div className="ai-card">

      <h3 className="text-xl font-semibold">
        Infrastructure
      </h3>

      <p className="mt-4 text-slate-400">
        AI detected
        {" "}
        <span className="font-semibold text-cyan-400">
          {infrastructure.filter(
            (item) =>
              item.utilization > 80
          ).length}
        </span>
        {" "}
        highly utilized assets requiring
        expansion.
      </p>

    </div>

    <div className="ai-card">

      <h3 className="text-xl font-semibold">
        Citizen Issues
      </h3>

      <p className="mt-4 text-slate-400">

        There are

        {" "}

        <span className="font-semibold text-red-400">
          {
            issues.filter(
              (issue) =>
                issue.status ===
                "Pending"
            ).length
          }
        </span>

        {" "}

        unresolved complaints.

      </p>

    </div>

    <div className="ai-card">

      <h3 className="text-xl font-semibold">
        Urban Recommendation
      </h3>

      <p className="mt-4 text-slate-400">

        Recommend constructing one
        additional healthcare facility
        in high-growth zones.

      </p>

    </div>

  </div>

</section>

{/* ================= URBAN METRICS ================= */}

<section className="mb-16">

  <h2 className="mb-8 text-3xl font-semibold">
    Urban Metrics
  </h2>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    <div className="ai-card">

      <h3 className="text-slate-400">
        Total Infrastructure
      </h3>

      <h2 className="mt-3 text-5xl font-bold">
        {infrastructure.length}
      </h2>

    </div>

    <div className="ai-card">

      <h3 className="text-slate-400">
        Citizen Issues
      </h3>

      <h2 className="mt-3 text-5xl font-bold">
        {issues.length}
      </h2>

    </div>

    <div className="ai-card">

      <h3 className="text-slate-400">
        Operational Assets
      </h3>

      <h2 className="mt-3 text-5xl font-bold">

        {
          infrastructure.filter(
            (item) =>
              item.status ===
              "Operational"
          ).length
        }

      </h2>

    </div>

    <div className="ai-card">

      <h3 className="text-slate-400">
        Pending Issues
      </h3>

      <h2 className="mt-3 text-5xl font-bold">

        {
          issues.filter(
            (issue) =>
              issue.status ===
              "Pending"
          ).length
        }

      </h2>

    </div>

  </div>

</section>

{/* ================= INFRASTRUCTURE TABLE ================= */}

<section className="mb-16">

  <div className="mb-8 flex items-center justify-between">

    <h2 className="text-3xl font-semibold">
      Infrastructure Assets
    </h2>

    <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-400">

      {infrastructure.length}
      {" "}
      Assets

    </span>

  </div>

  <div
    className="
      overflow-hidden
      rounded-3xl
      border border-white/10
    "
  >

    <table className="w-full">

      <thead className="bg-white/5">

        <tr>

          <th className="p-4 text-left">
            Name
          </th>

          <th className="p-4 text-left">
            Type
          </th>

          <th className="p-4 text-left">
            Sector
          </th>

          <th className="p-4 text-left">
            Status
          </th>

          <th className="p-4 text-left">
            Utilization
          </th>

        </tr>

      </thead>

      <tbody>

        {infrastructure

          .filter((item) =>

            item.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||

            item.type
              .toLowerCase()
              .includes(search.toLowerCase()) ||

            item.sector
              .toLowerCase()
              .includes(search.toLowerCase())

          )

          .map((item) => (

            <tr
              key={item._id}
              className="border-t border-white/10"
            >

              <td className="p-4">
                {item.name}
              </td>

              <td className="p-4">
                {item.type}
              </td>

              <td className="p-4">
                {item.sector}
              </td>

              <td className="p-4">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-sm

                    ${
                      item.status ===
                      "Operational"

                        ? "bg-green-500/20 text-green-400"

                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                >

                  {item.status}

                </span>

              </td>

              <td className="p-4">

                {item.utilization}%

              </td>

            </tr>

          ))}

      </tbody>

    </table>

  </div>

</section>

{/* ================= DEMAND FORECAST ================= */}

<section className="mb-16">

  <h2 className="mb-8 text-3xl font-semibold">
    Demand Forecast
  </h2>

  <div className="grid gap-6 lg:grid-cols-3">

    <div className="ai-card">

      <h3 className="text-lg font-semibold">
        Healthcare
      </h3>

      <p className="mt-3 text-slate-400">
        AI predicts a 23% increase in
        healthcare demand over the
        next five years.
      </p>

    </div>

    <div className="ai-card">

      <h3 className="text-lg font-semibold">
        Transportation
      </h3>

      <p className="mt-3 text-slate-400">
        Public transport demand is
        expected to increase by 18%
        in the city center.
      </p>

    </div>

    <div className="ai-card">

      <h3 className="text-lg font-semibold">
        Education
      </h3>

      <p className="mt-3 text-slate-400">
        Two additional schools are
        recommended for newly
        developing residential zones.
      </p>

    </div>

  </div>

</section>

{/* ================= NETWORK HEALTH ================= */}

<section className="mb-16">

  <h2 className="mb-8 text-3xl font-semibold">
    Infrastructure Health
  </h2>

  <div className="grid gap-6 lg:grid-cols-4">

    <div className="ai-card">

      <h3 className="text-slate-400">
        Water
      </h3>

      <h2 className="mt-3 text-5xl font-bold text-cyan-400">
        94%
      </h2>

    </div>

    <div className="ai-card">

      <h3 className="text-slate-400">
        Electricity
      </h3>

      <h2 className="mt-3 text-5xl font-bold text-green-400">
        98%
      </h2>

    </div>

    <div className="ai-card">

      <h3 className="text-slate-400">
        Roads
      </h3>

      <h2 className="mt-3 text-5xl font-bold text-yellow-400">
        86%
      </h2>

    </div>

    <div className="ai-card">

      <h3 className="text-slate-400">
        Public Safety
      </h3>

      <h2 className="mt-3 text-5xl font-bold text-red-400">
        91%
      </h2>

    </div>

  </div>

</section>

{/* ================= AI SCENARIO SUGGESTIONS ================= */}

<section className="mb-16">

  <h2 className="mb-8 text-3xl font-semibold">
    AI Scenario Opportunities
  </h2>

  <div className="grid gap-6 lg:grid-cols-3">

    <div className="ai-card">

      <h3 className="text-xl font-semibold">
        New Hospital
      </h3>

      <p className="mt-3 text-slate-400">
        Build a 250-bed hospital
        in the north-west region
        to reduce travel time by 18%.
      </p>

    </div>

    <div className="ai-card">

      <h3 className="text-xl font-semibold">
        Smart Traffic Signals
      </h3>

      <p className="mt-3 text-slate-400">
        AI recommends adaptive
        traffic control for five
        high-congestion intersections.
      </p>

    </div>

    <div className="ai-card">

      <h3 className="text-xl font-semibold">
        Green Corridor
      </h3>

      <p className="mt-3 text-slate-400">
        Develop a green mobility
        corridor connecting major
        public institutions.
      </p>

    </div>

  </div>

</section>

</div>

</main>

</div>

<AIAssistantDrawer
  open={aiOpen}
  onClose={() => setAiOpen(false)}
/>

</div>

);
}