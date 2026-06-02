import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: true,

  user: {
    name: "John Planner",
    email: "planner@urbanmind.ai",
    role: "admin",
  },

  login: (user) =>
    set({
      isAuthenticated: true,
      user,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));