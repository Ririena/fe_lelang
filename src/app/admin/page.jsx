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

"use client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthFetch } from "@/lib/fetch";
import axios from "axios";
export default function DashboardPage() {
  const { loading, token } = useAuth();
  const [listHistory, setListHistory] = useState([]);

  async function fetchHistory() {
    try {
      const res = await axios.get("https://be-lelang.vercel.app/v7/history-desc", {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!loading && res.data) {
        setListHistory(res.data.data);
        console.table(res.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (!loading && token) {
      fetchHistory();
    }
  }, [token, loading]);

  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <DashboardContent listHistory={listHistory} />
      </SidebarProvider>
    </>
  );
}
