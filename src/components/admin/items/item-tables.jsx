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
import { useEffect, useState, useMemo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ItemTables({ trigger, onItemAdded, searchQuery, filterBy }) {
  const [dataItems, setDataItems] = useState([]);
  const { token, loading } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter and sort items based on search query and filter selection
  const filteredItems = useMemo(() => {
    let filtered = [...dataItems];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => 
        item.nama_barang.toLowerCase().includes(query) ||
        item.deskripsi.toLowerCase().includes(query) ||
        item.id_barang.toString().includes(query) ||
        item.harga_awal.toString().includes(query)
      );
    }

    // Apply sorting based on filterBy
    switch (filterBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.harga_awal - b.harga_awal);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.harga_awal - a.harga_awal);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.nama_barang.localeCompare(a.nama_barang));
        break;
      default:
        // No sorting for 'all'
        break;
    }

    return filtered;
  }, [dataItems, searchQuery, filterBy]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/v2/items/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setDataItems((prevItems) =>
          prevItems.filter((item) => item.id_barang !== id)
        );
      }

      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  async function getAll() {
    try {
      const res = await axios.get("http://localhost:3001/v2/itemsAll", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (!loading) {
        if (res.data && res.data.data) {
          setDataItems(res.data.data);
          console.log(res.data.data);
        } else {
          console.error("No data found in the response");
        }
      }
    } catch (error) {
      console.error("Failed to fetch items:", error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, [token, trigger, loading]);

  useEffect(() => {
    if (!loading) {
      getAll();
    }
  }, [onItemAdded]);

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
            {filteredItems.map((data) => (
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
                        onSelect={(e) => {
                          e.preventDefault();
                          setSelectedItem(data.id_barang);
                          setOpenDialog(true);
                        }}
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
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah Anda yakin ingin mendelete nya?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Aksi Anda saat ini bisa dibatalkan kalau anda mau.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(selectedItem);
                  setOpenDialog(false);
                }}
              >
                Ya, Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
