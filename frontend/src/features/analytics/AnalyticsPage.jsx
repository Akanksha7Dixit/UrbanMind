// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useAuthStore,
// } from "../../store/authStore";

// import {
//   getAnalytics,
// } from "../../services/analyticsService";

// import {
//   BarChart3,
//   Building2,
//   AlertTriangle,
//   CheckCircle2,
// } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// export default function AnalyticsPage() {

//   const token =
//     useAuthStore(
//       (state) => state.token
//     );

//   const [
//     analytics,
//     setAnalytics,
//   ] = useState(null);

//   useEffect(() => {
//     const fetchAnalytics =
//       async () => {
//         try {
//           const data =
//             await getAnalytics(
//               token
//             );
//           setAnalytics(
//             data.analytics
//           );
//         } catch (error) {
//           console.error(error);
//         }
//       };

//     if (token) {

//       fetchAnalytics();

//     }

//   }, [token]);

//   if (!analytics) {

//     return (
//       <div className="p-8">
//         Loading Analytics...
//       </div>
//     );

//   }

//   const infrastructureData = [
//     {
//       name: "Operational",
//       value:
//         analytics.operationalInfrastructure,
//     },

//     {
//       name: "Maintenance",
//       value:
//         analytics.maintenanceInfrastructure,
//     },

//     {
//       name: "Construction",
//       value:
//         analytics.constructionInfrastructure,
//     },

//   ];

//   const issueData = [

//     {
//       name: "Pending",
//       value:
//         analytics.pendingIssues,
//     },

//     {
//       name: "In Progress",
//       value:
//         analytics.inProgressIssues,
//     },

//     {
//       name: "Resolved",
//       value:
//         analytics.resolvedIssues,
//     },

//   ];

//   return (

//     <div className="space-y-8 p-8">

//       {/* ================= HEADER ================= */}

//       <div>

//         <h1 className="text-4xl font-bold">

//           Analytics Dashboard

//         </h1>

//         <p className="mt-2 text-slate-400">

//           Monitor infrastructure performance,
//           citizen engagement and city health
//           using real-time analytics.

//         </p>

//       </div>

//       {/* ================= HERO ================= */}

//       <section
//         className="
//       rounded-3xl
//       border border-cyan-500/20
//       bg-cyan-500/5
//       p-8
//     "
//       >

//         <div className="flex items-center gap-3">

//           <BarChart3
//             className="text-cyan-400"
//           />

//           <p className="text-cyan-400">

//             Urban Analytics

//           </p>

//         </div>

//         <h2 className="mt-4 text-5xl font-bold">

//           Live City Intelligence

//         </h2>

//         <p className="mt-5 max-w-3xl text-slate-400">

//           UrbanMind continuously monitors
//           infrastructure assets, citizen
//           issues and operational status to
//           provide planners with actionable
//           insights.

//         </p>

//       </section>

//       {/* ================= KPI ================= */}

//       <div className="grid gap-6 lg:grid-cols-4">
//         <div className="ai-card">
//           <Building2
//             className="text-cyan-400"
//           />
//           <h2 className="mt-4 text-5xl font-bold">
//             {analytics.totalInfrastructure}
//           </h2>
//           <p className="mt-2 text-slate-400">
//             Infrastructure
//           </p>
//         </div>
//         <div className="ai-card">
//           <AlertTriangle
//             className="text-red-400"
//           />
//           <h2 className="mt-4 text-5xl font-bold">
//             {analytics.totalIssues}
//           </h2>
//           <p className="mt-2 text-slate-400">
//             Citizen Issues
//           </p>
//         </div>
//         <div className="ai-card">
//           <CheckCircle2
//             className="text-green-400"
//           />
//           <h2 className="mt-4 text-5xl font-bold">
//             {analytics.operationalInfrastructure}
//           </h2>
//           <p className="mt-2 text-slate-400">
//             Operational
//           </p>
//         </div>
//         <div className="ai-card">

//           <BarChart3
//             className="text-cyan-400"
//           />
//           <h2 className="mt-4 text-5xl font-bold">
//             {analytics.resolvedIssues}
//           </h2>
//           <p className="mt-2 text-slate-400"> Resolved Issues</p>
//         </div>
        
//       </div>
//       <section>

//           <h2 className="mb-6 text-2xl font-semibold">
//             Infrastructure Analytics
//           </h2>

//           <div className="grid gap-6 lg:grid-cols-2">

//             <div className="ai-card">

//               <h3 className="mb-4 text-xl font-semibold">
//                 Infrastructure Status
//               </h3>

//               <div className="h-80">

//                 <ResponsiveContainer>

//                   <PieChart>

//                     <Pie
//                       data={infrastructureData}
//                       dataKey="value"
//                       nameKey="name"
//                       outerRadius={100}
//                     >

//                       <Cell fill="#22c55e" />

//                       <Cell fill="#f59e0b" />

//                       <Cell fill="#ef4444" />

//                     </Pie>

//                     <Tooltip />

//                   </PieChart>

//                 </ResponsiveContainer>

//               </div>

//             </div>

//             <div className="ai-card">

//               <h3 className="mb-4 text-xl font-semibold">
//                 Issue Status
//               </h3>

//               <div className="h-80">

//                 <ResponsiveContainer>

//                   <BarChart data={issueData}>

//                     <CartesianGrid strokeDasharray="3 3" />

//                     <XAxis dataKey="name" />

//                     <YAxis />

//                     <Tooltip />

//                     <Bar
//                       dataKey="value"
//                       fill="#06b6d4"
//                     />

//                   </BarChart>

//                 </ResponsiveContainer>

//               </div>

//             </div>

//           </div>

//         </section>

//         <section className="ai-card">

//           <h2 className="text-2xl font-semibold">
//             AI Insights
//           </h2>

//           <p className="mt-5 text-slate-400">

//             UrbanMind analyzed all infrastructure
//             assets and citizen issues to generate
//             the following summary.

//           </p>

//           <div className="mt-8 grid gap-6 lg:grid-cols-3">

//             <div>

//               <h3 className="font-semibold">

//                 Operational

//               </h3>

//               <p className="text-5xl font-bold text-green-400">

//                 {analytics.operationalInfrastructure}

//               </p>

//             </div>

//             <div>

//               <h3 className="font-semibold">

//                 Pending Issues

//               </h3>

//               <p className="text-5xl font-bold text-yellow-400">

//                 {analytics.pendingIssues}

//               </p>

//             </div>

//             <div>

//               <h3 className="font-semibold">

//                 Resolved

//               </h3>

//               <p className="text-5xl font-bold text-cyan-400">

//                 {analytics.resolvedIssues}

//               </p>

//             </div>

//           </div>

//         </section>
//         </div>
//     );
// }

import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  getAnalytics,
} from "../../services/analyticsService";

import {
  BarChart3,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Brain,
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

  const token =
    useAuthStore(
      (state) => state.token
    );

  const [
    analytics,
    setAnalytics,
  ] = useState(null);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const data =
            await getAnalytics(
              token
            );

          setAnalytics(
            data.analytics
          );

        } catch (error) {

          console.error(error);

        }

      };

    if (token) {

      fetchAnalytics();

    }

  }, [token]);

  if (!analytics) {

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

  const infrastructureData = [

    {
      name: "Operational",
      value:
        analytics.operationalInfrastructure,
    },

    {
      name: "Maintenance",
      value:
        analytics.maintenanceInfrastructure,
    },

    {
      name: "Construction",
      value:
        analytics.constructionInfrastructure,
    },

  ];

  const issueData = [

    {
      name: "Pending",
      value:
        analytics.pendingIssues,
    },

    {
      name: "In Progress",
      value:
        analytics.inProgressIssues,
    },

    {
      name: "Resolved",
      value:
        analytics.resolvedIssues,
    },

  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

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
          engagement using real-time
          analytics.

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

          <BarChart3
            className="text-cyan-400"
          />

          <p className="text-cyan-400">

            Urban Analytics

          </p>

        </div>

        <h2 className="mt-5 text-5xl font-bold">

          Live City Intelligence

        </h2>

        <p className="mt-5 max-w-3xl text-slate-400">

          UrbanMind continuously monitors
          infrastructure assets, maintenance
          activity and citizen issues to
          provide actionable planning
          insights.

        </p>

      </section>
            {/* ================= KPI CARDS ================= */}

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="ai-card">

          <Building2
            className="text-cyan-400"
          />

          <h2 className="mt-4 text-5xl font-bold">

            {analytics.totalInfrastructure}

          </h2>

          <p className="mt-2 text-slate-400">

            Total Infrastructure

          </p>

        </div>

        <div className="ai-card">

          <AlertTriangle
            className="text-red-400"
          />

          <h2 className="mt-4 text-5xl font-bold">

            {analytics.totalIssues}

          </h2>

          <p className="mt-2 text-slate-400">

            Citizen Issues

          </p>

        </div>

        <div className="ai-card">

          <CheckCircle2
            className="text-green-400"
          />

          <h2 className="mt-4 text-5xl font-bold">

            {analytics.operationalInfrastructure}

          </h2>

          <p className="mt-2 text-slate-400">

            Operational Assets

          </p>

        </div>

        <div className="ai-card">

          <BarChart3
            className="text-cyan-400"
          />

          <h2 className="mt-4 text-5xl font-bold">

            {analytics.resolvedIssues}

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

              {analytics.operationalInfrastructure}

            </h3>

          </div>

          <div>

            <p className="text-slate-400">

              Maintenance

            </p>

            <h3 className="mt-3 text-4xl font-bold text-yellow-400">

              {analytics.maintenanceInfrastructure}

            </h3>

          </div>

          <div>

            <p className="text-slate-400">

              Construction

            </p>

            <h3 className="mt-3 text-4xl font-bold text-red-400">

              {analytics.constructionInfrastructure}

            </h3>

          </div>

          <div>

            <p className="text-slate-400">

              Pending Issues

            </p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">

              {analytics.pendingIssues}

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

        <ResponsiveContainer width="100%" height="100%">

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

              {infrastructureData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

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

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={issueData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

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

        {Math.round(
          (analytics.operationalInfrastructure /
            analytics.totalInfrastructure) *
            100
        ) || 0}%

      </h2>

    </div>

    <div className="ai-card">

      <p className="text-slate-400">

        Issue Resolution

      </p>

      <h2 className="mt-4 text-5xl font-bold text-cyan-400">

        {Math.round(
          (analytics.resolvedIssues /
            analytics.totalIssues) *
            100
        ) || 0}%

      </h2>

    </div>

    <div className="ai-card">

      <p className="text-slate-400">

        Pending Issues

      </p>

      <h2 className="mt-4 text-5xl font-bold text-yellow-400">

        {analytics.pendingIssues}

      </h2>

    </div>

  </div>

</section>

      {/* ================= AI INSIGHTS ================= */}

      <section
        className="
          rounded-3xl
          border border-cyan-500/20
          bg-cyan-500/5
          p-8
        "
      >

        <div className="flex items-center gap-3">

          <Brain
            className="text-cyan-400"
          />

          <h2 className="text-2xl font-bold">

            AI Insights

          </h2>

        </div>

        <p className="mt-6 leading-8 text-slate-400">

          UrbanMind AI has analyzed the
          current city infrastructure,
          operational health and citizen
          issues.

          <br /><br />

          Based on current analytics, the
          city maintains a healthy level of
          operational infrastructure while
          requiring attention towards
          pending citizen complaints and
          maintenance activities.

        </p>

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
                ✅ Total Infrastructure :
                {" "}
                {analytics.totalInfrastructure}
              </li>

              <li>
                ✅ Operational Assets :
                {" "}
                {analytics.operationalInfrastructure}
              </li>

              <li>
                ⚠ Maintenance Assets :
                {" "}
                {analytics.maintenanceInfrastructure}
              </li>

              <li>
                🚧 Under Construction :
                {" "}
                {analytics.constructionInfrastructure}
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold">

              Citizen Issues

            </h3>

            <ul className="mt-4 space-y-3 text-slate-400">

              <li>
                📌 Total Issues :
                {" "}
                {analytics.totalIssues}
              </li>

              <li>
                🟡 Pending :
                {" "}
                {analytics.pendingIssues}
              </li>

              <li>
                🔵 In Progress :
                {" "}
                {analytics.inProgressIssues}
              </li>

              <li>
                🟢 Resolved :
                {" "}
                {analytics.resolvedIssues}
              </li>

            </ul>

          </div>

        </div>

      </section>

      {/* ================= FUTURE RECOMMENDATIONS ================= */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-white/[0.02]
          p-8
        "
      >

        <h2 className="text-2xl font-bold">

          AI Suggested Next Actions

        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="ai-card">

            <h3 className="font-semibold">

              Infrastructure

            </h3>

            <p className="mt-3 text-slate-400">

              Prioritize maintenance of
              aging infrastructure to
              improve operational health.

            </p>

          </div>

          <div className="ai-card">

            <h3 className="font-semibold">

              Citizen Services

            </h3>

            <p className="mt-3 text-slate-400">

              Resolve pending complaints
              quickly to improve citizen
              satisfaction.

            </p>

          </div>

          <div className="ai-card">

            <h3 className="font-semibold">

              Urban Planning

            </h3>

            <p className="mt-3 text-slate-400">

              Continue expanding
              infrastructure in
              high-growth zones based
              on AI recommendations.

            </p>

          </div>

        </div>

      </section>

    </div>

  );

}