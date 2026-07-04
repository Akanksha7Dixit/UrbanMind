import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useLayoutStore } from "../../store/layoutStore";

import { useThemeStore } from "../../store/themeStore";

export default function AppLayout() {
  const { darkMode } = useThemeStore();
  const sidebarState =
useLayoutStore(
(state)=>state.sidebarState
);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${darkMode
          ? "bg-[#0B1220] text-white"
          : "bg-slate-100 text-slate-900"
        }`}
    >
      <Sidebar />

<div
  className="
    flex
    flex-1
    flex-col
    overflow-hidden
    transition-all
    duration-300
  "
>
          <Topbar />

        <main
          className={`
    flex-1 overflow-y-auto
    ${darkMode ? "urban-gradient" : "bg-slate-50"}
  `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}