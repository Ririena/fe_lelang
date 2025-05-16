"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import LelangEditDialog from "./lelang-edit-dialog";
import LelangDeleteDialog from "./lelang-delete.dialog";

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

const formatTanggal = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const newDate = new Date(date);
  return newDate.toLocaleDateString("id-ID", options);
};

const LelangTable = ({ searchQuery, filterBy }) => {
  const { token } = useAuth();
  const [dataLelang, setDataLelang] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedLelang, setSelectedLelang] = useState(null);

  const filteredLelangs = useMemo(() => {
    let filtered = [...dataLelang];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((lelang) => {
        const idLelang = lelang?.id_lelang?.toString() || "";
        const idBarang = lelang?.id_barang?.toString() || "";
        const idPemenang = lelang?.id_pemenang?.toString() || "";
        const hargaAkhir = lelang?.harga_akhir?.toString() || "";

        return (
          idLelang.includes(query) ||
          idBarang.includes(query) ||
          idPemenang.includes(query) ||
          hargaAkhir.includes(query)
        );
      });
    }

    switch (filterBy) {
      case "active":
        filtered = filtered.filter((lelang) => {
          const tenggatWaktu = new Date(lelang?.tenggat_waktu);
          return tenggatWaktu > new Date();
        });
        break;
      case "ended":
        filtered = filtered.filter((lelang) => {
          const tenggatWaktu = new Date(lelang?.tenggat_waktu);
          return tenggatWaktu <= new Date();
        });
        break;
      case "price_asc":
        filtered.sort((a, b) => (a?.harga_akhir || 0) - (b?.harga_akhir || 0));
        break;
      case "price_desc":
        filtered.sort((a, b) => (b?.harga_akhir || 0) - (a?.harga_akhir || 0));
        break;
      case "date_asc":
        filtered.sort(
          (a, b) => new Date(a?.tenggat_waktu) - new Date(b?.tenggat_waktu)
        );
        break;
      case "date_desc":
        filtered.sort(
          (a, b) => new Date(b?.tenggat_waktu) - new Date(a?.tenggat_waktu)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [dataLelang, searchQuery, filterBy]);

  const init = async () => {
    try {
      const res = await axios.get("http://localhost:3001/auctions-full", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data && res.data.data) {
        setDataLelang(res.data.data);
      } else {
        console.error("No data found in the response");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (lelang) => {
    setSelectedLelang(lelang);
    setEditDialogOpen(true);
  };

  // callback dari LelangEditDialog saat update sukses
  const handleUpdated = (updatedData) => {
    setDataLelang((prev) =>
      prev.map((item) =>
        item.id_lelang === updatedData.id_lelang ? updatedData : item
      )
    );
  };

  const handleDeleteClick = (idLelang) => {
    setSelectedDeleteId(idLelang);
    setDeleteDialogOpen(true);
  };

  const onDeleteSuccess = () => {
    init();
    setDeleteDialogOpen(false);
    setSelectedDeleteId(null);
  };

  useEffect(() => {
    init();
  }, [token]);

  if (!dataLelang.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="mt-12">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Lelang</TableHead>
                <TableHead>ID Barang</TableHead>
                <TableHead>ID Pemenang</TableHead>
                <TableHead>Harga Akhir</TableHead>
                <TableHead>Berakhir Dalam</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLelangs.map((data) => (
                <TableRow key={data.id_lelang}>
                  <TableCell>{data.id_lelang}</TableCell>
                  <TableCell>{data.id_barang}</TableCell>
                  <TableCell>
                    {data.id_pemenang || "Belum ada pemenang"}
                  </TableCell>
                  <TableCell>{formatRupiah(data.harga_akhir)}</TableCell>
                  <TableCell>{formatTanggal(data.tenggat_waktu)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <Separator />
                        <DropdownMenuItem>Copy Item ID</DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem className="cursor-pointer">
                          Lihat Detail Barang
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleEdit(data)}
                        >
                          Edit Barang
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDeleteClick(data.id_lelang)}
                        >
                          Delete Barang
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {selectedLelang && (
        <LelangEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          lelang={selectedLelang}
          onUpdated={handleUpdated} 
        />
      )}

      {selectedDeleteId && (
        <LelangDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          idLelang={selectedDeleteId}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
    </>
  );
};

export default LelangTable;
