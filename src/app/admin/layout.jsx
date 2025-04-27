import NavbarAdmin from "@/components/ui/navigations/NavbarAdmin";

const AdminLayot = ({children}) => {
  return (
    <>
      <NavbarAdmin />

      <main className="container mx-auto px-4">{children}</main>
    </>
  );
};

export default AdminLayot;
