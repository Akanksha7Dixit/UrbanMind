import {
  Users,
  MessageSquare,
  AlertTriangle,
  Smile,
  Wrench,
  TrendingUp,
} from "lucide-react";

export default function CitizenPortal() {
  return (
    <div className="space-y-8 p-8">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Citizen Portal
        </h1>

        <p className="mt-2 text-slate-400">
          Community engagement, feedback and public service monitoring.
        </p>
      </div>

      {/* HERO */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-cyan-950/20
          via-slate-950
          to-indigo-950/20
          p-8
        "
      >
        <p className="text-cyan-400">
          Community Overview
        </p>

        <h2 className="mt-4 text-5xl font-bold">
          125,000 Active Citizens
        </h2>

        <p className="mt-4 max-w-3xl text-slate-400">
          Monitor community feedback, service requests,
          satisfaction scores and engagement trends.
        </p>
      </section>

      {/* KPI */}

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="ai-card">
          <Users />
          <h3 className="mt-4 text-4xl font-bold">
            125K
          </h3>
          <p className="text-slate-400">
            Registered Citizens
          </p>
        </div>

        <div className="ai-card">
          <MessageSquare />
          <h3 className="mt-4 text-4xl font-bold">
            4,820
          </h3>
          <p className="text-slate-400">
            Feedback Entries
          </p>
        </div>

        <div className="ai-card">
          <Wrench />
          <h3 className="mt-4 text-4xl font-bold">
            312
          </h3>
          <p className="text-slate-400">
            Active Requests
          </p>
        </div>

        <div className="ai-card">
          <Smile />
          <h3 className="mt-4 text-4xl font-bold">
            87%
          </h3>
          <p className="text-slate-400">
            Satisfaction
          </p>
        </div>

      </div>

      {/* ACTIVE ISSUES */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Active Issues
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="ai-card">
            <AlertTriangle className="text-red-400" />

            <h3 className="mt-4 font-semibold">
              Road Damage
            </h3>

            <p className="mt-3 text-slate-400">
              Sector 8 reported potholes.
            </p>
          </div>

          <div className="ai-card">
            <AlertTriangle className="text-amber-400" />

            <h3 className="mt-4 font-semibold">
              Water Supply
            </h3>

            <p className="mt-3 text-slate-400">
              Reduced pressure complaints.
            </p>
          </div>

          <div className="ai-card">
            <AlertTriangle className="text-cyan-400" />

            <h3 className="mt-4 font-semibold">
              Street Lighting
            </h3>

            <p className="mt-3 text-slate-400">
              Maintenance request pending.
            </p>
          </div>

        </div>
      </section>

      {/* FEEDBACK */}

      <section
        className="
          rounded-3xl
          border border-white/10
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          Public Feedback
        </h2>

        <div className="mt-6 space-y-4">

          <div className="rounded-2xl bg-white/[0.03] p-4">
            Healthcare services improved significantly.
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-4">
            Public transport frequency should increase.
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-4">
            New green corridors are highly appreciated.
          </div>

        </div>
      </section>

      {/* ENGAGEMENT */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Engagement Analytics
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="ai-card">
            <TrendingUp />

            <h3 className="mt-4 text-4xl font-bold">
              +24%
            </h3>

            <p className="text-slate-400">
              Citizen Participation
            </p>
          </div>

          <div className="ai-card">
            <TrendingUp />

            <h3 className="mt-4 text-4xl font-bold">
              +16%
            </h3>

            <p className="text-slate-400">
              Issue Resolution
            </p>
          </div>

          <div className="ai-card">
            <TrendingUp />

            <h3 className="mt-4 text-4xl font-bold">
              +12%
            </h3>

            <p className="text-slate-400">
              Satisfaction Growth
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}