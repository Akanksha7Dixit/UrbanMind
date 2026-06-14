import { Search, X } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandPalette({
  open,
  onClose,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [onClose]);

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
    {
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0
        z-[9999]
        bg-black/50
        backdrop-blur-sm
        flex
        items-start
        justify-center
        pt-24
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border border-white/10
          bg-slate-950
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            flex items-center gap-3
            border-b border-white/10
            px-5 py-4
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            autoFocus
            placeholder="Search UrbanMind..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-sm
            "
          />

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-1
              hover:bg-white/5
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Commands */}

        <div className="p-3">

          {commands.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className="
                flex
                w-full
                items-center
                rounded-xl
                px-4 py-3
                text-left
                transition-all
                duration-200
                hover:bg-white/[0.05]
              "
            >
              {item.label}
            </button>
          ))}

        </div>

        {/* Footer */}

        <div
          className="
            border-t border-white/10
            px-5 py-3
            text-xs text-slate-500
          "
        >
          Press ESC to close
        </div>
      </div>
    </div>
  );
}