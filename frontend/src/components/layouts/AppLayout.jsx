import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { useLayoutStore } from "../../store/layoutStore";
import { useThemeStore } from "../../store/themeStore";

import { useState } from "react";

export default function AppLayout() {
  const { darkMode } = useThemeStore();

  const sidebarState = useLayoutStore(
    (state) => state.sidebarState
  );

  const location = useLocation();
  const navigate = useNavigate();

  // ==========================================
  // DEMO MODE
  // ==========================================

  const isDemoMode =
    location.pathname.startsWith("/demo");

  // ==========================================
  // DEMO BANNER
  // ==========================================

  const [showDemoBanner, setShowDemoBanner] =
    useState(true);

  return (
    <div
      className={`
        flex
        h-screen
        w-full
        overflow-hidden
        transition-colors
        duration-300

        ${
          darkMode
            ? "bg-[#0B1220] text-white"
            : "bg-slate-100 text-slate-900"
        }
      `}
    >

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <Sidebar />


      {/* =====================================
          MAIN AREA
      ====================================== */}

      <div
        className={`
          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden

          ${
            darkMode
              ? "bg-[#0B1220]"
              : "bg-slate-50"
          }
        `}
      >

        {/* ===================================
            TOPBAR
        ==================================== */}

        <Topbar />


        {/* ===================================
            DEMO ANNOUNCEMENT
        ==================================== */}

        {isDemoMode &&
          showDemoBanner && (
            <div
              className="
                relative
                z-30
                border-b
                border-cyan-500/20
                bg-cyan-500/[0.06]
                px-4
                py-3
                backdrop-blur-xl
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  max-w-7xl
                  items-center
                  gap-3
                "
              >

                {/* ICON */}

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    text-cyan-400
                  "
                >
                  <Sparkles size={18} />
                </div>


                {/* MESSAGE */}

                <div className="min-w-0 flex-1">

                  <p
                    className="
                      text-sm
                      leading-relaxed
                      text-slate-300
                    "
                  >

                    <span
                      className="
                        font-semibold
                        text-cyan-400
                      "
                    >
                      Demo Mode
                    </span>

                    <span className="mx-2 text-slate-600">
                      •
                    </span>

                    You're exploring a limited
                    preview of UrbanMind.

                    <span className="hidden md:inline">
                      {" "}
                      Explore the core platform
                      without an account. For full
                      features and role-specific
                      capabilities, sign in as a{" "}
                    </span>

                    <span
                      className="
                        hidden
                        font-medium
                        text-white
                        lg:inline
                      "
                    >
                      Citizen, Planner, Analyst,
                      or Admin.
                    </span>

                  </p>

                </div>


                {/* FULL PLATFORM BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/auth/login")
                  }
                  className="
                    hidden
                    shrink-0
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-cyan-500/30
                    bg-cyan-500/10
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-cyan-400
                    transition
                    hover:border-cyan-400/50
                    hover:bg-cyan-500/20
                    hover:text-cyan-300
                    md:flex
                  "
                >
                  Sign In
                  <ArrowRight size={14} />
                </button>


                {/* CLOSE */}

                <button
                  type="button"
                  onClick={() =>
                    setShowDemoBanner(false)
                  }
                  className="
                    shrink-0
                    rounded-lg
                    p-2
                    text-slate-500
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
                  aria-label="Close demo notice"
                >
                  <X size={17} />
                </button>

              </div>

            </div>
          )}


        {/* ===================================
            PAGE CONTENT
        ==================================== */}

        <main
          className={`
            min-h-0
            flex-1
            overflow-y-auto

            ${
              darkMode
                ? "urban-gradient"
                : "bg-slate-50"
            }
          `}
        >

          <div
            className="
              min-h-full
              w-full
            "
          >

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}