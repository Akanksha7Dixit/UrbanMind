import {
  LayoutDashboard,
  Map,
  GitCompare,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
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
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];