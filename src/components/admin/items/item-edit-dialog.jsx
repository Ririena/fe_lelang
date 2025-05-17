'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToastCard } from "@/components/ui/toast-card";
import { toast } from "sonner";

const ItemEditDialog = ({ open, onOpenChange, item, onUpdated }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [nama_barang, setNamaBarang] = useState("");
  const [gambar, setGambar] = useState(""); 
  const [deskripsi, setDeskripsi] = useState("");
  const [harga_awal, setHargaAwal] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (item) {
      setNamaBarang(item.nama_barang);
      setGambar(item.gambar);
      setDeskripsi(item.deskripsi);
      setHargaAwal(item.harga_awal);
      setFile(null);
    }
  }, [item]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Untuk preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambar(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

 const handleSubmit = async () => {
  setLoading(true);

  try {
    const updatedData = {
      nama_barang,
      harga_awal: Number(harga_awal),
      deskripsi,
      gambar,
    };

    await axios.put(
      `http://localhost:3001/v2/items/${item.id_barang}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );

    setLoading(false);
    onOpenChange(false);

    if (onUpdated) {
      onUpdated({ ...item, ...updatedData });
    }

    toast.custom(() => (
      <ToastCard
        title="Berhasil"
        variant="success"
        description="Item berhasil diperbarui"
      />
    ));
  } catch (error) {
    setLoading(false);

    toast.custom(() => (
      <ToastCard
        title="Gagal"
        variant="destructive"
        description={error?.response?.data?.message || "Gagal memperbarui item"}
      />
    ));
  }
};



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </Label>
            <Input
              type="text"
              name="nama_barang"
              value={nama_barang}
              onChange={(e) => setNamaBarang(e.target.value)}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              First Price
            </Label>
            <Input
              type="number"
              name="harga_awal"
              value={harga_awal}
              onChange={(e) => setHargaAwal(e.target.value)}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </Label>
            <Textarea
              name="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar
            </Label>
            {gambar && (
              <img
                src={gambar}
                alt="Preview Gambar"
                className="mb-2 w-32 h-32 object-cover rounded-md"
              />
            )}
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemEditDialog