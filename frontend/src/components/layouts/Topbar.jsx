import {
  Bell,
  Search,
  Sparkles,
  Moon,
  ChevronDown,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import NotificationPanel from "../shared/NotificationPanel";
import ProfileDropdown from "../shared/ProfileDropdown";
import AIAssistantDrawer from "../ai/AIAssistantDrawer";
import CommandPalette from "../command/CommandPalette";

export default function Topbar() {
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [aiOpen, setAiOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [commandOpen, setCommandOpen] =
    useState(false);

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

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, []);

  return (
    <>
      <header
        className="
          relative
          z-[999]
          h-16
          border-b border-white/10
          bg-[#0B1220]/80
          backdrop-blur-xl
          px-6
        "
      >
        <div className="flex h-full items-center justify-between">

          {/* Search */}

          <button
            onClick={() =>
              setCommandOpen(true)
            }
            className="
              flex
              w-96
              items-center
              gap-3
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-2
              transition-all
              duration-200
              hover:bg-white/[0.05]
            "
          >
            <Search
              size={16}
              className="text-slate-400"
            />

            <span className="text-sm text-slate-400">
              Search UrbanMind...
            </span>

            <kbd
              className="
                ml-auto
                rounded-md
                border border-white/10
                px-2 py-1
                text-xs
                text-slate-500
              "
            >
              Ctrl + K
            </kbd>
          </button>

          {/* Actions */}

          <div className="flex items-center gap-3">

            {/* AI Assistant */}

            <button
              onClick={() => setAiOpen(true)}
              className="
                flex items-center gap-2
                rounded-xl
                border border-cyan-500/20
                bg-cyan-500/10
                px-4 py-2
                text-cyan-400
                transition-all
                duration-200
                hover:bg-cyan-500/20
              "
            >
              <Sparkles size={16} />

              <span className="text-sm font-medium">
                AI Assistant
              </span>
            </button>

            {/* Theme */}

            <button
              className="
                rounded-xl
                border border-white/10
                bg-white/[0.03]
                p-2.5
                transition-all
                duration-200
                hover:bg-white/[0.06]
              "
            >
              <Moon size={18} />
            </button>

            {/* Notifications */}

            <div className="relative">
              <button
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
                className="
                  relative
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  p-2.5
                  transition-all
                  duration-200
                  hover:bg-white/[0.06]
                "
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

            {/* Profile */}

            <div className="relative">
              <button
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                className="
                  flex items-center gap-3
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  px-3 py-2
                  transition-all
                  duration-200
                  hover:bg-white/[0.06]
                "
              >
                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-500
                    font-semibold
                    text-white
                  "
                >
                  A
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">
                    Admin
                  </p>

                  <p className="text-xs text-slate-400">
                    Urban Planner
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className="text-slate-500"
                />
              </button>

              {profileOpen && (
                <ProfileDropdown />
              )}
            </div>

          </div>

        </div>
      </header>

      <AIAssistantDrawer
        open={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() =>
          setCommandOpen(false)
        }
      />
    </>
  );
}