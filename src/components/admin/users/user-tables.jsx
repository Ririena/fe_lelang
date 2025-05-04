import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function userTables() {
  return (
    <SidebarInset>
      <header>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <div>
            <h1 className="text-lg font-semibold">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage your users and their permissions
            </p>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Users</h2>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={users}
            searchColumn="name"
            searchPlaceholder="Search users..."
          />
        </main>
      </header>
    </SidebarInset>
  );
}
