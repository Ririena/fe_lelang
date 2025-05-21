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
} from "@/components/ui/alert-dialog";
import ItemEditDialog from "./item-edit-dialog";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ItemTables({ refreshTrigger, searchQuery, filterBy }) {
  const [dataItems, setDataItems] = useState([]);
  const { token, loading } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleItemUpdated = (updatedItem) => {
    setDataItems((prevItems) =>
      prevItems.map((item) =>
        item.id_barang === updatedItem.id_barang ? updatedItem : item
      )
    );
  };

  const filteredItems = useMemo(() => {
    let filtered = [...dataItems];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.nama_barang.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query) ||
          item.id_barang.toString().includes(query) ||
          item.harga_awal.toString().includes(query)
      );
    }

    switch (filterBy) {
      case "price_asc":
        filtered.sort((a, b) => a.harga_awal - b.harga_awal);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.harga_awal - a.harga_awal);
        break;
      case "name_asc":
        filtered.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.nama_barang.localeCompare(a.nama_barang));
        break;
      default:
        break;
    }

    return filtered;
  }, [dataItems, searchQuery, filterBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterBy, itemsPerPage]);

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

        toast.custom(() => (
          <ToastCard
            title="Berhasil"
            variant="success"
            description="Item berhasil dihapus"
          />
        ));
      }
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          title="Gagal"
          variant="destructive"
          description={
            error.response?.data?.message ||
            error.message ||
            "Gagal menghapus item"
          }
        />
      ));
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
        } else {
          console.error("No data found in the response");
        }
      }
    } catch (error) {
      console.error("Failed to fetch items:", error.message);
    }
  }

  useEffect(() => {
    if (!loading && token) {
      getAll();
    }
  }, [refreshTrigger, loading, token]);

  if (!dataItems.length) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mt-12">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items ID</TableHead>
              <TableHead>Items Name</TableHead>
              <TableHead>Starting Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id_barang}>
                <TableCell>{data.id_barang}</TableCell>
                <TableCell>{data.nama_barang}</TableCell>
                <TableCell>{data.harga_awal}</TableCell>
                <TableCell>{data.deskripsi}</TableCell>
                <TableCell>
                  <img
                    onClick={() => {
                      setSelectedImage(data.gambar);
                      setIsDialogOpen(true);
                    }}
                    src={data.gambar}
                    alt={data.nama_barang}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <Separator />
                      <DropdownMenuItem>Copy Item ID</DropdownMenuItem>
                      <Separator />

                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditItem(data);
                          setEditDialogOpen(true);
                        }}
                      >
                        Edit Items
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onSelect={(e) => {
                          e.preventDefault();
                          setSelectedItem(data.id_barang);
                          setOpenDialog(true);
                        }}
                      >
                        Delete Items
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
                className="bg-red-600"
                onClick={() => {
                  handleDelete(selectedItem);
                  setOpenDialog(false);
                }}
              >
                <p className="">Ya, Hapus</p>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ItemEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        item={editItem}
        onUpdated={handleItemUpdated}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex items-center gap-2">
          <span className="text-sm">Items per page:</span>
          <Select
            defaultValue={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="hidden"> asdasd</DialogTitle>
          <img src={selectedImage ?? ""} alt="Full" className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </main>
  );
}
