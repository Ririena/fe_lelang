import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { SidebarInset } from "@/components/ui/sidebar"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            <Button variant="orange">Add New Lelang</Button>
          </div>
          <Input placeholder="Search Lelang" className="w-md" />
        </main>
        {/* <ItemForm/> */}
      </SidebarInset>
    </SidebarProvider>
    </>
  );
};

export default AdminPageLelang;
