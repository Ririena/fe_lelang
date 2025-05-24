"use client";
import { useState } from "react";
import LelangTable from "@/components/admin/lelangs/lelang-tables";
import LelangFormDialog from "@/components/admin/lelangs/lelang-form-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { Input } from "@/components/ui/input";
import ContactContent from "@/components/admin/contact/contact-content";

const AdminContactPage = () => {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <HeadersInsets />
          <main className="flex-1 p-6">
            <div className="">
              <h1 className="text-xl font-semibold">Contacts Data</h1>
              <p className="text-muted-foreground">
                Manage your auction platform configuration and preferences.
              </p>
            </div>
            <ContactContent/>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminContactPage;
