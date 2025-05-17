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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";
const LelangEditDialog = ({ open, onOpenChange, lelang, onUpdated }) => {
  const [status, setStatus] = useState("");
  const [tenggat_waktu, setTenggatWaktu] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (lelang) {
      setStatus(lelang.status || "");

      if (lelang.tenggat_waktu) {
        const utcDate = new Date(lelang.tenggat_waktu);
        const localDate = new Date(
          utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
        );
        const formatted = localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
        setTenggatWaktu(formatted);
      } else {
        setTenggatWaktu("");
      }
    }
  }, [lelang]);

  // Format tenggat_waktu asli untuk perbandingan perubahan
  const formattedOriginalTenggatWaktu = lelang?.tenggat_waktu
    ? new Date(
        new Date(lelang.tenggat_waktu).getTime() -
          new Date(lelang.tenggat_waktu).getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16)
    : "";

  // Cek apakah tidak ada perubahan (status & tenggat_waktu)
  const isUnchanged =
    status === lelang?.status &&
    tenggat_waktu === formattedOriginalTenggatWaktu;

  // Validasi input
  const isInvalid = !status || (status === "dibuka" && !tenggat_waktu);

  // Validasi conflict: tidak boleh ubah tenggat_waktu saat status = "tutup"
  const isConflict =
    status === "tutup" && tenggat_waktu !== formattedOriginalTenggatWaktu;

 const handleSubmit = async () => {
  setLoading(true);
  try {
    const updatedData = {};

    if (status !== lelang?.status) {
      updatedData.status = status;
    }

    if (
      status === "dibuka" &&
      tenggat_waktu &&
      tenggat_waktu !== formattedOriginalTenggatWaktu
    ) {
      const localDate = new Date(tenggat_waktu);
      const utcDate = new Date(
        localDate.getTime() + localDate.getTimezoneOffset() * 60000
      );
      updatedData.tenggat_waktu = utcDate.toISOString();
    }

    await axios.put(
      `http://localhost:3001/auctions/${lelang.id_lelang}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.custom(() => (
      <ToastCard
        title="Berhasil"
        description="Lelang berhasil diperbarui"
        type="success"
      />
    ));

    setLoading(false);
    onOpenChange(false);

    if (onUpdated) {
      onUpdated({ ...lelang, ...updatedData });
    }
  } catch (error) {
    setLoading(false);
    toast.custom(() => (
      <ToastCard
        title="Gagal"
        description={`Gagal memperbarui lelang: ${error.message}`}
        type="error"
      />
    ));
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lelang</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Tenggat Waktu
            </Label>
            <Input
              type="datetime-local"
              name="tenggat_waktu"
              value={tenggat_waktu}
              onChange={(e) => setTenggatWaktu(e.target.value)}
              disabled={status === "tutup"}
            />

            <Label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dibuka">Dibuka</SelectItem>
                <SelectItem value="tutup">Tutup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isUnchanged || isInvalid || isConflict || loading}
              title={
                isConflict
                  ? "Tidak boleh mengubah tenggat waktu saat status ditutup"
                  : undefined
              }
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LelangEditDialog;
