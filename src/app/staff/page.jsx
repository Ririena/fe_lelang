import { DashboardContent } from "@/components/staff/dashboard-content";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


const StaffPage = () => {
  return (
    <>
    <SidebarProvider>
        <StaffSidebar/>
        <DashboardContent/>

    </SidebarProvider>
    </>
  );
};

export default StaffPage;
