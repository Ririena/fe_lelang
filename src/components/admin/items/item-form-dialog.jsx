"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
export default function ItemFormDialog({onItemAdded}) {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga_awal: "",
    deskripsi: "",
    gambar: null,
  });

  const router = useRouter()

  console.log(user)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gambar" ? files[0] : value,
    }));
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
      onItemAdded()
      setFormData({
        nama_barang: "",
        harga_awal: "",
        deskripsi: "",
        gambar: null,
      });

      router.refresh()
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="orange">Add New Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Tambah Barang</DialogTitle>
        <DialogDescription>Tambah barang untuk keperluan lelang</DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input type="text" name="nama_barang" placeholder="Nama Barang" value={formData.nama_barang} onChange={handleChange} required />
          <Input type="number" name="harga_awal" placeholder="Harga Awal" value={formData.harga_awal} onChange={handleChange} required />
          <Textarea name="deskripsi" placeholder="Deskripsi" value={formData.deskripsi} onChange={handleChange} required />
          <Input type="file" name="gambar" accept="image/*" onChange={handleChange} required />
          <Button variant="orange" type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </form>
        <Separator />
      </DialogContent>
    </Dialog>
  );
}
