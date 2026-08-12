import {
  Layers3,
  Filter,
  Pencil,
  Ruler,
  Download,
  Share2,
  Sparkles,
  X,
  MapPin,
  Building2,
  AlertTriangle,
  Activity,
  Navigation,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Polyline,
  CircleMarker,
  useMap,
  useMapEvents,
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

import { useAuthStore } from "../../store/authStore";

import {
  getInfrastructure,
} from "../../services/infrastructureService";

import {
  getIssues,
} from "../../services/issueService";


// =====================================================
// LEAFLET MARKER FIX
// =====================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


// =====================================================
// DEMO INFRASTRUCTURE DATA
// =====================================================

const DEMO_INFRASTRUCTURE = [
  {
    _id: "demo-hospital-1",
    name: "UrbanMind General Hospital",
    type: "Hospital",
    sector: "North Delhi",
    status: "Operational",
    utilization: 82,
    latitude: 28.6448,
    longitude: 77.2167,
  },

  {
    _id: "demo-hospital-2",
    name: "City Care Medical Center",
    type: "Hospital",
    sector: "Central Delhi",
    status: "Operational",
    utilization: 68,
    latitude: 28.6139,
    longitude: 77.2090,
  },

  {
    _id: "demo-school-1",
    name: "Smart City Public School",
    type: "School",
    sector: "East Delhi",
    status: "Operational",
    utilization: 74,
    latitude: 28.6280,
    longitude: 77.2780,
  },

  {
    _id: "demo-school-2",
    name: "Urban Knowledge Academy",
    type: "School",
    sector: "South Delhi",
    status: "Operational",
    utilization: 61,
    latitude: 28.5680,
    longitude: 77.2410,
  },

  {
    _id: "demo-police-1",
    name: "Central Police Station",
    type: "Police",
    sector: "Central Delhi",
    status: "Operational",
    utilization: 57,
    latitude: 28.6304,
    longitude: 77.2177,
  },

  {
    _id: "demo-metro-1",
    name: "Rajiv Chowk Metro Station",
    type: "Metro",
    sector: "Central Delhi",
    status: "Operational",
    utilization: 88,
    latitude: 28.6328,
    longitude: 77.2197,
  },

  {
    _id: "demo-road-1",
    name: "Ring Road Corridor",
    type: "Road",
    sector: "West Delhi",
    status: "Operational",
    utilization: 91,
    latitude: 28.6500,
    longitude: 77.1500,
  },

  {
    _id: "demo-road-2",
    name: "Outer Ring Road",
    type: "Road",
    sector: "South Delhi",
    status: "Maintenance",
    utilization: 79,
    latitude: 28.5600,
    longitude: 77.1900,
  },
];


// =====================================================
// DEMO ISSUES
// =====================================================

const DEMO_ISSUES = [
  {
    _id: "demo-issue-1",
    title: "Road Damage",
    description:
      "Pothole cluster reported near the main intersection.",
    status: "Pending",
    category: "Road",
    latitude: 28.6200,
    longitude: 77.2300,
  },

  {
    _id: "demo-issue-2",
    title: "Street Light Failure",
    description:
      "Multiple street lights are not operational.",
    status: "In Progress",
    category: "Electricity",
    latitude: 28.6000,
    longitude: 77.2500,
  },

  {
    _id: "demo-issue-3",
    title: "Water Supply Issue",
    description:
      "Residents reported reduced water pressure.",
    status: "Resolved",
    category: "Water",
    latitude: 28.6400,
    longitude: 77.2600,
  },
];


// =====================================================
// MAP CLICK HANDLER
// =====================================================

function MapClickHandler({
  drawMode,
  measureMode,
  onMapClick,
  onDrawClick,
  onMeasureClick,
}) {
  useMapEvents({
    click(event) {
      const point = {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      };

      // DRAW MODE
      if (drawMode) {
        onDrawClick(point);
        return;
      }

      // MEASURE MODE
      if (measureMode) {
        onMeasureClick(point);
        return;
      }

      // NORMAL MODE
      onMapClick(point);
    },
  });

  return null;
}


// =====================================================
// MAP INTERACTION CONTROLLER
// Prevent double-click zoom while drawing/measuring
// =====================================================

function MapInteractionController({
  drawMode,
  measureMode,
}) {
  const map = useMap();

  useEffect(() => {
    if (drawMode || measureMode) {
      map.doubleClickZoom.disable();
    } else {
      map.doubleClickZoom.enable();
    }

    return () => {
      map.doubleClickZoom.enable();
    };
  }, [
    map,
    drawMode,
    measureMode,
  ]);

  return null;
}


// =====================================================
// MAIN GIS COMPONENT
// =====================================================

export default function GISWorkspace() {

  // ===================================================
  // AI
  // ===================================================

  const [aiOpen, setAiOpen] =
    useState(false);


  // ===================================================
  // AUTH
  // ===================================================

  const token =
    useAuthStore(
      (state) => state.token
    );

  const user =
    useAuthStore(
      (state) => state.user
    );


  // ===================================================
  // DEMO MODE
  // ===================================================

  const isDemoMode = !token;


  // ===================================================
  // DATA
  // ===================================================

  const [
    infrastructure,
    setInfrastructure,
  ] = useState([]);

  const [
    issues,
    setIssues,
  ] = useState([]);


  // ===================================================
  // SEARCH
  // ===================================================

  const [search, setSearch] =
    useState("");


  // ===================================================
  // TOOLBAR STATE
  // ===================================================

  const [
    layersOpen,
    setLayersOpen,
  ] = useState(true);

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);


  // ===================================================
  // DRAW STATE
  // ===================================================

  const [
    drawMode,
    setDrawMode,
  ] = useState(false);

  const [
    drawingPoints,
    setDrawingPoints,
  ] = useState([]);


  // ===================================================
  // MEASURE STATE
  // ===================================================

  const [
    measureMode,
    setMeasureMode,
  ] = useState(false);

  const [
    measurePoints,
    setMeasurePoints,
  ] = useState([]);


  // ===================================================
  // FILTER
  // ===================================================

  const [
    selectedType,
    setSelectedType,
  ] = useState("All");


  // ===================================================
  // MAIN LAYERS
  // ===================================================

  const [
    showInfrastructure,
    setShowInfrastructure,
  ] = useState(true);

  const [
    showIssues,
    setShowIssues,
  ] = useState(true);


  // ===================================================
  // INFRASTRUCTURE TYPE LAYERS
  // ===================================================

  const [
    showHospitals,
    setShowHospitals,
  ] = useState(true);

  const [
    showSchools,
    setShowSchools,
  ] = useState(true);

  const [
    showPolice,
    setShowPolice,
  ] = useState(true);

  const [
    showMetro,
    setShowMetro,
  ] = useState(true);

  const [
    showRoads,
    setShowRoads,
  ] = useState(true);


  // ===================================================
  // SELECTED ASSET
  // ===================================================

  const [
    selectedAsset,
    setSelectedAsset,
  ] = useState(null);


  // ===================================================
  // SELECTED MAP LOCATION
  // ===================================================

  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState(null);


  // ===================================================
  // FETCH DATA
  // ===================================================

  useEffect(() => {

    const fetchData = async () => {

      // -----------------------------------------------
      // DEMO MODE
      // -----------------------------------------------

      if (!token) {

        setInfrastructure(
          DEMO_INFRASTRUCTURE
        );

        setIssues(
          DEMO_ISSUES
        );

        return;
      }


      // -----------------------------------------------
      // REAL USER
      // -----------------------------------------------

      try {

        const infra =
          await getInfrastructure(
            token
          );

        setInfrastructure(
          infra.infrastructure || []
        );


        const issueData =
          await getIssues(
            token
          );

        setIssues(
          issueData.issues || []
        );

      } catch (error) {

        console.error(
          "GIS data error:",
          error
        );

        setInfrastructure([]);
        setIssues([]);
      }
    };


    fetchData();

  }, [token]);


  // ===================================================
  // INFRASTRUCTURE TYPE VISIBILITY
  // ===================================================

  const isTypeVisible = (type) => {

    switch (type) {

      case "Hospital":
        return showHospitals;

      case "School":
        return showSchools;

      case "Police":
        return showPolice;

      case "Metro":
        return showMetro;

      case "Road":
        return showRoads;

      default:
        return true;
    }
  };


  // ===================================================
  // FILTER INFRASTRUCTURE
  // ===================================================

  const filteredInfrastructure =
    infrastructure

      // TYPE VISIBILITY
      .filter((item) =>
        isTypeVisible(item.type)
      )

      // SEARCH
      .filter((item) => {

        const searchText =
          search
            .toLowerCase()
            .trim();

        if (!searchText) {
          return true;
        }

        return (
          item.name
            ?.toLowerCase()
            .includes(searchText) ||

          item.type
            ?.toLowerCase()
            .includes(searchText) ||

          item.sector
            ?.toLowerCase()
            .includes(searchText)
        );
      })

      // DROPDOWN FILTER
      .filter((item) => {

        if (
          selectedType === "All"
        ) {
          return true;
        }

        return (
          item.type ===
          selectedType
        );
      });


  // ===================================================
  // NORMAL MAP CLICK
  // ===================================================

  const handleMapClick = (
    location
  ) => {

    setSelectedLocation(
      location
    );

    setSelectedAsset(null);
  };


  // ===================================================
  // ASSET CLICK
  // ===================================================

  const handleAssetClick = (
    item
  ) => {

    setSelectedAsset(item);

    setSelectedLocation(null);
  };


  // ===================================================
  // CLOSE DETAILS
  // ===================================================

  const closeDetails = () => {

    setSelectedAsset(null);

    setSelectedLocation(null);
  };


  // ===================================================
  // DRAW CLICK
  // ===================================================

  const handleDrawClick = (
    point
  ) => {

    setDrawingPoints(
      (previous) => [
        ...previous,
        point,
      ]
    );

    setSelectedAsset(null);
    setSelectedLocation(null);
  };


  // ===================================================
  // MEASURE CLICK
  // ===================================================

  const handleMeasureClick = (
    point
  ) => {

    setMeasurePoints(
      (previous) => [
        ...previous,
        point,
      ]
    );

    setSelectedAsset(null);
    setSelectedLocation(null);
  };


  // ===================================================
  // CALCULATE DISTANCE
  // ===================================================

  const calculateDistance = () => {

    if (
      measurePoints.length < 2
    ) {
      return 0;
    }

    let totalDistance = 0;

    for (
      let index = 1;
      index < measurePoints.length;
      index += 1
    ) {

      const point1 =
        L.latLng(
          measurePoints[
            index - 1
          ].latitude,
          measurePoints[
            index - 1
          ].longitude
        );

      const point2 =
        L.latLng(
          measurePoints[index]
            .latitude,
          measurePoints[index]
            .longitude
        );

      totalDistance +=
        point1.distanceTo(
          point2
        );
    }

    return totalDistance;
  };


  // ===================================================
  // DRAW TOGGLE
  // ===================================================

  const toggleDrawMode = () => {

    setLayersOpen(false);
    setFiltersOpen(false);

    // Turn measuring off
    setMeasureMode(false);
    setMeasurePoints([]);

    setDrawMode(
      (previous) => {

        const next =
          !previous;

        // Starting a new drawing
        if (next) {
          setDrawingPoints([]);
        }

        return next;
      }
    );

    setSelectedAsset(null);
    setSelectedLocation(null);
  };


  // ===================================================
  // MEASURE TOGGLE
  // ===================================================

  const toggleMeasureMode = () => {

    setLayersOpen(false);
    setFiltersOpen(false);

    // Turn drawing off
    setDrawMode(false);
    setDrawingPoints([]);

    setMeasureMode(
      (previous) => {

        const next =
          !previous;

        // Starting a new measurement
        if (next) {
          setMeasurePoints([]);
        }

        return next;
      }
    );

    setSelectedAsset(null);
    setSelectedLocation(null);
  };


  // ===================================================
  // EXPORT
  // ===================================================

  const handleExport = () => {

    const exportData = {

      exportedAt:
        new Date().toISOString(),

      mode:
        isDemoMode
          ? "demo"
          : "live",

      infrastructure,

      issues,

      drawingPoints,

      measurePoints,

      distanceMeters:
        calculateDistance(),
    };


    const blob =
      new Blob(
        [
          JSON.stringify(
            exportData,
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
      "urbanmind-gis-data.json";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );
  };


  // ===================================================
  // SHARE
  // ===================================================

  const handleShare = async () => {

    const shareData = {

      title:
        "UrbanMind GIS Workspace",

      text:
        "Explore the UrbanMind GIS Command Center.",

      url:
        window.location.href,
    };


    try {

      if (
        navigator.share
      ) {

        await navigator.share(
          shareData
        );

        return;
      }


      await navigator.clipboard.writeText(
        window.location.href
      );


      window.alert(
        "GIS workspace link copied to clipboard."
      );

    } catch (error) {

      console.error(
        "Share failed:",
        error
      );
    }
  };


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <div
      className="
        flex
        w-full
        flex-col
      "
    >

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div
        className="
          sticky
          top-0
          z-[1100]
          border-b
          border-white/10
          bg-slate-950/95
          p-4
          backdrop-blur-xl
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          {/* LEFT TOOLS */}

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            {/* LAYERS */}

            <button
              type="button"
              onClick={() => {

                setLayersOpen(
                  (previous) =>
                    !previous
                );

                setFiltersOpen(
                  false
                );
              }}
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2.5
                transition

                ${
                  layersOpen
                    ? `
                      border-cyan-500/40
                      bg-cyan-500/10
                      text-cyan-400
                    `
                    : `
                      border-white/10
                      bg-slate-900
                      text-white
                      hover:bg-white/5
                    `
                }
              `}
            >

              <Layers3 size={18} />

              Layers

            </button>


            {/* FILTERS */}

            <button
              type="button"
              onClick={() => {

                setFiltersOpen(
                  (previous) =>
                    !previous
                );

                setLayersOpen(
                  false
                );
              }}
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2.5
                transition

                ${
                  filtersOpen
                    ? `
                      border-cyan-500/40
                      bg-cyan-500/10
                      text-cyan-400
                    `
                    : `
                      border-white/10
                      bg-slate-900
                      text-white
                      hover:bg-white/5
                    `
                }
              `}
            >

              <Filter size={18} />

              Filters

            </button>


            {/* DRAW */}

            <button
              type="button"
              onClick={
                toggleDrawMode
              }
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2.5
                transition

                ${
                  drawMode
                    ? `
                      border-cyan-500/40
                      bg-cyan-500/10
                      text-cyan-400
                    `
                    : `
                      border-white/10
                      bg-slate-900
                      text-white
                      hover:bg-white/5
                    `
                }
              `}
            >

              <Pencil size={18} />

              {drawMode
                ? "Drawing..."
                : "Draw"}

            </button>


            {/* MEASURE */}

            <button
              type="button"
              onClick={
                toggleMeasureMode
              }
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2.5
                transition

                ${
                  measureMode
                    ? `
                      border-yellow-500/40
                      bg-yellow-500/10
                      text-yellow-400
                    `
                    : `
                      border-white/10
                      bg-slate-900
                      text-white
                      hover:bg-white/5
                    `
                }
              `}
            >

              <Ruler size={18} />

              {measureMode
                ? "Measuring..."
                : "Measure"}

            </button>

          </div>


          {/* SEARCH */}

          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-3
            "
          >

            <input
              type="text"
              placeholder="
                Search infrastructure...
              "
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                max-w-md
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-2.5
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-500
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
                rounded-xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-2.5
                text-white
                outline-none
              "
            >

              <option value="All">
                All
              </option>

              <option value="Hospital">
                Hospital
              </option>

              <option value="School">
                School
              </option>

              <option value="Police">
                Police
              </option>

              <option value="Metro">
                Metro
              </option>

              <option value="Road">
                Road
              </option>

            </select>

          </div>


          {/* RIGHT TOOLS */}

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            {/* EXPORT */}

            <button
              type="button"
              onClick={
                handleExport
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-2.5
                text-white
                transition
                hover:bg-white/5
              "
            >

              <Download size={18} />

              Export

            </button>


            {/* SHARE */}

            <button
              type="button"
              onClick={
                handleShare
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-2.5
                text-white
                transition
                hover:bg-white/5
              "
            >

              <Share2 size={18} />

              Share

            </button>


            {/* AI */}

            <button
              type="button"
              onClick={() =>
                setAiOpen(true)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-cyan-500
                px-5
                py-2.5
                font-medium
                text-slate-950
                transition
                hover:bg-cyan-400
              "
            >

              <Sparkles size={18} />

              AI Analyze

            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          flex
          flex-1
        "
      >

        <main
          className="
            flex-1
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              px-6
              py-8
              xl:px-10
            "
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                mb-8
              "
            >

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
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

                  {isDemoMode
                    ? "Demo GIS"
                    : "Live GIS"}

                </span>


                {user?.role && (

                  <span
                    className="
                      rounded-full
                      bg-white/5
                      px-3
                      py-1
                      text-xs
                      text-slate-400
                    "
                  >

                    {user.role}

                  </span>

                )}

              </div>


              <h1
                className="
                  text-4xl
                  font-semibold
                  text-white
                "
              >
                GIS Command Center
              </h1>


              <p
                className="
                  mt-3
                  max-w-4xl
                  text-lg
                  leading-relaxed
                  text-slate-400
                "
              >
                Urban infrastructure,
                mobility, healthcare and
                population intelligence
                platform.
              </p>

            </div>


            {/* =================================================
                MAP SECTION
            ================================================= */}

            <section
              className="
                mb-16
                rounded-3xl
                border
                border-white/10
                bg-white/[0.02]
                p-6
                xl:p-8
              "
            >

              <div
                className="
                  mb-6
                  flex
                  flex-col
                  gap-3
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-3xl
                      font-semibold
                      text-white
                    "
                  >
                    Live City Operations Map
                  </h2>


                  <p
                    className="
                      mt-2
                      text-slate-400
                    "
                  >
                    Select infrastructure or
                    city locations to inspect
                    urban conditions.
                  </p>

                </div>


                {selectedLocation && (

                  <div
                    className="
                      rounded-xl
                      border
                      border-cyan-500/20
                      bg-cyan-500/10
                      px-4
                      py-2
                      text-sm
                      text-cyan-400
                    "
                  >
                    Location selected
                  </div>

                )}

              </div>


              {/* =================================================
                  MAP WRAPPER
              ================================================= */}

              <div
                className="
                  relative
                  h-[650px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  xl:h-[800px]
                "
              >

                {/* =================================================
                    LAYERS PANEL
                ================================================= */}

                {layersOpen && (

                  <div
                    className="
                      absolute
                      left-6
                      top-6
                      z-[1000]
                      w-72
                      max-h-[calc(100%-3rem)]
                      overflow-y-auto
                      rounded-3xl
                      border
                      border-white/10
                      bg-slate-950/95
                      p-6
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <h3
                        className="
                          text-xl
                          font-semibold
                          text-white
                        "
                      >
                        Map Layers
                      </h3>


                      {isDemoMode && (

                        <span
                          className="
                            text-[10px]
                            uppercase
                            tracking-wider
                            text-cyan-400
                          "
                        >
                          Demo
                        </span>

                      )}

                    </div>


                    {/* DATA LAYERS */}

                    <p
                      className="
                        mb-3
                        mt-6
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-slate-500
                      "
                    >
                      Data Layers
                    </p>


                    {/* INFRASTRUCTURE */}

                    <label
                      className="
                        mb-4
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        text-slate-300
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

                        Infrastructure

                      </span>


                      <input
                        type="checkbox"
                        checked={
                          showInfrastructure
                        }
                        onChange={() =>
                          setShowInfrastructure(
                            (previous) =>
                              !previous
                          )
                        }
                        className="
                          h-4
                          w-4
                          accent-cyan-500
                        "
                      />

                    </label>


                    {/* ISSUES */}

                    <label
                      className="
                        mb-4
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        text-slate-300
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
                            bg-red-400
                          "
                        />

                        Citizen Issues

                      </span>


                      <input
                        type="checkbox"
                        checked={
                          showIssues
                        }
                        onChange={() =>
                          setShowIssues(
                            (previous) =>
                              !previous
                          )
                        }
                        className="
                          h-4
                          w-4
                          accent-cyan-500
                        "
                      />

                    </label>


                    {/* TYPES */}

                    <div
                      className="
                        mt-5
                        border-t
                        border-white/10
                        pt-5
                      "
                    >

                      <p
                        className="
                          mb-4
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          text-slate-500
                        "
                      >
                        Infrastructure Types
                      </p>


                      {/* HOSPITALS */}

                      <label
                        className="
                          mb-3
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          text-sm
                          text-slate-300
                        "
                      >

                        <span>
                          Hospitals
                        </span>

                        <input
                          type="checkbox"
                          checked={
                            showHospitals
                          }
                          onChange={() =>
                            setShowHospitals(
                              (previous) =>
                                !previous
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-cyan-500
                          "
                        />

                      </label>


                      {/* SCHOOLS */}

                      <label
                        className="
                          mb-3
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          text-sm
                          text-slate-300
                        "
                      >

                        <span>
                          Schools
                        </span>

                        <input
                          type="checkbox"
                          checked={
                            showSchools
                          }
                          onChange={() =>
                            setShowSchools(
                              (previous) =>
                                !previous
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-cyan-500
                          "
                        />

                      </label>


                      {/* POLICE */}

                      <label
                        className="
                          mb-3
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          text-sm
                          text-slate-300
                        "
                      >

                        <span>
                          Police
                        </span>

                        <input
                          type="checkbox"
                          checked={
                            showPolice
                          }
                          onChange={() =>
                            setShowPolice(
                              (previous) =>
                                !previous
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-cyan-500
                          "
                        />

                      </label>


                      {/* METRO */}

                      <label
                        className="
                          mb-3
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          text-sm
                          text-slate-300
                        "
                      >

                        <span>
                          Metro
                        </span>

                        <input
                          type="checkbox"
                          checked={
                            showMetro
                          }
                          onChange={() =>
                            setShowMetro(
                              (previous) =>
                                !previous
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-cyan-500
                          "
                        />

                      </label>


                      {/* ROADS */}

                      <label
                        className="
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          text-sm
                          text-slate-300
                        "
                      >

                        <span>
                          Roads
                        </span>

                        <input
                          type="checkbox"
                          checked={
                            showRoads
                          }
                          onChange={() =>
                            setShowRoads(
                              (previous) =>
                                !previous
                            )
                          }
                          className="
                            h-4
                            w-4
                            accent-cyan-500
                          "
                        />

                      </label>

                    </div>


                    {/* LEGEND */}

                    <div
                      className="
                        mt-6
                        border-t
                        border-white/10
                        pt-5
                      "
                    >

                      <h4
                        className="
                          mb-4
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        Legend
                      </h4>


                      <div
                        className="
                          space-y-3
                          text-sm
                          text-slate-300
                        "
                      >

                        <div>
                          <span
                            className="
                              mr-2
                              text-cyan-400
                            "
                          >
                            ●
                          </span>

                          Infrastructure
                        </div>


                        <div>
                          <span
                            className="
                              mr-2
                              text-red-400
                            "
                          >
                            ●
                          </span>

                          Citizen Issues
                        </div>


                        <div>
                          <span
                            className="
                              mr-2
                              text-emerald-400
                            "
                          >
                            ●
                          </span>

                          Hospitals
                        </div>


                        <div>
                          <span
                            className="
                              mr-2
                              text-yellow-400
                            "
                          >
                            ●
                          </span>

                          Schools
                        </div>

                      </div>

                    </div>

                  </div>

                )}


                {/* =================================================
                    FILTER PANEL
                ================================================= */}

                {filtersOpen && (

                  <div
                    className="
                      absolute
                      left-6
                      top-6
                      z-[1000]
                      w-80
                      rounded-3xl
                      border
                      border-white/10
                      bg-slate-950/95
                      p-6
                      shadow-2xl
                      backdrop-blur-xl
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

                        <h3
                          className="
                            text-xl
                            font-semibold
                            text-white
                          "
                        >
                          Map Filters
                        </h3>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          Refine visible
                          infrastructure.
                        </p>

                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          setFiltersOpen(
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


                    <label
                      className="
                        mt-6
                        block
                        text-sm
                        text-slate-400
                      "
                    >
                      Infrastructure type
                    </label>


                    <select
                      value={
                        selectedType
                      }
                      onChange={(e) =>
                        setSelectedType(
                          e.target.value
                        )
                      }
                      className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-slate-900
                        px-4
                        py-3
                        text-white
                        outline-none
                      "
                    >

                      <option value="All">
                        All
                      </option>

                      <option value="Hospital">
                        Hospital
                      </option>

                      <option value="School">
                        School
                      </option>

                      <option value="Police">
                        Police
                      </option>

                      <option value="Metro">
                        Metro
                      </option>

                      <option value="Road">
                        Road
                      </option>

                    </select>


                    <button
                      type="button"
                      onClick={() => {

                        setSelectedType(
                          "All"
                        );

                        setSearch("");

                      }}
                      className="
                        mt-4
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-3
                        text-sm
                        text-slate-300
                        hover:bg-white/10
                      "
                    >
                      Clear Filters
                    </button>

                  </div>

                )}


                {/* =================================================
                    LEAFLET MAP
                ================================================= */}

                <MapContainer
                  center={[
                    28.6139,
                    77.209,
                  ]}
                  zoom={12}
                  zoomControl={false}
                  doubleClickZoom={
                    !drawMode &&
                    !measureMode
                  }
                  className="
                    h-full
                    w-full
                  "
                >

                  <ZoomControl
                    position="bottomright"
                  />


                  <MapInteractionController
                    drawMode={
                      drawMode
                    }
                    measureMode={
                      measureMode
                    }
                  />


                  <MapClickHandler
                    drawMode={
                      drawMode
                    }
                    measureMode={
                      measureMode
                    }
                    onMapClick={
                      handleMapClick
                    }
                    onDrawClick={
                      handleDrawClick
                    }
                    onMeasureClick={
                      handleMeasureClick
                    }
                  />


                  <TileLayer
                    attribution="
                      &copy; OpenStreetMap
                    "
                    url="
                      https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
                    "
                  />


                  {/* =================================================
                      DRAWING LINE
                  ================================================= */}

                  {drawingPoints.length > 0 && (

                    <>
                      <Polyline
                        positions={
                          drawingPoints.map(
                            (point) => [
                              point.latitude,
                              point.longitude,
                            ]
                          )
                        }
                        pathOptions={{
                          color:
                            "#22d3ee",
                          weight: 5,
                          dashArray:
                            drawMode
                              ? "10 10"
                              : undefined,
                        }}
                      />


                      {drawingPoints.map(
                        (
                          point,
                          index
                        ) => (

                          <CircleMarker
                            key={
                              `draw-${index}`
                            }
                            center={[
                              point.latitude,
                              point.longitude,
                            ]}
                            radius={6}
                            pathOptions={{
                              color:
                                "#22d3ee",
                              fillColor:
                                "#22d3ee",
                              fillOpacity: 1,
                            }}
                            interactive={
                              false
                            }
                          />

                        )
                      )}

                    </>

                  )}


                  {/* =================================================
                      MEASUREMENT LINE
                  ================================================= */}

                  {measurePoints.length > 0 && (

                    <>

                      <Polyline
                        positions={
                          measurePoints.map(
                            (point) => [
                              point.latitude,
                              point.longitude,
                            ]
                          )
                        }
                        pathOptions={{
                          color:
                            "#facc15",
                          weight: 4,
                        }}
                      />


                      {measurePoints.map(
                        (
                          point,
                          index
                        ) => (

                          <CircleMarker
                            key={
                              `measure-${index}`
                            }
                            center={[
                              point.latitude,
                              point.longitude,
                            ]}
                            radius={6}
                            pathOptions={{
                              color:
                                "#facc15",
                              fillColor:
                                "#facc15",
                              fillOpacity: 1,
                            }}
                            interactive={
                              false
                            }
                          />

                        )
                      )}

                    </>

                  )}


                  {/* =================================================
                      INFRASTRUCTURE MARKERS
                  ================================================= */}

                  {showInfrastructure &&
                    filteredInfrastructure.map(
                      (item) => {

                        const latitude =
                          Number(
                            item.latitude
                          );

                        const longitude =
                          Number(
                            item.longitude
                          );


                        if (
                          !Number.isFinite(
                            latitude
                          ) ||
                          !Number.isFinite(
                            longitude
                          )
                        ) {
                          return null;
                        }


                        return (

                          <Marker
                            key={
                              item._id
                            }
                            position={[
                              latitude,
                              longitude,
                            ]}

                            /*
                              IMPORTANT:
                              During Draw/Measure the
                              marker must NOT capture
                              the map click.
                            */

                            interactive={
                              !drawMode &&
                              !measureMode
                            }

                            eventHandlers={{
                              click: () => {

                                if (
                                  !drawMode &&
                                  !measureMode
                                ) {

                                  handleAssetClick(
                                    item
                                  );

                                }

                              },
                            }}
                          >

                            <Popup>

                              <div
                                className="
                                  min-w-[220px]
                                "
                              >

                                <h3
                                  className="
                                    text-lg
                                    font-bold
                                  "
                                >
                                  {item.name}
                                </h3>


                                <p>
                                  <strong>
                                    Type:
                                  </strong>{" "}
                                  {item.type}
                                </p>


                                <p>
                                  <strong>
                                    Sector:
                                  </strong>{" "}
                                  {item.sector}
                                </p>


                                <p>
                                  <strong>
                                    Status:
                                  </strong>{" "}
                                  {item.status}
                                </p>


                                <p>
                                  <strong>
                                    Utilization:
                                  </strong>{" "}
                                  {item.utilization}%
                                </p>


                                {item.capacity && (

                                  <p>
                                    <strong>
                                      Capacity:
                                    </strong>{" "}
                                    {Number(
                                      item.capacity
                                    ).toLocaleString()}
                                  </p>

                                )}


                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAssetClick(
                                      item
                                    )
                                  }
                                  className="
                                    mt-3
                                    w-full
                                    rounded-lg
                                    bg-cyan-500
                                    px-3
                                    py-2
                                    font-medium
                                    text-slate-950
                                  "
                                >
                                  View Details
                                </button>

                              </div>

                            </Popup>

                          </Marker>

                        );
                      }
                    )}


                  {/* =================================================
                      CITIZEN ISSUE MARKERS
                  ================================================= */}

                  {showIssues &&

                    issues

                      .filter(
                        (issue) =>
                          issue.latitude !=
                            null &&
                          issue.longitude !=
                            null
                      )

                      .map(
                        (issue) => {

                          const latitude =
                            Number(
                              issue.latitude
                            );

                          const longitude =
                            Number(
                              issue.longitude
                            );


                          if (
                            !Number.isFinite(
                              latitude
                            ) ||
                            !Number.isFinite(
                              longitude
                            )
                          ) {
                            return null;
                          }


                          return (

                            <Marker
                              key={
                                issue._id
                              }
                              position={[
                                latitude,
                                longitude,
                              ]}
                              interactive={
                                !drawMode &&
                                !measureMode
                              }
                            >

                              <Popup>

                                <div
                                  className="
                                    min-w-[220px]
                                  "
                                >

                                  <h3
                                    className="
                                      font-bold
                                    "
                                  >
                                    {issue.title}
                                  </h3>


                                  <p
                                    className="
                                      mt-2
                                      text-sm
                                    "
                                  >
                                    {
                                      issue.description
                                    }
                                  </p>


                                  <p
                                    className="
                                      mt-2
                                    "
                                  >
                                    <strong>
                                      Status:
                                    </strong>{" "}
                                    {
                                      issue.status
                                    }
                                  </p>


                                  <p>
                                    <strong>
                                      Category:
                                    </strong>{" "}
                                    {
                                      issue.category
                                    }
                                  </p>

                                </div>

                              </Popup>

                            </Marker>

                          );

                        }
                      )}

                </MapContainer>


                {/* =================================================
                    MAP STATISTICS
                ================================================= */}

                <div
                  className="
                    absolute
                    right-6
                    top-6
                    z-[900]
                    grid
                    gap-3
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/90
                      p-4
                      backdrop-blur-xl
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Population
                    </p>

                    <h3
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      1.2M
                    </h3>

                  </div>


                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/90
                      p-4
                      backdrop-blur-xl
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Coverage
                    </p>

                    <h3
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      91%
                    </h3>

                  </div>


                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/90
                      p-4
                      backdrop-blur-xl
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Infrastructure
                    </p>

                    <h3
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        infrastructure.length
                      }
                    </h3>

                  </div>


                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/90
                      p-4
                      backdrop-blur-xl
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Active Issues
                    </p>

                    <h3
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        issues.length
                      }
                    </h3>

                  </div>

                </div>


                {/* =================================================
                    DRAW / MEASURE STATUS
                ================================================= */}

                {(drawMode ||
                  measureMode) && (

                  <div
                    className="
                      absolute
                      bottom-6
                      left-1/2
                      z-[1000]
                      -translate-x-1/2
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/95
                      px-5
                      py-3
                      text-sm
                      text-white
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >

                    {drawMode ? (

                      <>

                        <span
                          className="
                            text-cyan-400
                          "
                        >
                          Drawing mode
                        </span>

                        {" — "}

                        click the map
                        to add points.

                        <span
                          className="
                            ml-2
                            text-slate-500
                          "
                        >
                          {
                            drawingPoints.length
                          }{" "}
                          point
                          {
                            drawingPoints.length ===
                            1
                              ? ""
                              : "s"
                          }
                        </span>

                      </>

                    ) : (

                      <>

                        <span
                          className="
                            text-yellow-400
                          "
                        >
                          Measuring mode
                        </span>

                        {" — "}

                        click the map
                        to measure.

                        <span
                          className="
                            ml-2
                            text-slate-500
                          "
                        >
                          {
                            measurePoints.length
                          }{" "}
                          point
                          {
                            measurePoints.length ===
                            1
                              ? ""
                              : "s"
                          }
                        </span>

                      </>

                    )}

                  </div>

                )}


                {/* =================================================
                    DISTANCE
                ================================================= */}

                {measurePoints.length >=
                  2 && (

                  <div
                    className="
                      absolute
                      bottom-6
                      right-6
                      z-[1000]
                      rounded-2xl
                      border
                      border-yellow-500/30
                      bg-slate-950/95
                      px-5
                      py-3
                      text-sm
                      text-white
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >

                    Distance:

                    <span
                      className="
                        ml-2
                        font-semibold
                        text-yellow-400
                      "
                    >
                      {(
                        calculateDistance() /
                        1000
                      ).toFixed(2)}{" "}
                      km
                    </span>

                  </div>

                )}


                {/* =================================================
                    SELECTED ASSET
                ================================================= */}

                {selectedAsset && (

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      z-[1000]
                      w-[340px]
                      max-w-[calc(100%-3rem)]
                      rounded-3xl
                      border
                      border-cyan-500/20
                      bg-slate-950/95
                      p-6
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-500/10
                            text-cyan-400
                          "
                        >

                          <Building2
                            size={20}
                          />

                        </div>


                        <div>

                          <h3
                            className="
                              font-semibold
                              text-white
                            "
                          >
                            {
                              selectedAsset.name
                            }
                          </h3>


                          <p
                            className="
                              text-xs
                              text-slate-400
                            "
                          >
                            {
                              selectedAsset.type
                            }
                          </p>

                        </div>

                      </div>


                      <button
                        type="button"
                        onClick={
                          closeDetails
                        }
                        className="
                          rounded-lg
                          p-1
                          text-slate-500
                          hover:bg-white/5
                          hover:text-white
                        "
                      >

                        <X size={18} />

                      </button>

                    </div>


                    {/* DETAILS GRID */}

                    <div
                      className="
                        mt-5
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      <div
                        className="
                          rounded-xl
                          bg-white/[0.03]
                          p-3
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Status
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            font-medium
                            text-green-400
                          "
                        >
                          {
                            selectedAsset.status
                          }
                        </p>

                      </div>


                      <div
                        className="
                          rounded-xl
                          bg-white/[0.03]
                          p-3
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Utilization
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            font-medium
                            text-white
                          "
                        >
                          {
                            selectedAsset.utilization
                          }%
                        </p>

                      </div>


                      <div
                        className="
                          rounded-xl
                          bg-white/[0.03]
                          p-3
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Capacity
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            font-medium
                            text-white
                          "
                        >
                          {
                            selectedAsset.capacity
                              ? Number(
                                  selectedAsset.capacity
                                ).toLocaleString()
                              : "Not specified"
                          }
                        </p>

                      </div>


                      <div
                        className="
                          rounded-xl
                          bg-white/[0.03]
                          p-3
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Sector
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            font-medium
                            text-white
                          "
                        >
                          {
                            selectedAsset.sector
                          }
                        </p>

                      </div>

                    </div>


                    {/* DESCRIPTION */}

                    {selectedAsset.description && (

                      <div
                        className="
                          mt-3
                          rounded-xl
                          bg-white/[0.03]
                          p-3
                        "
                      >

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Description
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            leading-relaxed
                            text-slate-300
                          "
                        >
                          {
                            selectedAsset.description
                          }
                        </p>

                      </div>

                    )}


                    {/* ACTIONS */}

                    <div
                      className="
                        mt-5
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      <button
                        type="button"
                        onClick={() => {

                          const latitude =
                            Number(
                              selectedAsset.latitude
                            );

                          const longitude =
                            Number(
                              selectedAsset.longitude
                            );


                          if (
                            Number.isFinite(
                              latitude
                            ) &&
                            Number.isFinite(
                              longitude
                            )
                          ) {

                            setSelectedLocation(
                              {
                                latitude,
                                longitude,
                              }
                            );

                            setSelectedAsset(
                              null
                            );

                          }

                        }}
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-white/10
                          bg-white/[0.03]
                          px-3
                          py-2
                          text-sm
                          text-slate-300
                          transition
                          hover:bg-white/5
                          hover:text-white
                        "
                      >

                        <Navigation
                          size={15}
                        />

                        Locate

                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          setAiOpen(
                            true
                          )
                        }
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-cyan-500
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-slate-950
                          transition
                          hover:bg-cyan-400
                        "
                      >

                        <Sparkles
                          size={15}
                        />

                        Analyze

                      </button>

                    </div>

                  </div>

                )}


                {/* =================================================
                    SELECTED LOCATION
                ================================================= */}

                {selectedLocation && (

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      z-[1000]
                      w-[340px]
                      max-w-[calc(100%-3rem)]
                      rounded-3xl
                      border
                      border-cyan-500/20
                      bg-slate-950/95
                      p-6
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-500/10
                            text-cyan-400
                          "
                        >

                          <MapPin
                            size={20}
                          />

                        </div>


                        <div>

                          <h3
                            className="
                              font-semibold
                              text-white
                            "
                          >
                            Selected Location
                          </h3>


                          <p
                            className="
                              text-xs
                              text-slate-400
                            "
                          >
                            Planning area
                          </p>

                        </div>

                      </div>


                      <button
                        type="button"
                        onClick={
                          closeDetails
                        }
                        className="
                          rounded-lg
                          p-1
                          text-slate-500
                          hover:bg-white/5
                          hover:text-white
                        "
                      >

                        <X size={18} />

                      </button>

                    </div>


                    <div
                      className="
                        mt-5
                        rounded-xl
                        bg-white/[0.03]
                        p-4
                      "
                    >

                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Latitude
                      </p>


                      <p
                        className="
                          mt-1
                          text-sm
                          text-white
                        "
                      >
                        {
                          selectedLocation.latitude.toFixed(
                            6
                          )
                        }
                      </p>


                      <p
                        className="
                          mt-3
                          text-xs
                          text-slate-500
                        "
                      >
                        Longitude
                      </p>


                      <p
                        className="
                          mt-1
                          text-sm
                          text-white
                        "
                      >
                        {
                          selectedLocation.longitude.toFixed(
                            6
                          )
                        }
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        setAiOpen(
                          true
                        )
                      }
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-cyan-500
                        px-4
                        py-3
                        font-medium
                        text-slate-950
                        transition
                        hover:bg-cyan-400
                      "
                    >

                      <Sparkles
                        size={16}
                      />

                      Analyze This Zone

                    </button>

                  </div>

                )}

              </div>

            </section>


            {/* =================================================
                AI URBAN INTELLIGENCE
            ================================================= */}

            <section
              className="
                mb-16
              "
            >

              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-4
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-3xl
                      font-semibold
                      text-white
                    "
                  >
                    AI Urban Intelligence
                  </h2>


                  <p
                    className="
                      mt-2
                      text-slate-400
                    "
                  >
                    Insights generated from
                    infrastructure and citizen
                    issue data.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setAiOpen(
                      true
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-cyan-500
                    px-6
                    py-3
                    font-semibold
                    text-slate-950
                    transition
                    hover:bg-cyan-400
                  "
                >

                  <Sparkles
                    size={18}
                  />

                  Open AI Assistant

                </button>

              </div>


              <div
                className="
                  grid
                  gap-6
                  lg:grid-cols-3
                "
              >

                {/* INFRASTRUCTURE */}

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
                      gap-2
                    "
                  >

                    <Activity
                      size={18}
                      className="
                        text-cyan-400
                      "
                    />

                    <h3
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      Infrastructure
                    </h3>

                  </div>


                  <p
                    className="
                      mt-4
                      text-slate-400
                    "
                  >

                    AI detected{" "}

                    <span
                      className="
                        font-semibold
                        text-cyan-400
                      "
                    >
                      {
                        infrastructure.filter(
                          (item) =>
                            Number(
                              item.utilization
                            ) > 80
                        ).length
                      }
                    </span>{" "}

                    highly utilized assets
                    requiring attention.

                  </p>

                </div>


                {/* ISSUES */}

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
                      gap-2
                    "
                  >

                    <AlertTriangle
                      size={18}
                      className="
                        text-red-400
                      "
                    />

                    <h3
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      Citizen Issues
                    </h3>

                  </div>


                  <p
                    className="
                      mt-4
                      text-slate-400
                    "
                  >

                    There are{" "}

                    <span
                      className="
                        font-semibold
                        text-red-400
                      "
                    >
                      {
                        issues.filter(
                          (issue) =>
                            issue.status ===
                            "Pending"
                        ).length
                      }
                    </span>{" "}

                    unresolved complaints.

                  </p>

                </div>


                {/* RECOMMENDATION */}

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
                      gap-2
                    "
                  >

                    <Sparkles
                      size={18}
                      className="
                        text-cyan-400
                      "
                    />

                    <h3
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      Urban Recommendation
                    </h3>

                  </div>


                  <p
                    className="
                      mt-4
                      text-slate-400
                    "
                  >
                    High-utilization healthcare
                    assets should be evaluated
                    before projected population
                    growth.
                  </p>

                </div>

              </div>

            </section>


            {/* =================================================
                URBAN METRICS
            ================================================= */}

            <section
              className="
                mb-16
              "
            >

              <h2
                className="
                  mb-8
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                Urban Metrics
              </h2>


              <div
                className="
                  grid
                  gap-6
                  md:grid-cols-2
                  xl:grid-cols-4
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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Total Infrastructure
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-white
                    "
                  >
                    {
                      infrastructure.length
                    }
                  </h2>

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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Citizen Issues
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-white
                    "
                  >
                    {
                      issues.length
                    }
                  </h2>

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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Operational Assets
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-white
                    "
                  >
                    {
                      infrastructure.filter(
                        (item) =>
                          item.status ===
                          "Operational"
                      ).length
                    }
                  </h2>

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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Pending Issues
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-white
                    "
                  >
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


            {/* =================================================
                INFRASTRUCTURE TABLE
            ================================================= */}

            <section
              className="
                mb-16
              "
            >

              <div
                className="
                  mb-8
                  flex
                  items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-3xl
                    font-semibold
                    text-white
                  "
                >
                  Infrastructure Assets
                </h2>


                <span
                  className="
                    rounded-full
                    bg-cyan-500/20
                    px-4
                    py-2
                    text-cyan-400
                  "
                >
                  {
                    filteredInfrastructure.length
                  }{" "}
                  Assets
                </span>

              </div>


              <div
                className="
                  overflow-x-auto
                  rounded-3xl
                  border
                  border-white/10
                "
              >

                <table
                  className="
                    w-full
                  "
                >

                  <thead
                    className="
                      bg-white/5
                    "
                  >

                    <tr>

                      <th
                        className="
                          p-4
                          text-left
                        "
                      >
                        Name
                      </th>


                      <th
                        className="
                          p-4
                          text-left
                        "
                      >
                        Type
                      </th>


                      <th
                        className="
                          p-4
                          text-left
                        "
                      >
                        Sector
                      </th>


                      <th
                        className="
                          p-4
                          text-left
                        "
                      >
                        Status
                      </th>


                      <th
                        className="
                          p-4
                          text-left
                        "
                      >
                        Utilization
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredInfrastructure.map(
                      (item) => (

                        <tr
                          key={
                            item._id
                          }
                          className="
                            border-t
                            border-white/10
                            transition
                            hover:bg-white/[0.03]
                          "
                        >

                          <td
                            className="
                              p-4
                            "
                          >
                            {
                              item.name
                            }
                          </td>


                          <td
                            className="
                              p-4
                            "
                          >
                            {
                              item.type
                            }
                          </td>


                          <td
                            className="
                              p-4
                            "
                          >
                            {
                              item.sector
                            }
                          </td>


                          <td
                            className="
                              p-4
                            "
                          >

                            <span
                              className={`
                                rounded-full
                                px-3
                                py-1
                                text-sm

                                ${
                                  item.status ===
                                  "Operational"
                                    ? `
                                      bg-green-500/20
                                      text-green-400
                                    `
                                    : `
                                      bg-yellow-500/20
                                      text-yellow-400
                                    `
                                }
                              `}
                            >
                              {
                                item.status
                              }
                            </span>

                          </td>


                          <td
                            className="
                              p-4
                            "
                          >
                            {
                              item.utilization
                            }%
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </section>


            {/* =================================================
                DEMAND FORECAST
            ================================================= */}

            <section
              className="
                mb-16
              "
            >

              <h2
                className="
                  mb-8
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                Demand Forecast
              </h2>


              <div
                className="
                  grid
                  gap-6
                  lg:grid-cols-3
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

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    Healthcare
                  </h3>


                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    AI predicts a 23%
                    increase in healthcare
                    demand over the next
                    five years.
                  </p>

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

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    Transportation
                  </h3>


                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    Public transport demand
                    is expected to increase by
                    18% in the city center.
                  </p>

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

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    Education
                  </h3>


                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    Two additional schools
                    are recommended for newly
                    developing residential
                    zones.
                  </p>

                </div>

              </div>

            </section>


            {/* =================================================
                INFRASTRUCTURE HEALTH
            ================================================= */}

            <section
              className="
                mb-16
              "
            >

              <h2
                className="
                  mb-8
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                Infrastructure Health
              </h2>


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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Water
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    94%
                  </h2>

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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Electricity
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-green-400
                    "
                  >
                    98%
                  </h2>

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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Roads
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-yellow-400
                    "
                  >
                    86%
                  </h2>

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

                  <h3
                    className="
                      text-slate-400
                    "
                  >
                    Public Safety
                  </h3>


                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-bold
                      text-red-400
                    "
                  >
                    91%
                  </h2>

                </div>

              </div>

            </section>


            {/* =================================================
                AI SCENARIO OPPORTUNITIES
            ================================================= */}

            <section
              className="
                mb-16
              "
            >

              <h2
                className="
                  mb-8
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                AI Scenario Opportunities
              </h2>


              <div
                className="
                  grid
                  gap-6
                  lg:grid-cols-3
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

                  <h3
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    New Hospital
                  </h3>


                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    Build a 250-bed
                    hospital in the
                    north-west region
                    to reduce travel
                    time by 18%.
                  </p>

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

                  <h3
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    Smart Traffic Signals
                  </h3>


                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    AI recommends adaptive
                    traffic control for five
                    high-congestion
                    intersections.
                  </p>

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

                  <h3
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    Green Corridor
                  </h3>


                  <p
                    className="
                      mt-3
                      text-slate-400
                    "
                  >
                    Develop a green mobility
                    corridor connecting
                    major public institutions.
                  </p>

                </div>

              </div>

            </section>

          </div>

        </main>

      </div>


      {/* =================================================
          AI DRAWER
      ================================================= */}

      <AIAssistantDrawer
        open={aiOpen}
        onClose={() =>
          setAiOpen(false)
        }
      />

    </div>
  );
}