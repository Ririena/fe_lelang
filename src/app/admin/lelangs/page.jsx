'use client'
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { SidebarInset } from "@/components/ui/sidebar"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LelangTable from "@/components/admin/lelangs/lelang-tables";
import LelangFormDialog from "@/components/admin/lelangs/lelang-form-dialog";
const AdminPageLelang = () => {
  return (
    <>
      <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Data Lelang</h1>
            <LelangFormDialog/>
          </div>
          <Input placeholder="Search Lelang" className="w-md" />
          <LelangTable/>
        </main>
        {/* <ItemForm/> */}
      </SidebarInset>
    </SidebarProvider>
    </>
  );
};

export default AdminPageLelang;
