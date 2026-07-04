import { NavLink } from "react-router-dom";
import { NAV_GROUPS } from "../../constants/navigation";
import { useAuthStore } from "../../store/authStore";
import { useLayoutStore } from "../../store/layoutStore";

export default function Sidebar() {

    const user = useAuthStore(
        (state) => state.user
    );
    const sidebarState = useLayoutStore(
        (state) => state.sidebarState
    );

    return (
        <aside
            className={`
fixed lg:relative
left-0
top-0
z-50
h-screen
border-r
border-white/10
bg-slate-950/95
backdrop-blur-xl
flex
flex-col
transition-all
duration-300

${sidebarState === "expanded"
                    ? "w-72 translate-x-0"

                    : sidebarState === "collapsed"
                        ? "w-20 translate-x-0"

                        : "-translate-x-full lg:w-0"
                }
`}
        >
            <div
className={`
border-b
border-white/10
p-6

${
sidebarState==="collapsed"
? "flex justify-center"
: ""
}
`}
>
                {sidebarState==="expanded" ? (

<h1 className="text-[34px] font-bold">
    UrbanMind
</h1>

) : sidebarState==="collapsed" ? (

<div className="flex justify-center">
    <div
        className="
        h-10
        w-10
        rounded-xl
        bg-cyan-500
        flex
        items-center
        justify-center
        font-bold
        text-white
        "
    >
        U
    </div>
</div>

) : null}

                {sidebarState === "expanded" && (
                    <>
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
                    </>
                )}
            </div>
            <nav
                className="
        flex-1
        overflow-y-auto
        p-4
        scrollbar-thin
        scrollbar-thumb-slate-700
        scrollbar-track-transparent
    "
            >

                {NAV_GROUPS.map((group) => (
                    <div
                        key={group.title}
                        className="mb-8"
                    >
                        {sidebarState === "expanded" && (

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

                        )}

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
                                            className={({ isActive }) => `
flex
items-center

${sidebarState === "expanded"
                                                    ? "gap-3 px-4 justify-start"
                                                    : "justify-center px-0"
                                                }

py-3
rounded-xl
text-[15px]
font-medium
transition-all
duration-300

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
`
                                                }
`}
                                        >
                                            <Icon size={20} />

{sidebarState === "expanded" && item.label}
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