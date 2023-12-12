import { type DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ],
  sidebarNav: [
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: "tasks",
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: "users",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
