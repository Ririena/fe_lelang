// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";

// const AdminPage = () => {
//   return (
//     <>
//       <main className="mt-[80px]">
//         <h1 className="font-semibold text-3xl">Admin Dashboard</h1>
//         <div className="flex justify-between">
//           <p className="text-lg font-light">
//             Ringkasan Data Lelang dan Aktivitas User
//           </p>
//           <Button variant="orange">Tambah Lelang</Button>
//         </div>
//         <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 mt-4 gap-20 rounded">
//           <StatisticCard title="Total User" value="100" icon="👤" />
//           <StatisticCard title="Total Petugas" value="100" icon="👤" />
//           <StatisticCard title="Total Barang" value="100" icon="👤" />
//           <StatisticCard title="Total Lelang" value="100" icon="👤" />
//         </section>
//         <section className="mt-16">
//           <Card className="w-full roudned-none ">
//             <CardHeader>
//               <h2 className="text-2xl font-semibold">Lelang Terbaru</h2>
//               <p className="text-xl font-light">Lelang yang baru ditambahkan</p>
//             </CardHeader>
//           </Card>
//         </section>
//       </main>
//     </>
//   );
// };

// export default AdminPage;

// const StatisticCard = (props) => {
//   return (
//     <>
//       <Card className="rounded-none">
//         <CardContent>
//           <div className="flex justify-between">
//             <p className="font-semibold text-xl">{props.title}</p>
//             <p>{props.icon}</p>
//           </div>
//           <p className="font-medium text-xl">{props.value}</p>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <DashboardContent />
      </SidebarProvider>
    </>
  );
}
