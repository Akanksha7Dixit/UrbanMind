import {
  Users,
  LayoutDashboard,
  Map,
  GitCompare,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";

export const NAV_GROUPS = [
  {
    title: "WORKSPACE",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "GIS Workspace",
        path: "/gis",
        icon: Map,
      },
      {
        label: "Scenario Builder",
        path: "/simulation",
        icon: GitCompare,
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
      },
      {
        label: "Reports",
        path: "/reports",
        icon: FileText,
      },

      {
        label: "AI Center",
        path: "/ai-recommendations",
        icon: Sparkles,
      },
      {
        label: "Citizen Portal",
        path: "/citizen-portal",
        icon: Users,
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
      },
    ],
  },
];