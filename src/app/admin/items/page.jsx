"use client";
import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { Input } from "@/components/ui/input";
import ItemTables from "@/components/admin/items/item-tables";
import ItemFormDialog from "@/components/admin/items/item-form-dialog";

const AdminPageItems = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Data Barang</h1>
            <ItemFormDialog />
          </div>
          <Input placeholder="Search Barang" className="w-md mb-4" />
          <ItemTables />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPageItems;
