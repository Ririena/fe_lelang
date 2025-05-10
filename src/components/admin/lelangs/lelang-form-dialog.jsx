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

import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const LelangFormDialog = () => {
  const [dataBarang, setDataBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [tglLelang, setTglLelang] = useState("");
  const [tenggatWaktu, setTenggatWaktu] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const { user, token, loading } = useAuth();
  console.log(user);
  async function getBarang() {
    try {
      const res = await axios.get("http://localhost:3001/v2/items", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const items = res.data.data;

      console.log(items);
      setDataBarang(items);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    if (!loading) getBarang();
  }, [loading]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        id_barang: selectedBarang,
        id_user: user?.id_user,
        tgl_lelang: new Date(tglLelang).toISOString(),
        tenggatWaktu: new Date(tenggatWaktu).toISOString(),
      };

      await axios.post("http://localhost:3001/auctions", payload, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Lelang Berhasil");
    } catch (error) {
      console.error(error.message);
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
