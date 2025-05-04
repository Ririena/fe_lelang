"use client"

import { SidebarProvider } from "../ui/sidebar"
import { AdminSidebar } from "./admin-sidebar"
import { DashboardContent } from "./dashboard-content"

export function AdminDashboard() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <DashboardContent />
    </SidebarProvider>
  )
}
