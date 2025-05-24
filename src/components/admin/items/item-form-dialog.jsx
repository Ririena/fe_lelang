"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import UseCrop from "@/lib/UseCrop";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ToastCard } from "@/components/ui/toast-card";

export default function ItemFormDialog({ onItemAdded }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga_awal: "",
    deskripsi: "",
    gambar: null,
  });
  const [imageSrc, setImageSrc] = useState(null); // base64 image untuk cropper
  const [cropping, setCropping] = useState(false); // kontrol tampil cropper

  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/v2/categories", {
          headers: { "Content-Type": "application/json" },
        });
        setCategories(res.data.categories || []);
      } catch {
        toast.custom(() => (
          <ToastCard
            title="Gagal"
            variant="destructive"
            description="Terjadi kesalahan saat mengambil kategori"
          />
        ));
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // base64 image
        setCropping(true);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onCropDone = (croppedBlob) => {
    // Simpan hasil crop sebagai file di formData.gambar
    const croppedFile = new File([croppedBlob], "cropped.jpeg", {
      type: "image/jpeg",
    });
    setFormData((prev) => ({ ...prev, gambar: croppedFile }));
    setCropping(false);
    setImageSrc(null);
    setIsOpen(true);
  };

  const onCropCancel = () => {
    setCropping(false);
    setImageSrc(null);
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.gambar) throw new Error("No image selected");
      if (!selectedCategory) throw new Error("Kategori belum dipilih");

      const image_url = await uploadImage(formData.gambar);

      await axios.post(
        "http://localhost:3001/v2/items",
        {
          nama_barang: formData.nama_barang,
          harga_awal: formData.harga_awal,
          deskripsi: formData.deskripsi,
          gambar: image_url,
          id_kategori: selectedCategory,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.custom(() => (
        <ToastCard
          title="Berhasil"
          variant="success"
          description="Item berhasil ditambahkan"
        />
      ));

      onItemAdded();

      setFormData({
        nama_barang: "",
        harga_awal: "",
        deskripsi: "",
        gambar: null,
      });
      setSelectedCategory(null);
      setIsOpen(false);
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          title="Gagal"
          variant="destructive"
          description={error.message || "Terjadi kesalahan saat menambah item"}
        />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="orange">Add New Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Tambah Barang</DialogTitle>
          <DialogDescription>
            Tambah barang untuk keperluan lelang
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              name="nama_barang"
              placeholder="Nama Barang"
              value={formData.nama_barang}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="harga_awal"
              placeholder="Harga Awal"
              value={formData.harga_awal}
              onChange={handleChange}
              required
            />
            <Textarea
              name="deskripsi"
              placeholder="Deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              required
            />
            <Label>Kategori</Label>
            <Select
              className="w-full"
              onValueChange={(value) => setSelectedCategory(value)}
              value={selectedCategory}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories
                    .filter((cat) => cat.id_kategori)
                    .map((cat) => (
                      <SelectItem
                        key={cat.id_kategori}
                        value={String(cat.id_kategori)}
                      >
                        {cat.nama_kategori || "Kategori tanpa nama"}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="file"
              name="gambar"
              accept="image/*"
              onChange={handleChange}
              required={!formData.gambar}
            />
            {formData.gambar && (
              <img
                src={URL.createObjectURL(formData.gambar)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md mt-2"
              />
            )}
            <Button variant="orange" type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </form>
          <Separator />
        </DialogContent>
      </Dialog>

      {/* Cropper modal */}
      {cropping && (
        <UseCrop
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4"
          image={imageSrc}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      )}
    </>
  );
}
