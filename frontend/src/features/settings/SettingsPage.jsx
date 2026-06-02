import {
  User,
  Building2,
  Bell,
  Sparkles,
  Shield,
  Map,
  Server,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 p-8">

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
          Platform Configuration
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Settings Center
        </h1>

        <p className="mt-4 max-w-3xl text-slate-400">
          Manage platform preferences,
          organization configuration and
          security settings.
        </p>
      </section>

      {/* PROFILE */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <User size={22} />
          <h2 className="text-2xl font-semibold">
            Profile Settings
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Full Name"
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />

          <input
            placeholder="Email"
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />
        </div>
      </section>

      {/* ORGANIZATION */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Building2 size={22} />
          <h2 className="text-2xl font-semibold">
            Organization
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="City Name"
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />

          <input
            placeholder="Department"
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />
        </div>
      </section>

      {/* NOTIFICATIONS */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Bell size={22} />
          <h2 className="text-2xl font-semibold">
            Notifications
          </h2>
        </div>

        <div className="mt-6 space-y-4">

          <label className="flex items-center justify-between">
            <span>AI Recommendations</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between">
            <span>Infrastructure Alerts</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between">
            <span>Citizen Reports</span>
            <input type="checkbox" defaultChecked />
          </label>

        </div>
      </section>

      {/* AI CONFIG */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Sparkles size={22} />
          <h2 className="text-2xl font-semibold">
            AI Configuration
          </h2>
        </div>

        <div className="mt-6">
          <select className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
            <option>Balanced Mode</option>
            <option>Fast Mode</option>
            <option>Accuracy Mode</option>
          </select>
        </div>
      </section>

      {/* GIS */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Map size={22} />
          <h2 className="text-2xl font-semibold">
            GIS Configuration
          </h2>
        </div>

        <div className="mt-6">
          <select className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
            <option>Dark Theme</option>
            <option>Satellite View</option>
            <option>Terrain View</option>
          </select>
        </div>
      </section>

      {/* SECURITY */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Shield size={22} />
          <h2 className="text-2xl font-semibold">
            Security & Access
          </h2>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="rounded-xl border border-white/10 px-5 py-3">
            Change Password
          </button>

          <button className="rounded-xl border border-red-500/20 text-red-400 px-5 py-3">
            Logout
          </button>
        </div>
      </section>

      {/* SYSTEM */}

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <Server size={22} />
          <h2 className="text-2xl font-semibold">
            System Information
          </h2>
        </div>

        <div className="mt-6 space-y-2 text-slate-400">
          <p>UrbanMind v1.0.0</p>
          <p>Environment: Development</p>
          <p>GIS Engine: Leaflet</p>
          <p>AI Engine: Urban Intelligence Core</p>
        </div>
      </section>

    </div>
  );
}