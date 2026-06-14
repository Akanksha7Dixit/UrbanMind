import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CommandPalette({
  open,
  onClose,
}) {
  const navigate = useNavigate();

  if (!open) return null;

  const commands = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "GIS Workspace",
      path: "/gis",
    },
    {
      label: "Scenario Builder",
      path: "/simulation",
    },
    {
      label: "Analytics",
      path: "/analytics",
    },
    {
      label: "Reports",
      path: "/reports",
    },
    {
      label: "AI Center",
      path: "/ai-recommendations",
    },
    {
      label: "Citizen Portal",
      path: "/citizen-portal",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0
        z-[99999]
        flex items-start justify-center
        bg-black/50
        backdrop-blur-sm
        pt-24
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-[650px]
          rounded-3xl
          border border-white/10
          bg-slate-950
          p-6
          shadow-2xl
        "
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Command Palette
          </h3>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

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
            placeholder="Search pages..."
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
              key={item.path}
              onClick={() =>
                handleNavigate(item.path)
              }
              className="
                flex
                w-full
                rounded-xl
                px-4 py-3
                transition-all
                duration-200
                hover:bg-cyan-500/10
                hover:text-cyan-400
              "
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}