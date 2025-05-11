"use client";
import React, { useEffect, useState } from "react";
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

const LelangTable = () => {
  const { token } = useAuth();
  const [dataLelang, setDataLelang] = useState([]);

  async function init() {
    try {
      const res = await axios.get("http://localhost:3001/auctions-full", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data && res.data.data) {
        setDataLelang(res.data.data);
        console.log(res.data.data);
      } else {
        console.error("No data found in the response");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    init();
  }, [token]);

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
              {dataLelang.map((data) => (
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
                        <DropdownMenuItem className="cursor-pointer">
                          Edit Barang
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleConfirmDelete(data.id_barang)}
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
    </>
  );
};

export default LelangTable;
