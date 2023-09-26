/**
 * Configuration object for defining the structure and navigation links of a dashboard.
 */
import { DashboardConfig } from "@/types";

// Define the dashboard configuration using the DashboardConfig interface.
export const dashboardConfig: DashboardConfig = {
  // An array representing the main navigation links of the dashboard.
  mainNav: [],
  // An array representing the sidebar navigation links of the dashboard.
  sidebarNav: [
    {
      // Title of the sidebar navigation item.
      title: "Dashboard",
      // Href is the URL or route associated with the navigation item.
      href: "/admin/dashboard",
      // Icon is an optional icon associated with the navigation item.
      icon: "dashboard",
    },
    {
      title: "Brands",
      href: "/admin/brands",
      icon: "brand",
    },
    {
      title: "Challenges",
      href: "/admin/challenges",
      icon: "challenge",
    },
    {
      title: "Users",
      // Example of a nested route or subpage for users under the admin section.
      href: "/admin/users",
      icon: "users",
    },
  ],
};
