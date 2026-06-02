import { NavLink } from "react-router-dom";
import { NAV_GROUPS } from "../../constants/navigation";
import { useAuthStore } from "../../store/authStore";

export default function Sidebar() {

    const user = useAuthStore(
        (state) => state.user
    );

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
                <h1 className="text-[34px] font-extrabold tracking-tight text-white">                    UrbanMind
                </h1>

                <div className="mt-3">
                    <span
                        className="
      inline-flex
      rounded-full
      bg-cyan-500/20
      px-3 py-1
      text-xs
      font-medium
      text-cyan-400
    "
                    >
                        Development
                    </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Smart City Intelligence
                </p>
            </div>
            <nav className="p-4">

                {NAV_GROUPS.map((group) => (
                    <div
                        key={group.title}
                        className="mb-8"
                    >
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
                            {group.title}
                        </h3>

                        <div className="space-y-2">

                            {group.items
                                .filter(
                                    (item) =>
                                        !item.roles ||
                                        item.roles.includes(user?.role)
                                )
                                .map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `
                flex items-center gap-3
                rounded-xl
                px-4 py-3
                text-[15px]
                font-medium
                transition-all duration-200

                ${isActive
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
  `}
              `
                                            }
                                        >
                                            <Icon size={18} />

                                            {item.label}
                                        </NavLink>
                                    );
                                })}

                        </div>
                    </div>
                ))}

            </nav>
        </aside>
    );
}