import { LogOut, User, Settings } from "lucide-react";

export default function ProfileDropdown() {
  return (
    <div
      className="
        absolute
        right-0
        top-14
        w-72
        rounded-3xl
        border border-white/10
        bg-slate-950
        p-4
      "
    >
      <div className="mb-4 border-b border-white/10 pb-4">
        <h3 className="font-semibold">
          John Planner
        </h3>

        <p className="text-sm text-slate-400">
          Admin
        </p>
      </div>

      <div className="space-y-2">

        <button className="dropdown-btn">
          <User size={18} />
          Profile
        </button>

        <button className="dropdown-btn">
          <Settings size={18} />
          Settings
        </button>

        <button className="dropdown-btn text-red-400">
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
}