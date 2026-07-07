import { useEffect, useState } from "react";

import {
  User,
  Building2,
  Bell,
  Sparkles,
  Shield,
  Map,
  Server,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  useSettings,
  useUpdateSettings,
  useResetSettings,
} from "./hooks/useSettings";

import { useAuthStore } from "../../store/authStore";

export default function SettingsPage() {

  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const {
    data,
    isLoading,
  } = useSettings();

  const updateMutation =
    useUpdateSettings();

  const resetMutation =
    useResetSettings();

  const [settings, setSettings] =
    useState({

      profile: {

        fullName: "",

        email: "",

        city: "",

        department: "",

      },

      notifications: {

        ai: true,

        infrastructure: true,

        citizen: true,

      },

      aiMode: "Balanced",

      gisTheme: "Dark",

    });

  useEffect(() => {

    if (data) {

      setSettings(data);

    }

  }, [data]);

  const handleChange = (
    section,
    field,
    value
  ) => {

    setSettings((prev) => ({

      ...prev,

      [section]: {

        ...prev[section],

        [field]: value,

      },

    }));

  };

  const handleSave = async () => {

    try {

      await updateMutation.mutateAsync(settings);

      toast.success(
        "Settings Saved"
      );

    }

    catch {

      toast.error(
        "Unable to save"
      );

    }

  };

  const handleReset = async () => {

    try {

      const result =

        await resetMutation.mutateAsync();

      setSettings(result);

      toast.success(
        "Settings Reset"
      );

    }

    catch {

      toast.error(
        "Unable to reset"
      );

    }

  };

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  if(isLoading){

return(

<div className="p-8">

Loading Settings...

</div>

);

}

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

            value={
              settings.profile.fullName
            }

            onChange={(e) =>

              handleChange(

                "profile",

                "fullName",

                e.target.value

              )

            }

            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />

          <input

            value={
              settings.profile.email
            }

            onChange={(e) =>

              handleChange(

                "profile",

                "email",

                e.target.value

              )

            }

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

            value={
              settings.profile.city
            }

            onChange={(e) =>

              handleChange(

                "profile",

                "city",

                e.target.value

              )

            }

            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"
          />

          <input

            value={
              settings.profile.department
            }

            onChange={(e) =>

              handleChange(

                "profile",

                "department",

                e.target.value

              )

            }

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
            <input
              type="checkbox"
              checked={settings.notifications.ai}
              onChange={(e) =>
                handleChange(
                  "notifications",
                  "ai",
                  e.target.checked
                )
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Infrastructure Alerts</span>
            <input
              type="checkbox"
              checked={settings.notifications.infrastructure}
              onChange={(e) =>
                handleChange(
                  "notifications",
                  "infrastructure",
                  e.target.checked
                )
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Citizen Reports</span>
            <input
              type="checkbox"
              checked={settings.notifications.citizen}
              onChange={(e) =>
                handleChange(
                  "notifications",
                  "citizen",
                  e.target.checked
                )
              }
            />
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
          <select

            value={settings.aiMode}

            onChange={(e) =>

              setSettings({

                ...settings,

                aiMode: e.target.value,

              })

            }

            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"

          >

            <option value="Balanced">
              Balanced
            </option>

            <option value="Fast">
              Fast
            </option>

            <option value="Accurate">
              Accurate
            </option>
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
          <select

            value={settings.gisTheme}

            onChange={(e) =>

              setSettings({

                ...settings,

                gisTheme: e.target.value,

              })

            }

            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3"

          >
            <option value="Dark">
              Dark
            </option>

            <option value="Satellite">
              Satellite
            </option>

            <option value="Street">
              Street
            </option>
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
          <button
            className="rounded-xl border border-white/10 px-5 py-3"
            onClick={() =>
              toast(
                "Change Password coming soon."
              )}  >
            Change Password
          </button>

          <button

onClick={handleLogout}

className="rounded-xl border border-red-500/20 text-red-400 px-5 py-3"

>

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

      <section
className="flex justify-end gap-4"
>

<button

onClick={handleReset}

className="rounded-xl border border-white/10 px-6 py-3"

>

Reset

</button>

<button

onClick={handleSave}

disabled={updateMutation.isPending}

className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950"

>

{

updateMutation.isPending

?

"Saving..."

:

"Save Changes"

}

</button>

</section>

    </div>
  );
}