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
import { Label } from "@/components/ui/label";

const LelangFormDialog = ({ onLelangAdded, refreshTrigger }) => {
  const [dataBarang, setDataBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [tglLelang, setTglLelang] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);
  const { user, token, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    setIsSubmitting(true);
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
      setIsOpen(false);
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          title="Gagal"
          description={`Gagal menambahkan lelang: ${error.message}`}
          type="error"
        />
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="orange">Add Auction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Open Auction</DialogTitle>
          <DialogDescription>
            Open an auction for a selected item. Please fill in the details
          </DialogDescription>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Select
              value={selectedBarang}
              onValueChange={setSelectedBarang}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full" disabled={isSubmitting}>
                <SelectValue placeholder="Pilih Barang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Barang</SelectLabel>
                  {dataBarang.map((barang) => (
                    <SelectItem
                      key={barang.id_barang}
                      value={String(barang.id_barang)}
                      disabled={isSubmitting}
                    >
                      {barang.nama_barang}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label htmlFor="tgl_lelang">Created At</Label>
            <Input
              type="datetime-local"
              name="tgl_lelang"
              value={tglLelang}
              onChange={(e) => setTglLelang(e.target.value)}
              required
              disabled={isSubmitting}
            />

            <Label htmlFor="tenggat_waktu">Deadline</Label>
            <Input
              type="datetime-local"
              name="tenggat_waktu"
              value={tenggatWaktu}
              onChange={(e) => setTenggatWaktu(e.target.value)}
              required
              disabled={isSubmitting}
            />

            <Button variant="orange" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LelangFormDialog;
