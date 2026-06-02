import { Search } from "lucide-react";

export default function CommandPalette() {
  const commands = [
    "Dashboard",
    "GIS Workspace",
    "Scenario Builder",
    "Analytics",
    "Reports",
    "AI Center",
    "Citizen Portal",
  ];

  return (
    <div
      className="
        w-[650px]
        rounded-3xl
        border border-white/10
        bg-slate-950
        p-6
      "
    >
      <div
        className="
          flex items-center gap-3
          rounded-2xl
          border border-white/10
          px-4 py-3
        "
      >
        <Search size={18} />
        <input
          placeholder="Search..."
          className="
            flex-1
            bg-transparent
            outline-none
          "
        />
      </div>

      <div className="mt-6 space-y-2">

        {commands.map((item) => (
          <button
            key={item}
            className="
              flex
              w-full
              rounded-xl
              px-4 py-3
              hover:bg-white/[0.05]
            "
          >
            {item}
          </button>
        ))}

      </div>
    </div>
  );
}