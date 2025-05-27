"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { ToastCard } from "../ui/toast-card";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const ITEMS_PER_PAGE = 10;

const HistoryTables = ({ searchQuery, filter }) => {
  const [dataHistory, setDataHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { token, loading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPages = Math.ceil(dataHistory.length / ITEMS_PER_PAGE);

  const filteredHistory = useMemo(() => {
    let filtered = [...dataHistory];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === "date_asc") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (filter === "date_desc") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filter === "price_high") {
      filtered.sort((a, b) => b.harga_akhir - a.harga_akhir);
    } else if (filter === "price_low") {
      filtered.sort((a, b) => a.harga_akhir - b.harga_akhir);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [dataHistory, searchQuery, filter, currentPage]);

  async function init() {
    try {
      const res = await axios.get(`https://be-lelang.vercel.app/auction-histories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res) {
        toast.custom(() => (
          <ToastCard
            title="Gagal"
            variant="destructive"
            description="Data tidak ditemukan atau terjadi kesalahan koneksi."
          />
        ));
        return;
      }

      if (!loading) {
        setDataHistory(res.data.data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsPageLoading(false);
    }
  }

  useEffect(() => {
    if (!loading && token) {
      init();
    }
  }, [token, loading]);

  return (
    <>
      <div className="rounded-md border mt-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">History ID</TableHead>
              <TableHead>Auction ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Final Price</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map((item) => (
              <TableRow key={item.id_history}>
                <TableCell>{item.id_history}</TableCell>
                <TableCell>{item.id_lelang}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.nama_barang}</TableCell>
                <TableCell>Rp {item.harga_akhir.toLocaleString()}</TableCell>
                <TableCell>
                  <img
                    src={item.gambar}
                    alt={item.nama_barang}
                    className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() => {
                      setSelectedImage(item.gambar);
                      setIsDialogOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="hidden">Preview</DialogTitle>
          <img src={selectedImage ?? ""} alt="Preview" className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryTables;
