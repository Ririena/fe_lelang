"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function ItemTables() {
  const [dataItems, setDataItems] = useState([]);
  const { token } = useAuth();

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/v2/items/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setDataItems((prevItems) => prevItems.filter(item => item.id_barang !== id));
      }

      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleConfirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDelete(id);
    }
  };

  async function getAll() {
    try {
      const res = await axios.get("http://localhost:3001/v2/items", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (res.data && res.data.data) {
        setDataItems(res.data.data);
        console.log(res.data.data);
      } else {
        console.error("No data found in the response");
      }
    } catch (error) {
      console.error("Failed to fetch items:", error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, [token]);

  if (!dataItems.length) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mt-12">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Barang</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Harga Awal</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Gambar</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataItems.map((data) => (
              <TableRow key={data.id_barang}>
                <TableCell>{data.id_barang}</TableCell>
                <TableCell>{data.nama_barang}</TableCell>
                <TableCell>{data.harga_awal}</TableCell>
                <TableCell>{data.deskripsi}</TableCell>
                <TableCell>
                  <img
                    src={data.gambar}
                    alt={data.nama_barang}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
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
  );
}
