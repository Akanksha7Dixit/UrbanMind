import { create } from "zustand";

export const useLayoutStore = create((set) => ({
  sidebarState: "expanded",

  toggleSidebar: () =>
    set((state) => {
      if (window.innerWidth < 1024) {
        return {
          sidebarState:
            state.sidebarState === "hidden"
              ? "expanded"
              : "hidden",
        };
      }

      if (state.sidebarState === "expanded")
        return { sidebarState: "collapsed" };

      if (state.sidebarState === "collapsed")
        return { sidebarState: "hidden" };

      return {
        sidebarState: "expanded",
      };
    }),

  closeSidebar: () =>
    set({
      sidebarState: "hidden",
    }),
}));