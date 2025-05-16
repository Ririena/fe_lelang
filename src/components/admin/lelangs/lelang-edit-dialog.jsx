import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";

const LelangEditDialog = ({ open, onOpenChange, lelang, onUpdated }) => {
  const [hargaAkhir, setHargaAkhir] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lelang) {
      setHargaAkhir(lelang.harga_akhir);
    }
  }, [lelang]);

  const handleSubmit = async () => {
    const newHarga = parseInt(hargaAkhir);
    if (isNaN(newHarga) || newHarga < 0) {
      alert("Harga Akhir harus berupa angka positif");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        ...lelang,
        harga_akhir: newHarga,
      };

      await axios.put(`http://localhost:3001/auctions/${lelang.id_lelang}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);
      onOpenChange(false); 

      if (onUpdated) {
        onUpdated(updatedData); 
      }
    } catch (error) {
      setLoading(false);
      alert("Gagal mengupdate data lelang: " + error.message);
    }
  };

  const isUnchanged = lelang?.harga_akhir === parseInt(hargaAkhir);
  const isInvalid = hargaAkhir === "" || isNaN(parseInt(hargaAkhir)) || parseInt(hargaAkhir) < 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Harga Akhir</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            value={hargaAkhir}
            onChange={(e) => setHargaAkhir(e.target.value)}
            min={0}
            disabled={loading}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={isUnchanged || isInvalid || loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LelangEditDialog;
