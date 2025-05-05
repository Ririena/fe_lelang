import NavbarAdmin from "@/components/ui/navigations/NavbarAdmin";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
const AdminItemsLayouts = ({children}) => {
  return (
    <>
    <main>{children}</main>
    </>
  );
};

export default AdminItemsLayouts;
