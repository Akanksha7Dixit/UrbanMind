import {
  Bell,
  Search,
  Sparkles,
  Moon,
  ChevronDown,
  Sun,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Rocket,
  ArrowRight,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import NotificationPanel from "../shared/NotificationPanel";
import AIAssistantDrawer from "../ai/AIAssistantDrawer";
import CommandPalette from "../command/CommandPalette";

import { useThemeStore } from "../../store/themeStore";
import { useLayoutStore } from "../../store/layoutStore";
import { useAuthStore } from "../../store/authStore";


export default function Topbar() {

  // ==========================================
  // ROUTING
  // ==========================================

  const location = useLocation();
  const navigate = useNavigate();


  // ==========================================
  // AUTH
  // ==========================================

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );


  // ==========================================
  // STORES
  // ==========================================

  const toggleSidebar =
    useLayoutStore(
      (state) => state.toggleSidebar
    );

  const {
    darkMode,
    toggleTheme,
  } = useThemeStore();


  // ==========================================
  // STATE
  // ==========================================

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [
    aiOpen,
    setAiOpen,
  ] = useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    commandOpen,
    setCommandOpen,
  ] = useState(false);


  // ==========================================
  // DEMO MODE
  // ==========================================

  const isDemoMode =
    location.pathname.startsWith(
      "/demo"
    );


  // ==========================================
  // ROLE DISPLAY
  // ==========================================

  const getRoleLabel = (role) => {

    switch (role) {

      case "admin":
        return "Administrator";

      case "planner":
        return "Urban Planner";

      case "analyst":
        return "Data Analyst";

      case "citizen":
        return "Citizen";

      default:
        return "User";
    }
  };


  // ==========================================
  // DISPLAY USER
  // ==========================================

  const displayName = isDemoMode
    ? "Demo User"
    : user?.name || "User";


  const displayRole = isDemoMode
    ? "UrbanMind Explorer"
    : getRoleLabel(user?.role);


  const displayInitial = isDemoMode
    ? "D"
    : (
        user?.name
          ?.charAt(0)
          ?.toUpperCase() || "U"
      );


  // ==========================================
  // CTRL + K
  // ==========================================

  useEffect(() => {

    const handleKey = (e) => {

      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "k"
      ) {

        e.preventDefault();

        setCommandOpen(true);
      }

    };


    window.addEventListener(
      "keydown",
      handleKey
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKey
      );

    };

  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    setProfileOpen(false);

    logout();

    navigate(
      "/auth/login",
      {
        replace: true,
      }
    );
  };


  // ==========================================
  // PROFILE
  // ==========================================

  const handleProfile = () => {

    setProfileOpen(false);

    navigate("/settings");
  };


  // ==========================================
  // FULL PLATFORM
  // ==========================================

  const handleFullPlatform = () => {

    setProfileOpen(false);

    navigate("/auth/login");
  };


  return (
    <>
      {/* ======================================
          TOPBAR
      ======================================= */}

      <header
        className="
          relative
          z-40
          flex
          h-[70px]
          shrink-0
          items-center
          justify-between
          border-b
          border-white/10
          bg-slate-950/80
          px-4
          backdrop-blur-xl
        "
      >

        {/* ====================================
            LEFT SIDE
        ===================================== */}

        <div
          className="
            flex
            min-w-0
            items-center
          "
        >

          {/* SIDEBAR TOGGLE */}

          <button
            type="button"
            onClick={toggleSidebar}
            className="
              mr-3
              rounded-lg
              border
              border-white/10
              bg-white/[0.03]
              p-2
              text-slate-300
              transition
              hover:bg-white/5
              hover:text-white
            "
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>


          {/* SEARCH */}

          <button
            type="button"
            onClick={() =>
              setCommandOpen(true)
            }
            className="
              hidden
              w-96
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-2
              transition-all
              duration-200
              hover:bg-white/[0.05]
              lg:flex
            "
          >

            <Search
              size={16}
              className="text-slate-400"
            />

            <span
              className="
                text-sm
                text-slate-400
              "
            >
              Search UrbanMind...
            </span>

            <kbd
              className="
                ml-auto
                rounded-md
                border
                border-white/10
                px-2
                py-1
                text-xs
                text-slate-500
              "
            >
              Ctrl + K
            </kbd>

          </button>

        </div>


        {/* ====================================
            RIGHT SIDE
        ===================================== */}

        <div
          className="
            flex
            items-center
            gap-2
            md:gap-3
          "
        >

          {/* ==================================
              AI ASSISTANT
          =================================== */}

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
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-3
              py-2
              text-cyan-400
              transition-all
              duration-200
              hover:bg-cyan-500/20
            "
          >

            <Sparkles size={16} />

            <span
              className="
                hidden
                text-sm
                font-medium
                md:inline
              "
            >
              AI Assistant
            </span>

          </button>


          {/* ==================================
              THEME
          =================================== */}

          <button
            type="button"
            onClick={toggleTheme}
            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-2.5
              text-slate-300
              transition-all
              duration-200
              hover:bg-white/[0.06]
              hover:text-white
            "
            aria-label="Toggle theme"
          >

            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

          </button>


          {/* ==================================
              NOTIFICATIONS
          =================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="
                relative
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-2.5
                text-slate-300
                transition-all
                duration-200
                hover:bg-white/[0.06]
                hover:text-white
              "
              aria-label="Notifications"
            >

              <Bell size={18} />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-400
                "
              />

            </button>


            {showNotifications && (
              <NotificationPanel />
            )}

          </div>


          {/* ==================================
              PROFILE
          =================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                px-3
                py-2
                transition-all
                duration-200
                hover:bg-white/[0.06]
              "
            >

              {/* AVATAR */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  font-semibold
                  text-white
                "
              >
                {displayInitial}
              </div>


              {/* USER INFO */}

              <div
                className="
                  hidden
                  text-left
                  md:block
                "
              >

                <p
                  className="
                    max-w-[130px]
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {displayName}
                </p>

                <p
                  className="
                    max-w-[130px]
                    truncate
                    text-xs
                    text-slate-400
                  "
                >
                  {displayRole}
                </p>

              </div>


              <ChevronDown
                size={16}
                className="
                  text-slate-500
                "
              />

            </button>


            {/* ==================================
                DEMO PROFILE DROPDOWN
            =================================== */}

            {profileOpen &&
              isDemoMode && (

                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-[100]
                    mt-2
                    w-72
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#020617]
                    shadow-2xl
                    shadow-black/40
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                      border-b
                      border-white/10
                      p-4
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
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-500
                          font-semibold
                          text-white
                        "
                      >
                        D
                      </div>

                      <div>

                        <p
                          className="
                            font-semibold
                            text-white
                          "
                        >
                          Demo User
                        </p>

                        <p
                          className="
                            text-xs
                            text-slate-400
                          "
                        >
                          UrbanMind Explorer
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* DEMO INFO */}

                  <div className="p-3">

                    <div
                      className="
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-cyan-500/5
                        p-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Rocket
                          size={16}
                          className="
                            text-cyan-400
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-medium
                            text-white
                          "
                        >
                          Demo Environment
                        </span>

                      </div>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-relaxed
                          text-slate-400
                        "
                      >
                        You are viewing the
                        public UrbanMind
                        preview.
                      </p>

                    </div>


                    {/* FULL PLATFORM */}

                    <button
                      type="button"
                      onClick={
                        handleFullPlatform
                      }
                      className="
                        mt-3
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-cyan-400
                        transition
                        hover:bg-cyan-500/10
                      "
                    >

                      <span>
                        Sign In / Register
                      </span>

                      <ArrowRight
                        size={16}
                      />

                    </button>

                  </div>

                </div>

              )}


            {/* ==================================
                NORMAL USER DROPDOWN
            =================================== */}

            {profileOpen &&
              !isDemoMode && (

                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-[100]
                    mt-2
                    w-64
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#020617]
                    shadow-2xl
                    shadow-black/40
                  "
                >

                  {/* USER HEADER */}

                  <div
                    className="
                      border-b
                      border-white/10
                      p-4
                    "
                  >

                    <p
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      {displayName}
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-400
                      "
                    >
                      {displayRole}
                    </p>

                  </div>


                  {/* PROFILE */}

                  <button
                    type="button"
                    onClick={
                      handleProfile
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-left
                      text-slate-300
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >

                    <User size={18} />

                    <span>
                      Profile
                    </span>

                  </button>


                  {/* SETTINGS */}

                  <button
                    type="button"
                    onClick={() => {

                      setProfileOpen(
                        false
                      );

                      navigate(
                        "/settings"
                      );

                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-left
                      text-slate-300
                      transition
                      hover:bg-white/5
                      hover:text-white
                    "
                  >

                    <Settings
                      size={18}
                    />

                    <span>
                      Settings
                    </span>

                  </button>


                  {/* LOGOUT */}

                  <div
                    className="
                      my-1
                      border-t
                      border-white/10
                    "
                  />

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-left
                      text-red-400
                      transition
                      hover:bg-red-500/10
                    "
                  >

                    <LogOut
                      size={18}
                    />

                    <span>
                      Logout
                    </span>

                  </button>

                </div>

              )}

          </div>

        </div>

      </header>


      {/* ======================================
          AI ASSISTANT
      ======================================= */}

      <AIAssistantDrawer
        open={aiOpen}
        onClose={() =>
          setAiOpen(false)
        }
      />


      {/* ======================================
          COMMAND PALETTE
      ======================================= */}

      <CommandPalette
        open={commandOpen}
        onClose={() =>
          setCommandOpen(false)
        }
      />

    </>
  );
}