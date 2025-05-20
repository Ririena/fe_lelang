import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const LelangFormDialog = ({ onLelangAdded, refreshTrigger }) => {
  const [dataBarang, setDataBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [tglLelang, setTglLelang] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);
  const { user, token, loading } = useAuth();
  console.log(user);
  async function getBarang() {
    try {
      const resBarang = await axios.get("https://be-lelang.vercel.app/v2/items", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resLelang = await axios.get("https://be-lelang.vercel.app/auctions", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const semuaBarang = resBarang.data.data;
      const semuaLelang = resLelang.data.data;

      console.log("Semua Barang:", semuaBarang);
      console.log("Semua Lelang Aktif:", semuaLelang);

      const idBarangLelangAktif = semuaLelang.map((lelang) => lelang.id_barang);

      console.log("Barang yang sedang dilelang:", idBarangLelangAktif); // Debug
      setDataBarang(semuaBarang);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    if (!loading) getBarang();
  }, [loading, onLelangAdded, refreshTrigger]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        id_barang: selectedBarang,
        id_user: user?.id_user,
        tgl_lelang: new Date(tglLelang).toISOString(),
        tenggatWaktu: new Date(tenggatWaktu).toISOString(),
      };

      await axios.post("https://be-lelang.vercel.app/auctions", payload, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.custom(() => (
        <ToastCard
          title="Sukses"
          description="Lelang berhasil ditambahkan"
          type="success"
        />
      ));

      if (onLelangAdded) {
        onLelangAdded();
      }
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          title="Gagal"
          description={`Gagal menambahkan lelang: ${error.message}`}
          type="error"
        />
      ));
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="orange">Tambah Lelang</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Buka Lelang</DialogTitle>
          <DialogDescription>
            Buka Lelang untuk keperluan bisnis
          </DialogDescription>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Select value={selectedBarang} onValueChange={setSelectedBarang}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Barang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Barang</SelectLabel>
                  {dataBarang.map((barang) => (
                    <SelectItem
                      key={barang.id_barang}
                      value={String(barang.id_barang)}
                    >
                      {barang.nama_barang}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              type="datetime-local"
              name="tgl_lelang"
              value={tglLelang}
              onChange={(e) => setTglLelang(e.target.value)}
              required
            />
            <Input
              type="datetime-local"
              name="tenggat_waktu"
              value={tenggatWaktu}
              onChange={(e) => setTenggatWaktu(e.target.value)}
              required
            />

            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LelangFormDialog;
