"use client";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/staff/headers-inset";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LelangTable from "@/components/admin/lelangs/lelang-tables";
import { useState } from "react";
const StaffAuctionPage = () => {
  const [trigger, setTrigger] = useState(0);
  const [query, setQuery] = useState("");
  return (
    <>
      <SidebarProvider>
        <StaffSidebar />
        <SidebarInset>
          <HeadersInsets />
          <main className="flex-1 p-6">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Data Lelang</h1>
              <LelangFormDialog />
            </div>
            <Input placeholder="Search Lelang" className="w-md" />
            <LelangTable />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default StaffAuctionPage;
