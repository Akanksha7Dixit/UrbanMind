import { create } from "zustand";

export const useUIStore = create((set) => ({
  sidebarCollapsed: false,

  commandOpen: false,

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  openCommand: () =>
    set({
      commandOpen: true,
    }),

  closeCommand: () =>
    set({
      commandOpen: false,
    }),
}));