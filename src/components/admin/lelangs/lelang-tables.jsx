"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

const LelangTable = ({ searchQuery, filterBy, refreshTrigger }) => {
  const { token } = useAuth();
  const [dataLelang, setDataLelang] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedLelang, setSelectedLelang] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter & sort data based on searchQuery and filterBy
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredLelangs.length / itemsPerPage);

  // Slice data to only show current page items
  const paginatedLelangs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLelangs.slice(startIndex, endIndex);
  }, [filteredLelangs, currentPage]);

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

  const handleUpdateLelang = (updatedLelang) => {
    setDataLelang((prev) =>
      prev.map((item) =>
        item.id_lelang === updatedLelang.id_lelang ? updatedLelang : item
      )
    );
  };

  const handleDeleteSuccess = () => {
    setDataLelang((prev) =>
      prev.filter((item) => item.id_lelang !== selectedDeleteId)
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
  }, [token, refreshTrigger]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

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
                <TableHead>Winner</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Ended In</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLelangs.map((data) => (
                <TableRow key={data.id_lelang}>
                  <TableCell>{data.id_lelang}</TableCell>
                  <TableCell>{data.id_barang}</TableCell>
                  <TableCell>
                    {data.username}({data.id_pemenang || "No Winner Yet"})
                  </TableCell>
                  <TableCell>{formatRupiah(data.harga_akhir)}</TableCell>
                  <TableCell>{formatTanggal(data.tenggat_waktu)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        data.status === "dibuka"
                          ? "bg-orange-500 text-white"
                          : data.status === "ditutup"
                          ? "bg-red-600 text-white"
                          : ""
                      }`}
                    >
                      {data.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <Separator />
                        <DropdownMenuItem>Copy Auction ID</DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem className="cursor-pointer">
                          Auction Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleEdit(data)}
                        >
                          Edit Auction
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDeleteClick(data.id_lelang)}
                        >
                          Delete Auction
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
        </div>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationPrevious>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .reduce((acc, page, idx, arr) => {
                  const prevPage = arr[idx - 1];
                  if (idx > 0 && page - prevPage > 1) {
                    acc.push(<PaginationEllipsis key={`ellipsis-${page}`} />);
                  }
                  acc.push(
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                  return acc;
                }, [])}
            </PaginationContent>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationNext>
          </PaginationContent>
        </Pagination>
      </main>

      {selectedLelang && (
        <LelangEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          lelang={selectedLelang}
          onUpdated={handleUpdateLelang}
        />
      )}

      {selectedDeleteId && (
        <LelangDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          idLelang={selectedDeleteId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default LelangTable;
