"use client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import HeadersInsets from "@/components/admin/headers-inset";
import UserFormDialog from "@/components/admin/users/user-form-dialog";
import UserTables from "@/components/admin/users/user-tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus, UserPlus } from "lucide-react";
import React, { useState } from "react";

export default function PageAdminUser() {
  const [trigger, setTrigger] = useState(0);
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Data Users</h1>
            <UserFormDialog
              onUserAdded={() => setTrigger((prev) => prev + 1)}
            />
          </div>
          <Input
            className="w-md rounded-md mt-6"
            placeholder="Search Users..."
          />

          <UserTables className="" trigger={trigger} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
