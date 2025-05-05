import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import HeadersInsets from "@/components/admin/headers-inset";
import UserTables from "@/components/admin/users/user-tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus, UserPlus } from "lucide-react";
import React from "react";

export default function PageAdminUser() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Data Users</h1>
            <Button icon={<UserPlus />} variant="orange">
              Add New Users
            </Button>
          </div>
          <Input
            className="w-md rounded-md mt-6"
            placeholder="Search Users..."
          />

          <UserTables className=""/>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
