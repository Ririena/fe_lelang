"use client";
import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardContent } from "@/components/admin/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import ItemTables from "@/components/admin/items/item-tables";
import { Input } from "@/components/ui/input";
const AdminPageItems = () => {
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga_awal: "",
    deskripsi: "",
    gambar: null,
  });

  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setFormData((prev) => ({ ...prev, gambar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("barang")
      .upload(fileName, file);

    if (error) throw error;

    return `https://tivxoxflmcvopbcvrkgl.supabase.co/storage/v1/object/public/barang/${fileName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.gambar) throw new Error("No image selected");
      const image_url = await uploadImage(formData.gambar);

      await axios.post(
        "http://localhost:3001/v2/items",
        {
          nama_barang: formData.nama_barang,
          harga_awal: formData.harga_awal,
          deskripsi: formData.deskripsi,
          gambar: image_url,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Item added successfully!");
      setFormData({
        nama_barang: "",
        harga_awal: "",
        deskripsi: "",
        gambar: null,
      });
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Data Users</h1>
            <Button variant="orange">Add New Item</Button>
          </div>
          <Input placeholder="Search Barang" className="w-md" />
          <ItemTables />
        </main>
        {/* <ItemForm/> */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPageItems;

// const ItemForm = (handleSubmit, formData, handleChange) => {
//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 max-w-md mx-auto"
//       >
//         <input
//           type="text"
//           name="nama_barang"
//           placeholder="Nama Barang"
//           value={formData.nama_barang}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="harga_awal"
//           placeholder="Harga Awal"
//           value={formData.harga_awal}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="deskripsi"
//           placeholder="Deskripsi"
//           value={formData.deskripsi}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="file"
//           name="gambar"
//           accept="image/*"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Submit"}
//         </button>
//       </form>
//     </>
//   );
// };
