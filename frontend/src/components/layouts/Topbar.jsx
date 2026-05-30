import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b border-white/10
        px-6
      "
    >
      <div
        className="
          flex items-center gap-3
          rounded-xl
          border border-white/10
          bg-white/[0.03]
          px-4 py-2
          text-slate-400
        "
      >
        <Search size={16} />
        Search UrbanMind...
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
            rounded-xl
            border border-white/10
            p-2
          "
        >
          <Bell size={18} />
        </button>

        <div
          className="
            h-10 w-10
            rounded-full
            bg-cyan-500
          "
        />
      </div>
    </header>
  );
}