import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigation";

export default function Sidebar() {
    return (
        <aside
            className="
    w-72
    border-r
    border-white/10
    bg-slate-950/90
    backdrop-blur-xl
    flex
    flex-col
  "
        >
            <div className="border-b border-white/10 p-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    UrbanMind
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Smart City Intelligence
                </p>
            </div>

            <nav className="space-y-2 p-4">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;

                    return (
                       <NavLink
  key={item.path}
  to={item.path}
  className={({ isActive }) =>
    `
    flex items-center gap-3
    rounded-xl px-4 py-3
    transition-all duration-200

    
    ${
      isActive
        ? "bg-white/10"
        : "hover:bg-white/5"
    }
  `
  }
>
                            <Icon size={18} />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}