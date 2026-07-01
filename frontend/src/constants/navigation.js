import {
  Users,
  LayoutDashboard,
  Map,
  GitCompare,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
  Building2,
} from "lucide-react";

export const NAV_GROUPS = [
  {
    title: "WORKSPACE",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        roles: [
          "admin",
          "planner",
          "analyst",
        ],
      },
      {
        label: "GIS Workspace",
        path: "/gis",
        icon: Map,
        roles: ["admin", "planner"],
      },
      {
        label: "Scenario Builder",
        path: "/simulation",
        icon: GitCompare,
        roles: ["admin", "planner"],
      },
      {
        label: "Infrastructure",
        path: "/infrastructure",
        icon: Building2,
        roles: [
          "admin",
          "planner",
        ],
      },
    ],
  },

  {
    title: "ANALYTICS",
    items: [
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
        roles: ["admin", "analyst"],

      },
      {
        label: "Reports",
        path: "/reports",
        icon: FileText,
        roles: ["admin", "planner", "analyst"],
      },

      {
        label: "AI Center",
        path: "/ai-recommendations",
        icon: Sparkles,
        roles: [
          "admin",
          "planner",
        ],
      },
      {
        label: "Citizen Portal",
        path: "/citizen-portal",
        icon: Users,
        roles: [
          "admin",
          "citizen",
        ],
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
        roles: [
          "admin",
        ],
      },
    ],
  },
];