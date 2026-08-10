import {
  NavLink,
  useLocation,
} from "react-router-dom";

import { NAV_GROUPS } from "../../constants/navigation";

import { useAuthStore } from "../../store/authStore";

import { useLayoutStore } from "../../store/layoutStore";


export default function Sidebar() {

  const user = useAuthStore(
    (state) => state.user
  );

  const sidebarState = useLayoutStore(
    (state) => state.sidebarState
  );

  const location = useLocation();


  // ==========================================
  // DEMO MODE
  // ==========================================

  const isDemoMode =
    location.pathname.startsWith("/demo");


  // ==========================================
  // FEATURES AVAILABLE IN RECRUITER DEMO
  // ==========================================

  const DEMO_PATHS = [
    "/dashboard",
    "/gis",
    "/simulation",
    "/ai-recommendations",
    "/analytics",
    "/reports",
  ];


  // ==========================================
  // CREATE NAVIGATION LINK
  // ==========================================

  const getNavigationPath = (path) => {

    if (!isDemoMode) {
      return path;
    }

    // Dashboard
    if (path === "/dashboard") {
      return "/demo";
    }

    // Other demo features
    return `/demo${path}`;
  };


  return (

    <aside
      className={`
        fixed
        lg:relative
        left-0
        top-0
        z-50
        h-screen

        border-r
        border-white/10

        bg-slate-950/95
        backdrop-blur-xl

        flex
        flex-col

        transition-all
        duration-300

        ${
          sidebarState === "expanded"
            ? "w-72 translate-x-0"
            : sidebarState === "collapsed"
              ? "w-20 translate-x-0"
              : "-translate-x-full lg:w-0"
        }
      `}
    >

      {/* =====================================
          SIDEBAR HEADER
      ====================================== */}

      <div
        className={`
          border-b
          border-white/10
          p-6

          ${
            sidebarState === "collapsed"
              ? "flex justify-center"
              : ""
          }
        `}
      >

        {sidebarState === "expanded" ? (

          <div>

            <h1 className="text-2xl font-bold text-white">
              UrbanMind
            </h1>

            {isDemoMode ? (

              <>
                <div className="mt-3">

                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-cyan-500/20
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-cyan-400
                    "
                  >
                    Demo Mode
                  </span>

                </div>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-slate-400
                  "
                >
                  Explore Smart City Intelligence
                </p>
              </>

            ) : (

              <>
                <div className="mt-3">

                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-cyan-500/20
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-cyan-400
                    "
                  >
                    Development
                  </span>

                </div>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-slate-400
                  "
                >
                  Smart City Intelligence
                </p>
              </>

            )}

          </div>

        ) : sidebarState === "collapsed" ? (

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-lg
              font-bold
              text-cyan-400
            "
          >
            U
          </div>

        ) : null}

      </div>


      {/* =====================================
          NAVIGATION
      ====================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto
          p-4

          scrollbar-thin
          scrollbar-thumb-slate-700
          scrollbar-track-transparent
        "
      >

        {NAV_GROUPS.map((group) => {

          // ==================================
          // FILTER ITEMS
          // ==================================

          const visibleItems =
            group.items.filter((item) => {

              // -------------------------------
              // DEMO MODE
              // -------------------------------

              if (isDemoMode) {

                return DEMO_PATHS.includes(
                  item.path
                );

              }

              // -------------------------------
              // NORMAL APPLICATION
              // -------------------------------

              return (
                !item.roles ||
                item.roles.includes(
                  user?.role
                )
              );

            });


          // Don't render empty groups
          if (visibleItems.length === 0) {
            return null;
          }


          return (

            <div
              key={group.title}
              className="mb-8"
            >

              {/* =================================
                  GROUP TITLE
              ================================== */}

              {sidebarState === "expanded" && (

                <h3
                  className="
                    mb-3
                    px-4
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-slate-500
                  "
                >
                  {isDemoMode && group.title === "Administration"
                    ? "Explore"
                    : group.title}
                </h3>

              )}


              {/* =================================
                  NAV ITEMS
              ================================== */}

              <div className="space-y-2">

                {visibleItems.map((item) => {

                  const Icon = item.icon;

                  const navigationPath =
                    getNavigationPath(
                      item.path
                    );


                  return (

                    <NavLink
                      key={item.path}
                      to={navigationPath}
                      end={
                        isDemoMode &&
                        item.path === "/dashboard"
                      }
                      className={({ isActive }) => `
                        flex
                        items-center

                        ${
                          sidebarState === "expanded"
                            ? "gap-3 px-4 justify-start"
                            : "justify-center px-0"
                        }

                        py-3
                        rounded-xl

                        text-[15px]
                        font-medium

                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              bg-cyan-500/10
                              border
                              border-cyan-500/20
                              text-cyan-400
                            `
                            : `
                              text-slate-300
                              hover:bg-white/5
                              hover:text-white
                            `
                        }
                      `}
                    >

                      {/* ICON */}

                      {Icon && (
                        <Icon
                          size={20}
                          className="shrink-0"
                        />
                      )}


                      {/* LABEL */}

                      {sidebarState === "expanded" && (
                        <span>
                          {item.label}
                        </span>
                      )}

                    </NavLink>

                  );

                })}

              </div>

            </div>

          );

        })}

      </nav>

    </aside>
  );
}