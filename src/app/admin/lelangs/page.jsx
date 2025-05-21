"use client";
import { useState } from "react";
import LelangTable from "@/components/admin/lelangs/lelang-tables";
import LelangFormDialog from "@/components/admin/lelangs/lelang-form-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { Input } from "@/components/ui/input";

const AdminLelangPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLelangAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Auction Data</h1>
            <LelangFormDialog
              onLelangAdded={handleLelangAdded}
              refreshTrigger={refreshTrigger}
            />
          </div>
          <Input
            placeholder="Search Auuction"
            className="w-md mt-4 mb-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <LelangTable
            searchQuery={searchQuery}
            refreshTrigger={refreshTrigger}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLelangPage;
