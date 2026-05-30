import {
  Bell,
  Search,
  Sparkles,
  Moon,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        h-16
        border-b border-white/10
        bg-[#0B1220]/80
        backdrop-blur-xl
        px-6
      "
    >
      <div className="flex h-full items-center justify-between">

        {/* Search */}
        <div
          className="
            flex
            w-96
            items-center
            gap-3
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-2
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* AI Assistant */}
          <button
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

          {/* Theme Toggle */}
          <button
            className="
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              p-2.5
              transition-all
              duration-200
              hover:bg-white/6
            "
          >
            <Moon size={18} />
          </button>

          {/* Notifications */}
          <button
            className="
              relative
              rounded-xl
              border border-white/10
              bg-white/3
              p-2.5
              transition-all
              duration-200
              hover:bg-white/6
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

          {/* User Profile */}
          <div
            className="
              flex items-center gap-3
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              px-3 py-2
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

            <div className="hidden md:block">
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
          </div>

        </div>
      </div>
    </header>
  );
}